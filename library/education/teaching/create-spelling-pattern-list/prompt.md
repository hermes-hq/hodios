---
schema: 1
id: create-spelling-pattern-list
kind: prompt
title: Create a weekly spelling pattern list
description: Builds a weekly spelling list around one pattern with the rule explained, challenge words, a word sort, practice activities and a short dictation test.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, parent]
subject: [english]
requires: [none]
inputs: [topic]
output: [plan, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [spelling, word-study, orthography, phonics, morphology, dictation]
pairs_with:
  prompts: [plan-phonics-lesson, write-decodable-text, plan-vocabulary-instruction]
args:
  - name: pattern
    description: The spelling pattern, e.g. "ai and ay for the long a sound", "doubling the consonant before -ing", "-tion", "soft c before e, i and y", "the prefix un-".
    type: string
    required: true
  - name: grade_level
    description: Grade, year or age. UK-style years (Year 3) get British spelling and US-style grades get American spelling unless stated otherwise.
    type: string
    required: true
  - name: list_length
    description: Number of core words on the list.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [The pattern, Core list, Challenge words, Word sort, Practice activities, Dictation test, Note for families]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spelling is learned by understanding how words work, not by memorising unrelated lists. English spelling is more regular than it looks once sound, position, and meaning (morphology) are taken into account: "ai" usually appears in the middle of a word and "ay" at the end; the consonant doubles before a vowel suffix after a short vowel; "-tion" carries meaning across related words. A good weekly list is built around one pattern, explains the rule in student language with its common exceptions, contrasts it with the pattern students confuse it with, and gives practice that makes students think about the pattern (sorting, building, explaining) rather than copying words five times. The test uses dictated sentences, because spelling in context is what transfers to writing.
</context>

<task>
Build a weekly spelling list for **{{grade_level}}** on the pattern **{{pattern}}**, with {{list_length}} core words.

1. **The pattern:** explain the rule in one or two student-friendly sentences, when it applies (position in the word, the sound, the meaning), the contrasting pattern students commonly confuse it with, and 2 or 3 common exceptions.
2. **Core list:** {{list_length}} words that follow the pattern, suited to the vocabulary of {{grade_level}}, mostly words students will use in their writing, ordered from simplest to more complex. Mark each word with where the pattern appears.
3. **Challenge words:** 4 to 6 longer or less common words using the same pattern (more syllables, added prefixes or suffixes, subject vocabulary).
4. **Word sort:** a sort with 2 or 3 categories (the target pattern, the contrasting pattern, and an "oddball" column for exceptions), 15 to 20 words, with the answer key. Include a question students answer after sorting ("What do you notice about where ay comes in a word?").
5. **Practice activities:** one short activity for each school day of a week (for example: sort and explain, build words with letter tiles or morphemes, word hunt in reading books, look-say-cover-write-check on the trickiest words, write sentences using three words, a partner quiz). Avoid "write each word five times".
6. **Dictation test:** 3 to 5 dictated sentences that use the core words and some previously learned words, with the target words underlined in the teacher's copy and how to score it (word-level score plus a check for the pattern).
7. **Note for families:** 2 or 3 sentences explaining the pattern and one quick game to play at home.
</task>

<constraints>
- Check every word: it must truly follow the pattern as stated (in sound and spelling) in the stated variety of English, and exceptions must be listed only in the oddball column. Double-check accent-dependent words and leave out any whose pronunciation varies widely.
- Use British or American spelling to match the grade naming, unless the teacher says otherwise, and say which you used.
- Suit the words to the age: no obscure words in the core list, and nothing inappropriate.
- If the pattern is unclear or combines two patterns, choose the main one, state it, and suggest the other for a later week.
</constraints>

<output_format>
## The pattern
Rule, contrast, exceptions, variety of English used.
## Core list
Numbered words with the pattern marked in bold.
## Challenge words
Bullets.
## Word sort
Table with column headings and words, then the answer key and the noticing question.
## Practice activities
Day 1 to Day 5, one activity each.
## Dictation test
Numbered sentences, scoring notes.
## Note for families
Short text and a game.
</output_format>
