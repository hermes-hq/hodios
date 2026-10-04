---
schema: 1
id: prepare-eleven-plus
kind: prompt
title: Plan eleven-plus preparation
description: Plans preparation for an eleven-plus or similar school entrance test, with the typical paper formats, a gentle weekly plan, reasoning practice ideas and wellbeing guardrails.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, student]
subject: [english, mathematics]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [eleven-plus, grammar-school, verbal-reasoning, non-verbal-reasoning, entrance-test, child-wellbeing]
pairs_with:
  prompts: [create-study-plan, plan-exam-day-strategy]
args:
  - name: months_left
    description: Months until the test date.
    type: number
    required: true
  - name: test_format
    description: What is known about the test, such as the test provider, the subjects (English, maths, verbal reasoning, non-verbal reasoning), multiple-choice or written answers, the area or the school. unknown makes the plan cover the common components and lists what to find out.
    type: string
    default: unknown
  - name: child_age
    description: The child's age in years.
    type: number
    default: 10
  - name: notes
    description: Optional notes about the child and family, such as strengths and worries, whether the child wants to sit the test, any special educational needs, other commitments, and how much time you were planning to spend.
    type: text
output_contract:
  format: markdown
  sections: [What to find out first, The test in brief, Plan by phase, A typical week, Practice ideas by paper, Wellbeing guardrails, Test day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Selective school entrance tests at about age ten or eleven differ by area and school: who writes the test, which papers are set (English comprehension and vocabulary, maths, verbal reasoning, non-verbal and spatial reasoning, sometimes creative writing), whether answers are multiple choice on a separate sheet, and how the results are standardised by age. Children do best when the skills are built steadily through reading, everyday maths and short varied practice, and when they are familiar with the question types and the answer sheet, so nothing on the day is a surprise. Long drilling sessions, constant mock tests and making a place feel like the measure of the child's worth raise anxiety and often lower performance. The child's wellbeing comes first, and a good plan works even if the outcome is not a place.
</context>

<task>
Write a preparation plan for a {{child_age}}-year-old with {{months_left}} months until the test. What is known about the test: {{test_format}}.
{{#notes}}
<family_notes>
{{notes}}
</family_notes>
Use these notes to fit the plan to this child. If they ask for more volume or pressure than suits a {{child_age}}-year-old (daily long sessions, weekly mocks, no free days), say so kindly at the start, explain why shorter sessions work better, and plan the sustainable version. If they show the child does not want to sit the test or is already anxious, address that first.
{{/notes}}

1. **What to find out first.** List the facts to confirm on the local authority, consortium or school website: the test provider, papers and timing, answer format, registration deadline, familiarisation material offered, any access arrangements for special educational needs or disability and how to apply for them. If test_format is "unknown", say the plan covers the common components until these are known.
2. **The test in brief.** Describe each likely paper in plain language: what it tests and what a typical question looks like, with one original example per paper. Mark anything specific to a provider as "check against the official familiarisation material".
3. **Plan by phase.** Split {{months_left}} months into phases: build foundations (reading widely, vocabulary, times tables and arithmetic fluency, puzzles), learn question types, mixed timed practice, and a calm final few weeks. If time is short (under three months), focus on familiarity with the question types and answer sheet rather than new content, and say so. If it is long (over a year), keep the early months light and mostly reading and play-based.
4. **A typical week.** Short sessions sized for a {{child_age}}-year-old: 20 to 40 minutes, four or five days, at least two free days, no sessions on a full school day if the child is tired. Rotate papers. Include one session a week of games or puzzles that build the same skills.
5. **Practice ideas by paper.** Practical, low-cost activities for each paper: for vocabulary, reading choices and word games; for maths, mental arithmetic and word problems from daily life; for verbal reasoning, code and letter-series games; for non-verbal, pattern puzzles, folding paper and spotting rotations. Explain how to review mistakes kindly.
6. **Wellbeing guardrails.** Signs that preparation is too much (tears, stomach aches, avoidance, sleep changes, loss of interest in hobbies) and what to do (cut back, take a week off, talk to the class teacher). How to talk about the test so the child knows the result does not change how they are loved. A plan for the result either way, including a positive story about the other schools.
7. **Test day.** A short checklist: sleep, breakfast, practice with the answer sheet beforehand, what to take, what to say at the gate.
</task>

<constraints>
- No pressure tactics, rewards tied to scores, or comparison with other children.
- Never invent pass marks, standardised score thresholds or school-specific cut-offs. Point to the school's published admissions data.
- Do not recommend paid tutors or products by name; suggest that free familiarisation material comes first.
- Keep every activity suitable for a child of {{child_age}}.
</constraints>

<output_format>
Use the section headings from the output contract. Plan by phase as a table: Phase | Weeks | Focus | Signs it is working. Typical week as a table: Day | Minutes | Activity. Practice ideas as bullets under each paper. Test day as a checklist.
</output_format>
