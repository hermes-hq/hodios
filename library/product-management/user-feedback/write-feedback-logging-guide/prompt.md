---
schema: 1
id: write-feedback-logging-guide
kind: prompt
title: Write a feedback logging guide
description: Writes a short guide for sales, support and success staff on logging customer feedback well - verbatim, context, account and problem rather than solution - with before-and-after examples.
category: user-feedback
version: 1.0.0
status: incubating
stage: [operate]
role: [product-manager, operations-manager, support-agent, sales-rep]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [product-ops, internal-guide, customer-facing-teams, feedback-quality, verbatim]
pairs_with:
  prompts: [build-feedback-intake-process, design-feedback-tagging-taxonomy, extract-feedback-fields]
args:
  - name: company_context
    description: The product, which teams log feedback, the tool and fields they use, and what the product team struggles with in the feedback it gets today.
    type: text
    required: true
  - name: examples
    description: A few real logged feedback items, anonymised, to use as before-and-after examples. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why this matters, When to log, What to capture, Good and bad examples, Tags and fields, What happens next, Quick checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write internal guides that help customer-facing staff log feedback the product team can use. Most logged feedback fails in the same ways: it records a requested solution ("add a bulk edit button") without the problem behind it, paraphrases away the customer's words, lacks who said it (account, role, plan, value), mixes the logger's opinion with the customer's, inflates urgency to help a deal, and creates a new item instead of adding to an existing one. Staff log well when it takes two minutes, when the guide shows real good and bad examples, and when they see that logged feedback changes things. A guide that reads like a policy document does not get read.

Company context:

<company_context>
{{company_context}}
</company_context>
{{#examples}}

Real examples:

<examples>
{{examples}}
</examples>
{{/examples}}
</context>

<task>
1. Open with why it matters in three or four sentences: what the product team does with logged feedback and what changes when it is logged well. No hype.
2. Say when to log: which conversations and signals count (requests, complaints, workarounds, lost deals, praise for specific things), what not to log (support issues that need a ticket, personal opinions without a customer source), and when to add to an existing item instead of creating one.
3. Explain what to capture, in order: the customer's words verbatim, the problem or job they were trying to do, current workaround, impact (time, money, risk, deal), who (account, role, plan, value), source and date, and the logger's own note clearly marked as such. Map these to the fields of the tool named in the context; if no tool was named, propose generic fields.
4. Give good and bad examples: at least four before-and-after pairs, using the real examples if given (anonymised), covering solution-only requests, missing context, inflated urgency and duplicate items.
5. Define tags and fields: the short list staff should use, with one-line definitions, and how to flag a deal blocker honestly (with deal value and stage, and only when the buyer said so).
6. Explain what happens next: who reviews, how often, how submitters and customers hear back.
7. End with a one-screen checklist staff can keep open while logging.
</task>

<constraints>
- Keep the guide short enough to read in five minutes.
- Use only anonymised examples; replace any real names or company names with placeholders.
- Do not invent tool features; describe fields generically if the tool is unknown.
- Plain, friendly language; no policy jargon.
</constraints>

<output_format>
## Why this matters
Three or four sentences.

## When to log
Bullets.

## What to capture
A table: field | what to write | example.

## Good and bad examples
Before-and-after pairs with a one-line reason.

## Tags and fields
A table: tag or field | use when.

## What happens next
Bullets.

## Quick checklist
Five to eight checkboxes.
</output_format>
