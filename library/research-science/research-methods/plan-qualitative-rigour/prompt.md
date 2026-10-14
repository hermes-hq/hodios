---
schema: 1
id: plan-qualitative-rigour
kind: prompt
title: Plan qualitative rigour
description: Plans how a qualitative study will show trustworthiness, choosing strategies such as reflexive journals, audit trails, member reflections and thick description that fit its methodology.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [plan, table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [qualitative-research, trustworthiness, credibility, reflexivity, audit-trail, member-checking]
pairs_with:
  prompts: [run-thematic-analysis, write-positionality-statement, justify-qualitative-sample-size, write-methods-section]
  personas: [research-methodologist]
args:
  - name: study
    description: Your question, qualitative methodology and analysis approach, data sources, who does the coding, and any rigour criteria your examiners or journal expect.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Rigour plan, Records to keep, Methods text]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Qualitative rigour is judged by criteria that fit the study's paradigm, and examiners notice when the wrong ones are applied. Lincoln and Guba's trustworthiness criteria (credibility, transferability, dependability, confirmability) remain the common reference; other frameworks emphasise reflexivity, sincerity, coherence and resonance. Strategies must fit the methodology: inter-coder reliability coefficients suit codebook and coding-reliability approaches but contradict reflexive thematic analysis, where a second person's role is to challenge interpretations rather than to agree on codes; member checking framed as "confirming the findings are true" sits badly with interpretative approaches, so many now describe member reflections; saturation is not a universal criterion. Strong plans name a few strategies that are actually done and documented (reflexive journal, decision log, negative case analysis, peer debriefing, prolonged engagement, triangulation of sources, thick description) rather than a long list of claims.
</context>

<task>
Plan rigour for:
<study>
{{study}}
</study>

1. Identify the paradigm and analysis approach and say which quality framework fits (for example trustworthiness criteria, or criteria specific to the approach). Flag any planned strategy that contradicts the approach, such as inter-coder kappa in reflexive thematic analysis.
2. For each criterion, choose one to three strategies that fit, saying exactly what will be done, when, by whom, and what record it leaves.
3. Plan reflexivity: what the researcher will log, when, and how it feeds analysis.
4. Plan the audit trail: the decision log, codebook or theme versions, memos and how raw data link to findings.
5. Plan transferability: the contextual detail to report so readers can judge fit to their setting.
6. Give templates for the reflexive journal entry and decision log entry.
7. Draft methods text describing the strategies honestly, in future tense for a protocol, with a note on changing to past tense later.
</task>

<constraints>
- Do not recommend strategies that clash with the stated approach; explain any clash.
- Do not claim strategies "ensure validity"; they support and document credibility.
- Keep the plan doable with the user's time and team; prefer few real strategies over many claimed ones.
- Do not invent citations; suggest key authors only as search leads.
</constraints>

<output_format>
## Fit check
Approach, fitting framework and any clashes found.
## Rigour plan
A table: criterion | strategy | what is done | when | record left.
## Records to keep
Templates for the reflexive journal and decision log in code blocks.
## Methods text
Ready-to-edit paragraph.
</output_format>
