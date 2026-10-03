---
schema: 1
id: assess-reproducibility
kind: prompt
title: Assess a paper's reproducibility
description: Assesses a paper's reproducibility, covering data and code availability, methods detail, materials, preregistration and computational environment, and lists what a replicator would be missing.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor, data-scientist]
requires: [none]
inputs: [document]
output: [table, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reproducibility, open-data, open-code, preregistration, fair-data, replication]
pairs_with:
  prompts: [review-statistical-methods, write-peer-review, check-manuscript-reporting, write-methods-section]
  personas: [peer-reviewer, research-methodologist]
args:
  - name: paper_text
    description: The paper's methods, results, data and code availability statements, and supplementary information if available. The more complete the text, the better the assessment.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overall assessment, Scorecard, What a replicator would be missing, Requests to the authors, Limits of this assessment]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reproducibility means another researcher can obtain the same results from the same data and code; replicability means a new study finds the same thing with new data. Both depend on what a paper discloses. Assessors look at: data availability (in a trusted repository with a persistent identifier, licence and documentation, or a justified restriction with a stated access route; "available on request" is weak), code availability (archived version, dependencies, environment, random seeds, instructions to run), materials and resources (reagents, antibodies with identifiers, cell-line authentication, organisms, instruments and settings, software versions), methods detail sufficient to repeat each step, analysis transparency (pre-registration or registered report, deviations reported, all outcomes reported), and whether the reported numbers can be traced from the data. Standards differ by field and data type: sensitive human data and qualitative data may justifiably be restricted, and that should not be penalised if access is explained.
</context>

<task>
Assess the reproducibility of this paper.
<paper>
{{paper_text}}
</paper>

1. Identify the field, study type and the main claims, so the assessment focuses on what supports them.
2. Score each dimension as Available, Partial, Missing or Not applicable, with the evidence quoted from the text: data; code and computational environment; materials and resources; methods detail; pre-registration and deviations; outcome and analysis reporting completeness; traceability from data to reported numbers.
3. Act as a replicator: walk through the steps needed to reproduce the main result and list every point where you would have to guess or ask the authors (a parameter, a version, an exclusion rule, a preprocessing step, a seed, a recipe, a stimulus set).
4. Judge whether restrictions are justified (privacy, consent, third-party licences, biosafety) and whether a controlled-access route is given.
5. Write specific, polite requests to the authors that would close the gaps, in order of importance.
</task>

<constraints>
- Quote the text for every score. If the text supplied lacks a section (for example no data statement or no supplement), say so and score it as "Not provided in the text" rather than Missing.
- Do not claim you checked a repository, link or code; you have only the text unless the user gives more.
- Do not penalise justified restrictions on sensitive data; do flag unjustified "available on request".
- Separate reproducibility gaps from scientific criticism of the design, which belongs in a regular review.
- If only an abstract is supplied, say that reproducibility cannot be assessed and list what is needed.
</constraints>

<output_format>
## Overall assessment
Three sentences: how reproducible the main result is and the biggest gap.
## Scorecard
A table: dimension | score | evidence (quoted) | note.
## What a replicator would be missing
Numbered, in the order of the workflow.
## Requests to the authors
Numbered, most important first.
## Limits of this assessment
What could not be judged from the text supplied.
</output_format>
