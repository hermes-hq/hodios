---
schema: 1
id: spot-fake-reviews
kind: prompt
title: Spot fake reviews on a product or business
description: Checks a product's or business's reviews for signs of fake, incentivised or bought reviews, explains which signals are strong, and estimates a fairer picture from the reviews that look genuine.
category: fact-checking
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, traveler, parent]
requires: [none]
inputs: [text, url]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [online-reviews, consumer-protection, review-manipulation, incentivised-reviews]
pairs_with:
  prompts: [check-post-before-sharing, check-social-account-authenticity]
  personas: [fact-checker]
args:
  - name: reviews
    description: The reviews, pasted with star ratings, dates and reviewer names or profiles where visible, plus the overall rating and number of reviews.
    type: text
    required: true
  - name: product
    description: What the product or business is and where it is listed, for example "wireless earbuds on a large marketplace" or "a dentist on a maps app".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Warning signs found, Reviews that look genuine, A fairer picture, Before you buy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fake and manipulated reviews come in several forms: paid reviews written by people who never used the product, reviews in exchange for a free product or refund ("review clubs"), reviews from the seller's friends and staff, review merging (a new product inherits reviews from an older or different one), suppression of negative reviews, and fake negative reviews of competitors. The strongest signals are patterns across many reviews, not one odd review: a burst of five-star reviews in a few days, many reviews with the same phrases or structure, reviewers whose other reviews are all five stars for unrelated products in the same week, reviews that describe a different product or version, and a rating distribution with many fives, many ones and almost nothing between. Weaker signals include vague praise, heavy use of the product's full name, and mentions of a free sample. Genuine reviews tend to describe specific use over time, mention minor drawbacks and include middle ratings. Recent three-star and two-star reviews are often the most informative. Many countries ban fake reviews, and platforms have reporting tools.
</context>

<task>
Check these reviews for {{product}}.
<reviews>
{{reviews}}
</reviews>

1. Describe the overall pattern: rating distribution, review dates and bursts, length and specificity.
2. Look for strong signals: bursts, repeated phrasing or structure across reviewers, reviews describing a different product, reviewer profiles with suspicious histories (where supplied), and mentions of free products, refunds or requests to change a review.
3. Note weaker signals, labelled as weak.
4. Identify the reviews that look genuine and summarise what they say, especially specific complaints and how the product holds up over time.
5. Estimate a fairer picture from the genuine-looking reviews, as a range or a description rather than a precise number, and say how confident you are.
6. Suggest what to check before buying: recent mid-range reviews, independent reviews, return policy and how to report suspected fake reviews to the platform.
</task>

<constraints>
- Judge only from the reviews and details supplied. Do not claim knowledge of the seller, of review-detection tools' results or of platform data you do not have.
- Never call a specific reviewer a liar or the seller a fraud; say the pattern is consistent with manipulation.
- Do not produce a single "true rating" with false precision; give a range and the reasoning.
- If the sample is small or only shows the top reviews, say so and limit the verdict.
- Do not write reviews, positive or negative, for the user to post.
</constraints>

<output_format>
## Verdict
One of: no clear signs of manipulation, some warning signs, strong signs of manipulation, or too little to judge. Then two sentences.
## Warning signs found
Table: signal | strength (strong, weak) | example from the reviews.
## Reviews that look genuine
Short summary with the recurring specific points.
## A fairer picture
## Before you buy
Checklist.
</output_format>
