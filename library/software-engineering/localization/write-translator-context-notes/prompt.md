---
schema: 1
id: write-translator-context-notes
kind: prompt
title: Write translator context notes
description: Adds translator-facing context to an existing string catalog - where each string appears, length limits, placeholders, tone, plurals, gender and do-not-translate terms - in its own format.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, frontend-engineer, mobile-engineer, technical-writer]
requires: [none]
inputs: [file, text]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [translator-comments, string-catalogs, placeholders, character-limits, ambiguity]
pairs_with:
  prompts: [extract-ui-strings, translate-string-catalog, build-localization-glossary, review-translated-strings]
  personas: [localization-engineer]
args:
  - name: string_catalog
    description: The source-language catalog (JSON, PO, XLIFF, ARB, Android strings.xml, Apple String Catalog or .strings), ideally with the code or screen names where strings are used.
    type: text
    required: true
  - name: product_context
    description: What the product is, who uses it, its tone of voice, brand and product names that stay in English, and UI constraints such as button widths or SMS limits.
    type: text
output_contract:
  format: markdown
  sections: [Annotated catalog, Ambiguous strings, Questions for the team]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translators usually see one string at a time, out of context, in a translation tool. "Open" might be a verb on a button or an adjective on a status badge; "Post" might be a noun or a verb; "{count} new" hides whether it means messages or followers and which grammatical gender the target language needs; "Back" might mean go back or the back of a card. Without notes they guess, and wrong guesses ship. Good context notes are short, factual and in the catalog's native comment field so the translation tool shows them: where the string appears and what it does, its part of speech when ambiguous, every placeholder explained with an example value, the length limit, tone, and terms not to translate.
</context>

<task>
Add translator context to this catalog:

<string_catalog>
{{string_catalog}}
</string_catalog>

{{#product_context}}
<product_context>
{{product_context}}
</product_context>
{{/product_context}}

1. Identify the format and its comment mechanism: `description` in ICU JSON message descriptors or a parallel `_comments` file for flat JSON, `#.` extracted comments in PO, `<note>` in XLIFF, `@key` `description` and `placeholders` in ARB, XML comments or `tools:` attributes in Android `strings.xml`, the `comment` field in Apple String Catalogs or `/* */` in `.strings`. Use only what the format supports.
2. For every string, write a note of one or two short sentences covering only what applies:
   - Where it appears and what it does ("Button that saves the edited profile", "Status badge on an order").
   - Part of speech or meaning when the source word is ambiguous.
   - Each placeholder: what it holds, an example value, and whether it can be moved in the sentence. Example: "{name} is the recipient's first name, e.g. Ana".
   - Length limit when the UI constrains it ("Max 20 characters: fits a bottom tab"), only if known or inferable; otherwise flag it.
   - Plural or gender dependencies, and whether the string is a full sentence or a fragment.
   - Terms that must not be translated (product names, feature names, code), and tone if it differs from the default (legal, playful).
3. Do not change keys or source text. If a source string is itself a problem for translation (concatenated fragments, a plural done with "(s)", a hidden gender), list it under Ambiguous strings with the suggested fix for developers.
4. Skip notes that add nothing ("Cancel" on a dialog button needs only "Button that closes the dialog without saving").
</task>

<constraints>
- Never guess where a string appears when the key and the code give no evidence; write the note with [screen?] and add a question instead.
- Keep notes in plain, international English, under about 30 words each.
- Keep the catalog syntactically valid in its format.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Annotated catalog
The full catalog in its original format with notes added, nothing else changed.

## Ambiguous strings
Table: Key | Problem | Suggested source fix.

## Questions for the team
Numbered questions about unknown screens, limits or terms, at most ten.
</output_format>
