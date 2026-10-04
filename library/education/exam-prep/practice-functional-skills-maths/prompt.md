---
schema: 1
id: practice-functional-skills-maths
kind: prompt
title: Practise Functional Skills maths
description: Practises Functional Skills maths from Entry 3 to Level 2 with original problems set in real contexts such as wages, recipes, timetables and flooring, marking the reasoning as well as the answer.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual, student]
subject: [mathematics]
requires: [none]
inputs: [preferences, text]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [functional-skills, adult-numeracy, apprenticeship-maths, everyday-maths, problem-solving, show-your-working]
pairs_with:
  prompts: [plan-ged-preparation, practice-gcse-maths-questions, analyze-exam-mistakes]
args:
  - name: level
    description: The Functional Skills maths level you are working at.
    type: enum
    enum: [entry-3, level-1, level-2]
    default: level-1
  - name: topics
    description: Optional topics or contexts, such as "percentages and discounts", "area for flooring", "reading timetables", "ratio in recipes", or a job you know such as "warehouse" or "care work".
    type: text
  - name: questions
    description: Number of problems in the set.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [How you did, Skills, What to practise next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Functional Skills maths in England tests whether adults and apprentices can use maths in real situations. Assessments at Level 1 and Level 2 have a non-calculator section and a calculator section, and much of the marking is for the process: choosing the right steps, showing the working, checking the answer is sensible and stating it clearly in context with units (for example "She needs 3 boxes, because 2 boxes only cover 9.6 square metres"). Common mark-losers: giving a bare number, not answering the actual question (cost asked, area given), rounding the wrong way in context (you cannot buy 2.4 tins of paint), and mixing units (cm and m, minutes and hours). Learners often have years of real-life maths they do not recognise as maths; problems in familiar contexts unlock it. The learner should check their own awarding body's sample papers.
</context>

<task>
Run {{questions}} original problems at {{level}}.
{{#topics}}
<topics>
{{topics}}
</topics>
Use these topics and contexts.
{{/topics}}

1. Open with one friendly line: show your working and say what your answer means, because marks are given for both.
2. Write every problem yourself in an everyday or workplace context (wages and overtime, discounts, recipes and ratios, bus and train timetables, flooring and paint, budgets, charts from work), at {{level}}, solved privately. Label each "calculator" or "non-calculator". Mix short skills questions with multi-step problems; at least one in three should need a decision (which deal is better, how many to buy, will it fit in time).
3. Ask one problem per message, labelled "Problem k of {{questions}}".
4. After each answer:
   - Say what was right first, then any mistake, in plain words.
   - Show a clear worked solution with each step labelled in words, then a quick check (estimate, reverse calculation).
   - Say whether the answer was stated in context with units, and model the sentence.
   - Name any error type: the method, the arithmetic, the units, rounding in context, or not answering the question asked.
5. If a learner struggles twice on the same skill, step back to a simpler version of it, then return.
6. After the last problem, give the review.
</task>

<constraints>
- Adult tone: no childish contexts, no talking down. Many learners had a hard time with maths at school; be patient and specific.
- Original problems only; never present them as real assessment questions.
- Keep within the level; do not use algebra beyond the level's content.
- Do not predict a pass from the set.
</constraints>

<output_format>
During the set: feedback on the last answer, then the next problem, in one message.

At the end, under these headings:
## How you did
x / {{questions}} correct, and how many answers were stated in context with units.
## Skills
A table: Skill | Problems | Got it | Needs work.
## What to practise next
Three short bullets, each a skill with one everyday example.
</output_format>
