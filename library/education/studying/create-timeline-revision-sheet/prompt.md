---
schema: 1
id: create-timeline-revision-sheet
kind: prompt
title: Create a themed timeline revision sheet
description: Builds a revision timeline for a history or politics period with events tagged by theme, justified turning points, cause links and a recall test that blanks dates and causes.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [history]
requires: [none]
inputs: [notes, topic]
output: [table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [chronology, turning-points, causation, politics]
pairs_with:
  prompts: [make-flashcards, build-concept-map, make-study-guide]
args:
  - name: period
    description: The period and focus, e.g. "Germany 1918-1939", "Civil rights in the USA 1954-1968", "UK politics 1979-1997".
    type: string
    required: true
  - name: notes
    description: Your class notes or textbook summary for the period. Strongly recommended; without them every event is marked for you to verify.
    type: text
  - name: themes
    description: Which themes to tag and test. all tags political, economic and social.
    type: enum
    enum: [political, economic, social, all]
    default: all
output_contract:
  format: markdown
  sections: [Timeline, Turning points, Themes across the period, Recall test, Answer key, Check these]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
History and politics exams reward chronology used for argument: knowing what came before what, why it mattered, and how political, economic and social change interacted. A list of dates does not help with that. A good revision timeline is selective (15 to 25 events, not 60), tags each event by theme, links causes to consequences, marks a few justified turning points, and comes with a test that makes the student retrieve dates and causes rather than reread them.

Period: {{period}}. Themes: {{themes}}.
</context>

<task>
{{#notes}}
<notes>
{{notes}}
</notes>

{{/notes}}
1. Select 15 to 25 events from the notes that matter most for the period and the chosen themes. If no notes were given, use widely taught events for the period but tag every one [verify] and keep to well-established facts.
2. Keep the date precision the source uses (year, month or exact day). Never sharpen a date the source gives only as a year.
3. Tag each event [P] political, [E] economic or [S] social (more than one when true). With a single theme selected, keep other events only if they cause or result from that theme.
4. Add a cause or consequence link for each event, pointing to other events by number where possible ("led to #9", "response to #4").
5. Mark 3 to 5 turning points with a one-line justification against clear criteria: a change in direction, its scale (how many people or institutions affected) and how lasting it was. Note one event students often call a turning point that is arguably not, and why.
6. For each theme, write 2 or 3 lines on what changed and what stayed the same across the period.
7. Write a recall test in four parts: (a) 6 events with dates blanked, (b) 5 events with "why did this happen?" blanked, (c) 6 events to put in order, (d) 3 "which came first, and how did it affect the other?" pairs.
</task>

<constraints>
- Use only events and dates from the notes. If the notes contain a date that looks wrong, keep the student's version in the timeline, flag it under Check these, and say what to verify.
- Without notes, do not present any date as certain; every event carries [verify] and the Check these section tells the student to confirm against their textbook.
- No interpretations presented as settled when historians disagree; say "arguably" and name the debate in a few words.
- Keep each timeline entry to one line.
</constraints>

<output_format>
## Timeline
Table: # | Date | Event | Theme | Cause or consequence | Turning point (TP or blank).

## Turning points
Bullets: event, then justification against the criteria. Then the "arguably not" event.

## Themes across the period
One short paragraph or 2 to 3 bullets per theme: change and continuity.

## Recall test
Parts (a) to (d), numbered, no answers.

## Answer key
Answers for each part.

## Check these
Bullets: dates or claims to verify and where (textbook, teacher). "None" only if notes covered everything and nothing looked wrong.
</output_format>
