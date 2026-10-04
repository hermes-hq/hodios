# Step 1: Define SLOs from user journeys

1. List the two to four user journeys that matter most (for example "place an order", "load the feed", "nightly export arrives"). For each, say who is hurt and how when it fails.
2. Pick one or two SLIs per journey: availability as good events over valid events, latency as the share of requests under a threshold, freshness or correctness for pipelines. Say where each is measured (load balancer, service, synthetic probe) and the exact metric or a placeholder.
3. Propose targets and a 28 or 30 day window. Start below current performance if history exists; show the error budget in minutes or failed requests per window.
4. Write a short error-budget policy: what happens when half and all of the budget is spent (slow releases, reliability work first).
5. Note journeys too low in traffic for ratios to be meaningful and suggest synthetic checks.

Sections: Journeys, SLIs, Targets and budgets, Error-budget policy, Open questions.

Stop and wait for approval.
