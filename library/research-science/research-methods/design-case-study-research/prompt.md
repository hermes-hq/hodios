---
schema: 1
id: design-case-study-research
kind: prompt
title: Design case study research
description: Designs case study research with the case and its boundaries, single or multiple-case logic, case selection, data sources, analysis strategy and how validity or trustworthiness is secured.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student, consultant]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [case-study, qualitative-research, case-selection, triangulation, replication-logic, yin]
pairs_with:
  prompts: [design-research-study, write-field-observation-protocol, write-research-interview-protocol, build-qualitative-codebook]
  personas: [research-methodologist]
args:
  - name: question
    description: The research question, ideally a how or why question about a contemporary phenomenon, and the field.
    type: text
    required: true
  - name: context
    description: Possible cases you have access to, data you can get (documents, interviews, observation, records), time available, and your epistemological stance if you have one (for example post-positivist or interpretivist).
    type: text
output_contract:
  format: markdown
  sections: [Fit and stance, The case, Design and case selection, Data sources, Analysis strategy, Quality, Case study protocol outline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Case study research examines a phenomenon in depth within its real-life context, especially when the boundary between phenomenon and context is not clear. Traditions differ: Yin's approach emphasises propositions, replication logic across cases and validity tests; Stake's emphasises intrinsic or instrumental understanding and interpretation; Merriam's sits between them. A strong design defines the case and its boundaries (what, who, when, where), chooses single or multiple and holistic or embedded designs for stated reasons, selects cases by logic rather than convenience, triangulates sources, and keeps a case study protocol and database so the chain of evidence can be followed. Weak designs call any single example a "case study", never bound the case, and generalise statistically from one site.
</context>

<task>
Design case study research for:
<question>
{{question}}
</question>
{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Check fit: is a case study the right strategy for this question (versus a survey, experiment, ethnography or history)? Say which tradition fits the user's stance or recommend one, and what that implies for the rest of the design.
2. Define the case (the unit of analysis), its boundaries in time, place and activity, and any embedded units. Write propositions or, for an exploratory or interpretive study, the purpose and issues that guide data collection.
3. Choose the design: single or multiple, holistic or embedded. For a single case, give the rationale (critical, extreme or unusual, common, revelatory, longitudinal). For multiple cases, state literal or theoretical replication logic and how many cases that implies.
4. Set case selection criteria and a selection procedure, and assess the candidate cases in the context if any were given.
5. Plan data sources (documents, archival records, interviews, direct and participant observation, artefacts) with what each contributes to which proposition, and how they will be triangulated.
6. Plan analysis: the general strategy (relying on propositions, working inductively, developing a case description, examining rival explanations) and techniques (pattern matching, explanation building, time-series analysis, logic models, cross-case synthesis), and how within-case analysis precedes cross-case analysis.
7. Plan quality using the criteria of the chosen tradition: construct validity, internal validity, external (analytic) validity and reliability, or credibility, transferability, dependability and confirmability, with tactics for each and the phase where each applies.
8. Outline the case study protocol and the case study database.
</task>

<constraints>
- Generalisation is analytic (to theory or propositions), not statistical; say so wherever claims are discussed.
- Rival explanations must be named and planned for, not only the preferred one.
- Do not invent details about candidate cases or organisations; use what was given and mark gaps.
- If access or time cannot support the number of cases, recommend fewer cases studied well.
</constraints>

<output_format>
## Fit and stance
Whether a case study fits, and the tradition.
## The case
Unit of analysis, boundaries, embedded units, and propositions or issues.
## Design and case selection
Design type with rationale, selection criteria, and an assessment table if candidates were given (case | meets criteria? | role in the logic).
## Data sources
A table: source | what it shows | proposition served | access risk.
## Analysis strategy
Strategy and techniques, within-case then cross-case.
## Quality
A table: criterion | tactic | research phase.
## Case study protocol outline
The headings of the protocol and the contents of the case study database.
</output_format>
