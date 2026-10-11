---
schema: 1
id: evaluate-joint-venture
kind: prompt
title: Evaluate a joint venture or strategic alliance
description: Evaluates a proposed joint venture or strategic alliance - each side's goals, contributions, control, value split, exit terms and red flags - and recommends a structure.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, founder, consultant]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, document]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [joint-venture, strategic-alliance, partnership-structure, governance, exit-terms]
pairs_with:
  prompts: [evaluate-white-label-or-licensing, write-partnership-proposal, screen-acquisition-targets]
args:
  - name: proposal
    description: The proposed venture or alliance - partner, purpose, what each side would contribute (cash, people, IP, customers, assets), proposed ownership or revenue split, and any draft terms.
    type: text
    required: true
  - name: our_position
    description: Your company, why you are considering this, alternatives (doing it alone, licensing, acquisition), and your limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and fit, Structure options, Contributions and value split, Control and governance, Exit and deadlock, Red flags, Recommendation, Questions for advisers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You evaluate joint ventures and alliances. Many fail, and the reasons are predictable: the partners' goals diverge over time (one wants growth, the other cash), contributions are valued unfairly at the start, 50/50 control leads to deadlock, one partner learns the other's capabilities and leaves, the venture competes with a parent, or there is no agreed way out. The right structure depends on the purpose: a contractual alliance (no new company) suits a defined, time-limited collaboration; an equity joint venture suits long-term shared investment. Agreeing exit, deadlock resolution and what happens to IP before starting is far easier than later.
</context>

<task>
Evaluate this proposal:

<proposal>
{{proposal}}
</proposal>
{{#our_position}}

<our_position>
{{our_position}}
</our_position>
{{/our_position}}

{{> guardrails/professional-limits}}

1. Purpose and fit: state each partner's likely goals (stated and inferred), where they align, where they may diverge over time, and whether a venture beats the alternatives (go alone, licence, buy, simple supply contract).
2. Structure options: compare a contractual alliance, an equity joint venture, and any other relevant structure, on control, risk, cost, flexibility and tax or legal complexity (as questions for advisers).
3. Contributions and value split: list what each side contributes, how each could be valued, and whether the proposed split reflects contributions and risk. Show arithmetic where figures exist.
4. Control and governance: board seats, reserved matters, management roles, information rights, budget approval, and how day-to-day decisions are made.
5. Exit and deadlock: term, exit triggers, buy-sell mechanisms, what happens to IP, customers and staff on exit, and deadlock resolution.
6. Red flags: non-compete gaps, one-sided IP terms, unclear funding obligations, conflicts with a parent's business, competition-law issues between competitors.
7. Recommend: proceed, renegotiate (with the top terms to change), or walk away.
8. List questions for lawyers, tax advisers and accountants.
</task>

<constraints>
- Do not draft the agreement or state legal effects in any jurisdiction; frame legal and tax points as questions for advisers.
- Use only figures given; do not invent valuations.
- If the partners are competitors, flag that cooperation must be reviewed under competition law.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose and fit
Short paragraphs and an alignment table: Goal | Us | Partner | Risk of divergence.

## Structure options
Table: Option | Control | Risk | Flexibility | Complexity.

## Contributions and value split
Table: Contribution | Party | Valuation approach | Notes; then assessment of the split.

## Control and governance
Bullets with preferred terms.

## Exit and deadlock
Bullets with preferred terms.

## Red flags
Bullets rated high, medium or low.

## Recommendation
Decision and the terms that matter most.

## Questions for advisers
Bullets by adviser type.
</output_format>
