---
schema: 1
id: write-back-to-school-letter
kind: prompt
title: Write a back-to-school letter to families
description: Writes a teacher's start-of-year welcome letter to families with an introduction, routines, how to communicate, what to expect this year and a short way for families to share about their child.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [family-engagement, welcome-letter, parent-communication, start-of-year]
pairs_with:
  prompts: [plan-first-week-of-school, write-classroom-newsletter, plan-curriculum-night-presentation]
args:
  - name: teacher_notes
    description: Your name as you want it written, grade or subject, a line or two about you, and the key details (start date, timetable, homework, supplies, communication app, contact hours).
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: tone
    description: Optional tone, e.g. "warm and playful", "professional, secondary school".
    type: string
    default: warm and professional
  - name: languages
    description: Optional languages families speak, so the letter notes translation options.
    type: string
output_contract:
  format: markdown
  sections: [Letter, Family questionnaire, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A start-of-year letter sets the tone for the relationship with families. The most useful ones are short enough to read on a phone, lead with warmth and the key practical details (when, what to bring, how to reach the teacher), set expectations about communication response times early, and invite families to share what they know about their child. Letters that go wrong are long, full of jargon and rules, list supplies some families cannot afford without saying help is available, or overshare personal details about the teacher. Many families read them in a second language, so plain English and a note on translation help.
</context>

<task>
Write a back-to-school letter for **{{grade_level}}** in a {{tone}} tone.
<teacher_notes>
{{teacher_notes}}
</teacher_notes>
{{#languages}}
Languages families speak: {{languages}}
{{/languages}}

1. Open with a warm welcome and a short introduction of the teacher (two or three sentences, from the notes only).
2. Give the practical essentials in a scannable list: start date and times, what to bring, homework approach, and any key dates given.
3. Explain communication: the best way to contact the teacher, when to expect a reply (e.g. within two school days), what to do for urgent matters, and how the teacher will share news.
4. Say in two or three sentences what students will learn and do this year.
5. Invite families to share about their child with a short questionnaire (5 to 7 questions: what the child enjoys, what helps them learn, anything the teacher should know, preferred contact method and language). Make all questions optional.
6. Close warmly with an invitation to an event if one is given.
7. Keep the letter to about one page (around 300 to 350 words).
</task>

<constraints>
- Use only details from the teacher's notes; mark anything missing with [placeholders] instead of inventing dates, names or policies.
- If supplies are listed, add a line that families who need help with supplies can contact the teacher privately.
- Plain language, no education jargon or acronyms; short sentences.
- Do not ask for sensitive information (medical details, immigration status, income) in the questionnaire; point to the school's official forms for medical information.
- Do not include the teacher's personal phone number or home details unless the notes explicitly ask.
</constraints>

<output_format>
## Letter
The letter, ready to adapt.
## Family questionnaire
Numbered optional questions.
## Before you send
Bullets: details to fill or check, translation, school approval if required.
</output_format>
