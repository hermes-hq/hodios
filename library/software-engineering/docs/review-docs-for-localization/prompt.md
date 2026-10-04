---
schema: 1
id: review-docs-for-localization
kind: prompt
title: Review developer docs for translation
description: Reviews docs-as-code source for translation blockers like text in images, built sentences, code mixed into prose and unstable anchors, and returns fixes, a do-not-translate list and page priorities.
category: docs
version: 1.0.0
status: incubating
stage: [review, plan]
role: [technical-writer, maintainer, developer-advocate]
stack: []
requires: [none]
inputs: [document, text, config]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [translation-readiness, docs-as-code, do-not-translate, machine-translation, docs-translation]
pairs_with:
  prompts: [build-localization-glossary, reorganize-docs-by-diataxis]
args:
  - name: docs_sample
    description: Representative docs source files as written (Markdown, MDX, reStructuredText, AsciiDoc), including any shared snippets, variables or components they use. Three to six pages is enough.
    type: text
    required: true
  - name: docs_tooling
    description: The docs generator and i18n setup, if any, for example "Docusaurus 3 with i18n plugin, Crowdin" or "MkDocs, no translation yet".
    type: string
    default: not stated
  - name: target_languages
    description: Languages planned, and whether human translators, machine translation or both will be used.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Summary, Blocking issues, Fix list, Do-not-translate list, Page priority, Process notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developer docs are harder to translate than ordinary prose because code, product names, UI labels and prose are interleaved in one source file. Translation projects for docs fail in predictable ways: sentences assembled from variables or reusable snippets that cannot be reordered in other languages; code identifiers, CLI flags and config keys translated by mistake; screenshots and diagrams with baked-in English text; examples with US-only dates, currencies, phone numbers or addresses; UI labels in the docs that do not match the translated product strings; and heading-based anchors that change per language and break links. This review is about structure and readiness, not line editing. Tooling: {{docs_tooling}}. Target languages and method: {{target_languages}}.
</context>

<task>
<docs_sample>
{{docs_sample}}
</docs_sample>

1. Scan the source for blockers and classify each finding:
   - built text: sentences assembled from variables, includes or components, or plurals handled in English only;
   - code in prose: identifiers, flags, keys, file paths or values not wrapped in code formatting, so translators or machine translation will change them;
   - UI references: product labels written in prose instead of referenced from the product's string catalog or marked as UI text;
   - media: images, diagrams and videos with embedded text, and alt text that is missing or says "image";
   - locale-bound examples: dates, numbers, currencies, units, names, addresses, phone numbers, and cultural references or idioms;
   - links and anchors: anchors generated from headings, hard-coded English URLs, links to English-only external pages;
   - markup hazards: inline HTML or JSX that splits a sentence, admonitions or tabs whose titles are not translatable strings, front matter fields that should or should not be translated.
2. For each finding give the location, why it breaks translation, the fix in the source, and severity: blocking (translation will produce wrong or broken pages), costly (extra work per language) or minor.
3. Build a do-not-translate list from the sample: product and feature names, API names, commands, config keys, error codes, and terms the team wants kept in English, each with a note.
4. Propose page priority for the first translation wave: pages most read by new users in the target markets (installation, quickstart, top tasks), then the rest; reference generated from code may need a different route (keep English, or translate descriptions only). Say what data would confirm the order.
5. Note process essentials: a source freeze or change-tracking approach so translations do not go stale, explicit anchor ids, a pseudo-translation build to catch hard-coded strings, and review by a technical speaker of each language.
</task>

<constraints>
- Base findings only on the sample; say how to search the full docs for the same pattern (a regex or a lint rule) rather than claiming it is everywhere.
- Do not rewrite whole pages; show before and after only for the lines you fix.
- Do not claim a docs tool or translation platform supports a feature unless it is well known; otherwise mark "(check your tool)".
- If no sample files are given, ask for them and stop.
</constraints>

<output_format>
## Summary
Three to five sentences: readiness, biggest blockers, rough effort.
## Blocking issues
Table: location, category, problem, fix.
## Fix list
Table for costly and minor issues: location, category, before, after.
## Do-not-translate list
Table: term, type (product, API, command, key, code), note.
## Page priority
Numbered list of pages or groups with the reason.
## Process notes
Bullets, each with one concrete action.
</output_format>
