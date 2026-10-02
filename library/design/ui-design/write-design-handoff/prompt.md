---
schema: 1
id: write-design-handoff
kind: prompt
title: Write design handoff notes
description: Writes design handoff notes for engineers covering flows, states, interactions, responsive rules, tokens, edge cases, acceptance criteria and open questions. Use when passing a design to development.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer, mobile-engineer, product-manager]
requires: [none]
inputs: [text, spec, image]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-handoff, design-specs, ui-states, acceptance-criteria, design-dev-collaboration]
pairs_with:
  prompts: [create-wireframe-spec, write-component-spec, define-design-tokens, design-form-experience]
  personas: [product-designer, ux-writer]
args:
  - name: design_description
    description: The design to hand off - screens and flows described in words, annotations, a link summary or pasted notes - plus the goal of the feature and the components or design system it uses.
    type: text
    required: true
  - name: platform
    description: Target platform and breakpoints, for example "responsive web, 360-1440px", "iOS 17+", or "Android and iOS in one cross-platform app". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Overview, Flows, Screens and states, Interactions, Responsive and platform rules, Tokens and components, Content, Accessibility, Edge cases, Acceptance criteria, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Engineers rarely build the wrong happy path; they build the parts the design never specified. Mockups show the ideal state with perfect content, and the loading, empty, error and long-text states, keyboard behaviour, breakpoints and what happens on a slow network are left to guesswork, then discovered in QA. A good handoff says everything a developer must decide, uses the design system's names for components and tokens, and lists open questions instead of hiding them.
</context>

<task>
Write handoff notes for this design.

<design>
{{design_description}}
</design>
{{#platform}}
Platform: {{platform}}
{{/platform}}

1. **Overview.** The feature's purpose and user in 2 to 3 sentences, what is in and out of scope, and the screens included.
2. **Flows.** Each flow as numbered steps from entry point to completion, including branches and exits (cancel, back, deep link entry, session timeout).
3. **Screens and states.** For each screen: layout regions in reading order, the components used (by design-system name), and every state: default, loading (skeleton or spinner, and after how long), empty (first use and no results), partial data, error (network, validation, permission, server), success, disabled, and offline if relevant. Mark states the design did not show as "not designed" with a proposed default.
4. **Interactions.** Per interactive element: trigger, response, feedback, and timing; hover, focus, pressed and disabled states; gestures and their alternatives; motion with duration and easing tokens if the system has them, and reduced-motion behaviour; what is optimistic versus waits for the server; undo or confirmation for destructive actions.
5. **Responsive and platform rules.** How each region behaves across breakpoints (reflow, stack, hide, truncate, scroll), minimum and maximum widths, platform conventions to follow (navigation, back behaviour, safe areas, system fonts and text sizes). If no platform was given, say what you assumed.
6. **Tokens and components.** The colour, type, spacing, radius and elevation tokens used, by name. Mark any value that is not a token as a deviation to resolve, and any new or modified component as needing a component spec.
7. **Content.** Text strings and their limits, truncation rules, long names and translations (allow about 30 per cent expansion), number, date and currency formats, and dynamic content sources.
8. **Accessibility.** Focus order, keyboard behaviour, accessible names for icon-only controls, heading structure, announcements for dynamic changes, contrast-sensitive elements, and touch target sizes.
9. **Edge cases.** Long and missing data, many items, permissions, concurrent edits, slow or failed requests, and first-time versus returning users.
10. **Acceptance criteria.** Testable Given/When/Then statements for the main flow and the key states.
11. **Open questions.** Everything the design leaves undecided, each with an owner role (design, product, engineering) and a proposed answer.
</task>

<constraints>
- Do not invent measurements, colour values or behaviour that the design does not show. Use token names when given; otherwise write "TBD" or mark a proposal as "(proposed)".
- Prefer the design system's existing components and patterns; call out every deviation.
- Write for engineers: precise, scannable, no design rationale beyond one line where it prevents a wrong implementation.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections as `##` headings, in order. Under "Screens and states", one `###` per screen with a states table:
| State | Trigger | What the user sees | Designed? |
Acceptance criteria as a numbered list. Open questions as a table: | # | Question | Owner | Proposed answer |
</output_format>
