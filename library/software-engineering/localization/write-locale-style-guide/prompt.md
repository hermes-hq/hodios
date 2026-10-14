---
schema: 1
id: write-locale-style-guide
kind: prompt
title: Write a per-locale style guide for product UI
description: Writes a localization style guide for one target locale covering formality, voice, gender-inclusive forms, punctuation, capitalization, formats, terms to keep and UI conventions, with examples.
category: localization
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, designer, copywriter, technical-writer]
requires: [none]
inputs: [document, text]
output: [docs, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [translation-style, voice-and-tone, translator-guidance]
pairs_with:
  prompts: [build-localization-glossary, write-translator-context-notes]
args:
  - name: locale
    description: The target locale, with region, for example "de-DE", "pt-BR", "es-419", "fr-CA" or "ja-JP".
    type: string
    required: true
  - name: product
    description: What the product is, who uses it, and the source-language voice and style guide, with sample strings.
    type: text
    required: true
  - name: decisions
    description: Decisions already made for this locale, such as formal or informal address, or existing translations to stay consistent with.
    type: text
output_contract:
  format: markdown
  sections: [Decisions to confirm, Style guide, Examples, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A glossary fixes terms; a style guide fixes everything else translators otherwise decide string by string, and different translators decide differently. The decisions that matter most differ by locale: formal or informal address (du or Sie, tu or vous, tú or usted, and keigo levels in Japanese), how to address users without assuming gender (German gender-inclusive forms, French inclusive writing, Spanish alternatives), whether UI uses the infinitive or imperative for buttons, capitalization (English title case does not carry over), punctuation and spacing (French non-breaking space before ":" and "?", Spanish opening "¿", German quotation marks, full-width punctuation in Japanese and Chinese), regional vocabulary (pt-BR versus pt-PT, es-ES versus es-419), how to write numbers, dates, units and currency in running text, and which English words stay in English. These choices are product decisions, and some are contested in the locale itself, so the guide must say which ones a native reviewer or in-market team has to confirm.
</context>

<task>
Write a UI localization style guide for {{locale}}.

Product and source voice:
{{product}}

{{#decisions}}Decisions already made:
{{decisions}}{{/decisions}}

1. List the decisions this locale needs, propose a default for each based on the product and audience, and give the reason and the main alternative. Mark each as needing confirmation by a native speaker or in-market team.
2. Write the guide with these parts:
   - Audience and voice: how the source voice maps to this locale, and what to avoid (literal enthusiasm, over-familiarity, stiffness).
   - Address and inclusivity: formality level, how to address the user, and gender-inclusive approach with examples.
   - UI grammar: buttons and menu items (verb form), headings, error messages, empty states, confirmation dialogs, placeholders.
   - Capitalization and punctuation rules with examples, including spacing rules specific to the locale.
   - Formats in running text: numbers, dates, times, currency, units and ranges, consistent with what the app formats automatically.
   - Terminology: English terms to keep, brand and product names, and the rule for new loanwords; point to the glossary for individual terms.
   - Regional vocabulary to prefer or avoid for this region.
   - Length: guidance for tight UI and how to shorten without abbreviating unclearly.
3. Give before and after examples using the sample strings: a literal translation with the problem, and the version that follows the guide. Mark example translations as drafts for native review.
4. List open questions for the product team.
</task>

<constraints>
- Do not present contested conventions (for example a specific gender-inclusive form) as settled; give the options and the trade-off.
- Do not invent statistics about the locale's audience.
- Examples are drafts; state that a native reviewer must check them before the guide is adopted.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions to confirm
| Decision | Proposed default | Reason | Alternative |

## Style guide
The guide, with one subsection per part in step 2.

## Examples
| Source | Literal (problem) | Following the guide |

## Open questions
Numbered.
</output_format>
