---
schema: 1
id: run-site-progress-meeting
kind: prompt
title: Run a building site progress meeting
description: Plans and chairs a recurring site progress meeting between client, builder and trades - programme, issues, variations, health and safety and decisions - with a standing agenda and a minutes template.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [project-manager, operations-manager, individual]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
subject: [construction]
tags: [renovation, site-meeting, variations, programme, contractors]
pairs_with:
  prompts: [write-site-visit-report, plan-construction-lookahead, write-meeting-recap-email]
args:
  - name: project
    description: The job in a sentence or two (for example "kitchen extension on a house, builder plus electrician and plumber", "fit-out of a shop unit"), the stage it is at and the contract type if known.
    type: text
    required: true
  - name: attendees
    description: Who comes and in what role (client, project manager or architect, main contractor, trades), and how often you meet.
    type: text
    required: true
  - name: current_issues
    description: Open issues, delays, changes requested or disputes to cover at the next meeting. Optional.
    type: text
  - name: country
    description: Country or region, so contract and safety terms are framed correctly. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and rhythm, Standing agenda, Before the meeting, Chairing notes, Variations and instructions, Minutes template]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help clients, project managers and builders run site progress meetings that keep a building job on track. Experienced project managers know these meetings go wrong in predictable ways: they turn into a walk-round chat with nothing written down, verbal instructions on site become disputed extras weeks later, the programme is discussed as "roughly on track" instead of against dates, trades that are not present get blamed, and safety only comes up after an incident. A good site meeting is short, follows the same agenda every time, compares progress with the programme, separates issues from variations, records who instructed what, and ends with dated actions that are circulated the same day. Contract terms (who can instruct a change, how variations are priced and approved, notice periods for delay) vary by contract and country, so the meeting must follow whatever the contract says rather than general habit.

Project: {{project}}
Attendees and frequency: {{attendees}}
{{#current_issues}}
<current_issues>
{{current_issues}}
</current_issues>
{{/current_issues}}
{{#country}}Country or region: {{country}}{{/country}}
</context>

<task>
1. State the meeting's purpose for this job in two lines and recommend a rhythm (weekly or fortnightly, length, on site or remote, with a short walk-round before or after) suited to its stage.
2. Write a standing agenda in this order, each with a timebox: health and safety and site conditions; progress against the programme (what was planned since last time, what was done, slippage in days); look-ahead for the next two to three weeks including deliveries, inspections and access; issues and risks; design questions and information needed; variations and instructions; money if the client wants it (valuations, payments due); actions and next meeting.
3. List what each party brings: the builder an updated programme or progress list, photos and a list of information required; the client or their adviser decisions owed; trades their dependencies.
4. Give chairing notes: compare against dates, not feelings; when a delay is reported, ask cause, new date and impact on following trades; park design debates for a separate session; do not let blame for an absent trade stand without hearing from them; close every item with an owner and a date.
5. Set out how to handle variations: no change is agreed in the meeting without being written down; record who requested it, a short description, whether price and time impact are still to be quoted, and who has authority to approve under the contract. Flag that only the person named in the contract should instruct changes.
6. If current issues are given, place each under the right agenda item and suggest the question to ask about it.
7. Provide a minutes template with tables for programme status, issues, variations and actions, and say when and to whom minutes go and how corrections are handled.
</task>

<constraints>
- Do not state what a specific contract or law requires; say "check your contract" or "check local rules" where it matters, and note the country if given.
- Do not invent programme dates, costs or contract clauses; use placeholders.
- Keep variations separate from issues: an issue becomes a variation only when someone with authority instructs a change.
- Safety stays the first item; do not give technical safety rulings, point the user to the responsible person or regulator.
- Keep the meeting under an hour for small and medium jobs.
</constraints>

<output_format>
## Purpose and rhythm
Two to four lines.

## Standing agenda
Table: Item | Timebox | Lead | Output.

## Before the meeting
Bullets per party.

## Chairing notes
Bullets, including questions to ask on delays.

## Variations and instructions
The rules plus a variations log table: No. | Requested by | Description | Price impact | Time impact | Approved by | Status.

## Minutes template
Headings and tables ready to fill, plus circulation rules.
</output_format>
