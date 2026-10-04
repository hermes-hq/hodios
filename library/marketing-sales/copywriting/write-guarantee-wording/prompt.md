---
schema: 1
id: write-guarantee-wording
kind: prompt
title: Write guarantee wording
description: Writes a guarantee or risk-reversal promise for a service or product with clear conditions, a simple claim process, the cost of honouring it, and a check that it does not undercut legal rights.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter, consultant]
requires: [none]
inputs: [text]
output: [copy, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [risk-reversal, guarantee, consumer-rights, refund-policy, offer-design]
pairs_with:
  prompts: [plan-promotional-offer, write-sales-page, write-sales-faq, write-service-packages-page]
  rules: [marketing-claims-rules]
args:
  - name: offer
    description: What you sell, the price, how it is delivered, what usually goes wrong or worries buyers, and any guarantee you give today.
    type: text
    required: true
  - name: guarantee_type
    description: The kind of promise - satisfaction (refund or redo if unhappy), workmanship (fix defects for a period), results (an outcome if the customer does their part) or price-match.
    type: enum
    enum: [satisfaction, workmanship, results, price-match]
    default: satisfaction
  - name: market
    description: Country or region where you sell, because consumer law differs (for example UK, Germany, Brazil, California). Optional but strongly recommended.
    type: string
  - name: numbers
    description: Margin or job cost, sales per month and how often customers complain or ask for refunds today. Optional; used for the cost check.
    type: text
output_contract:
  format: markdown
  sections: [Recommended guarantee, Short and full wording, How to claim, Cost check, Legal check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses, trades, coaches and online shops write guarantees that lower the buyer's risk without being a trap for either side. A strong guarantee is specific (what is promised, for how long, what the remedy is), aimed at the buyer's real worry, easy to claim, and affordable to honour. Common failures: vague "100% satisfaction guaranteed" lines that the owner will not actually honour, results promises that ignore what the customer must do, "no questions asked" followed by questions, and wording that implies customers have fewer rights than the law already gives them. In most countries a business guarantee sits on top of statutory consumer rights and must never suggest it replaces them.

Guarantee type: {{guarantee_type}}
{{#market}}Market: {{market}}{{/market}}
</context>

<task>
<offer>
{{offer}}
</offer>

{{#numbers}}<numbers>
{{numbers}}
</numbers>{{/numbers}}

1. If you cannot tell what is being sold, ask and stop. If the price or the main buyer worry is missing, ask for it but continue with your best reading, marked as an assumption. If the market is missing, ask; until answered, write neutral wording and say the legal check depends on the country.
2. Name the buyer's biggest risk this guarantee should remove, and check the chosen type fits it. If another type fits better (for example workmanship for a trade where satisfaction is subjective), say so and offer both.
3. Design the promise: what exactly is covered, the time limit, the remedy (redo, repair, refund, credit, difference refunded), and fair conditions stated up front. For results guarantees, define the result measurably and list what the customer must do. For price-match, define a comparable product or quote, which sellers count, and proof required.
4. Write a short version (one or two lines for ads, quotes and the checkout) and a full version (terms in plain language, under 200 words).
5. Write the claim process: who to contact, what to send, response time, and how long the remedy takes. Keep it to three steps.
6. Cost check: claims you expect per month multiplied by the cost of each remedy, compared with the margin. Use only supplied numbers; otherwise give the formula and the numbers to gather.
7. Legal check: list the points to confirm locally for this market (statutory rights, cooling-off rules, how guarantees must be described, any rules on results claims in this sector), and add a line stating the guarantee is in addition to the customer's legal rights.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the law requires as fact for a specific country; name what to check and suggest a consumer-law adviser, trade association or lawyer for anything high-value.
- Never write wording that limits, waives or hides statutory rights, or conditions designed to make claims practically impossible.
- No guarantee of outcomes the seller cannot control (rankings, weight loss, income, exam results) without a measurable definition and customer conditions; for health, finance or income results, recommend against a results guarantee and say why.
- Use only supplied facts; mark gaps as [X].
</constraints>

<output_format>
## Recommended guarantee
The buyer risk, the chosen type and why, in three or four lines.

## Short and full wording
Short version, then the full plain-language terms.

## How to claim
Three numbered steps with response and remedy times.

## Cost check
The formula and a small table: Expected claims per month | Cost per claim | Monthly cost | Share of margin.

## Legal check
Checklist of points to confirm locally, and the statutory-rights line.
</output_format>
