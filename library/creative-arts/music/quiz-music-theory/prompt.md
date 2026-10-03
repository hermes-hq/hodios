---
schema: 1
id: quiz-music-theory
kind: prompt
title: Quiz me on music theory
description: Runs an adaptive music theory quiz on keys, intervals, chords, rhythm and notation in text form, explaining every answer and moving difficulty up or down with the learner.
category: music
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student, artist]
subject: [music-theory]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
tags: [ear-free-drills, intervals, chord-spelling, adaptive-quiz]
pairs_with:
  prompts: [explain-music-theory-concept, suggest-chord-progressions, analyze-song-structure]
args:
  - name: level
    description: "beginner: note names, major scales, simple rhythms. intermediate: all keys, intervals with quality, triads and sevenths, Roman numerals. expert: modes, secondary dominants, borrowed chords, voice leading, compound meters."
    type: enum
    enum: [beginner, intermediate, expert]
    default: beginner
  - name: focus
    description: What to drill. mixed rotates through all areas.
    type: enum
    enum: [mixed, intervals, chords, keys, rhythm]
    default: mixed
  - name: questions
    description: Number of questions in the session.
    type: number
    default: 15
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Music theory questions in text have traps a general quiz does not: enharmonic spellings matter (an augmented fourth and a diminished fifth sound the same but are different intervals; C# and Db are different answers in different keys), rhythms must be written so they can be counted without notation, and a question about "the chord" needs the key to have one correct answer. A good theory drill asks the learner to produce the answer (spell it, name it, count it), checks spelling as well as sound, and explains the reasoning so the rule sticks.
</context>

<task>
Run a {{questions}}-question music theory quiz at `{{level}}` level, focus `{{focus}}`.

1. Plan privately: spread questions across the focus area (for `mixed`: intervals, chords, keys, rhythm, and notation reading in text). Do not show the plan.
2. Ask exactly one question per message, numbered "Question k of {{questions}}". Use text-safe notation and say so in the first question: note names with # and b (C#, Bb), octave numbers when needed (C4 is middle C), chord symbols (Cmaj7, F#m7b5), Roman numerals with case for quality (ii, V7), and rhythms as note values with counts (quarter, eighth, dotted quarter; "1 & 2 & 3 e & a 4").
3. Vary the question type: spell it (the notes of an E major scale, of a Bb7 chord), name it (the interval from F up to D), identify it (the key with three flats, the relative minor of A major), analyse it (the Roman numeral of D minor in C major), count it (how many beats a given bar holds in 6/8, where the beats fall), and fix it (a misspelled chord or a bar with the wrong number of beats).
4. After each answer: mark Correct, Partly correct or Incorrect; explain in two or three sentences, showing the method (count the letter names, then the semitones); then ask the next question in the same message. Accept a correct sound with a wrong spelling as Partly correct and say why spelling matters in that key.
5. Difficulty: start one step below the stated level's middle. After two correct answers in a row, step up; after an incorrect one, step down and later return to that idea from another angle.
6. Treat "skip" or "I don't know" as incorrect, give the answer and the method, and move on. If the learner says "stop", go straight to the summary.
7. Before marking an answer, verify it yourself step by step (letter count and semitone count for intervals; key signature for spellings). If a question turns out to be ambiguous, say so, accept any defensible answer and do not count it against the learner.
</task>

<constraints>
- One question per message; never reveal the answer in the question.
- No questions that need hearing audio; this quiz is ear-free. If the learner asks for ear training, suggest practising with an instrument or an ear-training app alongside.
- Use standard English-language note names unless the learner asks for solfège or another system, then switch consistently.
</constraints>

<output_format>
During the quiz: verdict and explanation for the last answer, then "Question k of {{questions}}" and the next question.

At the end:
**Score:** x / {{questions}}
Table: Area | Questions | Correct | Status (Solid / Shaky / Review).
**Review first:** the two or three weakest ideas, each with the rule in one sentence and an exercise to do at an instrument.
**Next session:** a suggested level and focus.
</output_format>
