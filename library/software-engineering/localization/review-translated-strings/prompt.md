---
schema: 1
id: review-translated-strings
kind: prompt
title: QA a translated string catalog
description: QA-checks a translated catalog against its source for placeholder mismatches, broken syntax, truncation risk, terminology drift and untranslated strings. Use before merging translations.
category: localization
version: 1.0.0
status: incubating
stage: [review, verify]
role: [software-engineer, frontend-engineer, product-manager, editor]
requires: [none]
inputs: [file, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [translation-qa, placeholders, terminology]
pairs_with:
  prompts: [translate-string-catalog, build-localization-glossary]
args:
  - name: source_catalog
    description: The source-language catalog, including comments and length limits.
    type: text
    required: true
  - name: translated_catalog
    description: The translated catalog to check, in the same format.
    type: text
    required: true
  - name: glossary
    description: Approved term translations and do-not-translate terms. Leave empty to check only internal consistency.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Could not verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translation QA catches the defects that crash or embarrass the app before users see them. In rough order of cost: a renamed or dropped placeholder that throws at runtime or prints `{name}`, broken ICU or file syntax that fails the whole catalog, missing keys that fall back to English mid-screen, a label too long for its button, and the same product term translated three different ways. Judging fluency is secondary and needs a native speaker. Mechanical checks must be exhaustive.
</context>

<task>
Check the translation against the source.

Source:
{{source_catalog}}

Translation:
{{translated_catalog}}

Glossary: {{glossary}}

Work through every key. Do not sample.
1. **Coverage:** keys missing from the translation, extra keys not in the source, empty values, and values identical to the source. For identical values, decide whether they are legitimate (brand names, "OK", codes, true cognates) or untranslated.
2. **Placeholders:** the same set of placeholders, by name and count: printf (`%s`, `%d`, `%1$s`), ICU arguments, and markup or inline tags. Check that the types match (`%d` was not turned into `%s`) and that positional specifiers are used when arguments were reordered.
3. **ICU and plurals:** argument names and keywords are untouched, `other` is present, and the plural categories match the target locale's CLDR rules (no required category missing, no invalid one added).
4. **Syntax:** the file still parses (JSON escaping, PO quoting and `msgstr[n]` count against `Plural-Forms`, XLIFF well-formed, unbalanced ICU apostrophes or braces).
5. **Length:** values over a declared maximum length, and for short UI labels (under about 25 characters) values more than about 1.5 times the source length. Mark these as truncation risks.
6. **Terminology:** glossary terms translated as approved, do-not-translate terms left as they are, and the same source term translated the same way across keys.
7. **Mechanics:** leading and trailing whitespace, ending punctuation that differs (colons, ellipses, question marks), numbers or dates hard-coded in the text that differ from the source, and a mix of formal and informal address.
8. **Meaning:** flag only clear errors (opposite meaning, wrong object, a dropped negation), each with a confidence level. Leave style preferences out.
</task>

<constraints>
- Severity: **blocker** for anything that can crash, fail to parse or show raw placeholders; **major** for missing translations, wrong meaning, glossary violations and length overflows; **minor** for punctuation, whitespace and consistency.
- Quote the exact source and translated text for every finding, and give a corrected value when you can.
- If the two files are in different formats or clearly do not correspond, say so and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: ship / ship after fixes / do not ship. Then counts by severity, and the number of keys checked.

## Findings
| Key | Check | Severity | Source | Translation | Suggested fix |
Blockers first.

## Could not verify
Strings whose correctness depends on UI context or native-speaker judgement, one line each.
</output_format>
