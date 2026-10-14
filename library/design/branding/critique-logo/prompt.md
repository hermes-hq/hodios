---
schema: 1
id: critique-logo
kind: prompt
title: Critique a logo
description: Critiques a logo for fit with the brand, distinctiveness, reproduction at small sizes and in one colour, wordmark craft, unintended readings and resemblance risks, with prioritised fixes.
category: branding
version: 1.0.0
status: incubating
stage: [review]
role: [graphic-designer, founder, marketer]
requires: [none]
inputs: [image, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [logo-design, design-critique, wordmark, scalability, visual-identity]
pairs_with:
  prompts: [design-logo-concepts, vet-brand-name, critique-graphic-design, build-brand-guidelines]
  personas: [brand-strategist, art-director]
args:
  - name: logo
    description: The logo as an image, or a precise description of it (symbol, wordmark, typeface, colours, versions), plus any alternatives being compared.
    type: text
    required: true
  - name: brand
    description: What the brand is, who it serves, its category and competitors, and what the logo should express.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the logo is trying to say, What works, Biggest problem, Reproduction tests, Detail notes, Resemblance and risk flags, Recommendations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People judge logos on taste ("I like blue"), but a logo's job is narrower: to be recognised and remembered as this brand, everywhere it appears. Experienced designers test a mark before they judge it: at 16 pixels as a favicon and app icon, in one colour, reversed out of a dark background, embroidered or engraved, and as a sketch drawn from memory after a few seconds' look. They check the wordmark's spacing and letter shapes, look for unintended shapes when the mark is rotated or seen small, and compare it with the category: a logo that looks like every competitor is invisible, one that resembles a specific well-known mark is a legal and reputational risk. A logo does not have to explain the business; it has to be distinctive and appropriate.
</context>

<task>
Critique this logo.

<logo>
{{logo}}
</logo>

<brand>
{{brand}}
</brand>

If you only have a vague description and cannot judge shapes or type, say which details you need (or ask for an image) and critique only what you can.

1. **What the logo is trying to say.** Your reading of its idea in one or two sentences, and whether that fits the brand described.
2. **What works.** Specific strengths worth protecting in any revision.
3. **Biggest problem.** The single issue that most limits the logo, with the reason.
4. **Reproduction tests.** Assess, one by one: 16 to 32 px (favicon, app icon, social avatar crop in a circle), one colour, reversed, very large, embroidery or engraving if relevant, and the memory test. State pass, risk or fail and why.
5. **Detail notes.** Wordmark spacing and kerning, letterform consistency, weight balance between symbol and type, optical alignment, stroke thickness at small sizes, colour contrast and colour-blind safety, and lock-up versions (horizontal, stacked, symbol only).
6. **Resemblance and risk flags.** Category clichés the logo shares with competitors; any resemblance to a specific well-known mark you are confident about (marked "to verify"); unintended readings (shapes, letters, gestures or words visible when rotated, small or in other languages). Say that a proper trademark search is still needed before investing.
7. **Recommendations.** Prioritised changes (must, should, could), each with the reason and a direction, not a full redesign.
</task>

<constraints>
- Critique the work, not the person; name strengths before problems.
- Do not claim a logo is legally safe or free to register; similarity and trademark questions need a proper search and, for important decisions, a trademark lawyer.
- Do not invent competitors' logos or details; mention only what you are confident about.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Reproduction tests as a table (Test, Result, Why). Recommendations as a table (Priority, Change, Reason).
</output_format>
