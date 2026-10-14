---
schema: 1
id: write-token-usage-guide
kind: prompt
title: Write a token usage guide
description: Writes usage documentation for a design system's semantic tokens, explaining what each is for, when not to use it, approved pairings, common misuse and how to choose between similar tokens.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer]
requires: [none]
inputs: [config, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [semantic-tokens, design-tokens, usage-guidelines, colour-roles, design-documentation]
pairs_with:
  prompts: [define-design-tokens, plan-semantic-token-migration, plan-design-system-docs-site]
  personas: [design-systems-lead]
args:
  - name: tokens
    description: The semantic tokens with their values or aliases per theme, as a token file excerpt or a list. Include primitives only if they are needed to read the aliases.
    type: text
    required: true
  - name: context
    description: Optional. Common misuses you see, the components that use the tokens, and the themes.
    type: text
output_contract:
  format: markdown
  sections: [Summary, How to choose a token, Token reference, Pairings, Common mistakes, Gaps and ambiguities, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Token names alone do not tell people which to use. The most common misuse is choosing a token by its colour ("I need this grey") instead of by role, which works until a theme changes and the text becomes a border colour in dark mode. Usage docs that help start from a decision path (what kind of element is this, what role does it play, what state is it in), then give each token one line on what it is for and when not to use it, and list the approved foreground and background pairings with their contrast so people do not create failing combinations. Writing the guide is also the moment to find the system's own problems: two tokens that mean the same thing, names that do not say their role, and roles that have no token. Those belong in a gaps list, not papered over with invented guidance.
</context>

<task>
Write the usage guide for these tokens.

<tokens>
{{tokens}}
</tokens>
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **How to choose a token.** A short decision path: element type (text, icon, surface, border, interactive fill), role (default, secondary, subtle, inverse, brand, status), state (hover, pressed, disabled, selected, focus). End each path in token names from the list.
2. **Token reference.** For every semantic token: what it is for, one example, when not to use it (and what to use instead), and its value or alias in each theme.
3. **Pairings.** The approved text-and-icon on surface pairs, with contrast ratios computed from the given values for each theme, marked pass or fail against 4.5:1 for normal text and 3:1 for large text and UI elements. List any failing pair as a problem.
4. **Common mistakes.** Six to eight misuses (from the context where given), each with the right token.
5. **Gaps and ambiguities.** Tokens that overlap, names that do not express a role, roles with no token, and status tokens that could be confused with brand colours. Propose fixes and mark them proposed.
6. If the list contains only primitives (scale names like `blue-500`) and no semantic layer, say that role-based guidance cannot be written honestly and that a semantic layer is needed first, then outline it.
</task>

<constraints>
- Use only token names from the list; mark anything new as proposed.
- Compute contrast only from given values; if values are aliases you cannot resolve, say so.
- Do not describe a token's purpose more confidently than its name and usage support; put doubtful ones in Gaps and ambiguities.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Token reference and pairings as tables. Decision path as a nested list. End with Open questions.
</output_format>
