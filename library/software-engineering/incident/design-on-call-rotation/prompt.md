---
schema: 1
id: design-on-call-rotation
kind: prompt
title: Design an on-call rotation
description: Designs an on-call rotation with schedule, escalation, handoff, alert ownership, compensation norms and health checks. Use when starting on-call or when the current one burns people out.
category: incident
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [engineering-manager, sre, tech-lead, devops-engineer]
stack: []
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pager-rotation, escalation, handoff, burnout, follow-the-sun]
pairs_with:
  personas: [site-reliability-engineer, incident-commander]
  prompts: [design-alerting-rules, write-runbook, define-slos]
args:
  - name: team_and_services
    description: Team size, locations and time zones, the services covered, their criticality and support hours, current alert and page volume, and any constraints such as labour rules or existing pay.
    type: text
    required: true
  - name: coverage
    description: Required coverage.
    type: enum
    enum: [business-hours, extended-hours, around-the-clock]
    default: around-the-clock
output_contract:
  format: markdown
  sections: [Assumptions, Rotation, Escalation, Handoff, Alert ownership, Compensation and time off, Health checks, Rollout, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
On-call is sustainable when the rotation is big enough, the pages are few and actionable, handoffs carry context, and the people on it are compensated and rested. It fails when four people cover a week each with 30 pages a night, when nobody owns the noisy alerts, when the secondary is never paged so nobody knows if escalation works, or when time off after a bad night depends on asking. Common reference points: a primary and a secondary, at least six to eight people per around-the-clock rotation (or a follow-the-sun split across regions so nobody is paged at night), and a target of a few pages per shift at most, each one actionable.
</context>

<task>
Design on-call with {{coverage}} coverage for:
<team_and_services>
{{team_and_services}}
</team_and_services>

1. List what you know and what you assume: people, time zones, services and tiers, page volume, existing pay or policy. If headcount or page volume is missing, ask under Open questions and design with a stated assumption.
2. **Rotation.** Pick the shape and justify it: weekly or split-week shifts, primary and secondary, follow-the-sun if there are two or more regions at least six hours apart. State the handover time (a working hour, mid-week rather than Monday or Friday), how often each person is on call per month, and the minimum headcount the shape needs. If the team is too small for the coverage, say so plainly and give options (reduce coverage tier for low-criticality services, share a rotation with another team, vendor support, business-hours only with best-effort nights).
3. **Escalation.** Paging timeline: primary acknowledges within N minutes, then secondary, then the engineering manager or incident commander, with values per service tier. Include how to escalate to other teams and vendors, and when to declare an incident.
4. **Handoff.** A short handoff template: open incidents, ongoing risks, noisy alerts, changes deployed, things to watch. Make the handoff synchronous for 10 to 15 minutes or written with acknowledgement.
5. **Alert ownership.** Every paging alert has an owning team and a runbook link; anything without one does not page. The on-call engineer may silence a non-actionable alert and must file a ticket. Reserve on-call time for reliability work when it is quiet.
6. **Compensation and time off.** Propose norms: pay or time-off-in-lieu per shift and per out-of-hours page, rest after a night page, no on-call in the first weeks for new joiners until they have shadowed. Tell the user to confirm with HR and local labour law, since rules differ by country.
7. **Health checks.** Metrics to review monthly: pages per shift, out-of-hours pages, time to acknowledge, percentage of actionable pages, repeat alerts, and a short on-call survey. Set thresholds that trigger action (for example more than two out-of-hours pages per week).
8. **Rollout.** Shadowing and reverse-shadowing, a paging test of the full escalation chain, and a review after the first month.
</task>

<constraints>
- Do not invent headcount, salaries, or legal requirements. Compensation is a proposal of norms with ranges or structures, not a figure for this company.
- Prefer fewer, actionable pages over more coverage; never solve noise by adding people.
- Keep it fair: the same rules apply to managers and senior engineers who are on the rotation.
- Times are written with a time zone.
</constraints>

<output_format>
## Assumptions
Bullets.
## Rotation
The shape, a table of shifts with times and who covers them (placeholders), and on-call frequency per person.
## Escalation
A table by service tier: acknowledge target, escalate after, next level.
## Handoff
The template in a fenced block.
## Alert ownership
Rules as bullets.
## Compensation and time off
Proposed norms, marked "confirm with HR and local law".
## Health checks
A table: metric, target, action threshold.
## Rollout
Numbered steps with dates or weeks.
## Open questions
Numbered.
</output_format>
