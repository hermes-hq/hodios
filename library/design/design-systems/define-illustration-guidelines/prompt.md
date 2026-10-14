---
schema: 1
id: define-illustration-guidelines
kind: prompt
title: Define product illustration guidelines
description: Defines a product's illustration system with style rules, palette, people depiction, use cases and sizes, dark mode, alt text, and what to avoid, so every illustrator matches.
category: design-systems
version: 1.0.0
status: incubating
stage: [design]
role: [designer, graphic-designer]
requires: [none]
inputs: [text, image]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [illustration, visual-language, brand-consistency, alt-text, usage-guidelines]
pairs_with:
  prompts: [define-iconography, write-illustration-commission-brief, design-dark-mode, write-ux-pattern-guideline]
  personas: [design-systems-lead]
args:
  - name: brand
    description: Brand personality, palette with hex values, typefaces, and existing illustrations or references (describe them or attach images).
    type: text
    required: true
  - name: uses
    description: Where illustrations appear or will appear, such as empty states, onboarding, errors, marketing pages, emails.
    type: text
    required: true
  - name: constraints
    description: Optional. Who will make illustrations (in-house, freelancers, a stock library), dark mode needs, localisation, and file formats.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Role of illustration, Style rules, Colour, People and objects, Use cases and sizes, Accessibility and localisation, Production and files, Do and do not, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Illustration drifts faster than any other part of a visual language because every new illustrator brings their own hand. Guidelines that keep it consistent describe measurable attributes, not adjectives: line weight relative to canvas size, corner treatment, perspective (flat, isometric, three-quarter), shading method, texture, level of detail at each size, and a restricted palette with ratios (mostly neutrals, one accent). People need explicit rules: how bodies, faces and skin tones are drawn, how diversity is represented without tokenism, and avoiding stereotyped roles. Product illustration also has jobs and limits that marketing art does not: an empty state illustration must not push the call to action below the fold, an error state that blocks someone's money or data should be calm or have no illustration at all, and illustrations should carry no text so they do not need re-drawing per language. Each illustration is either decorative (empty `alt` text) or informative (alt text that says what it shows), and must hold up in dark mode, which usually needs a separate variant rather than an automatic inversion.
</context>

<task>
Define illustration guidelines for this product.

<brand>
{{brand}}
</brand>

<uses>
{{uses}}
</uses>
{{#constraints}}

<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}

1. **Role of illustration.** What illustration does for this product and where it should not appear. Be explicit about serious or blocking moments (payment failures, data loss, security warnings).
2. **Style rules.** Measurable rules: stroke weight per size, corner radius, perspective, fills and shading, texture, level of detail, composition and negative space. Tie them to the brand's shapes and type.
3. **Colour.** The illustration palette as a subset of the brand palette with hex values from the input, proportions, and the accent rule. Add a dark mode variant approach.
4. **People and objects.** How people are drawn, skin tone and body diversity rules, hands and faces, clothing and settings that avoid stereotypes, and how product UI appears inside illustrations (simplified, no real data).
5. **Use cases and sizes.** A table per use case (spot, empty state, onboarding, error, hero, email) with size range, detail level, placement relative to text and actions, and an example subject for this product.
6. **Accessibility and localisation.** Decorative versus informative and the alt text rule for each; no text inside illustrations; avoid gestures and symbols with different meanings across cultures; motion versions follow reduced-motion settings.
7. **Production and files.** Canvas sizes, export formats (SVG for flat art), naming, where source files live, review steps before an illustration ships, and how to brief new illustrators.
8. **Do and do not.** Eight to twelve paired rules a reviewer can check quickly.
</task>

<constraints>
- Use only the brand colours and references given; derived tints are labelled.
- Do not name or imitate a living illustrator's style or a known brand's illustration system as the target.
- If the user plans to use AI-generated or stock illustration, list licensing and consistency questions to settle rather than assuming they are fine.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Use cases as a table, Do and do not as a two-column table. End with Open questions.
</output_format>
