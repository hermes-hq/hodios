---
schema: 1
id: write-classroom-family-newsletter
kind: prompt
title: Write a classroom family newsletter
description: Writes a teacher's weekly or fortnightly class newsletter to families, covering what we learned, a five-minute way to help at home, dates and what to bring, and celebrations that name no child.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [home-learning, family-engagement, plain-language, translation-friendly, early-years]
pairs_with:
  prompts: [write-community-digest, write-bilingual-newsletter-issue]
args:
  - name: week_notes
    description: Your rough notes for the period - topics and skills covered, a moment from class, upcoming dates, things to bring, reminders, and anything families asked about.
    type: text
    required: true
  - name: year_group
    description: The class and age group, for example "Reception, ages 4-5" or "Grade 3".
    type: string
    required: true
  - name: reading_level
    description: plain uses short sentences and everyday words that machine translation handles well, for classes where many families read in a second language; standard is still clear but less restricted.
    type: enum
    enum: [plain, standard]
    default: plain
output_contract:
  format: markdown
  sections: [Newsletter, Short message version, Check before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teacher write the regular class newsletter for families of {{year_group}}. Families read it on a phone, often tired, sometimes in a second language through a translation app. They want three things: what their child is learning (so they can ask about it at dinner), one small thing they can do at home, and what they need to remember (dates, kit, money, forms). Common failures: jargon from the curriculum ("phonemes", "number bonds", "WALT") without a plain explanation, home tasks that need printing or an hour, celebrations that name some children and leave others out, and idioms that translate badly. Reading level: {{reading_level}}.
</context>

<task>
<week_notes>
{{week_notes}}
</week_notes>

1. Pull out: learning this period, one classroom moment, dates and deadlines, what to bring, reminders, and family questions to answer.
2. "What we learned": two to four bullets, each a skill or topic in everyday words, with one question families can ask their child ("Ask me: how many ways can you make 10?").
3. "Try at home (5 minutes)": one activity that needs no printing, no purchase and no screen, works in any home language, and fits into a routine (cooking, bath time, a walk, the bus).
4. "Dates and things to bring": a list with weekday, date, what, and what the child needs. Put money or form deadlines in bold.
5. "Your questions": answer each question families asked in the notes in two or three plain sentences, using the notes plus general, age-appropriate advice (for example how to share a book); for school-specific facts not in the notes (policies, dates, contacts) write [CONFIRM: ...] rather than guessing.
6. "Class celebrations": celebrate the class or groups, never individual named children, and never compare.
7. If {{reading_level}} is plain: sentences under 15 words, one idea per sentence, no idioms, no abbreviations, numbers as digits, dates written as "Tuesday 14 October".
8. Write a short version (under 80 words) for a messaging app that points to the full newsletter.
</task>

<constraints>
- Use only what the notes say. Never invent dates, times, costs, trips, staff names or learning content; write [CONFIRM: ...] for missing details.
- Do not include children's names, photos, health, behaviour or support needs, or anything about one family.
- Keep the tone warm and inclusive: do not assume two parents, a car, a garden, money for extras or a particular religion or holiday. Mention where help is available for costs only if the notes say so.
- No homework pressure or guilt; the home activity is optional.
- Explain any school term the first time it appears, in brackets.
- Keep the full newsletter under about 300 words.
</constraints>

<output_format>
## Newsletter
A greeting line, then the headings: What we learned, Try at home (5 minutes), Dates and things to bring, Your questions (only if families asked any), Class celebrations, Reminders (only if any), and a sign-off with how to contact the teacher.

## Short message version
Under 80 words.

## Check before sending
Every [CONFIRM], any term that may still be hard to translate, and anything you left out and why.
</output_format>
