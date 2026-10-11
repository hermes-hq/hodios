---
schema: 1
id: design-brand-graphic-device
kind: prompt
title: Design a brand graphic device
description: Develops a brand's ownable graphic device - pattern, shape, frame or supergraphic - from the brand idea, with concept options, construction and usage rules, and tests across real applications.
category: branding
version: 1.0.0
status: incubating
stage: [design]
role: [graphic-designer, designer, marketer]
requires: [none]
inputs: [text, image]
output: [ideas, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [graphic-device, brand-pattern, supergraphic, visual-identity, distinctive-assets]
pairs_with:
  prompts: [design-logo-concepts, build-brand-guidelines, create-color-palette, define-iconography]
  personas: [brand-strategist, art-director]
args:
  - name: brand
    description: The brand idea or platform, personality, logo, colours and typefaces.
    type: text
    required: true
  - name: applications
    description: Where the identity must work, for example packaging, social posts, signage, presentations, merchandise, app screens.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Role of the device, Source idea, Concept directions, Construction rules, Usage rules, Application tests, Production brief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A logo is too small and too precious to carry an identity alone. The graphic device (a pattern, a shape, a frame, a crop, a line, a supergraphic) is what makes a brand recognisable when the logo is tiny or absent: on a shopping bag, a slide, a social post or a building. Good devices come from the brand idea or the logo's own geometry, are simple enough for anyone to apply, and are flexible (they crop, scale and combine with photography) while staying unmistakable. They fail when they are decoration with no link to the brand, when they are so complex only the original designer can use them, or when the rules are vague so every team invents its own version.
</context>

<task>
Develop a graphic device for this brand.

<brand>
{{brand}}
</brand>

<applications>
{{applications}}
</applications>

1. **Role of the device.** What it must do in this identity (signal the brand when the logo is absent, hold layouts together, frame photography, add energy), and its relationship to the logo.
2. **Source idea.** Where the device could come from: the brand idea, the logo's geometry, the product, the place, the name. Name two or three sources.
3. **Concept directions.** Three directions, each with the idea, a precise verbal description of the form, how it behaves (crops, scales, repeats, animates), and what makes it ownable in this category.
4. **Construction rules.** For the recommended direction: geometry, proportions, grid or modular unit, line weights, colour combinations, and how it is built in files so others can reuse it (components, symbols, pattern swatches).
5. **Usage rules.** When to use it and when not, how much of a layout it may take, interaction with photography and text (never behind body text, contrast), with the logo (clear space, never touching), and do and don't examples.
6. **Application tests.** Describe how it looks on each application listed, including the smallest (an app icon or social avatar) and the largest, and in one colour.
7. **Production brief.** What a designer must deliver: master artwork, a pattern library, templates and a page for the brand guidelines.
</task>

<constraints>
- Every direction must be traceable to the brand, not decoration.
- Keep it simple enough that a non-designer using a template can apply it correctly.
- Avoid forms that closely resemble well-known competitors' devices; mark any concern to check.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Concept directions as a table (Direction, Idea, Form, Behaviour, Ownability). Usage rules as do and don't lists. Application tests as a table (Application, How it appears, Risk).
</output_format>
