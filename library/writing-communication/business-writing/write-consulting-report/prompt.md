---
schema: 1
id: write-consulting-report
kind: prompt
title: Write a consulting report
description: Writes a consultant's final report for a client with the question, scope and method, an answer-first summary, evidence-backed findings, prioritised recommendations and an implementation roadmap.
category: business-writing
version: 1.0.0
status: incubating
stage: [build, review]
role: [consultant, business-analyst, manager]
requires: [none]
inputs: [notes, dataset, document, transcript]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [consulting-deliverable, findings-and-recommendations, client-report, pyramid-principle, implementation-roadmap]
pairs_with:
  prompts: [write-gap-analysis-report, write-executive-summary, write-deliverable-cover-note]
args:
  - name: engagement
    description: The client, the question or problem you were hired to answer, the agreed scope and deliverables, and who will read the report.
    type: text
    required: true
  - name: findings_material
    description: Your evidence and analysis, such as interview notes (anonymised), data results, benchmarks, documents reviewed, observations, and the recommendations you are leaning toward.
    type: text
    required: true
  - name: sensitivities
    description: Anything politically sensitive, such as findings that implicate a team, or what the sponsor has already been told. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Report, Recommendation traceability, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A consulting report is paid for by its recommendations, but clients act on it only if they trust the findings and can see how to implement them. Senior consultants write answer first: the summary states the answer to the client's question and the three to five things to do, then the report supports each with evidence, in the pyramid structure. Reports disappoint when they restate what the client already knows, list findings without saying "so what", give recommendations that do not trace to any finding, ignore cost and capacity, or bury uncomfortable findings in soft wording until the client cannot tell what is wrong. Interview evidence must stay anonymous and be presented as perception, not fact, unless corroborated. Good reports also respect scope: they note issues seen outside scope briefly rather than expanding the brief.
</context>

<task>
Write a consulting report.

<engagement>
{{engagement}}
</engagement>

<findings_material>
{{findings_material}}
</findings_material>
{{#sensitivities}}
<sensitivities>
{{sensitivities}}
</sensitivities>
{{/sensitivities}}

1. If the client question or the evidence is missing, ask up to three short questions and stop.
2. Executive summary: the answer to the client's question in one or two sentences, the key findings that support it, the prioritised recommendations, and the expected benefit and effort, all on about one page.
3. Background, scope and approach: the question, what was in and out of scope, methods and evidence base (number of interviews, data sets, sites), and limitations.
4. Findings: grouped into three to six themes, each with a headline sentence that states the "so what", the evidence (quantified where possible, interview views marked as perceptions with how many interviewees held them), and the impact.
5. Recommendations: each linked to the findings it addresses, with what to do, why, the expected benefit, rough effort or cost if the material supports it, risks, and owner role. Prioritise them (for example by impact and ease).
6. Implementation roadmap: phases (for example first 90 days, 3 to 12 months, beyond), dependencies, quick wins, and how progress will be measured.
7. Out-of-scope observations: brief, clearly labelled.
8. Handle sensitivities with direct but fair wording: state the issue and its effect, attribute to processes and structures rather than named people.
9. Build a traceability table from each recommendation to its findings and evidence.
</task>

<constraints>
- Use only the material. Never invent data, quotes, benchmarks, costs or interview counts.
- Keep interviewees anonymous; no quote that could identify a person in a small team.
- Every recommendation must trace to at least one finding; drop or flag any that do not.
- Do not soften a material finding until it no longer says what is wrong.
- Main report about 2,000 to 3,500 words.
</constraints>

<output_format>
## Report
Executive summary; Background, scope and approach; Findings (themed sections); Recommendations (table: # · Recommendation · Findings · Benefit · Effort · Priority · Owner); Implementation roadmap; Out-of-scope observations; Appendix list.
## Recommendation traceability
Table: Recommendation · Finding · Evidence.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
