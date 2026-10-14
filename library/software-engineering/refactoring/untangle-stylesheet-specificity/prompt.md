---
schema: 1
id: untangle-stylesheet-specificity
kind: prompt
title: Untangle stylesheet specificity
description: Refactors a stylesheet caught in specificity wars - !important chains, ID and deep selectors, overrides of overrides - into flat, scoped rules without changing how pages look.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, software-engineer, fullstack-engineer]
stack: [html-css]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [diff, report, plan]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [specificity, important-overrides, cascade-layers, legacy-css, visual-regression]
pairs_with:
  prompts: [fix-css-layout-bug, audit-hardcoded-styles-against-tokens, remove-dead-code]
  personas: [refactoring-specialist]
args:
  - name: scope
    description: The stylesheet files or component styles to clean up, and the pages or components they affect.
    type: text
    required: true
  - name: setup
    description: How styles are built and loaded (plain CSS, Sass, CSS modules, a framework), load order, third-party CSS in play, and which browsers must be supported.
    type: text
  - name: safety_net
    description: How visual changes can be checked - screenshot or visual regression tests, a style guide page, or manual review only.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Refactor plan, Changes, Pages to check, Left alone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Specificity wars start when someone cannot override a rule, so they add a parent selector, then an ID, then !important, and the next person has to go one level higher. The result is stylesheets where nobody dares delete anything and every change breaks a page somewhere else. The fix is not cleverness but flattening: find what each override was fighting, give components their own low-specificity class names, move resets and third-party styles to a known place in the cascade (cascade layers where the supported browsers allow, or a strict load order), replace deep descendant chains with a class on the element, and remove !important except for genuine utility classes. The danger is that CSS refactors are behaviour changes in disguise: source order, inheritance and specificity all decide the computed style, so a refactor is only safe when the computed result on real pages stays the same.

<scope>
{{scope}}
</scope>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}
{{#safety_net}}
Safety net: {{safety_net}}
{{/safety_net}}
</context>

<task>
1. Diagnose: read the styles in scope and list the override chains (which rule fights which and why), !important uses by cause, ID selectors, selectors deeper than three levels, rules that depend on source order across files, and rules that appear unused. Note which come from third-party CSS you must not edit.
2. Plan the refactor in small steps that each keep rendering identical: establish the cascade order (resets, third-party, base, components, utilities), then flatten one component at a time.
3. For each step, make the change: introduce a component class, rewrite the selector, delete the overrides that only existed to beat the old selector, and remove !important where it is no longer needed. Keep markup changes minimal and list every one.
4. List the pages, components and states (hover, focus, error, dark mode, narrow screens, right-to-left if relevant) to compare before and after each step.
5. List what you left alone and why: suspected dead rules without proof, third-party overrides, and anything that would need a design decision.
</task>

<constraints>
- No visual change is the goal. If a change could alter what users see, stop and flag it instead of making it.
- Do not delete a rule as unused unless you have searched templates, scripts that add classes dynamically, and CMS content in scope; otherwise list it as suspected dead.
- Do not edit vendor or third-party stylesheets; isolate them instead.
- Only use cascade layers or other newer CSS features if the stated browser support allows them; otherwise use load order.
- Do not rename classes used outside the stated scope without listing every usage.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Diagnosis
Table: Selector or rule | Problem | Why it exists.
## Refactor plan
Numbered steps.
## Changes
The edits per step as diffs, with markup changes listed separately.
## Pages to check
Checklist of pages, components and states.
## Left alone
Bullets with reasons.
</output_format>
