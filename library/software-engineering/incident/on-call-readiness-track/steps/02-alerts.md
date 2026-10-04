# Step 2: Design symptom-based alerts

1. For each approved SLO, multi-window burn-rate alerts: page at a fast burn (about 2% of a 30-day budget in 1 hour, checked over 1 hour and 5 minutes) and a medium burn (5% in 6 hours), and open a ticket for a slow burn (10% in 3 days). Show the thresholds for these targets.
2. Add only the cause alerts that predict user harm before a symptom shows: certificate or credential expiry, disk or quota full within hours at the current rate, a job that missed its window, a dead-letter queue growing.
3. For every alert: name, expression or placeholder, severity (page or ticket), owner, a summary in user terms, and the runbook it will link to (written in step 4).
4. Routing: who gets paged, grouping so one outage pages once, quiet hours for tickets, and dependencies whose alerts should suppress this service's.
5. Estimate expected pages per week; if it exceeds about two per shift, cut or demote.

Sections: Alert table, Rules, Routing, Expected pager load, Open questions.

Stop and wait for approval.
