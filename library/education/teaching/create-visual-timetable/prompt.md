---
schema: 1
id: create-visual-timetable
kind: prompt
title: Create a visual timetable
description: Creates the content for a visual timetable, now-and-next board or task strip with steps, short labels, symbol suggestions, a plan for changes and how to teach the pupil to use it.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher, parent]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [visual-schedule, now-and-next, autism, special-educational-needs, early-years, routine-change]
pairs_with:
  prompts: [write-social-story, plan-sensory-friendly-classroom, break-down-life-skill-task]
args:
  - name: day_schedule
    description: The day, session or task to show, in order with rough times, e.g. "9:00 register, 9:15 phonics, 9:45 maths, 10:30 snack and play...". Add anything that changes on some days (PE, swimming, assembly).
    type: text
    required: true
  - name: format
    description: full-day (the whole day in order), now-next (two or three cards at a time) or task-strip (the steps of one task such as getting changed for PE).
    type: enum
    enum: [full-day, now-next, task-strip]
    default: full-day
  - name: learner_notes
    description: Optional. Who it is for (one pupil or the whole class), their understanding of pictures and words (objects, photos, symbols, written words), what they find hard and what motivates them. Initials only.
    type: text
output_contract:
  format: markdown
  sections: [Timetable, Symbols and labels, Handling changes, Teaching it, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher, teaching assistant or parent wants a visual timetable that a pupil actually uses. Most fail for three reasons: the representation is above the pupil's level (abstract symbols for a pupil who understands objects or photos), there are too many items for the pupil to take in, and the timetable is put on the wall and never taught, so it becomes decoration. A good one shows only what the pupil can process, uses the same picture and the same word for the same thing every time, marks what is finished, and prepares the pupil for changes instead of hiding them.

Format: {{format}}
</context>

<task>
<day_schedule>
{{day_schedule}}
</day_schedule>
{{#learner_notes}}
<learner_notes>
{{learner_notes}}
</learner_notes>
{{/learner_notes}}

1. Choose the representation level from the notes: objects of reference, photos, symbols with words, or words only. If the notes do not say, recommend photos or symbols with a word under each and say how to check (can the pupil match the picture to the real thing?).
2. Break the schedule into items for the format:
   - full-day: 5 to 8 items for younger or less experienced users; split the day into morning and afternoon strips if there are more. Order top to bottom or left to right.
   - now-next: pairs of "now" and "next" cards, with a plan to move to three cards (now, next, then) when the pupil is ready.
   - task-strip: 3 to 7 steps for one task, each a single visible action.
3. Write a one- or two-word label for each item, the same word adults will say aloud. Combine tiny transitions (lining up, hand washing) into the activity unless they are the hard part for this pupil.
4. Suggest a picture for each label: what the photo shows or what the symbol depicts. Tell the user to use the school's existing symbol set so pictures match across rooms; do not invent symbol names or products.
5. Plan how finished items are marked: turned over, posted in a "finished" pocket or box, or crossed off.
6. Plan changes: a "change" card that goes over the old item, when the pupil is told (as early as possible, by a familiar adult), and a "surprise" or "?" card for things not yet known.
7. Plan the teaching: show and say before each transition, the pupil moves or removes the card themselves, praise for checking, and how adult prompts fade over two to four weeks.
</task>

<constraints>
- Use only the activities given; do not add lessons or times. Mark unclear items as [check]. If the schedule gives no actual activities ("usual Year 2 day"), ask for the day's activities in order and stop; do not invent a typical day.
- Plain, concrete labels a young child could say; no idioms.
- Never use the timetable as a reward or punishment system or remove a favourite activity from it as a sanction. If asked to, explain in two sentences that a timetable only works if the pupil can trust it shows what will really happen, and suggest keeping any behaviour system separate.
- If the learner notes are missing, give the default (photos or symbols with words) and list what to find out.
</constraints>

<output_format>
## Timetable
Table: Order | Time (if given) | Label | Picture suggestion | Notes. For now-next, show the first three pairs.

## Symbols and labels
Bullets: representation level and why, size and placement, where the board lives, the finished system.

## Handling changes
Bullets: the change card, when and how to tell the pupil, and a script of one or two sentences.

## Teaching it
Numbered routine for the first two weeks, then how prompts fade and signs it is working.

## Questions
What to confirm or find out.
</output_format>
