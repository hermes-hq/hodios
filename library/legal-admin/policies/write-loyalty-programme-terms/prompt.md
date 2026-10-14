---
schema: 1
id: write-loyalty-programme-terms
kind: prompt
title: Write loyalty programme terms
description: Drafts terms for a loyalty, points or rewards scheme - joining, earning and redeeming, tiers, expiry, returns, changes and closure, fraud, transfer and data use - in plain language.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, operations-manager]
subject: [law, retail, hospitality]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [loyalty-programme, rewards-points, points-expiry, programme-changes, customer-data, membership-tiers]
pairs_with:
  prompts: [design-loyalty-program, write-loyalty-points-emails, write-gift-card-terms, write-privacy-policy]
args:
  - name: programme
    description: How members join (app, card, account), how points or stamps are earned and on what, what they are worth, rewards, tiers, expiry plans, partners, whether points can be bought or transferred, and what data you collect and use for offers.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or province where the programme runs.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Design risks, Terms, Sign-up and app wording, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft loyalty programme terms for a retailer, café, hotel or online business. Points are a promise to customers, and the complaints that reach regulators and social media are predictable: points expiring without warning, rewards devalued overnight, programmes closed with balances lost, and accounts frozen for "abuse" without explanation. Terms need to cover who can join, how points are earned (which purchases, excluded items, when points post), what happens to points when purchases are returned or cancelled, redemption value and rules, tiers and how status is kept, expiry (clear periods, inactivity rules, and advance reminders), the right to change or end the programme (consumer law in many places treats very broad unilateral change clauses as unfair, so changes should come with reasonable notice and a chance to redeem), fraud and misuse with a fair process, no cash value and no transfer unless allowed, partner rewards, and how member data is used. If points can be bought, or behave like stored value, gift card or unclaimed property rules may apply. Loyalty data is personal data and often used for profiling and personalised offers, which needs a clear privacy notice and, for marketing messages, the right consent; joining the programme should not be bundled with marketing consent where the law requires them to be separate.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Programme:
<programme>
{{programme}}
</programme>

1. Design risks: features of the programme as described that are likely to cause legal or trust problems (short or silent expiry, unlimited change rights, bundled marketing consent, buyable points), each with a fix.
2. Terms: numbered sections in plain language covering the operator, eligibility and joining, membership card or account, earning, posting and missing points, returns and cancellations, redeeming, reward availability, tiers, expiry and reminders, partner offers, no cash value and transfer, misuse and account suspension with a way to challenge it, changes to the programme with notice, ending the programme with a final redemption window, liability, personal data and marketing preferences, and contact. Use [BRACKETS] for missing details.
3. Sign-up and app wording: the short summary members see at sign-up, the separate marketing consent line, and the expiry reminder message.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not draft change or closure clauses that let the business wipe balances without notice; explain the unfair terms and trust risk and offer a fair version.
- Do not bundle marketing consent into joining where separate consent is required; mark the local rule to confirm.
- Do not state legal periods or thresholds as fact for the jurisdiction unless confident; mark "confirm for {{jurisdiction}}".
{{> output/uncertainty}}
</constraints>

<output_format>
## Design risks
Table: feature | risk | fix.

## Terms
Numbered sections with headings.

## Sign-up and app wording
Short text blocks.

## Points to confirm
Numbered list.
</output_format>
