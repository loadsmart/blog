---
title: Introducing Gmail Wrapper - A Python library to help you with Gmail tasks
author: Luiz Rosa
twitter: luizguilhermefr
layout: post
lang: en
path: /blog/introducing-gmail-wrapper
date: '2020-07-15'
comments: true
---

If you ever had to read or write emails using the Gmail Official [Python SDK](https://googleapis.github.io/google-api-python-client/docs/dyn/gmail_v1.html) you know it is a pain for some reasons:

- It is verbose, using dozens of chained objects like `foo().bar().baz()`
- It is not intuitive (How to authenticate? How to read my messages? How to send a message? I don’t know...)
- Although using a lot of classes, the responses are always plain dictionaries (What are the fields? I’ll have to look the docs again)

We use Gmail for several automated tasks at Loadsmart, and to overcome these difficulties we developed [gmail-wrapper](https://github.com/loadsmart/gmail-wrapper), a Python library that encapsulates the hard parts of the official SDK and provides an easier API.
It was a closed project used only internally, and now we decided to bring it open-source.
Here are some comparisons with the official SDK:

### Authenticate

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

From the examples you could have a taste of the official SDK difficulties and how a higher-level library can help.
I did not even mention composing messages and reading attachments, but if you felt interested you can have a more detailed documentation on GitHub.

To install, you already guess: `pip install gmail-wrapper`

Don’t forget to contribute if you find any bugs or if you think something can be improved, we will be more than happy with your suggestion or pull-request.
