---
schema: 1
id: estimate-immigration-points-score
kind: prompt
title: Estimate an immigration points score
description: Tallies a person's score against a points-based migration grid they paste, factor by factor with the evidence each claim needs, and shows which realistic changes would add points and when.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, student]
subject: [law]
requires: [none]
inputs: [text, document]
output: [table, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [points-test, skilled-migration, points-calculator, express-entry, eligibility-check]
pairs_with:
  prompts: [compare-visa-routes, match-job-to-occupation-code, write-employment-experience-letter]
  personas: [legal-information-guide]
args:
  - name: points_grid
    description: The official points table for the programme, pasted with its date, including age bands, language levels, education, experience and any extra factors.
    type: text
    required: true
  - name: profile
    description: Your date of birth or age at the planned application date, language test results or expected level, qualifications, years of skilled work and where, partner's details if they count, and any job offer or nomination.
    type: text
    required: true
  - name: target
    description: The pass mark or recent invitation scores, if you know them, and when you plan to apply. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Score breakdown, Claims that need checking, Ways to add points, Timing risks, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Points systems look like simple arithmetic but trip people up in the details: age points are usually assessed on a specific date (often the date of invitation or application), so a birthday can cost points; experience may count only if it is skilled, paid, full time and in the nominated occupation, and sometimes only after a qualification or a skills assessment date; language points depend on the lowest band in each skill, not the average; and a partner's skills or a job offer may add points only if strict conditions are met. Pass marks are minimums, and in invitation systems the score actually needed moves with each round. Claiming points that cannot be proved can lead to refusal for misrepresentation.

<points_grid>
{{points_grid}}
</points_grid>

<profile>
{{profile}}
</profile>
{{#target}}
<target>
{{target}}
</target>
{{/target}}
</context>

<task>
1. Score breakdown: go factor by factor through the grid, apply the person's details, and show the points with the rule from the grid that gives them. Total the score.
2. Claims that need checking: each claim that depends on a condition the profile does not confirm (for example whether experience is skilled and in the occupation, the assessment date for age, the lowest language band) and the evidence needed to prove it.
3. Ways to add points: realistic changes (a higher language score, a completed qualification, more months of experience, a partner's test, a nomination) with the points each adds and the earliest date it could apply.
4. Timing risks: birthdays that drop age points, results or assessments that expire, and grid changes.
5. What to confirm: points to check on the official source or with a regulated adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Score only from the grid supplied. Do not use points values from memory; if the grid is missing a factor, say so.
- Never say the person will be invited or granted; say how the score compares with the target given.
- Do not suggest claiming points that cannot be evidenced.
- Show assumptions where the profile is unclear, and give the score as a range if needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Score breakdown
Table: Factor | Your detail | Points | Grid rule. Then the total or range.
## Claims that need checking
Table: Claim | Condition | Evidence.
## Ways to add points
Table: Change | Points added | Earliest date | Effort.
## Timing risks
## What to confirm
</output_format>
