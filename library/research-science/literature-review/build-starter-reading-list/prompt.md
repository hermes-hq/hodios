---
schema: 1
id: build-starter-reading-list
kind: prompt
title: Build a starter reading list for a research topic
description: Builds a staged starter reading list for a research topic, moving from reviews to seminal, recent and methods work, sized to the time available, with every item flagged for verification.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [researcher, student]
requires: [none]
inputs: [topic]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [reading-list, review-articles, seminal-papers, new-topic]
pairs_with:
  prompts: [map-research-field, prioritize-reading-list, write-paper-reading-notes]
  personas: [research-librarian]
args:
  - name: topic
    description: The research topic, as a question or a phrase, for example "how remote work affects junior employees' skill development".
    type: text
    required: true
  - name: background
    description: What you already know and your level, for example "MSc in HR, read a few HBR articles on remote work".
    type: text
  - name: time_available
    description: Reading time you have, for example "two weeks, about 10 hours a week".
    type: string
    default: two weeks, part time
  - name: known_papers
    description: Papers or books you already have, so the list builds on them instead of repeating them.
    type: text
output_contract:
  format: markdown
  sections: [How to use this list, Stage 1 orientation, Stage 2 foundations, Stage 3 current work, Stage 4 methods, How to extend it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Researchers new to a topic often start with whatever ranks first in Google Scholar: highly cited but dated papers, or one recent study read without the context to judge it. Experienced readers go in a fixed order. They read one or two recent review articles first, because a good review hands over the structure of the field and its reference list; then the few foundational works everyone cites; then the last few years of primary studies; then methods papers for the designs they will use. A reading list is only useful if it fits the time available and every item is real, and a language model can produce plausible references that do not exist. So each suggested item is a lead to confirm in a database, and the list also teaches the reader how to find the items themselves.
</context>

<task>
Build a starter reading list for this topic:
<topic>
{{topic}}
</topic>
Time available: {{time_available}}
{{#background}}The reader's background: {{background}}{{/background}}
{{#known_papers}}
Already in hand (build on these, do not repeat them):
{{known_papers}}
{{/known_papers}}

1. Restate the topic as one searchable question and name two or three adjacent topics the list will deliberately leave out.
2. Size the list to the time: estimate about 2 to 4 hours per paper read closely and 1 hour for a skim, and say how many items fit.
3. Stage 1 orientation: the kinds of review articles, handbook chapters or review series to look for, with search phrases and filters (for example a "review" document-type filter and the last five years). Name specific reviews only if you are confident they exist.
4. Stage 2 foundations: the classic works or authors the field builds on, and what each established.
5. Stage 3 current work: how to find the last three to five years of primary studies (search phrases, citation chasing from the Stage 1 reviews), plus any specific recent works you are confident about.
6. Stage 4 methods: methods texts or papers for the designs the topic typically uses.
7. For each item, say why to read it, what to get out of it, and whether to read closely or skim.
8. End with how to extend the list: forward and backward citation chasing from two or three items, and which alerts to set.
</task>

<constraints>
- Mark every specific work with "(verify)" and a confidence level. Never invent a title, author, year, journal or DOI; when unsure, give a search phrase and the kind of source instead.
- Prefer reviews and recent work over older classics where the field has moved on, and say when a classic is mostly of historical interest.
- Do not exceed what fits the stated time. Put extra items in an optional "if you have time" line.
- Flag items likely to be paywalled and suggest legal routes (library access, author manuscripts in repositories, preprints).
- If the topic is too vague to search, propose two or three sharper versions and ask which one before building the list.
</constraints>

<output_format>
## How to use this list
Two or three sentences: the searchable question, what is left out, how many items fit the time.
## Stage 1 orientation
Table: item or search phrase | why | read or skim | confidence.
## Stage 2 foundations
Same table.
## Stage 3 current work
Same table.
## Stage 4 methods
Same table.
## How to extend it
Numbered steps for citation chasing and alerts.
</output_format>
