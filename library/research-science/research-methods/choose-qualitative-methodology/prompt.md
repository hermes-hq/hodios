---
schema: 1
id: choose-qualitative-methodology
kind: prompt
title: Choose a qualitative methodology
description: Chooses between phenomenology, ethnography, narrative inquiry, grounded theory, case study and generic qualitative design for a question, with the consequences for sampling, data and analysis.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [qualitative-research, phenomenology, ethnography, narrative-inquiry, grounded-theory, qualitative-description]
pairs_with:
  prompts: [plan-grounded-theory-study, design-case-study-research, justify-qualitative-sample-size, write-research-interview-protocol]
  personas: [research-methodologist]
args:
  - name: study
    description: Your research question, the participants or setting, the time and access you have, and any approach you are leaning towards.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the question asks, Comparison, Recommendation, What follows for the study, Reworded question]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Each qualitative methodology answers a different kind of question. Phenomenology asks what an experience is like and what is essential to it, using a small group who share that experience. Ethnography asks how a culture or group works in practice and needs prolonged presence in the setting. Narrative inquiry asks how people story their lives or events over time. Grounded theory asks how a social process unfolds and aims to build a theory of it, with theoretical sampling and constant comparison. Case study examines a bounded case in its context using several data sources. Qualitative description or a generic qualitative approach answers practical "what are the views and experiences" questions without the commitments of the others, and is often the honest choice for applied health and education projects. The common mistake is naming a methodology for prestige ("phenomenological study" with 30 short interviews and thematic analysis, or "grounded theory" without theoretical sampling); examiners spot the mismatch between the label and what was done.
</context>

<task>
Choose a qualitative methodology for:
<study>
{{study}}
</study>

1. Identify what the question actually asks about: lived experience, culture and practice, stories over time, a process, a bounded case, or practical views and experiences.
2. Compare the plausible methodologies on: the question they answer, typical sample and sampling logic, data sources, time in the field, analysis procedure, the product of the analysis, and feasibility for this user.
3. Recommend one, with the main variant if relevant (for example descriptive versus interpretative phenomenology, constructivist grounded theory), and say why it beats the runner-up for this study.
4. Spell out what the choice commits the user to: sampling, data collection, the specific analysis method, the researcher's role and reflexivity, and what claims the findings can support.
5. Reword the research question so its wording matches the chosen methodology.
6. Flag any feasibility problem (for example ethnography with one month and no access) and the fallback.
</task>

<constraints>
- Do not recommend a methodology the user's time, access or skills cannot support without saying so.
- Do not treat thematic analysis as a methodology equivalent to these; it is an analysis method that can sit inside several.
- Keep sample guidance as typical ranges with reasons, not fixed rules.
- Do not invent the user's constraints; state assumptions where they are missing.
</constraints>

<output_format>
## What the question asks
One short paragraph.
## Comparison
A table: methodology | answers | sample | data | time in field | analysis | product | feasibility here.
## Recommendation
The choice, the variant and why.
## What follows for the study
Bullets on sampling, data, analysis, reflexivity and claims.
## Reworded question
The research question rewritten for the chosen methodology.
</output_format>
