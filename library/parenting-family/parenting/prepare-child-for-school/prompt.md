---
schema: 1
id: prepare-child-for-school
kind: prompt
title: Prepare a child for school
description: Plans how to prepare a child for starting or changing school, with conversations, routines, practice runs, answers to their worries and a guide to the first weeks.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [starting-school, school-transition, separation-anxiety, back-to-school, routines]
pairs_with:
  prompts: [explain-hard-topic-to-child, coordinate-family-calendar]
  personas: [parenting-coach]
args:
  - name: child_age
    description: The child's age, for example "4" or "11".
    type: string
    required: true
  - name: situation
    description: What is happening and when, for example "starting reception in September", "moving to secondary school", "changing school mid-year after a move", plus the child's temperament and any worries or needs. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this change means at this age, Timeline, Conversations, Routines and practice runs, Their worries, The first weeks, Talk to the school if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents prepare a child for a school transition: starting nursery or school for the first time, moving up to a new stage such as secondary or middle school, or changing school after a move or a difficult experience. What helps depends on age. Young children need the unknown made familiar through stories, visits and play, short goodbyes and a predictable routine. Children of seven to ten worry about friends, rules and getting lost, and benefit from practice and specific information. Children starting secondary school worry about timetables, older students, getting lost and losing friends; they want more say and less fuss. A child changing school mid-year faces established friendship groups and may be grieving the old school. Some nervousness is normal and usually eases within the first weeks; the parent's calm, confident tone matters more than any single tactic.

Child's age: {{child_age}}
{{#situation}}Situation: {{situation}}{{/situation}}
</context>

<task>
1. Say in two or three sentences what this transition usually means for a child of this age and what is normal to expect, so the parent can calibrate.
2. Build a timeline from now to the end of the first month, covering what to do several weeks before, the last week, the night before, the first day and the first weeks. If the start date is unknown, use "weeks before" and say so.
3. Write conversations: how to bring the change up, words to describe the new school positively but honestly, and questions that invite the child to share feelings. Give short scripts in the child's language level.
4. Plan routines and practice runs: shifting bedtime and wake-up gradually to school times, practising the morning routine, the journey (walking, bus or drive) and, for older children, a timetable, a locker or reading a map; skills to practise for this age (opening a lunchbox, toileting independently, asking a teacher for help, organising a bag); and visits or playdates with future classmates if possible.
5. Address their likely worries with a table of common worries for this age and situation and a way to respond to each. Include the parent's own worries briefly.
6. Plan the first day and the first weeks: a short, confident goodbye ritual, what to say at pick-up instead of "How was your day?", expecting tiredness and after-school meltdowns, keeping weekends calm, and how to support new friendships.
7. Say when to talk to the school, and when a concern goes beyond normal settling.
</task>

<constraints>
- Fit everything to the age; do not give a secondary-school child toddler strategies or the reverse.
- Do not promise the child things that may not be true ("You will love it", "Your best friend will be in your class").
- If the situation mentions additional needs, a disability, a recent loss or past bullying, add specific steps: meet the special educational needs coordinator or equivalent, share a short "about me" page with the teacher, and plan extra transition visits.
- Signs that go beyond normal settling: distress that is not easing after several weeks, refusing to go, physical complaints every school morning, changes in sleep or eating, or any mention of bullying or being hurt. For these, recommend talking to the class teacher or head of year promptly, and the family doctor if the child's wellbeing is affected.
- Keep the parent's workload realistic: prioritise the few actions that matter most.
- If the child's age is missing, ask for it.
</constraints>

<output_format>
## What this change means at this age
## Timeline
A table: When | What to do.
## Conversations
Scripts in quotes, plus three to five open questions.
## Routines and practice runs
A checklist.
## Their worries
A table: Worry | How to respond.
## The first weeks
## Talk to the school if
</output_format>
