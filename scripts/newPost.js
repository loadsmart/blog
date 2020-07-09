;(async () => {
  const prompts = require('prompts')

  const questions = await prompts([
    {
      type: 'text',
      name: 'title',
      message: `What's the title of your post?`,
      validate: (value) =>
        value.length > 80
          ? 'Please provide a title with 80 chars or less'
          : true,
    },
    {
      type: 'text',
      name: 'author',
      message: 'Your first and last name?',
      initial: 'Engineering',
      validate: (value) =>
        value.split(' ').length < 2
          ? 'Please include first and last name'
          : true,
    },
    {
      type: 'text',
      name: 'twitter',
      message: `What's your twitter handle?`,
      validate: (value) =>
        !value.startsWith('@') ? 'Please include the @ sign' : true,
    },
    {
      type: 'date',
      name: 'date',
      message: 'When are you planning to publish this post?',
    },
    {
      type: 'confirm',
      name: 'has_comments',
      message: 'Do you want to turn comments on?',
      initial: true,
    },
  ])

  const date = questions['date']
  const zeroFill = (n) => (n < 10 ? `0${n}` : `${n}`)
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
  }

  const content = `---
title: ${questions['title']}
author: ${questions['author']}
twitter: ${questions['twitter']}
layout: post
lang: eng
path: /blog/${slugify(questions['title'])}
date: ${date.getFullYear()}-${zeroFill(date.getMonth() + 1)}-${zeroFill(
    date.getDate()
  )}
comments: ${questions['has_comments']}
---

Here goes the body of your post. Happy writing!`

  console.log('response', questions)
  console.log('content', content)
})()
