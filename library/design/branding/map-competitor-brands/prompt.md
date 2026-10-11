---
schema: 1
id: map-competitor-brands
kind: prompt
title: Map competitor brands and category codes
description: Maps how competitors look and sound - names, logos, colours, type, imagery, voice and claims - to find the category's shared codes, a positioning map and the gaps where a brand can stand out.
category: branding
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [marketer, founder, graphic-designer, consultant]
requires: [none]
inputs: [text, image, notes]
output: [report, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [competitive-analysis, category-codes, differentiation, visual-identity, brand-strategy]
pairs_with:
  prompts: [analyze-competitors, build-brand-platform, design-logo-concepts, run-brand-audit]
  personas: [brand-strategist]
args:
  - name: category
    description: The market and category, for example "oat milk in UK supermarkets" or "independent accounting firms for freelancers in Lisbon".
    type: string
    required: true
  - name: competitors
    description: The competitors and what you have observed about each - name, logo, colours, typefaces, imagery, tagline, tone of voice, packaging or website notes, price level. Screenshots welcome.
    type: text
    required: true
  - name: brand
    description: Your own brand or idea, if it exists. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Landscape table, Category codes, Positioning map, Distinctiveness gaps, Codes to keep and to break, Implications for our brand, Evidence gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every category develops codes: shared colours, shapes, words and imagery that tell shoppers what kind of thing they are looking at (green and leaves for natural products, navy and shields for insurance, handwritten fonts for craft goods). Codes help a brand be understood; copying all of them makes it invisible. Brand strategists map the landscape before designing: what everyone does (codes to keep so people know what you are), what nobody does (possible space to own), and which codes are tired. Competitor analyses usually focus on features and price and miss this expressive layer. Perceptual maps help only when the two axes are things customers actually care about, not invented to put your brand alone in a corner.
</context>

<task>
Map the brand landscape in {{category}}.

<competitors>
{{competitors}}
</competitors>
{{#brand}}

<our_brand>
{{brand}}
</our_brand>
{{/brand}}

If fewer than three competitors are described, say the map will be thin and ask for more, but continue with what you have.

1. **Landscape table.** One row per competitor with name style, logo type, main colours, typography, imagery, voice, key claim and price signal, using only what the user gave you or what you are confident of (marked "to verify").
2. **Category codes.** The codes most competitors share (colour, shape, words, imagery, packaging structure, claims), with how many use each, and what each signals to customers.
3. **Positioning map.** Two axes chosen from dimensions customers care about in this category (explain why), with every competitor placed, drawn as a simple text or table diagram; note crowded and empty areas, and whether empty areas are empty because nobody wants to be there.
4. **Distinctiveness gaps.** Colours, shapes, tones of voice and claims no competitor owns.
5. **Codes to keep and to break.** Which codes a new or repositioned brand should keep to be understood, which to break to stand out, and the risk of breaking each.
6. **Implications for our brand.** If a brand is given: where it sits now, where it could move, and what that means for naming, logo, colour, imagery and voice. If not, describe two or three possible positions.
7. **Evidence gaps.** What to collect to firm this up: photos of the shelf or search results page, customer interviews about what signals quality, more competitors.
</task>

<constraints>
- Do not invent competitors' colours, slogans, prices or claims; use the user's observations and mark your own knowledge "to verify".
- Base the map axes on customer-relevant dimensions, not on flattering ones.
- Do not recommend copying a competitor's distinctive assets.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Landscape and codes as tables. Positioning map as a small text grid or a table listing quadrant and brands.
</output_format>
