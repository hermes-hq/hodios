---
schema: 1
id: apply-title-case-to-headings
kind: prompt
title: Apply title case to headings
description: Converts headings and titles to AP, Chicago, APA or MLA title case or to sentence case, flags the words each style treats differently, and keeps names, acronyms and code intact.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, student, content-creator]
requires: [none]
inputs: [text, document]
output: [table, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [title-case, sentence-case, headings, capitalisation, style-guides]
pairs_with:
  prompts: [copyedit-to-style-guide, build-style-sheet, format-citations]
args:
  - name: headings
    description: The headings or titles, one per line.
    type: text
    required: true
  - name: style
    description: Target style. ap, chicago, apa and mla are title case styles; sentence capitalises only the first word and proper nouns.
    type: enum
    enum: [ap, chicago, apa, mla, sentence]
    default: chicago
output_contract:
  format: markdown
  sections: [Converted headings, Words decided by rule, Check these]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Title case styles agree on the basics (capitalise the first and last words and all nouns, pronouns, verbs, adjectives and adverbs; lowercase articles) and disagree on the small words, which is where headings go wrong:
- AP capitalises every word of four or more letters, including prepositions and conjunctions such as "With", "From" and "That"; shorter articles, conjunctions and prepositions are lowercase unless first or last.
- Chicago lowercases prepositions whatever their length ("through", "between"), lowercases the coordinating conjunctions and, but, for, or and nor, and lowercases "to" and "as" in any use, but capitalises subordinating conjunctions such as "If", "Because" and "That". A word that is a preposition in one heading can be an adverb or part of a phrasal verb in another ("Set Up", "Log In") and is then capitalised.
- APA capitalises major words and every word of four or more letters, and lowercases only short (three letters or fewer) conjunctions, articles and prepositions. Short verbs and pronouns such as "Is", "Be", "It" and "Its" are capitalised in every title case style, a common miss.
- MLA lowercases articles, all prepositions, coordinating conjunctions and the "to" of infinitives.
- Hyphenated compounds differ by style (for example "Long-Term" in most title case; Chicago lowercases the second part after prefixes such as "anti" or "pre" unless it is a proper noun), and the first word after a colon in a heading is capitalised.
- Sentence case capitalises only the first word, proper nouns and the first word after a colon in some styles (APA does this for subtitles).
Brand names with unusual capitals (iPhone, eBay), acronyms, code identifiers and file names keep their own form everywhere.

Style: {{style}}
<headings>
{{headings}}
</headings>
</context>

<task>
1. If no headings are given, ask for them and stop.
2. Convert each heading to {{style}}. Decide each small word by its function in that heading (preposition, adverb, particle of a phrasal verb, conjunction type).
3. Keep proper nouns, brand capitalisation, acronyms, code, quoted titles of other works if the user indicates they are fixed, and numbers as they are.
4. List every word whose case was decided by a style-specific rule, with the rule, so the writer can apply it to the next heading.
5. Flag headings where the case depends on a meaning you cannot be sure of (is "Up" an adverb here?), and headings that look inconsistent with the others for reasons other than case (punctuation at the end, numbering).
</task>

<constraints>
- Change only capitalisation; do not reword headings.
- When the user's organisation might follow a variant (for example a house style that capitalises "With"), say so once rather than mixing rules.
- Do not quote style-guide section numbers.
</constraints>

<output_format>
## Converted headings
Table: Original | Converted.
## Words decided by rule
Bullets: word, the decision, the rule in one line.
## Check these
Bullets: uncertain or inconsistent headings. "None" if none.
</output_format>
