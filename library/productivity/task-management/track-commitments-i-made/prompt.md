---
schema: 1
id: track-commitments-i-made
kind: prompt
title: Track commitments I made
description: Finds the promises you made in notes, emails and chats ("I'll send that over"), turns each into a task with who it is owed to and a due date, and drafts updates for any you will miss.
category: task-management
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, consultant, sales-rep]
requires: [none]
inputs: [notes, transcript, message]
output: [table, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [promises, follow-through, open-loops, accountability, meeting-follow-up, reliability]
pairs_with:
  prompts: [track-waiting-for-items, run-weekly-review, build-action-item-tracker]
args:
  - name: sources
    description: Meeting notes, transcripts, sent emails or chat messages from the period to scan. Paste them with dates.
    type: text
    required: true
  - name: me
    description: Your name or how you appear in the notes, so the model can tell your promises from other people's.
    type: string
    required: true
  - name: today
    description: Today's date, to judge what is overdue. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Commitments found, Overdue or at risk, Unclear promises, Updates to send, Keep catching them]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone keep the promises they make in passing. Small commitments made in meetings and messages ("I'll send you the deck", "let me check with legal", "I'll introduce you to Sam") are the ones most often forgotten, and they are exactly what colleagues and clients judge reliability on. They hide in soft wording: "I'll look into it", "leave it with me", "I can do that", "let me get back to you". Most have no date, so the other person assumes "soon". The fix is to capture each one with who it is owed to, a realistic date, and the first action, and to send a short update the moment one will slip rather than letting it go silent.

Sources:
<sources>
{{sources}}
</sources>

Me: {{me}}
{{#today}}Today: {{today}}{{/today}}
</context>

<task>
1. Scan the sources for promises the user made, including soft phrasings. Ignore commitments made by other people (list them separately only if useful for waiting-for tracking, marked as not yours).
2. For each commitment record: what was promised, to whom, where and when it was said (source and date), any stated deadline, and a suggested due date where none was stated (marked as suggested, based on the kind of promise).
3. Turn each into a next action starting with a verb.
4. Mark which are overdue or at risk based on today's date and the effort involved.
5. List promises that are too vague to act on, with a question to clarify or a way to close them.
6. Draft short updates for overdue or at-risk items: what is happening and the new date, without excuses.
7. Suggest a habit to catch future commitments (for example a two-minute scan of notes after each meeting).
</task>

<constraints>
- Only list commitments attributable to the user; if the speaker is unclear in the notes, put it under unclear with the quote.
- Quote or closely paraphrase the original wording so the user can verify it.
- Do not invent deadlines; any date not in the sources is labelled "suggested".
- Do not draft updates that promise new dates; use a [date] placeholder unless the user gave one.
</constraints>

<output_format>
## Commitments found
Table: # | Promise (quote) | To whom | Said where and when | Due (stated or suggested) | Next action.

## Overdue or at risk
Bullets referencing the numbers.

## Unclear promises
Table: Quote | Problem | Clarify or close.

## Updates to send
One short draft per overdue or at-risk item.

## Keep catching them
One or two bullets.
</output_format>
