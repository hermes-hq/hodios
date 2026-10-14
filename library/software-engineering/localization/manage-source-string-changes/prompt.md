---
schema: 1
id: manage-source-string-changes
kind: prompt
title: Manage changes to source strings
description: Designs how edits to existing source-language strings reach translators, deciding new key versus same key, marking translations stale, what users see meanwhile, and reuse of translation memory.
category: localization
version: 1.0.0
status: incubating
stage: [design, maintain]
role: [frontend-engineer, tech-lead, software-engineer]
requires: [repo-read]
inputs: [repo, text]
output: [plan, checklist, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [stale-translations, translation-memory, key-versioning, copy-changes, workflow-policy]
pairs_with:
  prompts: [automate-translation-file-sync, review-source-copy-for-translation, validate-translation-files-in-ci]
args:
  - name: setup
    description: Catalog format, key style (semantic keys or source text as key), translation tool or vendor, how often copy changes, and what went wrong recently if anything.
    type: text
    required: true
  - name: locales
    description: Locales shipped.
    type: string
output_contract:
  format: markdown
  sections: [Current behaviour, Policy, Mechanism, What users see meanwhile, Pull request checks, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Adding strings is easy; changing existing ones is where localisation silently rots. If a key keeps its name while its English text changes meaning ("Delete" becomes "Archive"), every other language keeps the old meaning indefinitely. If every typo fix creates a new key, translators redo work and users see English until they catch up. The answer is a policy plus a mechanism: meaning changes get a new key (or a version suffix) and the old one is removed when unused; wording fixes keep the key but mark translations for review. Formats already carry the state: gettext marks changed entries `fuzzy` on `msgmerge`, XLIFF has target states such as needs-review, and translation management systems track a source hash per string. Where nothing records the source a translation was made from, store a hash of it. What users see while a translation is stale depends on risk: a stale cosmetic string is better than English, but a stale price, legal term or safety instruction must not be shown. Translation memory makes small edits cheap if the tool sees them as edits rather than new strings, which semantic keys enable and source-text keys break.
</context>

<task>
Design how changes to existing source strings are handled for:

{{setup}}

{{#locales}}Locales: {{locales}}.{{/locales}}

1. Current behaviour: if repository access is available, read the catalogs, sync scripts and recent history of source-file edits to describe what happens today when an English string changes (key kept or renamed, how translators learn of it, what users see). Otherwise derive it from the description and state that.
2. Policy: write a short decision table: typo or punctuation fix, wording change with the same meaning, meaning change, string split or merged, string deleted. For each: key action, translation status, whether users may still see the old translation, and who decides.
3. Mechanism: how the status is recorded in this setup: gettext fuzzy flags, XLIFF states, the translation tool's outdated flag, or a stored source hash next to each translation. Describe how the sync step sets it and how translators see it.
4. What users see meanwhile: classify strings by risk (legal, pricing, safety and security, account actions versus cosmetic) with a key prefix or metadata tag, and define the behaviour per class: keep the stale translation, fall back to the source language, or block release.
5. Pull request checks: a CI check that lists changed source values in the diff and requires the author to mark each as copy fix or meaning change (label, commit trailer or a changes file); meaning changes without a new key fail.
6. Rollout: steps to adopt the policy, including a one-time pass that marks translations whose source changed since they were last updated, if history allows that.
</task>

<constraints>
- Do not recommend deleting keys still referenced in code.
- Do not assume a translation tool's features; ask or mark as "check in your tool".
- Do not change files in this step; the output is a design.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current behaviour
What happens today, with evidence.

## Policy
| Change type | Key action | Translation status | Users may see old translation | Decided by |

## Mechanism
How status is recorded and propagated.

## What users see meanwhile
Risk classes and behaviour per class.

## Pull request checks
The check and how authors satisfy it.

## Rollout
Ordered steps.
</output_format>
