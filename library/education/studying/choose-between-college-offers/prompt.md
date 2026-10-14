---
schema: 1
id: choose-between-college-offers
kind: prompt
title: Choose between college offers
description: Helps an admitted student decide between college or university offers on programme, fit, outcomes, cost and support, with a weighted comparison and the questions still to answer.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text, preferences]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [college-decision, university-offers, net-cost, campus-visit, decision-matrix]
pairs_with:
  prompts: [compare-financial-aid-offers, plan-university-application, prepare-for-university-start]
args:
  - name: offers
    description: Each offer you hold - the institution, programme or major, any conditions on the offer, the yearly cost after aid if you know it, and what you know about each (visit impressions, programme structure, location, size, outcomes data you found).
    type: text
    required: true
  - name: priorities
    description: What matters to you, roughly in order - for example cost and debt, a specific programme or research area, distance from home, campus size, support services, career outcomes, a sport or activity.
    type: text
    required: true
  - name: deadline
    description: Optional decision or deposit deadline, and the country or countries involved.
    type: string
output_contract:
  format: markdown
  sections: [What matters to you, Comparison, Weighted score, What the scores miss, Questions still to answer, Decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students choosing between offers often decide on ranking or prestige, a single good visit, or where their friends are going, and later regret ignoring the things that shape daily life and the years after: the actual programme content and flexibility, class sizes in the first year, the full four-year cost and debt, support services, and whether they can see themselves living there. Prestige matters less for most outcomes than students expect, while debt and fit matter more. A weighted comparison helps by making priorities explicit, but it should not decide alone: the student's honest reaction to the top-scoring option ("I feel disappointed") is information too. The useful output turns vague feelings into a clear comparison and a short list of questions that would settle the choice before the deadline.
</context>

<task>
Help the student choose between these offers.

<offers>
{{offers}}
</offers>

<priorities>
{{priorities}}
</priorities>
{{#deadline}}
Deadline and country: {{deadline}}
{{/deadline}}

1. Turn the priorities into 5 to 8 criteria with weights that sum to 100, and show them so the student can adjust. Include net cost and programme fit unless the student explicitly rules them out.
2. Compare the offers against each criterion using only what the student gave. Where information is missing, write "unknown" and add it to the questions; do not fill gaps with assumptions about a named institution.
3. Score each offer 1 to 5 per criterion with a one-line reason, and compute the weighted totals. Show how the result changes if the top two weights are swapped, so the student sees how sensitive it is.
4. Note what the scores miss: gut reaction, conditions on offers (grades to meet, a deposit that is non-refundable), whether a gap in cost could be narrowed by appealing an aid offer, and risks such as a programme that is hard to transfer into.
5. List the questions still to answer before deciding, with who to ask (admissions, the department, current students, the financial aid office) and by when, given the deadline.
6. Give a reasoned lean, with the condition that would change it, and remind the student that the choice is theirs and their family's.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state rankings, graduate earnings, acceptance rates or costs for named institutions unless the student supplied them; mark anything from general knowledge as "to verify".
- Do not treat prestige as a criterion unless the student lists it; if they do, show its weight like any other.
- Do not recommend taking on a specific amount of debt; show the cost differences and suggest checking loan terms with the aid office.
- Respect the student's priorities even where you would weigh them differently; say so once if a priority seems to be costing them a lot.
</constraints>

<output_format>
## What matters to you
A table: Criterion | Weight.
## Comparison
A table: Criterion | Offer A | Offer B | ...
## Weighted score
Scores, totals and the sensitivity check.
## What the scores miss
## Questions still to answer
A table: Question | Who to ask | By when.
## Decision
</output_format>
