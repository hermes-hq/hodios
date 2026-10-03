---
schema: 1
id: request-information-by-email
kind: prompt
title: Request information by email
description: Writes an email asking colleagues or vendors for specific information or documents as a numbered list with the format wanted, why it matters and a deadline, so it is easy to answer.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [project-manager, operations-manager, business-analyst, consultant]
requires: [none]
inputs: [text, notes]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [information-request, document-request, data-collection, vendor-communication, checklist-email]
pairs_with:
  prompts: [write-follow-up-email, request-approval-by-email, write-professional-email]
args:
  - name: items_needed
    description: What you need, as rough notes, including any format, period, level of detail or file type you need, and which items matter most.
    type: text
    required: true
  - name: recipient
    description: Who you are asking and your relationship, for example "finance team at our logistics vendor, under contract PO 4471" or "three regional managers".
    type: string
    required: true
  - name: purpose
    description: What the information is for, for example "the annual insurance renewal" or "the board pack on 3 Dec". It helps people prioritise and send the right version.
    type: text
  - name: deadline
    description: When you need it, and if you can say, when partial answers are still useful.
    type: string
output_contract:
  format: markdown
  sections: [Email, Tracker, Follow-up line, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Requests for information get slow, partial or wrong answers when the items are buried in a paragraph, when the format is unstated (which year, which file type, monthly or annual totals), when the reader cannot tell what is essential, and when they do not know why it is needed or by when. The fix is mechanical: a numbered list the reader can answer line by line, each item specific enough that two people would send the same thing, a clear priority, one line on purpose, a deadline with permission to send what they have, and a route for "I don't have this, ask X".
</context>

<task>
Write an email requesting information from {{recipient}}.{{#purpose}} Purpose: {{purpose}}.{{/purpose}}{{#deadline}} Deadline: {{deadline}}.{{/deadline}}

<items_needed>
{{items_needed}}
</items_needed>

1. Turn the notes into specific items. For each, settle what exactly, which period or version, the format (file type, units, level of detail), and where to send it (reply, shared folder placeholder, upload link). If an item is too vague to make specific ("the financials", "all the stuff for the audit"), ask up to three questions and stop, unless most items are clear, in which case draft and flag the vague ones under Notes.
2. Order by priority: must-have items first, marked as such; nice-to-have items last and labelled optional. If the notes do not say which matter most, keep the user's order and ask under Notes.
3. If there are more than about eight items, group them under short headings by topic or by who is likely to hold them, and suggest under Notes whether a shared checklist or folder would work better than email.
4. Write the email:
   - Subject: "[Request]: [what] for [purpose], by [date]".
   - First line: what is needed and by when, in one sentence.
   - One line on why it matters, from the purpose.
   - The numbered list.
   - How to reply: answer inline by number; partial answers welcome by the deadline; if something does not exist or someone else holds it, say so and name them.
   - Thanks in one line.
5. For vendors, reference the contract or PO if given; do not imply obligations the input does not mention.
6. Build a tracker table for the sender: item number, item, owner, status, date received.
7. Write a one-line polite follow-up to use if nothing arrives by the deadline, referencing the outstanding item numbers.
</task>

<constraints>
- Keep the prose around the list under about 90 words.
- Each item fits on one or two lines and is specific enough to be answered without a follow-up question.
- Use only the facts given; never invent reference numbers, dates, links or reasons. Use `[need: …]`.
- Neutral and courteous; no "per my last email" tone, no urgency the deadline does not justify.
- If an item could contain personal or sensitive data (salaries, health, ID documents, bank details), add a line asking for it through a secure channel rather than plain email, and say so under Notes.
</constraints>

<output_format>
## Email
Subject line, then the body with the numbered list.
## Tracker
Markdown table: #, Item, Owner, Status, Received.
## Follow-up line
One sentence.
## Notes
Vague items, placeholders, priority questions, secure-channel flags. "None" if nothing.
</output_format>

<examples>
Vague item: "Send me your sales data."
Specific item: "1. (Must-have) Monthly net sales by region for Jan 2024 to Sep 2025, as an Excel or CSV file, in EUR."
</examples>
