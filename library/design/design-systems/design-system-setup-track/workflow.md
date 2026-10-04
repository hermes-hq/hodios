---
schema: 1
id: design-system-setup-track
kind: workflow
title: Set up a first design system
description: Sets up a first design system in gated steps - UI audit, tokens, the first ten components, usage docs, a pilot with one product team and a governance plan.
category: design-systems
version: 1.0.0
status: incubating
stage: [discover, design, ship]
role: [designer, frontend-engineer, tech-lead]
requires: [none]
inputs: [text, image, spec]
output: [plan, docs, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-tokens, first-release, ui-audit, pilot-team, design-system-governance]
pairs_with:
  prompts: [audit-design-consistency, define-design-tokens, write-component-spec, plan-design-system-governance, measure-design-system-adoption]
  personas: [design-systems-lead]
args:
  - name: products
    description: The products the system must serve - platforms, tech stack, how many screens or apps, and anything already shared between them (a style guide, a UI kit, a component folder).
    type: text
    required: true
  - name: team
    description: Who will build and run the system and how much of their time it gets, for example "one designer at 50%, two frontend engineers at 20%, no dedicated owner yet".
    type: text
    required: true
  - name: tooling
    description: Design and code tools in use, for example "Figma, React with CSS modules, Storybook, a monorepo". Leave empty if undecided.
    type: text
output_contract:
  format: markdown
  sections: [UI audit, Token foundation, First components, Usage documentation, Pilot, Governance plan]
steps:
  - {id: ui-audit, file: steps/01-ui-audit.md, stage: discover, gate: approve, artifact: ui-audit}
  - {id: token-foundation, file: steps/02-token-foundation.md, stage: design, gate: approve, artifact: token-foundation}
  - {id: first-components, file: steps/03-first-components.md, stage: design, gate: approve, artifact: component-shortlist}
  - {id: usage-documentation, file: steps/04-usage-documentation.md, stage: design, gate: approve, artifact: docs-plan}
  - {id: pilot, file: steps/05-pilot.md, stage: ship, gate: approve, artifact: pilot-plan}
  - {id: governance-plan, file: steps/06-governance-plan.md, stage: ship, gate: none, artifact: governance-plan}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a team from scattered UI to a first, small design system that one real product team uses. Most first systems fail in one of two ways: a large component library built in isolation that no product adopts, or a Figma kit that never reaches code. This track keeps the scope small (tokens plus about ten components), proves value with one pilot team before expanding, and treats the system as a product with users, a backlog and a release process.

Products: {{products}}
Team and capacity: {{team}}
{{#tooling}}Tooling: {{tooling}}
{{/tooling}}
Throughout: size every recommendation to the team's real capacity, and say what to drop if the capacity is too small. Ground decisions in what exists in the products (screens, code, usage counts the user supplies), not in a generic ideal component list. If tooling is undecided, recommend the lightest option that keeps design and code in step, and name it as an assumption. Never invent audit findings: when the user has not supplied screens, code or counts, give them a short collection task and wait for the results. Stop at the end of each step, summarise the decisions made, and wait for approval before the next step.
