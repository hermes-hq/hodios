# Step 3: Dry run on a sample

Give the user the commands to run; ask for the outputs. Do not invent results.

1. Run dry-run mode on a small key range in production (read-only) or on a recent copy; record how many rows would change and inspect 10 to 20 before-and-after examples, including edge cases (nulls, oldest rows, unusual values).
2. Run a real write on a copy, or on a tiny production range if the user accepts that risk, then run the invariant query for that range and rerun the batch to prove idempotency (zero changes the second time).
3. Measure time per batch and load (lag, locks, CPU), then set the batch size and sleep to stay within the load budget.
4. Recompute total duration; if it misses the deadline, say what to change.

Sections: Commands, Results (from the user), Tuned settings, Duration estimate, Go or no-go. Stop and wait for approval.
