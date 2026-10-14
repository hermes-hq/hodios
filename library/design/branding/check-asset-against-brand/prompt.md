---
schema: 1
id: check-asset-against-brand
kind: prompt
title: Check an asset against brand guidelines
description: Checks one design, document or piece of copy against the brand's own guidelines - logo, colour, type, imagery, voice and legal lines - and returns a pass, must-fix and should-fix list.
category: branding
version: 1.0.0
status: incubating
stage: [review, verify]
role: [graphic-designer, marketer, copywriter, content-creator]
requires: [none]
inputs: [image, text, document]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [brand-compliance, brand-guidelines, design-review, quality-check, brand-consistency]
pairs_with:
  prompts: [build-brand-guidelines, run-brand-audit, critique-graphic-design, write-brand-voice-guide]
  personas: [brand-strategist]
args:
  - name: asset
    description: The asset to check - an image or a precise description of the layout, plus all its text - and where it will be used.
    type: text
    required: true
  - name: guidelines
    description: The relevant brand rules - logo clear space, minimum size and versions, colour values, typefaces, imagery style, voice rules, required legal lines.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Checks, Must fix, Should fix, Guideline gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most brand drift happens one asset at a time: a stretched logo in a partner deck, a near-miss colour in a social post, a stock photo that breaks the imagery style, a headline in a voice the brand never uses. Brand teams cannot check everything, so a fast, consistent pre-publication check catches most of it. The check must be against the brand's own written rules, not personal taste, and must say when the guidelines are silent, because those gaps are where drift starts. It should also separate what blocks publication (wrong or distorted logo, missing legal line, inaccessible contrast) from what is merely below standard.
</context>

<task>
Check this asset against the brand guidelines.

<asset>
{{asset}}
</asset>

<guidelines>
{{guidelines}}
</guidelines>

If the asset is described too vaguely to check a rule (for example colour values or clear space), mark that check "cannot verify" and say what is needed.

1. **Verdict.** Ready, ready after must-fixes, or not ready, in one line.
2. **Checks.** Go through each area the guidelines cover: logo (version, clear space, minimum size, placement, background, no alteration), colour (values, proportions, contrast for text), typography (typefaces, weights, hierarchy, case), imagery (style, treatment, representation), layout (grid, margins), voice and copy (tone, vocabulary, mechanics), legal and mandatory lines, and accessibility basics (contrast, text size, alt text if digital). For each: pass, fail or cannot verify, citing the rule.
3. **Must fix.** Failures that block publication, each with the rule, what is wrong and the exact fix.
4. **Should fix.** Lower-priority deviations, with fixes.
5. **Guideline gaps.** Situations in this asset the guidelines do not cover, with a suggested rule for the brand team to decide.
</task>

<constraints>
- Judge against the guidelines given, not personal taste; label any taste-based remark as a suggestion.
- Do not invent rules or colour values the guidelines do not state.
- Be brief: the user needs a fix list, not an essay.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Checks as a table (Area, Rule, Result, Note). Must fix and should fix as numbered lists.
</output_format>
