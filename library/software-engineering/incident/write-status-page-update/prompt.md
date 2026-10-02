---
schema: 1
id: write-status-page-update
kind: prompt
title: Write a status page update
description: Writes a status update for the current incident phase in plain language, without blame or speculation, with a committed next-update time. Use during an outage for customers or internal stakeholders.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, support-agent, engineering-manager]
stack: []
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [status-page, incident-comms, customer-communication]
pairs_with:
  personas: [incident-commander]
args:
  - name: facts
    description: What is confirmed right now - affected features, regions, start time with timezone, current actions, workaround, the time now.
    type: text
    required: true
  - name: phase
    description: Incident phase this update is for.
    type: enum
    enum: [investigating, identified, monitoring, resolved]
    default: investigating
  - name: audience
    description: Who reads it - customers on a public status page, or internal staff such as support and sales.
    type: enum
    enum: [customers, internal]
    default: customers
output_contract:
  format: markdown
  sections: [Title, Update, Short version, Next update, Confirm before posting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
During an incident, the status update is often the only thing customers see. Bad updates guess at causes that later turn out wrong, blame a vendor, use internal jargon, promise fix times nobody can keep, or go silent for an hour. Good updates say what users are experiencing, what is being done, and exactly when the next update will come. Updates are written under time pressure, so this prompt drafts immediately instead of asking questions.
</context>

<task>
Write the {{phase}} update for a {{audience}} audience from these facts:
{{facts}}

Phase guidance:
- investigating: we are aware, what users may see, that we are working on it.
- identified: the cause is found and a fix is in progress. Describe the cause only in general terms and only if the facts confirm it.
- monitoring: a fix is applied, we are watching, what users may still see.
- resolved: the impact has ended, the duration with start and end times, anything users need to do, and a single apology.

For a customers audience: plain language, impact in terms of what users can and cannot do, affected regions or plans, a workaround if one exists, no internal system names, no hostnames, no people, no vendors named as at fault.
For an internal audience: more technical detail is fine, plus the incident owner, the customer impact in numbers if known, and a suggested line for support to give customers.
</task>

<constraints>
- State only what the facts confirm. Never speculate about cause, scope or fix time. If the facts include no confident ETA, do not give one.
- Always give a next-update time: 30 minutes after now for investigating and identified, 60 minutes for monitoring. Use the timezone from the facts; if the current time is missing, write a placeholder.
- If a must-have fact is missing (what is affected, or since when), still write the draft, insert `[CONFIRM: what is needed]` at that spot, and list it under "Confirm before posting".
- Keep the customer update under 120 words. No exclamation marks, no marketing language.
</constraints>

<output_format>
## Title
One line, under 80 characters, naming the affected feature.
## Update
The update text, ready to paste.
## Short version
Under 280 characters for an in-app banner or social post.
## Next update
The committed time.
## Confirm before posting
Bullets of each `[CONFIRM]` item, or "Nothing to confirm".
</output_format>
