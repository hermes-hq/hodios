---
schema: 1
id: automate-translation-file-sync
kind: prompt
title: Automate translation file sync
description: Designs the pipeline between a repo and translators, with key extraction, upload to a translation system or vendor, download of finished locales, CI checks for keys and fallbacks, and approvals.
category: localization
version: 1.0.0
status: incubating
stage: [plan, build]
role: [software-engineer, devops-engineer, tech-lead, engineering-manager]
requires: [none]
inputs: [config, file, text]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [translation-management, string-catalogs, ci-checks, continuous-localization, missing-keys]
pairs_with:
  prompts: [extract-ui-strings, review-translated-strings, write-translator-context-notes]
  personas: [localization-engineer]
args:
  - name: tech_stack
    description: The app stack and i18n library, for example "Next.js with next-intl", "Django with gettext", "Flutter with intl ARB files", "iOS String Catalogs".
    type: string
    required: true
  - name: catalog_format
    description: The format of the source string files.
    type: enum
    enum: [json, po, xliff, arb, android-xml, apple-strings, other]
    default: json
  - name: workflow_notes
    description: Who translates (in-house, agency, community, machine translation with review), any translation management system already chosen, release cadence, branching model and pain points today.
    type: text
output_contract:
  format: markdown
  sections: [Pipeline, Configuration, CI checks, Roles and approvals, Rollout]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translation by email attachment breaks as soon as a team ships weekly. Strings change after they were sent; translated files overwrite each other; a renamed key silently drops a translation; releases go out with raw keys on screen; and nobody knows which locale is complete. Continuous localisation fixes this with a few rules: the source locale lives in the repo and is the single source of truth; target locales flow back through automation, never by hand-editing; CI blocks broken placeholders and missing source keys but does not block on untranslated targets; and a fallback chain decides what users see meanwhile. The translation management system (TMS) is a choice, not the pipeline itself, so the design should work with a vendor file exchange too.
</context>

<task>
Design the translation sync for {{tech_stack}} with {{catalog_format}} catalogs.

{{#workflow_notes}}
<workflow_notes>
{{workflow_notes}}
</workflow_notes>
{{/workflow_notes}}

1. Source of truth: where source strings live, who may edit target-locale files (normally only the sync bot), and how keys are named and commented.
2. Extraction: when keys are extracted (on merge to the main branch, not every commit), with which tool for this stack, and how unused keys are detected and removed after a grace period rather than immediately.
3. Upload: push new and changed source strings with context (comments, screenshots, max length) to the TMS through its CLI or API, or produce an export file (XLIFF is the most portable) for vendors. Changed source text must invalidate or flag existing translations.
4. Download: a scheduled job or webhook that pulls completed translations into a branch and opens a pull request; only reviewed or approved strings are included, per a status rule you define. Never commit directly to the main branch.
5. CI checks on every pull request: catalog syntax valid; placeholders and ICU plural or select structure match the source in every locale; no duplicate keys; no keys used in code but missing in the source catalog; no hard-coded strings in changed UI files if a linter exists. Report, but do not fail on, missing target translations. Report completeness per locale.
6. Fallbacks: the runtime chain (for example `pt-BR` to `pt` to `en`), behaviour for a missing key (fallback text, never the raw key in production), and logging of missing keys.
7. Release gating: which locales ship when below a completeness threshold (for example 100% for checkout, 95% overall), and who decides.
8. Branching: how feature branches handle new strings (translate after merge, or a pre-translation branch for big launches) and how conflicts in generated files are avoided.
9. Machine translation: where it is allowed (draft for human review, never straight to legal or checkout copy) and how it is labelled in the TMS.
</task>

<constraints>
- Stay tool-agnostic in the design; give one concrete example configuration for this stack and say which parts change with another TMS. Do not invent CLI flags or API endpoints; mark them [check docs] when unsure.
- Never store TMS API tokens in the repo; use CI secrets.
- Ask about the translators and cadence if workflow notes are empty and the answer changes the design.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Pipeline
A numbered flow from developer commit to translated release, and a short text diagram.

## Configuration
Example config and CI job definitions for {{tech_stack}}, with comments.

## CI checks
Table: Check | Fails the build? | Tool or script | What it catches.

## Roles and approvals
Table: Role | Owns | Approves.

## Rollout
Steps to move from today's process, including a one-time cleanup of stale keys and a pilot locale.
</output_format>
