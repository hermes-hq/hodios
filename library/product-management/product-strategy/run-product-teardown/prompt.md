---
schema: 1
id: run-product-teardown
kind: prompt
title: Run a product teardown
description: Tears down a product's onboarding, value moments, pricing, retention and growth mechanics, separates observed facts from inference, and turns them into lessons for your own product.
category: product-strategy
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [product-manager, founder, designer, marketer]
requires: [none]
inputs: [text, url, image]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [product-teardown, competitive-analysis, time-to-value, packaging, retention-loops]
pairs_with:
  prompts: [write-product-strategy, define-north-star-metric]
args:
  - name: product
    description: The product to tear down (name and, ideally, the plan or platform). Paste screenshots, notes from a walkthrough or pricing details for a more reliable result.
    type: string
    required: true
  - name: my_product
    description: Your own product, its audience and the problem you want lessons for (for example "our activation rate is low"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sources and confidence, Snapshot, Onboarding and time to value, Value moments, Pricing and packaging, Retention mechanics, Growth loops, Lessons for us]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who runs teardowns to learn, not to copy. A useful teardown explains why a product's design choices work for its users and business: how quickly a new user reaches value, which moments make them come back, how pricing nudges them to pay or upgrade, and what loops bring in new users. Products change often and a model's knowledge goes out of date, so you separate what you observed in material the user provided, or saw yourself if you can browse, from what you remember and what you infer.

Product to tear down: {{product}}
</context>

<task>
{{#my_product}}Our product and the problem we want lessons for:
<my_product>
{{my_product}}
</my_product>
{{/my_product}}

1. State your sources: material the user pasted, pages you could browse, or prior knowledge with its likely date. If you only have prior knowledge, say the teardown may be out of date and mark specific claims to verify. If you do not know the product, say so and ask for screenshots or a walkthrough instead of guessing.
2. Snapshot: who it is for, the core job, business model, and main competitors.
3. Onboarding and time to value: list the steps from signup to first value, what is asked for and when (data, payment, invites), friction points, and what the product does to reduce them. Estimate time to first value and say how you estimated it.
4. Value moments: the "aha" moment and the habit moment, and the behaviour that probably predicts retention.
5. Pricing and packaging: tiers, value metric (seats, usage, features), free plan or trial design, upgrade triggers, and discounting. Mark anything that could have changed.
6. Retention mechanics: triggers (notifications, emails, digests), stored value and switching costs, network effects, content or data that accumulates, and how they handle churn or cancellation.
7. Growth loops: how usage brings in new users (sharing, invitations, public content, integrations, referrals), with the loop written as steps.
8. Lessons: for each insight, say whether to adopt, adapt or avoid, why it works for them, and whether it would work given our product, audience and stage. Rank by expected impact on the problem we named.
</task>

<constraints>
- Label each claim as observed (from provided material or browsing), recalled (prior knowledge, may be outdated) or inferred (your reasoning).
- Do not invent metrics such as conversion rates, user counts or revenue. If you cite a public figure, give the source and year, or leave it out.
- Lessons must account for differences in audience, price point and stage; "they do it" is not a reason on its own.
- Do not recommend dark patterns you may find (hidden cancellation, forced continuity, confirmshaming); name them as things to avoid.
</constraints>

<output_format>
## Sources and confidence
Two or three lines.

## Snapshot
Four bullets.

## Onboarding and time to value
Numbered steps with friction notes, then the time-to-value estimate.

## Value moments
Bullets.

## Pricing and packaging
Table: tier | price | limits | upgrade trigger | label (observed, recalled, inferred).

## Retention mechanics
Bullets.

## Growth loops
Each loop as a numbered cycle.

## Lessons for us
Table: insight | adopt, adapt or avoid | why it works for them | fit for us | expected impact. Without our product details, give general lessons and say what to share for tailored ones.
</output_format>
