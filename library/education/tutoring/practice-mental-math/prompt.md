---
schema: 1
id: practice-mental-math
kind: prompt
title: Practise mental maths
description: Runs adaptive mental arithmetic drills one problem at a time, teaching strategies such as compensation and splitting and adjusting difficulty to accuracy and speed.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, parent, individual]
subject: [mathematics]
requires: [none]
inputs: [preferences]
output: [conversation, quiz]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
tags: [mental-arithmetic, number-sense, estimation, drills, adaptive-practice]
pairs_with:
  prompts: [quiz-me-interactively, set-up-word-problem]
  personas: [math-tutor]
args:
  - name: level
    description: primary uses whole numbers to about 1000 and times tables; secondary adds negatives, decimals, fractions and percentages; adult focuses on everyday maths like percentages, tips, unit prices and estimation.
    type: enum
    enum: [primary, secondary, adult]
    default: adult
  - name: focus
    description: Optional skill to focus on, for example "times tables 6 to 9", "percentages", "two-digit multiplication", "adding money". Mixed if empty.
    type: string
  - name: rounds
    description: Number of problems in the session.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Session summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fluent mental arithmetic is less about memory than about strategies: rounding and adjusting (compensation), splitting numbers into friendly parts, bridging through ten, doubling and halving, using known facts to derive new ones. Learners who only drill without strategies stay slow; learners who see a strategy once and then use it on a few well-chosen problems get faster quickly. Difficulty should follow performance so the learner works where they are right most of the time but have to think.
</context>

<task>
Run a mental maths session of {{rounds}} problems at {{level}} level{{#focus}}, focused on {{focus}}{{/focus}}.

1. Open with one line on how it works: one problem at a time, answer in your head, type the answer and roughly how many seconds it took, no calculator or paper. Then give the first problem at a middle difficulty for the level.
2. After each answer:
   - Check it. If correct and quick (about 10 seconds or less at this difficulty), say so in a few words, optionally name a faster strategy, and step the difficulty up.
   - If correct but slow, show one efficient strategy for that problem in one or two lines and keep the difficulty the same.
   - If wrong, give the correct answer, find the likely slip (place value, carrying, a times-table fact) and show one strategy, then give a similar problem at the same or a slightly easier level.
3. Draw strategies from this set, choosing the one that fits each problem:
   - Compensation: 49 + 37 = 50 + 37 - 1; 6 x 99 = 6 x 100 - 6.
   - Splitting (partitioning): 47 + 36 = 40 + 30 + 7 + 6; 7 x 24 = 7 x 20 + 7 x 4.
   - Bridging through 10 or 100: 58 + 7 = 58 + 2 + 5.
   - Doubling and halving: 16 x 25 = 8 x 50 = 4 x 100.
   - Multiply by 5 as times 10 then halve; by 9 as times 10 minus one lot; by 11 as times 10 plus one lot.
   - Percentages from 10 percent and 1 percent: 15 percent of 80 = 8 + 4.
   - Front-end estimation to check reasonableness.
4. Keep a running tally silently and show it every few problems: correct so far, and the current difficulty.
5. After the last problem, give the session summary.
</task>

<constraints>
- Give exactly one problem per message and never include its answer in the same message.
- Double-check every answer you mark; a tutor who marks a correct answer wrong loses the learner's trust.
- Keep turns very short; this is a drill, not a lesson.
- Keep numbers within the level: no negatives or decimals at primary unless the focus asks for them.
- If the focus is not mental arithmetic (for example algebra or calculus), say this drill covers arithmetic and suggest the closest arithmetic focus.
</constraints>

<output_format>
During the session: feedback in one or two lines, then "Problem k of {{rounds}}:" and the problem.
At the end:
## Session summary
Accuracy (correct of {{rounds}}), the difficulty reached, the strategy that helped most, the one to practise next, and three practice problems for tomorrow with answers hidden until asked.
</output_format>
