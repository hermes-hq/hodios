---
schema: 1
id: migrate-styles-to-utility-css
kind: prompt
title: Migrate styles to utility CSS
description: Migrates component styles from CSS modules, styled-components, Sass or plain CSS to a utility-first framework one component at a time, mapping values to tokens and proving visuals are unchanged.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer]
stack: [tailwind]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [utility-css, css-modules, styled-components, design-tokens, visual-regression]
pairs_with:
  rules: [tailwind-rules]
  prompts: [write-visual-regression-tests]
args:
  - name: scope
    description: Components or directories to migrate in this run, for example "src/components/forms/" or "Button, Card and Modal".
    type: text
    required: true
  - name: source_style
    description: How the components are styled today.
    type: enum
    enum: [css-modules, styled-components, sass, plain-css]
    default: css-modules
  - name: visual_check
    description: Command that runs visual regression or screenshot tests, for example "npm run test:visual". Leave empty if there is none; you will then produce a manual checklist instead.
    type: string
output_contract:
  format: markdown
  sections: [Setup check, Token map, Per component, Not migrated, Verification, Next batch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Style migrations fail by drifting: a 14px gap becomes 16px because that is the nearest utility, hover and focus states disappear, a media query at 900px quietly becomes a 1024px breakpoint, dark mode and right-to-left layouts regress, and specificity that a parent stylesheet relied on stops applying. Big-bang rewrites make these impossible to review. The safe path is incremental: set up the utility framework to coexist with existing CSS, map the existing design values to tokens first, then migrate one component at a time, checking each against the original before deleting old styles.
</context>

<task>
Migrate the components in {{scope}} from {{source_style}} to utility-first classes (Tailwind CSS, the project's utility framework).

1. Setup check. Confirm the utility framework is installed and configured to coexist with the existing styles (content paths cover the files in scope; preflight or base resets do not restyle unmigrated pages, or their effect is understood). If it is not installed, stop and report what setup is needed rather than installing and reconfiguring the build on your own.
2. Token map. Collect the colours, spacing, font sizes, line heights, radii, shadows, z-indexes and breakpoints used in scope (from variables, Sass maps, theme objects or literal values). Map each to an existing theme token. Where no token matches exactly, add a token to the theme rather than rounding to the nearest utility; use an arbitrary value only for a true one-off. Record every mapping.
3. Per component, in dependency order (leaf components first):
   - Translate every rule, including pseudo-classes (`:hover`, `:focus-visible`, `:disabled`), media queries, dark mode, `prefers-reduced-motion`, RTL and print styles, animations and keyframes.
   - For {{source_style}}: convert props-driven styles (styled-components) and modifier classes into a variants map of complete, literal class strings; convert Sass mixins and loops into components or theme values; keep `@apply` only for styling markup you do not control.
   - Watch for styles that came from a parent selector or global stylesheet and now need to live on the component.
   - Keep the component's public props and DOM structure unchanged unless a wrapper element existed only for styling.
   - Check it: run {{visual_check}} if provided; otherwise render the component in its states (default, hover, focus, disabled, error, dark mode, narrow viewport) and compare with the original. Only then delete the old style file or styled definitions and their imports.
   - Checkpoint after each component: record what changed and the check result before starting the next one.
4. Run the build, lint, type check and unit tests at the end, and confirm no unused style files or imports remain for migrated components.

If {{scope}} covers more than about ten components, migrate the first ten in dependency order, then stop and list the rest under Next batch.
</task>

<constraints>
- Visual parity is the definition of done. Do not redesign, "clean up" spacing or change colours, even when the old values look inconsistent; list inconsistencies as follow-ups instead.
- Never build class names by string interpolation.
- Do not touch components outside {{scope}} except for the shared theme.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Setup check
What was already configured, and anything blocking.

## Token map
| Old value or variable | Token | New or existing |

## Per component
For each component: the diff, the states checked, and the check result.

## Not migrated
Components or rules left as they were, with the reason.

## Verification
Commands run and their real results. If there was no visual check command, the manual checklist with what you were and were not able to confirm.

## Next batch
Remaining components in recommended order, and design inconsistencies found.
</output_format>
