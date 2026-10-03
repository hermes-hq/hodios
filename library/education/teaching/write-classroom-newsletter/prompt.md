---
schema: 1
id: write-classroom-newsletter
kind: prompt
title: Write a classroom newsletter
description: Writes a weekly or monthly classroom newsletter for families covering what students learned, how to help at home, dates and reminders, readable on a phone and easy to translate.
category: teaching
version: 1.0.0
status: incubating
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
tags: [family-engagement, school-home-communication, plain-language, translation-friendly]
pairs_with:
  prompts: [write-parent-email, prepare-parent-teacher-conference]
args:
  - name: week_notes
    description: Rough notes on what happened and what is coming, e.g. topics taught, highlights, upcoming dates, things to bring, reminders.
    type: text
    required: true
  - name: grade_level
    description: Optional grade or age, so home activities fit, e.g. "Kindergarten", "Grade 5", "Year 8 science".
    type: string
  - name: languages_at_home
    description: Optional languages families speak, e.g. "Spanish, Arabic, Vietnamese", so the text is written to translate cleanly.
    type: string
output_contract:
  format: markdown
  sections: [Subject line, Newsletter, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Families read class newsletters on a phone, between other things, often through a translation tool. They want three answers fast: what is my child learning, what do I need to do or bring and when, and how can I help at home. Newsletters that bury dates in paragraphs, use school jargon ("WIN block", "CFU", "phonics phase 3") or idioms that translate badly do not get acted on. Short sections, concrete dates, and one easy home activity do.
</context>

<task>
Write a classroom newsletter from these notes{{#grade_level}} for {{grade_level}}{{/grade_level}}.

<week_notes>
{{week_notes}}
</week_notes>
{{#languages_at_home}}Families speak: {{languages_at_home}}. Write so the text translates cleanly.{{/languages_at_home}}

1. Start with the dates and actions families must not miss, in a short list: what, when (day and date written out, with time), and what to do.
2. **What we learned:** 2 to 4 topics in plain words, each with one sentence on why it matters or what students did.
3. **Try this at home:** one or two 5 to 10 minute activities that need no purchases and work in any language (a question to ask at dinner, a game with household objects, noticing something on a walk). Fit them to the grade.
4. **Celebrations:** class-level highlights; no individual student achievements unless the notes say families agreed.
5. **Reminders:** anything else, briefly.
6. Close with how to contact the teacher and a warm one-line sign-off.
</task>

<constraints>
- Under about 300 words for the newsletter body. Short sentences, one idea each, and headings families can scan.
- Plain language at roughly a primary-school reading level: no idioms, sarcasm, slang or school acronyms; if a school term is unavoidable, explain it in a few words.
- Write dates unambiguously (for example "Friday 14 March, 2:30 pm" or "Friday, March 14, 2:30 pm", following the format in the notes) and never only "next Friday".
- Do not name or picture individual students, mention grades, behaviour or support needs, or share anything about one family.
- Use only facts in the notes. If a date, time or detail is missing for an action families must take, put a bracketed placeholder like [time] and list it under "Before you send".
- Keep the tone warm and inclusive of all family structures ("families", "grown-ups at home", not only "mums and dads").
</constraints>

<output_format>
## Subject line
A specific subject line under 60 characters.
## Newsletter
The newsletter in Markdown with short headings and lists, ready to paste into email or a school app.
## Before you send
Bullets: placeholders to fill, facts to double-check, and a note on translation (tools or school interpreters) if home languages were given.
</output_format>
