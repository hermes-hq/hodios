---
schema: 1
id: plan-young-learner-language-lesson
kind: prompt
title: Plan a young learners' language lesson
description: Plans a 30-45 minute classroom lesson for children aged 4-10 learning a new language, with routines, TPR, a song, a story, a game and a movement or craft task, plus ideas for shy and lively children.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [young-learners, primary-school, tpr, songs-and-chants, storytelling, classroom-routines]
pairs_with:
  prompts: [teach-language-to-child, plan-language-lesson-around-song]
  personas: [early-years-educator]
args:
  - name: target_language
    description: The language being taught.
    type: string
    required: true
  - name: ages
    description: The children's ages, class size, lesson length (30-45 minutes) and what they already know (for example "6-7 year olds, 22 children, 40 minutes, know colours and numbers to 10").
    type: string
    required: true
  - name: topic
    description: The topic or vocabulary set for the lesson (for example animals, my body, food, weather).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Aim and language, Lesson plan, Classroom language, Song story and game, Children who need something different, Check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a primary teacher or tutor plan a {{target_language}} lesson for young children. Children: {{ages}}. Topic: {{topic}}.

Young learners learn a language through doing, hearing the same chunks many times and having fun, not through grammar explanation. Their attention span is short (roughly their age in minutes for one activity, often less), so lessons need short stages that alternate stirring (lively, moving) and settling (calm, sitting) activities. Lessons go wrong when there are too many new words (more than 6-8), when children are asked to speak before they have heard enough, when the teacher translates everything, when activities depend on reading and writing the children cannot yet do, and when a single activity drags.
</context>

<task>
1. Aim and language: one aim the children could show ("can name and point to six animals and say 'I like...'"), 5-8 target words, one or two chunks, and the words recycled from earlier lessons.
2. Lesson plan with timings that total the lesson length, in stages of 3-8 minutes, labelled stir or settle:
   - Hello routine (same every lesson: song or chant, weather, register with a response chunk).
   - Introduce the words with real objects, flashcards or actions, using total physical response (TPR): children respond with actions before they say the words ("Hop like a frog!").
   - A song or chant with actions.
   - A short picture story (told by the teacher with repetition and children joining in on a repeated line).
   - A game (Simon says, flashcard games, run and touch, bingo with pictures, guess what's in the bag).
   - A movement or craft activity linked to the words, with simple language used while doing it ("What colour? Cut, please.").
   - Goodbye routine.
3. Write in full: the chant or song lyrics (original, short, to a well-known traditional tune named only if it is in the public domain), the story (8-12 lines with a repeated line), the game rules, and craft steps.
4. Classroom language: 10-12 instructions and praise phrases in {{target_language}} with a gesture for each, used every lesson.
5. Children who need something different: shy or silent children (let them respond with actions or pointing; the silent period is normal), very active children (give them jobs, use their energy in stirring stages), children who are new to the class or the school language, and mixed ages.
6. Check: how the teacher sees who has the words, without a test (pointing games, a "show me" round, a sticker or picture record).
</task>

<constraints>
- Age-appropriate, safe activities: no small parts for under-5s, no running in cramped spaces, no food activities without checking allergies.
- Do not reproduce copyrighted songs or stories; write original ones.
- Speak {{target_language}} most of the time, using gestures and visuals; use the school language only briefly, for safety or comfort.
- If the ages or lesson length are missing, assume 6-7 years and 40 minutes and say so.
- No reading or writing tasks for children who cannot yet read; for 8-10 year olds, add a short picture-supported reading or labelling task.
</constraints>

<output_format>
## Aim and language
## Lesson plan
Table: Stage | Minutes | Stir or settle | What the teacher does and says | What children do. Total on the last line.
## Classroom language
Table: Phrase | Gesture.
## Song story and game
Each under a ### heading, written in full.
## Children who need something different
## Check
</output_format>
