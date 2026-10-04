---
schema: 1
id: learn-language-for-grandchildren
kind: prompt
title: Learn a language to talk with grandchildren
description: Plans language learning for grandparents whose grandchildren speak another language, focused on child talk for praise, play, bedtime, food, songs and stories, with video-call routines.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [language-learner, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [grandparents, child-directed-speech, video-calls, family-language, older-learners, songs-and-rhymes]
pairs_with:
  prompts: [teach-language-to-child, learn-survival-phrases, build-personal-phrasebook, review-vocabulary-spaced]
  personas: [language-teacher]
args:
  - name: target_language
    description: The language your grandchildren speak, with the country or region (for example "Norwegian", "Spanish (Chile)", "English (US)").
    type: string
    required: true
  - name: grandchild_ages
    description: The grandchildren's ages and how much of each language they speak (for example "girl 3, mostly Norwegian; boy 7, understands some Polish").
    type: string
    required: true
  - name: time_and_contact
    description: Optional. How much time you have to learn each week, how often you see or call them, your first language, and anything that makes learning easier or harder (eyesight, hearing, memory, comfort with phones or apps).
    type: text
output_contract:
  format: markdown
  sections: [Your plan at a glance, First words and phrases, Routines to learn by heart, Call and visit routines, Weekly rhythm, Getting help from the family, Keeping going]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help grandparents learn {{target_language}} so they can talk with their grandchildren.

Grandchildren (ages and languages): {{grandchild_ages}}

This is a different goal from a standard course: they do not need to discuss politics or fill in forms; they need warm, simple child talk, a lot of repetition, and things to do together. Young children are forgiving listeners who love repetition, praise, games and songs; older children can teach their grandparent, which is motivating for both. Older adult learners learn well with meaningful, routine-based language, spaced review, and audio; they need a pace that respects energy, memory and eyesight or hearing, and no talking down.
{{#time_and_contact}}

<time_and_contact>
{{time_and_contact}}
</time_and_contact>
{{/time_and_contact}}
</context>

<task>
1. Your plan at a glance: three to five lines: the goal for the first three months by child age (for example "play and bedtime with the 3-year-old, simple questions about school with the 7-year-old"), how much time it needs, and the main method.
2. First words and phrases: 40 to 60 items for talking with children of these ages, grouped: greetings and love, praise and encouragement, play and games, food and mealtimes, bath and bedtime, feelings and comfort, simple questions ("what's that?", "show me", "what did you do at school?"). Include the pet names and baby words children of that age hear in {{target_language}}, and note that families often have their own words.
3. Routines to learn by heart: three or four short fixed routines (a hello and goodbye ritual, a simple game such as hide and seek or "I spy", a bedtime phrase or lullaby line, a counting or colour game), each as a few lines to memorise.
4. Call and visit routines: a 10-minute video-call plan (greeting, show-and-tell, a game, a short song or story, goodbye) that works with small children's attention, and two activities for visits.
5. Weekly rhythm: what to do each day in short sessions (10 to 20 minutes), with review of old phrases before new ones and one call or visit per week as the "real use".
6. Getting help from the family: how to ask the parents for the family's words and nicknames, short voice notes of songs, and how to let the grandchildren be the teacher.
7. Keeping going: four or five tips for patience with slow progress and for not switching back to the shared language when stuck.
</task>

<constraints>
- Use only what the grandparent told you about the family; do not invent names, nicknames or family habits.
- Check that every child-talk phrase is natural for {{target_language}} in that region, including the informal "you" used with children.
- Respect older learners: no patronising tone, no assumptions about technology skills or memory unless they mention them; if they mention eyesight, hearing or memory, adapt the plan (larger print, audio-first, more review).
- Do not advise parents on how to raise the children bilingually unless asked; the focus is the grandparent's own learning.
- If the grandchildren's ages or the language are unclear, ask for it and stop.
</constraints>

<output_format>
## Your plan at a glance
Three to five lines.
## First words and phrases
Tables by group: {{target_language}} | how to say it | meaning.
## Routines to learn by heart
Each routine as a short script.
## Call and visit routines
The 10-minute call plan as numbered steps, then two visit activities.
## Weekly rhythm
Table: day | what to do | minutes.
## Getting help from the family
Bullets.
## Keeping going
Four or five bullets.
</output_format>
