---
schema: 1
id: define-launch-tiers
kind: prompt
title: Define launch tiers
description: Defines launch tiers for a company, from major launches to silent releases, with criteria, the activities and owners for each tier, edge-case rules and a checklist for tiering new features.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, marketer, founder, executive]
inputs: [notes, text]
output: [table, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [launch-tiers, launch-process, release-management, product-marketing, sales-enablement]
pairs_with:
  prompts: [plan-product-launch, plan-launch-retrospective, write-launch-announcement]
  personas: [product-marketing-manager]
args:
  - name: company_context
    description: What the company sells and to whom, how often it ships, how launches work today and what goes wrong (for example "every feature gets a blog post and nobody reads them", "sales hears about changes from customers").
    type: text
    required: true
  - name: teams
    description: The teams that take part in launches and their capacity (for example "product marketing of one, two sales teams, support, customer success, docs writer, no PR agency").
    type: text
    required: true
  - name: tiers
    description: How many tiers to define, from the biggest launch to a silent release; three or four suit most companies.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [How the tiers work, Tier definitions, Activities by tier, Tiering checklist, Edge-case rules, Governance, Rolling it out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketing lead who sets up launch processes. Launch tiers exist so a company spends its launch effort where it matters: a handful of big moments a year get full go-to-market support, meaningful improvements get a proportionate push, and small changes ship quietly with release notes. Without tiers, either everything gets the same treatment (and teams burn out while customers tune out), or nothing gets a plan (and sales and support are surprised). Tiers must be decided by clear criteria, mostly about customer and business impact, not by how proud the team is or how long the work took.
</context>

<task>
Define {{tiers}} launch tiers for this company.

<company_context>
{{company_context}}
</company_context>

<teams>
{{teams}}
</teams>

1. If the context does not say what the company sells or how often it ships, ask and stop.
2. How the tiers work: three or four sentences explaining the purpose to the whole company.
3. Tier definitions: for each of the {{tiers}} tiers, from biggest to smallest, a name, the criteria (customer impact, revenue or strategic importance, number of customers affected, whether it changes pricing, permissions, data handling or workflows, competitive significance), two examples drawn from this company's kind of product, and the lead time needed. Make the smallest tier a silent or release-notes-only release.
4. Activities by tier: a matrix of launch activities (internal enablement for sales and support, help docs, release notes, in-app messaging, email to customers, blog post, press or analyst outreach, social, event or webinar, customer advisory preview, pricing and packaging updates, success metrics review) against tiers, with the owner from the given teams. Size the top tier so the team can run it no more than a few times a year with the capacity described.
5. Tiering checklist: five to eight yes or no questions a PM answers when proposing a tier, with a simple rule for mapping answers to a tier.
6. Edge-case rules: changes that always need at least a middle tier regardless of size (for example price or plan changes, removing or changing existing behaviour, security and privacy changes, anything that needs customers to act); bundling several small features into one bigger moment; and launches that slip.
7. Governance: who proposes, who decides, when tiering happens (at the planning stage, not the week before), how to dispute a tier, and a quarterly review of tier decisions against results.
8. Rolling it out: the first steps to introduce the system and how to handle launches already in flight.
9. Before replying, check that every activity in the matrix has an owner from the given teams and that the top tier fits their capacity.
</task>

<constraints>
- Use only the teams given as owners; where an activity has no natural owner, say so instead of inventing a team.
- Keep the system light enough for the company's size; a small company needs fewer activities per tier.
- Do not invent launch metrics or targets; refer to the team setting them per launch.
</constraints>

<output_format>
## How the tiers work
## Tier definitions
A table: Tier | Criteria | Examples | Lead time.
## Activities by tier
A matrix: Activity | Owner | one column per tier, marked yes / optional / no.
## Tiering checklist
## Edge-case rules
## Governance
## Rolling it out
</output_format>
