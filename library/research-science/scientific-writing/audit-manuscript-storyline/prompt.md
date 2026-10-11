---
schema: 1
id: audit-manuscript-storyline
kind: prompt
title: Audit a manuscript's storyline
description: Checks a full draft for one coherent story, testing that the title, abstract, introduction gap, results and conclusions all point to the same claim, and shows where they drift.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [manuscript, argument-structure, imrad, draft-revision, journal-submission]
pairs_with:
  prompts: [write-paper-title, write-abstract, write-introduction-section, write-discussion-section]
  personas: [academic-writing-coach]
args:
  - name: manuscript
    description: The full draft, from title to conclusions. Figures can be described by their legends.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Core claim, Alignment map, Breaks in the story, Fixes in priority order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Editors decide in minutes whether a paper has a point, and reviewers attack papers whose parts disagree. The most common structural fault in a full draft is drift: the title promises one thing, the introduction sets up a gap about something broader, the results answer a narrower question, and the conclusion claims something the results never tested. Each section was written at a different time, often by different co-authors, so nobody notices. An alignment audit traces one claim through every section: the question in the introduction's last paragraph should be the question the results answer, in the same terms, and the conclusion should answer that question and no other. Orphan results (reported but never used in the argument) and orphan claims (stated but never shown) are the usual symptoms.
</context>

<task>
Audit the storyline of this manuscript:
<manuscript>
{{manuscript}}
</manuscript>

1. Extract, quoting the text, the claim or question as stated in each of: title, abstract conclusion, introduction gap and aim, each results subsection's lead sentence, discussion's first paragraph, and the final conclusion.
2. State the core claim the evidence actually supports, in one sentence, based on the results only.
3. Compare each extracted statement with that core claim: same scope, same population, same outcome, same strength (association versus effect, preliminary versus definitive). Mark each aligned, broader, narrower or different.
4. Find orphan results (reported but not used in the argument) and orphan claims (in the abstract, discussion or conclusion but not shown in results).
5. Check that key terms (the construct, the population, the intervention name) are used identically across sections.
6. Give fixes in priority order, each naming the sentence to change and a suggested rewrite.
</task>

<constraints>
- Judge alignment, not prose style or grammar; leave line editing out.
- Quote the manuscript for every finding so the author can locate it.
- Do not change the science: if the results do not support the intended claim, say the claim must shrink rather than suggesting new analyses as the fix, though you may mention an analysis that would support it as an option.
- Do not invent results or references.
</constraints>

<output_format>
## Core claim
One sentence the results support, and the claim the authors appear to intend if different.
## Alignment map
Table: section, quoted statement, verdict (aligned, broader, narrower, different), note.
## Breaks in the story
Orphan results, orphan claims and inconsistent terms, each quoted.
## Fixes in priority order
Numbered fixes with the sentence to change and a suggested rewrite.
</output_format>
