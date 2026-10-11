---
schema: 1
id: localize-app-store-listing
kind: prompt
title: Localize app store listings in a pipeline
description: Sets up localized App Store and Google Play listings as files in the repo, with per-locale metadata within each store's limits, keyword fields, localized screenshots, release notes and CI checks.
category: localization
version: 1.0.0
status: incubating
stage: [ship]
role: [mobile-engineer, devops-engineer]
stack: [ios, android]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, config, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [fastlane, store-metadata, localized-screenshots, release-notes, character-limits]
pairs_with:
  prompts: [write-app-store-listing, plan-new-language-launch, localize-react-native-app]
args:
  - name: project
    description: App platforms, how metadata is managed today (store consoles by hand, fastlane, store APIs), CI system, and how screenshots are produced.
    type: text
    required: true
  - name: locales
    description: Store locales to support, for example "en-US, de-DE, ja, pt-BR, es-MX".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Locale mapping, Metadata files, Limits and checks, Screenshots, Release notes, Publishing, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Store listings are usually edited by hand in two consoles, so localized versions drift, release notes ship in English only and screenshots show the English UI in every market. Keeping metadata as files in the repository (fastlane's `deliver` for the App Store and `supply` for Google Play use one folder per locale with one text file per field) makes it reviewable and translatable like any other catalog. The two stores use different locale codes and sets (Apple's language list and Google Play's both include region variants, but not the same ones), so a mapping table from the product's locales is needed. Each field has a character limit (App Store name and subtitle, the keyword field, promotional text, description; Google Play title, short and full description, per-release changelogs), and limits change, so the CI check should read limits from one config file the team can update. The App Store keyword field is comma-separated and not visible to users; repeating words already in the name wastes space, and some storefronts index more than one localization, so keywords should not duplicate across them. Localized screenshots need the app running in each locale with realistic local data, which tools like fastlane `snapshot` and `screengrab` or UI tests can automate.
</context>

<task>
Set up localized store listings for:

{{project}}

Locales: {{locales}}.

1. Record the baseline: what metadata exists in the repo and the consoles, the fastlane setup if any, and CI status. If metadata exists only in the consoles, download it with the tool's download command rather than retyping it, and ask before running anything that authenticates to a store.
2. Locale mapping: a table from each product locale to the App Store and Google Play locale codes, flagging locales one store does not support and fallbacks the team must accept.
3. Metadata files: create the per-locale folder structure for both stores with one file per field (name or title, subtitle, short description, description, keywords, promotional text, privacy and support URLs where per-locale, release notes), leaving non-source locales with source text marked for translation.
4. Limits and checks: one config file with each field's limit per store, and a CI script that fails on fields over the limit, empty required fields, keyword fields that repeat words from the name, and leftover source-language text in translated locales where detectable. Note that the team should confirm current limits in each store's documentation.
5. Screenshots: set up or extend automated screenshot capture that launches the app in each locale with locale-appropriate demo data, device sizes required by each store, and right-to-left locales checked for mirrored layout.
6. Release notes: a per-release file per locale and a step in the release process that blocks submission if any shipped locale lacks notes for the version, or falls back by a stated rule.
7. Publishing: the lane or pipeline step that uploads metadata and screenshots (without submitting for review unless asked), with credentials taken from CI secrets and never written to the repo.
8. Run the checks locally and report results.
</task>

<constraints>
- Do not authenticate to a store, upload or submit without explicit confirmation.
- Never write store credentials or API keys into the repository.
- Do not write translations or keyword research; prepare files for translators and marketers.
- Do not state store limits or ranking rules as permanent facts; keep limits in config and say to confirm them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Current metadata, tooling and CI.

## Locale mapping
| Product locale | App Store | Google Play | Note |

## Metadata files
Folder structure and the files created.

## Limits and checks
The limits config and CI script.

## Screenshots
Capture setup per platform and locale.

## Release notes
Files and the release gate.

## Publishing
The upload step and secrets handling.

## Follow-ups
Translation, keyword research and decisions needed.
</output_format>
