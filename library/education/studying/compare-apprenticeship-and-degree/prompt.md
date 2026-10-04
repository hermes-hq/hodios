---
schema: 1
id: compare-apprenticeship-and-degree
kind: prompt
title: Compare an apprenticeship and a degree
description: Compares a specific apprenticeship and degree route for a school leaver on cost, earnings while learning, qualifications, career doors, lifestyle and fit, with the facts to verify locally.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [student, parent]
requires: [none]
inputs: [text, job-posting]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [school-leavers, career-pathways, student-finance, earn-and-learn]
pairs_with:
  prompts: [choose-degree-course, plan-university-application]
args:
  - name: options
    description: The specific apprenticeship (employer, role, level, length, wage, what qualification it leads to) and the specific degree (university, course, length, fees, placement year), pasted from the adverts or course pages if possible.
    type: text
    required: true
  - name: student_profile
    description: The student's interests, strengths, how they like to learn, career ideas, whether they want to move away, money situation and any worries.
    type: text
    required: true
  - name: country
    description: Country where the student would study or train, since fees, loans and apprenticeship systems differ.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [The two routes, Side by side, Money over five years, Doors opened and closed, Fit with this student, Facts to verify, Bottom line]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A school leaver, often with a parent, is choosing between a specific apprenticeship and a specific degree. Country: {{country}}. Comparisons go wrong when they argue about routes in general ("degrees are worth more") instead of these two options, compare fees with wages without the full picture (loan repayment terms, living costs, wage rises, what happens after the end date), forget that some careers require a degree or a regulated qualification, and ignore how the student actually learns and what life they want at 18-21. The decision belongs to the student; the job is to make the trade-offs visible and the facts checkable.
</context>

<task>
<options>
{{options}}
</options>

<student_profile>
{{student_profile}}
</student_profile>

1. Summarise each route: what the student does day to day, length, qualification and level at the end, and where it typically leads.
2. Compare side by side: entry requirements and competition, day-to-day learning (work plus off-the-job training vs lectures and independent study), workload and independence, qualification gained, support, location and lifestyle, and drop-out or "what if it does not work out" options (switching, deferring, topping up to a degree later).
3. Money over five years: for each route, fees and how they are paid, loans and how repayment works where the student lives, living costs, wages or income while learning, and expected position at the end. Use only figures supplied; put [X] for unknowns and say where to find them. Do not total things that are uncertain.
4. Doors: careers each route opens, careers that need a degree or a regulated qualification, and how easy it is to switch later.
5. Fit: match each route against the student's profile point by point.
6. List the facts to verify and where (the employer, the university course page, the national apprenticeship or student-finance service, a careers adviser).
7. Bottom line: say which route fits better on what the student said, and the two or three questions that would change the answer. The choice stays with the student.
</task>

<constraints>
{{> guardrails/professional-limits}}
- If the country is not stated, ask for it; meanwhile describe the comparison without country-specific rules.
- If either option is only a name or a vague label ("an apprenticeship at a big firm", "uni"), ask for the wage, length, qualification and fees, keep the money table to the rows you can fill, and do not pad the answer with [X] cells.
- Never invent wages, fees, loan terms, salaries after qualifying or employment rates. Mark unknowns [X].
- Do not present either route as better in general, and do not rank universities or employers by reputation.
- Address the student directly and respect their preferences, including if they differ from a parent's.
- Suggest a qualified careers adviser for a personalised decision.
{{> output/uncertainty}}
</constraints>

<output_format>
## The two routes
Two short paragraphs, one per route.

## Side by side
Table: Factor | Apprenticeship | Degree.

## Money over five years
Table: Year | Apprenticeship (costs, income) | Degree (costs, income). Unknowns as [X]. Then two lines on loan repayment as it works where the student lives, or [verify].

## Doors opened and closed
Bullets per route.

## Fit with this student
Table: What the student said | Points to which route | Why.

## Facts to verify
Table: Fact | Route | Where to check.

## Bottom line
Under 120 words, ending with the questions that would change the answer.
</output_format>
