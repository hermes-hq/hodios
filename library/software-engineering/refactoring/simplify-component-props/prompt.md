---
schema: 1
id: simplify-component-props
kind: prompt
title: Simplify a UI component's props
description: Replaces a UI component's pile of boolean and one-off props with variants, composition or compound components, keeping every existing call site rendering the same during migration.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, designer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [component-api, compound-components, component-variants, design-system-components]
pairs_with:
  prompts: [consolidate-duplicate-ui-components, split-react-component]
  personas: [frontend-engineer]
args:
  - name: component
    description: The component whose props got out of hand, as a path or pasted code, and its framework (React, Vue, Svelte, Angular).
    type: text
    required: true
  - name: test_command
    description: The command that runs component and visual tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Prop audit, New API, Migration, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who designs component APIs. Components grow props one feature at a time: `primary`, `danger`, `small`, `large`, `outline`, `iconLeft`, `hideTitle`, `isCompactMobileHeader`. Booleans multiply into combinations nobody designed (`primary` and `danger` together), and one-off props leak a single screen's needs into a shared component.

Better shapes:
- **Enumerated variants:** mutually exclusive booleans become one prop (`variant: 'primary' | 'secondary' | 'danger'`, `size: 'sm' | 'md' | 'lg'`). Invalid combinations become unrepresentable.
- **Composition and slots:** props that pass content or toggle sub-parts (`title`, `hideFooter`, `footerButtons`) become children or named slots, so callers render what they need.
- **Compound components:** `<Card><Card.Header/><Card.Body/></Card>` when callers need to rearrange or omit internal parts; shared state goes through context inside the component.
- **Escape hatches:** `className` or style passthrough and spreading remaining native attributes (`aria-*`, `type`, `disabled`) instead of re-declaring them one by one.

Migration is where this goes wrong: a shared component may have hundreds of call sites. Keep the old props working as deprecated aliases that map to the new ones, migrate callers mechanically, and remove the aliases last. Count real usage of each prop first; some can simply be deleted, and some combinations in use reveal a missing variant.
</context>

<task>
Simplify the props of {{component}}.

1. List every prop with its type, default, and how many call sites use it (search the repo). Flag mutually exclusive booleans, props used once, props that only pass content, and combinations in use that look undesigned.
2. Propose the new API: variants, slots or children, compound parts if needed, and native attribute passthrough. Show the mapping from each old prop to the new form. Wait for approval.
3. Make sure tests or stories cover the visual states in use; add rendering tests for each variant where missing.
4. Implement the new API with the old props kept as deprecated aliases (with a typed deprecation note), so nothing breaks. Migrate call sites in reviewable groups, then remove the aliases once no caller uses them.
5. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and the type check, and report results and the remaining call sites if migration is partial.
</task>

<constraints>
- Every existing call site must render the same during and after migration; call out any combination that cannot map exactly.
- Do not add new variants nobody uses.
- Do not change design tokens, spacing or styling as part of the API change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Prop audit
Table: prop, type, call sites, problem.
## New API
Signature and old-to-new mapping.
## Migration
Aliases, call-site groups, removal step.
## Diff
The change.
## Check
Tests, type check and remaining call sites.
</output_format>
