---
schema: 1
id: make-flashcards
kind: prompt
title: Make flashcards from notes
description: Turns notes or a chapter into atomic flashcards, one fact per card with cloze deletions where they help, ready to import into Anki. Use when studying from your own material.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
stack: [anki]
requires: [none]
inputs: [notes, document, text]
output: [quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [spaced-repetition, active-recall, cloze]
pairs_with:
  prompts: [make-study-guide, create-study-plan]
  personas: [study-coach]
args:
  - name: material
    description: The notes, chapter or transcript to turn into cards. Paste the text itself, not a topic name.
    type: text
    required: true
  - name: count
    description: Target number of cards. Fewer are written if the material does not support that many good ones.
    type: number
    default: 30
  - name: format
    description: anki-csv for a file you can import, basic for question and answer pairs, cloze for cloze sentences only.
    type: enum
    enum: [anki-csv, basic, cloze]
    default: anki-csv
output_contract:
  format: markdown
  sections: [Cards, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Flashcards work when each card tests one retrievable fact with one unambiguous answer (the minimum information principle). Cards that bundle a list, ask a vague "what about X?" question, or can be answered by recognising the wording get learned as shapes instead of knowledge. The learner will review these cards in a spaced-repetition app for months, so every bad card costs them many minutes of reviews and teaches them to guess.
</context>

<task>
Turn the material below into about {{count}} flashcards in the `{{format}}` format.

<material>
{{material}}
</material>

1. Read all of the material before writing anything. Note the facts, definitions, mechanisms, cause-and-effect links, formulas and distinctions worth remembering. Ignore anything the material itself treats as incidental.
2. Prioritise what the material emphasises and what later ideas depend on. If there are more candidate facts than {{count}}, keep the most important and say how many you left out. If the material supports fewer good cards, write fewer. Never pad.
3. Write each card:
   - One fact per card. Split multi-part answers into separate cards. For an ordered sequence, write one card per step ("After X comes ___") instead of "List the steps".
   - Exactly one correct answer, and enough context in the question to answer it months later without the source: "In the citric acid cycle, which molecule combines with acetyl-CoA?", not "What does it combine with?".
   - Prefer "why" and "how" cards for mechanisms and "what is the difference between A and B" cards for easily confused pairs.
   - Add a reverse card (definition → term) only where recall in both directions matters.
   - Use a cloze deletion when the surrounding sentence is the best cue (definitions, formulas, key sentences). Hide the key term, never filler words, and use at most two deletions per note.
   - Keep answers short: a word, a number, a phrase or one sentence.
4. Tag each card with the material's own section or topic name, lowercase and hyphenated.
</task>

<constraints>
- Stay faithful to the material. Do not add facts it does not contain. If a statement in the material looks wrong, leave it out of the cards and flag it in Notes.
- If the material is empty, or is only a topic name ("the French Revolution"), ask for the notes or chapter text and stop. Write cards from general knowledge only if the learner explicitly asks for that.
- No yes/no cards unless the distinction itself is the point, and no "list all of X" cards.
- Keep the material's terminology and language. Do not translate.
</constraints>

<output_format>
## Cards
Follow the rules for `{{format}}`:
- `anki-csv`: one fenced code block per note type, because Anki imports each file with a single note type. Before each block write one line telling the learner to save it as a plain `.txt` file (e.g. `basic.txt`, `cloze.txt`) and open it with File > Import. Start each block with Anki's file headers so the import dialog configures itself:
  - Basic block: `#separator:Semicolon`, `#html:false`, `#notetype:Basic`, `#tags column:3`, each on its own line, then one row per card: `front;back;tags`.
  - Cloze block: the same headers with `#notetype:Cloze`, then rows `text;extra;tags`, leaving `extra` empty when there is nothing useful to add.
  - Wrap a field in double quotes if it contains a semicolon or a quote, and double any quote inside it. Separate tags with spaces. Omit a block that would have no rows.
- `basic`: a numbered list, each item `Q: …` on one line and `A: …` on the next.
- `cloze`: a numbered list of sentences in Anki cloze syntax. Each deletion is two opening curly braces, then `c1::` (or `c2::` for a second deletion), then the hidden text, then two closing curly braces.

## Notes
One short paragraph: how many cards you wrote, what you left out and why, and any statement in the material that looks wrong. For `anki-csv`, add one line: if Anki runs in another language, change `#notetype:` to that language's name for the Basic or Cloze note type.
</output_format>

<examples>
Weak card: "Q: What are the functions of the liver? A: Detoxification, bile production, glycogen storage, protein synthesis."
Better, as four cards: "Q: Which digestive fluid does the liver produce? A: Bile." / "Q: In what form does the liver store glucose? A: Glycogen." and so on, one function each.
</examples>
