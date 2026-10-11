---
schema: 1
id: decide-on-micro-frontends
kind: prompt
title: Decide on micro-frontends
description: Decides whether micro-frontends fit an organisation and, if so, the composition method, shared dependencies, routing and design system boundaries.
category: architecture
version: 1.0.0
status: incubating
stage: [design, plan]
role: [frontend-engineer, tech-lead, architect, engineering-manager]
requires: [none]
inputs: [text, repo]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [micro-frontends, module-federation, team-autonomy, frontend-platform, independent-deploys, trade-offs]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [decide-microservices-or-monolith, compare-design-options]
args:
  - name: situation
    description: Number of frontend teams, how the app is built and deployed today, what is painful, and why micro-frontends came up.
    type: text
    required: true
  - name: app
    description: The product's main areas, how much they share (layout, navigation, state, design system), and frameworks in use.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Problem check, Composition if adopted, Shared concerns, Costs, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Micro-frontends solve an organisational problem: many teams blocked on one frontend release train and one codebase. They do not make a small team faster; they add duplicated dependencies, larger bundles, inconsistent UX, cross-app integration testing and a platform to run. Before adopting them, check whether the pain is really about deployment coupling, or about a slow build, a messy codebase or unclear ownership, which a modular monolith, a monorepo with module boundaries and build caching, or code owners can fix far more cheaply. If they do fit, the simplest split is usually by route or page (separate apps behind one domain, joined by links or a thin shell), which avoids runtime sharing problems. Runtime composition (module federation or similar) allows several teams on one page but needs strict rules on shared library versions, a contract for communication (events or URL, not shared global state) and a performance budget. A shared design system and shared auth are prerequisites, otherwise the product looks and behaves like several products.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#app}}
<app>
{{app}}
</app>
{{/app}}

1. List the concrete pains stated and, for each, whether micro-frontends address it and what cheaper fix exists.
2. Check the prerequisites: several autonomous teams owning distinct product areas, a real need for independent deploys, capacity for a small platform effort, and an existing or planned shared design system.
3. Give a verdict: yes, no, or not yet with the condition that would change it.
4. If yes, choose the composition method, preferring route-level split first, and explain why the others were rejected.
5. Define shared concerns: how navigation and routing work across apps, auth session sharing, design system distribution and versioning, shared dependency policy, communication contract, error tracking and performance budget per app.
6. List the costs the organisation takes on and who owns the shell or platform.
7. Give next steps that start reversible, for example splitting one low-risk area first.
</task>

<constraints>
- Do not recommend micro-frontends for a single team or as a fix for slow builds or messy code.
- Do not invent tool features or configuration; describe the mechanism and say what to verify.
- Be explicit about the performance and consistency costs, even when recommending them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Yes, no or not yet, with the main reason, in at most five lines.
## Problem check
Table: stated pain, whether micro-frontends fix it, cheaper alternative.
## Composition if adopted
Build-time packages, runtime module loading, server or edge composition, or route-level split apps, with the choice and why.
## Shared concerns
Design system, auth, routing, shared state, dependency versions, observability.
## Costs
What the organisation takes on: platform team, performance budget, testing across apps.
## Next steps
Numbered steps, starting with the smallest reversible one.
</output_format>
