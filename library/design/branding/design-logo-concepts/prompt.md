---
schema: 1
id: design-logo-concepts
kind: prompt
title: Generate logo concept directions
description: Generates logo concept directions, each with the idea behind it, symbol and wordmark notes, typography, colour and scaling checks, plus a brief for a designer or image model. Use for new brands.
category: branding
version: 1.0.0
status: incubating
stage: [design, discover]
role: [founder, designer, graphic-designer, marketer]
requires: [none]
inputs: [text, preferences]
output: [ideas, prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [logo-design, visual-identity, wordmark, design-brief, trademark-screening]
pairs_with:
  prompts: [name-brand, build-brand-platform, build-brand-guidelines, create-color-palette, pair-typefaces]
  personas: [brand-strategist]
args:
  - name: brand
    description: The brand name, what it offers, to whom, its positioning or personality, where the logo will appear most (app icon, signage, packaging, social avatar) and competitors' logos.
    type: text
    required: true
  - name: values
    description: What the brand stands for and the feelings the logo should create. Optional.
    type: text
  - name: dislikes
    description: Styles, symbols, colours or competitor looks to avoid. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Brief, Category conventions, Directions, Comparison, Recommendation, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Asked for a logo, a model usually returns a list of the category's clichés (a leaf for anything green, a lightbulb for ideas, a swoosh for anything fast) or image-model prompts that render garbled lettering. Useful concept work starts from what the brand must communicate and where the logo will live, explores directions that are genuinely different in idea, not just in colour, checks each one at small sizes and in one colour, and hands a designer something they can develop. It is also honest that originality and trademark availability must be checked, not assumed.
</context>

<task>
Develop logo concept directions.

<brand>
{{brand}}
</brand>
{{#values}}
<values>
{{values}}
</values>
{{/values}}
{{#dislikes}}
<dislikes>
{{dislikes}}
</dislikes>
{{/dislikes}}

1. **Brief.** Summarise in 4 to 6 lines: the name, what the logo must communicate (one idea, not five), personality, audience, the key applications and their constraints (the smallest size, single-colour uses, dark backgrounds, embroidery or signage). If the brand description is too thin to choose an idea (no name, no offer, no audience), ask up to three questions and stop.
2. **Category conventions.** List the visual clichés in this category (common symbols, colours and type styles) and say which convention is worth keeping for recognition and which to avoid for distinctiveness.
3. **Directions.** Write 4 distinct directions, at least one wordmark-led and at least one symbol-led. For each:
   - name and the core idea in one sentence, and how it connects to the brand;
   - type: wordmark, lettermark, symbol plus wordmark, emblem or a mascot;
   - symbol notes: the form, its construction (geometric or organic, built on a grid or drawn), what it shows and what it suggests;
   - wordmark notes: typeface classification and character (for example "a humanist sans with open apertures, custom 'g'"), case, weight, spacing, and any custom letter detail;
   - colour: a lead colour direction with the reason and how it differs from competitors; the logo must also work in one colour;
   - scaling and versatility: how it reads at 16 pixels as a favicon or app icon, in one colour, reversed out of a dark background, and in a horizontal and stacked lockup;
   - risks: clichés, unintended readings or shapes, cultural issues, and similarity to well-known marks to check;
   - a design brief of 3 to 5 sentences for a human designer;
   - an image-model prompt for a mood reference (focusing on the symbol, style and colour; flat vector style, plain background), with a note that image models render text unreliably, so the wordmark should be set by a designer.
4. **Comparison.** Score each direction 1 to 5 on distinctiveness in the category, fit with the brand idea, simplicity, scalability and longevity, with one line explaining each low score.
5. **Recommendation.** Recommend one or two directions to develop and what to explore next within them.
6. **Next steps.** Sketching and vector development by a designer, testing at real sizes and in context mock-ups, a quick preference and recall check with target customers, and a trademark clearance search by a qualified professional before adoption.
</task>

<constraints>
- Respect the dislikes. Do not propose symbols or styles the user ruled out.
- Do not imitate or closely reference existing well-known logos, and do not claim any concept is original or available; say it must be checked.
- Mood images from an image model are references, not final logos; final artwork must be vector, built and refined by a designer.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings. Each direction as a `###` subsection with bold field labels, and the image-model prompt in a code block. The comparison as a table: | Direction | Distinctive | Fit | Simple | Scalable | Lasting | Notes |
</output_format>
