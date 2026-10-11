---
schema: 1
id: write-sole-source-justification
kind: prompt
title: Write a sole-source justification
description: Writes a single- or sole-source purchase justification showing why only this supplier fits, what market checks were done and why the price is reasonable, for procurement approval.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, project-manager, researcher]
requires: [none]
inputs: [notes, text, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [procurement, sole-source, single-source, waiver, price-reasonableness]
pairs_with:
  prompts: [write-rfp, compare-vendors]
  personas: [procurement-specialist]
args:
  - name: purchase
    description: What you want to buy, from whom, the value and contract length, and why you need it.
    type: text
    required: true
  - name: reasons_and_checks
    description: Why only this supplier will do (compatibility, unique rights, urgency, continuity) and what you did to check the market, such as suppliers contacted, searches, quotes and past prices.
    type: text
    required: true
  - name: policy_rules
    description: Your organisation's sole-source criteria, thresholds or form headings, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Justification, Weak points, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Procurement and audit teams treat sole-source requests with suspicion because they skip competition, the main protection against overpaying and favouritism. Requests that get approved show four things: a specific, objective reason only one supplier can meet the need (proprietary compatibility, exclusive rights, a genuine emergency, continuity of a running service), real evidence that the market was checked, a reason to believe the price is fair (past prices, comparable items, a discount secured), and a plan to compete next time. Requests that get rejected rely on preference ("we like them", "they know us"), describe the need so narrowly it fits one product by design, or present urgency caused by poor planning. Public bodies usually have stricter legal rules on direct awards than private companies, and thresholds vary by organisation and country.
</context>

<task>
Write a sole-source or single-source justification.

<purchase>
{{purchase}}
</purchase>

<reasons_and_checks>
{{reasons_and_checks}}
</reasons_and_checks>
{{#policy_rules}}
<policy_rules>
{{policy_rules}}
</policy_rules>
{{/policy_rules}}

1. If the purchase or the reason is missing, ask in one short message and stop.
2. Classify the request: sole source (only one supplier exists) or single source (others exist but one is chosen for a stated reason). Use the term that fits; if the input claims sole source but mentions alternatives, say so and treat it as single source.
3. If policy rules are given, use their headings and map each reason to the criterion it meets. Otherwise structure the justification as below.
4. Describe the need in functional terms, not in terms of the product, and then explain why only this supplier meets it, tying each reason to evidence.
5. Market research: what was done, when, and the result. If nothing was done, say it plainly and mark `[NEEDED: market check]`; do not dress it up.
6. Price reasonableness: compare with past prices, list prices, comparable quotes or a negotiated discount from the input. If there is no basis, say so.
7. Urgency: if urgency is a reason, state the date, the consequence of delay, and whether the urgency was foreseeable.
8. Future competition: what will be done to avoid sole-sourcing next time (for example, plan a tender before renewal, avoid lock-in in the new contract).
9. Conflict of interest: add a declaration line for the requester to complete.
</task>

<constraints>
- Use only facts given. Never invent supplier names, quotes, prices, dates or policy thresholds.
- Do not overstate: if the reason is preference or convenience, say in Weak points that it is unlikely to meet most sole-source criteria rather than reframing it as a technical necessity.
- Do not state public procurement law for any country; if the buyer looks like a public body, note that direct-award rules need checking with procurement or legal.
- Plain, factual tone; about 400 to 800 words.
</constraints>

<output_format>
## Justification
Headed sections: Summary (item, supplier, value, term, type), Need, Why only this supplier, Market research, Price reasonableness, Urgency (if relevant), Future competition, Declaration.
## Weak points
What an approver or auditor would challenge, and how to strengthen it. "None" if none.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
