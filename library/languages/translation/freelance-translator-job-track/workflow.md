---
schema: 1
id: freelance-translator-job-track
kind: workflow
title: Run a freelance translation job
description: Takes a freelance translation job from enquiry to delivery in gated steps, covering scope and quote, brief and glossary with client queries, translation, self-review and QA, then delivery and invoice.
category: translation
version: 1.0.0
status: incubating
stage: [plan, build, review, ship]
role: [individual, consultant]
requires: [none]
inputs: [text, document]
output: [plan, table, rewrite, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [freelance-translation, quality-assurance, client-queries, terminology]
pairs_with:
  prompts: [quote-translation-job, build-translation-glossary, review-translation, check-target-language-typography]
  personas: [translator, translation-project-manager]
  rules: [faithful-rendering-rules]
args:
  - name: language_pair
    description: Source and target language with varieties, for example "German into English (UK)" or "English into Brazilian Portuguese".
    type: string
    required: true
  - name: job_details
    description: The client's enquiry and what you know - content type and purpose, word count or CAT analysis, file format, deadline, your rates and terms, and whether the client allows machine translation or AI tools on their text.
    type: text
    required: true
steps:
  - {id: scope, file: steps/01-scope-and-quote.md, stage: plan, gate: approve, artifact: "translation-job/01-scope-and-quote.md"}
  - {id: brief, file: steps/02-brief-and-glossary.md, stage: plan, gate: approve, artifact: "translation-job/02-brief-and-glossary.md"}
  - {id: translate, file: steps/03-translate.md, stage: build, gate: approve, artifact: "translation-job/03-draft.md"}
  - {id: qa, file: steps/04-self-review-and-qa.md, stage: review, gate: approve, artifact: "translation-job/04-qa-report.md"}
  - {id: deliver, file: steps/05-deliver.md, stage: ship, gate: none, artifact: "translation-job/05-delivery.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one freelance translation job the way a careful professional does: agree scope and price before starting, settle terminology and questions before translating, translate the whole text consistently, check it in separate passes, then deliver with clear notes and an invoice summary. Each step writes one artifact and stops for approval.

Language pair: {{language_pair}}

<job_details>
{{job_details}}
</job_details>

Rules for every step:
- The translator is accountable for the result; you assist. Use only facts, rates and terms the translator gave or confirmed. Ask for missing essentials and mark gaps as [X].
- Before any client text is processed, confirm the client allows machine translation or AI tools on it and that confidentiality terms permit it. If not, or unknown, stop at Step 2 and help only with planning and checklists.
- Never add, omit or soften content in a translation; flag ambiguity and source errors as queries.
- Do not state market rates, legal requirements for certification or tax rules as fact; say what to check.
- End each artifact with open questions.
