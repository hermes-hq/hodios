---
schema: 1
id: write-referral-programme-terms
kind: prompt
title: Write referral programme terms
description: Drafts terms and conditions for a refer-a-friend programme - who qualifies, when rewards are earned and paid, limits, fraud rules, tax, changes and ending - from how the programme really works.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, product-manager]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [referral-terms, refer-a-friend, reward-terms, promotion-terms, referral-fraud]
pairs_with:
  prompts: [design-referral-program, write-terms-of-service, check-endorsement-disclosures]
args:
  - name: programme
    description: How the programme works - who can refer, what the referrer and friend each get, when the reward is earned (sign-up, first purchase, after a trial or refund window), how it is paid (credit, cash, voucher), caps, and countries.
    type: text
    required: true
  - name: jurisdictions
    description: Countries or states where referrers and friends are.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Decisions to make, Terms, Summary for the referral page, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Referral terms protect two things: customers' trust that the reward will arrive, and the business against fraud. Disputes come from vagueness about when a reward is "earned" (sign-up versus a paid, non-refunded first order), how long tracking lasts, what happens when the friend was already a customer, and whether self-referrals or multiple accounts count. Fraud patterns are predictable: self-referral with second emails, coupon-site posting, referral rings and refund-after-reward. Legal points vary: cash and gift-card rewards may be taxable for the referrer, people who post referral links publicly may need to disclose the incentive under advertising rules, unsolicited messages to friends can raise spam rules, and some countries require clear promotion terms before people take part.

Jurisdictions: {{jurisdictions}}
</context>

<task>
Programme:
<programme>
{{programme}}
</programme>

1. Decisions to make: any choice the description leaves open (qualifying event, tracking window, caps, existing customers, refunds, expiry of credit, stacking with other offers), with a recommendation for each.
2. Terms in plain language:
   - Who runs it [BRACKETS], who can take part and who cannot (employees, existing customers as friends).
   - How referring works and how referrals are tracked, including the window.
   - Rewards for each side, the qualifying event, when they are issued, and form (credit, voucher, cash) with expiry if any.
   - Limits and caps, stacking, no transfer or cash alternative unless stated.
   - Fraud and abuse: self-referral, fake accounts, coupon sites, spamming, and what happens (reward cancelled or reversed).
   - Refunds and cancellations after the reward.
   - Disclosure when sharing publicly, and no spam.
   - Tax responsibility statement, data use and privacy link.
   - Changes and ending the programme, and how earned rewards are honoured.
3. Summary for the referral page: four to six plain bullets.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent reward values, caps or dates; use [PLACEHOLDERS] where not given.
- Do not let the business cancel already earned rewards without a reason; earned rewards should be honoured or the conditions stated up front.
- Do not state tax treatment or advertising disclosure rules as fact; mark them to confirm.
- Keep the terms consistent with the summary; check before finishing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions to make
Table: decision | recommendation | why.

## Terms
Numbered sections.

## Summary for the referral page
Bullets.

## Points to confirm
Numbered.
</output_format>
