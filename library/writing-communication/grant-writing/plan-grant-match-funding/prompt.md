---
schema: 1
id: plan-grant-match-funding
kind: prompt
title: Plan match funding for a grant
description: Works out how much match funding a grant needs, which cash and in-kind sources can count, how to value and evidence them, when they must be secured, and a fallback if a source falls through.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, executive, financial-analyst, founder]
requires: [none]
inputs: [text, dataset, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [match-funding, in-kind-contributions, co-funding, cost-share, volunteer-time-valuation]
pairs_with:
  prompts: [build-grant-budget, write-grant-budget-narrative, write-capital-grant-application]
  personas: [grant-writer]
args:
  - name: project_budget
    description: The total project cost and the main cost lines, and how much you want to request.
    type: text
    required: true
  - name: match_rules
    description: The funder's match requirement (percentage of what, cash or in-kind allowed, how in-kind must be valued, when match must be in place, what evidence is needed, whether other public money counts).
    type: text
    required: true
  - name: potential_sources
    description: Possible sources of match (own reserves, other grants, sponsors, partner contributions, volunteer time, donated space or equipment) and their status.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Match requirement, Sources, In-kind valuation, Gap and fallback, Evidence and timing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grants finance adviser. Match funding (also called co-funding or cost share) catches applicants out in predictable ways: the percentage is calculated on the wrong base (the grant request versus the total project cost), in-kind contributions are counted when the funder only accepts cash or values them differently, volunteer time is valued at an arbitrary rate instead of the funder's rate, the same cost is counted by two funders (double funding), and match that was "expected" is missing when the first claim is made, which can delay or cancel payments. Good practice is to calculate the requirement exactly from the rules, separate secured from hoped-for sources, value in-kind contributions with a stated, defensible method, collect written evidence early, and keep a fallback such as reserves or a reduced scope.

<project_budget>
{{project_budget}}
</project_budget>

<match_rules>
{{match_rules}}
</match_rules>

<potential_sources>
{{potential_sources}}
</potential_sources>
</context>

<task>
1. Match requirement: calculate the match needed using the funder's base, show the arithmetic, and state the split of cash and in-kind allowed. If the rules are ambiguous, show both readings and say what to ask the funder.
2. Sources: list each potential source with type (cash or in-kind), amount, the project costs it pays for, status (secured in writing, agreed verbally, applied for, idea), and whether it is eligible under the rules.
3. In-kind valuation: for each in-kind item, a valuation method (for example the funder's volunteer rate, market rent for space, documented value of donated equipment), the calculation, and the record needed (timesheets, letters, invoices).
4. Double-funding check: any cost that appears in more than one funding source or would be claimed twice.
5. Gap and fallback: the gap between secured match and the requirement, the most realistic ways to close it, and a fallback (reserves, smaller scope, phasing) with its effect.
6. Evidence and timing: the letters and records to collect, by when, relative to the application and the first claim.
</task>

<constraints>
- Show all arithmetic; check totals.
- Do not invent sources, amounts or commitments; label unconfirmed sources clearly.
- Do not assume in-kind is eligible or how it is valued unless the rules say so; ask the funder where unclear.
- Do not give accounting or tax advice beyond flagging what to confirm with an accountant.
</constraints>

<output_format>
## Match requirement
With calculation.
## Sources
Table: Source | Cash or in-kind | Amount | Pays for | Status | Eligible.
## In-kind valuation
## Gap and fallback
Including the double-funding check.
## Evidence and timing
</output_format>
