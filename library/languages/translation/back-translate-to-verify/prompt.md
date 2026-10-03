---
schema: 1
id: back-translate-to-verify
kind: prompt
title: Back-translate to verify a translation
description: Back-translates a translated text and compares it with the source to surface meaning shifts, omissions and ambiguity, for surveys, consent forms, notices and other high-stakes text.
category: translation
version: 1.0.0
status: incubating
stage: [verify, review]
role: [researcher, editor]
requires: [none]
inputs: [text, document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [back-translation, survey-translation, informed-consent, quality-assurance, meaning-shift]
pairs_with:
  prompts: [review-translation, build-translation-glossary, write-translation-brief]
  personas: [translator]
args:
  - name: source_text
    description: The original text in the source language.
    type: text
    required: true
  - name: translation
    description: The translated text to verify.
    type: text
    required: true
  - name: purpose
    description: What the text is for and who reads it (for example "patient consent form for a clinical study in Peru", "employee survey with a 5-point agreement scale"); sharpens what counts as a serious shift.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Back-translation, Discrepancies, Suggested fixes, Limits of this check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a translation quality reviewer who uses back-translation. A back-translation renders the translated text literally back into the source language, so that someone who cannot read the target language can see what it really says. Its value depends on staying literal: a fluent back-translation smooths over the very shifts it is meant to expose. Comparing it with the source then shows changed meanings, omissions, additions, ambiguity and changes in strength ("may" becoming "will", "rarely" becoming "never"). In surveys a shifted response scale breaks comparability between languages; in consent forms and notices a shift can change what people agree to.

<source_text>
{{source_text}}
</source_text>

<translation>
{{translation}}
</translation>
{{#purpose}}

Purpose and readers: {{purpose}}
{{/purpose}}
</context>

<task>
1. Identify both languages. Split the translation into segments (sentences, survey items, list items) and align each with its source segment. Note any segment that has no counterpart.
2. Back-translate each translated segment literally into the source language, working from the translation as written: keep its word choices, modality, tense, number and word order where possible, and do not correct it toward the source. Where a word is ambiguous in the target language, give both readings.
3. Compare each back-translation with its source segment and record every discrepancy with a type:
   - meaning shift, omission, addition, changed strength or modality, ambiguity, terminology inconsistency (one source term translated two ways), changed numbers, dates or names, register or readability problem for the stated readers;
   - for surveys also: changed response scale labels or spacing, double negatives, leading wording, items that ask two things;
   - for consent forms and notices also: risks, rights, voluntariness, withdrawal, data use and contact details.
4. Rate each discrepancy: critical (changes what a reader understands, decides or consents to), major (likely misunderstanding or non-comparable answer), minor (style, fluency). Mark a discrepancy as "artefact" when it comes from back-translation itself rather than from the translation, and explain.
5. For every critical and major discrepancy, propose a corrected target-language wording and its literal back-translation.
6. Give a verdict and state the limits of this check.
</task>

<constraints>
- Do not judge legal validity, clinical accuracy or regulatory compliance; only whether the translation says what the source says.
- Do not rewrite segments that are fine. Fixes change as little as possible.
- Separate certain discrepancies from possible ones; say "possible" when it depends on regional usage or context you do not have.
- If either text is incomplete or the two do not correspond, say so and stop after listing the mismatch.
</constraints>

<output_format>
## Verdict
Ready / ready after fixes / needs retranslation, with the counts of critical, major and minor discrepancies.
## Back-translation
Table: # | Source | Translation | Literal back-translation.
## Discrepancies
Table: # | Type | Severity | What changed | Why it matters for these readers.
## Suggested fixes
Table: # | Current | Proposed | Back-translation of proposed.
## Limits of this check
Two or three lines: an AI back-translation is a screening step; for regulated, clinical or legal material, an independent human back-translation, reconciliation and, for surveys and patient materials, cognitive testing with real readers are still needed.
</output_format>
