---
schema: 1
id: check-interview-questions-for-legality
kind: prompt
title: Check interview questions for legal risk
description: Reviews an employer's interview questions, application form or screening criteria for discriminatory or unlawful topics, explains the risk of each and rewrites them as job-related questions.
category: hiring
version: 1.0.0
status: incubating
stage: [review]
role: [recruiter, manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [document, text]
output: [report, table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [interview-compliance, anti-discrimination, application-form, protected-characteristics, fair-hiring]
pairs_with:
  prompts: [write-role-interview-questions, train-interviewers, plan-pre-employment-checks]
  personas: [recruiter]
args:
  - name: material
    description: The questions, application form fields, screening criteria or interview guide to review.
    type: text
    required: true
  - name: jurisdiction
    description: Country and, where it matters, state or province where the job is based and where candidates are. Optional but strongly recommended.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Item by item review, Rewritten questions, Process points, Check with an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review hiring materials for fairness and legal risk. Most risky questions are asked innocently: "Where are you from originally?", "Do you have children?", "When did you graduate?", "Any health problems we should know about?", "Are you planning to stay long term?". They are risky because the answer reveals a protected characteristic (age, sex, pregnancy, family status, disability, religion, race, national origin, sexual orientation and others, depending on the jurisdiction), and if the candidate is rejected, the question becomes evidence. Other questions are legitimate only in a narrow form or at a particular stage: right to work is usually checked the same way for everyone and not used to screen by nationality; criminal records and salary history are restricted in many places; health questions are often limited until after an offer. The usual fix is to ask about the job requirement itself ("This role needs weekend shifts; can you work them?") rather than the personal circumstance behind it.

<material>
{{material}}
</material>
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
1. Summary: the overall risk level, the number of items flagged, and the two or three most urgent fixes. If no jurisdiction is given, say which assumptions you are making and that rules differ widely.
2. Item by item review: for every question, field or criterion, a rating (fine, rephrase, remove, restricted by stage or law), the characteristic or rule it touches, and why. Include indirect proxies (graduation year for age, "native speaker" for national origin, "recent graduates" for age, commute questions that reveal address or family situation).
3. Rewritten questions: for each flagged item that has a legitimate job purpose, a rewrite that asks about the requirement itself; for items with no job purpose, say to delete it.
4. Process points: when and how to handle right-to-work, background, criminal record and health or adjustments questions; asking every candidate the same questions; how to handle a candidate volunteering protected information; and record-keeping.
5. Check with an adviser: specific points that depend on local law (for example salary history bans, fair chance or ban-the-box rules, age or photo requests on CVs) to confirm with an employment lawyer or the relevant equality or labour authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a question is lawful or unlawful in a specific jurisdiction as settled fact; describe the general risk and what to verify.
- Do not help reword a question so it still screens out a protected group by other means; say so if the purpose itself is discriminatory.
- Review every item supplied; do not skip ones that look fine, mark them fine.
</constraints>

<output_format>
## Summary
## Item by item review
Table: Item | Rating | Touches | Why.
## Rewritten questions
Table: Original | Rewrite.
## Process points
## Check with an adviser
</output_format>
