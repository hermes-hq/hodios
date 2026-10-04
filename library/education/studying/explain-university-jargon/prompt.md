---
schema: 1
id: explain-university-jargon
kind: prompt
title: Explain university jargon
description: Explains the vocabulary and unwritten rules of university for a named country, what each term means for the student in practice, and what to check with their own institution.
category: studying
version: 1.0.0
status: incubating
stage: [learn, discover]
role: [student, parent]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [university-life, first-generation-students, international-students, mature-students]
pairs_with:
  prompts: [prepare-for-university-start, prepare-office-hours-questions, understand-assignment-brief]
  personas: [mature-student-mentor]
args:
  - name: country
    description: The country where the university is, e.g. "UK", "USA", "Germany", "Australia". Add the university if you want to note its own terms.
    type: string
    required: true
  - name: terms_or_situation
    description: Optional terms you met or the situation you are in, e.g. "my email mentions 'reassessment', 'capped at 40' and 'mitigating circumstances'". Leave empty for the essentials a new student needs.
    type: text
output_contract:
  format: markdown
  sections: [Quick answer, Terms explained, Unwritten rules, Where to ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
University runs on vocabulary that many students and families have never heard: credits, modules, office hours, extenuating circumstances, resits, vivas, transcripts, grade classifications. Students without a parent who went to university, mature students and international students often lose marks, money or deadlines because nobody explained what a term means for them in practice, or the unwritten rules around it (that office hours are for everyone, that extensions must be requested before the deadline). The same word can also mean different things in different countries ("course" is a single class in the USA and a whole degree in the UK) and different universities.

Country: {{country}}.
</context>

<task>
{{#terms_or_situation}}
<terms_or_situation>
{{terms_or_situation}}
</terms_or_situation>

{{/terms_or_situation}}
1. If terms or a situation were given, explain those first, starting with anything that has a deadline or consequence (a resit date, a capped mark, a request window). Otherwise, choose the 12 to 15 terms a new student in {{country}} most needs, grouped as: how the degree is built, teaching, assessment and grades, when things go wrong, and getting help.
2. For each term give: a plain meaning in one sentence, what it means for the student in practice (a decision, a deadline, a cost), and what varies by institution and must be checked locally.
3. Point out terms that mean something different in other countries if that could mislead this student (for example "college", "course", "faculty", "professor", "major", "grade").
4. Explain 5 to 7 unwritten rules relevant to the terms: using office hours, emailing lecturers, asking for extensions before deadlines, attendance and how it may be monitored (including for student visas), how academic misconduct is handled, and where to get help early.
5. Say where to find the official answers: the student handbook, module or course pages, the registry or student records office, the students' union or student advice centre, and the international student office if relevant.
</task>

<constraints>
- Name the country assumption and say where practice differs between universities in {{country}}.
- Never state specific deadlines, fees, grade boundaries, pass marks or rules for a particular university as fact; give typical patterns and say "check your student handbook".
- Do not give immigration or visa advice; for visa-related attendance rules, say to check with the university's international student office.
- Plain, friendly language; no jargon inside the explanations.
- If the country is missing or unclear, ask for it and stop.
</constraints>

<output_format>
## Quick answer
2 to 4 sentences: the most important thing to know or do now.

## Terms explained
Table: Term | Plain meaning | What it means for you | Check locally. Grouped under the five headings when covering the essentials.

## Unwritten rules
Bullets.

## Where to ask
Bullets: the office or document, and what to ask it.
</output_format>
