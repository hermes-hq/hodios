---
schema: 1
id: learn-spelling-to-sound-rules
kind: prompt
title: Learn how spelling maps to sound
description: Teaches how a language's spelling maps to its sounds, with the main rules in order of payoff, exceptions, minimal pairs and reading-aloud practice with self-checks.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [preferences]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [phonics, orthography, ipa, minimal-pairs, reading-aloud]
pairs_with:
  prompts: [coach-pronunciation, learn-writing-system, create-shadowing-script]
  personas: [language-teacher]
args:
  - name: target_language
    description: The language whose spelling to learn, with the variety if pronunciation differs (for example "Portuguese (Brazil)", "English (US)").
    type: string
    required: true
  - name: native_language
    description: The learner's first language, used for sound comparisons and to predict which rules will be hard.
    type: string
    default: english
output_contract:
  format: markdown
  sections: [How regular is it, The rules, Minimal pairs, Read aloud, Self-check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach the link between spelling and pronunciation. Learners who never learn it guess the sound of every new word, pronounce it with their first language's rules, and then cannot recognise it when they hear it. Some languages are close to one letter, one sound (Spanish, Finnish, Italian); others have regular but complex rules (French, Portuguese, German); and some are only partly predictable (English). Teaching the rules that cover the most words first, with honest notes on exceptions, lets a learner read new words aloud correctly most of the time.

Language: {{target_language}}
Learner's first language: {{native_language}}
</context>

<task>
1. Check the scope. If {{target_language}} is not written alphabetically (for example Chinese characters), explain in two lines that spelling-to-sound rules apply to its romanisation or phonetic script instead (pinyin, zhuyin, kana) and offer to teach that; stop. For Japanese, teach kana rules and note that kanji readings must be learned per word. If the variety matters and is not given, state the one you teach.
2. How regular is it: in four lines, say how predictable the spelling is, what the learner can rely on, and the one or two areas where they cannot.
3. The rules, ordered by how many common words each affects:
   - Vowels and vowel combinations, including length or nasal vowels if the language has them.
   - Consonants whose sound depends on context (for example c and g before e or i, s between vowels, final devoicing, silent final consonants).
   - Digraphs and trigraphs.
   - Stress: where it falls by default and how the spelling (accent marks, double letters) signals exceptions.
   - Connected speech rules that change sounds across words where they are part of reading aloud (for example French liaison and elision).
   For each rule: the spelling, the sound in IPA plus the closest sound in {{native_language}} and how it differs, three example words, and the main exceptions.
4. Minimal pairs: six to ten pairs that contrast sounds the spelling distinguishes and that speakers of {{native_language}} often merge, with meanings.
5. Read aloud:
   - Twelve real words in increasing difficulty, each testing a named rule.
   - Six made-up words that follow the rules, so the learner applies rules rather than memory.
   - A short passage of two to four sentences using as many rules as possible, with stressed syllables marked.
   Put the pronunciations (IPA or a simple respelling) in a separate answer block.
6. Self-check: how to check themselves (record, then compare with a dictionary audio or text-to-speech; listen for the specific contrasts), and ask them to write how they would read three of the words so you can check their rule use.
</task>

<constraints>
- Use IPA for the target sounds and name the variety; never claim a sound is identical to a {{native_language}} sound unless it is.
- Rules must be stated so they are true for most words; give the main exceptions instead of hiding them.
- Use only real, common words in the examples; the made-up words must be clearly labelled.
- Keep each rule to two or three lines. Teach at most twelve rules now and list the rest for later.
</constraints>

<output_format>
## How regular is it
## The rules
Table: Spelling | Sound (IPA) | Like in {{native_language}}? | Examples | Exceptions.
## Minimal pairs
Table: Word 1 | Word 2 | Sounds contrasted | Meanings.
## Read aloud
Numbered words, made-up words, passage, then **Answers**.
## Self-check
Routine and the closing request.
</output_format>
