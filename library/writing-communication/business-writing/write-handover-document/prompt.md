---
schema: 1
id: write-handover-document
kind: prompt
title: Write a handover document
description: Writes a handover for leave or a role change covering responsibilities, open work status, contacts, access, recurring tasks, known risks and first-week priorities, with gaps listed as questions.
category: business-writing
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, manager, operations-manager, project-manager]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [handover, parental-leave, knowledge-transfer, offboarding]
pairs_with:
  prompts: [write-status-report, write-professional-email]
args:
  - name: role_and_work
    description: "Brain-dump everything: your role, responsibilities, current projects and their status, deadlines, people you work with, tools and systems, recurring tasks, things only you know, and what worries you. Messy notes are fine."
    type: text
    required: true
  - name: handover_date
    description: The date the handover takes effect, and the return date if this is leave, for example "from 14 April, back 1 September".
    type: string
output_contract:
  format: markdown
  sections: [Handover, Questions before you go, Handover meeting agenda]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A handover is read by someone covering work they did not build, often in a hurry, on the day something goes wrong. It fails when it is a diary of history instead of a guide to action, when "status" means "in progress" with no next step, when access and passwords are an afterthought, and when the knowledge that lives only in the leaver's head (the client who needs a call not an email, the report that breaks every quarter-end) never gets written down. A good handover is organised by what the reader must do, says who decides what, and is honest about what is unfinished.
</context>

<task>
Turn these notes into a handover document.
{{#handover_date}}Handover date: {{handover_date}}{{/handover_date}}

<notes>
{{role_and_work}}
</notes>

1. If the notes do not say what the role is or list any current work, ask for them and stop.
2. Sort everything in the notes into the sections below. Do not drop anything; if an item fits nowhere, put it under "Other notes".
3. For each open piece of work, state: what it is, current status in one line, the very next action, the owner from the handover date, the deadline, and where the files or tickets live. If any of these are missing, write `[ASK: …]` in that cell.
4. Separate decisions the cover person can make alone from ones that need someone else, and name that person or role.
5. Build a calendar of recurring tasks (daily, weekly, monthly, quarterly) with the date of the next occurrence if the handover date allows it.
6. Pull out the tacit knowledge: workarounds, quirks, sensitive relationships and "if X happens, do Y" rules, and write each as a short instruction.
7. Write the first-week priorities: the three to five things the cover person must do or check first.
</task>

<constraints>
- Never put passwords, keys, tokens or personal data in the document. Say where access is managed (password manager, IT ticket, admin) and who grants it; if the notes contain a secret, leave it out and warn about it in Questions before you go.
- Use only facts from the notes. Do not invent names, dates, systems or statuses.
- Keep it scannable: tables for open work, contacts and recurring tasks; short bullets elsewhere. Write for someone who has never seen this work.
- Be neutral and factual about colleagues and clients; describe working preferences, not personalities.
</constraints>

<output_format>
## Handover
**Summary:** role, handover period, cover person or `[ASK]`, and how to reach the leaver if at all (or "do not contact").
**First-week priorities:** numbered.
**Open work:** table: Work | Status | Next action | Owner | Deadline | Where it lives.
**Responsibilities:** bullets, marking which are delegated, paused or covered by whom.
**Decisions:** two lists: "You can decide" and "Escalate to …".
**Recurring tasks:** table: Task | Frequency | Next due | How | Where.
**Contacts:** table: Name or role | What for | Notes on working with them.
**Access and tools:** table: System | What it is used for | How to get access.
**Known risks and quirks:** bullets with "if this happens, do this".
**Other notes**
## Questions before you go
Every `[ASK: …]` gathered into one list for the leaver to answer, plus any warning about secrets found in the notes.
## Handover meeting agenda
A 30 to 45 minute agenda for walking the cover person through it.
</output_format>
