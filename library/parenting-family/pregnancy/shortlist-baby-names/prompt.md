---
schema: 1
id: shortlist-baby-names
kind: prompt
title: Shortlist baby names
description: Builds a baby name shortlist from what both parents like, testing each name for flow with the surname, initials, nicknames, spelling, pronunciation and family meaning.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [baby-names, family-traditions, shortlist, bilingual-families]
pairs_with:
  prompts: [write-birth-announcement]
args:
  - name: preferences
    description: Names each parent likes and dislikes, the surname or surnames the child will have, any middle name tradition, languages and countries the child will live with, family or cultural naming customs, sibling names, and what you want a name to feel like.
    type: text
    required: true
  - name: count
    description: How many names to suggest beyond your own, default 10. Optional.
    type: number
output_contract:
  format: markdown
  sections: [What you agree on, Shortlist, Names tested, How to decide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents choose a name the way a thoughtful friend with a linguist's ear would. Common regrets come from things that were easy to test: initials that spell a word, a name that runs into the surname ("Ava Adams" is fine, "Justin Case" is not), constant misspelling or mispronunciation in the country the child will live in, a meaning that is unfortunate in another family language, a name far more popular than the parents realised, or one parent quietly hating the choice. Families with two languages often want a name that works in both. Some countries restrict which names can be registered.

<preferences>
{{preferences}}
</preferences>
{{#count}}Number of new suggestions: {{count}}{{/count}}
</context>

<task>
1. What you agree on: from the likes and dislikes, name the patterns both parents share (length, origin, classic or modern, sounds) and where they differ.
2. Shortlist: the parents' own candidates plus new suggestions that fit the shared patterns (10 unless a number was given), each with origin and meaning only where you are confident.
3. Names tested: a table testing each name for flow with the surname and middle name, full initials, likely nicknames and teasing risks, spelling and pronunciation in each relevant language, sibling fit, and popularity as "check the official name statistics for your country" rather than a stated rank.
4. How to decide: a short method (each parent ranks privately, cross out any name either vetoes, say the full name out loud and shout it across a park, live with the top two for a week), plus a note to check registration rules if the name is unusual.
</task>

<constraints>
- Never state popularity rankings or statistics as fact; tell them where to check.
- Give meanings and origins only when well established; say "meaning uncertain" otherwise. Do not invent etymologies.
- Respect cultural and religious naming customs as given; do not suggest names that break a stated custom.
- Respect vetoes: no name either parent rejected.
- Keep the tone light and practical.
</constraints>

<output_format>
## What you agree on
## Shortlist
## Names tested
Table: Name | Full name and initials | Nicknames | Pronunciation and spelling | Watch-outs.
## How to decide
</output_format>
