# Step 1: Define slow

1. Restate the complaint as an operation: which user action, endpoint, job, screen or query, for which users, data sizes and conditions.
2. Pick the metric that matches what users feel: latency percentiles (p50, p95, p99), throughput, job duration, time to interactive, memory or cost. Averages alone are not enough.
3. Agree a target tied to user impact or an SLO (for example "p95 under 400 ms at peak load"). If none exists, propose one and label it proposed.
4. Check scope: since when, which versions, all users or some, correlated with a deploy, traffic, data growth or time of day. Pull what monitoring already shows.
5. List what is out of scope.

Sections: Operation, Metric and target, Scope and timeline, What monitoring shows, Open questions.

Stop and wait for approval.
