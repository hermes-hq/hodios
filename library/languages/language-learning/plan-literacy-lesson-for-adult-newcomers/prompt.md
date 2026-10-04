---
schema: 1
id: plan-literacy-lesson-for-adult-newcomers
kind: prompt
title: Plan a literacy lesson for adult newcomers
description: Plans a lesson for adults learning to read and write for the first time or in a new script, built on the language of their real lives, adult phonics, sight words and oral work first.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [esol, adult-literacy, leslla, newcomers, phonics, sight-words, language-experience]
pairs_with:
  personas: [esol-volunteer-tutor]
  prompts: [turn-realia-into-worksheet, learn-writing-system]
args:
  - name: target_language
    description: The language the learners are learning to read and write, with the local variety if relevant.
    type: string
    required: true
  - name: group_profile
    description: Who is in the group - number of learners, first languages and scripts, years of schooling, spoken level, what they already read (own name, numbers, signs), daily needs and the theme you want. Rough notes are fine.
    type: text
    required: true
  - name: lesson_length
    description: How long the lesson is.
    type: string
    default: 90 minutes
output_contract:
  format: markdown
  sections: [Learners and aim, Lesson plan, Materials, Differentiation, Check and next lesson]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an ESOL or integration-course teacher, often a volunteer, plan one literacy lesson for adults who are learning to read and write for the first time, or who are literate in another script and are learning the {{target_language}} script. These learners are capable adults with full lives; low print literacy is not low ability.

Lessons for this group usually fail in four ways: children's materials and baby talk; reading tasks built on words the learners cannot yet say or understand; too many new letters or words at once; and pages of small print with no link to the learners' week. Good practice for adult emergent readers (the LESLLA field) is: oral language first, then reading what they can already say; the language experience approach (the group's own sentences written down and read back); a small set of sight words from real life (their name, address, EXIT, PUSH, PULL, OPEN, bus numbers, days, prices); explicit sound-letter work in an adult context; large clear print; lots of repetition through varied activities; and copying, tracing and writing that have a real purpose (a form, a shopping list, a text to the school).

Lesson length: {{lesson_length}}

<group>
{{group_profile}}
</group>
</context>

<task>
1. Read the group profile. Separate learners with no prior literacy, learners literate in another script (they know what reading is and transfer strategies quickly) and learners with a little schooling. If two of these are present, plan for both.
2. Choose one theme from their daily life and one aim the learners can feel at the end ("I can read the days on my appointment card and write my appointment"). Choose: 4-6 sight words or phrases, 1-2 sound-letter correspondences that occur in those words, and one short sentence pattern.
3. Build the plan with timings that add up to {{lesson_length}}, using these stages:
   - Welcome and routine: the same opening every lesson (date, name, register they tick).
   - Oral work: talk about the theme with real objects, photos or the actual document; drill the key words aloud until learners can say them.
   - Language experience text: the group dictates 3-5 sentences about the theme; the teacher scribes them; the group reads them back together, then in pairs.
   - Sight words: whole-word recognition with matching, finding the word in the real document, word cards.
   - Phonics: the target sounds through the sight words (hear it, say it, see it, write it), with 6-8 known words that contain it; no nonsense words.
   - Writing with a purpose: trace, copy, then write from memory into a real format.
   - Review and celebration: read the class text again; each learner says one thing they can now read.
4. For each stage give the timing, what the teacher does and says (short, plain sentences in {{target_language}}), what learners do and the interaction (whole group, pairs, individual).
5. Write all materials in full: the model language experience text (as an example; the real one comes from the group), word cards, the phonics word set, the writing frame. Note print size (at least 18-point, a clear sans-serif font, lowercase letters with a single-storey a unless the local school standard differs), one item per line and generous spacing.
6. Plan differentiation for the profiles found in step 1, plus a quick check of who can read which words, without a test that feels like school failure.
</task>

<constraints>
- Adult themes and images only: no cartoons, nursery rhymes or "A is for apple" materials.
- Never ask learners to read words they cannot yet say and understand.
- No more than 6 new written words and 2 new sound-letter correspondences per lesson.
- Use the learners' first languages as a resource (a peer explaining, a bilingual helper), and never forbid them.
- If the group profile lacks the learners' spoken level or prior schooling, state your assumption at the top and list the questions to ask; do not invent learner details.
- If the {{target_language}} script has features you are not sure how to teach (letter forms, joining, direction), say so and suggest checking a local adult literacy curriculum.
</constraints>

<output_format>
## Learners and aim
The profiles found, assumptions, the aim, the words, sounds and sentence pattern.
## Lesson plan
Table: Stage | Minutes | Teacher does and says | Learners do | Interaction. Total on the last line.
## Materials
Each item under its own ### heading, ready to print.
## Differentiation
By profile, plus how to use helpers or volunteers.
## Check and next lesson
How to see who can read what, and what to recycle next time.
</output_format>
