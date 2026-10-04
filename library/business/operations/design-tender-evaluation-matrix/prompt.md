---
schema: 1
id: design-tender-evaluation-matrix
kind: prompt
title: Design a tender evaluation matrix
description: Designs a tender evaluation matrix for a public or private procurement, with pass-fail gates, weighted criteria, scoring guidance, a price scoring method, moderation and conflict-of-interest steps.
category: operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, manager]
requires: [none]
inputs: [spec, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [tender-evaluation, procurement, bid-scoring, public-procurement, conflict-of-interest, moderation]
pairs_with:
  prompts: [write-rfp, compare-vendors, build-supplier-scorecard]
  personas: [procurement-specialist]
args:
  - name: purchase
    description: What is being bought - goods, services or works - with the main requirements and contract length.
    type: string
    required: true
  - name: budget
    description: The estimated contract value or budget, with currency, and whether it is a ceiling bidders may not exceed.
    type: string
    required: true
  - name: sector
    description: Public sector procurement (published criteria, legal rules, audit) or private.
    type: enum
    enum: [public, private]
    default: private
  - name: rules
    description: Optional. Procurement rules you must follow - internal policy, the law or regulation that applies, a framework agreement, funding conditions - and any criteria already decided.
    type: text
output_contract:
  format: markdown
  sections: [Evaluation approach, Pass-fail gates, Evaluation matrix, Scoring guidance, Price scoring, Evaluation process, Records, Rules to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design tender evaluations that are fair, defensible and pick the bid that best meets the need. The matrix is decided before bids are opened and, in most public procurement regimes, published to bidders with its weightings; changing criteria after seeing bids invites challenge. Good evaluations separate pass-fail requirements (eligibility, mandatory standards, insurance, financial standing) from scored quality criteria, write scoring descriptors precise enough that independent evaluators reach similar scores, choose a price formula whose quirks are understood in advance, and keep a record of every score's reason. Conflicts of interest must be declared and managed before anyone sees a bid.

Purchase: {{purchase}}
Budget: {{budget}}
Sector: {{sector}}
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}
</context>

<task>
1. If the purchase is too vague to define criteria (no idea what is being bought or what matters), ask for the requirements and stop.
2. Recommend the evaluation approach: the quality to price split (for example 60:40 for complex services, more weight on price for standard goods) with the reason, and whether whole-life cost should be evaluated instead of purchase price.
3. Define pass-fail gates: mandatory requirements, exclusion grounds and eligibility, insurance levels, financial standing tests, and required certifications. Each gate must be objectively checkable.
4. Build the matrix: four to seven quality criteria with sub-criteria where useful, each with its weight (quality weights sum to the quality share), what evidence bidders must provide, and the question bidders answer. Make criteria relevant to the contract and avoid criteria that favour one known supplier.
5. Write scoring guidance on a 0 to 5 (or the scale the rules require) with descriptors for each level, and an example of what a 3 and a 5 would look like for the most important criterion.
6. Define price scoring: the formula (for example lowest price ÷ bid price × weight), a worked example with three hypothetical bids, its known side effects, how to treat bids above budget, and how to check for abnormally low bids.
7. Set the process: evaluation panel and roles, conflict-of-interest declarations before access to bids, independent scoring, a moderation meeting led by someone who does not score, how agreed scores and reasons are recorded, clarification questions to bidders, tie-break rule, and feedback to unsuccessful bidders.
8. List the records to keep for audit.
9. List rules to check: for public sector, the procurement law or regulation and thresholds that apply, publication of criteria and weights, standstill or award notice periods, and challenge routes; for private, internal policy and approval limits. Mark each `[CHECK]`.
10. Before writing the final version, check that all weights add up correctly, every criterion has a descriptor set and an evidence requirement, and no gate is subjective.
</task>

<constraints>
- Criteria must be decided and documented before bids are opened, and you must not suggest changing them after.
- Do not state procurement law, thresholds or notice periods as fact; name what to check and with whom (procurement lead, legal team).
- Do not design criteria to favour or exclude a particular supplier; if asked, decline and explain the risk.
- Keep the matrix proportionate to {{budget}}: a small purchase does not need ten sub-criteria.
</constraints>

<output_format>
## Evaluation approach
## Pass-fail gates
Table: Gate | Requirement | Evidence | How checked.
## Evaluation matrix
Table: Criterion | Sub-criteria | Weight | Evidence required | Question to bidders.
## Scoring guidance
Table: Score | Descriptor. Then the worked examples.
## Price scoring
Formula, worked example table, side effects and rules.
## Evaluation process
Numbered steps.
## Records
## Rules to check
Bullets with `[CHECK: …]`.
</output_format>
