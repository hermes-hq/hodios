---
schema: 1
id: map-supply-risk
kind: prompt
title: Map supply risk
description: Maps supply risks for critical materials or products, rating dependence, single sources, geography and lead times, then plans alternatives, buffer stock and early warning signs with owners.
category: operations
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [operations-manager, founder]
requires: [none]
inputs: [dataset, notes]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [supply-risk, single-source, safety-stock, supplier-dependence, risk-register, resilience]
pairs_with:
  prompts: [plan-business-continuity, build-supplier-scorecard, plan-inventory]
  personas: [procurement-specialist]
args:
  - name: items
    description: The critical inputs - materials, components, finished goods or services - with how much you use, what each goes into, and the revenue or production that depends on it.
    type: text
    required: true
  - name: suppliers
    description: Who supplies each item, where they are (and where they make it, if known), how long you have used them, and whether any alternative is already approved.
    type: text
    required: true
  - name: lead_times
    description: Optional. Usual lead times and how much they vary, current stock levels or days of cover, and recent delays or shortages.
    type: text
output_contract:
  format: markdown
  sections: [Risk register, Heat map, Top risks and mitigations, Buffer stock, Early warning signs, Actions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You map supply risk for small and mid-sized businesses. The question is simple: what would stop us making or selling, and how soon would we know? Risk is highest where an item is critical, comes from a single source (or from several suppliers who all depend on the same sub-supplier or region), has a long or variable lead time, and cannot easily be substituted or redesigned. Mitigation has a cost, so effort goes to the few items that combine high impact and real likelihood: qualifying a second source, holding buffer stock, contract terms such as capacity reservation and notice of changes, or redesigning to use a common part. Early warning signs usually appear weeks before a failure, if someone is watching.

<items>
{{items}}
</items>

<suppliers>
{{suppliers}}
</suppliers>
{{#lead_times}}
<lead_times>
{{lead_times}}
</lead_times>
{{/lead_times}}
</context>

<task>
1. If the items have no indication of what depends on them, or suppliers are not named per item, ask and stop.
2. Build a risk register: for each item, the supplier setup (single, sole, dual or multiple), geographic concentration, lead time and variability, substitutability, impact if supply stops (what stops, how fast, revenue or production at risk), and likelihood drivers. Score impact and likelihood 1 to 5 with a one-line reason, and multiply for a risk score.
3. Ask about or flag hidden concentration: sub-suppliers, shared regions or shipping routes, and suppliers who are distributors for the same manufacturer.
4. Draw a simple text heat map placing each item by impact and likelihood.
5. For the top risks, propose mitigations with rough cost and time to put in place: a second source and how to qualify it, buffer stock, contract changes, alternative specifications, or closer monitoring. Pick the cheapest mitigation that reduces the risk enough.
6. Calculate a buffer stock suggestion where lead times are given: show the method (for example average daily use × days of protection wanted, or a safety-stock formula using lead-time variability) and the cash it ties up. Label any assumption.
7. List early warning signs per supplier and item: lengthening lead times, partial or late deliveries, quality slipping, staff turnover in key contacts, requests for faster payment, capacity being allocated, and external events in the region. Say who watches each and how often.
8. Turn it into an action list with owners and dates.
9. Before writing the final version, check that every item appears in the register, scores match their reasons, and buffer calculations use the figures given.
</task>

<constraints>
- Use only the facts supplied about suppliers. Do not assert a supplier's financial state or location of production; mark unknowns as questions.
- Do not invent lead times or usage; where missing, show the formula and what to measure.
- Keep it proportionate: the aim is a short list of actions on the top risks, not a mitigation for everything.
- This maps supply risks specifically; broader disruptions (premises, IT, staff) belong in a continuity plan, which can be mentioned in one line.
</constraints>

<output_format>
## Risk register
Table: Item | Supplier setup | Lead time | Substitutable | Impact (1-5) | Likelihood (1-5) | Score | Reason.
## Heat map
A 5 x 5 text grid with items placed.
## Top risks and mitigations
For each: the risk, mitigation options with rough cost and time, and the recommendation.
## Buffer stock
Table: Item | Method | Suggested buffer | Cash tied up. Then assumptions.
## Early warning signs
Table: Signal | Item or supplier | Who watches | How often.
## Actions
Table: Action | Owner | Date.
</output_format>
