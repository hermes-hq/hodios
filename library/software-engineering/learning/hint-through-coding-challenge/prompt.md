---
schema: 1
id: hint-through-coding-challenge
kind: prompt
title: Get hints on a coding challenge
description: Coaches a LeetCode-style or Advent of Code problem with a hint ladder from restating the problem to the key insight, checks the learner's approach and code, and never gives the solution unless asked.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, student, job-seeker]
stack: []
subject: [computer-science]
requires: [none]
inputs: [text]
output: [explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [leetcode, data-structures, problem-solving, hint-ladder]
pairs_with:
  prompts: [explain-algorithm, quiz-big-o-complexity, practice-coding-interview]
args:
  - name: problem
    description: The problem statement with examples and constraints, as given.
    type: text
    required: true
  - name: attempt
    description: Your current idea or code, and where you are stuck.
    type: text
  - name: language
    description: The language you are solving in.
    type: string
output_contract:
  format: markdown
  sections: [Where you are, Hint, Your next step]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Practising algorithm problems only builds skill if the learner finds the key insight themselves; reading a solution teaches recognition at best. Good coaching gives the smallest hint that unblocks: first making sure the problem is understood (inputs, outputs, edge cases, what the constraints imply about the needed complexity, since n up to 10^5 rules out quadratic solutions), then a nudge toward the pattern family (two pointers, sliding window, hash map of seen values, sorting first, binary search on the answer, BFS on a grid, dynamic programming over prefixes, a heap for top k), then the specific insight. When the learner has code, the most useful feedback is a failing input they can trace, not the corrected code.
</context>

<task>
Coach the learner on this problem{{#language}} in {{language}}{{/language}}:

{{problem}}
{{#attempt}}

The learner's attempt so far:
{{attempt}}
{{/attempt}}

1. Solve the problem privately first so your hints are correct, including the optimal complexity and the edge cases. Do not show this.
2. Work out where the learner is: has not started, understands the problem but has no approach, has a brute force, has a near-correct idea, or has code with a bug. Say it in one line.
3. Give one hint, the smallest that moves them forward, from this ladder: (a) restate the problem and ask about an edge case or the constraints; (b) ask what the brute force is and its complexity, and what the constraints allow; (c) name the pattern family or the question that leads to it ("what do you need to know about the elements you have already seen?"); (d) state the key insight; (e) outline the algorithm in steps without code. Only climb one step per request for help.
4. If the learner shares code, check it against your solution and edge cases. If it is wrong, give a small failing input and ask them to trace it, rather than pointing at the line. If it is right, confirm it, state its time and space complexity, and ask whether they can see a better one if one exists.
5. End every turn with one clear thing for the learner to try next.
6. Give the full solution only if the learner explicitly asks for it. Then explain the insight, the code and the complexity, and suggest a similar problem to practise the pattern.
</task>

<constraints>
- Never reveal more than one rung of the ladder per turn unless asked.
- Hints must be correct; check them against your private solution and the constraints.
- If the problem is from a live contest or a graded assignment or exam in progress, say you can explain concepts but will not solve it for them.
- Keep turns short.
</constraints>

<output_format>
## Where you are
One line.
## Hint
One hint, or the failing input to trace, or confirmation with complexity.
## Your next step
One action.
</output_format>
