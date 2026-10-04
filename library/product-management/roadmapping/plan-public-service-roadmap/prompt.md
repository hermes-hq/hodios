---
schema: 1
id: plan-public-service-roadmap
kind: prompt
title: Plan a public service roadmap
description: Plans a public or charity service roadmap around policy deadlines, funding cycles, procurement, governance and legacy contracts, separating fixed dates from preferences and showing risks openly.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, project-manager, manager, operations-manager]
subject: [public-sector, nonprofit]
requires: [none]
inputs: [text, notes, document]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fixed-dates, funding-cycles, procurement-lead-time, legacy-contracts, governance-cycles]
pairs_with:
  prompts: [build-outcome-roadmap, map-cross-team-dependencies, brief-board-on-roadmap]
args:
  - name: service_and_goals
    description: The service, who uses it, what it must achieve (policy aims, user outcomes, savings) and the work being considered. Rough notes are fine.
    type: text
    required: true
  - name: fixed_dates_and_constraints
    description: Every date and constraint you know of - legislation or policy go-live dates, funding spend-by dates and financial year end, procurement routes, contract end and notice dates, committee or board cycles, elections, staffing.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Date register, Roadmap, Working back from fixed dates, Risks shown openly, Decisions needed]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help product owners and programme leads in councils, health services, government agencies and charities plan a service roadmap. Their dates are set by forces outside the team: a law or policy that takes effect on a set day, money that must be spent or committed by the end of a financial year, procurement that takes months, a legacy supplier contract with a notice period, a committee that meets every six weeks and needs papers two weeks earlier, and elections or pre-election periods that restrict announcements. Roadmaps in this world fail when every date is presented as equally fixed, when procurement and governance lead times are left off, and when risks are hidden to keep sponsors comfortable.
</context>

<task>
Service and goals:

<service_and_goals>
{{service_and_goals}}
</service_and_goals>

Fixed dates and constraints:

<fixed_dates>
{{fixed_dates_and_constraints}}
</fixed_dates>

1. Build a date register and classify every date: statutory or policy (cannot move), contractual (moves only with cost or renegotiation), funding (money lost or clawed back if missed), governance (a committee or board slot; the next one is weeks away), political or seasonal (pre-election periods, winter pressures, school terms), and preference (someone would like it). Say who could move each date.
2. Turn the goals into two to four outcomes for service users and the organisation, each with a measure. Where a goal is an output ("launch the portal"), rewrite it as the outcome it serves and say so.
3. Place the work in now, next and later against those outcomes. Mandatory work tied to a statutory or contractual date goes in first, labelled as mandatory.
4. For each fixed date, work backwards: what must be true by then, the procurement route and its typical lead time (labelled as an assumption to check with the procurement team), governance approvals and paper deadlines, data migration, staff training, user testing including people who use assisted or non-digital routes, and a buffer.
5. If a latest safe start or notice date is already in the past or within the next few weeks, say so plainly at the top of that timeline and list the options (negotiate an extension, a short-term contract variation, a phased scope, accepting the consequence), each with who must agree.
6. Show where two fixed dates collide or where the plan relies on one person, one supplier or one approval.
7. Write risks openly: likelihood, impact on users, mitigation, owner placeholder, and what the sponsor should decide now rather than later.
</task>

<constraints>
- Never state what a law, regulation or procurement rule requires as fact. Name it as the user described it and add "confirm with legal, procurement or finance".
- Do not invent dates, budgets, contract terms or committee schedules. Missing ones become [X] in the register with a question. Ask for today's date if the input does not make it clear, since the plan depends on how much time is left.
- Keep non-digital and assisted routes in scope; a service change that only works online is a risk to name.
- Do not soften risks for the audience. State them plainly and pair each with an option.
- If the fixed dates are missing entirely, ask for them and stop, because the roadmap depends on them.
</constraints>

<output_format>
## Summary
Three to five sentences: the fixed dates that shape the plan, whether they are achievable, and the most urgent decision.

## Date register
Table: date | what | type (statutory, contractual, funding, governance, political or seasonal, preference) | who can move it | consequence if missed.

## Roadmap
Table: outcome | now | next | later. Mandatory items labelled.

## Working back from fixed dates
For each fixed date, a short backwards timeline with lead times and the latest safe start.

## Risks shown openly
Table: risk | likelihood | impact on users | mitigation | owner | decision needed.

## Decisions needed
Numbered list with who decides and by when, then open questions.
</output_format>
