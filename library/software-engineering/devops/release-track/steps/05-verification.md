# Step 5: Verification

Confirm the release works for users, not just that it deployed.

1. Ask the release owner for the observed data at full rollout: the signals from step 4, version adoption, error and crash reports grouped by new issues, support tickets, and results of smoke tests on the critical user journeys.
2. Compare against the pre-release baseline and the thresholds. Call out regressions, even small ones, and new error groups that appeared with this version.
3. Check the specific risks from step 1: migrations finished, flags in the intended state, deprecated behaviour still served where promised.
4. Recommend one outcome: verified, verified with follow-ups, or roll back or forward-fix now, with the evidence. If data is missing, say what is missing instead of concluding.

Output a verification report: outcome, evidence table (signal, baseline, now, status), follow-ups with owners, and anything that must go into a postmortem if the release caused an incident.

Stop and wait for approval. Do not write the announcement until the release is verified.
