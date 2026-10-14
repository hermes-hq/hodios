---
schema: 1
id: write-feasibility-study
kind: prompt
title: Write a feasibility study
description: Writes a feasibility study for a new initiative, testing market, technical, operational, financial and legal viability against stated criteria and ending with a go, no-go or conditional view.
category: business-writing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [business-analyst, consultant, founder, manager]
requires: [none]
inputs: [notes, text, document, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [feasibility-study, viability, go-no-go, options-appraisal, new-initiative]
pairs_with:
  prompts: [write-project-proposal, write-decision-memo, write-executive-summary]
args:
  - name: initiative
    description: What is being considered, why, and for whom, for example "opening a second clinic in the north of the city" or "moving payroll in-house".
    type: text
    required: true
  - name: evidence
    description: Everything gathered so far, such as market data, quotes, cost estimates, capacity figures, regulatory notes, staff skills, risks and constraints, with sources.
    type: text
    required: true
  - name: decision_criteria
    description: What would make it a go, for example "payback under 3 years, no new hires before month 6". Leave empty and criteria will be proposed for you to confirm.
    type: text
  - name: country
    description: Country or region where it would run, since rules, costs and permits differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Feasibility study, Evidence gaps, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A feasibility study answers one question before money is committed: can this work, and under what conditions? Experienced analysts structure it around the dimensions that kill projects: market (is there demand at this price), technical (can it be built or delivered), operational (people, processes, suppliers, capacity), financial (cost, funding, break-even, sensitivity) and legal or regulatory (permits, licences, contracts). Weak studies are advocacy documents: they start from the answer, use the most optimistic number for everything, skip a sensitivity check, and hide the assumption that matters most. Strong ones set criteria up front, rate each dimension honestly, show what has to be true for a go, and say what evidence would change the verdict.
</context>

<task>
Write a feasibility study.

<initiative>
{{initiative}}
</initiative>

<evidence>
{{evidence}}
</evidence>
{{#decision_criteria}}
<decision_criteria>
{{decision_criteria}}
</decision_criteria>
{{/decision_criteria}}
{{#country}}Country or region: {{country}}{{/country}}

1. If the initiative is unclear or the evidence holds nothing to assess, ask up to three short questions and stop.
2. State the scope: what is in and out, the time horizon, and the decision criteria. If no criteria are given, propose three to five measurable ones and label them "proposed".
3. Assess each dimension (market, technical, operational, financial, legal and regulatory) with the evidence for and against, the key assumptions, and a rating: feasible, feasible with conditions, not feasible, or unknown. A dimension with no evidence is "unknown", not "feasible".
4. Financial: lay out costs, revenues or savings and the timing using only the evidence, compute simple measures that the figures allow (payback, break-even volume, cost per unit), and run a sensitivity check on the two assumptions the result depends on most (for example 20 percent lower demand or a 6-month delay).
5. Legal and regulatory: list the permits, licences, contracts or rules the evidence mentions or that this kind of initiative commonly needs in the stated country, and mark them for confirmation by a qualified adviser. Do not state specific legal requirements as fact.
6. Compare with at least one alternative, including not proceeding or a smaller pilot.
7. Give the verdict: go, no-go, or go with conditions, against each criterion, with the conditions that must be met and the assumption most likely to be wrong.
</task>

<constraints>
- Use only the evidence supplied. Never invent market sizes, prices, wages, permit names or timelines. Mark each gap `[NEEDED: …]`.
- Show working for every calculated figure.
- Be even-handed: if the evidence supports no-go, say so, even if the initiative's sponsor clearly wants a go.
- Keep the main body under about 2,000 words; put detailed tables after it.
</constraints>

<output_format>
## Feasibility study
Summary (verdict, three reasons, conditions); Scope and criteria; Assessment by dimension (each with evidence, assumptions, rating); Financial analysis with sensitivity table; Alternatives; Verdict against criteria (table: Criterion · Result · Met?); Key risks.
## Evidence gaps
Each gap, why it matters to the verdict, and how to close it.
## Next steps
What to do next for each possible verdict.
</output_format>
