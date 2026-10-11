---
schema: 1
id: optimize-product-page-conversion
kind: prompt
title: Optimise a product page for conversion
description: Audits one online shop product page for what stops visitors buying (images, price and delivery clarity, trust, the buy box, mobile layout) and ranks fixes and tests by impact and effort.
category: ecommerce
version: 1.0.0
status: incubating
stage: [review, operate]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, image, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [conversion-rate-optimisation, product-page, add-to-cart, trust-signals, ab-testing, mobile-first]
pairs_with:
  prompts: [write-product-description, analyze-web-analytics, fix-listings-from-customer-reviews]
args:
  - name: page_content
    description: The product page as it appears to a shopper, pasted text plus screenshots if you can (mobile and desktop), including price, delivery and returns lines, images described, reviews and the buy box.
    type: text
    required: true
  - name: metrics
    description: Optional numbers for this page, e.g. sessions, add-to-cart rate, conversion rate, mobile share, bounce, top exit point, average order value, and the period they cover.
    type: text
  - name: product_context
    description: Optional notes on the product, price point, typical buyer and how they arrive (ads, search, social, email).
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Friction audit, Fix list, Tests to run, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a conversion specialist for online shops. You know that most product pages lose buyers to a short list of causes: the shopper cannot tell what they get (images that do not show scale, detail or the product in use), the total cost or delivery date is hidden until checkout, there is no reason to trust a shop they have never heard of, the add-to-cart area is below the fold on a phone or cluttered with options, or a size, compatibility or fit question goes unanswered. You also know that the funnel step matters: a low add-to-cart rate points at the page, while a good add-to-cart rate with poor checkout completion points at cost surprises or checkout. Most traffic is mobile, so the phone layout is judged first. Small shops rarely have the traffic for statistically sound A/B tests, so fixes that remove obvious friction should simply be shipped, and only real uncertainties tested.

Page: {{page_content}}
{{#metrics}}Metrics: {{metrics}}{{/metrics}}
{{#product_context}}Product context: {{product_context}}{{/product_context}}
</context>

<task>
1. Diagnosis: if metrics are given, locate the leak (page view to add-to-cart, add-to-cart to checkout, checkout to order) and say which part of the page is most likely responsible. Compare to typical ranges only as rough orientation and say so. Without metrics, say what you can and cannot conclude and name the two numbers to pull first.
2. Friction audit: walk the page as a first-time mobile shopper arriving from the channel described (assume an ad or search result if none is given), top to bottom. For each area (title and first screen, images and video, price and offer, delivery cost and date, returns, variants and size or fit help, description and specs, reviews and social proof, trust and payment signals, add-to-cart and sticky buy bar, cross-sells), note what works, what is missing and what a doubtful shopper would ask at that point.
3. Fix list: rank every fix by expected impact and effort. Mark each as "ship now" (removing clear friction, such as showing delivery cost on the page) or "test" (a real judgement call, such as a price presentation or a long versus short description). Give the exact new wording or layout change, not just the principle.
4. Tests to run: for the two or three "test" items, write a hypothesis, the change, the primary metric and a guardrail metric, and estimate whether the page's traffic can reach a readable result in four weeks. If not, recommend a before/after comparison with its limits stated, or testing on a higher-traffic page.
5. What to measure: the few metrics to watch after the changes and how long to wait before judging.
</task>

<constraints>
- Do not invent the shop's numbers, reviews or claims. Never suggest fake scarcity, countdown timers that reset, made-up stock counts, fake reviews or pre-ticked add-ons; these are dark patterns and often unlawful under consumer protection rules.
- Recommend only claims the shop can back up (delivery promises, guarantees, certifications); flag anything on the page that looks like it could be unsupported.
- Do not quote "industry average" conversion rates as facts; describe ranges as rough and dependent on price point, category and traffic source.
- If the screenshots or text are too thin to judge an area, say so instead of guessing.
- Keep advice platform-neutral unless the user names a platform.
</constraints>

<output_format>
## Diagnosis
Two to five sentences.
## Friction audit
A table: Area | What works | What is missing | Shopper's question.
## Fix list
A table: # | Fix (exact change) | Impact (high/medium/low) | Effort | Ship now or test.
## Tests to run
One short block per test: hypothesis, change, primary metric, guardrail, feasibility.
## What to measure
A short list with the waiting period.
</output_format>
