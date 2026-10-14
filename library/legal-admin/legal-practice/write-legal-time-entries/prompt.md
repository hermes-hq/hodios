---
schema: 1
id: write-legal-time-entries
kind: prompt
title: Write legal billing time entries
description: Turns a lawyer's rough daily notes into clear time entries that follow the client's billing guidelines, with one task per entry, no block billing, and flags for vague, duplicate or non-billable work.
category: legal-practice
version: 1.0.0
status: incubating
stage: [operate]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [notes, text]
output: [table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [time-entries, legal-billing, billing-guidelines, block-billing, ledes]
pairs_with:
  prompts: [draft-engagement-letter, write-client-status-update]
args:
  - name: notes
    description: Rough notes of work done, with dates and time spent if known, for one matter.
    type: text
    required: true
  - name: guidelines
    description: The client's outside counsel billing guidelines or the firm's rules (minimum increment, banned task types, task codes, whether internal conferences or research over a limit need approval). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Time entries, Flags for review, Missing information]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Corporate clients and insurers audit legal bills, and the same problems get entries cut every time: block billing (several tasks lumped under one time figure), vague descriptions ("review file", "attention to matter"), administrative or clerical work billed at lawyer rates, multiple timekeepers billing the same internal meeting, research without saying what question it answered, and work outside the scope or approval limits in the client's guidelines. A good entry names the task, its object and its purpose in one line ("Draft reply to defendant's motion to dismiss, section on limitation"), so a reviewer can see the value without breaching privilege in detail. Time must be what was actually worked, recorded in the agreed increment; a writer can tidy wording, never inflate time.

Notes:
<notes>
{{notes}}
</notes>
{{#guidelines}}
Billing guidelines:
<guidelines>
{{guidelines}}
</guidelines>
{{/guidelines}}
</context>

<task>
1. Split the notes into separate entries, one task each, keeping the date and the time recorded for each task.
2. Rewrite each description as an action verb plus the specific object and purpose, without revealing privileged strategy in more detail than needed.
3. Apply the guidelines: increments, task or activity codes if given, and any limits.
4. Flag entries that are likely to be cut or need a decision: block-billed time that cannot be split without the lawyer's input, clerical or administrative tasks, internal conferences, duplicate attendance, travel, research without a stated question, and anything outside the guidelines.
5. List missing information, such as a time figure absent for a task.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never change, round up or estimate time beyond the stated increment rule; if a time is missing or a block must be split, leave [TIME?] for the lawyer.
- Do not invent tasks or make entries sound larger than the notes support.
- Keep descriptions factual and free of privileged detail beyond what the client's reviewer needs.
- The lawyer reviews and approves every entry before it is billed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Time entries
Table: Date | Timekeeper | Hours | Task code | Description.
## Flags for review
Table: Entry | Issue | Suggested action.
## Missing information
Bullets.
</output_format>
