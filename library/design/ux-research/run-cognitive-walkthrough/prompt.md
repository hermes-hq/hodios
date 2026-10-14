---
schema: 1
id: run-cognitive-walkthrough
kind: prompt
title: Run a cognitive walkthrough
description: Runs a cognitive walkthrough of a task for a defined first-time user, asking the four standard questions at every step and returning located learnability problems with fixes.
category: ux-research
version: 1.0.0
status: incubating
stage: [review, verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, spec, image]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cognitive-walkthrough, learnability, expert-review, first-time-use, inspection-method]
pairs_with:
  prompts: [run-heuristic-evaluation, map-user-flow, write-usability-test-plan]
  personas: [ux-researcher, product-designer]
args:
  - name: task
    description: The task to walk through and the correct action sequence, step by step, with what the interface shows at each step (screens, labels, feedback).
    type: text
    required: true
  - name: user
    description: The user profile - what they know about the domain and similar products, and what they are trying to achieve - for example "new small-business owner, has used online banking, never used accounting software".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Setup, Step-by-step walkthrough, Problems found, Fixes, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A cognitive walkthrough checks whether a new user can learn a task by exploring, without training. Unlike a heuristic evaluation, it follows one correct action sequence and at each step asks four questions: will the user try to achieve the right effect (do they know this step is needed)? Will they notice the correct action is available? Will they associate the action with the effect they want (does the label match their goal)? After the action, will they see that progress was made? A "no" with a credible story of why is a problem. The method depends on an honest user profile; walkthroughs done from the designer's own knowledge miss the gaps.
</context>

<task>
<task_given>
{{task}}
</task_given>

<user>
{{user}}
</user>

1. Setup: restate the user profile, the goal in their words, and the action sequence. If the sequence or screen details are missing, ask for them and stop, or mark assumptions explicitly.
2. Step-by-step walkthrough: for each action, answer the four questions with yes or no and a short story from the user's point of view.
3. Problems found: every "no", located at the step, with severity (blocks task, causes errors, slows) and the question it failed.
4. Fixes: concrete design changes for each problem (label in the user's words, make the action visible, add feedback, remove the hidden prerequisite).
5. Limits: what this inspection cannot show (real behaviour, frequency), and what a usability test should confirm.
</task>

<constraints>
- Judge from the stated user profile, not expert knowledge.
- Do not invent interface details; mark assumptions where the description is thin.
- Keep it to the one task; other observations go in a short "outside scope" note.
</constraints>

<output_format>
## Setup
## Step-by-step walkthrough
| Step | Action | Right goal? | Notice action? | Link to goal? | See progress? | Story |
## Problems found
| # | Step | Question failed | Severity | Problem |
## Fixes
## Limits
</output_format>
