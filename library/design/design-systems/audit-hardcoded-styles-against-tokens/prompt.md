---
schema: 1
id: audit-hardcoded-styles-against-tokens
kind: prompt
title: Audit hard-coded styles against tokens
description: Scans a codebase for hard-coded colours, spacing, radii and type sizes, maps each to the nearest design token, and proposes or applies replacements, listing values with no token.
category: design-systems
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [frontend-engineer, designer, mobile-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [report, diff, table]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-tokens, hardcoded-values, token-migration, css-variables, style-drift]
pairs_with:
  prompts: [define-design-tokens, audit-design-consistency, measure-design-system-adoption, generate-platform-token-files]
  personas: [design-systems-lead]
args:
  - name: repo_path
    description: Path to the repository or the folder within it to scan, for example "apps/web/src".
    type: string
    required: true
  - name: tokens_file
    description: Path to the token source or the generated tokens the code should use, for example "packages/tokens/tokens.json" or "src/styles/variables.css".
    type: string
    required: true
  - name: apply
    description: false writes a report and a proposed diff only. true also applies the replacements that are exact or semantically unambiguous, then runs the checks.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Summary, Token map, Findings, Applied changes, Values with no token, Needs a decision, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hard-coded style values are how a design system quietly stops working: a `#1a73e8` here, a `margin: 13px` there, and the dark theme, the rebrand and the accessibility fix all miss those places. A naive find-and-replace makes it worse. The same hex can be a text colour in one place and a border in another, so it maps to different semantic tokens; a value that is merely close to a token may be deliberate or may be a bug; and values inside SVGs, third-party CSS, generated files, tests and email templates follow different rules. The audit has to understand the token layers (primitive and semantic), choose by role, and leave genuine decisions to people.
</context>

<task>
Audit {{repo_path}} for hard-coded style values and map them to the tokens in {{tokens_file}}.
Apply mode: {{apply}}.

1. **Read the tokens.** Load {{tokens_file}} and build the token map: each token's name, resolved value per theme, type (colour, dimension, radius, font size, line height, font weight, shadow, duration) and tier (primitive or semantic). Resolve aliases. Note how code references tokens (CSS custom properties, Sass variables, a theme object, utility classes, platform resources). If the file cannot be read or holds no tokens, stop and report that.
2. **Find the styling surface.** Detect the styling approaches in {{repo_path}}: CSS, Sass or Less, CSS modules, CSS-in-JS, inline style objects, utility classes with arbitrary values, and native style sheets. List the file globs you will scan. Exclude vendored, generated, build-output, lock and snapshot files, and say which you excluded.
3. **Scan.** Use search tools (ripgrep or the project's own linters) to find literal values: hex, rgb, hsl and oklch colours and named colours; px, rem and em lengths in spacing, size, gap and position properties; border radii; font sizes, weights and line heights; box shadows; transition durations. Record file, line, property and value. Ignore `0`, `100%`, `auto`, `inherit`, `currentColor`, `1px` hairline borders and values already wrapped in a token reference.
4. **Classify each finding:**
   - **exact**: the value equals a token's resolved value. Choose a semantic token by the property's role (text colour, background, border, focus ring, spacing between items, inset padding) over a primitive. If two semantic tokens share the value and the role does not decide, mark it Needs a decision.
   - **near**: within a small tolerance of a token (for colours, a small perceptual difference such as delta E under about 3; for dimensions, within 2 px or one scale step). Propose the token but never auto-apply.
   - **no token**: nothing close. List it under Values with no token with its frequency, so the system team can decide whether a token is missing.
   - **exempt**: values that must stay literal (brand logo colours in SVGs, third-party widget overrides, print or email CSS that cannot read variables). Explain why.
5. **Propose or apply.** If apply is false, produce a unified diff of the exact replacements and stop without writing files. If apply is true, apply only the exact, unambiguous replacements using the codebase's existing token reference style, add no new imports beyond what the file's style needs, and leave near and ambiguous findings untouched.
6. **Verify.** When apply is true, run the project's build, type check, linters (including stylelint if present) and tests, and any visual regression command the repository defines. Revert any replacement that breaks a check and list it. Note that resolved values are unchanged for exact matches, so the default theme should render the same.
</task>

<constraints>
- Never change token files or token values; the audit only changes consumers.
- Never apply near matches; a visual change is a design decision.
- Do not reformat files or touch unrelated lines.
- Report counts from the actual scan; do not estimate them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Summary
Files scanned, findings by type and class, replacements proposed or applied.
## Token map
The tokens used for matching, as a compact table (token, tier, value per theme).
## Findings
| File:line | Property | Value | Class | Proposed token | Note |
Group by file; cap at the 100 most frequent and give the full count.
## Applied changes
A unified diff (or "none, apply was false" plus the proposed diff).
## Values with no token
| Value | Type | Occurrences | Example locations | Suggested action |
## Needs a decision
Ambiguous and near matches, with the options.
## Verification
Commands run and their actual results.
</output_format>
