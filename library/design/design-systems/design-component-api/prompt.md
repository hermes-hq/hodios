---
schema: 1
id: design-component-api
kind: prompt
title: Design a component's props API
description: Designs the public API of a design-system component, covering props, slots or composition, controlled and uncontrolled state, events, naming and escape hatches.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [frontend-engineer, mobile-engineer, designer]
requires: [none]
inputs: [text, spec, file]
output: [docs, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [component-api, props, composition, controlled-state, api-ergonomics]
pairs_with:
  prompts: [write-component-spec, build-ui-component, review-ui-component-change]
  personas: [design-systems-lead, frontend-engineer]
args:
  - name: component
    description: The component whose API you are designing, e.g. "select", "dialog", "data table", "button".
    type: string
    required: true
  - name: framework
    description: The framework or platform, e.g. "React with TypeScript", "Vue 3", "Web Components", "SwiftUI", "Jetpack Compose".
    type: string
    required: true
  - name: context
    description: Optional. Existing API conventions in your system, the current implementation if any, how product teams use the component today, and the spec or screenshots.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Use cases, API surface, State and events, Composition, Naming and conventions, Accessibility contract, Escape hatches, Examples, Evolution and breaking-change risk, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A design-system component's API is a public contract: every prop you ship is one you must support or break later, and dozens of teams will code against it. The common failures are boolean-prop explosions (`isPrimary`, `isLarge`, `isGhost` that can be combined into nonsense), configuration objects that try to cover every layout instead of letting consumers compose children, state that can only be controlled or only uncontrolled, styling props that bypass the token system, and names that describe looks (`blue`, `big`) rather than intent (`tone`, `size`). Experienced system engineers design from real use cases, prefer one enum over several booleans, follow the platform's idioms (React's `value`/`defaultValue`/`onChange`, SwiftUI bindings and modifiers, Compose state hoisting), keep names consistent across all components, and give one deliberate escape hatch instead of many accidental ones.
</context>

<task>
Design the public API for the **{{component}}** component in **{{framework}}**.
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **Use cases.** List the 5 to 10 concrete situations the component must serve, from simplest to hardest, drawn from the context where given. Mark which ones are in scope and which belong to another component.
2. **API surface.** A table of every prop, parameter or modifier: name, type, default, required or optional, and the use case that justifies it. Replace sets of booleans with enums where values are mutually exclusive. Drop any prop no use case needs.
3. **State and events.** Say which state can be controlled, uncontrolled or both, using the framework's convention, what fires on every change, what the event payload is, and how the component behaves when a controlled value is not updated by the consumer.
4. **Composition.** Decide where consumers pass children, slots, sub-components or render functions instead of props, and justify each choice against the use cases. Show the structure for the hardest use case.
5. **Naming and conventions.** Align names with the system's existing components (the same `size` scale, the same event prefix, the same `disabled` or `isDisabled` style). Name by intent, not appearance. If the context lists conventions, follow them and flag any you had to break.
6. **Accessibility contract.** Which accessible-name props are required, which ARIA or platform accessibility properties the component sets itself and which it passes through, focus management, and what the API must make impossible (for example an icon-only button without a label).
7. **Escape hatches.** Decide which native attributes, refs, class names or style overrides pass through, and the limits (for example layout only, never colour). Explain how consumers get a variant you did not provide without forking.
8. **Examples.** Code for the simplest, the most common and the hardest use case, in {{framework}} idiom.
9. **Evolution.** For each prop, say how hard it would be to change later. Flag props that are likely to cause a breaking change, and propose what to leave out of the first version.
10. If the component name is ambiguous or the framework is unclear, state the interpretation you chose, or ask if the difference would change most of the design.
</task>

<constraints>
- Follow the idioms of {{framework}}; do not port another framework's patterns into it.
- Do not invent the system's existing components, props or tokens. Mark anything you propose as "proposed".
- No props that accept raw colours, pixel values or font names; visual variation goes through tokens and variants.
- Keep the first version minimal; adding a prop later is cheap, removing one is a breaking change.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Use tables for the API surface and for evolution risk. Code examples in fenced blocks. End with Open questions.
</output_format>
