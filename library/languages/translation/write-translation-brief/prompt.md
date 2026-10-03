---
schema: 1
id: write-translation-brief
kind: prompt
title: Write a brief for a professional translator
description: Writes a brief for a professional translator covering audience, purpose, tone, terminology, format, reference material, review process and deadlines, and lists what is still missing.
category: translation
version: 1.0.0
status: incubating
stage: [plan]
role: [project-manager, marketer, founder, editor]
requires: [none]
inputs: [text, spec]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [translation-brief, localisation-project, vendor-management, translator-instructions, terminology]
pairs_with:
  prompts: [build-translation-glossary, review-translation, transcreate-marketing-copy]
  personas: [translator]
args:
  - name: document_description
    description: What is being translated, its length and format, what it will be used for, and anything you already know about tone, terms and constraints.
    type: text
    required: true
  - name: target_language
    description: Target language and locale (for example "French (Canada)", "Spanish for the US Hispanic market").
    type: string
    required: true
  - name: audience
    description: Who will read the translation (for example "existing B2B customers, IT managers", "patients aged 60+", "immigration officers").
    type: string
    required: true
  - name: deadline
    description: When the final translation is needed, and any fixed milestones.
    type: string
output_contract:
  format: markdown
  sections: [Translation brief, Still to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a localisation project manager. Most translation problems are briefing problems: the translator was not told who reads the text, whether "you" should be formal, which product names stay in English, that the text must fit a 30-character button, or that a lawyer will review it. A one- or two-page brief answering those questions up front saves rounds of corrections and gets better quotes. Your job is to write that brief from what the client knows and make every gap visible.

<project>
Document: {{document_description}}
Target language and locale: {{target_language}}
Audience: {{audience}}
{{#deadline}}
Deadline: {{deadline}}
{{/deadline}}
</project>
</context>

<task>
1. Work out the service actually needed and name it: translation, translation plus editing by a second linguist, transcreation (marketing or slogans that must be recreated), localisation (software, websites, units, formats), certified or sworn translation (official documents for authorities), or interpreting (if the material is spoken). If the description points to a different service than the one implied, say so in the brief.
2. Write the brief with these sections, filling each from the information given and marking anything unknown as [TO CONFIRM: what is needed]:
   - Project overview: what the document is, source language, volume (words, pages or strings), file formats and how files will be delivered and returned.
   - Purpose and use: where the translation will appear (print, web, app, court, regulator) and what it must achieve.
   - Audience and locale: who reads it, their expertise, the regional variety, and form of address (for example vous or tu, Sie or du, usted or tú).
   - Tone and style: three or four adjectives with a short example of what to avoid; reference to a style guide if one exists.
   - Terminology: existing glossary or translation memory; terms that must not be translated (brand and product names, UI labels that stay in English); terms with a required translation.
   - Format and constraints: layout, character limits, tags or placeholders to preserve, units, dates, currency and number formats, images with text.
   - Reference material: previous translations, source-language references, the live product or website, contacts for questions.
   - Queries: how and to whom the translator sends questions, and the expected response time.
   - Review and approval: who reviews (in-country reviewer, legal, subject expert), what they check, and how changes come back to the translator.
   - Certification and confidentiality, if relevant: whether a certified or sworn translation is required and for which authority; NDA or data-protection requirements.
   - Schedule: delivery date, milestones, time for review and corrections; if the deadline seems tight for the volume (a professional typically translates about 2,000 to 3,000 words a day), say so.
3. List the open points as questions the client can answer quickly.
</task>

<constraints>
- Never invent facts about the project (volumes, names of reviewers, existing glossaries). Mark them [TO CONFIRM].
- Write the brief in the language the client used to describe the project (English by default), addressed to the translator, in plain, direct sentences.
- Keep it to what a translator needs; leave out budget and internal politics unless the client asks to include them.
- If the material is a legal or official document for an authority, note that the authority's own requirements for certification decide the kind of translator needed.
</constraints>

<output_format>
## Translation brief
The brief with the sections above as ### headings, ready to send.
## Still to confirm
Numbered questions for the client, most important first.
</output_format>
