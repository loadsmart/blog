---
title: Introducing Gmail Wrapper
author: Luiz Rosa
twitter: luizguilhermefr
layout: post
lang: en
path: /blog/introducing-gmail-wrapper
date: '2020-07-22'
comments: true
---

If you’ve ever had to read or write emails using the Official [Gmail Python SDK](https://googleapis.github.io/google-api-python-client/docs/dyn/gmail_v1.html), then you know it is a pain for multiple reasons:

- It is verbose, using dozens of chained objects like `foo().bar().baz()`
- It is not intuitive (How do I authenticate? How do I read my messages? How do I send a message? I don’t know...)
- It uses plain dictionaries as the default response, regardless of the number of classes used (What are the fields? I’ll have to look the docs again)

We use Gmail for several automated tasks at Loadsmart, and to overcome these difficulties we developed [gmail-wrapper](https://github.com/loadsmart/gmail-wrapper), a Python library that encapsulates the hard parts of the official SDK and provides an easier API.
It was a closed project used only internally, but now we decided to make it the first Loadsmart open-sourced Python package.
Here are some comparisons with the official SDK:

### Authenticate

For both official SDK and Gmail Wrapper, you will use the [service account key](https://developers.google.com/identity/protocols/oauth2) with a [refresh token](https://developers.google.com/identity/protocols/oauth2#5.-refresh-the-access-token,-if-necessary.).
It is a JSON file like this:

```json
{
  "token": "...", "client_id": "...", "client_secret": "...", "token_uri": "...", "refresh_token": "..."
}
```

**Official SDK**

```python
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient import discovery

credentials = Credentials(
    token=token,
    refresh_token=refresh_token,
    client_id=client_id,
    client_secret=client_secret,
    token_uri=token_uri,
    scopes=["https://www.googleapis.com/auth/gmail.modify"],
)
credentials.refresh(Request())
return discovery.build("gmail", "v1", credentials=credentials)
```

**Gmail Wrapper**

```python
from gmail_wrapper import GmailClient

client = GmailClient(
    "john.doe@example.org",
    secrets_json_string="{...}", # Generated on your Google console
    scopes=[GmailClient.SCOPE_MODIFY] # Scope constants out of the box
)
```

### List messages

**Official SDK**

```python
messages = client.users().messages().list(userId="john.doe@example.org", q="receipts", maxResult=10).execute()
# messages is now a dict with previews
for preview in messages["messages"]:
    message = client.users().messages().get(userId="john.doe@example.org", id=preview["id"])
    for header in message["payload"]["headers"]:
        if header["name"] == "Subject":
            print(header["value"])
```

**Gmail Wrapper**

```python
messages = client.get_messages(query="receipts", limit=10)
for message in messages:
    print(message.subject) # Gmail Wrapper will automatically lazy-load the properties as you need them
```

### How can I use it?

From the examples you could have a taste of the official SDK difficulties and how a higher-level library can help (We did not even mention [composing](https://developers.google.com/gmail/api/guides/sending#creating_messages) messages, [replying](https://stackoverflow.com/questions/32589476/how-to-send-a-reply-with-gmail-api/32591614#32591614) to messages, or reading attachments).

If you are interested in learning more about this package there is detailed documentation on the GitHub repository.

To install, you already guess it: `pip install gmail-wrapper`

Of course the initial build of Gmail Wrapper has limitations. For example, sending emails with attachments or authenticating with non-renewable tokens are not possible.
However, these are solvable issues that can easily be addressed by the community.
So please don’t forget to contribute if you find any bugs or if you think something can be improved!
We will be more than happy to review your suggestions or pull-requests.
