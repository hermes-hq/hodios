---
schema: 1
id: decide-whether-to-drop-course
kind: prompt
title: Decide whether to drop a course
description: Weighs dropping, withdrawing or staying in a struggling course against grades, deadlines, financial aid, visa and scholarship credit minimums, prerequisites and graduation timing.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text]
output: [table, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [course-withdrawal, add-drop, financial-aid, credit-load, academic-advising]
pairs_with:
  prompts: [recover-from-failed-midterm, calculate-grade-needed-on-final, plan-courses-to-graduation, plan-semester-workload]
args:
  - name: situation
    description: The course, how it is going (marks so far, what remains), why you are considering dropping, your total credits this term, and how this course fits your degree (required, prerequisite, elective).
    type: text
    required: true
  - name: policies
    description: Optional dates and rules you have found - drop deadline (no record), withdraw deadline (W on transcript), refund dates, late-withdrawal rules, repeat and grade-replacement rules.
    type: text
  - name: constraints
    description: Optional constraints - financial aid or loans, scholarship minimum credits or GPA, student visa full-time requirement, athletics eligibility, health insurance through enrolment, planned graduation date.
    type: text
output_contract:
  format: markdown
  sections: [Key dates, Options compared, Consequences to check, Recommendation, Who to ask before deciding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dropping a course looks like a simple grade decision but often is not. Before the drop deadline it usually leaves no mark on the transcript; after it, a withdrawal usually shows as a W, which rarely matters once but matters as a pattern. The bigger risks are elsewhere: falling below full-time status can affect financial aid, loan repayment start, scholarships, student visas (where international students commonly must stay full-time and need approval first), sports eligibility and insurance; withdrawing can trigger a repayment of aid; and dropping a prerequisite can delay graduation by a year if the course runs only once a year. Students also drop courses they could still pass, or stay in ones they will fail when a W would protect their GPA. Rules vary widely by country and institution, so the decision needs the student's own policies and a conversation with the right offices before the deadline.
</context>

<task>
Help the student decide whether to drop or withdraw.

<situation>
{{situation}}
</situation>
{{#policies}}
<policies>
{{policies}}
</policies>
{{/policies}}
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. List the key dates from the policies given (drop without record, withdraw with a W, refund cut-offs), marked "verify". If none are given, say finding them is the first step today.
2. Compare the options: stay and aim to pass, stay and take the likely grade, drop or withdraw, and where available switch to pass/fail or audit. For each, give the likely grade or transcript outcome, the GPA effect (with the arithmetic if marks were given), the workload freed, and the effect on graduation timing.
3. Check the consequences that commonly catch students out, using their constraints: full-time credit minimums for aid, loans, scholarships, visas, athletics and insurance; aid repayment on withdrawal; whether the course is a prerequisite and when it is next offered; the repeat policy. Mark each "applies", "may apply - check" or "does not apply".
4. Give a recommendation that follows from the comparison, with the condition that would change it (for example "stay if the instructor confirms the final can replace the midterm").
5. List who to ask before deciding and the exact question for each: academic adviser, instructor, financial aid office, international student office if on a visa, scholarship or athletics office.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state any institution's or country's deadlines, aid rules or visa rules as fact; describe them as common patterns to verify with the named office.
- If the student is on a student visa, say clearly not to drop below full-time before speaking to the international student office.
- If the reason is illness, a family emergency or a mental health crisis, mention medical or hardship withdrawal and extenuating circumstances processes, and support services.
- Do not push the decision; set out the trade-offs and the recommendation with its conditions.
</constraints>

<output_format>
## Key dates
## Options compared
A table: Option | Transcript | GPA effect | Workload | Graduation timing.
## Consequences to check
A table: Area | Status | What to ask.
## Recommendation
## Who to ask before deciding
</output_format>
