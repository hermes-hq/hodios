---
schema: 1
id: build-vocabulary-list
kind: prompt
title: Build a vocabulary list
description: Builds a themed vocabulary list for a CEFR level with gender, collocations and example sentences, plus an Anki-ready import block. Use when starting a new topic.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, teacher]
stack: [anki]
requires: [none]
inputs: [topic]
output: [table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [word-list, collocations, spaced-repetition]
pairs_with:
  prompts: [write-graded-reader, generate-language-drills]
args:
  - name: theme
    description: Topic or situation the words are for (for example "renting a flat", "at the doctor", "office small talk").
    type: string
    required: true
  - name: target_language
    description: Language of the words, with the variety if it matters.
    type: string
    required: true
  - name: level
    description: Learner's CEFR level; decides which words are worth learning now.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
  - name: count
    description: Number of entries in the list.
    type: number
    default: 25
output_contract:
  format: markdown
  sections: [Word list, Anki import]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a {{target_language}} teacher who builds vocabulary sets for spaced-repetition study. A useful list is chosen for the learner's real needs at their level, gives the grammatical information they must learn with each word (a German noun without its article is half-learned), and shows each word in a chunk they can reuse. A list of rare synonyms or bare translations wastes review time.

Theme: {{theme}}
Learner level (CEFR): {{level}}
Number of entries: {{count}}
</context>

<task>
1. Choose exactly {{count}} entries for the theme: the words and short fixed phrases a {{level}} learner most needs to talk about it, most frequent and most useful first. Include verbs and adjectives, not only nouns. If the count is above 60, build the list and suggest splitting it into sets of 20–30 for study.
2. For each entry give what this language requires you to learn with the word, for example:
   - gendered languages: article or gender marker and the plural (German *der Vertrag, die Verträge*);
   - verbs: the forms that are not predictable (German participle and auxiliary, Russian aspect pair, Spanish stem change);
   - Chinese: pinyin with tone marks and the usual measure word; Japanese: reading in kana and the counter if relevant.
3. Add one or two common collocations (verb + noun, adjective + noun, fixed preposition).
4. Write one example sentence per entry that uses vocabulary at or below {{level}}, with an English translation.
5. Build an Anki import block from the same entries.
</task>

<constraints>
- Only real, current, natural words. Mark regional or informal items, and flag false friends with English.
- Glosses are short and match the sense used in the example, not the dictionary's first sense.
- Do not repeat an entry under two spellings or forms.
- In the Anki block: one note per line, fields separated by semicolons, no header row. Wrap any field that contains a semicolon or a double quote in double quotes, and double any quote inside it. Keep formatting plain text.
</constraints>

<output_format>
## Word list
A table with columns: # | Word (with gender/plural or key forms) | Meaning | Collocations | Example (translation).

## Anki import
A code block that starts with these header lines, then one line per entry:
```
#separator:semicolon
#html:false
#tags column:3
```
Three fields per line, so it imports into Anki's default Basic note type: front ({{target_language}} word with its article or key forms); back (meaning, then " — ", then the example sentence and its translation in parentheses); tags (the theme as one kebab-case tag and the level, separated by a space).

Close with one line: save the block as a `.txt` file and import it in Anki with File → Import.
</output_format>
