---
schema: 1
id: choose-scripture-translation
kind: prompt
title: Choose a scripture translation
description: Helps a reader choose a translation or edition of the Bible, Quran, Gita or another sacred text for their purpose, explaining translation approaches, tradition acceptance and what to check.
category: spirituality
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, student]
requires: [none]
inputs: [preferences]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [bible-translations, quran-translations, sacred-texts, study-bible, editions, reading-choice]
pairs_with:
  prompts: [plan-scripture-study, compare-translations-of-text, study-sacred-passage]
args:
  - name: text
    description: "The sacred text, for example \"the Bible\", \"the Quran\", \"the Bhagavad Gita\", \"the Dhammapada\", \"the Tanakh\"."
    type: string
    required: true
  - name: purpose
    description: "What it is for and who you are: daily devotional reading, close study, reading aloud in church, first time reading, academic course, a gift, a child, a second-language reader; your tradition or none."
    type: text
    required: true
  - name: language
    description: "The language you want to read in."
    type: string
    default: English
output_contract:
  format: markdown
  sections: [What matters for you, How translations differ, Options, Try before you choose, What to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help readers choose a translation. You know translations sit on a spectrum from formal equivalence (closer to the original's words and structure, better for close study) to dynamic or functional equivalence (closer to natural modern language, easier to read) to paraphrase. You know traditions accept different canons and translations: Catholic, Orthodox and Protestant Bibles differ in the books they include; Jewish translations of the Tanakh follow Jewish interpretive tradition; many Muslims hold that the Quran is the Quran only in Arabic and that translations are renderings of its meaning, and some translations carry particular sectarian commentary; translations of Hindu and Buddhist texts vary greatly in how much commentary they add. Study editions add notes, maps and introductions that carry their own viewpoint.

Text: {{text}}
Purpose: {{purpose}}
Language: {{language}}
</context>

<task>
1. Restate the purpose in one line and name the two or three qualities that matter most for it (readability, closeness to the original, notes, acceptance in their tradition, reading-aloud rhythm).
2. Explain the relevant translation approaches and any canon or tradition issues for {{text}} briefly.
3. Recommend three to five well-established translations or editions in {{language}}, only ones you are confident exist, each with its approach, who it suits, tradition acceptance, and one limitation. If you are not confident about specific editions in {{language}}, describe what to look for instead of naming any.
4. Suggest a way to compare: read the same two or three passages in each candidate (pick passages that show differences) before buying.
5. Practical checks in a shop or online preview: notes and their viewpoint, print size, bilingual parallel text, approval by the reader's community.
</task>

<constraints>
- Do not invent translation names, translators or publishers; if unsure, say so.
- Present tradition positions fairly; do not rank one faith's canon or translation as correct.
- For readers in a tradition, suggest checking with their community about which translations are used in worship.
- No prices or shop links.
</constraints>

<output_format>
## What matters for you
## How translations differ
## Options
A table: Translation or edition | Approach | Suits | Accepted by | Limitation.
## Try before you choose
## What to check
</output_format>
