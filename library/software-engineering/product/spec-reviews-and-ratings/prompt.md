---
schema: 1
id: spec-reviews-and-ratings
kind: prompt
title: Specify user reviews and ratings
description: Specifies a reviews and star ratings feature, covering who may review, content and editing rules, aggregation and display, sorting, business replies, fake-review signals, moderation and disclosure.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, fullstack-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [ecommerce]
tags: [reviews, ratings, marketplace, requirements]
pairs_with:
  prompts: [spec-content-reporting-and-moderation, spot-fake-reviews, spec-calculation-rules]
args:
  - name: feature_description
    description: What gets reviewed (products, sellers, services, places), who reviews, and what the reviews are used for.
    type: text
    required: true
  - name: context
    description: How purchases or bookings are recorded, countries served, incentives or review requests planned, and moderation capacity.
    type: text
output_contract:
  format: markdown
  sections: [Eligibility, Review content and editing, Aggregation and display, Sorting and filtering, Business replies, Integrity and moderation, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reviews only help buyers if people trust them, and trust depends on rules that are easy to get wrong. A raw average makes an item with one 5-star review outrank one with 400 reviews at 4.8; anyone-can-review invites competitors and fake reviews; letting sellers flag negative reviews for removal, or only asking happy customers for reviews, distorts the picture and in several countries breaks consumer protection rules on fake or selectively published reviews; edits after a refund rewrite history; and reviews of a product variant end up on the wrong item. A strong spec defines eligibility (verified purchase or completed booking, time window), content rules, a display rating that accounts for few reviews, sorting that does not hide negatives, labelled incentivised reviews, business replies, fraud signals and a moderation process that removes reviews only for stated policy reasons.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Specify eligibility: who can review (verified purchase, completed booking, any user), when the review window opens and closes, one review per purchase or per item, reviews by staff or the business itself, and a "verified" label rule.
2. Specify review content and editing: star scale and optional sub-ratings, text length, photos, required fields, editing window and whether edits are marked, deletion by the author, and what happens after a refund, return or account deletion.
3. Specify aggregation and display: the average shown and its rounding, the minimum count before showing an average, how few-review items are ranked (for example a Bayesian or confidence-adjusted score used for ranking only), rating distribution, review counts, and handling of variants and merged listings.
4. Specify sorting and filtering: default sort (for example most helpful or most recent, not highest first), filters by stars and verified status, and helpful votes with abuse limits.
5. Specify business replies: who can reply, one public reply per review, edits, and notification to the reviewer.
6. Specify integrity and moderation: fake review signals (new accounts, bursts, same device or payment, review swaps), labelling incentivised reviews, review requests sent to all eligible customers rather than only happy ones, report reasons, removal only for stated policy reasons with notice to the author, and audit. Flag local consumer rules on reviews for legal review.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Never specify suppressing, delaying or down-ranking reviews because they are negative; removal must be for stated policy reasons only.
- Do not state specific laws as facts; flag that rules on fake, incentivised and selectively published reviews vary by country and need checking.
- Keep the ranking score separate from the displayed average and describe both.
- If eligibility data (purchases, bookings) is unknown, ask how completed transactions are recorded.
</constraints>

<output_format>
## Eligibility
Numbered rules.
## Review content and editing
Table: element, rule, limit.
## Aggregation and display
Bullets, with any formula written out.
## Sorting and filtering
Bullets.
## Business replies
Bullets.
## Integrity and moderation
Numbered rules.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
