---
schema: 1
id: review-freelance-business-year
kind: prompt
title: Review your freelance year
description: Reviews a freelancer's year from client and time records - effective hourly rate per client, client concentration, best and worst work - and sets keep, change or drop decisions for next year.
category: freelancing
version: 1.0.0
status: incubating
stage: [review, plan]
role: [consultant, designer, writer, copywriter]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [effective-hourly-rate, client-concentration, client-portfolio, year-end-review]
pairs_with:
  prompts: [prepare-price-increase-conversation, part-ways-with-client, build-freelance-pipeline-routine, plan-freelance-tax-set-aside]
args:
  - name: records
    description: Per client for the year - fees invoiced, hours spent (estimates are fine, say so), number of projects, how they found you, and how much you enjoyed the work (1-5). A pasted table or notes.
    type: text
    required: true
  - name: goals
    description: What you want next year, for example more income, fewer hours, a different niche, fewer clients, more creative work.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Year in numbers, Client table, What the numbers say, Decisions, Next-year targets]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a freelancer's year-end business review, the kind most freelancers skip. Revenue alone hides the story; what matters is the effective hourly rate per client (fees divided by all hours, including calls, admin and revisions), how dependent the business is on one client (a single client above roughly a third to a half of income is a real risk), where good clients came from, and which work the freelancer actually wants more of. The usual finding is that the bottom client or two by effective rate also cost the most energy, and that replacing them is the cheapest raise available. Taxes and accounts belong with an accountant; this review is about clients, time and direction.
</context>

<task>
<records>
{{records}}
</records>

<goals>
{{goals}}
</goals>

1. Year in numbers: total fees, total hours, overall effective hourly rate, number of clients, share of income from the top client and top three. Show the arithmetic from the records; label estimates.
2. Client table: per client, fees, hours, effective rate, share of income, source, enjoyment, and a short note.
3. What the numbers say: four to six findings, each tied to figures (concentration risk, the low-rate clients, the best source of good clients, hidden time sinks, the gap between enjoyment and pay).
4. Decisions per client: keep as is, raise rate, change scope, grow, or phase out, each with a one-line reason linked to the goals. Flag any decision that would leave income too thin and suggest an order of moves.
5. Next-year targets: three to five measurable targets (effective rate, max share per client, number of clients, hours, a niche move) and the first action for each this month.
</task>

<constraints>
{{> guardrails/scope-discipline}}
- Use only the user's figures. If hours are missing for a client, say the effective rate cannot be computed and ask.
- Do not give tax, accounting or pension advice; point to an accountant for those.
- Be direct about uncomfortable findings (for example a favourite client with the lowest rate) without lecturing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Year in numbers
Short table of totals and ratios.

## Client table
Table: client | fees | hours | effective rate | share | source | enjoyment | note.

## What the numbers say
Numbered findings.

## Decisions
Table: client | decision | reason | when.

## Next-year targets
Numbered targets with first action.
</output_format>
