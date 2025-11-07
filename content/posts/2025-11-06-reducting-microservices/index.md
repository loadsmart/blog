---
title: "Less is More: Reducing Microservices Architecture Complexity"
author: Gustavo Rodrigues
twitter: gustahrodrigues
layout: post
lang: en
path: /blog/less-is-more-reducing-microservices-architecture-complexity
date: 2025-11-06
comments: true
---

Like many fast-growing engineering organizations, our microservices architecture evolved organically over the years. 
What started as a deliberate move away from a monolith to enable team autonomy and faster deployments had grown into a sprawling ecosystem of services. 

Several factors prompted us to take action:

- **Operational burden:** Each service required monitoring, alerting, documentation, and security updates
- **Cost inefficiency:** We were paying for infrastructure that wasn't delivering proportional value
- **Developer velocity:** Engineers spent excessive time determining whether existing services could be leveraged to deliver new features
- **Maintenance overhead:** Small, rarely-used services still required the same care as high-traffic ones
- **Lack of knowledge:** Many of these services were created years ago by engineers who are no longer with the company, 
leaving the current owners without the necessary context and expertise to effectively manage and maintain them.

The issue wasn't about having too many services, but rather which ones we could safely consolidate or eliminate.

## Methodology: Building the Decommissioning Score

Rather than relying on intuition or anecdotal evidence, we developed a data-driven scoring system to evaluate each service objectively. 
Our primary goal was to establish an initial filter using a _"decommissioning probability score"_ to help us determine which services to address first.

### Metrics Collection

We collected three categories of metrics for each service over the last year (2024):

- **Usage metrics**
    - \# of web requests received (API endpoint utilization), excluding health checks and admin endpoints
    - \# of messages processed from our event-driven architecture

- **Cost Metrics**
    - Cloud cost (database, cache, load balancer, DNS…)
    - K8s cluster cost
    - Log ingestion cost
    - Observability cost

- **Maintenance Metrics**
    - \# of PRs merged

There are several other metrics that could be used, like # of deployments, # of incidents, and the percentage of out-of-date dependencies, among others; 
however, we decided to adhere to the original list as it is more suitable for our context.

### Scoring Algorithm

Before applying our scoring formula, we normalized all raw metric values to a `0-1` interval to ensure fair comparison across vastly different scales. 
We used min-max normalization across our entire service portfolio: `normalized_value = (value - min_value) / (max_value - min_value)`. 

However, these metrics had opposite relationships to decommissioning probability. For Total Cost, higher values directly indicated candidates 
for removal - expensive services with low returns were prime targets. For the Usage and Maintenance metrics, the logic was inverted: 
higher values indicated a healthy, actively-used service that should not be decommissioned. Therefore, we applied `1 - normalized_value` 
to these three metrics, ensuring that low activity translated to high decommissioning scores. 
This inversion was critical - a service with minimal traffic and few code changes should score high for removal, while a high-traffic, actively 
maintained service should score low.

We then applied the following score for each metric:
- Total Cost: 30%
- \# PRs merged: 20%
- \# of web requests received: 30%
- \# of messages processed: 20%

We combined all costs into a single metric because our main goal is service usage rather than cost reduction.

Finally, we applied the following decommissioning score formula for each service:

```
Decommissioning Score = (0.30 × Total Cost) + (0.20 × # PRs merged) + (0.30 × # of web requests received) + (0.20 * # of messages processed).
```

We defined a score greater than 80 as indicating a high likelihood of decommissioning the service. 
A score greater than 50 suggests that further investigation is warranted, while scores below that threshold are not considered significant.

## Execution: From Analysis to Action

The scoring system identified 8% of candidate services as highly likely, with 44% warranting further investigation.

Even after applying the initial score as a filter, a critical analysis was still lacking: **product features in those services**. 
Is the feature that the service is supposed to deliver still in use? 
Is it still relevant for our customers? Do we have any plans to leverage it in the future?

We engaged in various research activities to collect insights from Product Managers and Stakeholders. 
Additionally, a thorough technical assessment of the service was conducted and properly documented. 
This process eliminated some more services, resulting in 16 out of 45 services identified for decommissioning.

We implemented the following strategy to decommission the remaining services:
- For services with valuable functionality, we migrated the logic to the appropriate services or libraries.
- For deprecated services:
    - First, we added a feature flag on the clients to allow easy activation or deactivation.
    - After a couple of weeks with no usage and no complaints, we removed the client code.
    - We created a snapshot of the service’s database.
    - We shut down all cloud resources associated with the service.
    - Finally, we wrote thorough documentation explaining the reasons for decommissioning the service, focusing on the assumptions made during the process.

### Results

We have decommissioned 12 out of 44 services, with 4 remaining to be decommissioned later. 
This results in a 29% reduction in services for one team and a 37% reduction for another.

In terms of savings, we estimated the following costs: 
- Microservices Infrastructure Cost: USD 33.6k per year 
- Engineering Maintenance Cost: USD 34.9k per year

### Key Learnings

1. Periodic Architecture Review is Essential

The biggest takeaway: architecture reviews should be a regular, scheduled practice - not something we do when complexity becomes painful. 

2. Context Matters: This Wasn't Over-Engineering

It's tempting to look back and label the creation of these services as "over-engineering." That would be incorrect and unfair to the engineers who made those decisions.

When these services were created, they addressed real problems:
- We were smaller and optimizing for team autonomy over operational efficiency
- Several services were built for features that had legitimate product hypotheses that simply didn't pan out
- Our scale and traffic patterns were different
- Technology and best practices evolved (e.g., service mesh capabilities, observability tools)

**The lesson:** Good architectural decisions can become wrong architectural decisions as context changes. This isn't failure—it's evolution.

3. Optimization is continuous work

Software architecture isn't "done". It requires ongoing attention and optimization, just like code refactoring. 
Without this project, our complexity would have continued growing linearly while our ability to manage it grew sub-linearly—a recipe 
for future technical debt and reduced competitiveness.

We learned that:
- The cost of complexity is often invisible until measured explicitly
- Small inefficiencies compound across dozens of services
- Proactive optimization is cheaper than reactive firefighting
- Regular "pruning" enables healthier future growth

### What's Next

This project was just the first step. We plan to decommission the remaining four services, evolve this work, and make it a regular part of our engineering culture.

### Conclusion

Reducing our microservices complexity was more than a cost-saving exercise—it was a strategic investment in our engineering 
organization's future effectiveness. By approaching the problem systematically with data-driven scoring, careful validation, 
and phased execution, we reduced complexity while maintaining system reliability.

The most important lesson? Architecture, like code, requires continuous refactoring. The services we decommissioned weren't 
mistakes—they were correct decisions that had outlived their usefulness. Recognizing when to evolve or eliminate architectural 
patterns is just as important as knowing when to introduce them.

---

_Have you gone through a similar architecture consolidation project? What metrics did you find most valuable? I'd love to hear about your experiences in the comments._

---

Like to solve challenges like this one? We have many open positions at the moment. Check out our [engineering culture](https://github.com/loadsmart/culture) and the [careers page](https://loadsmart.com/careers/).