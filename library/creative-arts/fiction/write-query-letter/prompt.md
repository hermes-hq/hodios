---
schema: 1
id: write-query-letter
kind: prompt
title: Write a query letter and synopsis
description: Writes a literary agent query letter with hook, story paragraphs, comparable titles, word count and bio, plus a one-page synopsis that reveals the ending. Use when seeking representation for a novel.
category: fiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [text, document]
output: [message, summary, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [query-letter, literary-agents, synopsis, comp-titles]
pairs_with:
  prompts: [write-logline-and-synopsis, write-book-blurb, critique-fiction-draft]
  personas: [fiction-writing-mentor]
args:
  - name: manuscript_summary
    description: The whole story including the ending, the protagonist, what they want, what stands in the way and the stakes. Paste existing query drafts or a synopsis if you have them, plus any comp titles you are considering.
    type: text
    required: true
  - name: genre
    description: Genre and age category, e.g. "adult literary fiction", "upmarket book club fiction", "YA fantasy", "adult romantic suspense".
    type: string
    required: true
  - name: word_count
    description: Manuscript word count. Leave blank if unknown; the letter will use a placeholder.
    type: number
  - name: bio
    description: Relevant facts about you, such as publications, awards, expertise that informs the book, writing programmes, or where you live. Leave blank for a short neutral bio placeholder.
    type: text
output_contract:
  format: markdown
  sections: [Questions, Query letter, Synopsis, Checks, Options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A literary agent decides on a query in under a minute. The query has one job: make the agent want to read the pages. It does that with a specific protagonist, a clear inciting incident, a concrete choice and stakes, a voice that matches the book, and the business facts an agent checks (genre, age category, word count, comps). Most queries fail by summarising the whole plot, opening with rhetorical questions or theme statements, naming too many characters, or comparing the book to mega-bestsellers. The synopsis is the opposite document: it tells the entire story, ending included, so the agent can see that the plot holds together.
</context>

<task>
Write a query letter and a one-page synopsis for this {{genre}} novel.

<manuscript>
{{manuscript_summary}}
</manuscript>

Word count: {{word_count}}
Author bio material: {{bio}}

1. **Questions:** if the summary does not say who the protagonist is, what they want, what forces the story to start, what stands in the way, what they stand to lose, or how the book ends, ask for exactly what is missing (at most five questions) and stop. Do not invent plot to fill these gaps.
2. **Query letter** (250 to 350 words for the whole letter, excluding the greeting and sign-off):
   - A personalisation line placeholder: `[Why this agent: a book they represent, a wish-list item, or an interview remark]`.
   - **Hook paragraph and story paragraphs** (about 150 to 250 words, present tense, third person even if the book is in first person, unless the voice is the selling point): the protagonist by name with one defining trait, their situation, the inciting incident, the goal, the main obstacle or antagonist, the escalating complication, and the stakes framed as a choice. Name no more than three characters. End on the central dilemma, not the resolution. Match the book's tone (wry, eerie, tender, propulsive).
   - **Business paragraph:** title in capitals, genre and age category, word count rounded to the nearest thousand (written like "92,000 words"; if no word count was given, write `[word count]` and list it in Checks), and two comparable titles.
   - **Bio:** two to three sentences using only the facts provided. If nothing relevant was provided, write one neutral sentence and a bracketed placeholder.
   - A short, professional close.
3. **Comparable titles:** prefer comps the author supplied. If you suggest any, choose books in the same genre and age category, published in roughly the last five years, that sold well but are not huge outliers, and frame each comp by what the book shares with it (tone, premise, readership). Mark every suggested comp "verify: publication year and fit" because you may be wrong about dates or details. Never invent a title or author.
4. **Word count check:** if {{word_count}} is far outside the usual range for the genre and age category (for example a debut adult fantasy well above about 150,000 words, or a middle-grade novel above about 60,000), say so in Checks as a common agent concern, without inventing statistics.
5. **Synopsis** (one page, about 400 to 600 words, present tense, third person): the protagonist's starting situation and want, the inciting incident, the major turning points in order, the midpoint, the crisis, the climax and the ending, including twists. Use capitals the first time each major character is named. Show cause and effect between events and the protagonist's emotional arc. No teaser questions.
6. **Checks:** confirm the query reveals no ending, names at most three characters, has no rhetorical questions, and states genre, age category and word count; list any facts you had to leave as placeholders.
7. **Options:** two alternative opening hook lines and one alternative title idea only if the current title is generic.
</task>

<constraints>
- Use only facts from the manuscript summary and bio. Do not invent awards, publications, credentials, sales figures or blurbs.
- No rhetorical questions, no "In a world where", no statements about how the book will make readers feel, no claims that it will be a bestseller or a film.
- Do not compare the book to all-time classics or the biggest franchise bestsellers.
- Keep standard formatting: plain paragraphs, no images or colours, suitable for pasting into an email or query form.
</constraints>

<output_format>
## Questions
Only if information is missing; otherwise "None".
## Query letter
The full letter, ready to paste, with bracketed placeholders.
## Synopsis
## Checks
A short list.
## Options
</output_format>
