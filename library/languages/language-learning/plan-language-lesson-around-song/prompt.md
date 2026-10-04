---
schema: 1
id: plan-language-lesson-around-song
kind: prompt
title: Plan a language lesson around a song
description: Plans a language lesson around a song the teacher picks, with prediction, gap-fill and ordering tasks, a language point, a pronunciation focus and a speaking follow-up, without reproducing lyrics.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [songs, listening-skills, gap-fill, connected-speech, lesson-plan, pre-listening]
pairs_with:
  prompts: [gloss-authentic-text, plan-pronunciation-class-segment, create-shadowing-script]
args:
  - name: target_language
    description: The language of the song and class.
    type: string
    required: true
  - name: song
    description: The song title and artist, and if you have them, the lines or chorus you plan to use (you supply the lyrics from your licensed copy). Add the class profile and lesson length.
    type: text
    required: true
  - name: level
    description: The class's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [Fit check, Lesson plan, Task templates, Language focus, Speaking follow-up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher plan a lesson around a song for a class at CEFR {{level}}. Songs are memorable, repeat chunks, and show connected speech and rhythm, but song lessons often become "fill the gaps while listening, then sing", with no language aim, gaps that test hearing of random words, and lyrics too fast or too slangy for the level. Song lyrics are usually copyrighted: you do not reproduce them; the teacher works from their own licensed copy and you design tasks they apply to it.

Song: {{song}}
</context>

<task>
1. Fit check: from what you reliably know about the song (theme, mood, chorus language, tempo), or from the lines the teacher supplied, say whether it suits {{level}}: speed, clarity, slang, repetition, and content suitability for the class. If you do not know the song well enough, say so and base the plan on the lines the teacher gives, asking for them if none were given. Flag content that may be unsuitable (explicit language, violence, references that need care) for the teacher to check.
2. Choose one language aim the song naturally carries (a tense, a structure in the chorus, a set of chunks, a vocabulary area), and one pronunciation feature it shows (weak forms, linking, elision, rhyme and stress).
3. Plan the lesson with timings (assume 60 minutes if not stated):
   - Pre-listening: predict the theme from the title, an image or 5-6 key words; personal questions on the theme.
   - First listening for gist: a mood or story question, not detail.
   - Second listening with a task on the lyrics: gap-fill where gaps target the language aim or the pronunciation feature (not random words), ordering of verses or lines, spot the wrong word, or matching lines to meanings.
   - Language focus: notice the aim in the lyrics, then a short practice activity outside the song.
   - Pronunciation focus: mark stress or linking in 2-3 lines, then say or sing them.
   - Speaking follow-up linked to the theme.
4. Task templates: write the instructions and design rules for each task so the teacher can apply them to their copy of the lyrics (for example "gap every past simple verb in verse 1 and the chorus, about 8-10 gaps; give the base forms in a box at A2"). If the teacher pasted lyrics, number their lines and give an exact gap list by line number and word (for example "line 3: the second verb"), plus the order of lines to cut up, instead of printing a gapped copy. You may quote a single short line (under about 10 words) to illustrate a point; do not reproduce verses or the full chorus, even when the teacher pasted them.
5. Language focus: explanation, 3-4 CCQs, and 6-8 original practice sentences with answers.
6. Speaking follow-up: a discussion, role-play or creative task (write a new verse with the same pattern, describe the story from another character's point of view), with useful phrases.
</task>

<constraints>
- Never reproduce full lyrics or more than one short line; do not invent lyrics and attribute them to the song.
- Do not state facts about the song or artist you are unsure of; say "check" instead.
- Suggest that the teacher plays the song from a legal source and checks the school's rules on using recorded music.
- If the song is clearly unsuitable for the level (much too fast or idiomatic), say so and suggest the kind of song that would work better, and still offer a plan if the teacher wants to proceed with heavier support.
</constraints>

<output_format>
## Fit check
## Lesson plan
Table: Stage | Minutes | Procedure | Interaction. Total on the last line.
## Task templates
One ### per task with instructions and design rules.
## Language focus
## Speaking follow-up
</output_format>
