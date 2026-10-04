# Step 1: Pin down the question

<question>
{{question}}
</question>

1. Restate the question as the decision it informs and the answer that would change that decision ("If churn in the new plan is higher than in the old one by more than X, revert pricing").
2. Define every metric precisely: numerator, denominator, filters, time window, grain, and how missing data counts.
3. Inspect the data at `{{data_path}}`: columns, row counts, date range, grain and known quality issues. Check that it can answer the question; if it cannot, say what is missing.
4. Plan the analysis: the comparisons, breakdowns and checks needed, and the charts (one per finding the decision needs, at most about six).
5. List assumptions and the questions for the requester.

Write the artifact: Decision, Metric definitions, Data fit, Analysis plan, Planned charts, Assumptions, Open questions. Stop and wait for approval.
