---
schema: 1
id: turn-dissertation-into-trade-book
kind: prompt
title: Turn a dissertation into a trade book
description: Plans how to turn a PhD dissertation into a book for general readers, finding the story inside the research, restructuring around reader questions and listing what to cut, add and rewrite.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, researcher]
requires: [none]
inputs: [document, notes]
output: [plan, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dissertation, trade-book, popular-nonfiction, restructuring, general-readers]
pairs_with:
  prompts: [outline-nonfiction-book, write-nonfiction-book-proposal, validate-nonfiction-book-idea]
args:
  - name: dissertation_summary
    description: The abstract, the table of contents, the main findings, and the most striking cases, people or moments in the research.
    type: text
    required: true
  - name: target
    description: trade (general readers, bookshop) or crossover (serious general readers and students, often a university press trade list).
    type: enum
    enum: [trade, crossover]
    default: trade
output_contract:
  format: markdown
  sections: [The book inside the dissertation, Reader and promise, New structure, Cut add rewrite, Rights and prior publication, First steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help academics turn a dissertation into a book for non-specialists. A dissertation is organised to prove competence to examiners: literature review first, methods, then findings, with every claim hedged. A trade book is organised around a reader's question and a story: it opens on a person or event, makes one big argument, puts methods and the scholarly debate in notes or a short passage, and uses scenes and examples to carry ideas. Most of the literature review goes; the findings become the spine; new material is often needed (broader context, present-day stakes, characters). Experienced editors say the hardest step is finding the one question a general reader would pay to have answered.

<dissertation_summary>
{{dissertation_summary}}
</dissertation_summary>
Target: {{target}}.
</context>

<task>
1. Find the book inside: two or three candidate central questions a general reader would care about, each with the finding that answers it and the strongest story or case from the research. Recommend one.
2. Define the reader and the promise in one sentence each.
3. Propose a new structure: chapters organised by the reader's journey (question, stakes, discovery, consequences), each with the dissertation material it draws on and the new material it needs.
4. Cut, add, rewrite: what to cut (literature review, methodology detail, hedging), what to move to notes or an appendix, what to add (context, present-day relevance, scenes, people), and how to rewrite the voice (plain claims with honest uncertainty instead of reflexive hedging).
5. Rights and prior publication: remind the author to check any agreements on the deposited dissertation and articles already published from it, and the policies of the presses they approach.
6. First steps: the first three things to do this month.
</task>

<constraints>
- Use only findings and cases in the summary. Do not invent results, people or events to make the story stronger; mark where new research is needed.
- Do not overstate findings for drama; keep the evidence's real strength.
- Do not give legal advice on rights; point to the agreements and the university or publisher to check.
- If the summary has no clear finding or case, ask for them.
</constraints>

<output_format>
## The book inside the dissertation
Candidates with recommendation.

## Reader and promise

## New structure
Table: Chapter | Reader question | Dissertation material | New material needed.

## Cut add rewrite
Three lists.

## Rights and prior publication

## First steps
</output_format>
