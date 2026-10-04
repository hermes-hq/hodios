---
schema: 1
id: vet-paid-ads-agency
kind: prompt
title: Vet a paid ads agency
description: Helps a small business choose a paid ads agency or freelancer with interview questions, account-ownership terms, fee models, red flags and a scoring sheet for comparing proposals.
category: advertising
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, executive, manager]
requires: [none]
inputs: [text, document]
output: [questions, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [agency-selection, account-ownership, fee-models, proposal-scoring, red-flags, freelancer-hiring]
pairs_with:
  prompts: [question-agency-ad-report, plan-ad-conversion-tracking, plan-media-budget]
  personas: [local-ads-advisor, paid-media-specialist]
args:
  - name: needs
    description: Your business, the goal for ads (leads, jobs, online sales), platforms you expect, current ad accounts and who owns them, what you tried before, and how involved you want to be.
    type: text
    required: true
  - name: proposals
    description: Proposals, quotes or notes from calls with the agencies or freelancers you are considering. Optional; without them you get the questions and scoring sheet to use.
    type: text
  - name: monthly_budget
    description: Ad spend you can commit per month and what you could pay for management, for example "1,500 EUR spend, up to 500 EUR fee".
    type: string
output_contract:
  format: markdown
  sections: [What to look for, Interview questions, Terms to insist on, Red flags, Scoring sheet, Proposal review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a small business owner about to hire someone to run their ads. They cannot judge technical skill directly, so they need questions that reveal it and terms that protect them. The common traps: the agency builds ad accounts in its own name so the business loses its history when it leaves; guaranteed results or rankings; long minimum terms before any results; fees that rise with spend and reward spending more rather than spending well; reports that never connect to sales; and a senior person who sells the deal and a junior who runs the account. At small budgets the management fee can exceed what a good account would save, which is worth saying.
</context>

<task>
<needs>
{{needs}}
</needs>

{{#monthly_budget}}Budget: {{monthly_budget}}{{/monthly_budget}}

{{#proposals}}
<proposals>
{{proposals}}
</proposals>
{{/proposals}}

1. If the goal or the platforms are unclear, ask in one message and stop.
2. What to look for: three to five traits that matter for this business (relevant experience with similar businesses and budgets, a clear view on tracking, honest about what the budget can do), and whether a freelancer, a small specialist or a larger agency suits the budget.
3. Fee models: percentage of spend, flat monthly fee, setup fee, performance fee, hourly; what each rewards and which suits this budget. If the fee would be more than about a third of ad spend, say so and suggest options (lower-touch support, training, a one-off audit and setup).
4. Interview questions: ten to fourteen, each with what a good answer sounds like and what a weak one sounds like. Cover: past results for similar clients with proof, how they measure success for this goal, tracking setup, who runs the account day to day, how often they change things, how they report, how they test, what they need from the owner, and how they would spend the first 30 days. If the business is in a regulated or restricted ad field (health, finance, legal, housing, alcohol), add questions on how they handle its platform and advertising rules.
5. Terms to insist on: the business owns every ad, analytics and tag account and gives the agency user access; spend is paid directly by the business to the platform; a short initial term or notice period; clear deliverables; written reporting contents; handover of all assets on exit.
6. Red flags with the reason each matters.
7. Scoring sheet with weighted criteria. If proposals are supplied, score each, quote the evidence, list missing information, and give a recommendation and the questions to resolve before signing.
</task>

<constraints>
- Do not invent agency names, fees or results; judge only what is in the proposals.
- Do not give legal advice on contracts; suggest having a contract reviewed when terms are long or unusual.
- Be fair to agencies: flag missing information as a question, not a failing, unless it is a red flag listed above.
</constraints>

<output_format>
## What to look for
Bullets, including the recommended type of provider and fee model.

## Interview questions
A table: # | Question | Good answer sounds like | Weak answer sounds like.

## Terms to insist on
A checklist.

## Red flags
Bullets with reasons.

## Scoring sheet
A table: Criterion | Weight | Score 1-5 per provider | Evidence. Empty columns if no proposals.

## Proposal review
Recommendation and open questions, or "No proposals supplied" with how to use the sheet.
</output_format>
