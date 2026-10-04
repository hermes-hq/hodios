---
schema: 1
id: set-up-homework-routine
kind: prompt
title: Set up a homework routine
description: Helps a parent and child agree a weekly homework routine with time, place, task order, breaks, the parent's role and a plan for bad nights. Use when homework causes nightly battles.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [homework, family-routines, executive-function, family-agreement]
args:
  - name: child_and_schedule
    description: The child (school year, how homework usually goes, what they find hard or easy) and the family week (clubs, shared custody days, parents' work hours, siblings). Rough notes are fine.
    type: text
    required: true
  - name: age
    description: The child's age or school year, e.g. "9" or "Year 7".
    type: string
    required: true
  - name: what_goes_wrong
    description: Optional. What happens on bad nights now (arguments, tears, avoidance, rushing, forgetting tasks, screens).
    type: text
output_contract:
  format: markdown
  sections: [Snapshot, Weekly routine, Each homework session, Who does what, When it falls apart, Family agreement, Two-week review, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A parent wants a homework routine their child will actually follow.
Child's age or school year: {{age}}

This is not help with a specific question; it is the system around homework. Routines usually fail in four ways: the time slot fights with hunger, tiredness or screens; the parent becomes the teacher and corrects everything, so the teacher never sees the real gaps and evenings turn into arguments; the routine is imposed rather than agreed, so the child resists it; and there is no plan for the night it falls apart, so one bad night ends the whole thing.

What works: a fixed, short, predictable slot after a snack and some movement; a set place with materials ready; the child choosing the order of tasks within simple rules; short work blocks with real breaks; a parent who checks that work is started, planned and handed in, not whether every answer is right; and a written agreement reviewed after two weeks.
</context>

<task>
<child_and_schedule>
{{child_and_schedule}}
</child_and_schedule>
{{#what_goes_wrong}}
<what_goes_wrong>
{{what_goes_wrong}}
</what_goes_wrong>
{{/what_goes_wrong}}

1. Read the week day by day and pick the slot for each school day: after food and a break, before the child is too tired, never straight after screens. Leave one evening a week free if the load allows.
2. Size the session to the age. A common rule of thumb is about 10 minutes per school year per night (around 10-20 minutes for young primary children, 30-60 for lower secondary), but the school's own expectation wins; ask what it is if unknown. If homework regularly takes much longer than the school expects, say so and suggest raising it with the teacher.
3. Set work blocks by age: about 10-15 minutes for ages 6-8, 20 minutes for 9-11, 25-30 minutes for 12-14, each followed by a 5-minute break that involves moving, not a screen.
4. Set the order rule: check the planner first, then start with a quick task to get going and do the hardest task second, while energy is still good. Let the child choose within that rule.
5. Split roles. The parent checks: that the session started, that the planner or school app was read, that materials are packed, and that work is handed in. The parent stays nearby for younger children and answers "how do I start?" with a question, not the answer. The parent leaves alone: correcting spelling and answers in work the teacher will mark, rewriting, and finishing tasks for the child. For lower secondary, move the checking to a weekly look at the planner. If another adult runs some nights (a grandparent, a childminder, the other household), give them the same short version of the routine so the rules do not change by day.
6. Plan the bad night: a short "minimum version" (the one task due tomorrow, 10 minutes), a stop rule (tears, or 20 minutes past the planned time: stop, and the parent writes a short note to the teacher), and no punishment tied to homework. Adjust for activity nights and split-household days.
7. Write a short family agreement in the child's words, with one reward that is about doing the routine, not about marks.
</task>

<constraints>
- Use only the facts given. If the school's homework expectation, the number of school days with homework, or the child's after-school commitments are missing, ask in the Questions section and mark guesses as [X].
- Do not diagnose. If the notes suggest a possible learning difficulty, attention difficulty or anxiety (very long times, frequent distress, avoidance of one subject), suggest talking to the class teacher or the school's special-needs coordinator, without naming a condition.
- If the child seems very distressed, mentions self-harm, or something unsafe at home or school comes up, stop the planning and point to the school, a doctor, or local emergency services if anyone is in danger.
- Keep it realistic for a tired parent: no routine needing more than 10 minutes of parent time on a normal night.
- Non-judgemental tone towards both parent and child.
</constraints>

<output_format>
## Snapshot
Three lines: age, expected homework time, the biggest problem to solve.

## Weekly routine
Table: Day | Start time | Length | Where | Notes (activities, other household).

## Each homework session
Numbered steps from "snack and move" to "bag packed", with block and break lengths.

## Who does what
Two columns: Parent checks | Parent leaves alone. Then one line on what the child owns.

## When it falls apart
Minimum version, stop rule, note-to-teacher template (three sentences).

## Family agreement
Five to eight short "We agree..." lines in plain, child-friendly words, with a line for both to sign.

## Two-week review
Four questions to ask together and what to change for each answer.

## Questions
Anything missing or assumed.
</output_format>
