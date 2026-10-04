---
schema: 1
id: plan-pronunciation-class-segment
kind: prompt
title: Plan a pronunciation segment for a class
description: Plans a 15-20 minute class pronunciation segment on one feature, such as a sound pair, word stress, linking or intonation, with noticing, controlled practice, a communicative task and a quick check.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pronunciation-teaching, minimal-pairs, word-stress, intonation, intelligibility, lesson-stage]
pairs_with:
  prompts: [compare-native-and-target-language, analyse-target-language-for-lesson]
  personas: [intelligibility-coach]
args:
  - name: target_language
    description: The language being taught, with the accent model you use (for example General British, Mexican Spanish).
    type: string
    required: true
  - name: feature
    description: The pronunciation feature to teach, or a description of the problem you hear (for example "ship/sheep", "word stress on -tion words", "everyone sounds flat in questions").
    type: string
    required: true
  - name: learner_languages
    description: The learners' first languages and level, if known.
    type: string
    default: not given
output_contract:
  format: markdown
  sections: [Feature and why, Segment plan, Materials, Quick check, If it does not work]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher who rarely teaches pronunciation plan a 15-20 minute segment that fits inside a normal lesson. Pronunciation work goes wrong when teachers aim at a native accent rather than intelligibility, explain mouth anatomy for ten minutes, drill words in isolation that learners then never use in speech, and pick a feature that does not cause misunderstanding for these learners.

Feature or problem: {{feature}}
Learners' first languages and level: {{learner_languages}}
</context>

<task>
1. Name the feature precisely (the phonemes in slashes, the stress pattern, the linking rule or the tone pattern), and say why it matters for intelligibility. Use what you know about the learners' first languages to predict what they will do instead (for example, Spanish speakers merging /ɪ/ and /iː/; Japanese speakers inserting vowels in clusters). If the first languages are not given, say the prediction is general and suggest listening for the substitution in the first activity.
2. If the feature as given is low priority for intelligibility (for example, English /θ/ for most listeners), say so and suggest a higher-payoff feature, but still plan the one requested unless the teacher's own description shows a different problem.
3. Plan the segment in four stages with timings that total 15-20 minutes:
   - Noticing: learners hear the contrast in meaningful pairs or sentences before saying anything (a "which one did I say?" task with gestures, cards or numbers).
   - Physical description: one short tip on how to make it (lips, tongue, length, where the stress falls), with a gesture or visual the teacher can reuse (a rubber band for vowel length, clapping for stress, hand movement for intonation).
   - Controlled practice: from words to phrases to sentences, with a minimal-pair or stress game in pairs where the listener's response shows whether the speaker was intelligible.
   - Communicative task: a short task where getting the feature wrong changes the meaning or outcome (an information gap, a shopping list, directions, a dialogue).
4. Write all materials: minimal pairs or word sets (8-12, only real, useful words), sentences, the game, the task cards. Mark stress with capitals or bold, and give IPA for sounds.
5. Quick check: a 2-minute way to see who can hear and produce it (for example, each pair says three items and the partner points), and how to note who needs more.
6. Give two fixes for common problems (nobody can hear the difference; learners can do it in drills but not in the task) and a 2-minute recycling idea for the next three lessons.
</task>

<constraints>
- Model an accent the teacher names; if none, say which model you assume and note where other accents differ.
- Aim for intelligibility, not accent removal; never describe learners' accents as wrong or bad.
- Do not use nonsense words, and avoid word pairs where one word is offensive or very rare.
- If you are unsure about a pronunciation in the chosen variety, say so rather than present it as fact.
</constraints>

<output_format>
## Feature and why
The feature in IPA or stress notation, predicted substitutions, intelligibility priority.
## Segment plan
Table: Stage | Minutes | Teacher does | Learners do. Total on the last line.
## Materials
Each under a ### heading.
## Quick check
## If it does not work
Two fixes and the recycling idea.
</output_format>
