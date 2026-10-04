---
schema: 1
id: estimate-freelance-dev-project
kind: prompt
title: Estimate a freelance development project
description: Turns a client brief into a freelance estimate with clarifying questions, task ranges, risk buffer, assumptions, exclusions, milestones and a fixed-price versus time-and-materials call.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, consultant]
requires: [none]
inputs: [text, spec, message]
output: [table, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [freelancing, quoting, fixed-price, scope-creep]
pairs_with:
  prompts: [estimate-with-ranges, write-freelance-proposal, review-freelance-contract]
args:
  - name: client_brief
    description: The client's brief or messages as they sent them, plus anything you learned on a call - goals, features, designs available, integrations, deadline, budget hints.
    type: text
    required: true
  - name: day_rate
    description: Your day or hourly rate and currency, for example 600 EUR per day. Optional; without it the estimate stays in days.
    type: string
  - name: your_context
    description: Your stack, how familiar you are with this kind of project, and whether you work alone or with others. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Clarifying questions, Task breakdown, Risk buffer, Assumptions and exclusions, Milestones, Pricing model, Price summary]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelance developer or small agency turn a client brief into an estimate they can defend. Freelance estimates lose money in predictable ways: only coding is counted (not meetings, setup, deployment, content entry, testing, revisions, handover and support), the happy path is estimated as the whole job, integrations with third parties are assumed to be quick, assumptions are not written down so scope creeps for free, and a fixed price is offered on a vague brief. A range with written assumptions protects both sides.

{{#day_rate}}Rate: {{day_rate}}{{/day_rate}}
{{#your_context}}Developer context: {{your_context}}{{/your_context}}
</context>

<task>
<client_brief>
{{client_brief}}
</client_brief>

1. List the questions that would change the estimate most (content and designs ready, integrations and their API access, user roles, platforms and browsers, data migration, hosting and who pays for it, accessibility and legal needs, deadline, decision maker, support after launch). Rank by impact; up to eight.
2. Break the work into tasks of half a day to three days, grouped by area (for a large project, keep the table to about 25 rows by estimating sub-areas instead of tiny tasks), including the invisible work: discovery and kickoff, project setup and CI, environments and deployment, design implementation, each feature, integrations, content entry, testing and fixes, client review rounds (state how many are included), project management and communication (often 10-15% of build time), launch and handover.
3. Estimate each task as a three-point range (best, likely, worst) in days and compute an expected value with (best + 4 x likely + worst) / 6. Mark tasks with high uncertainty and why.
4. Add a risk buffer sized to uncertainty (for example 10-15% for a clear brief and familiar stack, 20-30% for vague scope or unknown third-party APIs), shown as its own line, not hidden in tasks.
5. Write assumptions and exclusions in plain client language: what is included, what is not (copywriting, stock images, ongoing maintenance, third-party fees), the number of revision rounds, and what triggers a change request.
6. Propose milestones with deliverables and a payment split (for example a deposit, payments on milestone acceptance, final on launch) as an option to consider.
7. Recommend a pricing model: fixed price only when scope is clear and stable; time and materials, possibly with a cap, when scope is uncertain; or a paid discovery phase first to firm up a vague brief. Explain the trade-off for both sides.
8. If a rate is given, convert to a price range; otherwise stop at days. An hourly rate needs billable hours per day: assume 8 unless they said otherwise, and state the assumption.
9. If the brief states a budget, compare it with the expected total. When the estimate is above it, do not shrink task estimates to fit; propose a smaller first phase (which features move to phase two) that fits the budget, or say plainly that it does not fit. Without a rate, ask for the rate before comparing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent a market rate, the client's budget or third-party fees. Without a rate, give days only.
- Show the arithmetic for totals so it can be checked; totals must add up.
- Do not draft contract clauses as legal advice; say that terms such as liability, intellectual property, payment terms and late fees belong in a written contract checked by a lawyer or a freelancers' association in their country.
- Taxes such as VAT or sales tax depend on the country; note that prices may need to be shown with or without tax and to check locally.
- If the brief is too thin to break down, ask the top questions and propose a paid discovery phase instead of a full estimate.
</constraints>

<output_format>
## Clarifying questions
Numbered, highest impact first, each with how the answer changes the estimate.

## Task breakdown
Table: area | task | best | likely | worst | expected (days) | notes. Subtotal row.

## Risk buffer
Percentage, reason and days.

## Assumptions and exclusions
Two bullet lists in client-ready wording.

## Milestones
Table: milestone | deliverables | expected days | suggested payment share.

## Pricing model
Recommendation and trade-offs, under 120 words.

## Price summary
Days range and, if a rate was given, the price range with arithmetic; if the client stated a budget, one line on whether it fits and the phase-one cut if not.
</output_format>
