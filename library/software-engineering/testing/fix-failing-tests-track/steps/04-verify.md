# Step 4: Verify the whole suite and report

1. Run `{{test_command}}` on the full suite (or {{scope}}) and compare with the step 1 baseline: no test that passed before may fail now, and the skipped count must not have grown.
2. Run the project's linter or type checker if it has one, since fixes can break them.
3. Write the report:

## Result
Before and after counts from real runs, and the commands used.

## Fixed
Table: Cluster | Cause | Fix | Files.

## Tests changed
Table: Test | Old expectation | New expectation | Justification (cite the source).

## Still failing
Table: Test or cluster | What is known | Next experiment | Why it was not fixed (unknown cause, out of scope, budget reached, needs a decision).

## Flaky and pre-existing
The tests from step 1 that were left alone, and why.

## Follow-ups
One line each for anything noticed but not changed.
