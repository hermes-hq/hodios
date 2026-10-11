---
schema: 1
id: choose-roadmap-tool
kind: prompt
title: Choose a roadmap tool
description: Compares roadmap tools against the team's size, planning process, audiences and integrations, recommends one with a trial plan, and says when a spreadsheet or the tracker already in use is enough.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, executive, engineering-manager, operations-manager]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tool-selection, product-tools, software-evaluation, integrations, trial-plan]
pairs_with:
  prompts: [set-up-roadmap-cadence, design-roadmap-visual, consolidate-team-roadmaps]
args:
  - name: needs
    description: Team size and number of teams, how you plan today, who reads the roadmap (execs, sales, customers), the tracker you use for delivery, and what is painful now.
    type: text
    required: true
  - name: candidates
    description: Optional. Tools you are considering, if any, for example Jira Product Discovery, Productboard, Aha!, Linear, Notion or a spreadsheet.
    type: text
  - name: constraints
    description: Optional. Budget, security or procurement requirements, single sign-on, data residency, and who will administer it.
    type: text
output_contract:
  format: markdown
  sections: [Requirements, Do you need a new tool, Comparison, Recommendation, Trial plan, What to verify with vendors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team pick a roadmap tool. Teams often buy a tool hoping it will fix a process problem: unclear priorities, stale roadmaps or too many audiences. A tool helps when the process already exists and the pain is mechanical (keeping several views in sync, linking feedback to items, rolling team plans into a portfolio). Small teams are often best served by the delivery tracker they already use plus a simple view, while larger organisations with many teams and audiences benefit from a dedicated tool. The deciding factors are usually the integration with the delivery tracker (two-way sync or a manual copy), how views for different audiences are produced, how feedback and ideas are captured, who must have paid seats, and how much administration it needs. Products and pricing change often, so any comparison from memory must be checked against current vendor information.
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}
</context>

<task>
Needs:

<needs>
{{needs}}
</needs>

{{#candidates}}
Candidates: {{candidates}}
{{/candidates}}

1. Turn the needs into ranked requirements: must-have, important, nice to have. Include the delivery tracker integration, audience views, feedback capture, portfolio roll-up, permissions, and administration effort.
2. Say honestly whether a new tool is needed, or whether the current tracker, a spreadsheet or a docs page would do, and what process fixes should come first.
3. Compare the candidate tools (or, if none were given, the main categories of option: tracker-native roadmaps, dedicated product management tools, general workspace tools, spreadsheets) against the requirements. Describe capabilities in general terms and mark anything that must be verified.
4. Recommend one option with the reasons and the main trade-off.
5. Write a two- to four-week trial plan: who takes part, a real planning task to run in the tool, success criteria, and the decision meeting.
6. List questions to ask vendors: pricing model and which roles need paid seats, integration depth, data export, security and compliance, and contract terms.
</task>

<constraints>
- Do not state prices, plan limits or specific features as current fact from memory; tell the user to confirm them with each vendor, and label any general description as such.
- Do not recommend a tool because it is popular; tie the choice to the ranked requirements.
- Say when the real problem is process, not tooling.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Table: requirement | priority | why.

## Do you need a new tool
Short paragraph.

## Comparison
Table: option | fit with must-haves | strengths | concerns | to verify.

## Recommendation
Short paragraph.

## Trial plan
Numbered steps.

## What to verify with vendors
Bullets.
</output_format>
