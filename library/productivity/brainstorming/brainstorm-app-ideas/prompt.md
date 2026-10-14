---
schema: 1
id: brainstorm-app-ideas
kind: prompt
title: Brainstorm app ideas
description: Generates app and software project ideas from your daily problems, skills and the people you know, scored for buildability, usefulness and testing, with a small first version for the top picks.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [software-engineer, student, founder, individual]
requires: [none]
inputs: [text, preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [app-ideas, side-projects, portfolio-projects, mvp, problem-finding]
pairs_with:
  prompts: [generate-business-ideas, turn-annoyances-into-ideas, scope-solo-side-project, spec-app-idea-for-developers]
args:
  - name: about_you
    description: Your skills and tools (or "learning to code", "no-code only"), the time you have, and why you want to build, for example "portfolio for junior developer jobs", "solve a problem at work", "side income".
    type: text
    required: true
  - name: problems
    description: Things that annoy you or people you know in daily life, work, hobbies or communities, as many as you can list. The more specific, the better the ideas.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Needs behind the problems, Ideas, First versions of the top three]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The best app ideas for an individual builder come from problems they have personally or can watch closely (their job, hobby, club, family), because they can test with real users next week. Lists of "app ideas" online are generic (to-do apps, weather apps, recipe finders) and already saturated. Good ideas are narrow: a specific group, a specific annoying task, done better in one way. Buildability matters as much as usefulness: an idea that needs a two-sided marketplace, hardware, medical or financial regulation, or scraping sites that forbid it is a trap for a solo builder. Purpose changes the scoring: a portfolio project should show relevant skills and be finished; a side income idea needs people who will pay; a work tool needs permission and data rules. Often a spreadsheet, form or existing tool already solves it, and saying so is useful.

About you: {{about_you}}
Problems: {{problems}}
</context>

<task>
1. If the problems are too vague to work from, ask for three specific annoyances and stop.
2. For each problem, write the underlying need, who has it and how they cope now.
3. Generate 10 to 15 app ideas from those needs, each narrow (a specific user and task), including a few that combine two problems.
4. Score each 1 to 5 on usefulness to the user group, buildability with the stated skills and time, ease of testing with real people, and fit with the stated purpose. Flag traps (marketplaces, regulated data, scraping, hardware).
5. Note where an existing tool, spreadsheet or no-code form would solve it instead.
6. For the top three, describe the smallest first version (core screen or flow, what to leave out), a way to test it with five real users, and what would show it is worth continuing.
</task>

<constraints>
- Do not claim no one has built something; say similar products may exist and suggest checking.
- Do not invent market sizes, revenue or user numbers.
- Flag health, finance, children's data or location-tracking ideas as needing extra care with privacy and regulation.
- Keep the first versions small enough for the stated time.
</constraints>

<output_format>
## Needs behind the problems
## Ideas
Table: Idea | User and task | Useful | Buildable | Testable | Fit | Traps or existing tools.
## First versions of the top three
</output_format>
