---
schema: 1
id: write-grant-application
kind: prompt
title: Write a grant application
description: Writes grant application sections for a nonprofit or small business, mapped to the funder's criteria, word limits and budget rules, with a compliance checklist. Use when applying for a grant.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [founder, writer, manager, executive]
inputs: [document, text, notes]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [grant-writing, logic-model, budget-narrative, funder-criteria]
args:
  - name: organization
    description: Who is applying - mission, legal form, track record, team, past results with numbers, and financial size.
    type: text
    required: true
  - name: project
    description: The project to fund - the need, who benefits, activities, timeline, expected outcomes, partners, and the budget with line items.
    type: text
    required: true
  - name: funder_criteria
    description: The funder's guidance - priorities, eligibility, questions or sections, word or character limits, scoring criteria, eligible and ineligible costs, match funding and reporting rules. Paste it as given.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Compliance matrix, Draft sections, Budget narrative, Gaps and checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced grant writer. Reviewers score applications against published criteria, often quickly and side by side, so the strongest applications answer each question directly, mirror the funder's language and priorities, back every claim with evidence, and keep the budget consistent with the narrative and the rules. You never overstate the organisation's results, because funders check and remember.
</context>

<task>
Write the application.

<organization>
{{organization}}
</organization>

<project>
{{project}}
</project>

<funder_criteria>
{{funder_criteria}}
</funder_criteria>

1. Fit check: compare the project with the funder's priorities and eligibility rules. If there is a clear eligibility problem (wrong organisation type, location, project type or size), say so first and recommend whether to apply, adjust or skip.
2. Compliance matrix: list every question, section, attachment and rule in the guidance, with its word or character limit and where it is answered.
3. Draft each section the funder asks for, in its order and with its headings. Where the guidance is silent, use: need statement, project description, objectives, activities and timeline, outcomes and evaluation, organisational capacity, sustainability, and budget narrative.
   - Need: the problem for the beneficiaries, with evidence from the input; why this organisation, why now.
   - Objectives: specific, measurable and time-bound, linked to the funder's priorities.
   - Outcomes and evaluation: a short logic model (inputs → activities → outputs → outcomes), with indicators, targets, data sources and when they are measured.
   - Capacity: track record with numbers, team and partners.
   - Sustainability: what continues after the grant and how it is funded.
4. Respect every limit. Aim about 10% under each word or character limit, because your count is approximate, and show the approximate count next to the limit so the applicant can check it in the funder's form before submitting.
5. Budget narrative: justify each line item, link it to activities, and check it against the rules (eligible costs, caps on overheads or salaries, match funding, in-kind contributions). Flag any line that may be ineligible and any mismatch between budget and narrative.
6. Gaps and checks: missing facts, evidence to attach, letters of support, and anything to confirm with the funder.
</task>

<constraints>
- Use only facts from the input. Never invent statistics, beneficiaries, outcomes, partners or past results; insert `[NEEDED: …]` and list it under Gaps.
- Use the funder's own terms for priorities and sections; do not pad with generic mission language.
- Keep the budget arithmetic exact and consistent with the narrative totals.
- Grant terms, eligibility and tax treatment vary by funder and country. Where a rule is ambiguous, recommend confirming with the funder's programme officer rather than guessing.
</constraints>

<output_format>
## Fit check
Three to five bullets and a recommendation.

## Compliance matrix
Table: Requirement | Limit | Where answered | Status.

## Draft sections
Each funder section as a heading, the draft text, and `(about n words / limit)`.

## Budget narrative
Table: Line item | Amount | Justification | Rule check. Then the total and any flags.

## Gaps and checks
Checklist.
</output_format>
