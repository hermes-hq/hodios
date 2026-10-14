---
schema: 1
id: write-pilot-results-report
kind: prompt
title: Write a pilot results report
description: Writes the evaluation report at the end of an operational or service pilot, with success criteria against results, what was learned, costs, limitations and a scale, adjust or stop recommendation.
category: business-writing
version: 1.0.0
status: incubating
stage: [verify, review]
role: [project-manager, operations-manager, product-manager, manager]
requires: [none]
inputs: [dataset, notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [pilot-evaluation, success-criteria, scale-decision, lessons-learned, trial-results]
pairs_with:
  prompts: [plan-service-pilot, write-decision-memo, write-project-closeout-report]
args:
  - name: pilot_plan
    description: What was piloted, where, for how long, and the success criteria or targets set at the start.
    type: text
    required: true
  - name: results
    description: What happened, such as measured results, comparison figures, costs, feedback from staff and users, incidents and anything that went differently from plan.
    type: text
    required: true
  - name: decision_owner
    description: Who decides what happens next and what they care about. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Pilot report, Caveats, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pilot exists to reduce uncertainty before a bigger commitment, so the report is judged on whether it lets someone make that decision honestly. Pilots are usually run by the people who want them to succeed, and reports drift into advocacy: criteria get quietly changed after the fact, the best site's result is reported as the average, extra attention from the pilot team (the novelty effect) is ignored, costs exclude the team's own time, and a comparison with business-as-usual is missing. Evaluators insist on judging results against the criteria set at the start, showing the comparison, separating what was learned from what was proven, costing the scaled version and not just the pilot, and offering three options: scale, adjust and re-test, or stop.
</context>

<task>
Write a pilot results report{{#decision_owner}} for {{decision_owner}}{{/decision_owner}}.

<pilot_plan>
{{pilot_plan}}
</pilot_plan>

<results>
{{results}}
</results>

1. If there are no results to report, ask in one short message and stop. If no success criteria were set at the start, say so plainly in the summary and judge against reasonable criteria labelled "set after the pilot".
2. Summary: what was tested, the headline result against each criterion, and the recommendation.
3. Results against criteria: a table with criterion, target, result, met or not, and the comparison or baseline. Show calculations.
4. What was learned: operational lessons, user and staff feedback (with counts where given), and surprises.
5. Costs: pilot cost and, if the figures allow, an estimate of the cost at scale; mark unknowns.
6. Limitations: sample size, duration, site selection, novelty effect, data quality, anything that limits how far the results generalise.
7. Options: scale up, adjust and re-test, or stop, each with conditions, cost, risk and what would need to be true. Recommend one and say what evidence would change the recommendation.
8. If scaling is recommended, list what must change from the pilot set-up before scaling.
</task>

<constraints>
- Use only the data given. Never invent results, percentages, costs or quotes.
- Judge against the original criteria; if any were changed during the pilot, say so and show both.
- Do not round a mixed result into a success. If a criterion was missed, say so in the summary.
- Under about 1,200 words.
</constraints>

<output_format>
## Pilot report
Summary; Criteria vs results (table); What we learned; Costs; Options (table: Option · Conditions · Cost · Risk); Recommendation; Before scaling.
## Caveats
Limitations that affect confidence in the results.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
