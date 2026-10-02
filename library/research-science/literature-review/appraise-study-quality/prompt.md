---
schema: 1
id: appraise-study-quality
kind: prompt
title: Appraise a study's risk of bias
description: Appraises a study's risk of bias with the tool that fits its design, such as RoB 2, ROBINS-I, CASP or Newcastle-Ottawa, justifying each judgement with quotes. For reviewers and practitioners.
category: literature-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [risk-of-bias, critical-appraisal, rob-2, robins-i, casp, evidence-synthesis]
pairs_with:
  prompts: [screen-studies, summarize-paper, build-literature-matrix, check-manuscript-reporting]
  personas: [research-methodologist]
args:
  - name: study
    description: The study's full text, or at least its methods and results, including the protocol or registration if you have it. An abstract alone is not enough for a real appraisal.
    type: text
    required: true
  - name: design
    description: The study design if you know it, for example "parallel RCT", "prospective cohort", "case-control", "interview study", "diagnostic accuracy". Leave empty to have it identified from the text.
    type: string
  - name: outcome
    description: The outcome or result you are appraising, for example "pain at 12 weeks". Risk of bias tools for trials judge one result at a time; if empty, the primary outcome is used.
    type: string
output_contract:
  format: markdown
  sections: [Design and tool, Domain judgements, Overall judgement, What would change the judgement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Critical appraisal asks how much a study's result can be trusted, and the right questions depend on the design. Risk-of-bias tools structure that judgement: RoB 2 for randomised trials (randomisation process, deviations from intended interventions, missing outcome data, measurement of the outcome, selection of the reported result; Low risk, Some concerns or High risk); ROBINS-I for non-randomised studies of interventions (confounding, selection of participants, classification of interventions, deviations from intended interventions, missing data, measurement of outcomes, selection of the reported result; Low, Moderate, Serious or Critical); the Newcastle-Ottawa Scale for cohort and case-control studies (selection, comparability, outcome or exposure); CASP or JBI checklists for qualitative and other designs; QUADAS-2 for diagnostic accuracy; AMSTAR 2 for systematic reviews. A judgement is only credible when it is tied to what the paper actually reports. Reporting quality and risk of bias are different things: a well-written paper can still be biased, and a poorly reported one gets "no information", not a guess.
</context>

<task>
Appraise this study{{#outcome}} for the outcome "{{outcome}}"{{/outcome}}.
{{#design}}Stated design: {{design}}{{/design}}
<study>
{{study}}
</study>

1. Identify the design from the methods (not from the title or the authors' label) and choose the tool. If the stated design and the methods disagree, say so and appraise the design actually used. If your review protocol specifies a tool or tool version, it overrides this choice.
2. If the tool judges one result at a time, name the result and, for trials, the effect of interest (assignment to the intervention, the usual intention-to-treat effect, unless the user says otherwise).
3. Go through every domain or checklist item of the tool. For each: the signalling questions or criteria you considered, the answer, the judgement, and a supporting quote from the text with its location. Where the paper is silent, write "no information" and say what you would need.
4. Give the overall judgement using the tool's own rule (for RoB 2 and ROBINS-I the overall risk is driven by the worst domain; for the Newcastle-Ottawa Scale give stars per section and the total, and note that totals hide which section failed).
5. Explain in plain words what the main risks mean for the result: in which direction the bias would push the estimate, if that can be reasoned, and how much it matters.
6. Say what information would change the judgement, such as a protocol, trial registration, or details on allocation concealment.
</task>

<constraints>
- Every judgement needs a quote or a precise pointer to the text. No quote, no judgement: use "no information" or "unclear".
- Do not reward or penalise on reputation, journal, sample size alone or statistical significance; these are not risk-of-bias domains.
- Paraphrase the tool's signalling questions rather than reproducing whole checklists, and tell the user to complete the official form for publication.
- Separate reporting gaps from evidence of bias.
- If only an abstract is provided, say an appraisal is not possible on that basis, list the information needed, and give at most a provisional view clearly labelled as such.
- Appraisal involves judgement; in a systematic review it should be done independently by two reviewers. Say so once.
</constraints>

<output_format>
## Design and tool
Design as identified, tool chosen and why, result and effect being appraised.
## Domain judgements
Table: domain or item | key questions considered | judgement | supporting quote (location).
## Overall judgement
One line with the overall rating, then two to four sentences on what it means for the result.
## What would change the judgement
Bullets.
</output_format>
