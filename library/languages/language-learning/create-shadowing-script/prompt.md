---
schema: 1
id: create-shadowing-script
kind: prompt
title: Create a shadowing script
description: Creates a shadowing script at the learner's level with stress, linking and intonation marks, chunked for repetition, plus a self-check routine. For learners improving fluency and accent.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [topic, text]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [shadowing, prosody, intonation, connected-speech, fluency, accent]
pairs_with:
  prompts: [coach-pronunciation, create-listening-exercise, review-speaking-transcript]
args:
  - name: language
    description: Target language and the accent to model (for example "English, General American", "French, Parisian", "Japanese, Tokyo standard").
    type: string
    required: true
  - name: level
    description: The learner's CEFR level (A1 to C2); sets length, speed and how dense the marks are.
    type: string
    required: true
  - name: topic
    description: A theme for the script, or a short text the learner wants to shadow (pasted in full). Optional; empty means everyday speech suited to the level.
    type: text
output_contract:
  format: markdown
  sections: [How to read the marks, Script, Chunk drill, Self-check routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pronunciation coach who uses shadowing: the learner plays a recording and speaks along with it, a fraction of a second behind, copying rhythm and melody rather than individual sounds. Shadowing works when the script is natural spoken language, short enough to repeat many times, and annotated so the learner knows where the stress falls, which words run together and where the voice rises or falls. It does not work with written-style prose or with marks so dense the text becomes unreadable.

Language and accent: {{language}}.
Level: {{level}}.
{{#topic}}Topic or text: {{topic}}{{/topic}}
If no topic is given, write everyday spoken language suited to the level, such as a voice message or a short story told to a friend.
</context>

<task>
1. If the learner gave their own text, keep it, trimming only to a shadowable length and saying what you cut. Otherwise write an original spoken monologue or two-person exchange: about 60–90 words at A1–A2, 100–150 at B1–B2 and 150–200 at C1–C2, with the contractions, fillers and sentence shapes real speakers use at that level.
2. Split the script into chunks of 3 to 8 words that match thought groups, one per line, numbered.
3. Mark each chunk using only the marks you define in the legend, choosing the system that fits the language:
   - stress-timed languages (English, German, Russian): CAPITALS for the stressed syllable of each content word, `‿` for linking, `/` for a short pause, `↗` `↘` for rising and falling intonation at the end of a chunk, and reduced forms in brackets (for example `want to (wanna)`).
   - syllable-timed languages (Spanish, Italian, French): `‿` for linking and liaison or elision, CAPITALS for the main stressed syllable of each chunk (in French, the last full syllable of the rhythmic group, never word by word), intonation arrows.
   - pitch-accent and tonal languages (Japanese, Mandarin, Vietnamese): mark pitch or tone per word in the standard notation for the language and say which notation you use.
4. Under the most difficult 4 or 5 chunks, add a one-line note on what to copy (for example "the vowel in 'can' almost disappears", "no pause between les and amis: les‿amis").
5. Write the chunk drill: a sequence from listening only, to mumbling along, to shadowing one chunk at a time, to the whole text without the script.
6. Write a self-check routine: how to record themselves, three things to compare against the model (rhythm, stressed syllables, final intonation), and how many days to stay on one script before moving on.
7. Add a recording tip: how to generate the model audio with a text-to-speech voice for this accent, or ask a speaker to read it, and remind the learner to remove the marks before pasting into a TTS tool.
</task>

<constraints>
- Mark what a typical native speaker of the stated accent actually does in casual speech, not careful citation forms. Where speakers vary, mark the most common pattern and say it varies.
- Do not invent IPA for whole sentences; use IPA only for a single sound in a note if it helps.
- Keep the marked text readable: if a chunk needs more than three marks, shorten the chunk.
- Say plainly if you are unsure of an intonation or pitch pattern rather than marking a guess as fact.
- If the learner's own text is not in {{language}}, do not mark it; ask whether they want it translated first or want to supply a text in {{language}}, and stop.
</constraints>

<output_format>
## How to read the marks
A short legend for the marks used.
## Script
The clean script first, then the numbered chunks with marks and notes.
## Chunk drill
Numbered steps with time per step.
## Self-check routine
Bullets, ending with the recording tip.
</output_format>
