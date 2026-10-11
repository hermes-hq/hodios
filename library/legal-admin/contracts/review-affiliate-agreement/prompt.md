---
schema: 1
id: review-affiliate-agreement
kind: prompt
title: Review an affiliate or referral partner agreement
description: Reviews an affiliate or referral partner agreement from the partner's side for commission rules, cookie windows, clawbacks, payment thresholds, promotion limits and termination.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, consultant, founder, marketer]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [affiliate-program, referral-partner, commission-terms, cookie-window, clawback, partner-program]
pairs_with:
  prompts: [plan-creator-affiliate-links, explain-contract-clause, summarize-contract]
args:
  - name: agreement
    description: The affiliate, referral or partner programme terms, plus the commission page or email if separate, with clause numbers.
    type: text
    required: true
  - name: plan
    description: How you will promote (blog, video, newsletter, paid ads, client referrals), your audience size or expected referrals, and what you hope to earn.
    type: text
    required: true
  - name: country
    description: Your country and the company's, and the governing law named.
    type: string
output_contract:
  format: markdown
  sections: [In brief, How you get paid, Clause check, Rules that could cost you commission, Questions to ask the company]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Affiliate and referral programmes are click-through contracts the company can usually change at will, and the commission headline rarely matches what is paid. What experienced affiliates check: how a sale is attributed (cookie or tracking window, last-click versus first-click, and whether coupon sites or the company's own ads override your referral); what counts as a qualifying sale (new customers only, excluding renewals, upgrades or certain products) and whether recurring commission really recurs and for how long; reversals and clawbacks for refunds, chargebacks or cancellations, sometimes months later; payment thresholds, schedules and forfeiture of unpaid balances if the account is inactive or terminated; promotion restrictions (no bidding on brand keywords, no coupon sites, no email, required disclosures) where a single breach can forfeit all earnings; the company's right to change rates or terms with little notice; termination at will with commission for pending sales lost; and the partner's own duties to disclose the relationship to their audience under advertising rules, which vary by country. Referral partner deals for services (a consultant referring clients) add questions about how long a referred client stays "yours" and whether fees continue on renewals.
{{#country}}

Countries and law: {{country}}
{{/country}}

<plan>
{{plan}}
</plan>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: what the partner earns, the three terms most likely to reduce actual earnings, and whether the programme fits the stated promotion plan.
2. How you get paid: attribution and tracking window, qualifying sales, rate and any tiers, recurring duration, reversals, threshold, schedule and method. Work an example with the stated expectations and show the arithmetic.
3. Clause check, quoting each clause: acceptance and changes to terms, attribution, qualifying sales, rates and changes to rates, recurring commission, reversals and clawbacks, payment terms and forfeiture, promotion restrictions, disclosure duties, use of brand and content, exclusivity, data and cookies, termination and pending commission, liability and indemnity, governing law.
4. Rules that could cost you commission: the specific restrictions the stated promotion plan could break, and what to do instead.
5. Questions to ask the company: ranked, each with the answer that would be acceptable.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Do not invent rates or tracking windows.
- Do not state the exact advertising disclosure rules for a country; say disclosure is commonly required and what to check.
- Do not promise income; earnings examples are illustrations from the user's own numbers.
- Note that small programmes are usually take-it-or-leave-it; focus questions on clarifications rather than rewrites unless the partner has leverage.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## How you get paid
Bullets, then a worked example.

## Clause check
Table: topic | clause and short quote | rating (fine / check / ask) | why.

## Rules that could cost you commission
Bullets: rule - risk for your plan - what to do.

## Questions to ask the company
Numbered.
</output_format>
