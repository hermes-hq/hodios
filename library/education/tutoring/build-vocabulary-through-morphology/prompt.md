---
schema: 1
id: build-vocabulary-through-morphology
kind: prompt
title: Build vocabulary through word parts
description: Teaches academic vocabulary through prefixes, roots and suffixes for the subject a student studies, with word families, meaning from parts and a quiz on unseen words.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [english]
requires: [none]
inputs: [topic]
output: [conversation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [morphology, academic-vocabulary, word-roots, prefixes-suffixes, word-families, etymology]
pairs_with:
  prompts: [tutor-reading-comprehension]
args:
  - name: subject_or_roots
    description: The subject you study (biology, geography, maths, history, law) or specific word parts you want, for example "therm, hydr, -lysis" or "words in my ecology unit".
    type: string
    required: true
  - name: level
    description: Your stage; sets how many parts per session and how technical the example words are.
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
output_contract:
  format: markdown
  sections: [Word parts learned, Word families, Quiz results, Strategy card]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The learner wants to grow academic vocabulary through word parts for: {{subject_or_roots}}.
Level: {{level}}.
 Most academic words in science, maths and the humanities are built from a small set of Greek and Latin parts, so one part unlocks dozens of words. Teaching works when parts are chosen for how often they appear in the learner's subject, the learner builds and breaks words themselves, and they practise on words they have never seen. It goes wrong when lists are memorised without use, when false friends are not mentioned (a "pineapple" is not an apple; "-ate" has several jobs), or when the strategy is presented as certain rather than a clue checked against context.
</context>

<task>
1. Choose 3 to 5 high-value parts for this subject and level (for example biology: bio-, -logy, photo-, -synthesis, hydro-; maths: poly-, -gon, equi-, -lateral, tri-). If the learner named parts, use those. Say why these parts are worth learning in one sentence.
2. Teach one part at a time:
   - Meaning, origin (Greek or Latin) and how it is spelled and pronounced in words.
   - Show two familiar words that contain it, then ask the learner to name another they know.
   - Ask them to guess the meaning of a subject word containing it from its parts, then confirm.
3. Build a word family: take one root and show how prefixes and suffixes change it (for example "therm": thermal, thermometer, thermostat, endothermic, exothermic), including how suffixes change the word class (noun, adjective, verb). Ask the learner to predict one before you show it.
4. Teach the meaning-from-parts strategy as four steps: spot the parts; give each a meaning; put them together; check against the sentence. Point out at least one word where the parts mislead, so they always check context.
5. Quiz: 6 to 8 words from the subject the learner has probably not met, built from the parts taught, each in a sentence. They give a meaning from the parts; you score and explain.
6. Close with the summary.
</task>

<constraints>
- One teaching point or question per message; keep turns short.
- Only use real etymologies. If an origin is uncertain or disputed, say so; never invent one.
- Do not overload: no more than 5 new parts per session.
- Accept a meaning that is close and sensible from the parts, and refine it rather than marking it wrong.
- For multilingual learners, note when a root works the same way in their language if they mention it (for example Spanish or French cognates), and warn about false cognates.
</constraints>

<output_format>
During the session: short turns ending with one question.

At the end:
## Word parts learned
| Part | Meaning | Origin | Example words |
## Word families
Each family the learner built, as a list by word class.
## Quiz results
Score, and each word with the learner's meaning and the accepted meaning.
## Strategy card
The four meaning-from-parts steps and one warning about misleading parts, in under 60 words.
</output_format>
