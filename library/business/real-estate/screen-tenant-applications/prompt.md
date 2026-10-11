---
schema: 1
id: screen-tenant-applications
kind: prompt
title: Screen tenant applications fairly
description: Sets written screening criteria for a rental and scores each applicant against them the same way, with the checks to run, the fair-housing pitfalls to avoid and a decision note for the file.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, operations-manager]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [checklist, table, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [landlord, tenant-screening, fair-housing, referencing, letting]
pairs_with:
  prompts: [check-landlord-obligations, write-rental-listing]
  personas: [property-manager]
args:
  - name: property
    description: The rental - type, rent, bedrooms, any rules that legitimately limit occupancy (maximum occupants, no smoking), and the date it is available.
    type: text
    required: true
  - name: applicants
    description: What each applicant has told you or provided - income and its source, employment, rental history and references, credit or referencing results, household size, move-in date, guarantor. Use initials or labels, not full names.
    type: text
  - name: country
    description: Country and state or region of the property. Screening, anti-discrimination and data-protection rules differ a lot by place.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Screening criteria, Checks to run, Applicant comparison, Decision note, Fairness and legal checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small landlord or letting manager choose a tenant the way a careful lettings professional does. The two failures that cost landlords most are opposite ones: letting on a good feeling without checking anything, and screening inconsistently, so that one applicant gets questions or demands another does not. Inconsistent screening is how discrimination claims start, even when nobody meant it. The defence is boring and effective: write the criteria down before reading applications, apply them in the order applications arrive, use the same checks for everyone, and keep a short note of why each decision was made. Affordability is usually judged on verified income against rent (a common rule of thumb is gross income around 2.5 to 3 times the rent, but local norms and law vary, and some places restrict how income or benefits may be counted). Past landlord references are most useful when they come from a landlord with no reason to want the tenant gone, so a previous landlord often tells you more than the current one.

Property: {{property}}
Location: {{country}}
</context>

<task>
{{#applicants}}
Applicants so far:

<applicants>
{{applicants}}
</applicants>
{{/applicants}}

1. Write screening criteria for this property before judging anyone: minimum affordability measure, acceptable income evidence, rental history requirement, what a referencing or credit result must show, guarantor rules if used, occupancy limit tied to the property, and move-in window. Each criterion must be about ability to pay and look after the home, never about who the person is.
2. List the checks to run for every applicant, in order: identity and any right-to-rent or similar legal check that applies in {{country}} (marked to verify), income evidence, employer or accountant confirmation, previous and current landlord references with the questions to ask, referencing or credit check with written consent, and viewing or interview questions that are the same for all.
3. If applicants are given, compare them in a table against each criterion: meets, does not meet, or unknown, with what is still missing. Do not rank on anything outside the criteria.
4. Recommend the next step for each applicant: proceed, request missing evidence, or decline against a named criterion. Where two applicants both meet everything, say that the usual fair approach is first complete application wins, unless local law sets another rule.
5. Write a short decision note template the landlord keeps on file: date, criteria used, checks done, outcome and the reason tied to a criterion.
6. List fairness and legal points to check locally: protected characteristics under local anti-discrimination law (commonly including race, religion, sex, disability, family status and, in many places, source of income or receipt of benefits), rules on holding deposits and fees, limits on credit or criminal-record checks, data-protection duties for keeping and deleting applicant documents, and reasonable adjustments for disabled applicants.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never use, suggest or infer criteria based on race, ethnicity, nationality beyond a legal right-to-rent check, religion, sex, sexual orientation, disability, age, pregnancy, having children, or receiving benefits where that is protected. If the landlord asks for one, decline that part, explain the risk briefly and offer a lawful criterion that addresses the real concern (for example affordability instead of "no benefits").
- Do not state legal thresholds, fees or check requirements as fact for {{country}}; mark them `[CHECK locally]`.
- Do not invent applicant details. Treat missing evidence as unknown, not as a fail.
- Keep applicant data minimal: refer to applicants by the labels given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Screening criteria
Numbered criteria, each with how it is evidenced.

## Checks to run
Ordered checklist, the same for every applicant, including reference questions.

## Applicant comparison
Table: criterion by applicant, with meets, does not meet or unknown, then next step per applicant. Write "No applicants supplied yet" if none were given.

## Decision note
A fill-in template for the file.

## Fairness and legal checks
Bullets to verify in {{country}}, each marked `[CHECK locally]`.
</output_format>
