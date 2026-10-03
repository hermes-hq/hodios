---
schema: 1
id: write-paper-highlights
kind: prompt
title: Write paper highlights and summaries
description: Writes journal highlights, a graphical abstract concept and a plain-language summary for an accepted or submitted paper, within the journal's limits and true to the results.
category: scientific-writing
version: 1.0.1
status: incubating
stage: [build, ship]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [copy, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [highlights, graphical-abstract, plain-language-summary, journal-submission, manuscript]
pairs_with:
  prompts: [write-abstract, explain-research-to-public, design-scientific-figures, plan-research-dissemination]
  personas: [science-communicator]
args:
  - name: paper
    description: The paper's title, abstract and key results, or the full text. Include the main numbers.
    type: text
    required: true
  - name: journal_requirements
    description: The journal's rules for highlights, graphical abstracts and lay summaries, for example "3-5 highlights, max 85 characters each including spaces; graphical abstract 1328 x 531 px; lay summary max 150 words". If empty, common defaults are used and labelled.
    type: text
output_contract:
  format: markdown
  sections: [Highlights, Graphical abstract concept, Plain-language summary, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Highlights stay a margin under the character limit, with a reminder to confirm counts before submitting."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Many journals ask for extras that are written last and in a hurry, yet they are what most people read: highlights appear in search results and alerts, the graphical abstract is what gets shared, and the plain-language summary is read by patients, policymakers and journalists. Each has strict rules. Highlights are short bullet points (often 3 to 5, at most about 85 characters each) giving the core findings, not the background. A graphical abstract is a single panel showing the main message with a clear reading direction, not a copy of a results figure. A plain-language summary uses everyday words, explains why the work matters, gives the main result in understandable terms and states the limits honestly.
</context>

<task>
Write the highlights, graphical abstract concept and plain-language summary for this paper.
<paper>
{{paper}}
</paper>
{{#journal_requirements}}
<journal_requirements>
{{journal_requirements}}
</journal_requirements>
{{/journal_requirements}}

1. Extract the paper's main message in one sentence, the two to four key findings with their numbers, the study type and the main limitation.
2. Write the highlights: each one a finding or a methodological novelty, in present tense, specific (with a number where it helps), within the character limit. Write five candidates and mark the three to five to submit.
3. Design the graphical abstract concept: the message it carries, layout and reading direction, the elements in each region, the one key number or contrast to show, labels and icons, and what to leave out. Write it as a brief a designer or the author could draw from.
4. Write the plain-language summary: what question was asked and why it matters, what was done, what was found (in words a 12 to 14 year old reader could follow, with natural frequencies or comparisons instead of statistics), what it means and what it does not show.
5. Check everything against the paper: no claim stronger than the results, the same numbers everywhere, study type clear.
</task>

<constraints>
- Use only results in the paper. If a highlight would need a number the paper does not give, write it without the number.
- No causal wording for associations, and no "first", "novel" or "breakthrough" unless the paper itself establishes it.
- Respect every limit in the journal requirements; if none are given, use 3 to 5 highlights of at most 85 characters and a summary of at most 200 words, and say these are defaults.
- Show the character count, including spaces, after each highlight. Counting by eye is error-prone, so keep each highlight at least five characters under the limit and remind the author to confirm counts with a character counter before submitting.
</constraints>

<output_format>
## Highlights
Numbered candidates with (N characters), the recommended set marked.
## Graphical abstract concept
Layout description, elements by region, text labels, and a rough ASCII sketch in a code block.
## Plain-language summary
The summary, with its word count.
## Checks
A short list confirming limits met and any claim that needed softening, with the original wording.
</output_format>
