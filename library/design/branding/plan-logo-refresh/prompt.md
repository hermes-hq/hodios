---
schema: 1
id: plan-logo-refresh
kind: prompt
title: Plan a logo refresh
description: Plans the evolution of an existing logo by testing the reasons, auditing which elements carry recognition, deciding what to keep, change or drop, and briefing the redraw, tests and rollout.
category: branding
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, marketer, founder, executive]
requires: [none]
inputs: [text, image]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [logo-design, logo-evolution, distinctive-assets, visual-identity, brand-equity]
pairs_with:
  prompts: [plan-rebrand, run-brand-audit, build-brand-guidelines]
  personas: [brand-strategist]
args:
  - name: logo
    description: The current logo and its history - elements, colours, typeface, versions, how long it has been used and where it appears most.
    type: text
    required: true
  - name: reasons
    description: Why a refresh is being considered (looks dated, fails on screens, new product lines, merger, new leadership) and any evidence.
    type: text
    required: true
  - name: constraints
    description: Budget, deadline, number of places the logo appears (signs, vehicles, packaging, uniforms) and any parts stakeholders insist on keeping. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Reasons check, Recognition audit, Keep change drop, Refresh directions, Responsive versions, Testing, Rollout and transition, Designer brief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A logo refresh is an evolution: keep what customers recognise, fix what no longer works. Insiders get bored of a logo years before customers do, so "it feels dated" is a weak reason on its own; failing at small screen sizes, an inconsistent mess of versions, or a business that has outgrown the mark are strong ones. The risk is throwing away recognition: research on distinctive brand assets shows that the colours, shapes and characters customers link to a brand took years to build. Redesigns that removed a well-known element have been reversed after customer backlash. A good refresh identifies which elements carry recognition, keeps them, and modernises the rest: redrawn letterforms, simplified details, consistent proportions, and a family of versions for small spaces.
</context>

<task>
Plan a refresh of this logo.

<logo>
{{logo}}
</logo>

<reasons>
{{reasons}}
</reasons>
{{#constraints}}

<limits>
{{constraints}}
</limits>
{{/constraints}}

1. **Reasons check.** Sort the reasons into strong (functional failure, strategy change, inconsistency) and weak (internal boredom, trend-chasing), and say whether a refresh, a full rebrand or tidying the current versions is the right response.
2. **Recognition audit.** For each element (colour, symbol, shape, letterforms, name presentation, tagline), estimate how much recognition it carries and say how to check that cheaply (asking customers to describe or sketch the logo, recognition tests with the name hidden).
3. **Keep change drop.** A table of elements with the decision and the reason.
4. **Refresh directions.** Two or three directions on a scale from light touch (redraw and simplify) to bolder evolution, each with what changes, what stays, and the risk.
5. **Responsive versions.** The family needed: primary, horizontal and stacked lock-ups, symbol or monogram for small spaces and app icons, one-colour and reversed versions, and minimum sizes.
6. **Testing.** Recognition and preference tests with existing customers before final decisions, plus reproduction tests (favicon, signage, embroidery).
7. **Rollout and transition.** Where the logo appears, in priority order; what changes immediately (digital), what changes at natural replacement (stationery, uniforms) and what is phased (signs, vehicles); how to explain the change to customers and staff, and a date to retire old files.
8. **Designer brief.** A short brief covering the reasons, elements to keep, directions to explore, versions needed and tests.
</task>

<constraints>
- Do not cite specific companies' logo controversies unless you are confident of the facts; describe the pattern instead.
- If the reasons are weak, say so plainly and recommend the cheaper option.
- Do not give cost figures; describe relative effort.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Recognition audit and keep-change-drop as tables. Rollout as a table (Touchpoint, When, Approach). Designer brief as a short bulleted list.
</output_format>
