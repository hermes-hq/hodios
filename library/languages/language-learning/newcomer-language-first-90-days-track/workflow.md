---
schema: 1
id: newcomer-language-first-90-days-track
kind: workflow
title: First 90 days of a new language
description: Guides a newcomer's first 90 days with the local language in gated steps, from a needs audit and survival phrase bank to rehearsed appointments, a level check, a course choice and a routine.
category: language-learning
version: 1.0.0
status: incubating
stage: [discover, build, learn, plan]
role: [language-learner, individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, conversation, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [newcomers, survival-language, needs-analysis, phrase-bank, appointment-rehearsal, study-routine]
pairs_with:
  prompts: [learn-survival-phrases, practise-spelling-out-personal-details, learn-form-filling-vocabulary, assess-language-level, plan-language-learning]
  personas: [esol-volunteer-tutor, language-learning-strategist]
args:
  - name: target_language
    description: The local language, with the country or city (for example "Danish, Aarhus", "German, Vienna").
    type: string
    required: true
  - name: situation
    description: When you arrived or will arrive, who you live with, your work or study, your first language and other languages, the appointments and errands coming up in the next weeks, and how much time you can give the language each week. Rough notes are fine.
    type: text
    required: true
  - name: level
    description: Your current level in the local language (CEFR), or A1 if you are starting.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A1
steps:
  - {id: audit, file: steps/01-needs-audit.md, stage: discover, gate: approve, artifact: "first-90-days/01-needs-audit.md"}
  - {id: phrases, file: steps/02-phrase-bank.md, stage: build, gate: approve, artifact: "first-90-days/02-phrase-bank.md"}
  - {id: rehearse, file: steps/03-rehearse-appointments.md, stage: learn, gate: approve, artifact: "first-90-days/03-rehearsal-notes.md"}
  - {id: course, file: steps/04-level-and-course.md, stage: plan, gate: approve, artifact: "first-90-days/04-level-and-course.md"}
  - {id: routine, file: steps/05-weekly-routine.md, stage: plan, gate: none, artifact: "first-90-days/05-weekly-routine.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides the first three months with {{target_language}} the way a good newcomer tutor would: find out what the person must do in the language soon, give them the phrases for exactly that, rehearse the first real appointments, then check their level, choose a course and set a routine they can keep. Each step writes one artifact and stops for approval; later steps reuse the needs and phrases already agreed.

Starting level: {{level}}

<situation>
{{situation}}
</situation>

Rules for every step:
- Use only what the person told you about their life. Ask for missing essentials (country or city, first language, upcoming appointments, time per week) and mark gaps as [X].
- Teach language, not procedures. Do not give immigration, legal, tax, housing or medical advice; give the phrases to ask the right office or professional, and say what to check on official sources.
- Never invent office names, fees, deadlines, course prices or schedules; name what to look up.
- Use the local variety and the formal "you" with officials; give pronunciation hints readable for the person's first language.
- Keep each artifact short enough to use on a phone. End each with open questions.
- If anything suggests someone is in danger or being exploited, step out of the lesson and point to local emergency services or a support organisation first.
