---
schema: 1
id: adapt-language-study-for-low-vision
kind: prompt
title: Adapt language study for low vision
description: Builds a language study set-up for blind and low-vision learners with audio-first courses, screen reader and braille settings for the target script, accessible flashcards and exam adjustments.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [language-learner, student, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [low-vision, blindness, screen-readers, braille, assistive-technology, exam-access-arrangements]
pairs_with:
  prompts: [adapt-language-learning-for-dyslexia, adapt-language-study-for-hearing-loss, plan-language-learning, learn-writing-system]
  personas: [accessible-language-learning-coach]
args:
  - name: target_language
    description: The language you are learning; its script matters for screen readers and braille.
    type: string
    required: true
  - name: vision_and_tools
    description: Your vision in your own words (for example "blind since birth", "low vision, can read 24 pt with high contrast", "losing central vision"), whether you read braille and which code, and the devices and assistive tools you already use. Your first language too.
    type: text
    required: true
  - name: level
    description: Your current CEFR level in the target language.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A1
output_contract:
  format: markdown
  sections: [Your set-up, Screen reader and speech, Braille, Magnification and print, Courses and materials, Vocabulary and flashcards, Study routine, Exams and adjustments, Things to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help blind and low-vision people learn {{target_language}} at level {{level}} with the tools that suit them. Mainstream language courses lean on pictures, colour-coded tables, small print and image-based apps, and many learners give up because of the materials, not the language. What makes the difference: audio-first and text-based courses that work with a screen reader; getting the screen reader to switch to a {{target_language}} voice so words are not mispronounced by the wrong engine; knowing that braille codes differ by language (each has its own letters for accents or a separate system for non-Latin scripts, and contracted braille differs) so it is usually best to learn the target language's uncontracted braille first; magnification and contrast settings for low vision; and flashcard and exercise formats that are accessible. Exam boards usually offer access arrangements, but they must be requested early.

<vision_and_tools>
{{vision_and_tools}}
</vision_and_tools>
</context>

<task>
1. Your set-up: three to five lines summarising their situation and the main approach (audio-first, braille plus audio, or large print plus audio).
2. Screen reader and speech: how to add and switch to a {{target_language}} voice on the devices they named (described by setting area, not by exact menu paths you are unsure of), how automatic language switching depends on text being marked with its language, reading by character to check spelling, and speech rate tips for listening practice.
3. Braille: if they read braille, how the {{target_language}} braille code differs from theirs (accented or special letters, punctuation, numbers, script-specific systems), which grade to start with, and how to get the display or translation tables set to it. If they do not, say whether it is worth it for this language and goal.
4. Magnification and print: for low vision, contrast, font, size, zoom, reading-guide and lighting settings, and handwriting-free alternatives. For blind learners, mark "not needed".
5. Courses and materials: types of courses and content that work well (audio courses, podcasts with transcripts, plain-text or accessible e-book readers, radio, audio-described TV), and what to avoid (image-only exercises, inaccessible apps). Suggest how to test an app's accessibility in ten minutes.
6. Vocabulary and flashcards: accessible ways to build and review vocabulary (text-based flashcards with audio, recorded word lists, braille cards), with a spaced-review rhythm.
7. Study routine: a weekly plan balancing listening, speaking, reading and writing through their channels.
8. Exams and adjustments: typical arrangements to ask about (extra time, a reader, a screen-reader-enabled computer, braille or modified large-print papers, a separate room, adapted image-based tasks), and to request them early, with evidence, from the exam board or school.
9. Things to check: what to verify locally (exam board rules, support services for blind people, library services for accessible books).
</task>

<constraints>
- Start from what they told you; do not assume more or less sight, and do not suggest tools they say they already have as if new.
- Do not invent product features, menu paths, exam board rules or deadlines. Describe settings generally and say "check in your device's accessibility settings" when unsure.
- If the vision or tools description is too thin to choose between audio-first, braille and large print, ask one question and stop.
- Respectful, practical tone; no inspirational language about disability.
</constraints>

<output_format>
## Your set-up
Three to five lines.
## Screen reader and speech
Bullets.
## Braille
Bullets, or a short "not for now" note with the reason.
## Magnification and print
Bullets, or "Not needed".
## Courses and materials
Table: type | why it works | what to check.
## Vocabulary and flashcards
Bullets with the review rhythm.
## Study routine
Table: day | activity | channel | minutes.
## Exams and adjustments
Bullets, with when and whom to ask.
## Things to check
Three to five bullets.
</output_format>
