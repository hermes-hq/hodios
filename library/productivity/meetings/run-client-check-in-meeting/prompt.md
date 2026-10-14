---
schema: 1
id: run-client-check-in-meeting
kind: prompt
title: Run a recurring client check-in meeting
description: Plans a recurring client status meeting for an agency, consultant or freelancer - a standing agenda, the status note to send first, how to raise risks and scope changes, and the follow-up.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [consultant, project-manager, designer, individual]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [client-management, agency, status-meeting, scope-creep]
pairs_with:
  prompts: [write-client-check-in-email, prepare-business-review, write-meeting-recap-email]
args:
  - name: engagement
    description: The client work - what you deliver, the stage, the contract type (fixed price, retainer, hourly) and how often you meet.
    type: text
    required: true
  - name: this_period
    description: What happened since the last check-in - progress, delays, open questions, anything the client asked for that was not in scope. Optional.
    type: text
  - name: client_style
    description: What you know about the client contact (busy executive, detail-oriented, new to working with agencies). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Standing agenda, Status note to send first, This week's talking points, Raising risks and changes, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help agencies, consultants and freelancers run recurring client check-ins. These meetings drift into a show-and-tell that eats billable time, while the things that hurt the relationship go unsaid: a slipping date mentioned casually at the end, extra requests agreed in passing that later become unpaid work, client decisions or feedback that are overdue and silently delay everything, and no written record of what was agreed. Experienced account managers send a short status note before the call so the meeting is for decisions and problems, use the same agenda each time, raise bad news early with a proposed option, name new requests as change requests with a cost or time impact rather than refusing or absorbing them, make the client's own outstanding actions visible, and confirm everything in writing the same day.

Engagement: {{engagement}}
{{#this_period}}
<this_period>
{{this_period}}
</this_period>
{{/this_period}}
{{#client_style}}Client contact: {{client_style}}{{/client_style}}
</context>

<task>
1. Write a standing agenda for the meeting length suited to the engagement (usually 20 to 30 minutes): status in one line (on track, at risk, off track) and why; decisions needed from the client; risks and issues; changes requested; next period; actions on both sides.
2. Write a status note template to send a day before, and fill it from this period's information if given, using RAG-style status words and plain sentences.
3. Turn this period's information into talking points in priority order, leading with anything the client must decide or that has slipped.
4. Give words for raising risks, delays and scope changes: lead with the fact, the impact, options and a recommendation; for new requests, acknowledge, say it is outside the current scope, and offer to quote or trade it against something else.
5. Describe the follow-up: same-day recap with decisions, actions for both sides and dates, and how to track client-side dependencies over time.
6. Adjust for the client contact's style if given.
</task>

<constraints>
- Do not invent progress, dates or prices; mark them for the user to fill in.
- Never recommend hiding a slip or absorbing out-of-scope work silently; the user can choose to give work for free, but it should be explicit.
- Keep the tone collaborative, not defensive or legalistic; refer to the contract only when needed.
- Keep the meeting to the shortest length that covers decisions and problems.
</constraints>

<output_format>
## Standing agenda
Table: Minutes | Item | Who | Output.

## Status note to send first
Ready-to-send template, filled where possible.

## This week's talking points
Numbered, highest priority first.

## Raising risks and changes
Scripts for slip, risk and new request.

## Follow-up
Recap template and dependency tracking.
</output_format>
