---
schema: 1
id: translate-string-catalog
kind: prompt
title: Translate a software string catalog
description: Translates a software string file (JSON, PO, XLIFF, ARB, Android or Apple strings) keeping keys, placeholders, plurals and length limits intact. Use when localizing an app's UI text.
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
    description: Register for addressing the user, such as du or Sie, tu or vous, tú or usted. match-existing follows the glossary or any strings already translated in the file.
    type: enum
    enum: [match-existing, formal, informal]
    default: match-existing
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
Translate this catalog into {{target_locale}}, using the {{formality}} register (for match-existing: follow the glossary or the strings already translated; if there are none, use the register the platform's own UI uses for {{target_locale}} and record that choice in Review notes):

{{catalog}}

Glossary: {{glossary}}

1. Identify the format and follow its rules exactly:
   - **JSON:** keys, nesting and order unchanged; escape quotes and backslashes.
   - **PO:** keep `msgid` and `msgctxt`; fill `msgstr`, or `msgstr[0..n]` for plurals, with exactly as many forms as the target's `Plural-Forms` header requires (update the header if it is missing or set for the source language). Keep flags such as `c-format`.
   - **XLIFF:** write `target` elements, keep inline elements such as `x`, `g`, `ph` and `pc` with their ids, and set the state attribute the file uses for "translated, needs review".
   - **ARB:** translate values only, and keep `@` metadata entries unchanged.
   - **Android `strings.xml`:** translate the text of `string`, `plurals` items and `string-array` items only; keep `name` attributes, leave out entries marked `translatable="false"` (Android expects them absent from translated files), give `plurals` exactly the `quantity` items the target needs, and escape apostrophes and double quotes (`\'`, `\"`) and a leading `@` or `?`.
   - **Apple `.strings` and `.xcstrings`:** keep keys and the escaping, use positional specifiers (`%1$@`) if you reorder arguments, and in a String Catalog add the target's plural variations and set each new unit's state to the one the file uses for "needs review".
2. Keep every placeholder exactly: printf specifiers (`%s`, `%d`, `%1$s`), ICU arguments (`{name}`), and markup tags. Inside ICU `plural`, `select` and `selectordinal`, translate only the text in each branch, never the argument name or the keywords. Add or remove plural branches to match the CLDR categories of {{target_locale}}: for example one, few, many and other for Polish or Russian, only other for Japanese, and six categories for Arabic. Always keep `other`.
3. Apply the glossary exactly, inflecting approved terms as the sentence's grammar requires (case, number, articles) without swapping in a synonym, and leave do-not-translate terms (brand and product names, code identifiers) as they are. Use one translation per source term across the whole file.
4. Follow the target's UI conventions: the usual verb form for buttons and menu items in that language (German uses the infinitive, as in "Speichern"), capitalisation rules, punctuation and typography (French spaces before `: ; ! ?`, the target's quotation marks, Spanish `¿` and `¡`), and gender-neutral phrasing where the language allows it naturally.
5. Respect length limits from comments or metadata. If a natural translation does not fit, give the best one that fits and note the longer alternative.
6. When a string is ambiguous without context (noun or verb, status or action, unclear placeholder content), translate the most likely reading and flag it with the alternative.
</task>

<constraints>
- Output the complete file. Never drop, merge, reorder or add keys, apart from the Android `translatable="false"` exception above.
- The file must stay syntactically valid in its format.
- Do not "improve" the source text. If the source has an error, translate what was meant and flag it.
- If the catalog is not a recognisable string catalog, or {{target_locale}} is not a valid locale, say so and stop.
</constraints>

<output_format>
## Translated catalog
The full translated file in one code block, in the original format.

## Review notes
| Key | Type (ambiguous / length / glossary / plural change / register / source issue) | Note and alternative |
"None" if there are no notes.
</output_format>
