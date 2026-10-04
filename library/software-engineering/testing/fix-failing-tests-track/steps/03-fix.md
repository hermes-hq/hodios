# Step 3: Fix, one cluster at a time

Work through the approved plan in order.

1. Apply the fix for one cluster. Keep the change minimal and in the style of the surrounding code.
2. Run that cluster's tests, then the tests of the touched modules. Record the real result.
3. If the fix does not turn the cluster green, or turns something else red, revert it, go back to diagnosis for that cluster, and do not pile a second guess on top of the first.
4. Change a test only where the approved plan says the intended behaviour changed. Update the expectation to the new intended behaviour, keep the assertion as strict as before, and add a one-line comment or commit message citing the reason. Never loosen an assertion, add a broad try/except, mark a test skip or xfail, or special-case a test input to get green.
5. Keep a running count of files changed. If the next fix would take the run past {{max_changes}} files, or past the plan's file list by more than a file or two, stop and report instead.

Continue to step 4 when every planned cluster is fixed or explained.
