---
schema: 1
id: write-bilingual-newsletter-issue
kind: prompt
title: Write a bilingual newsletter issue
description: Writes a community newsletter issue in two languages for audiences that include newcomers, with short parallel blocks, plain wording that translates cleanly and terms a human translator must check.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [writer, teacher, operations-manager]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [two-languages, newcomers, plain-language, translation-review, community-update]
pairs_with:
  prompts: [write-community-digest, write-classroom-newsletter, make-parallel-bilingual-text]
args:
  - name: content
    description: What the issue must say - updates, dates, services, events, deadlines, contacts - in whichever language you wrote it. Note anything legal, medical or about money that must be exact.
    type: text
    required: true
  - name: languages
    description: The two languages, the first being the authoritative one if the versions ever differ, for example "English and Arabic" or "Portuguese and Ukrainian". Add the variety if it matters (Brazilian Portuguese, Levantine Arabic).
    type: string
    required: true
  - name: layout
    description: parallel puts each block in both languages one after the other, so readers can compare; stacked gives the whole issue in the first language, then the whole issue in the second.
    type: enum
    enum: [parallel, stacked]
    default: parallel
output_contract:
  format: markdown
  sections: [Issue, Translator check, Notes for the sender]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write a community newsletter issue in two languages: {{languages}}. Readers include newcomers who may read the second language better than the first, and people with lower literacy in either. A bilingual issue works when both versions say the same thing at the same level, sentences are short enough to translate cleanly, dates and numbers are written so nobody can misread them, and examples do not assume one culture's holidays, foods or family shapes. It fails when the second language is a machine afterthought, when idioms or bureaucratic terms are translated word for word, and when nobody checks the terms that carry consequences (deadlines, eligibility, fees, health or legal terms). Layout: {{layout}}.
</context>

<task>
<content>
{{content}}
</content>

1. Rewrite the content in the first language as plain, short blocks: one topic per block, a short heading, sentences under about 15 words, no idioms, no abbreviations without explanation, dates as "Tuesday 14 October 2026" and times in the format used locally.
2. Write the second-language version of each block with the same meaning and level, not a word-for-word copy: adapt word order and politeness forms to the language, keep names of places, services and documents in the original with a short explanation in brackets, and keep numbers, dates, prices and contact details identical.
3. Arrange the issue by the layout: parallel (each block in the first language followed by the second, with a clear language label) or stacked (all first, then all second, with a language switch line at the top so readers can jump).
4. Add a line at the top, in both languages, saying which version is authoritative if they differ, and how to ask for help in either language if the content says.
5. List every term a qualified human translator or a fluent community member must check before sending: eligibility rules, legal, medical or money terms, official names, and any sentence where you were unsure of the right register or regional variety.
</task>

<constraints>
- Never invent dates, services, eligibility rules, contacts or fees; mark gaps as [CONFIRM: ...] in both languages.
- Your translation is a draft. Say so plainly, and do not present it as checked; for legal, medical or money content, recommend a qualified translator or the service's own translated material.
- Use culturally neutral examples; no assumptions about religion, diet or family.
- Right-to-left languages: keep each language in its own block and do not mix scripts within a sentence except for names and numbers.
- If either language is one you cannot write reliably, say so and give the plain first-language version plus a translation brief instead.
</constraints>

<output_format>
## Issue
The full bilingual issue with the authoritative-version line, headings and language labels.

## Translator check
Table: term or sentence | language | why it needs checking.

## Notes for the sender
Bullets: [CONFIRM] items, the draft-translation reminder, and accessibility tips (font size, sending a version as plain text).
</output_format>
