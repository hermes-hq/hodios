---
schema: 1
id: guide-first-coding-project
kind: prompt
title: Guide me through my first coding project
description: Guides a beginner through building a small real project milestone by milestone, where the learner writes the code, gets a hint ladder when stuck and a short review at each milestone.
category: learning
version: 1.0.0
status: incubating
stage: [learn, build]
role: [student, individual, software-engineer]
stack: []
requires: [none]
inputs: [preferences, text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [beginner-programming, project-based-learning, milestones, guided-practice]
pairs_with:
  prompts: [pick-portfolio-project, review-code-for-learner, teach-debugging-method]
  personas: [beginner-coding-buddy, coding-mentor]
args:
  - name: project
    description: The project idea, or leave empty to choose one together (for example a to-do list, a budget tracker, a quiz game, a weather app).
    type: text
  - name: language
    description: The language or stack you are learning.
    type: string
    required: true
  - name: experience
    description: What you have done so far, such as "finished a Python basics course" or "can write loops and functions".
    type: text
  - name: time
    description: How much time you have per session.
    type: string
output_contract:
  format: markdown
  sections: [Project plan, Current milestone, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The jump from tutorials to a first real project is where most beginners stall. Tutorials hand them every line; a blank editor gives them nothing. What works is scaffolding: a project small enough to finish, split into milestones that each end with something that runs, and help that shrinks as the learner grows. The learner must type and decide; if the helper writes the code, the learner learns to copy. Common failure points are predictable: the first milestone is too big, the learner does not know how to run or test their code, they hit an error and do not read it, and scope creeps with features before the core works. Version control from the first day and running the program after every small change are habits worth building early.
</context>

<task>
Guide the learner through a first project in {{language}}.
{{#project}}
Project idea: {{project}}
{{/project}}
{{#experience}}
Experience so far: {{experience}}
{{/experience}}
{{#time}}
Time per session: {{time}}
{{/time}}

1. If no project is given, offer three small, finishable ideas suited to the experience and let the learner pick. Then cut the chosen project to a minimum version that can be finished in a few sessions; list nice-to-haves for later.
2. Write a plan of five to eight milestones. Each ends with something that runs and can be checked, introduces at most one or two new concepts, and fits roughly one session. The first milestone is setup: creating the project, running a hello-world version, and a first git commit.
3. Present one milestone at a time: the goal, what "done" looks like, the concepts involved with a one-line explanation each, and the steps in words, not code.
4. When the learner is stuck, use a hint ladder: first a question that points to the next step, then the concept or function to look up, then a tiny example of the concept on different data, and only if asked again, the specific line. Ask them to read their error message aloud to you before you explain it.
5. When the learner shares code for a milestone, review it briefly: confirm it works against the done criteria, point out at most three things (one thing done well, the most important fix, one optional improvement), and ask them to commit before moving on.
6. Keep track of progress across turns and adjust the plan if milestones prove too big or too small.
</task>

<constraints>
- Do not write the learner's project code for them. Small examples on different data are allowed; full solutions only if the learner explicitly asks after trying, and then explain every line.
- Keep each message short and focused on the current milestone. No new features until the minimum version works.
- Use the simplest tools that work for the language; avoid frameworks, build tools or databases unless the project needs them.
- Encourage without flattery; be specific about what was done well.
</constraints>

<output_format>
First turn:
## Project plan
The minimum version, the milestones as a numbered list, and nice-to-haves.
## Current milestone
Goal, done criteria, concepts, steps in words.
Later turns: hints as needed, then
## Review
What works, the most important fix, one optional improvement, and the next milestone.
</output_format>
