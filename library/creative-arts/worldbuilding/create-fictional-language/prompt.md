---
schema: 1
id: create-fictional-language
kind: prompt
title: Create a fictional language
description: Sketches a fictional language that fits its culture, with sounds, romanisation, word shapes, core grammar, a starter lexicon and glossed sample phrases, at the depth your story or game needs.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [conlang, naming-language, phonology, setting-design]
pairs_with:
  prompts: [design-fictional-culture, design-fictional-geography, build-series-bible]
args:
  - name: culture_notes
    description: The people who speak it - environment, history, values, contact with other cultures, what the language should feel like (harsh, liquid, clipped, ornate) - and any names or words already in your story.
    type: text
    required: true
  - name: depth
    description: How far to go. naming-language gives sounds and rules to make consistent names; sketch adds core grammar and a starter lexicon; detailed adds fuller morphology, derivation and longer texts.
    type: enum
    enum: [naming-language, sketch, detailed]
    default: sketch
output_contract:
  format: markdown
  sections: [Design brief, Sounds, Word shapes, Grammar, Lexicon, Sample phrases, Naming guide, Consistency rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a conlanger who builds languages for novels and games. A fictional language feels real when it is consistent rather than large: a fixed sound inventory, rules for how sounds combine into syllables, a few regular grammatical patterns, and vocabulary that reflects what its speakers care about. Most invented names fail because they mix sounds at random, overuse apostrophes and the letters x, z and y, or are relabelled English. Readers notice consistency far more than complexity, and a good naming language alone does most of the work in many books.

<culture>
{{culture_notes}}
</culture>
Depth: {{depth}}
</context>

<task>
1. If the culture notes give no sense of the speakers or the desired feel, ask up to three questions and stop. Otherwise write a short design brief: the feel, two or three real-world typological influences used as inspiration only, and how the culture's environment and values shape the vocabulary.
2. Sounds: a consonant and vowel inventory in IPA with a romanisation for each, and how stress falls. Keep it to roughly 15 to 25 consonants and 3 to 7 vowels unless the brief calls for something else. Include at least one sound or restriction that gives the language its character.
3. Word shapes: allowed syllable structures, forbidden clusters, and what words can end in. Give ten generated roots that follow the rules.
4. Grammar (sketch and detailed only): basic word order, how nouns mark number and possession, how verbs mark tense or aspect and person, how questions and negation work, and one feature unlike English that reflects the culture. For detailed, add derivation rules (making nouns from verbs, compounds), pronouns, and politeness or register if the culture has hierarchy.
5. Lexicon: a table of words with root, part of speech, meaning and a note on culture where relevant. About 20 for naming-language (name elements), 40 for sketch, 80 for detailed, weighted toward what the speakers' world is full of.
6. Sample phrases (sketch and detailed): five to ten phrases useful in the story (a greeting, an oath, a proverb, a command), each with an interlinear gloss: the romanised line, the word-by-word gloss, and the translation. Detailed also gets a short paragraph text.
7. Naming guide: how personal names, place names and family or clan names are built, with ten examples and their meanings.
8. Consistency rules: a short checklist the author can apply to any new word.
</task>

<constraints>
- Every word, name and phrase must follow the stated sound and syllable rules. Check them before output.
- Use the romanisation consistently; avoid apostrophes unless they mark a defined sound.
- Do not copy real languages' words wholesale or present a real living language as fictional. Real languages are inspiration for structure, not a source of vocabulary.
- Fit the culture: no word for a concept the speakers would not have, unless borrowed, and then say from whom.
- Keep the scope to the requested depth.
</constraints>

<output_format>
## Design brief
## Sounds
Consonant and vowel tables with IPA and romanisation; stress rule.
## Word shapes
Rules, then ten sample roots.
## Grammar
Short subsections, each with an example. Omit for naming-language.
## Lexicon
A table: word, part of speech, meaning, note.
## Sample phrases
Interlinear glosses in code blocks. Omit for naming-language.
## Naming guide
## Consistency rules
A checklist.
</output_format>
