---
schema: 1
id: write-component-spec
kind: prompt
title: Write a design-system component spec
description: Writes a design-system component spec covering anatomy, variants, states, behaviour, tokens, content rules, dos and don'ts, and accessibility. Use when adding or documenting a component.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer]
requires: [none]
inputs: [text, image]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [component-spec, design-documentation, usage-guidelines, aria-patterns]
pairs_with:
  prompts: [define-design-tokens, audit-design-consistency, create-wireframe-spec]
  personas: [product-designer, accessibility-specialist]
args:
  - name: component
    description: The component to specify, e.g. "toast", "date picker", "segmented control".
    type: string
    required: true
  - name: context
    description: The design system and product it belongs to, existing token names, related components, platforms, and any existing implementation or screenshots. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Anatomy, Variants and sizes, States, Behaviour, Content, Tokens, Accessibility, Dos and don'ts, Related components, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Component docs often show the happy-path picture and a props table, and leave out what matters for consistent use: when not to use it, what every state looks like, how it behaves with a keyboard and a screen reader, which tokens it reads, and what to do with long or translated text. Teams then rebuild the same component three ways. A good spec is the single source both designers and engineers build from.
</context>

<task>
Write the spec for the **{{component}}** component.
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **Overview:** what it is for in one sentence, when to use it, and when not to (name the component to use instead).
2. **Anatomy:** numbered parts (container, label, icon, and so on), each marked required or optional.
3. **Variants and sizes:** each variant with the job it does. Keep the set minimal; if two variants differ only cosmetically, propose merging them. Give sizes with the minimum target size each must keep.
4. **States:** default, hover, focus-visible, active or pressed, disabled, and those that apply (selected, loading, error, read-only, expanded). Say what changes visually and what the disabled state communicates, and whether a disabled control should instead stay enabled and explain why it cannot act.
5. **Behaviour:** interactions with mouse, touch and keyboard, timing (for example auto-dismiss and how pausing works), overflow and truncation, responsive behaviour, and motion with a reduced-motion alternative.
6. **Content:** label rules, length limits, casing, icon use, and how it handles long, empty and translated text (allow about 30 to 40 percent expansion).
7. **Tokens:** a table of the semantic tokens each part uses. Use the system's token names if given; otherwise propose names following `{category}.{property}.{variant}.{state}` and mark them "proposed". Never hard-code raw values.
8. **Accessibility:** the native element or WAI-ARIA Authoring Practices pattern it should follow, role and accessible name, keyboard map, focus management, announcements for dynamic changes, contrast and target-size requirements, and what must not rely on colour alone.
9. **Dos and don'ts:** 4 to 8 pairs, each a concrete situation, not a general principle.
10. **Related components** and how to choose between them.
11. If the component name is ambiguous (a "card" can be a container or an interactive tile), state the interpretation you chose, or ask if the difference would change most of the spec.
</task>

<constraints>
- Prefer native platform elements over custom ARIA. If ARIA is needed, specify it completely.
- Do not invent the system's existing tokens, components or values. Mark anything you propose as "proposed".
- Keep it implementation-neutral: describe behaviour and properties, not one framework's code.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Use tables for anatomy, variants, states, tokens and the keyboard map. End with Open questions.
</output_format>
