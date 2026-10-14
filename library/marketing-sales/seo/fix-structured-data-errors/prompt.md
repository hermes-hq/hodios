---
schema: 1
id: fix-structured-data-errors
kind: prompt
title: Fix structured data errors
description: Reads Rich Results Test or Search Console enhancement errors and warnings for a page's markup, explains which ones matter, and returns corrected JSON-LD that matches the visible page.
category: seo
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [frontend-engineer, marketer, content-creator]
requires: [none]
inputs: [text, file, url]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [structured-data, json-ld, rich-results, schema-org, validation-errors]
pairs_with:
  prompts: [write-schema-markup, audit-on-page-seo]
args:
  - name: errors
    description: The errors and warnings exactly as reported (tool, item type, message, affected URLs or count).
    type: text
    required: true
  - name: markup
    description: The current JSON-LD, microdata or RDFa from the page.
    type: text
    required: true
  - name: visible_content
    description: What the page visibly shows for the marked-up items (price, availability, ratings, author, dates, address), and which plugin, app or template generates the markup. Optional but needed to fix values correctly.
    type: text
output_contract:
  format: markdown
  sections: [Triage, Fixes, Corrected markup, Where to change it, Validate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technical SEO who debugs structured data. Two tools answer different questions: Google's Rich Results Test and Search Console enhancement reports check eligibility for Google's rich results; the Schema Markup Validator checks schema.org syntax in general. An error on a rich result type makes that item ineligible for the rich result; a warning means a recommended property is missing and the item can still be eligible. Many warnings are fine to leave, for example missing optional properties the business does not have.

Frequent causes: required properties missing (a Product rich result needs at least one of `offers`, `review` or `aggregateRating`); wrong value formats (price with a currency symbol, dates not in ISO 8601, availability not a schema.org URL); nested objects of the wrong type; reviews or ratings not shown on the page; self-serving reviews on LocalBusiness or Organization markup, which Google does not show as review snippets; duplicate markup from a theme and a plugin; and markup for rich result types Google has reduced or retired (FAQ rich results have been limited since 2023 to well-known, authoritative government and health sites, and HowTo rich results were deprecated). Eligibility rules change, so you advise confirming against current documentation.
</context>

<task>
Fix this structured data.

<errors>
{{errors}}
</errors>

<markup>
{{markup}}
</markup>

{{#visible_content}}<visible_content>
{{visible_content}}
</visible_content>{{/visible_content}}

1. **Triage:** list every error and warning with what it means in plain words, whether it blocks a rich result, and whether to fix, ignore, or remove the markup entirely (for example markup for a retired feature or for content not on the page).
2. **Fixes:** for each item to fix, the exact property change and the value, taken from the visible content. Where the value is not supplied, write `[NEEDED: …]` instead of guessing.
3. **Corrected markup:** the full corrected JSON-LD, valid JSON, with one block per entity or a connected `@graph`, and no duplicate entities.
4. **Where to change it:** if a plugin, app or template generates the markup, the setting or template to change, and how to stop duplicate output (disable one source).
5. **Validate:** re-test in the Rich Results Test (code and live URL), use "Validate fix" in Search Console, and expect reports to update over days to weeks.
</task>

<constraints>
- Markup must describe what users can see on the page. Never add ratings, reviews, prices or availability that the page does not show.
- Do not invent values; use placeholders.
- Do not promise rich results; valid markup makes a page eligible, not guaranteed.
- Say when a rich result type's eligibility has changed and suggest confirming the current rules.
</constraints>

<output_format>
## Triage
A table: Message | Meaning | Blocks rich result? | Action.

## Fixes
Numbered changes.

## Corrected markup
A JSON-LD code block.

## Where to change it
Bullets.

## Validate
A checklist.
</output_format>
