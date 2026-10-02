# Step 4: Fix

Make the smallest change that fixes the root cause.

1. Implement the approved option at the root cause. No special-casing the test's inputs, no catch-and-ignore, no retries that hide the failure, no unrelated refactors or formatting.
2. Run the regression test and confirm it passes. Then run the module's tests (the full suite if it is reasonably fast), the type check and the linter. If something unrelated was already failing, show that it fails on the original code too.
3. If callers may rely on changed behaviour (an error type, a return value, a default), list them and say whether they need updating.
4. Remove any temporary instrumentation from step 2.

Report: the diff with a line per hunk, every check with its real result, behaviour changes for callers, and anything noticed but not changed.

Stop and wait for approval before preparing the pull request.
