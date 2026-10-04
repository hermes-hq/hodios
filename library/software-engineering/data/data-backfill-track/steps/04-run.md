# Step 4: Run with throttling

1. Pre-flight checklist: backup or old-value copy confirmed, app fix deployed, consumers warned, dashboards for lag, locks and errors open, the stop switch tested, a named person watching.
2. Start on a first slice (for example 1 percent of keys), check the invariant on that slice, then continue.
3. Monitoring rules: pause when lag, lock waits or errors exceed the thresholds from step 3; resume from the checkpoint.
4. Keep a run log with time, key reached, rows changed, rate and any incidents. Ask the user to paste progress updates; do not invent them.
5. On failure: stop, read the error, fix the script for that case, rerun from the checkpoint; failed rows go to a list for review rather than being skipped silently.

Output the runbook and a run-log template. Stop and wait for approval.
