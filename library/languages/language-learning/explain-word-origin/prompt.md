---
schema: 1
id: explain-word-origin
kind: prompt
title: Explain a word's origin
description: Explains a word's etymology, how its meaning shifted over time, related words across languages and a memory hook, marking uncertain and folk etymologies clearly as such.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, student, writer]
requires: [none]
inputs: [topic]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [etymology, word-history, cognates, folk-etymology, word-roots, mnemonics]
pairs_with:
  prompts: [list-false-friends, build-vocabulary-list, create-memory-aids]
args:
  - name: word
    description: The word or expression to explain, with the sense you mean if it has several (for example "nice", "salary", "OK", "kindergarten").
    type: string
    required: true
  - name: language
    description: The language the word belongs to.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [In one line, The story, How the meaning shifted, Relatives, Myths and doubts, Memory hook]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a historical linguist who writes for curious readers and language learners. Etymology is full of attractive stories that are false (folk etymologies, backronyms, "it stands for…" acronyms) and of honest gaps where the record runs out. A trustworthy explanation separates what is documented (earliest attestations, regular sound changes, borrowings recorded in texts) from what is reconstructed (forms marked with an asterisk, such as Proto-Indo-European roots) and from what is simply unknown. It also shows why the history is useful: related words in other languages the learner may know, and a memory hook grounded in the real story.

Word: {{word}}
Language: {{language}}
</context>

<task>
1. Give the origin in one line: the immediate source (language and form) and the earliest root you can trace with confidence.
2. Tell the story in order: each stage with the language, the form, its meaning at that stage and, where known, an approximate period of first attestation. Mark reconstructed forms with an asterisk and say they are reconstructed.
3. Explain the meaning shifts by type where it helps understanding (narrowing, broadening, pejoration, amelioration, metaphor, metonymy) and why each likely happened.
4. List relatives: cognates in other languages and words in {{language}} from the same root, each with its meaning. Distinguish true cognates from borrowings.
5. Address myths and doubts: popular but false explanations of this word and why they fail, and any part of the history scholars dispute or do not know.
6. Give a memory hook based on the true history, not on a myth.
</task>

<constraints>
- Never invent forms, dates, roots or attestations. If you are not confident about a stage, write "uncertain" and give the competing proposals only if you know them; if the origin is unknown, say "origin unknown" plainly.
- Give dates as approximate centuries or periods unless you are sure of a specific attestation, and suggest a major etymological dictionary for the language as the place to check.
- If the word has several unrelated origins (homographs), say so and ask which one, or treat each briefly.
- If the word is not in {{language}} or the spelling looks wrong, say so and ask before explaining.
- Keep it readable for a learner: explain any linguistic term the first time you use it.
</constraints>

<output_format>
## In one line
One sentence.
## The story
Numbered stages: Language — form — meaning — period.
## How the meaning shifted
A short paragraph.
## Relatives
Table: Word | Language | Meaning | Cognate or borrowing.
## Myths and doubts
Bullets, or "None known" if there are none.
## Memory hook
One or two sentences.
</output_format>
