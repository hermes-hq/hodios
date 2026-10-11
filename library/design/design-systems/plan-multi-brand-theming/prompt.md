---
schema: 1
id: plan-multi-brand-theming
kind: prompt
title: Plan multi-brand theming
description: Designs a theming architecture so one component library serves several brands or white-label clients, defining what brands may change, token layers, delivery and testing.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, plan]
role: [designer, frontend-engineer, architect]
requires: [none]
inputs: [text, spec]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [multi-brand, white-label, theming, design-tokens, brand-variation]
pairs_with:
  prompts: [define-design-tokens, generate-platform-token-files, design-dark-mode]
  personas: [design-systems-lead]
args:
  - name: brands
    description: The brands or clients to support, how different they need to look, who supplies brand values (your team or clients), and how many there will be.
    type: text
    required: true
  - name: platforms
    description: Platforms and how they consume tokens, e.g. "React web with CSS variables, iOS and Android apps".
    type: string
    required: true
  - name: context
    description: Optional. Existing token structure, modes already supported (light, dark, density), and known problems with the current approach.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Brand variation model, Token architecture, Component rules, Theme delivery, Accessibility per brand, Testing, Governance, Risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Multi-brand systems work when the team decides up front what a brand is allowed to change. Usually that is colour, typography, corner radius, maybe elevation style, imagery and icons; behaviour, layout, interaction patterns and accessibility stay shared. Without that line, brands accumulate component forks and the system becomes several systems. The token structure that scales keeps component code reading only semantic tokens and lets each brand supply its own primitive set mapped to those semantic names, with component-level tokens only where a brand must diverge. The traps experts watch for are the combination explosion (brands times light and dark times density), white-label clients supplying colours that fail contrast, typefaces with different metrics breaking layouts, font licences that do not cover every platform, and runtime theme switching that flashes the wrong brand on load.
</context>

<task>
Design a multi-brand theming approach.

<brands>
{{brands}}
</brands>

Platforms: {{platforms}}.
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **Brand variation model.** A table of properties (colour, typeface, type scale, radius, spacing, elevation, iconography, illustration, motion, component behaviour, layout) marked brand-variable, shared, or variable within limits, with the reason. Argue for the smallest variable set that meets the brands' needs.
2. **Token architecture.** Layers and naming: shared semantic tokens that components read, brand primitive sets, how each brand maps to the semantic layer, and when a component token is allowed. Show how brand and mode (light, dark, density) combine without writing every combination by hand.
3. **Component rules.** What components may and may not do per brand. How a brand gets a different look for one component without forking it. What counts as a fork and how it is prevented.
4. **Theme delivery.** Build-time versus runtime selection for each platform, how a brand is chosen (domain, tenant setting, app build flavour), avoiding a flash of the wrong brand, font loading per brand, and asset delivery.
5. **Accessibility per brand.** Every brand and mode must pass text and non-text contrast. For client-supplied colours, define a validation step and a rule (adjust the tone, compute an accessible foreground, or reject) rather than shipping failures.
6. **Testing.** Which brand, mode and component combinations are tested automatically and visually, and how the matrix stays manageable (test every brand on a representative set, every component on the default brand).
7. **Governance.** How a new brand is onboarded (a checklist and the values it must supply), who approves brand-specific component tokens, and how changes to shared components are checked against all brands.
8. If the brands differ in behaviour or flows rather than look, say that this is not theming and what it means for the architecture.
</task>

<constraints>
- Do not invent the brands' colour values, typefaces or existing token names; use placeholders and mark proposals.
- Font licensing is a legal question; flag it per platform rather than asserting what a licence covers.
- Keep component code reading semantic tokens only; never propose per-brand conditionals inside components.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Brand variation model and token layers as tables, plus a short token file excerpt for two brands. End with Open questions.
</output_format>
