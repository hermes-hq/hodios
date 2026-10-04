# Step 4: Write a runbook per paging alert

For each paging alert approved in step 2:

1. What it means in user terms and the likely impact.
2. First five minutes: confirm it is real, size the impact, and when to escalate straight away.
3. Diagnosis: read-only checks in order of likelihood, each with the command or dashboard panel, what healthy looks like and which mitigation an unhealthy result points to.
4. Mitigations from safest to riskiest (roll back, turn off the flag, shed load, fail over), each with how to verify it worked and how to undo it. Risky steps need a second person.
5. Escalation: who, when, and what to tell them.

Keep each runbook to one screen where possible. Mark unknown commands, hosts and contacts as placeholders.

Sections: one runbook per alert, then Shared checks, Open questions.

Stop and wait for approval.
