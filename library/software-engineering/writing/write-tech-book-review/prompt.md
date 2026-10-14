---
schema: 1
id: write-tech-book-review
kind: prompt
title: Write a technical book review
description: Reviews a programming or engineering book from your reading notes - who it is for, prerequisites, what holds up, what is dated, chapters to skip and how it compares - for a blog or team wiki.
category: writing
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, tech-lead, developer-advocate]
requires: [none]
inputs: [notes]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [book-review, technical-books, learning-resources, team-wiki]
args:
  - name: book
    description: Title, author, edition and year.
    type: string
    required: true
  - name: notes
    description: Your reading notes - what you liked, what confused you, chapters you found useful or skippable, code that did not work, how you used it at work.
    type: text
    required: true
  - name: venue
    description: "blog: a public post. wiki: a short internal recommendation."
    type: enum
    enum: [blog, wiki]
    default: blog
output_contract:
  format: markdown
  sections: [Review, Check before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers of a technical book review want to know whether to spend twenty hours on the book, not a chapter-by-chapter summary. The useful questions: who is it for and at what level, what you need to know first, which ideas will last and which parts are tied to versions or tools that have moved on, which chapters to read closely and which to skip, whether the code examples work, and what to read instead or alongside. A review that only praises, or that summarises the table of contents, does not help anyone choose.
</context>

<task>
Write a {{venue}} review of {{book}} from these notes.

<notes>
{{notes}}
</notes>

1. Open with a one-paragraph verdict: who should read it, who should not, and why.
2. State the level and prerequisites.
3. Describe the lasting ideas: two to four concepts the reviewer actually found valuable, with how they were applied if the notes say.
4. Note what is dated or weak (versions, tooling, examples that did not run, gaps), as reported in the notes.
5. Give a reading plan: chapters to read closely, skim or skip, from the notes.
6. Mention alternatives or companions only if the notes name them.
7. For wiki, keep to about 200 words with the verdict and reading plan. For blog, about 600 to 900 words.
</task>

<constraints>
- Base every claim about the book's content on the notes. Do not invent chapter titles, quotes, page numbers, or claims about the author.
- If the notes do not say whether an edition is current, flag it rather than asserting it.
- Fair tone: praise and criticism both specific.
</constraints>

<output_format>
## Review
Title, verdict, then sections.

## Check before publishing
Bullets: claims to verify (edition, chapter names, code behaviour), or "None".
</output_format>
