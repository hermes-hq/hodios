---
schema: 1
id: prune-noisy-alerts
kind: prompt
title: Prune noisy alerts
description: Analyses an alert history export to cut alert fatigue, finding alerts nobody acts on, flapping, duplicates and missing owners, with a delete, tune, route or keep decision per alert.
category: incident
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [sre, devops-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [logs, dataset, config]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [alert-fatigue, alert-hygiene, flapping, pager-load, symptom-based-alerting]
pairs_with:
  prompts: [design-alerting-rules, define-slos, write-on-call-handoff, design-on-call-rotation]
  personas: [site-reliability-engineer]
args:
  - name: alert_history
    description: An export of fired alerts for at least two weeks - alert name, time fired and resolved, severity, service, who acknowledged, and any notes on what was done. CSV, JSON or pasted rows. Include the current rule definitions if you can.
    type: text
    required: true
  - name: slos
    description: The service SLOs or user-facing objectives the alerts are meant to protect, if any exist.
    type: text
  - name: team_size
    description: People on the rotation, so pages per person per shift can be judged.
    type: number
output_contract:
  format: markdown
  sections: [Pager load, Findings, Decision per alert, Quick wins, Rule changes, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit an existing set of alerts from what actually fired, not from how the rules read. Alert fatigue comes from a few repeat offenders: alerts nobody acts on, alerts that flap open and closed within minutes, several alerts firing for one underlying problem, alerts with no owner, and thresholds on causes (CPU, restarts, queue depth) instead of what users feel. The usual result of a careful pass is that a small share of alert rules produce most pages, and most of those can be deleted, tuned or demoted to tickets. A widely used health target is no more than about two actionable pages per on-call shift; above that, real signals get missed.

{{#team_size}}People on the rotation: {{team_size}}{{/team_size}}
</context>

<task>
<alert_history>
{{alert_history}}
</alert_history>
{{#slos}}
<slos>
{{slos}}
</slos>
{{/slos}}

1. Compute pager load: total pages, pages per week, pages outside working hours, and pages per shift (per person if team size is given). Rank alert rules by count and show the share of all pages the top five produce.
2. For each alert rule, measure: fire count, median time open, share auto-resolved within 10 minutes (flapping signal), share with any recorded action, and whether it co-fires within 5 minutes of another alert more than half the time (duplicate signal). Say when the data lacks a field and the measure is a guess.
3. Classify each rule: symptom (users affected), cause (resource or component state), or housekeeping. Check against the SLOs if given: does it protect one?
4. Decide per rule:
   - delete: fired without action in most cases, or duplicates a better alert.
   - tune: real signal but wrong threshold, window or `for` duration; propose the new value and why (longer `for`, hysteresis, rate over a longer window, percentile instead of average).
   - route: real but not urgent; send to a ticket queue, business-hours channel or the owning team.
   - keep: actionable, owned, rarely false.
   Every rule gets a missing-owner flag if no team or runbook is attached.
5. Name the quick wins: the three to five changes that remove the most pages for the least risk, with the expected page reduction from the history.
6. For alerts you delete, say what still catches the underlying failure (an SLO burn-rate alert, a dashboard, another rule). If nothing would, mark it as a coverage gap instead of deleting it.
</task>

<constraints>
- Base every number on the export; show how you counted. If the export is shorter than two weeks or lacks acknowledgement or action data, say how that limits the conclusions.
- Never recommend deleting the only alert that would catch data loss, security events, certificate or credential expiry, or a total outage. Tune or route those instead.
- Do not invent rule definitions or metric names; write proposed changes against the rules given, or as placeholders.
- Recommend a review with the owning team before deleting alerts they own.
{{> output/uncertainty}}
</constraints>

<output_format>
## Pager load
Five to eight lines with the numbers and the top-five share.
## Findings
Bullets: flapping, duplicates, unowned, cause-based, out-of-hours pattern.
## Decision per alert
Table: alert | fires | actioned % | flapping % | type | decision | reason | owner?
## Quick wins
Numbered, each with expected pages removed per week.
## Rule changes
Fenced blocks or a table with old and new threshold, window, `for` and routing.
## Gaps
Coverage gaps and missing data, or "None".
</output_format>
