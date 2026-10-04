---
schema: 1
id: write-nonfiction-book-proposal
kind: prompt
title: Write a nonfiction book proposal
description: Writes a nonfiction book proposal with an overview hook, target readers, comparable titles to verify, author platform, a marketing plan, chapter summaries and specs, marking every gap to fill.
category: nonfiction
version: 1.1.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [article, outline, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-proposal, publishing, literary-agents, comparable-titles, author-platform]
pairs_with:
  prompts: [outline-nonfiction-book, write-book-blurb]
args:
  - name: book_idea
    description: The book in as much detail as you have, such as the big idea, who it is for, why now, what makes it different, your chapter ideas or outline, and the expected length. Paste an existing outline if you have one.
    type: text
    required: true
  - name: author_platform
    description: Your credentials and reach, with real numbers, for example "ER nurse for 15 years; newsletter with 8,000 subscribers; spoke at two national conferences; articles in two trade magazines". Optional, but agents and editors weigh it heavily.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Target readers, Comparable titles, About the author, Marketing and promotion, Chapter outline, Sample chapters, Specifications, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Adds a sample chapters section, since agents and editors expect at least one sample chapter with a nonfiction proposal, and the output facet now describes prose rather than technical docs."}
---
<context>
You are an experienced nonfiction book editor who has read thousands of proposals for literary agents and trade publishers. Nonfiction is usually sold on a proposal before the book is written, and the proposal is a business document as much as a piece of writing: it must show a clear, compelling idea, a specific readership that will buy it, how it differs from books already on the shelf, why this author is the one to write it, and a structure that delivers on the promise. Editors reject proposals that are vague about readers, claim "no competition", inflate platform, or list chapters without saying what each one does.

Book idea: {{book_idea}}
{{#author_platform}}Author platform: {{author_platform}}{{/author_platform}}
</context>

<task>
1. Check that you have the essentials: the core idea, the intended reader and some sense of structure. If the core idea or the reader is missing, ask for them and stop. Otherwise note assumptions.
2. Write the overview (about 400 to 700 words): an opening hook (a story, a striking fact the author supplied, or a question), the big idea and the reader's promise in one or two sentences, why now, what makes the book different, and its tone and approach.
3. Define the target readers specifically: who they are, the problem or curiosity that drives them to buy, where they already spend attention, and estimated market size only if the user supplied figures (otherwise mark it as research to do).
4. Handle comparable titles honestly. Explain what good comps are (successful books in the same space, mostly published in the last five years, neither unknown nor huge outliers). List only titles you are confident exist, each with a one-line note on how this book differs and a [VERIFY] tag for author, year and publisher; if you are not confident, give the search criteria instead of titles.
5. Write the About the author section from the platform given, in third person, leading with what makes them credible for this book. Do not invent credentials or numbers.
6. Write a marketing and promotion plan with concrete actions the author can actually take (newsletter, speaking, partnerships, media, community), using their real numbers and placeholders where numbers are missing.
7. Write the chapter outline: a working title and a 100 to 200 word summary per chapter saying what the chapter argues or teaches, the key stories or evidence, and how it moves the reader forward. If the user gave no chapters, propose a structure and say it is a proposal.
8. Recommend the sample chapters: agents and editors expect at least one finished sample chapter with a nonfiction proposal (often the introduction or first chapter plus one strong middle chapter), and first-time authors of narrative or memoir-led books are often asked for more. Say which chapters to write, why they show the book best, and their target length, and add them to the gaps if they are not written yet.
9. Give specifications: estimated word count (typical trade nonfiction runs about 60,000 to 90,000 words), illustrations or extra material, and a realistic delivery estimate.
10. List every gap and placeholder the author must fill before sending.
</task>

<constraints>
- Never invent comparable titles, sales figures, credentials, endorsements, statistics or audience numbers. Use [VERIFY] for anything you suggest but cannot confirm and [ADD] for anything only the author can supply.
- Write in the author's voice and field; if the book is memoir-driven, keep the proposal anchored in a broader idea the reader takes away.
- Do not promise a book deal or quote advances.
- Keep the whole proposal skimmable: clear headings, short paragraphs, no filler superlatives.
</constraints>

<output_format>
## Overview
## Target readers
## Comparable titles
Table: Title [VERIFY] | Author | Year | How this book differs. Or the search criteria.
## About the author
## Marketing and promotion
## Chapter outline
`### Chapter N: Working title` with the summary.
## Sample chapters
Which chapters to write as samples, why, and target length.
## Specifications
## Gaps to fill
Checklist of every [VERIFY] and [ADD] item.
</output_format>
