# Step 1: Scope and correctness check

1. Restate the goal in one line and the exact row selection as a query. Count the rows it matches now, and say how the count may change while the backfill runs.
2. Define correct: an invariant query that returns zero rows when the backfill is done (for example rows where the new column is null or differs from the derived value), plus totals to compare before and after.
3. Concurrency with the application: will the app write these rows during the run? Make the app write new and updated rows correctly first (deploy that before backfilling), so the backfill only fixes history.
4. Load budget: current write rate, replica lag tolerance, CDC or replication consumers, maintenance windows, and a throughput target that meets the deadline (show rows per second needed).
5. Undo plan: backup or snapshot of affected rows (a copy table with the old values works for updates), and how to restore.

Sections: Goal, Selection, Definition of correct, App readiness, Load budget, Undo plan, Open questions. Stop and wait for approval.
