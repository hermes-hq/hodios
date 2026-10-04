---
schema: 1
id: finish-online-course
kind: prompt
title: Finish a self-paced online course
description: Plans how to finish a stalled self-paced online course, deciding what to skip, a catch-up schedule, a weekly checkpoint, a small project and accountability that does not rely on willpower.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mooc, self-paced-learning, implementation-intentions, course-completion]
pairs_with:
  prompts: [build-self-study-curriculum]
args:
  - name: course_and_progress
    description: The course (name, provider, number of modules or hours), where you stopped and when, why you started it, why you think you stalled, and any deadline such as access expiry or a certificate cut-off.
    type: text
    required: true
  - name: hours_per_week
    description: Realistic hours per week you can give it from now on.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Where you are, Keep skim or skip, Catch-up schedule, Weekly checkpoint, Apply it, Accountability, If you stall again]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An adult learner has stalled on a self-paced online course and wants to finish it with {{hours_per_week}} hours a week. Most self-paced courses are never finished, usually not for lack of ability: there is no fixed time slot, restarting feels like starting over, every video is treated as compulsory, and there is no external reason to show up. A good restart plan does not ask for more willpower. It cuts the remaining course to what serves the learner's goal, re-enters with a small win, puts sessions in fixed slots with "when-then" plans, adds a weekly checkpoint and a small project that uses the material, and builds accountability from outside the learner.
</context>

<task>
<course_and_progress>
{{course_and_progress}}
</course_and_progress>

1. Restate the learner's goal in one line (certificate, a specific skill, a job requirement, curiosity). Everything is judged against it.
2. Triage the remaining modules into keep (needed for the goal, the certificate or the final assessment), skim (read the transcript or watch at faster speed, then do the quiz) and skip. If the module list is not given, ask for it and give a provisional triage rule.
3. Plan the re-entry session: 20-30 minutes, revisit the summary of the last finished module, retry its quiz, then start the next module. Do not restart from the beginning.
4. Build the catch-up schedule: total remaining hours (keep plus skim) against {{hours_per_week}} hours a week, giving a finish date. Use two or three fixed slots a week, each written as "When [cue], I will [action] for [minutes]". Add a 15-minute minimum session for bad days and the rule "never miss twice in a row". If an access or certificate deadline is earlier than the finish date, show what to cut.
5. Weekly checkpoint: same day and time, 10 minutes, answering four questions (done vs planned, one thing learned, next week's slots, what got in the way).
6. Apply it: one small project that uses what the course teaches, sized at two to four hours, started by the midpoint, not at the end.
7. Accountability that works without willpower: a study partner or course forum check-in, telling someone the finish date, a fixed online co-working session, or a calendar invite. Pick two that fit the learner's life.
</task>

<constraints>
- Use only the details given. If the number of remaining modules or hours, the deadline or the goal is missing, ask, and mark estimates [X].
- Never invent course content, module names or the provider's policies on deadlines, extensions or certificates; tell the learner to check them.
- If finishing does not serve the learner's goal any more, say so and offer a "finish the useful part and stop" option without judgement.
- Keep the plan within {{hours_per_week}} hours a week; check the sums.
</constraints>

<output_format>
## Where you are
Goal, progress, remaining hours, and finish date at this pace.

## Keep skim or skip
Table: Module | Keep / skim / skip | Why | Hours.

## Catch-up schedule
The re-entry session, then a table: Week | Slots (when-then) | Modules | Hours. Then the minimum session and "never miss twice" rule.

## Weekly checkpoint
The four questions as a checklist.

## Apply it
The project in three to five lines: what to build or do, which modules it uses, when to start.

## Accountability
Two chosen methods and how to set each up this week.

## If you stall again
Three bullets: what to do after one missed week, after two, and when to stop.
</output_format>
