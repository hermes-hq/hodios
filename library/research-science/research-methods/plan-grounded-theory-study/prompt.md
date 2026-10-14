---
schema: 1
id: plan-grounded-theory-study
kind: prompt
title: Plan a grounded theory study
description: Plans a grounded theory study, choosing Glaserian, Straussian or constructivist versions, with theoretical sampling, constant comparison, memos, coding stages and saturation.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
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
level: expert
depth: advanced
tags: [grounded-theory, qualitative-research, theoretical-sampling, constant-comparison, memo-writing]
subject: [social-sciences]
pairs_with:
  prompts: [write-research-interview-protocol, build-qualitative-codebook, justify-qualitative-sample-size, write-ethics-application]
  personas: [research-methodologist]
args:
  - name: question
    description: The process or phenomenon you want to explain, for example "how newly qualified teachers decide whether to stay in the profession".
    type: text
    required: true
  - name: context
    description: Optional. Access to participants, time available, degree level, and any data you already have.
    type: text
output_contract:
  format: markdown
  sections: [Is grounded theory right, Version and stance, Sampling plan, Data collection and analysis cycle, Saturation and the theory, Quality and reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Grounded theory builds an explanatory theory of a process from data, rather than testing an existing one. Many studies that call themselves grounded theory are really thematic analyses: they recruit a fixed sample, finish all interviews, then code. Real grounded theory interleaves collection and analysis: early interviews are coded, memos develop tentative categories, and theoretical sampling chooses the next participants or questions to develop those categories (not to represent a population). Constant comparison works across incidents, cases and categories. The versions differ: classic Glaserian (emergence, avoiding early literature, substantive and theoretical coding), Straussian (Strauss and Corbin's open, axial and selective coding with a coding paradigm), and constructivist (Charmaz: initial, focused and theoretical coding, the researcher co-constructing meaning). The end product should be a theory with a core category and the relations between categories, and saturation means categories are fully developed in their properties, not that "nothing new was heard".
</context>

<task>
Plan a grounded theory study for:
<question>
{{question}}
</question>
{{#context}}
Context: {{context}}
{{/context}}

1. Check fit: is the question about a process or social action that lacks an adequate theory? If it is descriptive or about prevalence, recommend another method (for example thematic analysis or a survey) and explain.
2. Recommend a version (Glaserian, Straussian or constructivist) based on the question, the researcher's stance and the degree or audience, and explain what that commits them to, including when and how to use existing literature.
3. Plan sampling: initial purposive sampling to start, then theoretical sampling criteria that will be decided as categories emerge, with examples of what might trigger a new sampling direction. Give a realistic range of participants and why it cannot be fixed in advance, and how to word this for an ethics committee.
4. Plan the cycle: interview or observation guide that evolves, coding stages in the chosen version's terms, memo types and when to write them, constant comparison moves, and diagramming. Lay out the first few cycles as a schedule.
5. Define theoretical saturation for this study and how it will be judged and reported.
6. Describe what the final theory should contain (core category, categories with properties and dimensions, relationships, conditions and consequences) and how it is presented.
7. Plan quality: criteria fitting the version (for example credibility, originality, resonance and usefulness for constructivist), an audit trail, and reporting guidance such as COREQ or SRQR plus grounded theory specific items.
</task>

<constraints>
- Do not mix incompatible procedures across versions without saying so.
- Do not promise a fixed sample size; give a range with reasoning.
- Do not invent categories or a theory; any example category is labelled hypothetical.
- If the user's timeline cannot fit iterative collection and analysis, say so and suggest how to adapt or what to call the method honestly.
</constraints>

<output_format>
## Is grounded theory right
Recommendation and reasons.
## Version and stance
The version, its commitments and the role of literature.
## Sampling plan
Initial sampling, theoretical sampling triggers, size range and ethics wording.
## Data collection and analysis cycle
A table: cycle | data collected | coding stage | memos | sampling decision.
## Saturation and the theory
Definition of saturation, how judged, and what the final theory contains.
## Quality and reporting
Criteria, audit trail and checklist.
</output_format>
