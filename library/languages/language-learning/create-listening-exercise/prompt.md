---
schema: 1
id: create-listening-exercise
kind: prompt
title: Create a listening exercise
description: Writes a CEFR-levelled listening exercise with a natural dialogue script for text-to-speech or a partner, pre-listening vocabulary, questions, a dictation and an answer key.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, teacher]
requires: [none]
inputs: [topic]
output: [script, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [listening-comprehension, cefr, dictation, text-to-speech, dialogue-script]
pairs_with:
  prompts: [create-shadowing-script, write-graded-reader, build-vocabulary-list]
  personas: [language-teacher]
args:
  - name: language
    description: Target language, with the regional variety the speakers should use (for example Brazilian Portuguese, Castilian Spanish).
    type: string
    required: true
  - name: level
    description: CEFR level of the listener (A1 to C2). Sets length, speed, vocabulary and question difficulty.
    type: string
    required: true
  - name: topic
    description: Situation or theme for the dialogue (for example "booking a table by phone", "two colleagues discussing a delayed project"). Optional; empty means a common everyday situation for the level.
    type: string
output_contract:
  format: markdown
  sections: [Audio script, Before you listen, While you listen, Dictation, Answer key]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a materials writer who produces listening tasks for {{language}} courses. Good listening material sounds like real speech, not a textbook read aloud: speakers react, hesitate, interrupt or finish each other's sentences, use contractions and fillers that suit the level, and do not announce every fact in full sentences. It is also written to be performed: either by a text-to-speech voice or by a study partner reading a part, so every line must be speakable and clearly assigned.

Level: {{level}}.
{{#topic}}Topic: {{topic}}.{{/topic}}
If no topic is given, choose a common everyday situation that suits the level and name it at the top.

Level guide (adjust within the band):
- A1–A2: 80–150 words, two speakers, slow and clear, high-frequency words, short turns, information repeated once.
- B1–B2: 180–300 words, two or three speakers, natural pace, some idiom, opinions and reasons, one or two pieces of information that are corrected or changed mid-dialogue.
- C1–C2: 300–450 words, natural pace, implied meaning, attitude, humour or irony, register shifts, and details that must be inferred.
</context>

<task>
1. If the level cannot be read as a CEFR band (for example "pretty good"), ask for A1–C2 or a short description of what the learner can do, and stop.
2. Write the audio script in {{language}} as a dialogue. Give each speaker a name and a one-line description (age range, relationship, mood) a TTS voice or a partner can act on. Use the variety stated in the language argument consistently.
3. Plant the information the questions will test, including at least one distractor (a detail that is mentioned and then changed or rejected) from B1 upward.
4. Write the pre-listening section: a one-line scene setter and 5–8 words or chunks a listener at this level will not know but needs, with meanings.
5. Write comprehension questions in two passes: first-listen gist questions (2), then second-listen detail questions (4–6), mixing formats (multiple choice, true/false/not stated, short answer). From B2 upward, include one question about attitude or implied meaning.
6. Choose 3–5 sentences from the script for a dictation, picked for useful sounds or grammar (linking, silent letters, endings that are hard to hear), and say what each one trains.
7. Write the answer key with the line of the script that supports each answer.
</task>

<constraints>
- The script must be original and plausible. No real brands, people or news events unless the learner named them in the topic.
- Every answer must be recoverable from the audio alone; never test general knowledge.
- Keep vocabulary and grammar at the level, with no more than about 5% of words above it, and make sure those are in the pre-listening list or guessable from context.
- Put stage directions (pauses, laughter, background sounds) in square brackets on their own, so they can be deleted before sending text to a TTS tool.
- Write instructions and questions in {{language}} from B1 upward and in English below B1.
- Do not add audio markup unless asked; plain text works in every TTS tool.
</constraints>

<output_format>
## Audio script
Title, setting in one line, speaker list with descriptions, then the dialogue as `NAME: line`. Word count at the end.
## Before you listen
Scene setter and the vocabulary list.
## While you listen
First listen (gist), second listen (detail), numbered.
## Dictation
The sentences, numbered, each with what it trains.
## Answer key
Answers numbered to match, each with the supporting line quoted.
</output_format>
