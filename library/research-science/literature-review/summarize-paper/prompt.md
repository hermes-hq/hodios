---
schema: 1
id: summarize-paper
kind: prompt
title: Summarise a research paper
description: Summarises a research paper into its question, method, key results with exact numbers, limitations and what it means for the reader's purpose. Use before citing, relying on or reading a paper in full.
category: literature-review
version: 1.0.0
status: experimental
stage: [discover]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [papers, critical-appraisal, evidence]
pairs_with:
  prompts: [build-literature-matrix, find-research-gaps]
  personas: [research-methodologist]
args:
  - name: paper
    description: The paper's full text, or as much of it as you have (abstract, methods, results, discussion).
    type: text
    required: true
  - name: purpose
    description: Why you are reading it, for example "deciding whether to cite it in my thesis on sleep and memory" or "checking if this method fits my data".
    type: text
  - name: depth
    description: How much detail to give.
    type: enum
    enum: [abstract, standard, deep]
    default: standard
output_contract:
  format: markdown
  sections: [Question, Method, Key results, Limitations, What it means for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful paper summary lets the reader decide whether to rely on, cite or read the paper without misrepresenting it. Plain summaries tend to echo the abstract's framing, drop the numbers, blur what was shown with what the authors speculate, and skip the limitations. This summary works from the text provided, keeps every number traceable to the paper, and ends with what the paper means for the reader's own purpose.
</context>

<task>
Summarise this paper at depth "{{depth}}":
<paper>
{{paper}}
</paper>
{{#purpose}}
The reader's purpose: {{purpose}}
{{/purpose}}

1. Name the paper type (randomised trial, observational study, lab experiment, simulation, qualitative study, systematic review, theory, methods paper…), because it decides which limitations matter.
2. Extract the research question or hypothesis, the design, the sample or data (size, population, setting, period) and the main analysis.
3. Extract the key results with their numbers exactly as reported: effect sizes, confidence intervals, p-values, accuracy, n. Say which outcomes were primary and which secondary or exploratory.
4. Separate what the results show from what the authors infer or speculate in the discussion.
5. List limitations: those the authors state and those you can see (design, sample, measurement, confounding, multiple comparisons, generalisability, funding or conflicts of interest). Label which is which.
6. Relate the paper to the reader's purpose: what it supports, what it does not, and what to check next. Without a purpose, say who would find it most useful.

Depth: "abstract" is about 150 words in one paragraph; "standard" about 400 words; "deep" up to 1,000 words and adds methods detail (measures, controls, statistical model), whether the conclusions follow from the results, and three questions you would ask the authors.
</task>

<constraints>
- Use only the text provided. If it is only an abstract or an excerpt, say so in the first line and write "not in the text provided" wherever the full paper would be needed.
- Copy every number from the paper. Never round, recompute or infer one. If a result is reported without a number, describe it in words and say the number is not given.
- Never strengthen a claim: "associated with" stays associated, a pilot stays a pilot, a mouse study stays a mouse study.
- If you receive only a title, citation, DOI or link and cannot read the text, ask for the full text or abstract and stop. Do not summarise from memory.
- Keep the authors' terms for key constructs and define jargon in a few words on first use.
</constraints>

<output_format>
**Citation:** authors, year, title and venue as given (omit what is missing). **Paper type:** one phrase.
## Question
One or two sentences.
## Method
Bullets: design, sample, data, analysis.
## Key results
Bullets, each with its number(s) and "(primary)" or "(secondary)".
## Limitations
Bullets, each tagged "(authors)" or "(reviewer)".
## What it means for you
Two to four sentences tied to the purpose.

For depth "abstract", keep the citation line and write the five parts as one paragraph with bold inline labels instead of headings.
</output_format>
