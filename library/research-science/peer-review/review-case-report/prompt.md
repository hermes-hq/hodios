---
schema: 1
id: review-case-report
kind: prompt
title: Review a clinical case report manuscript
description: Reviews a submitted clinical case report for what it teaches, diagnostic reasoning, alternative explanations, causality claims, patient consent and identifiability, and the CARE checklist.
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
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [case-report, care-guideline, clinical-research, patient-consent, manuscript]
pairs_with:
  prompts: [write-peer-review, check-manuscript-reporting]
  personas: [peer-reviewer]
args:
  - name: case_report
    description: The case report manuscript, including the timeline, figures described or pasted, and the consent statement.
    type: text
    required: true
  - name: journal_type
    description: The journal's focus and article type, for example "general medicine journal, educational case series section".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Value of the case, Clinical reasoning and alternative explanations, Consent and confidentiality, CARE items missing, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Case reports are the entry point to publishing for many clinicians and are often reviewed lightly, yet they are where unusual adverse drug reactions and new presentations first appear. The key questions are what the case teaches (a new disease or reaction, an unusual presentation, a diagnostic pitfall, an unexpected treatment effect) and whether that lesson is supported. Common weaknesses are claiming "the first reported case" without a documented search, attributing an adverse event to a drug without considering timing, dechallenge, rechallenge, alternative causes or a causality scale such as the Naranjo algorithm, a missing timeline, outcomes without follow-up, and a long literature review in place of a focused discussion. Consent matters more than in other article types: patients can be identified from a rare condition plus place and dates even without a name, and most journals require written consent for publication.
</context>

<task>
Review this case report{{#journal_type}} for {{journal_type}}{{/journal_type}}.
<case_report>
{{case_report}}
</case_report>

1. Summarise the case and the lesson the authors claim it teaches.
2. Judge the value: whether the case is genuinely new or instructive, and whether a novelty claim is backed by a described literature search.
3. Check the clinical reasoning: the timeline, the investigations, the differential diagnosis, and alternative explanations the authors did not exclude. For a suspected adverse reaction, check timing, dechallenge, rechallenge and the use of a causality assessment.
4. Check outcome and follow-up, and whether the discussion stays focused on the lesson and its limits (a single case cannot establish efficacy or incidence).
5. Check consent and confidentiality: a statement of written consent for publication, and whether details or images could identify the patient.
6. List missing CARE checklist items.
7. Recommend accept, minor revision, major revision or reject.
</task>

<constraints>
- This is a review of a manuscript, not clinical advice; do not recommend treatment for the patient described.
- Do not confirm or deny "first reported case" claims from memory; ask for the search to be documented.
- Treat missing or unclear consent as a major issue, and flag identifying details without repeating them in the report.
- Do not invent lab values, dates or findings not in the manuscript.
- Remind the reviewer that the manuscript is confidential and to check the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary
## Value of the case
## Clinical reasoning and alternative explanations
Numbered issues, each with a request.
## Consent and confidentiality
## CARE items missing
Bullets.
## Recommendation
One line, then the deciding reasons.
</output_format>
