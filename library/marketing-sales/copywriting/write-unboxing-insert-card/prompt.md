---
schema: 1
id: write-unboxing-insert-card
kind: prompt
title: Write a package insert card
description: Writes the insert card that goes inside an online shop's parcels - thank-you, how to get started, care tips, a fair review request and a reorder or referral prompt - sized to a small printed card.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter, individual]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [package-insert, unboxing, thank-you-card, review-request, repeat-purchase]
pairs_with:
  prompts: [write-packaging-copy, write-post-purchase-emails, request-customer-testimonials]
  personas: [copywriter]
args:
  - name: shop
    description: What you sell, your brand voice, who buys, and anything special about how products are made or packed.
    type: text
    required: true
  - name: goal
    description: What the card should mainly do - thank and build loyalty, reduce returns with setup or care tips, get reviews, drive reorders, or get referrals. One or two goals.
    type: string
    required: true
  - name: card
    description: Card size and sides, for example "A6, two-sided" or "business card, one side". Defaults to A6 two-sided.
    type: string
    default: "A6, two-sided"
  - name: offer
    description: Any reorder discount, referral reward or code you want to include, with its terms. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Card copy, Alternative version, Print and tracking notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a copywriter for small online shops. The insert card is read at the most positive moment in the relationship, opening the parcel, and it costs pennies to print. Cards work when they do one or two jobs well: a warm, specific thank-you; the one thing that makes the product work better (setup, care, how to use the refill); and a single next step. Cards that cram a story, three discount codes, five social handles and a review demand get thrown away with the packaging.

Review requests have rules. Marketplaces such as Amazon forbid inserts that ask only for positive reviews, offer anything in return for a review, or steer unhappy buyers away from reviewing, and consumer laws in many countries treat incentivised or filtered reviews as misleading. A fair card asks for honest feedback from everyone and gives an easy route for problems.
</context>

<task>
<shop>
{{shop}}
</shop>

Main goal: {{goal}}
Card: {{card}}

{{#offer}}
<offer>
{{offer}}
</offer>
{{/offer}}

1. If you cannot tell what the shop sells, ask and stop.
2. Pick the card's one or two jobs from the goal and cut everything else.
3. Write the card side by side: a short headline, the thank-you (specific to the product, not generic), the useful tip or getting-started step, the single call to action (honest review, reorder, referral or follow), and contact for problems. Keep a small A6 side to about 40 to 60 words and a business card side to about 20.
4. If an offer is supplied, state its terms on the card (expiry, minimum spend). If the shop sells on a marketplace, keep the review ask neutral and without incentives.
5. Write one alternative version with a different tone or job.
6. Add print and tracking notes: a unique code or short URL to measure response, readable type size, and whether to handwrite a line for early orders.
</task>

<constraints>
- No incentives tied to reviews, and no "only review if you are happy" wording.
- Use only offers and terms supplied.
- One call to action per side.
- Warm and specific, not gushing; avoid "We hope you love it!!" style filler.
</constraints>

<output_format>
## Card copy
Front and back (or the single side), labelled, ready for the designer.

## Alternative version
The full alternative card.

## Print and tracking notes
Short bullets.
</output_format>
