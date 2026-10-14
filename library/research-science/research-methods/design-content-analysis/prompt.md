---
schema: 1
id: design-content-analysis
kind: prompt
title: Design a content analysis study
description: Designs a quantitative or qualitative content analysis of media, documents or posts with the sampling frame, units, a coding scheme, coder training, reliability testing and analysis.
category: research-methods
version: 1.0.0
status: incubating
stage: [design, plan]
role: [researcher, student]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [content-analysis, media-analysis, document-analysis, coding-scheme, intercoder-reliability]
subject: [social-sciences]
pairs_with:
  prompts: [build-qualitative-codebook, calculate-inter-rater-reliability, design-sampling-plan, write-preregistration]
  personas: [research-methodologist]
args:
  - name: question
    description: What you want to learn from the content, for example "how UK newspapers framed heat-related deaths between 2015 and 2025".
    type: text
    required: true
  - name: material
    description: The kind of material and where it comes from (news archive, policy documents, social media posts, adverts, transcripts), the period, and roughly how much exists.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Approach, Sampling, Units and variables, Coding procedure, Reliability, Analysis and limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Content analysis systematically describes communication content. Quantitative content analysis (in the tradition of Krippendorff and Neuendorf) defines variables in advance, samples content, has trained coders apply a codebook, tests intercoder reliability, and reports frequencies and associations. Qualitative content analysis (for example Schreier or Hsieh and Shannon's conventional, directed and summative types) builds or applies categories more flexibly to describe meaning. Typical weaknesses: a convenience sample of whatever a keyword search returned, unclear units (article, paragraph, sentence, image, post), latent constructs like "framing" coded with no decision rules, reliability tested on easy variables only or reported as percent agreement, and claims about audiences or effects that content data cannot support. For digital content, platform search and API limits shape what can be sampled, and deleted or private posts raise ethics and representativeness issues. Automated coding with dictionaries or language models needs validation against human coding.
</context>

<task>
Design a content analysis for:
<question>
{{question}}
</question>
<material>
{{material}}
</material>

1. Choose quantitative, qualitative or mixed content analysis and say why; state which claims the design can support (describing content) and which it cannot (effects on audiences, authors' intentions).
2. Plan sampling: the population of content, the sampling frame and its gaps, search terms with a relevance check, the sampling method (for example constructed weeks for news, stratified by outlet or platform), sample size reasoning, and how duplicates and syndicated copies are handled.
3. Define units: sampling unit, recording unit and context unit.
4. Draft the coding scheme: manifest variables and latent variables, each with a definition, categories, decision rules and an example from the type of material (labelled illustrative). Keep categories mutually exclusive where coded as single choice.
5. Plan coding: coder training, a pilot on material outside the sample, codebook revision, independent double coding of a subsample, and disagreement resolution. If automated coding is proposed, plan validation against human coding.
6. Plan reliability: Krippendorff's alpha (or a justified alternative) per variable, the subsample size, acceptable thresholds and what happens to variables below them.
7. Plan analysis matched to the question (frequencies, trends over time, comparisons across outlets, associations) and list limits and ethics issues for the material.
</task>

<constraints>
- Do not invent example content attributed to real outlets or people; examples are labelled illustrative.
- Do not report percent agreement alone as reliability.
- Do not claim the design shows effects on audiences or authors' motives.
- Note platform terms, copyright and privacy for collecting and quoting online content; tell the user to check current rules.
</constraints>

<output_format>
## Approach
Type of content analysis, reasons and supportable claims.
## Sampling
Frame, method, size and handling rules.
## Units and variables
Units, then a codebook table: variable | definition | categories | decision rules | example (illustrative).
## Coding procedure
Numbered steps.
## Reliability
Coefficient, subsample, thresholds and actions.
## Analysis and limits
Analysis plan, then limits and ethics.
</output_format>
