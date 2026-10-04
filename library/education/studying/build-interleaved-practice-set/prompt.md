---
schema: 1
id: build-interleaved-practice-set
kind: prompt
title: Build an interleaved practice set
description: Builds a shuffled practice set mixing topics a student has already learned, so they must first pick the method, with a key naming the cue and the trap for each item.
category: studying
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student]
subject: [mathematics, physics, chemistry, economics]
requires: [none]
inputs: [text, topic]
output: [quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [interleaving, mixed-practice, method-selection, problem-solving]
pairs_with:
  prompts: [create-faded-worked-examples, analyze-exam-mistakes, make-flashcards]
  personas: [study-coach]
args:
  - name: topics
    description: The topics or methods to mix, all already learned one at a time, e.g. "product rule, quotient rule, chain rule, implicit differentiation". Two or more.
    type: text
    required: true
  - name: example_problems
    description: Optional problems from your textbook or past papers, so the new set matches their style, notation and difficulty.
    type: text
  - name: count
    description: How many problems in the set.
    type: number
    default: 15
  - name: level
    description: The student's stage of education.
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
output_contract:
  format: markdown
  sections: [How to use this set, Problems, Answer key, Confusion log]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
End-of-chapter exercises are blocked: every problem uses the method just taught, so the student never has to decide which method applies. In an exam, that decision is often the hard part. Interleaved practice mixes problem types so the student must recognise the cue for each method first, which is slower and feels harder but improves later performance.

A good interleaved set avoids four mistakes:
- Headings, order or wording that give the method away ("Chain rule questions", or every "train" story being a speed problem).
- Topics the student has not learned yet; interleaving is for discriminating between known methods, not for first learning.
- Too few items per method to compare, or methods that are never confusable with each other.
- A key that gives only answers, without how to tell which method applies.

Level: {{level}}. Number of problems: {{count}}.
</context>

<task>
<topics>
{{topics}}
</topics>
{{#example_problems}}

<example_problems>
{{example_problems}}
</example_problems>
{{/example_problems}}

1. List the methods to be mixed. If only one method is given, say interleaving needs at least two that could be confused, suggest two or three neighbouring methods at the same level, and build the set with them marked as suggestions.
2. Name the confusable pairs: methods whose problems look alike on the surface but need different approaches (for example permutations versus combinations, price elasticity versus income elasticity, conservation of momentum versus conservation of energy). Note the real cue that separates each pair.
3. Allocate items: roughly equal across methods, at least 3 per method, with extra items on the confusable pairs. Include 2 or 3 near-miss items whose surface features suggest the wrong method. If {{count}} is too small for 3 per method, say so and either raise the count to fit or ask which methods to drop.
4. Shuffle under constraints: never more than 2 items in a row with the same method, no grouping or labels, and confusable pairs sometimes placed next to each other.
5. Write each problem with fresh numbers and contexts. If example problems are given, match their notation and difficulty without copying them. Keep difficulty steady so the challenge is choosing the method, not the arithmetic.
6. Solve every problem fully before writing the key, and check each final answer a second way (substitution, estimation, units or a limiting case).
7. In the key, for each item give: the method, the cue that identifies it, the tempting wrong method and why it fails, the final answer and a 1 to 3 line solution outline.
</task>

<constraints>
- Use only the methods listed (or clearly marked suggestions). Do not introduce untaught topics.
- The Problems section must not reveal methods: no headings, hints or ordering by topic.
- Every answer must be worked and checked; if a problem cannot be checked with confidence, replace it.
- If the topics are too vague to build from (for example "maths" or "stuff for my test"), ask which methods or chapters the test covers and stop.
- If the problems look like graded homework the student has pasted, build parallel problems with different numbers instead of solving theirs.
</constraints>

<output_format>
## How to use this set
3 to 5 bullets: before solving each item, write the method and the cue you spotted; solve with notes closed; mark the key; log confusions.

## Problems
Numbered 1 to {{count}}, problem text only.

## Answer key
Table: # | Method | Cue | Tempting wrong method | Answer. Then numbered solution outlines, 1 to 3 lines each.

## Confusion log
A blank table to copy: # | I chose | Correct method | The cue I missed. Then one line on what to do if the same pair is confused twice (practise just that pair side by side, then re-mix).
</output_format>
