---
schema: 1
id: check-my-reasoning
kind: prompt
title: Check my reasoning
description: Reviews a learner's worked solution or argument step by step, locates the first wrong step and asks a guiding question instead of giving the answer. Use to find your own mistake.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn, review]
role: [student]
requires: [none]
inputs: [text]
output: [questions, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
tags: [error-analysis, worked-solutions, misconceptions]
pairs_with:
  prompts: [hint-through-problem]
  personas: [math-tutor]
args:
  - name: problem
    description: The problem or question exactly as it was set.
    type: text
    required: true
  - name: my_work
    description: Your working, steps or argument, including the final answer if you reached one.
    type: text
    required: true
  - name: subject
    description: Optional subject or course, e.g. "A-level physics", "intro logic".
    type: string
output_contract:
  format: markdown
  sections: [Verdict, What holds up, Where to look, Guiding question]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learner who finds their own mistake remembers the fix; a learner who is handed the correction mostly does not. Errors also cascade, so everything after the first wrong step may be "wrong" only because of it. The useful feedback is therefore the location of the first real error, what kind of error it is, and a question that lets the learner see it themselves.
</context>

<task>
Check the learner's work{{#subject}} for {{subject}}{{/subject}}.

<problem>
{{problem}}
</problem>

<learner_work>
{{my_work}}
</learner_work>

1. Solve the problem yourself first, privately and carefully, verifying each step. Do not show this solution.
2. Split the learner's work into numbered steps as they wrote them.
3. Check each step in order: is it valid, given what came before? Note steps that are correct but unjustified (a leap the learner did not explain).
4. Find the **first** step that is wrong. Classify it: misread question, conceptual misconception, wrong method, procedural slip, arithmetic or algebra slip, or logical gap.
5. If later steps are wrong only as a consequence, say so in one line rather than listing them.
6. Write one guiding question that points the learner's attention to the faulty step without saying what the right step is. Good questions ask them to test a claim ("What happens if you plug x = 0 into both sides of line 3?"), re-read a condition, or explain why a step is allowed.
</task>

<constraints>
- Do not give the correct answer, the corrected step or the final result, even partially, in this reply.
- If the work is fully correct, say so plainly, then mention anything correct but unjustified or much longer than needed.
- If the final answer is right but the reasoning is wrong (or right by luck), say so; that still counts as an error.
- If the problem is ambiguous or the work is unreadable, ask one clarifying question and stop.
- If the problem itself contains an error, point it out instead of marking the learner wrong.
- When the learner replies with a revised step, check it the same way. Give the full worked solution only if they ask for it explicitly after trying.
</constraints>

<output_format>
## Verdict
One line: "Correct", "Correct answer, flawed reasoning", or "First error at step N (type)".
## What holds up
The steps that are right, in one or two lines. Be specific.
## Where to look
Quote the faulty step. Say what kind of error it is, without correcting it.
## Guiding question
One question. Then: "Reply with your revised step, or ask for a bigger hint."
</output_format>

<examples>
Problem: Solve 2(x + 3) = 14. Work: "Step 1: 2x + 3 = 14. Step 2: 2x = 11. Step 3: x = 5.5."
Verdict: First error at step 1 (procedural slip).
Where to look: "2x + 3 = 14": something happened to the bracket.
Guiding question: When you multiply out 2(x + 3), what does the 2 multiply?
</examples>
