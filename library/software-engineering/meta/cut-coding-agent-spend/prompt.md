---
schema: 1
id: cut-coding-agent-spend
kind: prompt
title: Cut coding agent spend
description: Finds where a person's or team's coding agent spend goes and cuts it through model choice per task, leaner context, fewer retries and trimmed tools, measured per merged change.
category: meta
version: 1.0.0
status: incubating
stage: [operate]
role: [engineering-manager, tech-lead, software-engineer]
requires: [none]
inputs: [dataset, text]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, cost-optimization, token-usage, context-engineering]
pairs_with:
  prompts: [prune-agent-instructions, choose-mcp-servers-for-project, choose-model-tier-for-task, benchmark-coding-agents-on-repo]
args:
  - name: usage
    description: What you know about spend and usage, such as invoices, per-session token or cost exports, models used, typical session length, and how people use the agents.
    type: text
    required: true
  - name: constraints
    description: Budget target, models or plans you are locked into, and anything that must not get worse.
    type: text
output_contract:
  format: markdown
  sections: [Where it goes, Changes, Measurement, Not recommended, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding agent cost is mostly input tokens, re-sent on every turn. That makes long sessions disproportionately expensive, because each turn carries the whole history. The usual drivers: sessions that run for hours without a reset, large instruction files and many connected tool definitions loaded on every call, reading whole large files and full logs instead of searching, retry loops on a failing test, parallel attempts nobody compares, frontier models used for renames and lint fixes, and prompt changes early in the context that defeat caching. Cost per token is the wrong measure: a cheaper model that needs three attempts and more review can cost more per merged change. The right measure is cost per accepted change, with review time and rework counted.
</context>

<task>
Analyse this usage and propose cuts:
<usage>
{{usage}}
</usage>
{{#constraints}}
Constraints:
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

1. Break spend down by what the data supports: person or team, model, session length, task type, input versus output versus cached tokens. Say which breakdowns the data cannot support.
2. Identify the top drivers from the list in the context and any others the data shows, with the evidence for each.
3. Propose changes ranked by expected saving relative to quality risk. Candidates: model by task type (small for mechanical edits, frontier for design and debugging), session hygiene (reset or hand off at task boundaries), trimming always-loaded context (instruction files, unused tool servers), search-then-read habits, retry caps, fewer parallel attempts unless compared, and stable prompt prefixes for caching.
4. For each change give the saving as a range with the assumption behind it, the quality risk, and the check that shows quality held (merge rate, review rounds, reverts).
5. Propose how to measure cost per merged change before and after, for two to four weeks.
</task>

<constraints>
- Do not invent prices, discounts or plan features. Use the figures in the data or ask for them.
- Do not recommend cuts that remove verification (skipping tests, smaller reviews) to save tokens.
- Report savings as ranges with assumptions, not single precise numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where it goes
Table of the breakdowns the data supports, with shares.
## Changes
Table: change, saving range, assumption, quality risk, check. Highest value first.
## Measurement
Metric definitions, baseline period, review date.
## Not recommended
Cuts you considered and rejected, with why.
## Data gaps
What to export or log next time.
</output_format>
