---
schema: 1
id: check-advertising-claims
kind: prompt
title: Check ad and packaging claims before publishing
description: Checks advertising, packaging and website claims - green, health, price, comparative, "best" and "free" - for evidence and misleading-ad risk, and suggests safer wording.
category: compliance
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, copywriter, founder]
subject: [law, retail, ecommerce]
requires: [none]
inputs: [text, image]
output: [table, rewrite, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [advertising-claims, claim-substantiation, green-claims, misleading-advertising, price-claims, comparative-advertising]
pairs_with:
  prompts: [check-endorsement-disclosures, check-product-labelling-rules, check-online-shop-consumer-law]
  rules: [marketing-claims-rules]
args:
  - name: claims
    description: The ad, landing page, packaging or social post text, or a list of the claims, including headlines, small print, images described in words, and prices with any "was" price.
    type: text
    required: true
  - name: product_and_market
    description: What the product or service is, who the audience is, the channels, and the countries where the ad will run.
    type: text
    required: true
  - name: evidence
    description: What proof you have for each claim - test results, studies, certifications, price history, survey data. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Claim review, Evidence needed, Safer wording, Claims to drop, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review marketing claims the way an advertising regulator or a competitor's lawyer would. The test in most places is the overall impression on the average consumer, including what is implied, not only the literal words, and the advertiser must hold evidence before the claim is made. Objective claims ("kills 99.9% of germs", "lasts twice as long", "No. 1 in the UK") need tests or data that match the claim exactly, including conditions and comparisons. Puffery is only safe when nobody would take it as a factual statement. Environmental claims are under the most scrutiny: vague terms such as "eco-friendly", "green", "sustainable" or "carbon neutral" through offsetting are increasingly restricted, especially in the EU and UK, and claims must cover the full life cycle or say which part they mean. Health and nutrition claims on food are often limited to authorised wording, and medicinal claims for cosmetics or supplements can turn a product into a medicine in law. Price claims need a genuine reference price ("was" prices actually charged for a meaningful period, with stricter EU rules on the lowest prior price), and "free" must be truly free. Comparative ads must compare like with like and be verifiable. Small print may clarify but not contradict a headline. Testimonials and reviews must be genuine and representative.
</context>

<task>
Claims:
<claims>
{{claims}}
</claims>

Product and market:
<market>
{{product_and_market}}
</market>
{{#evidence}}

Evidence:
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Claim review: list every express and implied claim, its type (environmental, health, performance, price, comparative, superlative, "free", testimonial), and a risk rating of low, medium or high with the reason.
2. Evidence needed: for each medium or high risk claim, the specific evidence that would support it, and whether the evidence supplied is enough, partly enough, or missing.
3. Safer wording: rewrite each risky claim so it is specific, accurate and still persuasive.
4. Claims to drop: claims that cannot be supported or are restricted in the market, and why.
5. Points to verify: market-specific rules to confirm, such as authorised health claim wording or the reference price rule, and whether a regulator's pre-clearance or a copy clearance service is advisable for broadcast ads.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent test results, statistics, certifications or awards to support a claim.
- Do not state the exact wording of authorised claims or legal reference periods unless confident; mark "confirm".
- Do not suggest wording designed to imply a claim the evidence does not support, or small print that contradicts the headline.
- If a claim suggests the product treats or prevents a disease, flag it as high risk and recommend specialist advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Claim review
Table: claim | express or implied | type | risk | reason.

## Evidence needed
Table: claim | evidence needed | evidence supplied | gap.

## Safer wording
Table: original | safer version.

## Claims to drop
Bulleted list with reasons.

## Points to verify
Numbered list.
</output_format>
