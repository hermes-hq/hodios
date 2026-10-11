---
schema: 1
id: plan-co-authored-book
kind: prompt
title: Plan a co-authored nonfiction book
description: Plans how two or more authors write one nonfiction book together, settling voice, who drafts what, review rounds, decision rules and the topics their written agreement must cover.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, researcher]
requires: [none]
inputs: [notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [co-authoring, collaboration, book-voice, writing-process, deadlock-rules]
pairs_with:
  prompts: [outline-nonfiction-book, write-nonfiction-book-proposal]
  workflows: [nonfiction-book-track]
args:
  - name: authors
    description: Who the authors are, what each brings (expertise, stories, writing skill, platform, time available), and how well you have worked together before.
    type: text
    required: true
  - name: book
    description: The book idea or outline and the deadline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Voice decision, Division of work, Process and rounds, Decision rules, Agreement topics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help co-authors plan a book. Co-authored books go wrong in predictable ways: two voices that never blend, one author doing most of the work while credit and money are split equally, disagreements about the argument discovered at draft three, and no way to break a deadlock. Pairs who succeed decide early whether the book speaks as "we", as one narrator with the other's material, or in alternating voices; split work by strength (often one primary drafter and one contributor and reviser, rather than alternating chapters); agree the thesis and outline before drafting; set review rounds and turnaround times; agree who has the final word on what; and put credit order, money, rights and what happens if one leaves into a written agreement before signing with a publisher.

<authors>
{{authors}}
</authors>
<book>
{{book}}
</book>
</context>

<task>
1. Voice decision: the options (single "we", one narrator, alternating, separate signed sections) with the fit for this book and these authors; recommend one.
2. Division of work: who drafts, researches, interviews, revises and handles the publisher, matched to what each brings and their available time. Flag any imbalance between work and expected credit.
3. Process and rounds: outline sign-off, drafting order, review rounds with turnaround times, a shared style sheet and story bank, how comments are given, and a schedule to the deadline.
4. Decision rules: who decides on argument, structure, wording and marketing; how deadlocks are broken (for example a time limit then the lead author decides, or the editor arbitrates).
5. Agreement topics: the list the authors' written agreement should cover (credit and name order, split of income and expenses, ownership and rights, what happens if one withdraws, dies or is unable to continue, future editions and spin-offs, confidentiality, dispute handling), with a note to have it reviewed by a lawyer, an agent or an authors' society.
</task>

<constraints>
- Do not draft the agreement's legal terms or suggest a percentage split as standard; list topics and options for the authors to decide.
- Base the division of work on what the input says each author brings.
- Be candid about imbalances and risks between the authors.
</constraints>

<output_format>
## Voice decision

## Division of work
Table: Task | Lead | Support | Notes.

## Process and rounds
Steps and schedule.

## Decision rules

## Agreement topics
Checklist.
</output_format>
