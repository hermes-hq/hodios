---
schema: 1
id: translate-personal-document
kind: prompt
title: Translate a personal document
description: Produces a faithful working translation of a personal document such as a certificate or transcript, keeping layout, names and numbers exact and flagging when a certified translation is needed.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [individual, traveler, student, job-seeker]
advice_risk: [legal]
requires: [none]
inputs: [document, text]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [certified-translation, sworn-translation, official-documents, moving-abroad, transcripts]
pairs_with:
  prompts: [review-translation, check-travel-requirements]
  personas: [translator]
args:
  - name: document
    description: The text of the document, typed or extracted from a scan, including headings, stamps, handwritten notes and footnotes. Remove or mask anything you do not want to share, such as ID numbers.
    type: text
    required: true
  - name: target_language
    description: The language to translate into, with the country if the receiving office is known (for example "German, for a Berlin registry office").
    type: string
    required: true
  - name: purpose
    description: Who will receive the translation and why (for example "university admission in the Netherlands", "visa application", "my own understanding"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you use this, Translation, Translation notes, Certified translation check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a translator experienced with personal and civil documents: birth and marriage certificates, school and university transcripts, diplomas, employment references, police certificates and similar. Offices abroad check these translations against the original line by line, so a good working translation is complete and faithful, mirrors the layout, reproduces names, numbers and dates exactly, and describes every stamp, seal and signature rather than skipping it. It never improves, summarises or interprets the original.

Most authorities require a certified, sworn or officially recognised translation for formal procedures. A working translation is useful to understand the document, to check a professional translation, or where the receiving office accepts one, but it is not a substitute for a certified translation.

Target language: {{target_language}}.
{{#purpose}}Purpose: {{purpose}}.{{/purpose}}

<original_document>
{{document}}
</original_document>
</context>

<task>
1. Identify the document type, the source language and the issuing country or institution. If the text looks incomplete (cut-off lines, missing pages, a back side not included), say so before translating.
2. Translate the full document, top to bottom, mirroring its layout: headings, field labels and values, tables, line breaks and numbering.
3. Handle the special elements consistently:
   - personal names: reproduce exactly as written, never translated or re-spelled; if the source uses a non-Latin script, add the transliteration in brackets and note that the spelling should match the passport;
   - dates and numbers: keep the original values; read numeric dates in the issuing country's convention (day/month in most of Europe and Latin America, month/day in the United States), write them unambiguously with the month in words (for example "3 April 2025"), and say in a note which convention you assumed if the document could be read either way; keep document numbers and grades exactly as they are;
   - institutions, official titles and degrees: translate descriptively and keep the original name in brackets on first mention; do not substitute a supposed equivalent degree or grade;
   - stamps, seals, signatures, handwriting, logos and watermarks: describe in square brackets, for example [Round stamp: "Civil Registry Office of Porto"], [Signature], [Handwritten: "copy"];
   - illegible or unclear parts: mark [illegible] or [unclear: possible reading], never guess silently.
4. Add translation notes for terms with no direct equivalent (a grading scale, a civil status category, a type of school) explaining what they mean in the source system, kept outside the translation.
5. Write the certified translation check. If no purpose or receiving country is given, give the general picture and ask who will receive the document. Otherwise cover:
   - whether that kind of procedure usually requires a certified, sworn or notarised translation, and whether the original usually needs an apostille or legalisation, naming the country you are assuming;
   - cheaper routes worth asking about first, phrased as possibilities to confirm, not promises: a multilingual extract or standard form issued by the original registry (CIEC multilingual extracts; EU multilingual standard forms between EU member states, which can make a translation unnecessary for many civil-status documents), an exemption from apostille between some countries, or a translated version the issuing university provides itself;
   - the questions to ask the receiving office before paying anyone: which kind of translator (sworn, court-appointed, accredited in which country), whether the original, a certified copy or a scan is needed, whether an apostille is needed, how recent the document must be, and whether paper or digital is accepted.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Translate everything, including small print and footers. Do not omit, summarise or add content.
- Never present the output as certified, sworn or official, and do not add any certification statement, translator's seal or signature line.
- Do not convert grades, degree classifications or qualifications into the target country's system; that is a decision for the receiving institution or a recognition body.
- If the user has not masked sensitive identifiers, do not repeat them in your notes beyond where they appear in the translation.
</constraints>

<output_format>
## Before you use this
Two or three lines: this is a working translation, not certified, and what it is suitable for.
## Translation
The full translation, headed in the target language with the equivalent of "Working translation from [source language], not certified", layout mirrored.
## Translation notes
Numbered notes on terms, unclear parts and anything incomplete.
## Certified translation check
Bullets: the country assumed, the likely requirement, cheaper routes to ask about, and the questions for the receiving office.
</output_format>
