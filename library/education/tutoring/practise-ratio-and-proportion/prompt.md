---
schema: 1
id: practise-ratio-and-proportion
kind: prompt
title: Practise ratio and proportion
description: Tutors ratio, proportion and scaling with bar models and double number lines in contexts like recipes, maps, mixing and best buys, with the learner describing the model in words first.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [mathematics]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [ratio, proportional-reasoning, bar-models, double-number-lines, best-buys, scaling]
pairs_with:
  prompts: [set-up-word-problem, practise-estimation-and-sense-checking]
  personas: [math-tutor]
args:
  - name: topic
    description: Which ratio skill to practise. sharing splits an amount in a ratio; scaling enlarges recipes or maps; direct-proportion and inverse-proportion work with linked quantities; best-buys compares value.
    type: enum
    enum: [sharing, scaling, direct-proportion, inverse-proportion, best-buys]
    default: sharing
  - name: level
    description: The learner's stage; sets the numbers (whole numbers early, decimals and fractions later).
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Results, Models that helped, Next practice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The learner is practising ratio and proportion.
Level: {{level}}
Skill: {{topic}}
 Ratio problems defeat learners who jump straight to arithmetic: they divide by the wrong number (sharing 40 in the ratio 3:5 by dividing by 3 or 5 instead of 8 parts), confuse a part-to-part ratio with a part-to-whole fraction, add instead of multiply when scaling ("2 eggs for 4 people, so 4 eggs for 6"), or assume every relationship is direct when it is inverse (more workers take less time). Bar models and double number lines make the multiplicative structure visible, and describing them in words works well in a text conversation.
</context>

<task>
1. Introduce the two models once, in words:
   - Bar model: draw a bar for each share, split into equal boxes, one box per ratio part ("Ali: 3 boxes, Bea: 5 boxes, 8 boxes altogether = 40, so one box = 5").
   - Double number line: two parallel lines with matching marks ("0 g flour and 0 people; 250 g and 4 people; so 62.5 g for 1 person, 375 g for 6").
   For inverse proportion, a table where one quantity doubles while the other halves, with the product staying constant.
2. Set {{problems}} problems one at a time, in everyday contexts (recipes, map scales, paint or concrete mixing, exchange rates, sharing money, comparing pack sizes, workers and time), growing in difficulty: unitary method, non-integer multipliers, a total that is not given but one share is, and multi-step.
3. For each problem, ask the learner first to describe the model they would draw: how many boxes or which marks on the number line, and what one box or one unit stands for. Then ask for the calculation and an answer with units.
4. Check each step. If they add instead of multiply, show the contradiction on the double number line (for example, subtracting the same amount to get down to 1 person gives zero or a negative number of eggs, which cannot be right). If they confuse part and whole, use the bar. For best buys, compare by unit price or by scaling to the same quantity, and ask which is the better value and whether other factors matter (waste, storage).
5. After each problem, give a short correct solution with the model and a quick check (do the shares add to the total, does the scaled recipe still taste right in proportion).
6. Close with the summary.
</task>

<constraints>
- Check every answer before setting the problem; avoid recurring decimals at primary level.
- One problem per message, and never solve before the learner tries.
- Prices and exchange rates in problems are invented for practice; say so if a real-looking currency is used.
- Accept any correct method; the models are tools, not requirements.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the context and question.

At the end:
## Results
| Problem | Type | Correct? | What tripped you up |
## Models that helped
Which model worked for which problem type, in the learner's words.
## Next practice
Two more problems in a context the learner enjoyed, answers hidden until asked.
</output_format>
