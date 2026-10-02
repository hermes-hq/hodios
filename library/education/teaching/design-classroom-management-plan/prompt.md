---
schema: 1
id: design-classroom-management-plan
kind: prompt
title: Design a classroom management plan
description: Designs a classroom management plan with expectations, routines, positive reinforcement, a consistent response ladder and family communication for the grade. For new teachers and class resets.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [classroom-management, behaviour, routines, pbis, restorative-practice]
pairs_with:
  prompts: [write-parent-email, plan-substitute-lesson]
  personas: [instructional-coach]
args:
  - name: grade
    description: Grade or age and setting, e.g. "Grade 2, self-contained classroom", "Year 9 science, 5 different classes", "adult ESL evening class".
    type: string
    required: true
  - name: challenges
    description: Optional current issues, described as observable behaviour, e.g. "calling out during instruction, slow transitions after lunch, 4 students regularly off task in group work".
    type: text
  - name: school_policy
    description: Optional school behaviour policy, consequence system or required approaches the plan must fit.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Expectations, Routines, Reinforcement, Response ladder, Family communication, Launch plan, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most classroom behaviour problems are prevented, not punished away. The approaches with the strongest evidence (positive behaviour support and its classroom practices) share a core: a few positively stated expectations, routines taught and practised like content, frequent specific acknowledgement of what is going right, and calm, predictable, escalating responses to what is not, applied consistently and fairly. Relationships and repair matter as much as rules. New teachers usually have the rules and lack the routines and the response ladder.
</context>

<task>
Design a classroom management plan for {{grade}}.
{{#challenges}}
<challenges>
{{challenges}}
</challenges>
{{/challenges}}
{{#school_policy}}
<school_policy>
{{school_policy}}
</school_policy>
{{/school_policy}}

1. **Principles:** 3 or 4 sentences on the approach, so the teacher can explain it to students, families and colleagues.
2. **Expectations:** 3 to 5 positively stated expectations suited to the age ("Be safe, be kind, be ready to learn" for younger students; more specific for older ones), each with what it looks like in 2 or 3 key settings (whole-class teaching, group work, transitions).
3. **Routines:** the routines this class needs, at least entry, getting attention, transitions, asking for help, materials and dismissal{{#challenges}}, plus one for each challenge described{{/challenges}}. For each: the steps, and how to teach it (explain, model, practise, give feedback, re-practise).
4. **Reinforcement:** how to acknowledge expected behaviour: specific praise, with a target of clearly more positive than corrective interactions (a ratio around 4 to 1 is a common guideline), and any whole-class system that suits the age. Avoid public systems that shame individuals, such as names on the board or clip charts that move students down in front of peers.
5. **Response ladder:** a sequence from least to most intrusive, for example non-verbal cue, proximity, quiet redirection, a private choice with a logical consequence, a reset or time to calm in class, a restorative conversation, contact with home, then referral under school policy. For each step: what the teacher says or does, and when to move up. Note that unsafe behaviour skips straight to the school's safety procedures.
6. **Family communication:** positive contact early in the year before any problem, when and how to contact home about concerns, and what to say.
7. **Launch plan:** day-by-day for the first week (or the first week back after a reset), then what continues weekly, so routines are taught before content takes over.
8. **Review:** what to track (simple data such as transitions timed, incidents by time of day) and an equity check: look at whether corrections and referrals fall disproportionately on particular groups of students, and adjust.
</task>

<constraints>
- Fit every part to the school policy when given; if the plan's suggestions conflict with it, follow the policy and note the conflict.
- Match the age: language, rewards and routines that would feel babyish to teenagers, or too abstract for six-year-olds, are a failure.
- Address challenges as behaviour to teach and change, not as traits of students; no diagnoses.
- Keep it runnable by one teacher; prefer a few routines done consistently over many.
- If the setting is unclear (age, single class or many), state your assumption.
</constraints>

<output_format>
Use the section headings from the output contract. Expectations as a table: Expectation | Whole-class | Group work | Transitions. Routines as numbered steps. Response ladder as a table: Step | Teacher action | Words to use | Move up when. Launch plan as a short day-by-day list.
</output_format>
