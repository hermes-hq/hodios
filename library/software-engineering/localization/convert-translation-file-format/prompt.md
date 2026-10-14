---
schema: 1
id: convert-translation-file-format
kind: prompt
title: Convert translation files between formats
description: Converts string catalogs between formats such as gettext PO, XLIFF, JSON, ARB, Android XML and Apple strings, mapping placeholders, plurals, comments and status without losing data.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [file, text]
output: [code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [file-formats, xliff, gettext, message-catalog]
pairs_with:
  prompts: [translate-string-catalog, write-icu-plural-messages]
args:
  - name: source_files
    description: The catalog content to convert, with its format and locale.
    type: text
    required: true
  - name: target_format
    description: The format to produce, for example "XLIFF 2.0", "i18next JSON v4", "ARB", "Android strings.xml", "Apple .xcstrings" or "gettext PO".
    type: string
    required: true
  - name: placeholder_style
    description: The interpolation syntax the target runtime expects, if it differs from the format's default, for example {name}, double-brace name, %1$s or %(name)s.
    type: string
output_contract:
  format: markdown
  sections: [Mapping, Converted files, Loss report, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Formats look interchangeable until plurals and placeholders meet. gettext stores plurals as `msgstr[0..n]` driven by a `Plural-Forms` header, i18next v4 uses `_one`/`_few`/`_other` key suffixes, Android uses `<plurals>` with CLDR quantities, ARB and xcstrings carry ICU or their own variation blocks, and XLIFF holds plurals however the tool that wrote it chose. Placeholders differ too: `%s` and `%d` are positional and break when a translation reorders them, `%1$s` is not, and a double-brace placeholder in one library is literal text in another. Converters that move only key and text drop translator comments, fuzzy or review status, max-length notes and context (`msgctxt`), and silently merge two entries that only differed by context.
</context>

<task>
Convert this catalog to {{target_format}}:

{{source_files}}

{{#placeholder_style}}Target placeholder syntax: {{placeholder_style}}.{{/placeholder_style}}

1. Identify the source format and version, locale, plural model, placeholder syntax, escaping rules, and which metadata it carries (comments, context, status, max length, source references).
2. Write a field mapping from source to target, including where each kind of metadata goes in the target or that it has no home there.
3. Convert keys. When the source keys are the English text (gettext `msgid`), choose: keep text as keys, or generate stable keys and record the mapping. Keep `msgctxt` or equivalent context as part of the key or as a separate field so entries never merge.
4. Convert placeholders: map every placeholder to the target syntax, turn positional `%s` into numbered or named arguments when the target allows reordering, and keep the same set of placeholders in every string.
5. Convert plurals to the target's model using the locale's CLDR categories. When going from gettext indexes to named categories, derive the mapping from the `Plural-Forms` expression and say which index became which category.
6. Escape for the target: XML entities and apostrophes for Android, apostrophe rules for ICU, quotes and backslashes for JSON and `.strings`.
7. Produce the converted files and a round-trip check: the count of entries, plurals and placeholders before and after.
</task>

<constraints>
- Never translate, correct or reword string text during conversion.
- Never drop an entry; if something cannot be represented, keep it with a comment and list it in the loss report.
- Do not guess a gettext plural mapping without the `Plural-Forms` header; ask for it or name the locale's standard header and mark it as assumed.
- Keep fuzzy, needs-review or untranslated status as status, not as translated text.
{{> output/uncertainty}}
</constraints>

<output_format>
## Mapping
| Source construct | Target construct | Notes |

## Converted files
One code block per output file.

## Loss report
Metadata or constructs with no equivalent in the target, entry by entry.

## Checks
Entry, plural and placeholder counts before and after, and anything to verify with the target tool's own validator.
</output_format>
