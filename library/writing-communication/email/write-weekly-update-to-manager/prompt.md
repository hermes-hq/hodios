---
schema: 1
id: write-weekly-update-to-manager
kind: prompt
title: Write a weekly update to your manager
description: Turns a messy week of notes into a short update for one's manager, covering outcomes against priorities, blockers with specific asks, risks and next week's focus, as an email, chat message or bullets.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, software-engineer, designer, sales-rep]
requires: [none]
inputs: [notes, text]
output: [message, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [weekly-update, managing-up, 1-on-1-prep, blockers, priorities]
pairs_with:
  prompts: [write-status-report, give-upward-feedback]
args:
  - name: week_notes
    description: Everything from your week in any order, such as tasks done, meetings, problems, things waiting on others, ideas and worries.
    type: text
    required: true
  - name: priorities
    description: Your current priorities or goals as agreed with your manager, so the update can show progress against them.
    type: text
  - name: format
    description: Email for a weekly written update, chat for a Slack or Teams message, bullets for pasting into a 1:1 doc.
    type: enum
    enum: [email, chat, bullets]
    default: email
output_contract:
  format: markdown
  sections: [Update, Left out]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A weekly update to a manager has one reader with three questions: is this person's work on track, does anything need me, and is there anything I should know before someone else tells me? Managers skim activity lists ("had 9 meetings, worked on the deck") and remember outcomes ("the pricing deck is approved by sales; Tuesday's customer call moved the pilot forward"). Good updates map the week to the agreed priorities, put asks where they cannot be missed, raise risks early while they are still small, and keep it short enough to read in a minute. They are also the record that makes performance reviews and promotion cases easier later.
</context>

<task>
Write a weekly update in {{format}} format.

<week_notes>
{{week_notes}}
</week_notes>
{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}

1. If the notes are empty or contain nothing from this week, ask for the week's notes and stop.
2. Turn activity into outcomes: for each item, say what changed as a result (shipped, decided, unblocked, learned). Drop pure activity that led to nothing the manager needs to know, and list it under Left out.
3. If priorities are given, organise progress by priority and mark each on track, at risk or behind, with a reason. If a priority had no progress this week, say so honestly in one line. If no priorities are given, group by theme and add a line asking the manager to confirm priorities only if the notes suggest they are unclear.
4. Pull out asks: anything the manager needs to decide, approve, unblock or know, each with a "by when". Put them first if urgent.
5. Flag risks early: anything that could slip, a dependency on another team, a concern about workload or scope, phrased factually with what you plan to do about it.
6. Add next week's focus in two or three items.
7. Render for the format:
   - email: subject "Weekly update – [date or week]", then Needs from you · Progress · Risks · Next week. Under about 200 words.
   - chat: one short opening line, then up to eight bullets with the asks first. Under about 120 words.
   - bullets: headed sections with terse bullets for a 1:1 doc.
</task>

<constraints>
- Use only facts in the notes. Do not inflate results, invent numbers or add achievements; use `[need: …]` if an obvious figure is missing.
- Plain and direct. No "just wanted to quickly share", no apology for problems that are simply facts.
- Credit others where the notes show their contribution.
- Keep frustrations about colleagues factual and focused on the work and the ask; do not include judgements of people.
</constraints>

<output_format>
## Update
The update in the chosen format.
## Left out
Bullets: items from the notes deliberately left out and why (activity without outcome, too minor, better said in person). "Nothing" if nothing.
</output_format>
