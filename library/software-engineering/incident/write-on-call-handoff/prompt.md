---
schema: 1
id: write-on-call-handoff
kind: prompt
title: Write an on-call handoff
description: Writes the end-of-shift on-call handoff covering open incidents, alerts that fired and why, silences and their expiry, risky changes in flight and what to watch. Use at every rotation change.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [notes, logs, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shift-handover, alert-silences, toil, follow-ups]
pairs_with:
  prompts: [design-on-call-rotation, write-runbook, prune-noisy-alerts, write-incident-update]
  personas: [site-reliability-engineer]
args:
  - name: shift_notes
    description: Your raw notes from the shift - pages and alerts with times, what you did, open incidents or tickets, silences you set, deploys or migrations in progress, anything odd. Chat snippets and alert exports are fine.
    type: text
    required: true
  - name: shift_window
    description: The shift being handed over, with time zone, for example "Mon 09:00 to Tue 09:00 UTC".
    type: string
  - name: next_on_call
    description: Who takes over and anything they should know about their context (new to the service, different time zone).
    type: string
output_contract:
  format: markdown
  sections: [Status line, Needs action now, Open incidents, Alerts this shift, Silences and overrides, Changes in flight, Watch list, Toil and follow-ups, Gaps in these notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn an outgoing on-call engineer's messy notes into a handoff the next person can act on in five minutes. Handoffs fail in three predictable ways: a silence or manual override expires mid-shift and nobody knows why it existed; an incident is "mostly fixed" with no owner or next step; and alert noise is mentioned but never turns into a ticket, so the same pages wake the next person. A good handoff leads with what needs action, gives every open item an owner and a next check time, and states each silence with its expiry and the condition for removing it.

{{#shift_window}}Shift: {{shift_window}}{{/shift_window}}
{{#next_on_call}}Next on call: {{next_on_call}}{{/next_on_call}}
</context>

<task>
<shift_notes>
{{shift_notes}}
</shift_notes>

1. Extract every item and sort it: open incident, alert that fired, silence or manual override (paused job, scaled replica count, feature flag flipped, failover), change in flight (deploy, migration, config rollout, vendor maintenance), customer escalation, or toil.
2. For each open incident: severity, current state (investigating, mitigated, monitoring, resolved pending follow-up), what is known, what is not, who owns it now, the next action and when to check again.
3. For each alert that fired: count, times, whether it was actionable, what was done, and a classification: real issue, known noise, flapping, or unexplained. Unexplained ones go on the watch list.
4. For each silence or override: what it hides, when it expires, who set it, and the condition that makes it safe to remove. Flag any with no expiry, or an expiry inside the next shift.
5. For changes in flight: what is rolling out, current stage, how to tell it is going wrong, and the rollback.
6. Write the watch list: at most five things the next person should actively check, each with a signal and a threshold ("if checkout p99 goes above 800 ms again, page payments").
7. Turn repeated noise and manual work into follow-up tickets with a one-line title and owner placeholder.
8. Write one status line at the top: calm, degraded or incident in progress, plus the single most important thing.
</task>

<constraints>
- Use only what is in the notes. Never invent times, ticket numbers, owners or causes; write [owner?], [time?] or [ticket?] and list the gap.
- Keep the whole handoff readable in five minutes: bullets, no narrative of the shift. Write "None" under any empty section; never pad a quiet shift.
- If the notes give nothing to hand over (no pages, open items, silences or changes, and no statement that the shift was quiet), do not fill the template: ask for the shift's pages and alerts, open incidents, silences and overrides, and changes in flight, and stop.
- Use one time zone throughout and say which; if the notes mix zones, convert and say so.
- Do not soften an unresolved issue into "resolved". If the notes say it stopped on its own, write "stopped, cause unknown".
- Leave out secrets, tokens, customer personal data and internal hostnames that are not needed to act.
{{> output/uncertainty}}
</constraints>

<output_format>
## Status line
One line.
## Needs action now
Numbered, or "Nothing".
## Open incidents
Table: incident | severity | state | owner | next action | check again at.
## Alerts this shift
Table: alert | times fired | actionable? | classification | what was done.
## Silences and overrides
Table: what | hides | expires | set by | safe to remove when. Flag missing expiries.
## Changes in flight
Bullets: change, stage, warning signs, rollback.
## Watch list
Up to five bullets, each with signal, threshold and action.
## Toil and follow-ups
Bullets: ticket title, owner placeholder.
## Gaps in these notes
Bullets of what the next person should ask before the outgoing engineer logs off.
</output_format>
