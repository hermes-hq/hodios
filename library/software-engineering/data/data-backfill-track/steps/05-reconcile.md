# Step 5: Reconcile and close

1. Run the invariant query on the full selection; it must return zero rows, or every remaining row is listed with a reason.
2. Compare before-and-after totals and counts from step 1, and sample-check rows across the key range.
3. Check downstream: replicas caught up, CDC consumers and caches consistent, reports showing the expected change.
4. Clean up: drop the checkpoint and temporary tables after the agreed retention, remove feature flags, keep the old-value copy until the agreed date.
5. Prevent a repeat: add a constraint, a check or a data quality test that would catch this problem early.

Sections: Invariant result, Totals, Downstream checks, Clean-up, Prevention, Summary for the team.
