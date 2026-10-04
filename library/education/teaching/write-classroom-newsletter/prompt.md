---
schema: 1
id: write-classroom-newsletter
kind: prompt
title: Write a classroom newsletter
description: Writes a weekly or monthly class newsletter for families with what students learned and a question to ask at home, a five-minute home activity, dates to act on and a short message version.
category: teaching
version: 1.1.0
status: incubating
aliases: [write-classroom-family-newsletter]
stage: [build]
role: [teacher]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [family-engagement, school-home-communication, plain-language, translation-friendly, home-learning]
pairs_with:
  prompts: [write-parent-email, prepare-parent-teacher-conference, write-bilingual-newsletter-issue]
args:
  - name: week_notes
    description: Rough notes on what happened and what is coming, e.g. topics taught, a class moment, upcoming dates, things to bring, reminders, and questions families have asked.
    type: text
    required: true
  - name: grade_level
    description: Optional grade or age, so home activities fit, e.g. "Reception, ages 4-5", "Grade 5", "Year 8 science".
    type: string
  - name: languages_at_home
    description: Optional languages families speak, e.g. "Spanish, Arabic, Vietnamese", so the text is written to translate cleanly.
    type: string
  - name: reading_level
    description: plain uses sentences under 15 words and everyday words that translation apps handle well, for classes where many families read in a second language; standard is still clear but less restricted.
    type: enum
    enum: [plain, standard]
    default: plain
output_contract:
  format: markdown
  sections: [Subject line, Newsletter, Short message version, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Merged write-classroom-family-newsletter: an ask-me question per topic, answers to family questions, a reading_level option and a short message version."}
---
<context>
Families read class newsletters on a phone, between other things, often through a translation tool. They want three answers fast: what is my child learning (so they can ask about it at dinner), what do I need to do or bring and when, and how can I help at home. Newsletters that bury dates in paragraphs, use school jargon ("WIN block", "CFU", "phonics phase 3", "number bonds") or idioms that translate badly do not get acted on, and celebrations that name some children leave others out. Short sections, concrete dates and one easy home activity do get acted on. Reading level: {{reading_level}}.
</context>

<task>
Write a classroom newsletter from these notes{{#grade_level}} for {{grade_level}}{{/grade_level}}.

<week_notes>
{{week_notes}}
</week_notes>
{{#languages_at_home}}Families speak: {{languages_at_home}}. Write so the text translates cleanly.{{/languages_at_home}}

1. Start with the dates and actions families must not miss, in a short list: what, when (weekday and date written out, with time), and what the child needs. Put money and form deadlines in bold.
2. **What we learned:** 2 to 4 topics in plain words, each with one sentence on what students did and one question families can ask their child ("Ask me: how many ways can you make 10?").
3. **Try this at home (5 minutes):** one activity that needs no printing, no purchase and no screen, works in any home language and fits an existing routine (cooking, bath time, a walk, the bus). Fit it to the grade.
4. **Your questions:** only if the notes mention questions families asked. Answer each in two or three plain sentences from the notes plus general, age-appropriate advice (for example how to share a book). For school-specific facts not in the notes (policies, dates, contacts) write [CONFIRM: ...] instead of guessing.
5. **Celebrations:** class or group highlights; no individual student achievements unless the notes say families agreed, and never comparisons.
6. **Reminders:** anything else, briefly.
7. Close with how to contact the teacher and a warm one-line sign-off.
8. Write a short version under 80 words for a messaging app or school app notification that gives the key dates and points to the full newsletter.
</task>

<constraints>
- Under about 300 words for the newsletter body. Headings families can scan.
- If reading level is plain: sentences under 15 words, one idea per sentence, no idioms, sarcasm, slang or abbreviations, numbers as digits. If standard: still short and jargon-free.
- Explain any unavoidable school term in brackets the first time it appears.
- Write dates unambiguously (for example "Friday 14 March, 2:30 pm" or "Friday, March 14, 2:30 pm", following the format in the notes) and never only "next Friday".
- Do not name or picture individual students, mention grades, behaviour, health or support needs, or share anything about one family. If the notes ask you to call out named children, turn it into a general reminder and suggest a private message instead.
- Use only facts in the notes. Never invent dates, times, costs, trips or staff names; put [CONFIRM: ...] where a detail families need is missing and list it under "Before you send".
- Keep the tone warm and inclusive: say "families" or "grown-ups at home", and do not assume two parents, a car, a garden, money for extras or a particular religion or holiday. The home activity is optional, with no guilt.
</constraints>

<output_format>
## Subject line
A specific subject line under 60 characters.
## Newsletter
The newsletter in Markdown with short headings and lists, ready to paste into email or a school app.
## Short message version
Under 80 words.
## Before you send
Bullets: every [CONFIRM] to fill, facts to double-check, terms that may still translate badly, anything from the notes left out and why, and a note on translation (tools or school interpreters) if home languages were given.
</output_format>
