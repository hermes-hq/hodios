# Step 3: Data checks

From the approved metric cards, prove the data can produce each metric.

1. Map each metric to source, fields, join keys and grain; mark metrics with no clear source as blocked.
2. Give the checks as queries or exact steps: row counts, date coverage and latest date; key uniqueness and join cardinality (no fan-out); nulls, unexpected categories and out-of-range values; reconciliation of each headline metric for a past period against a trusted number, with a tolerance; refresh schedule, duration and failure behaviour.
3. Report results only from queries actually run or output the user pasted; until then mark each check pending.
4. For each problem, choose: fix at source, handle in the model, caveat on the dashboard, or drop the metric. Confirm the refresh meets each decision's freshness need.

Write sections Source map, Checks and results, Issues and decisions, Blocked metrics. Stop and wait for approval.
