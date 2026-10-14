---
schema: 1
id: find-ai-use-cases-in-business
kind: prompt
title: Find AI use cases across the business
description: Maps a business's processes to practical AI use cases, scores each on value, feasibility and risk, and picks the first pilots with success measures.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, executive, operations-manager, consultant]
requires: [none]
inputs: [text, notes]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ai-adoption, use-case-portfolio, process-mapping, pilot-selection, generative-ai]
pairs_with:
  prompts: [automate-business-workflow, plan-digital-transformation-roadmap, write-ai-use-policy, map-ai-use-cases]
args:
  - name: business
    description: What the business does, size, teams, the main processes (sales, service, operations, finance, HR), where time goes, the data and systems you have, and pain points.
    type: text
    required: true
  - name: constraints
    description: Budget, in-house technical skills, regulated data (health, finance, children's data), customer expectations, and any AI tools already in use. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Process map, Use cases, Scoring, First pilots, Risks and safeguards, What not to do yet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business find where AI is actually worth using. Two failure modes dominate: starting from the technology ("we need a chatbot") instead of from processes with real cost or delay, and launching ambitious projects that need clean data and integration the business does not have. Good first use cases are frequent, text- or document-heavy, tolerant of a human checking the output, and measurable: drafting replies, summarising calls or documents, extracting data from invoices or forms, first-pass classification, internal knowledge search, and sales or marketing drafts. Uses where an error harms a customer, involves personal or regulated data, or makes decisions about people need stronger safeguards or should wait. Most value early comes from off-the-shelf tools used well, not custom builds.
</context>

<task>
Find AI use cases for:

<business>
{{business}}
</business>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Process map: list the main processes by team, with volume, time spent and pain points from the material. Mark estimates.
2. Use cases: for each process, describe concrete AI use cases (what the AI does, what the human still does, inputs and outputs), and the type of tool needed (general assistant, feature in existing software, automation tool, custom build), without naming specific vendors as recommendations.
3. Scoring: score each use case 1 to 5 on value (time or money saved, revenue, quality), feasibility (data available, integration, skills), and risk (errors, privacy, regulation, customer trust, effect on jobs), and show the overall ranking.
4. First pilots: pick 2 or 3 to start, each with scope, owner, duration (4 to 8 weeks), baseline and success measure, the human review step, and the decision at the end (scale, change, stop).
5. Risks and safeguards: data protection and confidentiality, accuracy checks, disclosure to customers where expected, staff involvement and training, and the need for an AI use policy.
6. What not to do yet: use cases that are attractive but premature, and why.
</task>

<constraints>
- Do not invent time savings or costs; estimate from given volumes and mark as estimates with working.
- Do not recommend sending personal, confidential or regulated data to tools without checking terms, data protection law and, where relevant, sector rules.
- Avoid use cases where AI makes final decisions about hiring, credit, health or legal rights without human review; flag regulation that may apply.
- No vendor endorsements or invented product features.
{{> output/uncertainty}}
</constraints>

<output_format>
## Process map
Table: Team | Process | Volume | Time | Pain point.

## Use cases
Table: Process | Use case | AI does | Human does | Tool type.

## Scoring
Table: Use case | Value | Feasibility | Risk | Rank.

## First pilots
One block per pilot: scope, owner, duration, baseline, measure, review step, end decision.

## Risks and safeguards
Bullets.

## What not to do yet
Bullets with reasons.
</output_format>
