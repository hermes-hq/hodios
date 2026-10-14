---
schema: 1
id: review-source-copy-for-translation
kind: prompt
title: Review UI copy before it goes to translators
description: Reviews new source-language UI strings for translation problems such as ambiguity, idioms, fragments, hidden plurals and gender, overloaded keys and missing context, and proposes fixed copy.
category: localization
version: 1.0.0
status: incubating
stage: [review]
role: [copywriter, designer, product-manager, frontend-engineer]
requires: [none]
inputs: [file, text]
output: [table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ux-copy, source-quality, translatability]
pairs_with:
  prompts: [write-translator-context-notes, build-localization-glossary]
args:
  - name: strings
    description: The new or changed strings with keys and, where known, where each appears and what fills each placeholder.
    type: text
    required: true
  - name: target_locales
    description: Locales the strings will be translated into; used to pick realistic problems.
    type: string
  - name: style_notes
    description: The product's voice or style guide points the copy must keep, if any.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Findings, Rewritten strings, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every problem in a source string is multiplied by the number of locales and comes back as translator queries or wrong translations. The usual ones: words that are both noun and verb in English ("Archive", "Export", "Set", "Close") with no context; idioms and puns ("knock it out of the park", "Let's get this party started"); fragments meant to be combined with other strings or with UI elements ("Show" + dropdown + "per page"); hidden plurals ("1 file(s)") and hidden gender ("{user} updated their profile" in languages where the verb agrees with the user); placeholders whose content is unclear ("{0} by {1}"); the same key reused on screens where the meaning differs; and English-only formats in the text ("Due 3/4", a price written with a dollar sign). Fixing them in the source is cheap; fixing them after 12 translations is not.
</context>

<task>
Review these source strings before translation:

{{strings}}

{{#target_locales}}Target locales: {{target_locales}}.{{/target_locales}}
{{#style_notes}}Style to keep: {{style_notes}}{{/style_notes}}

1. Read every string with its key and placeholder notes. Where context is missing, infer it from the key and mark the inference.
2. Check each string for:
   - Ambiguity: words that could be a noun, verb, adjective or status; abbreviations; pronouns with unclear referents.
   - Idioms, puns, slang and cultural references that will not survive translation.
   - Fragments and concatenation: strings that only make sense joined to another string, a number or a UI control.
   - Hidden plurals and gender: "(s)", "1 item" written for a single case, sentences whose grammar depends on a person's gender.
   - Placeholders: unclear content, more than one unnamed placeholder, markup or links splitting a sentence.
   - Embedded formats: dates, times, numbers, currency, units or punctuation hard-coded in the text.
   - Reuse: one key used in different contexts, or the same text under different keys with different meaning.
   - Length: very short labels that will expand a lot in long-text locales, with a note to design.
3. For every finding, explain how it would go wrong in a target locale (name the locale when it helps) and propose a rewritten source string, an ICU message, a split key or a context note.
4. Keep the product voice; do not make strings longer or more formal unless the fix needs it.
5. List questions only the author can answer.
</task>

<constraints>
- Review and rewrite source strings only; do not translate them.
- Do not flag a string just because it is informal; flag only what will cause a translation problem or a real ambiguity.
- Keep placeholders and keys unchanged unless the fix requires it, and say so when it does.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Counts by problem type and the three most important fixes.

## Findings
| Key | Current string | Problem | Why it fails in translation | Proposed fix |

## Rewritten strings
The full revised set as key and value, ready to paste, with ICU where needed.

## Questions for the author
Numbered.
</output_format>
