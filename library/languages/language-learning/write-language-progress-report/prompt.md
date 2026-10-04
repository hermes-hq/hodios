---
schema: 1
id: write-language-progress-report
kind: prompt
title: Write a language progress report
description: Writes a language student's report from the teacher's notes and scores, with progress per skill against CEFR can-dos, evidenced strengths, two targets and a home tip, in plain words for the reader.
category: language-learning
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [progress-report, cefr, can-do-statements, report-comments, parent-communication]
pairs_with:
  prompts: [write-speaking-assessment-rubric, write-report-card-comments]
args:
  - name: notes_and_scores
    description: The language, the student's first name or initials, level and course, your notes per skill (speaking, listening, reading, writing), test scores, attendance and anything the report must include. Rough notes are fine.
    type: text
    required: true
  - name: reader
    description: Who will read the report.
    type: enum
    enum: [student, parents, sponsor-or-employer]
    default: parents
output_contract:
  format: markdown
  sections: [Summary, Progress by skill, Strengths, Targets, How to help at home, Teacher check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a language teacher or tutor turn notes and scores into a termly progress report. The reader is: {{reader}}. Language reports go wrong when they are generic ("works hard, must participate more"), when they report scores without saying what the learner can now do, when they mention CEFR levels the reader does not understand, and when targets are vague ("improve grammar").

<notes>
{{notes_and_scores}}
</notes>
</context>

<task>
1. Pull out what the notes say per skill (speaking, listening, reading, writing, and vocabulary or grammar if noted). Do not fill in a skill the notes do not cover; mark it "not assessed this term".
2. For each covered skill, write one or two can-do sentences that describe what the student can now do, in the style of CEFR can-do descriptors but in plain words ("can follow a short phone message about times and places"), and say whether this is below, at or above the expected level for the course, using the teacher's evidence.
3. Strengths: two or three, each with a specific piece of evidence from the notes (a task, a score, an example).
4. Targets: exactly two, each specific, observable and achievable by next term, with how the teacher will help ("use past tenses correctly when telling a story; we will practise with weekly storytelling").
5. A home tip that matches the reader: for parents, something they can do even if they do not speak the language (ask the child to teach them five words, keep a regular reading time, watch with subtitles); for the student, a 10-minute routine; for a sponsor or employer, how to give real opportunities to use the language at work.
6. Adapt the tone and words to {{reader}}: parents get warm, plain language and no jargon; students get "you"; sponsors or employers get a short, factual summary of current ability and attendance.
7. List under "Teacher check" anything you inferred or could not confirm, and any sensitive point (attendance, behaviour, wellbeing) you left for the teacher to decide how to phrase.
</task>

<constraints>
- Use only facts in the notes. Never invent scores, examples or levels; write [X] where a needed detail is missing.
- Mention a CEFR level only if the notes give one, and explain it in a few words for parents and sponsors.
- Keep it positive and honest: no false praise, no labels about character or ability ("lazy", "not a language person").
- Do not include health, family or immigration details even if they appear in the notes; flag them under Teacher check. If the notes suggest a wellbeing or safeguarding concern, tell the teacher to follow their school's safeguarding or pastoral procedure rather than mention it in the report.
- Total length about 200-300 words unless the notes ask for a different length.
</constraints>

<output_format>
## Summary
Two sentences.
## Progress by skill
One short paragraph or bullet per skill.
## Strengths
## Targets
Two numbered targets.
## How to help at home
(Rename to "How to keep improving" for a student, "How to support at work" for a sponsor or employer.)
## Teacher check
Bullets for the teacher only, not for the reader.
</output_format>
