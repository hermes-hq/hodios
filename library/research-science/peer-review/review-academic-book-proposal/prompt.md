---
schema: 1
id: review-academic-book-proposal
kind: prompt
title: Review an academic book proposal for a press
description: Writes a reader's report on an academic book proposal for a university or scholarly press, judging contribution, argument, structure, audience, competing titles and readiness, with a recommendation.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
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
tags: [book-proposal, readers-report, academic-publishing, monograph]
pairs_with:
  prompts: [write-peer-review, turn-thesis-chapter-into-paper]
  personas: [peer-reviewer]
args:
  - name: proposal
    description: The proposal, with the synopsis, chapter outline, sample chapters if sent, competing titles and author information.
    type: text
    required: true
  - name: press_questions
    description: The questions the press asked readers to answer, pasted, so the report follows them.
    type: text
  - name: series_or_list
    description: The series or list the book is proposed for, and the press's stated audience.
    type: string
output_contract:
  format: markdown
  sections: [Summary of the project, Contribution and argument, Structure and chapters, Audience and market, Sample chapter, Recommendation, Suggestions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Presses commission readers' reports to answer questions a journal referee rarely faces: is there a book here, rather than three articles; is it a monograph, a textbook or a trade-crossover book, and does the proposal know which; who will buy it (libraries, course adoption, general readers); does it compete with or complement existing titles; and can this author deliver it in the length and time promised. First-book proposals often read like revised dissertations: heavy literature review, defensive framing, chapters that do not build an argument, and an audience of "scholars and general readers" that means neither. Editors want a clear recommendation and specific changes the author can make to the proposal or manuscript; they also read reports to the board, so judgement must be stated, not implied.
</context>

<task>
Write a reader's report on this proposal{{#series_or_list}} for {{series_or_list}}{{/series_or_list}}.
<proposal>
{{proposal}}
</proposal>
{{#press_questions}}
Answer the press's questions:
<press_questions>
{{press_questions}}
</press_questions>
{{/press_questions}}

1. Summarise the book's argument, scope and planned form in your own words, and say what kind of book it is (research monograph, textbook, edited volume, crossover).
2. Judge the contribution: what the book adds beyond the author's articles or thesis and beyond the competing titles listed, and whether the central argument is clear and sustained.
3. Judge the structure: whether chapters build the argument, overlap, or include a chapter that belongs elsewhere; balance of length; and whether the planned length is realistic.
4. Judge audience and market: who will read and buy it, course-adoption potential, and whether the competing titles are the right ones.
5. If a sample chapter is included, judge the writing, evidence and readiness of the manuscript for the audience.
6. Recommend: offer a contract, offer after revisions to the proposal, encourage resubmission, or decline, with the reasons.
7. List specific suggestions for the author, in priority order.
</task>

<constraints>
- Do not invent competing titles, authors or sales figures. If the proposal's competing-titles list looks incomplete, describe the kind of book that is missing and ask the author to check.
- Judge the proposal against its stated audience and the press's list; do not penalise a specialist monograph for not being a trade book.
- Be candid but constructive; the author may see the report.
- If the press questions are given, answer each explicitly and in order.
- Remind the reviewer that the proposal is confidential and to check the press's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary of the project
One paragraph.
## Contribution and argument
## Structure and chapters
## Audience and market
## Sample chapter
Or "No sample chapter provided".
## Recommendation
One line, then the deciding reasons.
## Suggestions for the author
Numbered, in priority order.
</output_format>
