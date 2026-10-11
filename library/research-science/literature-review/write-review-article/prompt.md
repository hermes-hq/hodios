---
schema: 1
id: write-review-article
kind: prompt
title: Write a narrative review article for a journal
description: Writes a narrative review article for journal submission from the user's sources, with a clear scope, a transparent search description, thematic synthesis, critical commentary and future directions.
category: literature-review
version: 1.0.0
status: incubating
stage: [build]
role: [researcher]
requires: [none]
inputs: [notes, document]
output: [article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [narrative-review, review-paper, journal-submission, synthesis]
pairs_with:
  prompts: [outline-literature-review, build-literature-matrix, choose-target-journal]
  personas: [academic-writing-coach]
args:
  - name: topic
    description: The review's topic and the question or argument it addresses.
    type: text
    required: true
  - name: sources
    description: Your sources with notes or a literature matrix - author, year, design, sample and key findings for each. The review is written only from these.
    type: text
    required: true
  - name: journal
    description: Target journal or journal type and its limits, for example "clinical specialty journal, 4,000 words, 50 references, unstructured abstract 250 words".
    type: text
  - name: search_description
    description: How you found the sources (databases, terms, dates, selection), so the methods paragraph can be honest.
    type: text
output_contract:
  format: markdown
  sections: [Title and abstract, Introduction, Methods, Synthesis, Discussion and future directions, Conclusion, Gaps to fill before submission]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Narrative reviews are widely read and widely criticised. Editors reject them for being a list of studies, for an unexplained selection of sources that looks cherry-picked, for no critical judgement of study quality, and for a "future research" section that just says more research is needed. Quality criteria for narrative reviews (for example the SANRA scale) ask for a justified importance of the topic, a stated aim, a described literature search, referencing that supports key statements, scientific reasoning that weighs evidence by its quality, and appropriate presentation of data. A narrative review is not a systematic review and should not pretend to be one, but it must still say how the literature was found and selected. The best ones offer a point of view: an organising framework, a judgement on where the evidence is strong and weak, and a specific research agenda.
</context>

<task>
Write a narrative review article on:
<topic>
{{topic}}
</topic>
{{#journal}}Target journal and limits: {{journal}}{{/journal}}
{{#search_description}}
How the sources were found:
{{search_description}}
{{/search_description}}
<sources>
{{sources}}
</sources>

1. Check the sources against the topic: say if they look too few, too old, or one-sided for a publishable review, and continue only with what they can support, noting the gaps.
2. Write a working title and an abstract to the journal's format (unstructured if not stated, about 250 words).
3. Introduction: why the topic matters now, what earlier reviews covered (only if in the sources), and the review's aim and scope.
4. Methods: a short, honest description of how the literature was found and selected, based on the search description. If none was given, write a placeholder paragraph listing what to report. Never describe the review as systematic.
5. Synthesis: thematic sections organised by idea, each comparing studies, stating design and size where it changes the weight, and explaining disagreements.
6. Discussion and future directions: overall judgement of the evidence, its main weaknesses, implications for practice or policy at the strength the evidence allows, and a specific research agenda (which question, which design, which population).
7. Conclusion: one paragraph.
8. List what must be filled before submission: [cite] markers, missing details, checks against the journal's author guidelines.
</task>

<constraints>
- Cite only the sources provided, in author-year form unless the journal style is given. Mark any statement needing a source not in the list with [cite: what kind of source].
- Never invent studies, numbers or reference details. Copy numbers from the source notes exactly.
- Weigh evidence by design and quality, and say where conclusions rest on weak or few studies.
- Keep within the stated word and reference limits; if none, aim for 3,000 to 5,000 words and say so.
- Remind the author once that journals have policies on AI-assisted writing and that they must check, disclose as required, and take responsibility for every claim.
</constraints>

<output_format>
## Title and abstract
Working title, then the abstract.
## Introduction
Prose.
## Methods
Prose or placeholder.
## Synthesis
### headings per theme, prose.
## Discussion and future directions
Prose, with the research agenda as a short numbered list.
## Conclusion
One paragraph.
## Gaps to fill before submission
Checklist.
</output_format>
