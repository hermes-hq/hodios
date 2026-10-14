---
schema: 1
id: translate-user-generated-content
kind: prompt
title: Add translation of user-generated content
description: Adds machine translation of user content such as reviews, comments or messages, with language detection, caching, a show-original toggle, labelling, privacy and moderation rules and cost limits.
category: localization
version: 1.0.0
status: incubating
stage: [design, build]
role: [fullstack-engineer, backend-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [plan, diff, code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ugc, language-detection, translation-cache, privacy, rate-limiting]
pairs_with:
  prompts: [design-multilingual-content-schema, design-llm-translation-pipeline, propagate-locale-through-services]
args:
  - name: content
    description: What content gets translated (reviews, comments, chat messages, listings), volumes, where it is shown, and whether it is public or private.
    type: text
    required: true
  - name: provider
    description: Translation provider or model if chosen, and any contract or data processing constraints. If empty, design provider-neutral.
    type: string
  - name: mode
    description: Translate when the viewer asks, or automatically for viewers whose language differs.
    type: enum
    enum: [on-demand, automatic]
    default: on-demand
output_contract:
  format: markdown
  sections: [Baseline, Design, Data model and cache, API and UI, Privacy and moderation, Cost limits, Changes, Verification, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translating what users write is different from translating the product's own strings: nobody reviews it, it is often short, informal or mixed-language, and it may be private. Language detection on short text is unreliable, so detection should report confidence and use hints (the author's interface language, the thread's language) and skip translation when the source equals the viewer's language. Translations must be cached by content hash, source and target language and provider version, and invalidated when the author edits. The original stays the authoritative text: the UI shows a "translated" label, offers "show original", and keeps the translated block marked with its `lang` for screen readers. Markup, mentions, links, emoji and code inside the content must survive. Sending private messages to a third-party provider needs a legal basis and a data processing agreement; that is a product and legal decision, not an engineering default. Translation can launder abuse past filters that only check the original, so moderation should cover what is displayed. Costs grow with views in automatic mode, so caching, length caps and per-user and global budgets matter.
</context>

<task>
Add translation of user-generated content:

{{content}}

{{#provider}}Provider: {{provider}}.{{/provider}} Mode: {{mode}}.

1. Run the tests and record the baseline. Read how the content is stored, rendered and moderated, and whether any language metadata exists.
2. Design: present the flow (detect source language, decide whether to translate, check the cache, call the provider, store, render), the provider abstraction, and the behaviour for unsupported languages and low-confidence detection. Stop here and ask for confirmation of the design and the Open decisions before writing code.
3. Data model and cache: store detected language and confidence on the content; a translations table or cache keyed by content ID, content hash, target language and provider version; invalidate on edit; set a retention period.
4. API and UI: an endpoint or field that returns the translation for the viewer's language; in {{mode}} mode, either a "translate" action or automatic display; always a "translated from X" label with "show original"; the translated block marked with its `lang`; mentions, links and formatting preserved by translating text segments only.
5. Privacy and moderation: exclude content types the decision rules out (for example private messages without consent), strip or mask personal data where the provider allows, and run moderation on displayed translations as well as originals.
6. Cost limits: length cap per item, per-user and global daily budgets, batching where the provider supports it, and metrics for calls, cache hit rate and spend. Show the cost formula from volumes, without quoting provider prices.
7. Implement the confirmed design in the smallest slice (one content type), with tests that mock the provider: cache hit, edit invalidation, same-language skip, low-confidence detection, preserved mentions and links, budget exhaustion.
8. Run the tests and report results.
</task>

<constraints>
- Never replace or overwrite the original content with its translation.
- Do not send private content to a provider without an explicit decision recorded under Open decisions.
- Do not call a real provider in tests.
- Do not quote provider prices or language-support lists as facts; tell the team to check them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests and current content handling.

## Design
Flow, provider abstraction and edge behaviour.

## Data model and cache
Schema and cache key.

## API and UI
Endpoint and UI behaviour.

## Privacy and moderation
Exclusions, masking and moderation coverage.

## Cost limits
Caps, budgets, metrics and formula.

## Changes
The diff for the first content type.

## Verification
Tests run with real results.

## Open decisions
Legal basis, consent, provider choice and retention.
</output_format>
