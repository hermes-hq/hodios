---
schema: 1
id: write-student-behaviour-contract
kind: prompt
title: Write a student behaviour contract
description: Writes a behaviour contract agreed with a student, with two or three positively worded target behaviours, a simple tracker, rewards, check-in times, support from adults and a review date.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [behaviour-contract, positive-behaviour, student-agreement, behaviour-tracking]
pairs_with:
  prompts: [design-classroom-management-plan, plan-restorative-conversation, write-parent-email]
args:
  - name: situation
    description: The behaviours of concern with specific examples and frequency, what has been tried, and what the student is good at. First name or initials only.
    type: text
    required: true
  - name: grade_level
    description: Student's grade or age, so the wording fits.
    type: string
    required: true
  - name: school_rules
    description: Optional school behaviour policy points or reward systems to use, e.g. "house points", "report card system".
    type: text
output_contract:
  format: markdown
  sections: [Is a contract right, Target behaviours, The contract, Daily tracker, Running it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A behaviour contract is a short, written agreement between a student and teacher (often with the family) about a few specific behaviours. It works when the student helps write it, the targets are stated as what to do rather than what not to do, the targets are achievable at first so the student experiences success, feedback is frequent (each lesson or each part of the day), rewards are things the student actually values, and adults commit to their part too. Contracts fail when they list every rule, use vague targets ("be respectful"), rely on punishment, or run for months without review. A contract is a classroom-level tool; persistent or severe behaviour, or behaviour that may stem from an unmet need, needs a fuller assessment with specialist staff.
</context>

<task>
Write a behaviour contract for a **{{grade_level}}** student.
<situation>
{{situation}}
</situation>
{{#school_rules}}
<school_rules>
{{school_rules}}
</school_rules>
{{/school_rules}}

1. Check fit: say whether a contract suits this situation. If the notes suggest possible unmet needs (learning, communication, sensory, mental health), harm at home, or behaviour that is severe or unsafe, say the contract is not enough on its own and recommend involving the school's special needs, pastoral or safeguarding lead as appropriate.
2. Turn the concerns into 2 or 3 target behaviours that are observable and positively worded ("start work within 2 minutes of instructions", not "stop messing around"), with what success looks like at first and later.
3. Write the contract in language the student can read: the student's goals, what the teacher will do to help (cues, a calm-down option, check-ins), what the family can do if involved, rewards for meeting targets (small and frequent, with a bigger one weekly), what happens if targets are missed (a reset, not escalating punishment), the start date and review date (2 to 4 weeks), and signature lines.
4. Create a simple daily tracker with a row per lesson or part of day and a 0 to 2 scale per target, plus a student self-rating column.
5. Explain how to run it: introduce it to the student as a partnership, daily check-ins, how to adjust targets, and how to end or fade it.
</task>

<constraints>
- Positive, specific, achievable targets; no more than three.
- No public charts or anything that humiliates; keep the tracker private between student and adults.
- Rewards must not cost families money and must not withhold basic rights (food, toilet, break entirely).
- Use the identifiers given only; record facts, not diagnoses or labels.
- Follow any school policy given; if none, remind the teacher to check it.
</constraints>

<output_format>
## Is a contract right
One short paragraph, with any referral recommendation.
## Target behaviours
Numbered, with starting and later success levels.
## The contract
Ready to print, in student-friendly language.
## Daily tracker
A table.
## Running it
Bullets.
</output_format>
