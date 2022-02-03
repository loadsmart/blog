---
title: How we decreased the execution time of our backend test suite
author: Gustavo Rodrigues
twitter: gustahrodrigues
layout: post
lang: en
path: /blog/how-we-decreased-pipeline-time
date: 2022-02-02
comments: true
---

At Loadsmart, we use [CircleCI](https://circleci.com/) as a pipeline tool to assert the new code’s correctness and ensure high-quality code before integration.

Some time ago, we realized that the pipeline for one of our largest codebases was taking 45min on average to be finished. Of those, 22min running the backend tests only.
It means that, for each PR, developers would wait around 45min to get feedback on their changes, delaying the time to deliver code to production.

We have decided to create a Working Group to improve this. This post aims to share our journey to reduce the total execution time of our backend tests.

## What is a Working Group?

Working Groups are a great format when it comes to solve multi-squad tech debts, as they are short-lived, temporary, diverse, and they are formed to solve a cross-organization issue. Cool, right? Would you like to know more about Loadsmart Engineering culture? [Check it out](https://engineering.loadsmart.com/blog/our-engineering-culture).

In this initiative, the team was formed by three full-stack engineers, two backend engineers, and one site reliability engineer. All of them from different squads.

## Goals
As with all Loadsmart initiatives, it should have clear goals and be based on data to be properly tracked by everyone.

For this specific effort, we came across the following goals:

- Reduce average execution time of backend tests by 50%
    - How to measure: CircleCI backend tests step execution time

- Reduce average time from code-ready to code-deployed by 50%
    - How to measure: CircleCI backend tests step + QA deploy + Staging deploy + Production deploy


## Methodology

We followed a scientific method for problem-solving based on the following steps:

- Identify a problem:
We may have several potential issues in our code impacting the backend test step execution time.
However, we should pick one to focus on. In this step, we took several problems and guessed which one of them would be better to start with.

- Research:
After having a clear definition of the problem, we started doing some research to understand how it was being handled by the software community.

- Hypothesis:
Based on the results of previous steps, we could gather some hypotheses in the format of "what if...".
For example, "what if we change the Django default test runner?".

- Experimentation:
For each hypothesis, we have evaluated the effort to test it. After qualifying it as a valid one, we prototyped it.
We did it for a minimal set of changes enabling an initial evaluation. Our goal here was to change minimal and get the max result possible.

- Results and conclusions:
Once we had a prototype working as expected, we started gathering data. If it showed promising results, we could invest more effort in it.

## Actions and Results

### Baseline

As a baseline, we considered the total execution time for the backend test step: 22 minutes.

1. Map and split slowest Django apps

We had a bunch of tests spread through several Django apps.

We came up with the following hypothesis: What if we split the faster/slower apps into different jobs?

We started by measuring the execution time for each Django app. Then, we created manually 2 test jobs: the first would have the slowest tests and the second would have the fastest. We tried to split it equally based on total execution time, ie, the second job with faster tests would have more tests than the first.

We got the following results showing an improvement of about 7 minutes

- Job 1 - 14 min 35 s
- Job 2 - 14 min 15 s

It showed a valid path which was splitting tests to run in parallel. However, breaking them into multiple jobs was not feasible, since we'd keep adding more and more tests daily.

2. No migration before backend tests steps

When we were measuring closer the tests execution time, we realized that the pipeline was taking about 8 minutes to run Django migrations (more than 1400 migration files) since we had a lot of databases and cross-references.

Since we were using [pytest-django](https://pytest-django.readthedocs.io/en/latest/index.html), which takes the current model definition to be used as an in-memory database, we could remove the migrations steps.

By removing them, we saw a bunch of tests failing. It turned out that we were using Django migration for data migration too. To fix it, we created several pytest fixtures to provide required data instead of inserting them into the database.

By the end of this step, we could get an improvement of 8 minutes in the total pipeline execution time.

3. Blocking external calls

Our code had a lot of dependencies with external services. During the previous test investigations, we realized that some of them were not properly mocking those external calls.

We could confirm it by using [pytest-socket](https://github.com/miketheman/pytest-socket). We had 3 different types of external calls:

- External APIs calls (port 80 or 443): 113/15685 test cases
- ElasticSearch calls (port 9200): 176/15685 test cases
- Redis cache calls (port 6389): 11132/15685 test cases


Before investing time to fix those mocks, we first disabled all those tests to validate whether it was a valid investment of our time.
External API and ElasticSearch calls proved to be worth the investment. For Redis calls, the impact in the codebase could be huge and the reduction in time we would get wouldn't be significant.

After properly mocking them, we could see an improvement of 35% in time by mocking 1.84% of the tests.

In order to prevent this from happening again, we configured [pytest-socket](https://github.com/miketheman/pytest-socket) in our codebase.

4. Upgrade dependencies (including pytest)

When we were adding [pytest-socket](https://github.com/miketheman/pytest-socket), we noticed that some of the project dependencies were outdated.
Hypothesis: Using the latest project dependencies version could have performance improvements?

It was a huge effort to update them all and make sure that everything was working as expected. For example, by upgrading pytest from version 2 to version 6, we had to change some decorator orders, like `@freeze_time` needed to be placed after the `@pytest.fixture` decorator.

By the end of this effort, we could not see any performance improvement. However, it was really valuable to have all dependencies updated, since the latest version could include performance and security fixes.

5. Running tests in parallel

After all these tentatives, we went back to the initial investigation results. By looking at CircleCI documentation, we found the feature of [running tests in parallel](https://circleci.com/docs/2.0/parallelism-faster-jobs/).

CircleCI provides the option to split tests by timing, which was exactly what we were looking for. By doing so, we had our big moment: the test step decreased from about 22m to 6m.

However, [Coveralls](https://coveralls.io/) started failing, since each job had a portion of coverage data. We had to combine multiple coverage files into a single one:

```yaml
    # ...
    - run:
    name: Run Python tests
    command: |
        TEST_FILES=$(circleci tests glob "head/**/test_*.py" | circleci tests split --split-by=timings)
        pytest --no-migrations --junitxml=build/report_${CIRCLE_NODE_INDEX}.xml --cov-append --cov=head --cov-config .coveragerc --cov-report term --cov-report xml --capture=no -n 15 $TEST_FILES
    - run: |
        mv build/coverage.xml build/coverage_${CIRCLE_NODE_INDEX}.xml
        mv .coverage build/.coverage_${CIRCLE_NODE_INDEX}
    - store_test_results:
        path: build
    #...
    - run:
    name: Publish coverage
    command: |
        coverage combine build/.coverage_*
        coveralls
    #...
```

### Bonus action:

CircleCI also provides a great feature to [cache the docker layer](https://circleci.com/docs/2.0/docker-layer-caching/). It may give you some more time improvements.
In our case, we were already using it.

## Lessons learned

- Tech debts should not be ignored and fixes are WORTH the investment.

In this particular large codebase, we had several tech debts that were found by this Working Group. Some of them we were able to fix, but this is something we as engineers should keep our eyes on, to avoid it existing for that long. As time goes by, it may become costly to pay those debts.

- Test levels

    We should be careful about different test levels. We should be aware of the [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) to have a clear definition of the test boundaries. Should it mock external dependencies? Should we test things altogether (integration tests)?

    Automated tests with external dependencies are slower than others. That is why it is really important to have a clear and well-defined Quality Strategy. What are the tools, practices, and processes we have to make sure that we are delivering good code?

- Try to keep dependencies as updated as possible

    Our software evolves as time goes by, such as libraries. Based on this, we should constantly evaluate the tradeoffs of upgrading dependencies.


By the end of this Working Group, we achieved our expected goals: backend tests step execution time running in about 6 minutes (73% of improvement).

Even better than that, we had a great moment to reflect on our practices and raise improvement items.

Like to solve challenges like this one? We have many open positions at the moment. Check out our [engineering culture](https://github.com/loadsmart/culture) and the [careers page](https://loadsmart.com/careers/).
