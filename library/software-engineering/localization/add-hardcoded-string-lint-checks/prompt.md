---
schema: 1
id: add-hardcoded-string-lint-checks
kind: prompt
title: Add lint checks that block hard-coded UI strings
description: Configures linters and CI so new hard-coded user-facing strings, string concatenation and missing catalog keys fail review, with an allowlist and a baseline so existing debt does not block work.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, mobile-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, diff, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [linting, ci-checks, regression-prevention]
pairs_with:
  prompts: [extract-ui-strings, audit-translation-keys]
  rules: [i18n-ready-code-rules]
args:
  - name: repo_scope
    description: Apps or packages to cover, their languages and frameworks, and the i18n library in use.
    type: text
    required: true
  - name: ci
    description: CI system and where lint runs today, for example "GitHub Actions, npm run lint on pull requests".
    type: string
  - name: mode
    description: "baseline: record existing violations and fail only on new ones. strict: fail on every violation now."
    type: enum
    enum: [baseline, strict]
    default: baseline
output_contract:
  format: markdown
  sections: [Tools chosen, Configuration, Allowlist, Baseline, CI wiring, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After the first extraction pass, hard-coded strings creep back in within weeks unless something fails. Each ecosystem has a check: `eslint-plugin-i18next` (`no-literal-string`) or `eslint-plugin-formatjs` and `@intlify/eslint-plugin-vue-i18n` for JavaScript frameworks, Android lint `HardcodedText` and `SetTextI18n`, SwiftLint custom rules or Xcode's localization warnings, Flutter analyzer rules or custom lints, gettext extraction diffs for Python and PHP. Turned on naively they flag thousands of false positives (CSS classes, test ids, route paths, log lines, enum values), the team adds blanket disables, and the check becomes noise. The useful setup restricts the rule to JSX text and user-facing attributes, ignores known non-UI patterns, starts from a baseline of existing debt, and adds a cheap second check that every key used in code exists in the source catalog.
</context>

<task>
Add hard-coded string checks to {{repo_scope}}.
{{#ci}}CI: {{ci}}.{{/ci}}
Mode: {{mode}}.

1. Inspect the existing lint setup, config format (flat or legacy ESLint config, `lint.xml`, `.swiftlint.yml`, `analysis_options.yaml`), the i18n library and how strings are looked up.
2. Choose the rule or tool per ecosystem and explain why. Prefer maintained plugins tied to the i18n library in use; fall back to a narrowly scoped custom rule only when none fits.
3. Configure the rule to check user-facing text only: JSX or template text, and attributes such as `alt`, `title`, `placeholder`, `aria-label`, `label`. Ignore test files, stories, logging calls, `className`, `data-testid`, route definitions and constants files that hold non-UI values.
4. Add a check for string concatenation around translated values (`t("a") + name`) where the tool supports it, and a script or plugin check that every literal key used in code exists in the source catalog.
5. Write an allowlist for brand names, units and symbols, with a comment per entry, and document the inline-disable form with a required reason.
6. Baseline mode: record current violations (the tool's baseline or suppressions file, or a generated per-file count) so only new violations fail; strict mode: list how many violations exist and which files need extraction first.
7. Wire it into CI on pull requests, scoped to changed files when the tool supports it, and keep the failure message actionable (which string, which rule, how to fix).
8. Run the lint, report counts before and after configuration, and sample ten flagged items to confirm they are true positives.
</task>

<constraints>
- Do not extract or rewrite strings in this run; add checks only.
- Do not turn the rule on as a warning that nobody reads; it must fail CI for new violations.
- Do not add a blanket disable to make the run pass.
- Pin config to the plugin version already installed or the one you add; do not quote rule options you have not checked in that plugin's docs or source.
{{> output/uncertainty}}
</constraints>

<output_format>
## Tools chosen
Per ecosystem, with the reason.

## Configuration
Config diffs.

## Allowlist
Entries with reasons.

## Baseline
How existing violations are recorded and counted.

## CI wiring
The CI change.

## Verification
Counts before and after, and the sampled true and false positives.
</output_format>
