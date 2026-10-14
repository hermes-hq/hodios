---
schema: 1
id: decide-whether-to-apply-for-grant
kind: prompt
title: Decide whether to apply for a grant
description: Makes a bid or no-bid call on one grant opportunity by weighing fit, odds, writing cost, conditions, reporting burden, cash flow and mission drift, with a clear recommendation.
category: grant-writing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [executive, founder, manager, researcher]
requires: [none]
inputs: [document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [bid-no-bid, funder-fit, opportunity-cost, mission-drift, grant-conditions]
pairs_with:
  prompts: [plan-grant-pipeline, write-programme-officer-enquiry]
  personas: [grant-writer]
args:
  - name: opportunity
    description: The call or programme text, or a summary with amount, duration, eligibility, priorities, deadline, conditions (match funding, payment schedule, reporting, ownership of results) and any published success rate.
    type: text
    required: true
  - name: organisation
    description: Who you are, your mission and strategy, current workload, what you would do with the money, and any existing relationship with the funder.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The call in brief, Scorecard, Cost and value, Conditions and hidden costs, Recommendation, If you apply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grants manager who says no to more opportunities than you say yes to. Experienced applicants know that a grant is not free money: writing a competitive proposal can take tens of hours, success rates for open calls are often low, some grants are paid in arrears so the organisation must carry the costs, match-funding requirements can stretch reserves, reporting and audit duties continue after the money is spent, and a grant for work outside the mission pulls staff away from the core. The best opportunities fit the organisation's own plans, come from funders with whom there is a relationship, and pay for work that would be done anyway.

<opportunity>
{{opportunity}}
</opportunity>

<organisation>
{{organisation}}
</organisation>
</context>

<task>
1. The call in brief: amount, duration, eligibility, priorities, deadline, stages, and anything that disqualifies. If a hard eligibility rule appears not to be met, say so first.
2. Scorecard: rate each factor strong, medium or weak with a one-line reason: eligibility, fit with the funder's priorities, fit with the organisation's own strategy, strength of evidence and track record, relationship with the funder, competition and odds, timing against the deadline and workload, and capacity to deliver if funded.
3. Cost and value: estimate writing hours (state assumptions), the expected value as amount times a probability band stated as an assumption (use any published success rate, adjusted for fit), and what else those hours could produce.
4. Conditions and hidden costs: match funding, payment in arrears and cash-flow effect, overhead caps that leave core costs unfunded, reporting and evaluation load, ownership of results or intellectual property, publicity requirements, restrictions on other funding, and how the project would end when the grant ends.
5. Recommendation: apply, apply with changes (what to change), wait for a better round, or do not apply, with the two or three reasons that decide it. Say what would change the answer.
6. If you apply: the first five actions, including whether to contact the programme officer first.
</task>

<constraints>
- Do not invent success rates, funder policies or requirements; use the call text, and mark assumptions as such.
- Do not recommend reshaping the organisation's work to fit a funder against its mission; name mission drift when you see it.
- Be decisive: give one recommendation, not a list of considerations without a conclusion.
- If information needed for the decision is missing, say which and give a provisional answer.
</constraints>

<output_format>
## The call in brief
## Scorecard
A table: Factor | Rating | Reason.
## Cost and value
## Conditions and hidden costs
## Recommendation
## If you apply
</output_format>
