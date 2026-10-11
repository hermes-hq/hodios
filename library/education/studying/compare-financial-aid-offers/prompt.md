---
schema: 1
id: compare-financial-aid-offers
kind: prompt
title: Compare financial aid offers
description: Compares college financial aid award letters line by line into net cost, grants versus loans, renewal conditions and the four-year cost, with questions to ask each aid office.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [document, text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [financial-aid, award-letters, net-cost, student-loans, scholarships]
pairs_with:
  prompts: [choose-between-college-offers, plan-scholarship-applications, write-university-admissions-email]
args:
  - name: offers
    description: Each award letter's lines as written - cost of attendance (tuition, fees, housing, food, books, transport, personal), every grant, scholarship, loan and work-study amount, and any conditions stated (GPA to renew, full-time enrolment, one-year only).
    type: text
    required: true
  - name: family_context
    description: Optional context - what the family can pay per year, whether the student will live at home, any outside scholarships, and the country.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Line by line, Net cost, Four-year view, Conditions and risks, Questions for each aid office]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Award letters are not standardised, and many make an offer look larger than it is: loans and work-study are listed alongside grants as "aid", some letters show only tuition rather than the full cost of attendance, and some subtract loans to show a misleadingly low "amount due". The number that matters is net cost: full cost of attendance minus gift aid (grants and scholarships that do not have to be repaid). Loans are borrowed money with interest; parent loans are the parent's debt; work-study is earned only if the student finds and works a job. Renewal conditions matter over four years: a scholarship that needs a 3.5 GPA, or a grant that is first-year only, can raise later costs, and tuition usually rises each year. Many aid offices will review an offer if circumstances changed or a comparable school offered more.
</context>

<task>
Compare these aid offers.

<offers>
{{offers}}
</offers>
{{#family_context}}
<family_context>
{{family_context}}
</family_context>
{{/family_context}}

1. State assumptions: the country, which cost items each letter includes or leaves out, and an estimate for any missing item, clearly marked. Use the same cost categories for every school so the comparison is fair.
2. Put every line of every offer into one table, classified as gift aid (grant, scholarship), self-help (federal or private loan, parent loan, work-study) or cost.
3. Compute for each school: total cost of attendance, total gift aid, net cost (cost minus gift aid), and the amount the family would still need to cover with savings, earnings or loans. Show the arithmetic.
4. Build a four-year view: net cost per year assuming the gift aid renews only if the letter says so, with an assumed yearly cost rise (state it, for example 3 to 5 percent, as an assumption), and total borrowing if the loans offered are taken every year.
5. List conditions and risks: renewal requirements, first-year-only awards, work-study that may not materialise, parent loans, and anything unclear.
6. Write specific questions for each aid office: what is renewable and on what terms, whether outside scholarships reduce their aid, whether they will review the offer (and what documentation they need), and payment plan options.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only figures from the letters and the family's context; mark every estimate. Do not state any school's costs, policies or loan rates from general knowledge.
- Never count loans or work-study as reducing the cost; show them as ways to pay.
- Do not recommend a specific loan or a borrowing amount; show the totals and suggest talking to the aid office and, for large borrowing, an independent adviser.
- If a letter is too incomplete to compare (no cost of attendance), say so and list what to ask for.
</constraints>

<output_format>
## Assumptions
## Line by line
A table: School | Item | Amount | Type (gift, loan, work-study, cost).
## Net cost
A table: School | Cost of attendance | Gift aid | Net cost | Still to cover.
## Four-year view
A table: School | Year 1 | Year 2 | Year 3 | Year 4 | Total | Total borrowing if loans taken.
## Conditions and risks
## Questions for each aid office
</output_format>
