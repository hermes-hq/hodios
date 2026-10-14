---
schema: 1
id: review-qualitative-manuscript
kind: prompt
title: Review a qualitative research manuscript
description: Reviews a qualitative manuscript on its own terms, judging methodological coherence, sampling, reflexivity, analysis, whether quotes support themes, and transferability claims.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
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
tags: [qualitative-research, thematic-analysis, reflexivity, coreq, srqr, manuscript]
pairs_with:
  prompts: [write-peer-review, check-manuscript-reporting, run-thematic-analysis]
  personas: [peer-reviewer, research-methodologist]
args:
  - name: manuscript
    description: The manuscript, including methods, findings with quotations, and any supplementary material such as the interview guide.
    type: text
    required: true
  - name: methodology
    description: The stated approach if you want to set it explicitly, for example "reflexive thematic analysis", "interpretative phenomenological analysis" or "grounded theory".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Methodological coherence, Major issues, Minor issues, Reporting, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Qualitative manuscripts are often reviewed badly by people trained in quantitative work: they ask for larger samples, statistical generalisability, inter-rater reliability scores or "saturation" regardless of the approach, which can be wrong for the methodology. Reflexive thematic analysis, for example, does not aim for coder agreement and treats saturation as a poor fit; IPA uses small homogeneous samples on purpose; grounded theory expects theoretical sampling and constant comparison. The useful questions are about coherence (do the research question, philosophical stance, sampling, data collection and analysis fit together?), transparency (can a reader see how themes were built?), reflexivity (how the researchers' position shaped the work), whether themes are analytic claims rather than topic summaries, whether quotations support the claims and come from across participants, and whether the authors claim transferability honestly. Common real flaws are themes that are just the interview questions, a method named but not followed, and conclusions that count heads as if the sample were representative.
</context>

<task>
Review this qualitative manuscript{{#methodology}}, which uses {{methodology}}{{/methodology}}.
<manuscript>
{{manuscript}}
</manuscript>

1. Summarise the question, the approach, the participants and setting, and the main themes or findings in your own words.
2. Judge methodological coherence: whether the question, stated paradigm, sampling strategy, data collection and analysis method belong together, and whether the method named is the method actually described.
3. Check sampling and data: recruitment, who is missing, the rationale for sample size given the approach, and the depth of the data (interview length, field time).
4. Check analysis transparency: how codes became themes, who analysed, how disagreement or alternative readings were handled, and whether an audit trail or codebook is described.
5. Check findings: whether each theme is an interpretive claim rather than a topic label or a mirror of the interview guide, whether quotations support the claim, whether quotes are spread across participants, and whether disconfirming cases are discussed.
6. Check reflexivity, ethics (consent, identifiability of quotes in small communities) and the honesty of claims about transferability.
7. Name the reporting guideline that applies (COREQ for interviews and focus groups, SRQR more broadly) and note important missing items.
8. Recommend accept, minor revision, major revision or reject, following from the major issues.
</task>

<constraints>
- Judge the work against its own stated methodology. Do not request statistical generalisability, larger samples, inter-rater reliability or saturation unless the chosen approach calls for them; if you think the approach itself is wrong for the question, argue that directly.
- Every issue names a location and a concrete request.
- Do not invent quotations, participant details or method steps not in the text.
- If the methodology is unnamed or mixed, say what you inferred and review against that.
- Start with one line reminding the reviewer that the manuscript is confidential and to check the venue's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
One paragraph.
## Methodological coherence
Three to six sentences.
## Major issues
Numbered: location, problem, why it matters, what would resolve it.
## Minor issues
Numbered, one or two lines each.
## Reporting
The guideline, and missing items.
## Recommendation
The recommendation and the deciding reasons.
</output_format>
