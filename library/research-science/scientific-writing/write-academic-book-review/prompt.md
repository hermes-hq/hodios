---
schema: 1
id: write-academic-book-review
kind: prompt
title: Write a scholarly book review for a journal
description: Writes a scholarly book review for an academic journal that summarises the book's argument, assesses its evidence and contribution, and places it in the field, within the journal's word limit.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-review, scholarly-review, humanities, social-sciences-writing, academic-publishing]
pairs_with:
  prompts: [summarize-paper, write-letter-on-published-paper]
  personas: [academic-writing-coach]
args:
  - name: book
    description: Full bibliographic details, your reading notes chapter by chapter, the author's main argument in your words, passages you want to quote with page numbers, and your judgements of strengths and weaknesses.
    type: text
    required: true
  - name: journal
    description: Optional. The journal, word limit (often 800 to 1,500 words) and house style for the review heading.
    type: string
output_contract:
  format: markdown
  sections: [Review, Judgement summary, Things to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Academic book reviews are short, commissioned pieces that editors expect to be fair, informative and evaluative. Readers want to know what the book argues, how it argues it (sources, method, scope), how it relates to existing scholarship, its strengths and limits, and who should read it. Book review editors complain most about reviews that are chapter-by-chapter summaries with one evaluative line at the end, reviews that critique the book the reviewer wished had been written, and harsh or personal tone. Good practice: open with the book's question and argument, summarise structure efficiently, evaluate against the book's own aims first and then the field's expectations, quote sparingly with page numbers, and close with a judgement of contribution and audience. Reviewers should disclose conflicts and must have read the book: a review cannot be written from the blurb.
</context>

<task>
Write a review of:
<book>
{{book}}
</book>
{{#journal}}
Journal: {{journal}}
{{/journal}}

1. Write the review heading in the journal's style or a standard one: author, title, place, publisher, year, pages, price and ISBN as supplied, with [MISSING] for gaps.
2. Open with the problem the book addresses and its central argument in two or three sentences.
3. Summarise the structure and method efficiently, grouping chapters where possible.
4. Evaluate: how well the evidence supports the argument, originality and contribution to the field, use of sources, clarity, and limitations, judged first against the book's stated aims.
5. Place the book in relation to the scholarship the reviewer names.
6. Close with who should read it and an overall judgement.
7. Keep to the word limit and give the count.
</task>

<constraints>
- Base everything on the reviewer's notes. Do not describe chapters, quote passages or attribute claims that are not in the notes; ask for more notes if coverage is thin.
- Quote only supplied passages, exactly, with their page numbers.
- Critique the book's arguments fairly and specifically; no personal remarks about the author.
- If the notes suggest the reviewer has not read the book (only a blurb or table of contents), say a review cannot be written yet.
</constraints>

<output_format>
## Review
Heading, then the review, then the word count.
## Judgement summary
Three bullets: main contribution, main limitation, intended readership.
## Things to check
Page numbers, bibliographic details and any claims to verify against the book.
</output_format>
