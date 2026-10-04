---
schema: 1
id: adapt-public-notice-for-many-languages
kind: prompt
title: Adapt a public notice for many languages
description: Prepares a public notice for translation into several community languages by rewriting it in plain language, flagging cultural and literacy issues, then drafting translations with reviewer notes.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, manager, teacher]
subject: [public-sector, healthcare, nonprofit]
requires: [none]
inputs: [text, document]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [plain-language, community-languages, public-information, language-access]
pairs_with:
  prompts: [back-translate-to-verify, write-translation-brief, brief-staff-on-working-with-interpreters]
args:
  - name: notice
    description: The notice as it stands - a service change, health advice, election information, a school closure, a bin collection change - including dates, places, contact routes and what people must do.
    type: text
    required: true
  - name: languages
    description: The languages and varieties needed, for example "Polish, Romanian, Somali, Bengali (Sylheti speakers), Ukrainian".
    type: string
    required: true
  - name: audience
    description: Optional. Who must act on it and anything known about them - older residents, parents, people with low literacy, recent arrivals, how they will see it (poster, text message, letter, social media).
    type: text
output_contract:
  format: markdown
  sections: [Plain-language source, Issues to resolve, Translations, Reviewer notes, Distribution tips]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a council, school, health service or community organisation get a notice understood by people who read other languages. Translating the original as written usually fails: bureaucratic sentences, idioms, acronyms and buried actions become even harder to follow in translation, and some readers have limited literacy in any language. The professional approach is to fix the source first (plain language, one action per sentence, unambiguous dates), check cultural fit and channel, then translate and have each language reviewed by a fluent, ideally community-based reviewer before publishing.

Languages: {{languages}}
{{#audience}}Audience and channel: {{audience}}{{/audience}}
</context>

<task>
<notice>
{{notice}}
</notice>

1. Rewrite the notice as a plain-language source in the original language: the action first (what to do, by when), short active sentences, one idea per sentence, no idioms or acronyms, dates written with the month as a word and the weekday ("Monday 3 March"), times with a clear clock format, and every contact route spelled out. Keep every fact; mark anything unclear in the original as [CHECK: ...].
2. List issues to resolve before translating: missing information readers will need (cost, eligibility, whether ID is required, access for disabled people), cultural or religious fit (dates clashing with festivals, assumptions about family structure, images), literacy and channel (audio or video version, text message length, a pictogram), and terms that have no settled equivalent in some languages.
3. Translate the plain-language source into each language. Use the usual everyday register for public information in that community, consistent terms across languages, and keep names of places, services and websites as they appear locally with a translation in brackets where useful.
4. For each language, write reviewer notes: terms you were unsure of, choices between regional varieties or scripts, anything a reviewer must check, and your confidence (high, medium, low).
5. Give distribution tips for reaching speakers of these languages.
</task>

<constraints>
- Every translation is a draft for review by a fluent speaker before publication. Say this at the top of the Translations section. For health, legal, election or safety notices, also say the content must be signed off by the responsible service.
- Never change, add or drop facts, dates, eligibility rules or contact details. If the original is ambiguous, keep the question visible rather than choosing.
- Do not invent helplines, websites, opening hours or community organisations.
- If you cannot produce a reliable translation into a language (low-resource language, unfamiliar script or variety), say so for that language, give the reviewer notes only, and recommend a professional translator.
- If the notice is missing essential information (what to do, by when, or how to get help), list it under Issues and use a [X] placeholder.
</constraints>

<output_format>
## Plain-language source
The rewritten notice, under 200 words where possible.
## Issues to resolve
Table: Issue | Why it matters | Suggested fix.
## Translations
One subsection per language with the full translation.
## Reviewer notes
Table: Language | Term or choice | Note | Confidence.
## Distribution tips
Three to six bullets.
</output_format>
