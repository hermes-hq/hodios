---
schema: 1
id: plan-replication-study
kind: prompt
title: Plan a replication study
description: Plans a direct or conceptual replication of a published finding, with the original's details, author contact, power, success criteria fixed in advance and neutral reporting.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [replication, reproducibility, open-science, preregistration, registered-report]
pairs_with:
  prompts: [write-preregistration, calculate-sample-size, request-research-data-from-authors, design-research-study]
  personas: [research-methodologist, statistician]
args:
  - name: original
    description: The original study's methods and results (or its full text), including sample, materials, procedure, analysis and the key effect with its statistics.
    type: text
    required: true
  - name: goal
    description: Why you want to replicate it and what resources you have (participants, time, lab or online, budget).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Type of replication, Original study profile, Departures from the original, Sample size, Success criteria, Procedure and registration, Reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Replications test whether a finding holds when the study is done again. A direct (close) replication repeats the original procedure as faithfully as possible; a conceptual replication tests the same claim with different methods. Each answers a different question, and mixing them makes a failed result uninterpretable. Experts profile the original carefully (often contacting the authors for materials and details), list every unavoidable departure and judge whether it could matter, and plan power for the replication, not the original effect size, because published effects are inflated by selection: approaches include powering for a fraction of the original effect, the small-telescopes approach (could the original have detected this effect with its sample), or a smallest effect of interest. Success criteria are fixed in advance, using more than "p < .05 again": the replication effect and CI compared with the original, equivalence tests, or Bayes factors. Registered Reports suit replications well because acceptance does not depend on the result.
</context>

<task>
Plan a replication of:
<original>
{{original}}
</original>
Goal and resources: {{goal}}

1. Recommend direct or conceptual replication (or a reproduction of the analysis from shared data first) given the goal, and state the claim being tested in one sentence.
2. Profile the original: design, population, materials, procedure, exclusion rules, analysis and key effect with statistics. List missing details and what to request from the authors.
3. List departures (population, language, setting, era, online versus lab, materials translation) with a judgement of whether each could plausibly change the effect and how to minimise it.
4. Plan the sample size with at least two approaches, showing assumptions, and say which to use given resources. Say clearly if resources cannot support an informative replication.
5. Define success criteria before data collection: the primary test, the interpretation of each possible outcome (consistent, smaller, null with equivalence, inconclusive), and positive controls or manipulation checks that show the procedure worked.
6. Plan procedure, materials preparation, a pilot if needed, preregistration or a Registered Report route, and data and code sharing.
7. Plan reporting: a comparison table original versus replication, and neutral language for any outcome.
</task>

<constraints>
- Do not power for the original effect size alone; explain why.
- Do not invent missing method details; list them as requests.
- Use neutral language; a failed replication does not prove the original was wrong or fraudulent, and a success does not prove the theory.
- If original authors are contacted, keep the tone collegial and record their input.
</constraints>

<output_format>
## Type of replication
Recommendation and the claim tested.
## Original study profile
A table: element | original | source or "request from authors".
## Departures from the original
A table: departure | could it matter | mitigation.
## Sample size
Approaches, assumptions and the chosen n.
## Success criteria
Primary test and an outcome interpretation table.
## Procedure and registration
Bullets.
## Reporting
Comparison table template and wording guidance.
</output_format>
