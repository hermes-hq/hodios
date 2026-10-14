---
schema: 1
id: compare-critical-illness-policies
kind: prompt
title: Compare critical illness policies
description: Compares critical illness quotes on the conditions covered, how each is defined, partial payments, children's cover and exclusions, and checks the lump sum fits what it must pay for.
category: insurance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, parent, founder]
requires: [none]
inputs: [document, text]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [critical-illness, condition-definitions, severity-based-cover, lump-sum-cover, protection-insurance]
pairs_with:
  prompts: [compare-income-protection-policies, compare-life-insurance-quotes, prepare-insurance-disclosure]
args:
  - name: quotes
    description: The quotes or key features documents - sum assured, term, premium, guaranteed or reviewable, number of conditions, partial payment conditions, children's cover, and the definitions if you have them.
    type: text
    required: true
  - name: purpose
    description: What a payout would need to do - clear a mortgage, replace income while recovering, pay for treatment or adaptations - and other cover you already have (income protection, workplace sick pay, health insurance).
    type: text
    required: true
  - name: country
    description: Country you live in. Product rules, standard definitions and how state health care fits differ widely.
    type: string
output_contract:
  format: markdown
  sections: [Summary, What the cover is for, Quote comparison, Definitions that matter, Partial and additional payments, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Critical illness policies pay a lump sum on diagnosis of a listed condition that meets the policy's definition. The headline number of conditions is a poor guide: most claims come from a handful of conditions (commonly cancer, heart attack and stroke), and what matters is how strictly each is defined. Definitions can require a certain severity, a specific test result, permanent symptoms, or surgery of a specific type; early-stage cancers, less severe heart attacks and some strokes may be excluded or only earn a partial payment. Some markets use standardised minimum definitions for the main conditions, which helps comparison; where they do not, wording varies a lot. Other differences: whether partial payments reduce the main sum, children's cover, a survival period after diagnosis before payment, guaranteed or reviewable premiums, and whether the cover is combined with life cover so that one claim ends both. Critical illness is a different job from income protection, which pays monthly while you cannot work; many people need to think about both.
{{#country}}

Country: {{country}}
{{/country}}

<purpose>
{{purpose}}
</purpose>
</context>

<task>
<quotes>
{{quotes}}
</quotes>

1. What the cover is for: restate the purpose, check whether the sum and term match it, and note overlaps or gaps with the cover already held (especially income protection and workplace sick pay).
2. Quote comparison: table of sum assured, term, premium, guaranteed or reviewable, stand-alone or combined with life cover, number of full and partial conditions, children's cover, survival period.
3. Definitions that matter: for cancer, heart attack and stroke at minimum, compare how each quote defines them where the wording is supplied, and say in plain words which situations one would pay and another might not. If the definitions are not supplied, list exactly which to request.
4. Partial and additional payments: what triggers them, how much, and whether they reduce the main sum.
5. Questions to ask each insurer or adviser, including their published claims statistics if available and what happens on a combined policy after a claim.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend an insurer or say a policy is "the best"; show the trade-offs against the stated purpose.
- Do not invent condition definitions, claims statistics or premiums; compare only what is supplied and mark the rest "not stated".
- Do not give medical opinions about the person's likelihood of any illness.
- Remind the person to answer health and family history questions fully, since non-disclosure is a common reason for declined claims.
- Suggest a regulated adviser or broker for comparing full definitions across many insurers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
How the quotes compare against the purpose, and the biggest difference in what they would pay for.

## What the cover is for
Short paragraph and any gaps or overlaps.

## Quote comparison
Table.

## Definitions that matter
Table: condition | quote A | quote B | what that means in practice.

## Partial and additional payments
Bullets.

## Questions to ask
Numbered.
</output_format>
