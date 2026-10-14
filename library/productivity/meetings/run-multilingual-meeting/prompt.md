---
schema: 1
id: run-multilingual-meeting
kind: prompt
title: Run a meeting across languages
description: Plans a meeting where people do not share a first language - with or without an interpreter - covering pace, plain-language rules, visuals, checking understanding and written follow-up.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, project-manager, teacher, individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [multilingual, interpreters, plain-language, international-teams, inclusion]
pairs_with:
  prompts: [write-meeting-agenda, run-hybrid-meeting, brief-staff-on-working-with-interpreters]
args:
  - name: meeting
    description: What the meeting is for, how long, and the format (room, video, hybrid).
    type: text
    required: true
  - name: languages
    description: Who speaks what, and how well, as far as you know (for example "6 English speakers, 4 Spanish speakers with basic English, one bilingual colleague").
    type: text
    required: true
  - name: interpretation
    description: none = no interpreter; informal = a bilingual colleague helps; professional = a booked interpreter (consecutive or simultaneous).
    type: enum
    enum: [none, informal, professional]
    default: none
output_contract:
  format: markdown
  sections: [Language plan, Before the meeting, Facilitation rules, Checking understanding, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan meetings for groups that do not share a first language: international project teams, community meetings, parent groups, cross-border partners. You know what goes wrong: native speakers speed up, use idioms, jokes and acronyms; second-language speakers nod without understanding and stay quiet because composing a sentence takes longer than the gap in conversation; decisions are understood differently in each language. You know interpretation costs time (consecutive interpretation roughly doubles speaking time), that a bilingual colleague asked to interpret informally cannot also participate fully and may soften or edit messages, and that for anything with legal, medical, safety or money consequences a professional interpreter is the safer choice. Written material sent in advance and visual summaries help more than anything said in the room.

Meeting: {{meeting}}
Languages: {{languages}}
Interpretation: {{interpretation}}
</context>

<task>
1. Recommend a language plan: which language(s) the meeting runs in, whether interpretation is needed, and the trade-off of the setup chosen. If interpretation is "informal" and the content is high-stakes, say so plainly and suggest a professional.
2. Before the meeting: agenda and key terms sent early, a short glossary of acronyms and technical terms, materials in the languages needed or in plain language suitable for machine translation, and an interpreter brief if one is used.
3. Write facilitation rules for speakers: pace, short sentences, no idioms or jokes that depend on wordplay, spell out numbers and dates, one speaker at a time, pause for interpretation.
4. Add ways to contribute that do not depend on spoken fluency: chat or written input, a round where everyone speaks, time to prepare before a question is answered, permission to speak in the first language with interpretation.
5. Give methods to check understanding without embarrassing anyone: summarise decisions in writing on screen, ask people to say back what they will do rather than "is that clear?", and agree what happens if someone realises later they misunderstood.
6. After the meeting: written summary in plain language, decisions and actions in a table, translated if needed, with a short correction window.
7. Adjust the timings: say how much extra time to allow for the interpretation setup chosen.
</task>

<constraints>
- Do not claim machine translation is reliable for legal, medical, safety or financial content; flag those for professional translation.
- Do not ask a child or a party with an interest in the outcome to interpret; say why if the input suggests it.
- Treat all languages as equal; do not frame non-native speakers as the problem.
- If the language details are too vague to plan for, state your assumptions.
</constraints>

<output_format>
## Language plan
Recommendation and trade-offs, with extra time to allow.

## Before the meeting
Checklist.

## Facilitation rules
Bullets to share with speakers.

## Checking understanding
Bullets with example phrases.

## After the meeting
Checklist and a summary template.
</output_format>
