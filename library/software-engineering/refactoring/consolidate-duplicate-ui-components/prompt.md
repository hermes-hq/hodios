---
schema: 1
id: consolidate-duplicate-ui-components
kind: prompt
title: Consolidate duplicate UI components
description: Merges near-identical buttons, modals, cards or inputs scattered across a frontend into one component with variants, then migrates call sites in groups with visual parity checks.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [duplicate-components, component-variants, visual-regression, design-system-components]
pairs_with:
  prompts: [audit-component-duplication, simplify-component-props, reduce-duplication]
  personas: [frontend-engineer]
args:
  - name: components
    description: The duplicated components to merge (paths, or a kind such as "all the modal components"), and the framework.
    type: text
    required: true
  - name: test_command
    description: The command that runs component tests and, if any, visual regression or story snapshots.
    type: string
output_contract:
  format: markdown
  sections: [Copies found, Differences, Target component, Migration plan, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer merging copy-pasted components. Apps collect `Button`, `PrimaryButton`, `SubmitBtn` and `CheckoutButton`, or five modals with slightly different close behaviour. The visible differences are usually small (padding, colour, an icon slot), but the invisible ones matter more: one modal traps focus and closes on Escape, another does not; one button sets `type="button"`, another submits forms by default; one input wires its label with `htmlFor`, another does not. Merging blindly either loses a needed behaviour or forces a new one on callers.

The approach that works: diff the copies property by property (markup, styles, props, behaviour, accessibility), decide for each difference whether it is a real variant, an accident, or a bug, and build one component whose variants cover the real differences. The best version of each behaviour (focus management, keyboard support, ARIA) wins, and adopting it is called out as a behaviour change. Migrate in small groups, verifying each with screenshots or story snapshots, because pixel shifts are the main regression and tests rarely catch them.
</context>

<task>
Consolidate {{components}}.

1. Find every copy (search by name, markup shape and class names) and list each with its call-site count.
2. Diff them: markup, styles, props, behaviour (keyboard, focus, form submission, close rules) and accessibility. Mark each difference as a variant, an accident, or a bug.
3. Propose the target component: where it lives (the project's shared component folder), its variants, and which copy's behaviour wins for each difference. List the behaviour changes that some callers will see. Wait for approval.
4. Build the component with tests or stories for each variant. Migrate call sites in groups by copy, checking visual parity for each group with the project's visual tests or by listing screens to check by hand.
5. Delete each old copy once nothing imports it. Run the tests and type check{{#test_command}} with `{{test_command}}`{{/test_command}} after each group and report results and what is left.
</task>

<constraints>
- Do not change visuals or behaviour silently; list every intended difference per call site.
- Do not invent design tokens or new variants that no caller needs.
- Keep each migration group small enough to review; do not delete a copy that still has importers.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Copies found
Table: component, path, call sites.
## Differences
Table: aspect, per-copy value, classification (variant, accident, bug).
## Target component
API, variants and winning behaviours.
## Migration plan
Groups in order, visual check for each.
## Diff
The change for the groups done.
## Check
Tests, visual checks and remaining copies.
</output_format>
