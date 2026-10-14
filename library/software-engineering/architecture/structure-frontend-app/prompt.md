---
schema: 1
id: structure-frontend-app
kind: prompt
title: Structure a frontend app
description: Designs the architecture of a React, Vue, Svelte or Angular app with feature folders, a split of server cache and client state, data fetching, routing and dependency rules.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [frontend-engineer, tech-lead, architect]
stack: [react, vue, angular, svelte]
requires: [none]
inputs: [repo, text, spec]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [state-management, feature-folders, data-fetching, dependency-rule, web-app, code-organization]
pairs_with:
  personas: [frontend-engineer, software-architect]
  prompts: [review-codebase-architecture, write-architecture-fitness-functions]
args:
  - name: app
    description: What the app does, its main screens or features, team size, and whether it is new or an existing codebase being restructured.
    type: text
    required: true
  - name: framework
    description: Framework and meta-framework, for example React with Vite, Next.js, Vue with Nuxt, SvelteKit or Angular.
    type: string
    required: true
  - name: pain_points
    description: What hurts today, such as tangled global store, duplicated API calls, slow builds or hard-to-find code.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Folder layout, State and data, Dependency rules, Shared code, Migration steps, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most frontend architecture pain comes from two mistakes: putting server data in a global client store, and organising by file type (components, hooks, services folders) instead of by feature. Server state (data fetched from APIs) has its own concerns: caching, deduplication, background refetch, invalidation after mutations. A server-cache library or the framework's data loaders handle these; copying responses into a global store recreates them badly. What remains as true client state is usually small: auth session, theme, a few cross-feature UI flags. URL state (filters, tabs, pagination) belongs in the URL so links and back buttons work. Feature folders keep a feature's components, hooks, API calls and tests together, with a narrow public entry point; shared code is promoted only when two features need it. Dependency rules (features do not import each other's internals; shared code never imports features) keep the graph acyclic and can be enforced by lint rules. Meta-frameworks impose routing and data loading conventions, and the structure should follow them rather than fight them.
</context>

<task>
<app>
{{app}}
</app>

Framework: {{framework}}
{{#pain_points}}
Pain points: {{pain_points}}
{{/pain_points}}

1. If a repository is available, read the current folder structure, state management, data fetching and routing before recommending anything, and note existing conventions worth keeping.
2. Propose a feature-oriented layout that follows {{framework}} conventions (for example its routing folder rules), with app shell, features, shared UI and lib.
3. Classify state: server cache, URL, form, local UI and global client state. Say where each lives and which library or built-in mechanism fits the framework, preferring what the codebase already uses.
4. Define data fetching: one API client, typed responses, query keys or loaders per feature, mutation invalidation, error and loading conventions.
5. Write dependency rules and how to enforce them (lint import restrictions, path aliases, a feature's public index).
6. Walk one feature through the layout end to end: route, page, components, data hooks, tests.
7. For an existing codebase, give migration steps that move one feature at a time with tests passing after each step.
</task>

<constraints>
- Follow the conventions of {{framework}}; do not impose another framework's patterns.
- Do not recommend a global store for server data when a server-cache library or framework loaders fit.
- Do not invent library APIs; describe the mechanism if unsure of a name.
- No big-bang restructure; every step must leave the app working.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The structure and its main rules in at most five lines.
## Folder layout
A tree in a code block, then one feature walked through end to end.
## State and data
Table: kind of state (server cache, URL, form, local UI, global client), where it lives, tool or pattern.
## Dependency rules
Numbered rules about which folders may import which, and how to enforce them with lint.
## Shared code
What goes in shared UI, utilities and the API client, and what must not.
## Migration steps
Small steps from the current code, or "Greenfield".
## Trade-offs
Bullets.
</output_format>
