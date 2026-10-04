---
schema: 1
id: plan-new-language-launch
kind: prompt
title: Plan a new language launch
description: Plans adding one more language or market to an already localised app, with translation effort, formats, legal and support content, store listings, native QA, flagged rollout and a checklist.
category: localization
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, product-manager, tech-lead]
requires: [none]
inputs: [spec, notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [market-launch, translation-effort, feature-flags, linguistic-qa, store-listing, launch-checklist]
pairs_with:
  prompts: [automate-translation-file-sync, review-translated-strings, design-locale-detection-and-routing, plan-rtl-support]
  workflows: [app-localization-track]
  personas: [localization-engineer]
args:
  - name: app_description
    description: The app and its current localisation set-up - platforms, languages already shipped, i18n library, how translation is done today, string and word count if known, release cadence.
    type: text
    required: true
  - name: new_locale
    description: The language and market to add, for example "pt-BR", "Japanese for Japan", "Arabic for Saudi Arabia".
    type: string
    required: true
  - name: constraints
    description: Deadline, budget, team, and anything decided already (for example "launch with a partner in March", "no budget for voice-over").
    type: text
output_contract:
  format: markdown
  sections: [Scope, Effort estimate, Workstreams, Rollout, Launch checklist, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Adding a language to an app that already ships in several sounds like "send the strings to a translator". In practice the UI strings are often half the work. The rest: help centre and emails, legal documents that need local review, app store listings and screenshots, payment methods and currency, date and address formats the code may not yet handle, support coverage in that language, and native-speaker QA in context. Launches slip when these are found late, and quality suffers when a language goes live at 100% machine translation. A good plan sizes the work from the real word count, separates what engineering owns from what other teams own, and ships behind a flag to a small audience first.
</context>

<task>
Plan the launch of {{new_locale}} for this app:

<app_description>
{{app_description}}
</app_description>

{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Scope: list every content surface that needs the language - UI strings, server-generated text (emails, push, SMS, PDFs), help centre, onboarding videos, legal (terms, privacy notice, consent text), app store or marketplace listings with screenshots, marketing site, support macros. Mark each in, out or later, with a reason.
2. Engineering readiness for this locale specifically: plural categories (for example Arabic has six, Japanese one), script and direction (right-to-left needs its own project), fonts, date, number, currency and address formats, name order, input methods, text expansion or contraction, sorting, and any locale-specific integrations (payment methods, tax, phone formats). Note what the app already handles and what is new.
3. Effort: estimate translation volume from the word count if given (ask for it otherwise), using an assumption for throughput (state it, for example 2,000 to 3,000 words per translator per day for new words, less with review) and repetition savings from the translation memory. Estimate engineering and QA separately. Show the numbers.
4. Workstreams and owners: engineering, translation and review, legal, support, marketing and store, QA. For legal content, plan a review by someone qualified in that market.
5. Linguistic QA: native reviewers in context (screenshots or a staging build), a terminology glossary and style guide for the language, and a bug severity scale.
6. Rollout: behind a feature flag or locale allowlist, internal dogfood, then a percentage or beta group, then general availability; success metrics (crash-free, conversion versus other locales, support tickets in the language) and a rollback rule.
7. Launch checklist with owners and dates relative to launch (T-6 weeks and so on).
</task>

<constraints>
- Do not state market legal requirements, store policies or language-law obligations as fact; list what to check and with whom.
- Label every estimate as an assumption with its basis; never present a guessed word count as known.
- If the app's current languages or i18n set-up are unknown, ask before estimating.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
Table: Surface | In, out or later | Owner | Notes.

## Effort estimate
Table: Workstream | Basis and assumptions | Estimate. Then a total and the critical path.

## Workstreams
Bullets per workstream with the key tasks.

## Rollout
Numbered stages with entry criteria, metrics and rollback rule.

## Launch checklist
Table: When (T-minus) | Task | Owner | Done when.

## Risks and questions
Bullets: top risks with mitigations, and open questions.
</output_format>
