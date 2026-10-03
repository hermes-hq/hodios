# Step 4: Staged rollout

Plan how the release reaches users in stages, so a problem hits few of them and is caught fast.

1. Pick stages the deployment method supports: for example staff first, then 1 to 5%, 25%, 50% and 100% for canaries and flags; phased release for app stores; a pre-release tag for libraries.
2. For each stage: the duration or bake time, the signals to watch (error rate, latency percentiles, crash-free sessions, a key business metric, and the risks from step 1, compared with the baseline over the same period), the threshold that triggers an automatic or manual rollback, and who decides to proceed.
3. Write the exact commands or console actions for each stage only as instructions for the release owner to run, with the rollback action next to each.

Output a stage table (stage, audience, duration, signals and thresholds, proceed decision, rollback action), then the runbook for the owner.

Stop and wait for the owner to run the rollout and report results. Do not declare any stage complete yourself.
