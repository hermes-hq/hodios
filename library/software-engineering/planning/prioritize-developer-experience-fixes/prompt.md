---
schema: 1
id: prioritize-developer-experience-fixes
kind: prompt
title: Prioritise developer experience fixes
description: Turns developer complaints, survey answers and build data into a ranked list of developer experience fixes (builds, tests, environments, reviews, tooling) by time saved and cost.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [engineering-manager, devops-engineer, tech-lead]
stack: []
requires: [none]
inputs: [notes, dataset, text]
output: [table, report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [developer-experience, developer-productivity, build-times, flaky-tests, platform-engineering, developer-survey]
pairs_with:
  prompts: [assess-technical-debt, write-tech-debt-proposal, measure-dora-metrics]
args:
  - name: input
    description: Developer complaints, survey results, retro notes, and any data such as CI duration, flaky test rates, time to first commit for new hires, PR review wait times.
    type: text
    required: true
  - name: team_size
    description: Number of engineers affected, and how much effort is available for fixes.
    type: string
output_contract:
  format: markdown
  sections: [Themes, Ranked fixes, Quick wins, Needs measurement, Proposal summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developer experience work competes with features for time, so it needs a case in hours and in delivery risk, not in frustration. The biggest costs are usually frequent small delays multiplied by many people (a CI pipeline that takes 25 minutes, run ten times a day by forty engineers), interruptions that break focus (flaky tests, broken local environments, slow reviews), and long onboarding. The loudest complaint is not always the costliest one; the useful method is to group complaints into themes, estimate frequency times delay times people for each, check the estimate against any data, and pick fixes with the best ratio of time saved to effort, starting with a measurement where the data is missing.
</context>

<task>
Input: {{input}}
{{#team_size}}Team size and fix capacity: {{team_size}}{{/team_size}}

1. Group the input into themes (for example build and CI speed, flaky tests, local environment setup, code review wait, deployment friction, documentation and discoverability, onboarding, tooling access). Count how often each appears and quote short representative comments.
2. For each theme, estimate the time cost: how often it happens, how long each occurrence costs (including lost focus, not just wait time), how many engineers are affected. Show the arithmetic as hours per month and mark each factor as measured or assumed.
3. Propose one or two concrete fixes per theme (for example cache dependencies in CI, quarantine and fix the top flaky tests, a dev container, a review rotation with a turnaround target), each with rough effort (S, M, L), expected time saved, and confidence.
4. Rank fixes by time saved per unit of effort, adjusted for confidence and for risk reduction (for example fewer broken deploys).
5. Pick quick wins doable within two weeks.
6. List what needs measuring first, with the simplest way to measure it.
7. Write a short proposal summary for leadership: the top three fixes, cost, expected hours returned, and how success will be measured.
</task>

<constraints>
- Label every estimate; do not present assumed numbers as measured.
- Do not invent tools or vendor products as the fix; describe the approach and mention options only as examples.
- Keep individual comments anonymous; do not name who said what.
{{> output/uncertainty}}
</constraints>

<output_format>
## Themes
Table: Theme | Mentions | Representative comment.
## Ranked fixes
Table: Rank | Fix | Theme | Effort | Hours saved per month (arithmetic) | Confidence.
## Quick wins
## Needs measurement
## Proposal summary
One short paragraph and three bullets.
</output_format>
