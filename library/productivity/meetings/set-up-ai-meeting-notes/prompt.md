---
schema: 1
id: set-up-ai-meeting-notes
kind: prompt
title: Set up AI meeting notes for a team
description: Sets up AI note-taking for a team's meetings - which meetings to record, consent and announcement wording, settings to check, a human review step before notes are shared, and a short team policy.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, founder, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [ai-notetaker, recording-consent, privacy, meeting-notes, team-policy]
pairs_with:
  prompts: [check-call-recording-compliance, summarize-meeting-transcript, prepare-to-take-meeting-notes]
args:
  - name: team
    description: The team or organisation, the kinds of meetings it holds (internal, client, interviews, one-to-ones) and where people are based.
    type: text
    required: true
  - name: tool
    description: The note-taking tool you use or are considering, or "not chosen yet". Optional.
    type: text
  - name: concerns
    description: Worries already raised (privacy, client confidentiality, accuracy, people feeling watched). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Which meetings, Consent and announcement, Tool settings to check, Review before sharing, Team policy, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teams adopt AI meeting note-takers sensibly. The tools save real time, but the common failures are predictable: a bot joins every meeting by default, including one-to-ones, HR conversations and client calls where nobody agreed to recording; people speak less candidly once they know a transcript exists; summaries attribute statements to the wrong person or turn a tentative idea into a decision, and are sent to all attendees before anyone checks them; recordings and transcripts sit in a vendor's cloud with unclear retention and may be used to train models. Recording and transcription rules differ by country and sometimes by state or region (one-party versus all-party consent, workplace monitoring and data protection law), and many employers and clients have their own policies. A good setup decides which meetings get notes, makes consent explicit, configures retention and sharing deliberately, and keeps a human in charge of what the record says.

Team: {{team}}
{{#tool}}Tool: {{tool}}{{/tool}}
{{#concerns}}Concerns raised: {{concerns}}{{/concerns}}
</context>

<task>
1. Sort the team's meeting types into: fine to use AI notes with notice; only with explicit agreement of everyone present; never (for example sensitive HR, health, legal, disciplinary, or when a client or participant objects). Give a reason for each group.
2. Write consent and announcement wording: a line for the invite, a sentence to say at the start, and how anyone can ask for it to be switched off without explaining why.
3. List tool settings to check, whatever the tool: who the bot auto-joins, whether recordings or only transcripts are kept, retention period, who can access and share, whether data is used for model training and how to opt out, where data is stored, deletion on request. If no tool is chosen, turn this into selection criteria.
4. Define the review step: who checks the summary before it goes out, what they check (decisions, owners, dates, attribution of sensitive statements, anything said off the record), and that the shared version is the reviewed one.
5. Draft a one-page team policy covering the above in plain language.
6. List open questions for the user to settle with whoever handles legal, privacy or IT, including the jurisdictions involved.
</task>

<constraints>
- Do not state that recording is legal or compliant in any jurisdiction; flag that consent and data rules vary and name what to check.
- Do not claim features or terms of a named tool; tell the user to check them in the tool's own settings and terms.
- Default to not recording when in doubt, and make opting out easy and free of pressure.
- Keep the policy short enough that people will read it.
</constraints>

<output_format>
## Which meetings
Table: Meeting type | AI notes? | Why.

## Consent and announcement
Invite line, spoken line, opt-out line.

## Tool settings to check
Checklist.

## Review before sharing
Who, what, when.

## Team policy
Draft policy, under 300 words.

## Open questions
Bullets for legal, privacy or IT.
</output_format>
