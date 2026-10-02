---
schema: 1
id: build-translation-glossary
kind: prompt
title: Build a translation glossary
description: Builds a bilingual glossary for a document or project with key terms, approved translations, do-not-translate terms, definitions and usage notes. Keeps long or multi-person translations consistent.
category: translation
version: 1.0.0
status: incubating
stage: [plan]
role: [editor, writer]
requires: [none]
inputs: [document, text]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [termbase, terminology, do-not-translate, consistency, tbx]
pairs_with:
  prompts: [post-edit-machine-translation, review-translation, translate-subtitles]
  personas: [translator]
args:
  - name: source_text
    description: The source document or a representative sample of the project (several pages work best), in the source language.
    type: text
    required: true
  - name: target_language
    description: The language and variety the project is translated into (for example "Latin American Spanish", "French (France)").
    type: string
    required: true
  - name: domain
    description: Subject area and audience (for example "medical device user manual for patients", "B2B SaaS help centre", "fantasy novel series"). Optional; inferred from the text if empty.
    type: string
output_contract:
  format: markdown
  sections: [Scope, Glossary, Do not translate, Open questions, Import block]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a terminologist preparing a project glossary before translation into {{target_language}} begins. Inconsistent terminology is the most common complaint about long and multi-translator projects, and it is cheap to prevent: decide each key term once, with a definition so everyone means the same thing, a note on how to use it, and a clear list of what stays untranslated. A glossary that lists every common word is useless; one that misses the product names and domain terms is dangerous.

{{#domain}}Domain and audience: {{domain}}.{{/domain}}
If no domain is given, infer it from the text and state it.

<source_text>
{{source_text}}
</source_text>
</context>

<task>
1. Identify the source language and the domain. If the text is too short to extract terminology meaningfully (a sentence or two with no domain or recurring terms), say so and ask for more.
2. Extract candidate terms: domain terms, product and feature names, UI labels, recurring multi-word expressions, abbreviations and acronyms, defined terms (often capitalised or in quotes), and words used in a special sense in this text. Skip general vocabulary a competent translator would handle consistently anyway.
3. For each term, propose the target term in {{target_language}}:
   - the established equivalent in the domain where one exists (for regulated fields, the term used in official or standard terminology for the target locale);
   - otherwise a proposed translation marked as "proposed";
   - alternatives considered and why they were rejected, when the choice is not obvious.
4. Write a short definition in the source language as used in this text, part of speech, and a usage note (gender, plural, capitalisation, whether to keep the English in brackets on first use, forbidden alternatives).
5. List do-not-translate items: brand and product names, code, UI strings that stay in the source language, legal names, and anything the text marks as a trademark, with how to handle them (keep as is, keep with explanation, transliterate).
6. List open questions for the client: terms whose meaning is unclear from the text, terms with competing translations, and choices that depend on the client's existing materials.
7. Output an import block the user can load into a CAT tool or spreadsheet.
</task>

<constraints>
- Include a term only if it appears in the text, and quote one short context sentence for each.
- Do not present a proposed translation as established. If you are unsure of a domain's standard term in {{target_language}}, say so in the note.
- Keep one approved target term per concept; list variants under "forbidden" if they should not be used.
- Sort the glossary alphabetically by source term; scale the number of entries to the text (up to about 60) and never pad it with general vocabulary.
</constraints>

<output_format>
## Scope
Languages, domain and audience, number of terms.
## Glossary
Table: Source term | Target term | Status (established, proposed) | Part of speech | Definition | Context | Usage note.
## Do not translate
Table: Item | Handling | Reason.
## Open questions
Numbered list.
## Import block
A fenced block of tab-separated values with the header: source<TAB>target<TAB>status<TAB>note
</output_format>
