---
schema: 1
id: review-academic-book-manuscript
kind: prompt
title: Write a reader's report on an academic book manuscript
description: Writes a press reader's report on a complete academic book manuscript, judging the argument across chapters, scholarship, audience and length, with chapter-level revisions and a recommendation.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
subject: [history, literature, philosophy, social-sciences]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [readers-report, monographs, university-press, book-manuscript, scholarly-publishing]
pairs_with:
  prompts: [review-academic-book-proposal, review-humanities-article, review-thesis-draft]
  personas: [peer-reviewer]
args:
  - name: manuscript
    description: The manuscript or a substantial part of it, with the table of contents, introduction, conclusion and chapter summaries if the whole text is too long to paste.
    type: text
    required: true
  - name: press_questions
    description: Optional. The press's questions for readers, the intended series and audience, and the contracted length.
    type: text
output_contract:
  format: markdown
  sections: [Summary of the book, Argument and contribution, Chapter by chapter, Scholarship and sources, "Audience, length and readability", Recommendation, Revisions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A report on a full manuscript is different from a proposal report: the question is no longer whether there is a book here, but whether this book delivers it, and what the author must change before it goes to the press board. Editors use the report in two ways: to decide (often for a faculty board that reads the report, not the book) and to guide revision. The weaknesses experienced readers find in full manuscripts are an argument stated in the introduction that disappears in the middle chapters, chapters that read as standalone articles with repeated set-up, a conclusion that summarises rather than draws the threads together, dissertation residue (long literature reviews, defensive hedging, signposting), uneven depth between chapters, a length well over contract, missing engagement with a major recent work in the field, and a stated audience the prose does not serve. A useful report separates must-fix problems from suggestions, is specific to chapters and pages, and states a clear recommendation the board can act on.
</context>

<task>
Write a reader's report on this manuscript.
<manuscript>
{{manuscript}}
</manuscript>
{{#press_questions}}
<press_questions>
{{press_questions}}
</press_questions>
{{/press_questions}}

1. Summarise the book's argument and structure in a paragraph a press board could read without the manuscript.
2. Judge the argument and contribution: whether a single argument runs through the whole, whether it is original and significant for the field, and whether the conclusion earns it.
3. Go chapter by chapter: each chapter's job in the argument, its main strength, and what must change (cut, merge, reorder, deepen, or connect back to the argument).
4. Judge scholarship and sources: use of primary material, engagement with the main debates, gaps in the literature (described, not invented titles), and accuracy concerns to check.
5. Judge audience, length and readability: fit with the stated audience and series, dissertation residue, repetition, and where to cut if over length.
6. Answer any specific questions from the press.
7. Recommend: publish as is, publish after minor revisions, revise and resubmit, or decline, and list the revisions in priority order.
</task>

<constraints>
- If only part of the manuscript was supplied, say which parts you read and limit judgements to those.
- Point to chapters, sections and pages; avoid general praise or criticism without examples.
- Describe missing scholarship by debate, author group or period; never name specific books or articles you cannot verify.
- Do not rewrite the book. Suggest changes the author can make.
- Write about the work, not the author, and remind the reader at the top that the manuscript is confidential and that the press's AI-use policy should be checked.
</constraints>

<output_format>
One reminder line, then:
## Summary of the book
## Argument and contribution
## Chapter by chapter
One short paragraph per chapter.
## Scholarship and sources
## Audience, length and readability
## Recommendation
One line, then the reasons a board would need.
## Revisions for the author
Numbered, marked essential or suggested.
</output_format>
