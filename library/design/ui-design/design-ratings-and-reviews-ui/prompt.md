---
schema: 1
id: design-ratings-and-reviews-ui
kind: prompt
title: Design ratings and reviews UI
description: Designs how users leave and read ratings and reviews, with the ask moment, review form, summary and distribution, filters and sorting, photos, helpfulness, replies and moderation states.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ratings, reviews, social-proof, user-generated-content, moderation]
pairs_with:
  prompts: [spec-reviews-and-ratings, review-design-for-dark-patterns, design-form-experience, respond-to-online-review]
  personas: [product-designer]
args:
  - name: review_context
    description: What is reviewed (products, sellers, places, courses, apps), who can review and when, how many reviews items typically have, whether businesses reply, photos allowed, and current problems (few reviews, fake reviews, unhelpful summaries).
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, mobile-app, both]
    default: both
output_contract:
  format: markdown
  sections: [Ask moment, Review form, Summary block, Review list, Replies and moderation states, Low-count and edge states, Trust signals, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A star average alone is a weak signal: shoppers read the distribution, the most recent reviews and the negative ones, and they trust reviews more when they see verification, photos and owner replies. On the writing side, review volume depends on asking at the right moment (after the product has been used, not right after purchase) and on a short form that accepts a rating alone. Common mistakes: showing 5.0 from two reviews as if it were strong, hiding negative reviews, sorting only by "most helpful" so old reviews dominate, forms with ten required fields, and gating requests so only happy customers are asked, which misleads buyers and may break platform or consumer rules.
</context>

<task>
<review_context>
{{review_context}}
</review_context>

Design for {{platform}}. If what is reviewed is unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Ask moment.** When and where to request a review (time after delivery or use, in-app versus email), frequency caps, and the same request for every eligible customer.
2. **Review form.** Rating first (allow submitting a rating alone), optional text with prompts that elicit useful detail, attributes relevant to this item (fit, quality, value), photos, name display choice, edit and delete later, and the confirmation.
3. **Summary block.** Average with count, distribution bars that are clickable filters, attribute summaries, and how the average is shown when the count is low.
4. **Review list.** Review card anatomy (rating, title, text, date, verified marker, attributes, photos, helpful votes, reply), default sort (recent or relevant, with a reason), filters (rating, with photos, verified, keyword), pagination.
5. **Replies and moderation states.** Business or seller reply placement, pending, published, rejected with reason to the author, edited, reported and removed, and what readers see for each.
6. **Low-count and edge states.** No reviews yet, one or two reviews, reviews for a different variant, reviews after a major product change, translated reviews.
7. **Trust signals.** Verified purchase or stay, disclosure of incentivised reviews, how review collection works (link or short text), and visible negative reviews.
8. **Metrics.** Review request to submission rate, share with text or photos, review helpfulness, filter usage, conversion on pages with versus without reviews.
</task>

<constraints>
- Never design review gating (asking only satisfied customers), hiding negative reviews, or merging reviews across different products to inflate counts.
- Do not state consumer-protection or platform review rules as fact; mark them as items to confirm.
- Low counts must be shown as low counts, not as strong averages.
{{> output/uncertainty}}
</constraints>

<output_format>
## Ask moment
## Review form
| Field | Required | Notes |
## Summary block
## Review list
## Replies and moderation states
| State | Author sees | Readers see |
## Low-count and edge states
## Trust signals
## Metrics
</output_format>
