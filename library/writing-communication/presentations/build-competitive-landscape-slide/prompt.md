---
schema: 1
id: build-competitive-landscape-slide
kind: prompt
title: Build a competitive landscape slide
description: Builds one fair competitor comparison slide, as a table or a 2x2, with criteria that buyers care about, honest weaknesses on your side and a source for every claim.
category: presentations
version: 1.0.0
status: incubating
stage: [design, build]
role: [founder, product-manager, marketer, sales-rep]
requires: [none]
inputs: [notes, text]
output: [table, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [competitor-comparison, 2x2-matrix, market-map, pitch-deck, harvey-balls]
pairs_with:
  prompts: [analyze-competitors, write-competitive-battlecard, write-pitch-deck-outline, add-sources-to-slides]
  personas: [presentation-designer]
args:
  - name: product
    description: Your product or offer and who it is for.
    type: text
    required: true
  - name: competitors
    description: The competitors and what you know about each, with sources if you have them (websites, reviews, pricing pages, analyst notes).
    type: text
    required: true
  - name: audience
    description: Who sees the slide, such as investors, a prospect, the board or an internal strategy review.
    type: text
    required: true
  - name: format
    description: The slide format you want.
    type: enum
    enum: [table, two-by-two, unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Format choice, Criteria, Slide, Sources and gaps, Speaker notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build the competitive slide in a deck. Experienced audiences distrust the classic version: a feature table where only "us" has every tick, or a 2x2 with axes chosen so the company sits alone top right. Investors and buyers know the competitors and will spot a rigged slide, and one rigged slide costs credibility for the whole deck. A good competitive slide picks criteria the buyer actually uses to choose (price model, the segment served, time to value, integrations, support), includes the alternatives buyers really consider (including spreadsheets, doing nothing or building in-house), shows where competitors are genuinely strong, and makes the one real difference obvious. A 2x2 only works when both axes are real, measurable dimensions that matter to the buyer; otherwise a short table with three to six criteria is clearer. Every claim about a competitor should be traceable and dated, because products and prices change.

Product: {{product}}
Competitors and what is known: {{competitors}}
Audience: {{audience}}
Preferred format: {{format}}
</context>

<task>
1. Decide the format. Recommend a 2x2 only if two independent buyer-relevant axes exist in the material; otherwise a table. Explain the choice in one or two sentences.
2. Pick three to six criteria that a buyer in this market uses to choose, and say why each matters. Include at least one where a competitor beats the product if the material supports it.
3. Add the realistic alternatives buyers consider, such as the status quo or building in-house, if they are missing.
4. Build the slide: an assertion title stating the one real difference, then the table (use words or simple ratings with a legend, not ticks only) or the 2x2 with named axes and each player's position justified.
5. Attach a source and date to each competitor claim from the input, and mark every cell that is unsupported as "to verify" instead of filling it.
6. Write short speaker notes that acknowledge competitors' strengths and explain where the product wins and for whom.
</task>

<constraints>
- Do not invent competitor features, prices, customer numbers or funding. If the input does not say, mark it "to verify".
- No disparaging language about competitors; describe, do not mock.
- Do not choose criteria only because the product wins them; say so if the honest comparison is less favourable than hoped.
- Use competitor names only as given; do not add logos or trademarks you have not been given.
</constraints>

<output_format>
## Format choice
Table or 2x2, and why.

## Criteria
Each criterion with why buyers care.

## Slide
Title, then the table or the 2x2 description (axes, positions), plus legend.

## Sources and gaps
Each claim with its source and date, and the cells marked "to verify".

## Speaker notes
Three to six sentences.
</output_format>
