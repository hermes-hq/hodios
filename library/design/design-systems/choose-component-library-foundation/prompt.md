---
schema: 1
id: choose-component-library-foundation
kind: prompt
title: Choose a foundation for a component library
description: Compares building components from scratch, on a headless behaviour library, or on a styled UI kit, scores each against your constraints and recommends one with its exit costs.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan, design]
role: [frontend-engineer, tech-lead, architect, designer]
requires: [none]
inputs: [text, spec]
output: [report, table, adr]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [build-vs-buy, headless-ui, ui-kits, vendor-evaluation, proof-of-concept]
pairs_with:
  prompts: [build-design-system-business-case, design-component-api, write-adr]
  personas: [design-systems-lead, frontend-engineer]
args:
  - name: context
    description: Frameworks in use (and any planned), number of products and teams, how distinctive the brand must look, accessibility target, platforms, server rendering needs, and team skills.
    type: text
    required: true
  - name: candidates
    description: Optional. Specific libraries you are considering, one per line.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Requirements, Options, Comparison, Recommendation, Exit costs, Proof of concept, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams starting a component library choose between three families. Building from scratch gives full control but makes you own the hardest accessibility work: comboboxes, menus, date pickers, dialogs and data grids take months to get right across browsers and assistive technologies. Headless or unstyled behaviour libraries supply that behaviour and accessibility and leave styling to your tokens, which suits distinctive brands. Styled UI kits are fastest to start but fight you when the brand diverges from their defaults, and their theming limits and upgrade cadence become your constraints. A newer variant is copy-in source, where you vendor the component code into your repository and own it from then on. The decision turns on brand distinctiveness, framework spread (several frameworks may point to web components or framework-agnostic behaviour layers), accessibility quality you have verified yourself, server rendering, right-to-left support, licence, and maintenance health. Library facts change fast, so any claim about a specific library must be checked against its current repository and docs.
</context>

<task>
Recommend a foundation for this component library.

<context_from_user>
{{context}}
</context_from_user>
{{#candidates}}

<candidates>
{{candidates}}
</candidates>
{{/candidates}}

1. **Requirements.** Turn the context into weighted criteria: brand distinctiveness, framework coverage, accessibility, theming with tokens, server rendering, right-to-left, bundle size, licence, maintenance health, team skills, time to first release.
2. **Options.** Describe the families that fit (from scratch, headless behaviour layer plus your styling, styled kit with theming, copy-in source) and, if candidates were named, place each in a family. Mark every factual claim about a named library "verify against current docs".
3. **Comparison.** Score each option against the weighted criteria with a short reason per score.
4. **Recommendation.** One option, why it wins for this context, and the two conditions that would change the answer.
5. **Exit costs.** What it would cost to leave the chosen option later (rewrite, re-theme, migration of consumers), and how to keep that cost low (wrap third-party components behind your own API, keep tokens independent).
6. **Proof of concept.** A two to three week plan: build the three hardest components the products need (for example combobox, date picker, data table) with your tokens, then test keyboard and screen reader behaviour, theming, server rendering and bundle size, and decide against pass criteria set up front.
7. If a candidate is claimed to be "certified accessible", explain that libraries are not certified as a whole and that conformance must be tested in your own use.
</task>

<constraints>
- Do not state version numbers, download counts, maintainer status or licence terms of named libraries as fact; tell the reader to verify them.
- Do not recommend a library that does not support a framework the context requires without saying so.
- Keep the recommendation conditional on the proof of concept.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Requirements and comparison as tables. Proof of concept as a dated checklist relative to a start date. End with Open questions. Keep the recommendation short enough to paste into an architecture decision record.
</output_format>
