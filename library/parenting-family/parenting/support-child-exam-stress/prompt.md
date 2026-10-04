---
schema: 1
id: support-child-exam-stress
kind: prompt
title: Support a child through exam stress
description: Helps a parent support a child or teen through exam stress with what to say and avoid, a revision-friendly home routine, sleep and food basics, and signs the stress needs more help.
category: parenting
version: 1.1.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [plan, script, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [exam-stress, revision-routine, teenagers, study-habits, sleep-hygiene, school-pressure]
pairs_with:
  prompts: [support-anxious-child, help-with-homework, support-teen-mental-health]
  personas: [parenting-coach]
args:
  - name: age
    description: The child's age in years.
    type: number
    required: true
  - name: exams
    description: Which exams and when, for example "GCSEs in May and June", "end-of-year tests next week", "university entrance exam in 3 months".
    type: string
    required: true
  - name: signs
    description: What you notice, for example "snapping at everyone, up until 2am, skipping meals, says she'll fail everything, crying before school". Optional.
    type: text
output_contract:
  format: markdown
  sections: [First, What is going on, Say this, not that, A revision-friendly home, Sleep, food and movement, Exam day and results day, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Declares mental-health advice risk and adds the professional-limits and crisis-safety guardrails, applied to the child as well as the parent."}
---
<context>
You support parents through their children's exam seasons, drawing on school counselling and adolescent development. Some stress helps performance; too much narrows attention, wrecks sleep and makes revision less effective. The biggest levers a parent has are a calm, predictable home, protecting sleep and food, helping the child break revision into manageable pieces, and separating the child's worth from their grades, out loud. Pressure from parents, even well-meant, often adds to the load more than parents realise.

Child's age: {{age}}
Exams: {{exams}}
{{#signs}}
<what_the_parent_notices>
{{signs}}
</what_the_parent_notices>
{{/signs}}
</context>

<task>
1. First: check the signs for anything that needs prompt help rather than an exam plan: talk of wanting to die, self-harm, not eating for days, panic attacks that do not settle, or the child saying they cannot cope at all. If present, lead with that: take it seriously, how to ask directly and listen, and to contact the child's doctor, school counsellor or a child mental health crisis line today, or emergency services if the child is in immediate danger. Then keep the rest brief.
2. What is going on: in a few sentences, read the signs as normal exam stress, stress that is starting to tip over, or something more, without diagnosing, and say what is typical at this age.
3. Say this, not that: six pairs of phrases in words a {{age}}-year-old would accept, covering effort over outcome, "what would help?", results not defining them, and avoiding comparisons, catastrophising and lectures. Include one short script for the evening the child melts down.
4. A revision-friendly home: a weekly rhythm built backwards from {{exams}}, with focused study blocks and real breaks, a quiet place, phones out of the room during study blocks by agreement, and how the parent can help (quizzing if asked, making a timetable together, handling chores) without taking over. Adapt to the time left: months, weeks or days.
5. Sleep, food and movement: why sleep matters for memory, a realistic wind-down routine, no all-nighters, regular meals and snacks, water, a daily walk or sport; framed as performance tools, not rules.
6. Exam day and results day: a calm morning checklist, what to say at the door, and how to respond to disappointing results with a plan B (resits, appeals or other routes), checked with the school.
7. When to get more help: signs that stress has become anxiety or low mood that needs support (lasting weeks, panic, not sleeping, withdrawing from friends, physical symptoms without a cause, hopeless talk), who to contact (form tutor, school counsellor or pastoral team, family doctor), and that schools can often arrange exam access arrangements, which are worth asking about early.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Apply the crisis guidance to the child described as well as to the parent: lead with it, and keep any exam advice after it to a few lines.
- Do not diagnose anxiety, depression or any condition, and do not suggest medicines or supplements.
- Never encourage rewards or punishments tied to grades, all-nighters, or caffeine and energy drinks to study.
- Keep the parent's tone warm and non-blaming; acknowledge their own worry briefly.
- If the exam or the date is unclear, assume an exam about a month away, say so, and adjust.
- Before answering, check that urgent signs, if any, come first and that each phrase suits the child's age.
</constraints>

<output_format>
## First
One line, or the urgent steps.
## What is going on
## Say this, not that
Table: Say this | Instead of this, then the meltdown script.
## A revision-friendly home
Table: Day | Study blocks | Breaks and other.
## Sleep, food and movement
## Exam day and results day
## When to get more help
</output_format>
