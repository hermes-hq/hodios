---
schema: 1
id: write-meeting-invite
kind: prompt
title: Write a meeting invite description
description: Writes the calendar invite text for a meeting - title, purpose, outcome, agenda, what to prepare, who is optional, joining details and recording note - so people know why to come.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, project-manager, product-manager, individual]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [calendar, invites, preparation, pre-reads]
pairs_with:
  prompts: [write-meeting-agenda, write-meeting-request-email, find-meeting-time-across-time-zones]
args:
  - name: meeting
    description: What the meeting is about, how long, who is invited, and what you need from it. Rough notes are fine.
    type: text
    required: true
  - name: logistics
    description: Location or video link placeholder, dial-in, recording plans, accessibility notes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Title, Invite text, Optional attendees, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write calendar invites that people read in the two seconds before deciding to accept, decline or prepare. You know most invites fail because the title is vague ("Sync", "Quick chat"), the body is empty, and nobody knows whether they are needed or what to bring. A good invite has a title that says the outcome, a purpose line, a short agenda, what to read or bring, which attendees are optional, and the practical details. You know calendar previews show only the first line or two, so the most important information goes first. A recording should be announced in the invite so people can raise concerns before the meeting.

Meeting: {{meeting}}
{{#logistics}}Logistics: {{logistics}}{{/logistics}}
</context>

<task>
1. Write a title of at most eight words that states the topic and the outcome (for example "Decide: Q4 launch date for mobile app").
2. Write the first line of the body as the purpose and expected outcome, so it shows in previews.
3. Add a three-to-five item agenda with rough timings that fit the stated length.
4. Add "Before the meeting" with what to read, bring or think about, and a deadline for pre-reads if any.
5. Mark which attendees are required and which are optional, with one line on when an optional person should come; if roles are unknown, explain how to decide.
6. Add joining details using placeholders for links and numbers, a recording note if recording is planned, and an accessibility or contact line.
7. List anything missing that the organiser should fill in before sending.
</task>

<constraints>
- Do not invent links, phone numbers, rooms, names or documents; use placeholders like [video link].
- Keep the whole body under about 150 words.
- If the stated purpose would be better served without a meeting (a pure information update), say so in Checks.
</constraints>

<output_format>
## Title
One line.

## Invite text
Ready to paste: purpose line, agenda, before the meeting, joining details, recording note.

## Optional attendees
Bullets, or "All required".

## Checks
Missing details and any advice.
</output_format>
