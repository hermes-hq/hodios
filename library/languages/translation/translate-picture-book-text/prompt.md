---
schema: 1
id: translate-picture-book-text
kind: prompt
title: Translate a picture book
description: Translates a children's picture book text keeping read-aloud rhythm, rhyme where it matters, page turns and age-appropriate words, with alternatives for the hardest spreads and picture-matching notes.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [parent, writer]
subject: [literature]
requires: [none]
inputs: [text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [childrens-books, read-aloud, rhyme, literary-translation]
pairs_with:
  prompts: [translate-literary-passage, translate-singable-lyrics, translate-preserving-tone]
args:
  - name: target_language
    description: The language and variety of the translation, for example "Spanish (Latin America)", "German", "Welsh".
    type: string
    required: true
  - name: book_text
    description: The text spread by spread, marked like "Spread 3:", with a short note of what each illustration shows when the words depend on it.
    type: text
    required: true
  - name: age_range
    description: Optional. The reader's age, for example "2-4" or "5-7". Changes vocabulary and sentence length.
    type: string
output_contract:
  format: markdown
  sections: [Approach, Translation by spread, Alternatives, Picture and text notes, Read-aloud check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate picture books, which are written to be read aloud by an adult to a child who is looking at the pictures. That makes them closer to verse and theatre than to prose: rhythm and sound carry the reading, refrains and repetition are structural, the page turn is a dramatic beat (the question on one spread, the answer on the next), and every line must still match what the illustration shows, because the pictures cannot be changed. What goes wrong: a literal translation that is clunky to read aloud, forced rhymes that twist the meaning or use words no child knows, a refrain translated differently each time, a joke that depends on the picture lost, and text much longer than the original that will not fit the layout.

Target language: {{target_language}}
{{#age_range}}Reader age: {{age_range}}{{/age_range}}
</context>

<task>
<book_text>
{{book_text}}
</book_text>

1. Approach: read the whole book first. Describe in a few lines its rhythm (metre or free), whether it rhymes and in what pattern, the refrains, the page-turn reveals and the voice. Decide where rhyme is structural (a rhyming text where the rhyme drives the reading) and where meaning or rhythm should win. State your choices.
2. Translate spread by spread. Keep each refrain identical every time it returns. Keep page-turn beats on the same spread. Keep text length close to the original (say if a spread runs more than about 20% longer).
3. For any spread where the text names or depends on something in the picture (a colour, a count, an animal, a hidden detail), make sure the translation still matches it, and note it.
4. For the three to five hardest spreads (wordplay, rhyme, names, cultural items), give one alternative with a short reason, so the user or editor can choose.
5. Read-aloud check: flag lines that are hard to say, have a stress pattern that fights the rhythm, or use words too hard for the age range, with a fix.
</task>

<constraints>
- Keep the story, characters' actions and every picture-dependent detail. Do not add morals, explanations or extra jokes.
- Names: keep, adapt or translate according to the book's tone; if you change a name, say why, and keep any name that appears in an illustration unchanged unless the user says the art can be relabelled.
- Use age-appropriate vocabulary; avoid words that are archaic or regional in a way the target readers will not know.
- If the text has no spread markers or picture notes where the meaning depends on the illustration, ask for them, or translate and mark the spreads where you could not check the match.
- If the text is not a picture book (long prose, adult fiction, a chapter book without illustrations), say so and suggest a literary translation approach instead of forcing spreads.
- For published work, remind the user once that translating and publishing a book needs the rights holder's permission.
</constraints>

<output_format>
## Approach
Four to six bullets.
## Translation by spread
For each spread: **Spread N** then the translated text, laid out as on the page.
## Alternatives
Table: Spread | Main version | Alternative | Why.
## Picture and text notes
Bullets per spread where the match matters.
## Read-aloud check
Table: Spread | Line | Problem | Fix. "No issues" if clean.
</output_format>
