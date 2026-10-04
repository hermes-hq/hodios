---
schema: 1
id: write-carousel-ad-cards
kind: prompt
title: Write carousel ad cards
description: Writes a paid carousel ad as a card sequence (hook, product or step cards, proof, CTA) with per-card headlines within limits, an order that works if the viewer stops at card two, and image direction.
category: advertising
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [carousel-ads, card-sequence, product-showcase, swipe-story, image-direction]
pairs_with:
  prompts: [write-social-ad-variations, plan-carousel-post, plan-ad-creative-tests]
  personas: [ad-creative-strategist]
args:
  - name: products_or_story
    description: The products (names, prices, what makes each worth buying, product page links) or the story or steps you want to tell (for example a before-during-after of a service), plus proof you can use (reviews, numbers) and the offer if any.
    type: text
    required: true
  - name: platform
    description: Where it runs, for example "Instagram and Facebook", "LinkedIn", "Pinterest". Optional; limits are given as typical if empty.
    type: string
  - name: goal
    description: What a viewer should do, for example "buy one of the four bundles", "book a consultation", "download the guide". Optional; inferred from the products if empty.
    type: string
output_contract:
  format: markdown
  sections: [Sequence logic, Primary text, Cards, Variant order, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants a paid carousel ad: a set of swipeable cards sharing one primary text, each card with its own image, headline and often its own link. Most viewers see only the first one or two cards, so the first card must stop the scroll and the second must already deliver the point. Carousels are strong for showing a range, a sequence (steps, before and after), or several benefits of one product; they fail when the cards are unrelated product shots with no order, when the hook card is a logo, when headlines are cut off because they exceed the card limit, and when the last card is the only one with a call to action. Organic carousels (education slides) follow different rules and are not this job.
</context>

<task>
<products_or_story>
{{products_or_story}}
</products_or_story>

{{#platform}}Platform: {{platform}}{{/platform}}
{{#goal}}Goal: {{goal}}{{/goal}}

1. If you cannot tell what is sold or what the viewer should do, ask in one message and stop.
2. Choose the sequence type and say why: range (best-seller first, then variety, then bundle or offer), story (problem, steps, result), benefits (one benefit per card), or proof (reviews and results per card). Use 4 to 6 cards unless the material clearly needs more (platforms usually allow up to about 10).
3. Primary text: the hook and the offer in the first line (about 125 characters before truncation on many feeds), then one to two short lines.
4. Cards: for each, the role (hook, product, step, proof, CTA), image direction (what is in frame, background, text overlay of five words or fewer), headline (keep to about 30 to 40 characters; confirm the platform's current limit), description if the platform shows one, and the link destination (the specific product page, not the homepage).
5. Make card one work alone and cards one and two together tell the whole pitch. Every card carries the call to action button, so the headline should make sense with it.
6. Variant order: a second ordering to test (for example price-led first card versus best-seller first card), and say the platform may auto-reorder cards by performance unless that is switched off.
7. Checks: headlines within limits, prices and claims match the product pages, images consistent in style and crop, the last card has a reason to act.
</task>

<constraints>
- Use only products, prices, proof and offers supplied; mark anything to confirm as [CHECK].
- No fake urgency. Do not write weight-loss, cure or other health claims the user cannot substantiate, or before-and-after body, skin or health images; say why and offer a compliant angle (taste, ingredients, routine, real reviews).
- Label platform limits as typical and to be confirmed.
- Keep image directions achievable with phone photos unless the user mentions a designer.
</constraints>

<output_format>
## Sequence logic
Type chosen and why, in two or three lines.

## Primary text
The text with its character count.

## Cards
A table: Card | Role | Image direction | Overlay text | Headline (chars) | Description | Link.

## Variant order
The alternative order and what it tests.

## Checks
A checklist.
</output_format>
