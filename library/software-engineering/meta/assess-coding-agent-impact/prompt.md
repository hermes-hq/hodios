---
schema: 1
id: assess-coding-agent-impact
kind: prompt
title: Assess coding agent impact on a team
description: Reads a team's data on agent-assisted work, such as cycle time, review load, reverts, incidents and survey answers, and judges what coding agents actually changed, with confounders named.
category: meta
version: 1.0.0
status: incubating
stage: [review, operate]
role: [engineering-manager, tech-lead]
requires: [none]
inputs: [dataset, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, engineering-metrics, dora-metrics]
pairs_with:
  prompts: [plan-coding-agent-rollout, cut-coding-agent-spend, benchmark-coding-agents-on-repo]
args:
  - name: data
    description: The metrics you have, before and after adoption if possible, such as pull request counts and sizes, cycle time, review time, revert and rework rates, incidents, spend and survey results.
    type: text
    required: true
  - name: question
    description: The decision this should inform, for example renew licences, expand to more teams, change review rules.
    type: text
output_contract:
  format: markdown
  sections: [Answer, What the data shows, Confounders, What it cannot show, Next measurements]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agent impact is easy to misread. Pull request counts rise when changes get smaller, without any more getting done. Lines of code mean nothing. Self-reported speed-ups are unreliable: research has found developers can feel faster while measured task time does not improve, so surveys show sentiment, not throughput. Work can also shift rather than shrink, from writing to reviewing, which shows up as longer review queues and senior engineers with less time. The measures that hold up are end-to-end cycle time for comparable work, review time per change, change failure and revert rates, rework on recently merged code, and incidents linked to changes, compared against a baseline period and ideally a team that did not adopt. Seasonality, team changes, novelty and selection (who chose to adopt first) all confound.
</context>

<task>
Assess impact from this data:
<data>
{{data}}
</data>
{{#question}}Decision to inform: {{question}}{{/question}}

1. List the metrics available, their periods and sample sizes, and which are outcome measures (delivery, quality) versus activity measures (pull requests opened, lines changed, tokens).
2. For each outcome measure, describe the change from baseline and whether it is large relative to normal variation, if the data shows variation.
3. Check for shifted work: review time, review queue length, time seniors spend reviewing, rework and reverts on agent-assisted changes versus others.
4. List the confounders that apply and how much each could explain.
5. Answer the question with a confidence level (low, medium, high) and the main reason.
6. Propose the next measurements that would raise confidence, such as tagging agent-assisted pull requests, a comparison team or period, and a rework metric.
</task>

<constraints>
- Do not cite specific study figures or industry benchmarks unless they are in the data; describe research findings only in general terms.
- Do not treat activity measures as productivity.
- Do not compute statistics the data does not support; say when the sample is too small.
{{> output/uncertainty}}
</constraints>

<output_format>
## Answer
Two or three sentences with the confidence level.
## What the data shows
Table: metric, type (outcome or activity), before, after, read.
## Confounders
Bullets with likely size of effect.
## What it cannot show
Bullets.
## Next measurements
Numbered, cheapest first.
</output_format>
