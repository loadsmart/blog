---
title: Loadsmart Take Home Exercises
author: Flavio S. Truzzi
twitter: flaviotruzzi
layout: post
lang: en
path: /blog/loadsmart-take-home-exercises
date: '2020-10-29'
comments: true
---

Hiring is something taken very seriously at Loadsmart. One of our principles states that **Our biggest asset is our People**, we invest a lot of time in our hiring process. Our process for engineering includes what we call a Take-Home Exercise, and today I would like to give some tips for doing well on these.

Our exercises are tailored for different positions, so we have different exercises for Backends, Frontends, SREs, and Data Scientists. Most of the tips can be applied to all of them.

### Before starting the exercise

Carefully read the file we send. There we have the goal and the expectations. A lot of times, we receive exercises that do not achieve the requirements specified in the text. Focus on what we ask, this will change according to the task, but generally, we will look into:

1. Your ability to code;
2. Written documentation;
3. Domain-Specific knowledge;
4. Automated tests.

For Data Science tests, we care a lot to your:

1. Line of Thought - looking into why you took the decisions you took;
2. Feature Engineering and the ideas behind them;
3. Project structure and architectural aspects.

Make sure you understand what is being asked, and don’t be afraid to reach out with questions, but try to keep them concise.

### Starting your exercise

Start your project with:

```bash
mkdir take-home-exercise && cd take-home-exercise
git init
touch README.md
```

Having a git repository helps us to understand how you work, your priorities, and how you designed your solution.
Make sure your README.md contains instructions on how to run your code, and how to run your automated tests.

### Explicit requirements

Here at Loadsmart, we mainly use 4 different programming languages. TypeScript and JavaScript for frontend, Python and Golang for the backend, and Python for data science. At this moment, we are not asking for Golang exercises, but that may change in the future. If that happens, please make sure you have your go module setup. For python, make sure you write your requirements.txt (or another control file like pipenv or poetry), and for JavaScript package.json with yarn.lock.

Fix your dependencies versions, don’t add libraries you don’t use. Using virtual environments also helps. If you know your way around Makefiles, you can add one to help us set up your project.

Also, try to use libraries you know. If you are using something new, try to use the libraries that are commonly used within the community.

### Documentation

Documenting what you have done is paramount. And that also helps us to assess soft skills around written communication, which is hard, especially now during COVID when everyone is remote. Be reasonable, don’t exaggerate. We only need to understand what you did and your intentions.

For Data Scientists, we strongly recommend you to use a notebook to record the analysis part of the task. But don’t try to run an HTTP Server from within the notebook. For charts, you can use seaborn’s whitegrid or darkgrid style sets.

### Submitting your solution

Take-home tests are personal, and we ask you not to share it publicly. You can use GitHub private repository for free and share it with us. Another option is that we are going to provide you with a repository to send your test. Sometimes we will resort to old tarballs/zip files. If that is the case, please make sure to check the file twice, making sure you added your solution to the file.


That is all! If you follow these suggestions you are going to make our lives easier. We will be able to make a fair assessment of your exercise. It will help us reach out to you faster with results. 

Did I mention we are hiring? For our principles and values, take a look at https://loadsmart.com/careers/ and for our open positions https://jobs.lever.co/loadsmart/.
