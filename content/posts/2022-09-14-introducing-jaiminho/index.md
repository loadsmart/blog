---
title: Introducing Jaiminho, an implementation of the Transactional Outbox Pattern for Django
author: Rafael Zanetti
twitter: LoadsmartEng
layout: post
lang: en
path: /blog/introducing-jaiminho
date: 2022-11-25
comments: true
---

At Loadsmart, many of our services are organized within an event-driven architecture and face some usual challenges that come with such an architecture. One of them is **dual writes**, which happens when an application has to change data on two different places. A common example of dual writes is an application that needs to store data on a database and notify that change by emitting an event which may be consumed by different services. The inherent issue with this scenario is that if one of these two operations fails, the producer and consumer applications will have data inconsistencies. If we choose to write the change to the database first and then notify the event, in the case of a notification failure the database would have the updated data and the consumer wouldn’t. If we reverse it (i.e. notifying first and then storing), a failure when committing the transaction in the database would cause the consumer receiving data that isn’t on the application database.

There are well-known methods to deal with such issues, and we chose to apply the transactional outbox pattern. Since we couldn’t find any related solution on [Django community](https://djangopackages.org/search/?q=outbox), we decided to implement an open-source library called [Jaiminho](https://github.com/loadsmart/jaiminho), which is a broker agnostic implementation of the outbox pattern.


# The Transactional outbox pattern

For simplicity purposes, let’s assume the common case of an application that has to save data to a database and notify it to an event stream. The idea behind the transactional outbox pattern is combining both writes into a single atomic transaction, which guarantees that if one of them fails, the entire transaction fails, avoiding inconsistent scenarios; in this case, it means that if a record is persisted into the database, it is guaranteed to be notified to the stream. The pattern achieves this goal by introducing two concepts:

- Outbox table

When storing a record to the database, the corresponding event should be persisted into an outbox table, and both operations should be in the same transaction. With this strategy we can leverage the atomicity property of relational databases transactions to ensure either both or no inserts will be successful.

- Message relay

The outbox table is guaranteed to have all events that should be notified, so we just have to ensure that they are really sent. This responsibility goes to the message relay, which will publish all events in the table to the stream and mark them as sent.
Note: Since the message relay has to send an event and then mark it as sent, that characterizes another dual write, because if the relay fails to update the status after sending the event, it will be sent again on the next execution. So, to ensure no duplicated events are consumed, the message consumers must implement idempotence on their side.


# How Jaiminho works

With the default configuration, when you add the `@save_to_outbox` decorator to a method, whenever it is called and raises an exception, Jaiminho will create a database entry storing:

- The message that is being sent to the external system, serialized into bytes
- The method that was used for sending that message
- The extra kwargs used to call the method

This data will allow for the message to be sent again using the original method, message and kwargs. Also, at the end of the decorated method a Django signal will be sent to indicate the event success or failure.

Since the message and kwargs are serialized into bytes, any type of message is supported. For example, in Loadsmart we work with JSON and Protobuf messages, and both are using Jaiminho with no need of special configurations.

## Publish strategies

With Jaiminho, you can choose between the following two publish strategies, using the `PUBLISH_STRATEGY` configuration:

### Keep Order 
This strategy is similar to the transactional outbox [described by Chris Richardson](https://microservices.io/patterns/data/transactional-outbox.html). The decorated function intercepts the function call and saves it on local DB to be executed later. A separate event relayer will keep polling local DB and executing those functions in the same order it was stored. 
Be careful with this approach, **if any execution fails, the relayer will get stuck**. Otherwise, it would not possible to guarantee delivery order.  

### Publish on commit

This strategy will always execute the decorated function after the current transaction commit. With this approach, we don’t depend on an event relayer to execute the decorated function and deliver the message. Failed items will only be executed through the relayer. Although we can decrease the delay to execute the decorated function with this approach, **we cannot guarantee delivery order**.

## Additional settings

Besides the publish strategies, there are two other options that can be configured:

### Persist all events

While the default behavior of Jaiminho makes losing an event less likely, it still has a point of failure: if the notifying method fails and Jaiminho receives an error trying to store the database entry, the event will be lost. In order to avoid this possibility, the `PERSIST_ALL_EVENTS` configuration can be set to True, which will save the database entry *before* trying to notify the event. In this case, the notifying method will be called when the database transaction is committed, which will ensure that the event is persisted. This is not applicable when the publish strategy is **Keep order**, because all the messages must be stored to achieve this strategy.

### Delete after send

The `PERSIST_ALL_EVENTS` configuration can be combined with the `DELETE_AFTER_SEND` one. If `DELETE_AFTER_SEND` is activated, after a successful notifying of the event, the persisted database entry will be deleted, in order to make sure Jaiminho will not store successfully sent events.

You might be wondering: why isn’t the `PERSIST_ALL_EVENTS` configuration the default behavior of Jaiminho? The reason behind it is performance. For each event sent, the activation of this setting will cause two extra database operations (one insertion and one deletion), which can be a lot for use cases where there is a large number of events being sent. So, it’s up to your use case and you to decide whether you prefer the performance of just going to the database if something fails or the consistency guarantee of not losing any events.

## Django Commands

Jaiminho comes with two Django Commands that can be useful:

### Event Relaying

The Event Relaying command will query the database for all events that were not sent in a given timebox and will try to re-send them using the original method, message and kwargs. Note that if the event relay runs after a deploy that changed or removed the original method, it will not be able to re-send the failed events and they will have to be dealt with manually. Also, the `DELETE_AFTER_SEND` configuration also applies to this command.

To ensure all failed events are re-sent by Jaiminho, you have two options with the Event Relaying command:

- Schedule it to be regularly executed (with a cronjob, for example)
- Run it in a loop using the `run_in_loop` and `loop_interval` flags

### Event Cleaning

The Event Cleaning Command will query the database for all events that were successfully re-sent in a given timebox and will delete them from the database in order to limit storage using for old events.

## Triggered signals

Jaiminho emits two Django signals, which can be used, for example, for collecting metrics:

- `event_publish` : emitted when an event is successfully sent
- `event_failed_to_published` : emitted when an event failed to be sent

# Using Jaiminho in your project

To add Jaiminho to your project, you have to:

1) Install it:

```console
python -m pip install jaiminho
```

2) Add it to the Django project’s `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    ...
    ...
    ...
    "jaiminho"
]
```

3) Configure the options in the project’s Django `settings.py`:

```python
JAIMINHO_CONFIG = {
    "PERSIST_ALL_EVENTS": False,
    "DELETE_AFTER_SEND": True,
    "PUBLISH_STRATEGY: "keep-order"
    }
```

4) Apply Jaiminhos migrations in order to create the event database table:

```console
python manage.py migrate
```


5) Add the `@save_to_outbox` decorator to any method responsible for communicating with external systems (brokers, external APIs, etc):

```python
from jaiminho.send import save_to_outbox

@save_to_outbox
def any_external_call(**kwargs):
    # do something
    return
```


# Final remarks 

If you are interested in learning more, there is a detailed documentation on the [GitHub repository](https://github.com/loadsmart/jaiminho). Also, contributions are more than welcome! Feel free to contribute if you find any bugs or have any suggestions.
