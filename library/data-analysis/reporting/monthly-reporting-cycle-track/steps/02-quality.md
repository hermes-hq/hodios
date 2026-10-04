# Step 2: Quality checks

Before calculating anything, check the snapshot:

1. Completeness: every day and segment present; row counts against last month and the same month last year, flagging changes beyond a stated tolerance.
2. Reconciliation: totals against an independent figure (finance ledger, source system screen, last report's restated value).
3. Validity: nulls in key fields, duplicates, out-of-range or negative values, unexpected new categories.
4. Definitions: any change in source logic, product codes, regions or tracking since last month.

For each issue: its size, its likely effect on the metrics, and the fix (correct, exclude, footnote, or escalate to the owner). Write sections: Checks run (with real results), Issues, Fitness for reporting. Stop and wait for approval.
