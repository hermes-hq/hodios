---
schema: 1
id: review-systematic-review-manuscript
kind: prompt
title: Referee a systematic review or meta-analysis
description: Referees a submitted systematic review or meta-analysis, checking protocol and registration, search, selection, risk of bias, pooling choices, heterogeneity, certainty of evidence and spin.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [systematic-review, meta-analysis, prisma, amstar, risk-of-bias, grade, manuscript]
pairs_with:
  prompts: [write-peer-review, check-manuscript-reporting, review-statistical-methods, appraise-study-quality]
  personas: [peer-reviewer, statistician]
args:
  - name: manuscript
    description: The review manuscript with methods, search strategy, PRISMA flow, study tables, forest plots described or pasted, and supplementary files if available.
    type: text
    required: true
  - name: registration_record
    description: The registered protocol (for example PROSPERO or OSF) text, if available, to compare against the manuscript.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Critical domains, Major issues, Minor issues, Do the conclusions follow, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many published systematic reviews are redundant or flawed, so referees have to look past a tidy PRISMA diagram. AMSTAR 2 names the critical weaknesses: no protocol registered before the review, an inadequate search, no justification for excluded studies, no assessment of risk of bias in individual studies or no account of it in interpretation, inappropriate meta-analytic methods, and no assessment of publication bias. Other frequent problems are pooling studies too different to combine, fixed-effect models despite obvious heterogeneity, I² reported but unexplained, double counting of participants from multi-arm trials or overlapping cohorts, outcome or analysis choices that drift from the protocol, small-study effects ignored, conclusions that overlook certainty of evidence (GRADE), and abstracts that oversell. A reviewer should also ask whether the review is needed given existing reviews on the same question.
</context>

<task>
Referee this systematic review.
<manuscript>
{{manuscript}}
</manuscript>
{{#registration_record}}
<registration>
{{registration_record}}
</registration>
{{/registration_record}}

1. Summarise the review question (PICO or equivalent), the eligible designs, number of studies and participants, and the main pooled findings.
2. Assess each AMSTAR 2 critical domain: protocol registered in advance and deviations explained; comprehensiveness of the search (databases, grey literature, dates, language limits, full strategy reported); list of excluded studies with reasons; risk-of-bias assessment with a suitable tool; appropriate synthesis methods; risk of bias considered in interpretation; publication bias assessed.
3. Compare the manuscript with the registration if provided: changes to outcomes, eligibility or analysis, and whether they are declared.
4. Check the synthesis: whether pooled studies are similar enough, model choice, heterogeneity statistics and their exploration, unit-of-analysis problems, double counting, and sensitivity analyses excluding high-risk studies.
5. Check certainty: whether GRADE or an equivalent was applied and whether the abstract and conclusions match it.
6. Check that numbers in the abstract, flow diagram, tables and text agree.
7. Recommend accept, minor revision, major revision or reject.
</task>

<constraints>
- Judge only from the manuscript and registration provided. Do not claim that specific studies were missed unless you can name them from the text; instead ask the authors to justify search limits.
- Distinguish critical flaws (that undermine the conclusions) from non-critical ones, following AMSTAR 2's logic.
- Every issue names a location and a request the authors can meet.
- Do not invent effect sizes, I² values or study counts; recompute only from figures the manuscript reports, and show the working.
- Start with one line reminding the reviewer that the manuscript is confidential and to check the venue's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
One paragraph.
## Critical domains
A table: domain | met, partly met or not met | evidence from the manuscript.
## Major issues
Numbered: location, problem, why it matters, request.
## Minor issues
Numbered.
## Do the conclusions follow
Claim by claim, with the certainty of evidence.
## Recommendation
The recommendation and deciding reasons.
</output_format>
