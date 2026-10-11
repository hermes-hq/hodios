---
schema: 1
id: find-rhymes-in-context
kind: prompt
title: Find rhymes for a line
description: Finds perfect, slant and multisyllable rhymes for the word ending your line, matched to its stress pattern and accent, then shows a few that fit what the line is trying to say.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, artist, student]
subject: [literature]
requires: [none]
inputs: [text]
output: [table, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [rhyme, slant-rhyme, word-choice, formal-verse]
pairs_with:
  prompts: [write-poem-in-form, audit-poem-meter]
args:
  - name: word
    description: The word you need a rhyme for.
    type: string
    required: true
  - name: context
    description: The line or stanza it ends, and what the next rhyming line needs to say. Optional but makes the suggestions useful.
    type: text
  - name: accent
    description: Your accent or variety of English if it matters (for example General American, Scottish, Australian, London). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Sound to match, Rhymes, In your line, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet and lyricist who thinks about rhyme as sound, stress and surprise. A rhyme matches from the last stressed vowel to the end of the word, so "remember" rhymes with "December" and "dismember" but not with "her"; multisyllable words need a match on the stressed syllable, not just the ending. Types worth knowing: perfect (night/light), family or consonant-swap (night/ride), assonance (night/time), consonance (night/note), multisyllable or mosaic (orange/door hinge), and rich or identical rhyme (cite/sight). Accent changes rhyme: in non-rhotic accents "saw" and "more" can rhyme; in many American accents "cot" and "caught" sound the same. The most predictable pairs (love/above, fire/desire, heart/apart) read as cliché in contemporary poems unless used knowingly.

Word: {{word}}
{{#context}}
<context_lines>
{{context}}
</context_lines>
{{/context}}
{{#accent}}Accent: {{accent}}{{/accent}}
</context>

<task>
1. Give the sound to match: the stressed vowel and everything after it, in plain spelling (for example "-EM-ber"), and note any accent dependence.
2. List rhymes grouped by type: perfect, near (family and consonant), assonant, multisyllable or phrase rhymes. Give only real words and natural phrases. Note the stress of each multisyllable option.
3. If the context is given, propose three to five ways to end the next rhyming line, each showing the rhyme in a full line that says what the line needs to say, without inverted word order.
4. Name the clichéd pairs to avoid for this sound, if any.
5. If the word has few or no perfect rhymes, say so plainly and offer slant options, a phrase rhyme, or moving the word away from the line end.
</task>

<constraints>
- No invented words or misstressed rhymes (do not pair "remember" with "her").
- Mark accent-dependent rhymes as such.
- Keep the full list to about thirty items; quality over quantity.
- Lines you suggest are suggestions in the writer's register; do not rewrite their earlier lines.
</constraints>

<output_format>
## Sound to match
One or two lines.
## Rhymes
A table: word or phrase, type, stress, note.
## In your line
Three to five candidate lines, or a note that context is needed.
## Avoid
One to three bullets.
</output_format>
