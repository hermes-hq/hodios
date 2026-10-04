# Step 5: Verify and write up

1. Re-run the full baseline measurement with all kept changes and compare with step 2 using the same method.
2. If possible, confirm in the environment where the complaint came from, and name the monitoring signal to watch after release with an alert threshold.
3. Write a short write-up for the reporter and the team (under 400 words): the problem in user terms, the cause, what changed, before and after numbers with run counts, whether the target is met, and what remains.
4. Add a guard against regression: a benchmark or budget in CI, a query-count test, or an alert.

Sections: Result, Cause, Changes, Before and after, Remaining work, Regression guard.
