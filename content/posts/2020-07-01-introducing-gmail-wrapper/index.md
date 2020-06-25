---
title: Introducing Gmail Wrapper - A Python library to help you with Gmail tasks
author: Luiz Rosa
twitter: luizguilhermefr
layout: post
lang: en
path: /blog/introducing-gmail-wrapper
date: '2020-07-01'
comments: true
---

If you ever had to read or write emails using the Gmail [Python SDK](https://googleapis.github.io/google-api-python-client/docs/dyn/gmail_v1.html) you know it is a pain for some reasons:

- It is verbose, using dozens of chained objects like `foo().bar().baz()`
- It is not intuitive (How to authenticate? How to read my messages? How to send a message? I don’t know...)
- Although using a lot of classes, the responses are always plain dictionaries (What are the fields? I’ll have to look the docs again)

We use Gmail for several automated tasks at Loadsmart and to overcome these difficulties we developed [gmail-wrapper](https://github.com/loadsmart/gmail-wrapper), a Python library that encapsulates the hard parts of the official SDK and provides an easy, reactive and eloquent API. This project was closed until today, when we finally decided to make it fully open-source.

First of all, let’s show how you can accomplish simple tasks with it:

### <foo>

Liked it? You can install it right now using `pip install gmail-wrapper`.

Don’t forget to contribute if you find any bugs or if you think something can be improved, we will be more than happy with your suggestion or pull-request.
