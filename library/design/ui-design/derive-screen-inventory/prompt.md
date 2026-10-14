---
schema: 1
id: derive-screen-inventory
kind: prompt
title: Derive a screen inventory from a brief
description: Turns a feature brief or PRD into a complete inventory of screens, states, entry points, overlays and shared components, with open questions, before design or estimation starts.
category: ui-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [designer, product-manager, frontend-engineer, tech-lead]
requires: [none]
inputs: [spec, document, text]
output: [table, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [screen-inventory, feature-scope, state-coverage, design-planning, estimation]
pairs_with:
  prompts: [map-user-flow, write-prd, spec-mobile-screen-states, design-empty-and-error-states, create-wireframe-spec]
  personas: [product-designer]
args:
  - name: brief
    description: The feature brief, PRD or user stories, plus the platforms in scope.
    type: text
    required: true
  - name: existing_product
    description: Relevant existing screens and components the feature will reuse or change, and the user roles. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope summary, Screen inventory, State matrix, Entry points, Shared components, Changes to existing screens, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Estimates and design plans go wrong when the team counts only the happy-path screens in the brief. Each feature also needs empty, loading, error, permission-denied and partial states, confirmation and success views, overlays, emails or notifications that land somewhere, settings, and changes to existing screens such as navigation and lists. Different roles see different versions. Listing all of this up front, before anyone opens a design tool, turns hidden work into visible scope and surfaces the questions the brief does not answer.
</context>

<task>
<brief>
{{brief}}
</brief>
{{#existing_product}}

<existing_product>
{{existing_product}}
</existing_product>
{{/existing_product}}

If the brief does not say what the feature lets users do, ask and stop.

1. **Scope summary.** The user goals the feature serves, roles involved, and platforms, in a few lines.
2. **Screen inventory.** Every new screen, page, panel, dialog, sheet and message surface needed, with an id (S1, S2...), name, purpose, role, platform, and whether it is new or a change. Include settings, admin views, notifications and emails that link into the product, and success or confirmation views.
3. **State matrix.** For each screen, which states it needs: first use or empty, loading, populated, partial or long content, error, offline, no permission, read-only, and any feature-specific states (expired, pending approval).
4. **Entry points.** How users reach each screen (navigation, deep link, notification, email, search, another screen) and what happens if they arrive without context or access.
5. **Shared components.** Components reused across screens, which exist already, which are new, and which existing ones need new variants.
6. **Changes to existing screens.** Navigation, lists, detail pages, search results, settings and onboarding that must change.
7. **Open questions.** What the brief leaves undecided that changes the inventory, each with the screens it affects.
</task>

<constraints>
- List only what the brief implies or clearly requires; mark inferred items [inferred] so the team can cut them.
- Do not design the screens; name and scope them.
- Do not estimate effort in time; the inventory is the input to estimation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope summary
## Screen inventory
| Id | Screen | Purpose | Role | Platform | New or change |
## State matrix
| Id | Empty | Loading | Error | Offline | No permission | Other states |
## Entry points
## Shared components
| Component | Exists | Used in | Notes |
## Changes to existing screens
## Open questions
| Question | Screens affected |
</output_format>
