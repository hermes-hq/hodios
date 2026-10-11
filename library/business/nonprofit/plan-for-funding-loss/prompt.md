---
schema: 1
id: plan-for-funding-loss
kind: prompt
title: Plan for the loss of a major funder
description: Plans a nonprofit's response to losing a major grant or contract, with scenarios, cash runway, options from replacing income to closing services, and communication to staff, users and funders.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [plan, table, message]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
subject: [nonprofit]
tags: [funding-cuts, scenario-planning, cash-runway, service-continuity, crisis-planning]
pairs_with:
  prompts: [write-reserves-policy, plan-programme-closure, calculate-programme-full-cost]
  personas: [nonprofit-advisor]
args:
  - name: situation
    description: Which funding is at risk, how much, when it ends or when the decision comes, what it pays for (staff, services, overheads), and what the funder has said.
    type: text
    required: true
  - name: finances
    description: Total income and costs, other income sources and how secure they are, unrestricted reserves, cash in the bank, staff numbers and notice periods, leases and other commitments.
    type: text
    required: true
  - name: country
    description: Country and legal form. Optional; changes employment, insolvency and reporting duties.
    type: string
output_contract:
  format: markdown
  sections: [Where we stand, Scenarios, Runway, Options, Decision points, Communication plan, Questions for advisers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit leader and board respond when a major funder leaves. The common mistakes are waiting for certainty before planning, assuming replacement funding will arrive in time (new grants usually take six to twelve months), cutting overheads that keep the organisation safe while protecting a service that has no future funding, and telling staff and service users last. Experienced leaders plan scenarios early, calculate the cash runway including the cost of closing things properly (notice pay, redundancy, lease exits, returning unspent restricted funds), set decision dates in advance, and keep the board, funders and staff informed. They also know a board has legal duties when an organisation might not be able to pay its debts; that point needs professional advice.

Situation: {{situation}}
Finances: {{finances}}
{{#country}}Country and legal form: {{country}}{{/country}}
</context>

<task>
1. Where we stand: what is lost, when, what it pays for, and the share of total income; separate restricted funding from unrestricted.
2. Scenarios: at least three (funding renewed late or reduced, funding lost with partial replacement, funding lost with none), each with the income and cost picture month by month for the next 12 months in a compact table.
3. Runway: in each scenario, the month when unrestricted cash would fall below a safe minimum, counting the cost of winding down services responsibly. Show the working.
4. Options: replace income (which sources are realistic in the time, with lead times), reduce costs (with the effect on the mission and on safety), restructure or share services with partners, merge services, or close a service. For each: money saved or raised, time to effect, risk and effect on people served.
5. Decision points: dates by which the board must decide each step, tied to notice periods and the runway, with the information it needs at each.
6. Communication plan: who hears what and when - board, staff, volunteers, service users, other funders, partners - with key messages and a draft first message to staff.
7. Questions for an accountant, employment adviser and, if the runway is short, an insolvency or legal adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; show calculations; mark unknowns [needed].
- Never suggest using restricted funds to cover unrelated costs, delaying payments to staff or taxes, or hiding the situation from funders or the regulator.
- Employment, redundancy, consultation and insolvency rules differ by country; name the assumption and recommend professional advice before acting.
- Show the effect of every option on the people the organisation serves, and include a responsible exit for any service that may close.
</constraints>

<output_format>
## Where we stand
## Scenarios
Table per scenario or one combined table: Month | Income | Costs | Unrestricted cash.
## Runway
## Options
Table: Option | Saves or raises | Time to effect | Risk | Effect on people served.
## Decision points
Table: Date | Decision | Information needed.
## Communication plan
Table: Audience | When | Message | Who tells them. Then the draft staff message.
## Questions for advisers
</output_format>
