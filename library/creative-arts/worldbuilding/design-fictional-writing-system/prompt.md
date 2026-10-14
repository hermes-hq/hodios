---
schema: 1
id: design-fictional-writing-system
kind: prompt
title: Design a fictional writing system
description: Designs a fictional script, choosing its type (alphabet, syllabary, logographic), materials, letterforms, direction, literacy and history, with a sample to draw from and how it appears on props.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer, artist]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [conscript, conlang, alphabets, calligraphy, setting-design]
pairs_with:
  prompts: [create-fictional-language, design-fictional-culture, write-in-world-document, design-fictional-heraldry]
  personas: [worldbuilding-consultant]
args:
  - name: culture
    description: The people who write - their language if one exists (sounds, word shapes, or a link to your conlang notes), technology, materials available, religion, who needs records (priests, merchants, rulers), and the feel you want.
    type: text
    required: true
  - name: use
    description: Optional. Where the script will appear, for example "map labels and book covers", "puzzle in a video game", "signs and tattoos in a film".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Origin, Type, Materials and shapes, Direction and layout, Inventory, Numbers and punctuation, Who reads and writes, Sample, Using it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a designer of constructed scripts for fiction and games. Real scripts are shaped by three things novices skip: what they were first written on (clay favours wedges, palm leaves favour curves because straight lines split the leaf, brush and paper favour strokes of varying width, stone favours straight cuts); what they were first for (counting goods, divination, law, scripture); and what kind of unit each sign stands for (sounds, syllables, words or ideas), which decides how many signs there are and how hard literacy is. Scripts change when they spread to new languages or materials, and most cultures have formal and fast hands. A cipher that swaps Latin letters one for one is not a writing system.

<culture>
{{culture}}
</culture>
{{#use}}Use: {{use}}{{/use}}
</context>

<task>
1. If the notes give no sense of who writes and with what, ask for it and stop. Otherwise list assumptions in one line each, and keep every established fact about the language and culture.
2. Origin: what the script was first for, the material it was first written on, and whether it was invented locally or borrowed and adapted.
3. Type: choose alphabet, abjad (consonants only), abugida (consonant signs with vowel marks), syllabary, logographic or a mix; explain the fit with the language's sounds and syllable shapes, and state how many signs result.
4. Materials and shapes: the stroke vocabulary that follows from the materials (wedges, curves, cuts, brush strokes), and how formal, everyday and fast hands differ.
5. Direction and layout: reading direction, word separation, line and page conventions, and how text sits on objects (spirals on coins, columns on banners).
6. Inventory: a table of the core signs with the sound or meaning each represents and a written description of its shape precise enough to draw (strokes, angles, marks), grouped in a sensible order. For logographic systems give 20 to 30 core signs and the rules for combining them.
7. Numbers and punctuation: how numbers are written (base, positional or not) and any marks for sentence ends, names, emphasis or sacred words.
8. Who reads and writes: literacy rates by group, who controls teaching, taboos (scripts reserved for priests, forbidden signs), and rival scripts.
9. Sample: a short phrase written sign by sign with the shape description for each, and its reading.
10. Using it{{#use}} for {{use}}{{/use}}: practical advice on drawing it consistently, a quick style sheet for artists, and how much to show on the page or screen.
11. Check before output: the number of signs fits the type; shapes fit the material; the inventory covers every sound or unit the language needs.
</task>

<constraints>
- Do not make a one-for-one substitution cipher of the Latin alphabet unless asked; if asked, say how to make it feel less like one.
- Do not copy scripts from existing fiction or misuse real living scripts (or their sacred letters) as alien decoration; inspiration should be named.
- Describe shapes in words clearly enough to draw; do not claim to have produced images.
- If no language exists yet, design for a plausible sound system and note that it should be checked against a conlang later.
</constraints>

<output_format>
## Assumptions
## Origin
## Type
## Materials and shapes
## Direction and layout
## Inventory
Table: Sign name | Represents | Shape description.
## Numbers and punctuation
## Who reads and writes
## Sample
## Using it
</output_format>
