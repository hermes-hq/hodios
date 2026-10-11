---
schema: 1
id: adapt-presentation-for-international-audience
kind: prompt
title: Adapt a presentation for an international audience
description: Adapts a talk and slides for listeners who are not native speakers of its language or who follow through interpreters, covering wording, idioms, pace, examples, numbers and what goes on the slides.
category: presentations
version: 1.0.0
status: incubating
stage: [design, review]
role: [manager, consultant, researcher, individual]
requires: [none]
inputs: [document, notes]
output: [table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cross-cultural, non-native-listeners, interpreters, idioms, global-teams, plain-english]
pairs_with:
  prompts: [write-speaker-notes, make-presentation-accessible, critique-slide-deck]
  personas: [presentation-designer]
args:
  - name: talk
    description: The slides and the script or speaker notes, as text.
    type: text
    required: true
  - name: audience
    description: Who will listen, their countries or languages, how fluent they are in the talk's language, and whether there is simultaneous or consecutive interpreting.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Main risks, Line-by-line changes, Slide changes, Notes for interpreters, Delivery tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You adapt presentations for international audiences. Listeners working in a second language understand far more when the speaker uses common words, one idea per sentence, literal rather than idiomatic language, consistent terms (not three synonyms for one thing), and a slower pace with pauses. Idioms, sports metaphors, puns, culture-bound jokes and local references ("like a Thanksgiving rush") are the first things lost. Numbers and dates are easily misheard or misread: 1,000 versus 1.000, month-day order, billion, and currencies. Slides help non-native listeners a lot when they carry the key terms and numbers in writing, more than for a native audience. Interpreters need the script and slides in advance, a glossary of names and acronyms, and a speaker who pauses at sentence ends; jokes and wordplay rarely survive interpreting. Avoid stereotyping any culture; adapt for comprehension and respect, not assumptions.

<talk>
{{talk}}
</talk>

Audience: {{audience}}
</context>

<task>
1. Summarise the three to five biggest comprehension risks in this talk for this audience.
2. Go through the script and list each line to change: idioms, metaphors, humour that depends on wordplay or local culture, phrasal verbs with simpler equivalents, long sentences, acronyms, inconsistent terms and local references. Give the plain replacement for each.
3. Check numbers, dates, units and currencies and give an unambiguous form (for example "3 March 2026", "1.2 million", "USD 40").
4. Recommend slide changes: put key terms, numbers and the main point of each section in writing on the slides; remove text that depends on wordplay; check that examples and images make sense across cultures.
5. If interpreters are involved, write a short note for them: glossary of names, acronyms and technical terms with meanings, pronunciations where helpful, and anything to know in advance (quotes, video, figures).
6. Give delivery tips specific to this talk: where to pause, what to repeat, and how to check understanding without embarrassing anyone.
</task>

<constraints>
- Keep the meaning and every fact of the talk; change wording, not content.
- Do not make assumptions or generalisations about national character; base advice on language and the information given.
- Do not dumb the content down; simplify language, not ideas.
</constraints>

<output_format>
## Main risks
Bullets.

## Line-by-line changes
Table: Original | Problem | Replacement.

## Slide changes
Bullets per slide.

## Notes for interpreters
Glossary table: Term | Meaning | Pronunciation or note. Omit this section's table if there are no interpreters and say so.

## Delivery tips
Bullets.
</output_format>
