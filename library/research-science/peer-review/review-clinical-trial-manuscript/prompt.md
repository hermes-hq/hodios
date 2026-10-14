---
schema: 1
id: review-clinical-trial-manuscript
kind: prompt
title: Referee a randomised controlled trial manuscript
description: Referees a randomised trial manuscript on randomisation, allocation concealment, blinding, intention-to-treat, outcomes against the registry, harms and CONSORT completeness, with a recommendation.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
subject: [medicine, healthcare]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [randomised-trials, consort, risk-of-bias, clinical-research, manuscript]
pairs_with:
  prompts: [check-outcome-switching, review-statistical-methods, check-manuscript-reporting]
  personas: [peer-reviewer]
args:
  - name: manuscript
    description: The trial manuscript, including the flow diagram, baseline table, outcome tables and supplementary material if available.
    type: text
    required: true
  - name: registry_entry
    description: Optional. The trial registration record or protocol (primary and secondary outcomes, sample size, analysis plan), pasted.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Risk of bias by domain, Outcomes and analysis, Harms, Interpretation and generalisability, CONSORT items missing, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A randomised trial is only as good as the things that protect randomisation after it happens. Experienced trial referees check, domain by domain as in the Cochrane risk-of-bias tool (RoB 2): how the sequence was generated and whether allocation was concealed until assignment (opaque envelopes and open lists can be subverted); baseline imbalance beyond chance; who was blinded (participants, clinicians, outcome assessors, analysts) and whether the outcome is subjective enough for unblinding to matter; deviations from the intended intervention; missing outcome data and whether it differs by arm; and selective reporting, by comparing outcomes and analyses with the registry and protocol. Common problems are a "modified intention-to-treat" population that excludes people after randomisation, a primary outcome switched or demoted, a sample-size calculation built on an implausibly large effect, many secondary outcomes reported as positive findings, subgroup claims without an interaction test, harms reported less carefully than benefits, relative effects without absolute effects, and conclusions that go beyond the primary outcome. The CONSORT statement lists what a trial report must contain; extensions cover cluster, non-inferiority, pragmatic and other designs.
</context>

<task>
Referee this trial manuscript.
<manuscript>
{{manuscript}}
</manuscript>
{{#registry_entry}}
<registry_entry>
{{registry_entry}}
</registry_entry>
{{/registry_entry}}

1. Summarise the question (population, intervention, comparator, primary outcome, time point), the design (parallel, cluster, crossover, non-inferiority) and the main result with its absolute and relative effect.
2. Assess risk of bias by domain: randomisation and concealment, deviations from intended intervention and blinding, missing outcome data, outcome measurement, and selection of the reported result. Say low, some concerns or high for each, with the evidence from the text.
3. Check the outcomes and analysis: primary outcome and analysis against the registry or protocol, analysis population, sample size and achieved power, handling of missing data, multiplicity in secondary and subgroup analyses, and design-specific needs (clustering, non-inferiority margin, carry-over).
4. Check harms: how adverse events were collected, whether they are reported by arm with numbers, and whether serious events and withdrawals due to harms are clear.
5. Judge whether the conclusions match the primary result, and how far the trial population and setting generalise.
6. List missing CONSORT items, using the extension that fits the design.
7. Make a recommendation that follows from the major issues.
</task>

<constraints>
- Ground every issue in the manuscript: section, table, figure or line, and propose what would resolve it.
- If no registry entry was supplied, ask the authors to state the registration and compare it; do not assume outcomes were switched.
- Do not invent numbers or recompute results you cannot verify from the text; ask for the analysis instead.
- This is a manuscript review, not clinical guidance; do not recommend treatments.
- Stay respectful and impersonal. Raise suspected misconduct only in confidential comments, with evidence.
- Start with one line reminding the reviewer to keep the manuscript confidential and to check the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
## Risk of bias by domain
Table: domain | judgement | evidence from the manuscript | request to authors.
## Outcomes and analysis
Numbered issues: location, problem, why it matters, what would resolve it.
## Harms
## Interpretation and generalisability
## CONSORT items missing
Bullets with the item.
## Recommendation
Accept, minor revision, major revision or reject, with the deciding reasons.
</output_format>
