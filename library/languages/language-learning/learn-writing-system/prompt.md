---
schema: 1
id: learn-writing-system
kind: prompt
title: Learn a new writing system
description: Teaches a new script such as kana, hangul, Cyrillic, Arabic, Devanagari or Greek in small sets with mnemonics, shape notes, practice words and spaced review. For beginners facing a new alphabet.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [language-learner]
requires: [none]
inputs: [preferences]
output: [plan, explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [alphabet, script, mnemonics, spaced-repetition, hiragana, hangul, cyrillic]
pairs_with:
  prompts: [coach-pronunciation, build-vocabulary-list, learn-survival-phrases]
  personas: [language-teacher]
args:
  - name: script
    description: The writing system to learn and the language it is for, for example "hiragana for Japanese", "Cyrillic for Russian", "Arabic script for Egyptian Arabic", "Devanagari for Hindi".
    type: string
    required: true
  - name: native_script
    description: The script the learner already reads fluently, used for comparisons and transliteration.
    type: string
    default: latin
  - name: minutes_per_day
    description: Minutes per day the learner will practise; sets the size of each new set and the length of the plan.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [How this script works, Plan, Set 1, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach adults to read new scripts. Beginners stall when they meet the whole chart at once, learn letters in dictionary order, or memorise symbols without ever reading a real word. They progress fast when each small set is chosen so it spells real words immediately, when every symbol gets a memorable hook tied to its shape and sound, and when old sets come back on a spaced schedule.

Script to learn: {{script}}.
Learner already reads: {{native_script}}.
Daily practice time: {{minutes_per_day}} minutes.
</context>

<task>
1. If the script or its language is unclear (for example "Chinese characters" without saying which language or whether simplified or traditional, or "Arabic" for a language that also uses another script), ask one short question and stop.
2. Explain how the script works in five to eight lines: what each symbol represents (alphabet, abjad, abugida, syllabary, featural), writing direction, whether letters change shape by position, how vowels are shown, and the two or three features that most surprise readers of {{native_script}}.
3. Plan the sets. Group the symbols into sets of 4 to 8, sized to {{minutes_per_day}} minutes a day, ordered so that each set lets the learner read real, common words using only what they have learned so far. Show the plan as a table: day, set, symbols, first real words it unlocks. Put look-alike symbols in different sets, not side by side.
4. Teach set 1 in full. For each symbol give: the symbol (and its positional forms if they exist), its sound with the closest {{native_script}} equivalent and how it differs, a short mnemonic that ties the shape to the sound, a stroke or shape note (stroke order for kana and hangul, joining rules for Arabic, the headline for Devanagari), and a common confusion to watch for.
5. Give 6 to 10 practice words written only with set 1 (and earlier sets), each with transliteration hidden in a separate answer line, plus 3 short "read and match" items.
6. Give the review routine: a daily mini-quiz format, a spaced schedule (new set, then review after 1, 3 and 7 days), and when to stop using transliteration.
7. End by asking the learner to read the practice words aloud or type their transliterations, and say you will teach set 2 when they are ready.
</task>

<constraints>
- Every practice word must be a real, common word in the language, spelled correctly using only symbols already taught. If a set cannot form real words yet, use syllables and say so.
- Use the standard transliteration for the script (for example Hepburn for Japanese, Revised Romanization for Korean) and name it once.
- Mnemonics must describe the actual shape; do not invent shapes. Skip a mnemonic rather than force one.
- Do not claim exact sound equivalence where there is none; describe the difference.
- If the script has letters whose sound depends on the variety (for example Arabic letters in different dialects), say which pronunciation you teach.
</constraints>

<output_format>
## How this script works
Five to eight lines.
## Plan
Table: Day | Set | Symbols | First words unlocked. Total days to the full script at this pace.
## Set 1
Per symbol: symbol and forms · sound · mnemonic · shape note · watch out for.
Then **Practice words** (numbered, transliterations under a separate "Answers" line) and **Read and match**.
## Review
Daily routine and spaced schedule. Final line: the question inviting the learner to answer.
</output_format>
