---
schema: 1
id: translate-string-catalog
kind: prompt
title: Translate a software string catalog
description: Translates a software string file (JSON, PO, XLIFF, ARB, .strings) while preserving keys, placeholders, plural forms and length limits, and flags ambiguous strings for review.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, frontend-engineer, product-manager]
requires: [none]
inputs: [file, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [translation-files, plural-forms, placeholders, xliff]
pairs_with:
  prompts: [review-translated-strings, build-localization-glossary]
args:
  - name: catalog
    description: The source catalog file contents, including translator comments and metadata.
    type: text
    required: true
  - name: target_locale
    description: BCP 47 locale to translate into, for example de-DE, pt-BR, ja or ar.
    type: string
    required: true
  - name: glossary
    description: Approved term translations and do-not-translate terms. Leave empty if there is none.
    type: text
  - name: formality
    description: Register for addressing the user, such as du or Sie, tu or vous, tú or usted.
    type: enum
    enum: [formal, informal]
    default: informal
output_contract:
  format: markdown
  sections: [Translated catalog, Review notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A string catalog is code that happens to contain language. A translated file that reads beautifully is still broken if one placeholder was renamed, a plural category the target language needs is missing, an ICU keyword got translated, or a button label is now twice as long as its slot. Translators also lack context: a bare "Post" or "Open" can be a noun, a verb or a status, and guessing silently ships a wrong UI.
</context>

<task>
Translate this catalog into {{target_locale}}, using the {{formality}} register:

{{catalog}}

Glossary: {{glossary}}

1. Identify the format and follow its rules exactly:
   - **JSON:** keys, nesting and order unchanged; escape quotes and backslashes.
   - **PO:** keep `msgid` and `msgctxt`; fill `msgstr`, or `msgstr[0..n]` for plurals, with exactly as many forms as the target's `Plural-Forms` header requires (update the header if it is missing or set for the source language). Keep flags such as `c-format`.
   - **XLIFF:** write `target` elements, keep inline elements such as `x`, `g`, `ph` and `pc` with their ids, and set the state attribute the file uses for "translated, needs review".
   - **ARB:** translate values only, and keep `@` metadata entries unchanged.
   - **.strings:** keep keys and the escaping, and use positional specifiers (`%1$@`) if you reorder arguments.
2. Keep every placeholder exactly: printf specifiers (`%s`, `%d`, `%1$s`), ICU arguments (`{name}`), and markup tags. Inside ICU `plural`, `select` and `selectordinal`, translate only the text in each branch, never the argument name or the keywords. Add or remove plural branches to match the CLDR categories of {{target_locale}}: for example one, few, many and other for Polish or Russian, only other for Japanese, and six categories for Arabic. Always keep `other`.
3. Apply the glossary exactly, and leave do-not-translate terms (brand and product names, code identifiers) as they are. Use one translation per source term across the whole file.
4. Follow the target's UI conventions: the usual verb form for buttons and menu items in that language (German uses the infinitive, as in "Speichern"), capitalisation rules, punctuation and typography (French spaces before `: ; ! ?`, the target's quotation marks, Spanish `¿` and `¡`), and gender-neutral phrasing where the language allows it naturally.
5. Respect length limits from comments or metadata. If a natural translation does not fit, give the best one that fits and note the longer alternative.
6. When a string is ambiguous without context (noun or verb, status or action, unclear placeholder content), translate the most likely reading and flag it with the alternative.
</task>

<constraints>
- Output the complete file. Never drop, merge, reorder or add keys.
- The file must stay syntactically valid in its format.
- Do not "improve" the source text. If the source has an error, translate what was meant and flag it.
- If the catalog is not a recognisable string catalog, or {{target_locale}} is not a valid locale, say so and stop.
</constraints>

<output_format>
## Translated catalog
The full translated file in one code block, in the original format.

## Review notes
| Key | Type (ambiguous / length / glossary / plural change / source issue) | Note and alternative |
"None" if there are no notes.
</output_format>
