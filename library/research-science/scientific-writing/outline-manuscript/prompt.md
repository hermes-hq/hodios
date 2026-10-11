---
schema: 1
id: outline-manuscript
kind: prompt
title: Outline a manuscript from results and notes
description: Turns results and notes into a section-by-section manuscript outline with the one-sentence message, figure and table order, and the single point each paragraph makes.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [notes, dataset, text]
output: [outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [manuscript, imrad, paper-drafting, topic-sentences, figure-order]
pairs_with:
  prompts: [write-introduction-section, write-results-section, design-scientific-figures, choose-target-journal]
  workflows: [paper-writing-track]
args:
  - name: material
    description: Your results (key numbers, figures or tables you have), study design, research question, and any notes or fragments of text you already have.
    type: text
    required: true
  - name: journal
    description: Optional. Target journal or article type and its limits, for example "research article, 4,000 words, 6 display items".
    type: string
output_contract:
  format: markdown
  sections: [Message, Figure and table order, Outline, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most papers that are hard to write are hard because the author has not decided what the paper says. Experienced authors fix the message first (one sentence a reader should remember), then order the figures so each one carries one step of the argument, then write the results to walk through the figures, and only then write the introduction to set up exactly the gap the results fill and the discussion to interpret exactly those results. A paragraph-level outline, where each paragraph has one stated point, makes drafting fast and exposes gaps before any prose exists. Common failures: outlining in the order the work was done rather than the order of the argument, including every analysis ever run, and an introduction that promises more than the results deliver.
</context>

<task>
Build a manuscript outline from:
<material>
{{material}}
</material>
{{#journal}}
Target: {{journal}}
{{/journal}}

1. Write the paper's message in one sentence, then the two to four findings that support it. Check each finding against the material and say if a finding is not yet supported by any result given.
2. Propose the order of figures and tables so they build the argument, each with the one claim it supports. Mark results that should go to supplementary material and why.
3. Outline every section (introduction, methods, results, discussion, or the article type's structure). For each paragraph give a one-line topic sentence stating its point, and for results paragraphs the figure or table it relies on.
4. In the introduction outline, end with a gap and aim that match the message exactly. In the discussion outline, include principal finding, comparison with prior work, limitations and implications.
5. Give a rough word budget per section if limits are known.
6. List open questions: missing analyses, numbers or decisions the author must supply before drafting.
</task>

<constraints>
- Use only results in the material. Do not invent findings, numbers, citations or analyses; mark needed literature as [CITE: what is needed].
- Order by argument, not by the chronology of the work.
- One point per paragraph; if a paragraph needs two points, split it.
- If the material supports more than one paper or no clear message, say so and propose the options instead of forcing one.
</constraints>

<output_format>
## Message
One sentence, then the supporting findings as bullets, each marked supported or not yet supported.
## Figure and table order
Numbered list: item, claim it supports, main or supplementary.
## Outline
Section headings with numbered paragraph topic sentences and word budgets.
## Open questions
Bullets the author must answer before drafting.
</output_format>
