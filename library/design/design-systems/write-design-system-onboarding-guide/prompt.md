---
schema: 1
id: write-design-system-onboarding-guide
kind: prompt
title: Write a design system onboarding guide
description: Writes a getting-started guide for designers and engineers who are new to your design system, with setup, core concepts, a first real task, where to find things and common mistakes.
category: design-systems
version: 1.0.0
status: incubating
stage: [learn, build]
role: [designer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, notes, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [new-joiner-guide, getting-started, design-library, adoption]
pairs_with:
  prompts: [plan-design-system-docs-site, write-token-usage-guide, write-onboarding-guide]
  personas: [design-systems-lead]
args:
  - name: system
    description: The facts the guide needs. Design library names, code package names and install steps, docs location, support channels, request and contribution process, themes and platforms.
    type: text
    required: true
  - name: audience
    description: Who the guide is for, e.g. "product designers", "web engineers", "iOS engineers", or "designers and engineers".
    type: string
    required: true
  - name: product
    description: Optional. The product team the new joiner is on, so the first task can be real.
    type: text
output_contract:
  format: markdown
  sections: [Welcome, Setup, Core concepts, First task, Finding things, Getting help and contributing, Common mistakes, Checklist, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
New joiners decide in their first week whether the design system is a help or an obstacle. The mistakes they make are predictable: designers detach instances to tweak them and lose updates, everyone picks colours by what looks right instead of by semantic token, people build a local component because they could not find the existing one, engineers override styles with class names, and nobody knows how to ask for a missing variant. A good onboarding guide is short, task-based and specific to the team's actual tools: it gets people set up, explains the three or four concepts that matter (tokens, components and variants, patterns, the request process), walks through one real task end to end, and names the common mistakes before they happen.
</context>

<task>
Write the onboarding guide for {{audience}}.

<system>
{{system}}
</system>
{{#product}}

<product>
{{product}}
</product>
{{/product}}

1. **Welcome.** What the design system is for in this organisation, in three or four sentences, and what the reader will be able to do after the guide.
2. **Setup.** Step by step for the audience: enabling the design library and accepting updates for designers; installing packages, theme setup and editor tooling for engineers. Use exactly the names and commands in the system facts. Where a fact is missing, insert a clearly marked placeholder such as `[package name]` instead of guessing.
3. **Core concepts.** Tokens (primitive versus semantic, and why to use semantic), components and their variants and properties, patterns, themes, and the status labels (for example experimental and stable), each with one example.
4. **First task.** A real exercise for the audience (for example build a settings form or a confirmation dialog with system components), with the steps and what good looks like. Use the product context if given.
5. **Finding things.** Where docs, the design library, code, the changelog and examples live, and how to search (including that the system's name for something may differ from the one you know).
6. **Getting help and contributing.** Channels, response expectations, how to request a missing component or variant, and how to contribute.
7. **Common mistakes.** Six to eight mistakes this audience makes, each with what to do instead.
8. **Checklist.** A first-week checklist.
9. If the audience is designers only or engineers only, keep setup to that audience and say where the other audience's guide lives.
</task>

<constraints>
- Never invent package names, install commands, URLs, channel names or component names; use marked placeholders.
- Keep it under about 1,500 words; link out instead of repeating reference docs.
- Plain language; explain any term the first time it appears.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Setup as numbered steps, common mistakes as a table (Mistake, Do this instead), checklist as a task list. Open questions lists every placeholder that needs a real value.
</output_format>
