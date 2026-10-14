---
schema: 1
id: prioritize-reading-list
kind: prompt
title: Prioritise a pile of papers for your research question
description: Ranks a pile of papers or abstracts by relevance to the user's research question and evidence signals into read closely, skim, cite only and drop, with a reason for each.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher, student]
requires: [none]
inputs: [document, notes]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [papers, reading-triage, relevance, thesis]
pairs_with:
  prompts: [summarize-paper, build-literature-matrix, screen-studies]
  personas: [research-librarian]
args:
  - name: research_question
    description: The question or chapter aim the reading serves, for example "Does peer tutoring improve maths attainment in secondary schools?"
    type: text
    required: true
  - name: papers
    description: The pile, one item per entry with title, authors, year, venue and abstract where you have them. Titles alone give weaker rankings.
    type: text
    required: true
  - name: use
    description: What the reading is for, which changes what counts as relevant.
    type: enum
    enum: [thesis-chapter, journal-article, assignment, grant-background, keeping-up]
    default: thesis-chapter
output_contract:
  format: markdown
  sections: [Ranking, Read closely, Notes on the pile, What seems missing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a first search, most researchers have far more papers than time. Reading in download order wastes days on tangential or weak papers while the two that matter wait. Experienced readers triage first, on two axes. Relevance: how closely the paper's population, setting, variables and outcome match the question, and what role it would play (core evidence, method model, theory source, counterpoint, background statistic). Evidence weight: design strength for the kind of claim, sample, recency, whether it is a review that covers many others, and warning signs such as a doubtful venue or a retraction. Citation counts and journal prestige are weak proxies and favour old papers. This is reading triage for a researcher, not the formal eligibility screening of a systematic review, which needs pre-set criteria and two reviewers.
</context>

<task>
Prioritise these papers for the research question below. Use: {{use}}.
<research_question>
{{research_question}}
</research_question>
<papers>
{{papers}}
</papers>

1. Give each paper a short ID (first author and year, or P1, P2…) and use it throughout.
2. Judge relevance from what the text shows: match on population, setting, variables and outcome, and the role the paper could play.
3. Judge evidence weight from the design and sample as described, recency, and whether it is a review or a primary study. Treat a review covering most of the pile as a reason to move some primary studies down.
4. Place each paper in one tier: read closely (core to the argument), skim (useful for one section, method or number), cite only (background fact or a standard reference, no need to read in full now), or drop (off-topic or superseded). Give one line of reason.
5. Order the "read closely" tier and suggest a reading sequence (reviews first, then the strongest and most directly relevant primary studies).
6. Flag duplicates, preprints with a later published version, and items whose venue or claims look like they need checking.
7. Say what kinds of papers seem missing from the pile given the question (for example no studies in low-income settings, no qualitative work, nothing after 2020).
</task>

<constraints>
- Rank only from the text provided. Where a paper has only a title, say so and rank it provisionally.
- Do not rank by citation count or journal prestige alone, and do not use remembered knowledge of a paper to fill in a missing abstract.
- You cannot check retraction status or journal legitimacy; say which items to check and how (the publisher page, a retraction database, the journal's indexing).
- If the user's use is a systematic review, say that formal eligibility screening needs pre-set criteria and two independent reviewers, and that this ranking is not a substitute.
- Keep reasons to one line; this is triage, not appraisal.
</constraints>

<output_format>
## Ranking
Table: ID | title (short) | tier | role | reason.
## Read closely
Numbered reading order with one line on what to look for in each.
## Notes on the pile
Bullets: duplicates, versions, items to check.
## What seems missing
Two to four bullets.
</output_format>
