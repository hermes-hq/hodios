---
schema: 1
id: evaluate-platform-exclusive-deal
kind: prompt
title: Evaluate a platform exclusive deal
description: Evaluates a platform's offer to make a creator exclusive - minimum guarantee, hours or content quotas, exclusivity scope, clawbacks - against staying independent, with questions for a lawyer.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, gamer]
inputs: [document, notes]
output: [report, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [exclusivity, minimum-guarantee, platform-contract, streaming-deal, decision]
pairs_with:
  prompts: [reduce-platform-dependence, review-creator-income-mix, review-sponsorship-contract]
  personas: [creator-business-manager]
args:
  - name: offer
    description: The offer as written or summarised - platform, length, guaranteed payment and how it is paid, hours or content quotas, what is exclusive (live, video on demand, clips, other platforms), revenue share, sponsor restrictions, termination and clawback terms.
    type: text
    required: true
  - name: current
    description: Your current situation - platforms, audience and income per platform and source (subs, ads, sponsors, other), hours you stream or post, and where your audience would follow you.
    type: text
    required: true
  - name: country
    description: Optional. Your country, since contract and tax rules differ.
    type: string
output_contract:
  format: markdown
  sections: [What the deal really says, Money compared, What you give up, Risks, Questions for the platform, Questions for a lawyer, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Platforms sometimes pay creators to stream or post only with them, often as a guaranteed minimum paid against earnings, tied to hours or content quotas. The headline number hides the questions that decide whether the deal is good: is it a guarantee on top of earnings or an advance recouped from them; what happens if quotas are missed (reduced pay, clawback of money already paid, termination); what exactly is exclusive (live only, or also clips and videos on other platforms, which may cut off discovery); whether sponsors, merch links or other income are restricted; how long the term is and whether the platform can extend it; and what happens to the audience and the content at the end. The hidden cost is often the audience on other platforms that withers during the term. Comparing the deal against current income must use the creator's real numbers and a realistic view of whether the audience would follow.
</context>

<task>
<offer>
{{offer}}
</offer>

<current>
{{current}}
</current>

{{#country}}Country: {{country}}{{/country}}

1. **What the deal really says:** restate each term in plain words, separating what is stated from what is unclear or missing. Do not fill gaps with assumptions about standard terms.
2. **Money compared:** current income over the deal's length versus the deal, in low, likely and high cases, showing whether the guarantee is extra or recouped and the effect of missing a quota. Use only the user's figures; label assumptions.
3. **What you give up:** discovery and audience on other platforms, sponsor or merch restrictions, flexibility in schedule and content, and the cost of hours quotas on health and other work.
4. **Risks:** clawbacks, unilateral changes, extension clauses, post-term restrictions, content ownership, payment timing, and what happens if the platform changes or closes the programme.
5. **Questions for the platform:** clarifications to request in writing.
6. **Questions for a lawyer:** specific clauses to have reviewed by a lawyer or a creators' union or association, plus tax questions for an accountant.
7. **Recommendation:** accept, negotiate (with the two or three asks that matter most), or decline, and the walk-away line.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict how a court would read a clause or claim a term is unenforceable.
- Do not invent what similar deals pay or what other creators received.
- If the user has not pasted the actual terms, say the analysis is of their summary and that the written contract must be checked.
- Keep the creator's long-term independence in view, not only the guaranteed money.
</constraints>

<output_format>
## What the deal really says
Table: term | what it says | unclear or missing.

## Money compared
Table: case | stay independent | take the deal | assumptions.

## What you give up
## Risks
Bullets ranked by impact.

## Questions for the platform
## Questions for a lawyer
## Recommendation
</output_format>
