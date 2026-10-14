---
schema: 1
id: prepare-to-meet-partners-family
kind: prompt
title: Prepare to meet your partner's family
description: Prepares you to meet a partner's parents or family for the first time, with what to ask your partner, a host gift, cultural etiquette to check, conversation topics and a plan for awkward moments.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, questions, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [meeting-the-parents, in-laws, couples, visiting-family, cross-cultural-relationships, first-impressions]
pairs_with:
  prompts: [choose-meaningful-gift, navigate-family-gathering-tension, adapt-message-for-culture]
args:
  - name: occasion
    description: What the meeting is, for example "Sunday lunch at her parents' house", "a week staying with his family abroad", "Diwali with the whole family".
    type: text
    required: true
  - name: what_you_know
    description: What you know about the family, for example their culture, language, religion, any tension, what your partner has told them about you. Optional.
    type: text
  - name: worries
    description: What you are nervous about, for example "I don't drink", "we live together and they don't know", "my Mandarin is basic". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Ask your partner first, What to bring, Etiquette to check, Things to talk about, Tricky moments, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people prepare to meet a partner's family. The best preparation is a frank briefing from the partner: who will be there, what each person is like, topics to avoid, what the family already knows about the relationship and what customs matter (shoes off, greeting elders first, who serves food, alcohol, religious practice). Families differ more within a culture than between cultures, so general etiquette is a starting point to confirm, never a script. Visitors make a good impression mostly by being warm, curious about the family, helpful and themselves, and the partner should be agreed on how to handle anything sensitive.

Occasion: {{occasion}}
{{#what_you_know}}What is known: {{what_you_know}}{{/what_you_know}}
{{#worries}}Worries: {{worries}}{{/worries}}
</context>

<task>
1. Ask your partner first: 8–12 questions for the partner, tailored to the occasion (names and how to address people, what they know about you, sensitive topics, customs, dress, gifts, how long, an agreed signal if you need a break).
2. What to bring: two or three host gift ideas that suit the occasion and any culture or religion mentioned, with what to avoid, and say to confirm with the partner.
3. Etiquette to check: customs that may apply given what is known (greetings, shoes, seating, eating, alcohol, helping out), each framed as something to confirm, not assume.
4. Things to talk about: questions that show interest in them (family history, their town, their work, food) and a short, honest way to talk about yourself and the relationship.
5. Tricky moments: plans and phrases for the worries given and common ones (a probing question about marriage, money or children, a political comment, declining food or drink, a language barrier).
6. Afterwards: a thank-you message idea and a debrief with the partner.
</task>

<constraints>
{{> guardrails/crisis-safety}}
- Do not stereotype a culture, religion or nationality; present customs as possibilities to check with the partner.
- Do not invent specifics about the family.
- If the worries involve hiding something major (living together, religion, a previous marriage), help them agree with the partner how to handle it rather than advising lying.
- If the partner's family is described as threatening or the user fears for their safety (for example, a relationship the family forbids), say so plainly and suggest putting safety first and seeking support.
- Neutral on gender and relationship type.
</constraints>

<output_format>
## Ask your partner first
Numbered.
## What to bring
## Etiquette to check
## Things to talk about
## Tricky moments
Table: Moment | What to say or do.
## Afterwards
</output_format>
