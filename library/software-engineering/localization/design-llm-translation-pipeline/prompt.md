---
schema: 1
id: design-llm-translation-pipeline
kind: prompt
title: Design an LLM translation pipeline for string catalogs
description: Designs an LLM translation step for app string catalogs with glossary and context injection, structured output, placeholder and plural validation, review routing by risk, caching and cost control.
category: localization
version: 1.0.0
status: incubating
stage: [design]
role: [tech-lead, ml-engineer, frontend-engineer, architect]
stack: [llm-apps]
requires: [none]
inputs: [text, spec]
output: [plan, diagram, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [glossary-injection, structured-output, human-review, translation-memory, cost-control]
pairs_with:
  prompts: [automate-translation-file-sync, build-localization-glossary, validate-translation-files-in-ci]
args:
  - name: context
    description: Catalog formats and size, locales, how often strings change, current translation process and tool, quality problems seen, budget, and data constraints on sending strings to a model provider.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goals and limits, Pipeline, Prompt and context, Validation, Review routing, Caching and cost, Evaluation, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Language models translate UI strings fluently and fail in predictable ways: they translate terms that must stay fixed (product names, feature names), drift between synonyms for the same concept across batches, pick the wrong sense of a short string with no context ("Save" as rescue, "Post" as mail), break placeholders or translate their names, produce plural messages without the categories the target locale needs, ignore length limits, and switch formality between calls. Most of these are fixed by the pipeline rather than the prompt: reuse exact translation-memory matches first and send only new or changed strings; batch by feature so related strings share context; inject the glossary terms that appear in the batch, the locale's style guide (formality, punctuation) and per-string notes and limits; demand structured output keyed by string ID; validate every result with a real message parser against the source (placeholders, plural categories, tags, length) and retry or flag failures; and route by risk, because legal, pricing, security and safety text needs a human regardless of model quality. Results should be marked machine-translated in the catalog or translation tool so reviewers can find them, and every result should record the model and prompt version used.
</context>

<task>
Design an LLM translation step for:

{{context}}

1. Goals and limits: what the step must achieve (turnaround, quality bar, cost ceiling), what it must never do (auto-publish high-risk text, send data that the constraints forbid), and the assumptions you are making where the input is silent.
2. Pipeline: the stages from a source change to a merged translation: change detection (new and changed source strings), translation memory lookup, batching by feature or namespace, model call, validation, retry, review routing, write-back to the catalog or translation tool, and status marking. Include a diagram in Mermaid or ASCII.
3. Prompt and context: what each call contains: role and task, target locale and its style rules, glossary entries present in the batch with do-not-translate terms, per-string notes, screen or feature context, length limits, plural categories required for the target locale, and the structured output schema keyed by string ID. Keep the instructions short and put data in clearly delimited fields.
4. Validation: deterministic checks on every result with a real message-syntax parser: same placeholder names and types, required plural and select categories, tags preserved, length limits, glossary terms used, no untranslated source left where translation was expected. Define what triggers a retry and what is flagged for review.
5. Review routing: classify strings by risk (legal, pricing, payments, security, safety, marketing headlines versus routine UI), and define who reviews what: always human, sampled human review at a stated rate, or validation only. Include how reviewer edits flow back into translation memory and the glossary.
6. Caching and cost: cache by source text hash, context, glossary version, model and prompt version; translate only deltas; estimate cost per release from the catalog size and change rate given, showing the formula rather than quoting provider prices.
7. Evaluation: a gold set of human translations per locale, automatic checks plus human ratings on a sample, and a gate that a model or prompt change must pass before use.
8. Rollout: start with one low-risk locale and namespace, compare against the current process, then expand.
</task>

<constraints>
- Never route legal, pricing, payment or safety text to publish without human review.
- Do not quote model prices, limits or quality figures as facts; give formulas and say what to measure.
- Do not send strings containing customer data to a provider the constraints forbid.
- Do not rely on the model to validate its own placeholders; use deterministic checks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals and limits
Targets, prohibitions and assumptions.

## Pipeline
Stages and diagram.

## Prompt and context
The call template with fields and the output schema.

## Validation
| Check | Method | On failure |

## Review routing
| Risk class | Examples | Review |

## Caching and cost
Cache key, delta logic and the cost formula.

## Evaluation
Gold set, metrics and the change gate.

## Rollout
Ordered steps.
</output_format>
