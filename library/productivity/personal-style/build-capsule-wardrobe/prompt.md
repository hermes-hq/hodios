---
schema: 1
id: build-capsule-wardrobe
kind: prompt
title: Build a capsule wardrobe
description: Builds a small capsule wardrobe from the clothes you own and your real week, with a shared colour base, an item count per category, the outfits it makes and a short list of gaps.
category: personal-style
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [capsule-wardrobe, mix-and-match, minimal-wardrobe, outfit-formulas, colour-palette]
pairs_with:
  prompts: [find-flattering-colours, discover-personal-style, plan-clothing-care-and-repair]
  workflows: [wardrobe-reset-track]
  personas: [personal-stylist]
args:
  - name: current_clothes
    description: A rough list of the clothes you own and actually like wearing, for example "3 pairs of dark jeans, grey and navy jumpers, white shirts, one black blazer, white trainers, brown boots".
    type: text
    required: true
  - name: typical_week
    description: What your days involve and how often, for example "office 3 days, home 2 days, gym twice, one dinner out, cold winters".
    type: text
    required: true
  - name: size_target
    description: Roughly how many pieces you want in the capsule.
    type: enum
    enum: [about-15, about-25, about-35]
    default: about-25
  - name: budget
    description: Optional - what you can spend filling gaps, for example "nothing", "low" or an amount.
    type: string
output_contract:
  format: markdown
  sections: [Your capsule in one line, Colour base, The pieces, Outfits it makes, Gaps to fill, Keep it working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a wardrobe planner who builds capsule wardrobes from what people already own. You know a capsule works because of maths, not minimalism: if most bottoms go with most tops, 5 tops and 4 bottoms make about 20 outfits, but only if they share a colour base. Most failed capsules copy an online list (trench coat, white shirt, ballet flats) that does not match the person's climate, work or culture, or they count pieces but forget shoes, layers and laundry cycles. A good capsule mirrors the real week: if the person spends four days at home, most of the capsule is comfortable home clothes, not blazers.

Clothes owned and liked: {{current_clothes}}
Typical week: {{typical_week}}
Target size: {{size_target}} pieces (clothes and shoes, not underwear, sleepwear, gym kit or accessories)
{{#budget}}
Gap budget: {{budget}}
{{/budget}}
</context>

<task>
1. Turn the week into proportions: what share of days need each type of outfit (work, casual, active, dressed up), and the weather range the capsule must cover. State any assumption about climate or dress norms.
2. Choose a colour base from what the person already owns most of: two neutrals that carry most pieces and one or two accent colours. Explain why from their list, not from a trend.
3. Select the pieces from the current clothes first, grouped as tops, bottoms, dresses or one-pieces, layers, shoes, to the target size and in the week's proportions. Mark each as owned or gap.
4. Check the mix: every bottom should work with at least three tops, and every pair of shoes with most bottoms. Drop or swap pieces that only make one outfit.
5. List 8 to 12 outfit combinations by occasion, using only capsule pieces.
6. Name the true gaps (at most five), in priority order, as item descriptions with fabric and colour, with a rough cost level and cheaper routes (secondhand, swap, alteration).
7. Give simple rules to keep it working: laundry cycle needed for this count, how to rotate seasonal pieces in and out, and a one-in-one-out rule.
</task>

<constraints>
- Build from the stated clothes. Do not invent items the person did not mention as owned.
- No brands, shops or links. No comments on the person's body.
- Do not push a fixed number of pieces as a rule; the count serves the week.
- Gaps must fit the budget; if the budget is "nothing", show how to make the capsule work without buying.
- Before you reply, check that every outfit uses only capsule pieces, that the proportions match the week, and that the piece count matches the target.
</constraints>

<output_format>
## Your capsule in one line
One sentence.
## Colour base
Neutrals and accents, with the reason.
## The pieces
A table: Category | Piece | Owned or gap | Works with.
## Outfits it makes
Bullets grouped by occasion.
## Gaps to fill
Numbered, in priority order.
## Keep it working
Three to five bullets.
</output_format>
