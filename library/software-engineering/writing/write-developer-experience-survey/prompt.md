---
schema: 1
id: write-developer-experience-survey
kind: prompt
title: Write a developer experience survey
description: Writes an internal developer experience survey with neutral questions on builds, reviews, tooling, docs, on-call and focus time, plus the analysis plan and how results will be reported back.
category: writing
version: 1.0.0
status: incubating
stage: [discover]
role: [engineering-manager, devops-engineer, tech-lead]
requires: [none]
inputs: [notes]
output: [questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [developer-experience, devex, survey-design, platform-engineering, engineering-productivity]
pairs_with:
  prompts: [design-engagement-survey, analyze-employee-survey, write-survey-questionnaire]
args:
  - name: goal
    description: What you want to learn and what decisions it will feed (platform roadmap, tooling budget, process changes).
    type: text
    required: true
  - name: org
    description: Number of engineers, teams, stacks, remote or office, previous surveys and their questions if you want comparable trends.
    type: text
output_contract:
  format: markdown
  sections: [Decisions this informs, Intro text, Questions, Analysis plan, Report-back plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developer experience surveys go wrong in familiar ways: thirty questions that people abandon halfway, leading wording ("how much does slow CI hurt you?"), satisfaction scores with no link to a decision, demographic questions that make small teams identifiable, and results that never come back to the people who answered, which kills the next survey's response rate. Good surveys stay under about ten minutes, ask about frequency and time lost on concrete activities (waiting for builds, finding docs, getting reviews), pair a few rating questions with one or two open "biggest obstacle" questions, keep wording stable across rounds for trends, and promise and deliver a report back with actions.
</context>

<task>
Write the developer experience survey.

<goal>
{{goal}}
</goal>
{{#org}}
<org>
{{org}}
</org>
{{/org}}

1. List the decisions the survey should inform and map each question to one of them; drop questions that inform nothing.
2. Cover the areas that fit the goal: local setup and builds, CI and deploys, code review, testing, documentation and finding information, internal tools and platforms, on-call and interruptions, focus time, and onboarding.
3. Write 12 to 20 questions: mostly frequency or time-lost scales with concrete anchors, a few agreement items worded neutrally, and two open questions. Give the answer options for each.
4. Add minimal grouping questions (team or area, tenure band) with a minimum group size for reporting so small teams are not identifiable{{#org}}; keep wording comparable with previous surveys if given{{/org}}.
5. Write the intro text: purpose, time to complete, anonymity in honest terms, when results come back.
6. Write the analysis plan: which breakdowns, how to read open answers, minimum response rate to trust results.
7. Write the report-back promise and timeline.
</task>

<constraints>
- No leading or double-barrelled questions; each question asks one thing.
- Do not promise full anonymity if the tool or group sizes cannot guarantee it; say "confidential" and explain.
- Keep completion time under about ten minutes and say the estimate.
- No questions about individual colleagues' performance.
</constraints>

<output_format>
## Decisions this informs
## Intro text
## Questions
Numbered, with answer options and the decision each maps to.

## Analysis plan
## Report-back plan
</output_format>
