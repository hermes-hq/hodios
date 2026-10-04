---
schema: 1
id: app-localization-track
kind: workflow
title: App localisation track
description: Takes an English-only app to its first extra language in gated steps, from readiness scan and string extraction to formatting fixes, pseudo-localisation, translation hand-off and linguistic QA.
category: localization
version: 1.0.0
status: incubating
stage: [discover, build, verify, ship]
role: [software-engineer, frontend-engineer, mobile-engineer, tech-lead]
requires: [repo-read, file-write]
inputs: [repo, text]
output: [report, diff, tests, plan]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [first-locale, string-extraction, pseudo-localization, translation-handoff, linguistic-qa]
pairs_with:
  prompts: [review-i18n-readiness, extract-ui-strings, implement-locale-formatting, pseudo-localize-ui, write-translator-context-notes, review-translated-strings]
  personas: [localization-engineer]
  rules: [i18n-ready-code-rules]
args:
  - name: app_description
    description: The app - platforms, what users do in it, where text comes from (UI, server, emails), and anything already done towards translation.
    type: text
    required: true
  - name: target_locale
    description: The first extra language and market, for example "es-MX", "German for Germany", "Japanese".
    type: string
    required: true
  - name: tech_stack
    description: Framework and tooling, for example "React Native with Expo and a Node API". Leave empty to detect it from the repo.
    type: string
steps:
  - {id: scan, file: steps/01-readiness-scan.md, stage: discover, gate: approve, artifact: "l10n/01-readiness.md"}
  - {id: extract, file: steps/02-extract-strings.md, stage: build, gate: approve, artifact: "l10n/02-extraction.md"}
  - {id: formatting, file: steps/03-locale-formatting.md, stage: build, gate: approve, artifact: "l10n/03-formatting.md"}
  - {id: pseudo, file: steps/04-pseudo-localize.md, stage: verify, gate: approve, artifact: "l10n/04-pseudo.md"}
  - {id: handoff, file: steps/05-translation-handoff.md, stage: ship, gate: approve, artifact: "l10n/05-handoff.md"}
  - {id: qa, file: steps/06-linguistic-qa.md, stage: verify, gate: none, artifact: "l10n/06-qa-plan.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes an app that only speaks English to its first extra language the way a localization engineer would: find what blocks translation, make the code translatable, prove it with pseudo-localisation, hand translators a complete package, and gate the release on native review. The first language costs the most because it pays for the plumbing; done well, later languages are mostly translation.

<app_description>
{{app_description}}
</app_description>

Target locale: {{target_locale}}. Stack: {{tech_stack}} (detect from the repo if empty).

Rules for every step:
- Work from the code you have read. Cite file paths; never invent findings, string counts or library APIs.
- Ask for missing essentials (who translates, deadline, platforms) and mark gaps as [X].
- Keep English behaviour and text unchanged unless a fix needs it, and list every such change.
- Do not ship machine translation as final text; do not state legal or store requirements as fact, and say who should verify them.
- End each artifact with open questions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
