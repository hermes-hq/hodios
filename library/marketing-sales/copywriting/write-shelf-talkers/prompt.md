---
schema: 1
id: write-shelf-talkers
kind: prompt
title: Write shelf talkers
description: Writes shelf talkers and staff-pick cards for a bookshop, wine shop, deli or gift shop - a hook, why staff love it, who it suits and the price - sized for a small card in the staff's voice.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, sales-rep]
subject: [retail]
requires: [none]
inputs: [notes, text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shelf-talker, staff-picks, point-of-sale, independent-shop, merchandising]
pairs_with:
  prompts: [write-product-description, write-gift-guide, write-sandwich-board-lines, write-retail-sales-approach]
args:
  - name: products_and_staff_notes
    description: Each product with name, price and the staff member's own notes on why they like it (taste, story, who they'd give it to, what it's like). Rough voice notes or bullet points are best; include the staff member's first name if the card will show it.
    type: text
    required: true
  - name: card_size
    description: Card size or space available (for example "A7 card, about 7 x 10 cm", "wine bottle neck tag", "bookshelf strip"). Optional.
    type: string
    default: A7 card, about 7 x 10 cm
output_contract:
  format: markdown
  sections: [Cards, Print notes, Details to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write shelf talkers for independent shops: the small handwritten-looking cards that turn a browser into a buyer by putting a real person's opinion next to the product. They work because they sound like a friend's recommendation, not an advert, and because they help someone choose between near-identical bottles, jars or books. They fail when they repeat the label, use tasting-note jargon nobody understands, or run so long that nobody reads them. A card is read in a few seconds from a metre away, so it holds about 25 to 40 words.

Card size: {{card_size}}
</context>

<task>
<products_and_staff_notes>
{{products_and_staff_notes}}
</products_and_staff_notes>

1. If a product has no staff notes, write nothing invented for it: list it under Details to check with two quick questions to ask the staff member.
2. For each product write a card with:
   - a hook of up to six words, written large (a feeling, a comparison or a use: "Tastes like a summer in Sicily", "For fans of quiet thrillers");
   - why staff love it, in two short lines that keep the staff member's own words and quirks;
   - "Try it if you like..." or "Perfect for..." naming something familiar the shopper already knows;
   - the price, and the staff name if given ("Mia's pick").
3. Keep each card within about 40 words, fewer for neck tags or narrow strips. Give the word count.
4. Vary hooks and openings across cards so a shelf of them does not read as a template.
5. Add print notes: font size for the hook so it reads at a metre, layout, and whether to hand-letter.
</task>

<constraints>
- Use only supplied facts. No invented awards, scores, origins, tasting notes or plot details; mark gaps as [X].
- Books: no spoilers past the set-up.
- Wine, beer and spirits: no health or mood claims, nothing suggesting drinking to excess or aimed at under-age shoppers.
- Food: do not claim vegan, gluten-free, allergen-free or organic unless supplied; point allergen questions to the label or staff.
- Keep the staff voice; do not polish it into ad copy.
</constraints>

<output_format>
## Cards
For each product: ### Product name, then the card text exactly as printed and the word count.

## Print notes
Three or four bullets.

## Details to check
Bullets: [X] items and questions for staff.
</output_format>
