---
schema: 1
id: map-current-alternatives
kind: prompt
title: Map current alternatives to a problem
description: Maps how target users solve the problem today - competitors, spreadsheets, agencies, workarounds or nothing - with cost, switching barriers and the gap each leaves.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, founder, marketer, ux-researcher]
requires: [none]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [current-alternatives, competitive-alternatives, switching-costs, non-consumption, workarounds]
pairs_with:
  prompts: [interview-non-customers, analyze-competitor-reviews, write-opportunity-assessment, define-jobs-to-be-done]
args:
  - name: problem
    description: The problem or job you are exploring, solution-free.
    type: text
    required: true
  - name: target_users
    description: Who has the problem (segment, context, size of organisation or household).
    type: text
    required: true
  - name: evidence
    description: What you know about how they handle it today - interview notes, reviews, sales notes, desk research. Leave empty if you have only guesses.
    type: text
output_contract:
  format: markdown
  sections: [Alternatives map, Doing nothing, Switching barriers, Gaps worth exploring, What we do not know]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who maps the real competition for a customer problem. Teams list the obvious software competitors and miss what most people actually use: spreadsheets, email and shared folders, a general tool bent to fit, paper, a person (an assistant, an agency, a freelancer, a family member), a bundled feature in software they already own, or simply doing nothing and absorbing the cost. These alternatives are hard to displace because they are already paid for, familiar and good enough. The useful questions are what each alternative costs in money and time, why people chose it, what it does well, where it fails, and what makes switching hard (data migration, retraining, contracts, approvals, habit, integration with other tools). The gaps between "what they use" and "what they need" are where opportunities sit.

Target users: {{target_users}}
</context>

<task>
Problem:

<problem>
{{problem}}
</problem>

{{#evidence}}Evidence:

<evidence>
{{evidence}}
</evidence>{{/evidence}}

1. List the alternatives in use, grouped by type: dedicated products, general tools bent to fit (spreadsheets, email, chat, notes), people and services, bundled features in tools they already have, manual or paper methods, and doing nothing. Name specific products only if they appear in the evidence or are widely known category leaders, and mark which.
2. For each alternative, describe: who in the target group tends to use it, what it costs (money, time, attention), what it does well that a new product must match, where it fails for this problem, and the evidence behind each claim (or "assumption").
3. Describe the "doing nothing" option separately: what the problem costs people who absorb it and why they tolerate it. If doing nothing is common, say what would need to change for them to act.
4. List switching barriers for each main alternative: data, learning, contracts and renewals, approvals and procurement, integrations, social or habit, and risk of change.
5. Identify the gaps worth exploring: unmet needs common across alternatives, segments badly served by all of them, and moments when people are most likely to switch (a trigger event such as growth, a new regulation, a staff change, a failure).
6. List what is not known and how to find out (interview questions, review mining, a short survey on current tools and spend).
</task>

<constraints>
- Do not invent competitor features, prices, market shares or user counts. Where you mention a known product, describe it in general terms and advise checking current details.
- Every claim about how users behave carries its evidence or the label "assumption".
- Do not conclude that there is no competition; there is always an alternative, even if it is doing nothing.
- If the problem is framed as a solution, restate it as the underlying problem first.
- If there is no evidence at all, produce the map as a hypothesis grid with the questions that would fill it, not as findings.
</constraints>

<output_format>
## Alternatives map
Table: alternative | type | who uses it | cost | what it does well | where it fails | evidence or assumption.

## Doing nothing
Short paragraph.

## Switching barriers
Table: alternative | main barriers | how strong (high, medium, low).

## Gaps worth exploring
Numbered list with the trigger moments.

## What we do not know
Bullets with how to find out.
</output_format>
