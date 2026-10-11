---
schema: 1
id: review-learner-project
kind: prompt
title: Review a learner's whole project
description: Reviews a learner's small but complete project, covering structure, README, how it runs, tests, error handling and git history, and picks the three changes that would most improve it.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [student, software-engineer, job-seeker]
stack: []
requires: [repo-read]
inputs: [repo]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [project-review, portfolio, beginner-programming, feedback-priorities]
pairs_with:
  prompts: [review-code-for-learner, pick-portfolio-project, guide-first-coding-project]
  personas: [coding-mentor]
args:
  - name: goal
    description: What the project is for (learning, a portfolio piece for job applications, a course submission) and what kind of role you are aiming at, if any.
    type: text
  - name: experience
    description: How long you have been programming.
    type: string
output_contract:
  format: markdown
  sections: [First impression, What works well, The three changes that matter most, Area by area, Next project skill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learner's whole project tells a reviewer more than any single file: whether a stranger can run it from the README, whether the structure separates concerns or puts everything in one file, whether errors are handled or crash with a traceback, whether there are any tests, whether secrets are committed, and whether the git history shows small meaningful commits or one "final version" commit. Hiring managers looking at a portfolio check exactly these things in about two minutes. Feedback on a beginner's project fails when it lists forty issues; the learner fixes none. The useful review picks the three changes with the biggest effect for this learner's goal and explains each well.
</context>

<task>
Review the learner's project in the working directory.
{{#goal}}
Goal: {{goal}}
{{/goal}}
{{#experience}}
Experience: {{experience}}
{{/experience}}

1. Read it as a stranger would: README first, then try to work out how to install and run it from the README alone. Then read the structure, the main code paths, configuration, tests and the git log.
2. Give a first impression in three sentences: what it does, whether a stranger could run it, and the overall quality for the learner's experience.
3. Name two or three things done well, specifically, with file references.
4. Pick the three changes that would most improve the project for the learner's goal, ordered by impact. For each: what and where, why it matters (for users, maintainers or a hiring reviewer), and how to start, with a short example if useful. Committed secrets or credentials always come first if present.
5. Go area by area briefly (README and setup, structure, code readability, error handling, tests, dependencies and config, git history), one or two lines each with a rating of good, needs work or missing.
6. Suggest the one skill the next project should practise, based on the biggest gap.
</task>

<constraints>
- Review what is there; cite files. Do not rewrite the project or open with a list of every small issue.
- Calibrate to the learner's experience: name the gap without harshness, and do not hold a first project to production standards except for security issues.
- If secrets, API keys or passwords are committed, say so first, tell the learner to revoke and rotate them, note that deleting the file does not remove them from git history, and do not repeat the values.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## First impression
Three sentences.
## What works well
Two or three bullets with files.
## The three changes that matter most
Numbered, each with what, where, why and how to start.
## Area by area
A table: area, rating, note.
## Next project skill
One skill and why.
</output_format>
