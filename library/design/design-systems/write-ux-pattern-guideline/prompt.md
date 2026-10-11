---
schema: 1
id: write-ux-pattern-guideline
kind: prompt
title: Write a UX pattern guideline
description: Documents a reusable UX pattern for a design system, such as bulk actions or filtering, covering the problem, when to use it, components involved, variations, behaviour, content and accessibility.
category: design-systems
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer, writer]
requires: [none]
inputs: [text, image, spec]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ux-patterns, pattern-documentation, usage-guidelines, interaction-design, consistency]
pairs_with:
  prompts: [write-component-spec, write-accessibility-annotations, design-empty-and-error-states]
  personas: [product-designer, ux-writer]
args:
  - name: pattern
    description: The pattern to document, e.g. "bulk actions on a list", "filtering and sorting", "destructive confirmation", "inline editing", "saving and autosave".
    type: string
    required: true
  - name: context
    description: Optional. The product, the components available in your system, and how teams currently implement this pattern (screenshots described, links, inconsistencies seen).
    type: text
output_contract:
  format: markdown
  sections: [Summary, Problem, When to use, Anatomy, Variations, Behaviour, Content, Accessibility, Examples, Related patterns, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most inconsistency in a mature product lives at the pattern level, not the component level: every team uses the same button and checkbox, yet deleting, filtering or saving works differently on every screen. A pattern guideline describes how components combine to solve a recurring problem and, more importantly, the decisions inside it: when to confirm and when to offer undo, what happens when the user selects all items across pages, what to do with zero, one or thousands of results, how errors and partial failures are reported, and how the flow works by keyboard and screen reader. Patterns copied from other products without those decisions produce screens that look alike but behave differently.
</context>

<task>
Write the guideline for the **{{pattern}}** pattern.
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **Problem.** The user problem in one or two sentences, and the cost of handling it inconsistently.
2. **When to use and when not.** Concrete situations for each, naming the alternative pattern when this one does not fit.
3. **Anatomy.** The components involved and their roles, using the system's component names where given; mark anything the system lacks as a gap.
4. **Variations.** The legitimate variants (for example a small list versus paginated data) and the rule for choosing between them.
5. **Behaviour.** Step by step for the main flow, plus the decisions: confirmation versus undo, scope (visible items, all pages), zero, one and many, loading, errors and partial failures, persistence across navigation, and responsive behaviour on small screens.
6. **Content.** Labels, counts, confirmation and error messages with examples, and rules for tone and length.
7. **Accessibility.** Keyboard flow, focus after each action, announcements of results and counts, and anything that must not rely on colour or hover.
8. **Examples.** Two or three worked examples from the user's product if described, otherwise realistic generic ones labelled as illustrations.
9. **Related patterns** and how to choose between them.
10. If the pattern as requested would manipulate users (for example making cancellation hard or shaming a choice), decline that version and offer an honest alternative.
</task>

<constraints>
- Do not invent the system's components or existing product screens; mark gaps and illustrations.
- Describe behaviour and decisions, not one framework's code.
- No dark patterns: no hidden costs, forced continuity, confirmshaming or disguised options.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Use a table for decisions in Behaviour (Situation, Behaviour, Reason). Content examples as quoted strings. End with Open questions.
</output_format>
