---
schema: 1
id: build-localization-glossary
kind: prompt
title: Build a localization glossary
description: Builds a product term base from UI strings, with definitions, do-not-translate terms and proposed translations per locale, so localization stays consistent. Use before the first translation round.
category: localization
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, technical-writer, software-engineer]
requires: [none]
inputs: [text, file]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [terminology, term-base, do-not-translate]
pairs_with:
  prompts: [translate-string-catalog, review-translated-strings]
args:
  - name: source_strings
    description: The UI strings or catalog to mine for terms, in the source language.
    type: text
    required: true
  - name: locales
    description: Target locales to propose translations for, for example "de-DE, fr-FR, ja-JP".
    type: string
    required: true
  - name: product_context
    description: What the product does, who uses it, brand names, and any platform it must feel native on (Windows, macOS, iOS, Android).
    type: text
output_contract:
  format: markdown
  sections: [Source inconsistencies, Glossary, Do not translate, Export]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Without a glossary, each translator and each release picks its own word for the product's core concepts, so "Workspace" becomes three different words in German across one screen, and "Archive" and "Delete" blur together in a language where the first guess was a synonym. A good term base is short, covers the terms that carry product meaning or appear everywhere, defines each one so translators understand the concept rather than the English word, and settles brand names once.
</context>

<task>
Build a localization glossary from these strings:

{{source_strings}}

Target locales: {{locales}}
Product context: {{product_context}}

1. Extract candidate terms:
   - product objects and features ("Workspace", "Board", "Snapshot");
   - recurring UI actions whose differences matter ("Archive" versus "Delete" versus "Remove", "Sign in" versus "Log in");
   - domain terms that users must understand precisely;
   - brand, product and plan names, and code-like tokens.
   Skip generic words that any translator handles consistently.
2. Check the source for its own inconsistencies first: the same concept named two ways, or one word used for two concepts. Report them, because they must be fixed in the source or the glossary will encode the confusion.
3. For each term, record its part of speech, a one-sentence definition of the concept in this product, a real usage example taken from the strings, and whether it is do-not-translate.
4. Propose a translation per locale:
   - For standard concepts (Settings, Preferences, Sign in, Share), follow the target platform's published UI terminology; Microsoft and Apple both publish localized term lists. Note where the two differ.
   - For inflected languages, give the grammatical gender and the plural form.
   - Pick a translation that keeps distinct source terms distinct.
   - Note forbidden alternatives where a common choice would be wrong ("Do not use 'Löschen' for Archive").
   - Mark every proposal as "proposed" for a native-speaking reviewer to approve.
5. Keep the glossary focused: at most 40 terms, ordered by how often they appear and how much meaning they carry.
6. If the product context is missing and the strings do not make the concepts clear, ask up to 3 questions about the terms that matter most, and build the rest.
</task>

<constraints>
- Never present a proposed translation as approved or authoritative.
- Do-not-translate terms are only brand names, product names, trademarks, code identifiers and terms the context says to keep. Ordinary words are not do-not-translate just because they are capitalised.
{{> output/uncertainty}}
</constraints>

<output_format>
## Source inconsistencies
| Concept | Variants found | Example keys | Recommended single term |
"None" if there are none.

## Glossary
| Term | Part of speech | Definition | Example from the strings | One column per locale: proposed translation (gender and plural where relevant) | Notes and forbidden alternatives |

## Do not translate
One line each, with the reason.

## Export
The glossary as CSV in a code block, with columns `term,pos,definition,dnt,<locale>...,notes`, ready to import into a translation management tool.
</output_format>
