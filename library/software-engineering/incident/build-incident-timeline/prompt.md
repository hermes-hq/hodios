---
schema: 1
id: build-incident-timeline
kind: prompt
title: Build an incident timeline
description: Builds a timestamped incident timeline from chat logs, alerts and deploy records, marking detection, escalation, mitigation and the gaps between them. Use when preparing a postmortem.
category: incident
version: 1.0.0
status: incubating
stage: [review]
role: [sre, devops-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [logs, transcript, message]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [postmortem, timeline, time-to-detect, blameless]
pairs_with:
  personas: [incident-commander]
args:
  - name: raw_material
    description: Incident channel export, alert history, deploy and change logs, status page posts and any notes, with their timestamps.
    type: text
    required: true
  - name: timezone
    description: Timezone to normalise every timestamp to, as an IANA name or UTC.
    type: string
    default: UTC
output_contract:
  format: markdown
  sections: [Key metrics, Timeline, Gaps, Conflicts, Missing data]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A postmortem is only as good as its timeline. Raw material comes from tools that log in different timezones and formats, chat messages are posted minutes after the events they describe, and the most useful facts are the gaps: twenty minutes between the first customer report and the first alert, or an alert that fired and sat unacknowledged. The timeline must be exact, sourced and blameless.
</context>

<task>
Build an incident timeline in {{timezone}} from this material:
{{raw_material}}

1. Parse every timestamp. Convert each to {{timezone}}, noting the source timezone when it differs. If a source has no timezone and you cannot infer it from context, say so and mark those times "unverified zone".
2. Extract events and tag each with one type: trigger, impact-start, detection, acknowledgement, escalation, decision, mitigation-attempt, mitigation-effective, communication, resolution, other.
3. Mark each event "recorded" (the source states it) or "inferred" (you deduced it), and give the source for every event.
4. Compute the key intervals: impact start to detection, detection to acknowledgement, acknowledgement to mitigation, impact start to resolution. If a boundary event is missing, say which and do not compute that interval.
5. Find gaps: any stretch of more than 15 minutes during impact with no recorded action, detection by a customer or a person before any alert, alerts that fired without acknowledgement, communication cadence breaks, failed mitigation attempts.
6. List conflicts where sources disagree, with both values.
</task>

<constraints>
- Do not invent events or fill gaps with plausible guesses. A gap is a finding.
- Do not infer causality. "Deploy at 10:02, errors from 10:05" is two events, not a cause.
- Stay blameless: describe actions and systems, use the role or handle exactly as given, and add no judgement words such as "failed to" or "should have".
- Quote source text only when the exact words matter, and keep quotes short.
</constraints>

<output_format>
## Key metrics
A table: interval, start event, end event, duration.
## Timeline
A table in chronological order: time ({{timezone}}), event, type, recorded or inferred, source.
## Gaps
Numbered, each with its time range and why it matters for the postmortem.
## Conflicts
Bullets, or "None".
## Missing data
What to pull from which system to complete the timeline.
</output_format>
