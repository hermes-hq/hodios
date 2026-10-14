---
schema: 1
id: assess-property
kind: prompt
title: Assess a property
description: Sizes up a property for selling, letting or investing - value range from comparables, rent and costs, options compared, red flags to check and the next step. Use before pricing, listing or buying.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, sales-rep, consultant]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, dataset, preferences]
output: [report, table, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [property-value, comparables, rental-yield, sell-or-let, landlord, investment-property]
pairs_with:
  prompts: [analyze-property-comparables, analyze-rental-property, set-asking-rent, run-investment-property-due-diligence]
  personas: [real-estate-agent, property-manager]
args:
  - name: property
    description: What and where it is - type, size, bedrooms, condition, outside space, parking, freehold or leasehold and lease length if relevant.
    type: text
  - name: goal
    description: Your role and what you want to decide (for example "owner, deciding whether to sell or let", "agent valuing for a client", "buying it as a rental").
    type: text
  - name: figures
    description: Asking or purchase price, recent sold prices of similar homes nearby, likely rent, mortgage, service charges and other costs. Rough is fine.
    type: text
output_contract:
  format: markdown
  sections: [Property snapshot, Value range, Rent and costs, Options, Red flags to check, Next step, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You assess properties the way a careful agent or property manager does before anyone quotes a price. Naive answers anchor on the asking price or a portal estimate, compare against asking prices instead of sold prices, ignore running costs and empty months when judging a rental, and skip the legal and physical checks that later sink deals. A sound assessment gives a value range from real comparables, adjusts for the differences, shows the rent and cost arithmetic, compares the realistic options and lists what must be checked before money changes hands.

{{#property}}
<property>
{{property}}
</property>
{{/property}}
{{#goal}}Goal: {{goal}}{{/goal}}
{{#figures}}
<figures>
{{figures}}
</figures>
{{/figures}}
</context>

<task>
1. Check the essentials: what and where the property is, the user's role and the decision, and the country or region. If two or more are missing, ask at most three short numbered questions, each with an example answer (for example "Two-bed flat, second floor, city centre, needs a new kitchen; I own it and am deciding whether to sell or let"). Add one line: if they say "just do it", you will assume an owner deciding between selling and letting, and mark every figure as [to fill]. Then stop and wait. If you have enough, do not ask; go to step 2.
2. Property snapshot: the features that drive value and rent (location, size, layout, condition, outside space, parking, energy rating, tenure), and the facts still missing.
3. Value range: from sold comparables the user gives, adjust for size, condition and features and give a low, likely and high value with the reasoning. If there are no comparables, explain how to collect three to six recent sold (not asking) prices and what to adjust for. Never invent prices.
4. Rent and costs (if letting or investing): likely rent from the user's evidence, yearly costs (management, repairs, insurance, service charges, empty months, safety checks) and the gross and net yield arithmetic. Mark estimates.
5. Options: compare the realistic options for this goal (sell now, let, renovate then sell or let, hold, buy or walk away) on money in, money out, time, effort and risk.
6. Red flags to check: legal (title, lease length and charges, planning and permits, landlord licensing and safety rules), physical (survey, damp, structure, roof), and market (local supply, demand, recent price moves).
7. Next step: the single most useful next action, and what would change the recommendation.
8. Go deeper: one line naming two to four next entries that fit, for example "Analyse comparable property sales", "Analyse a rental property", "Set the asking rent for a rental" or "Run due diligence on an investment property".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent sale prices, rents, rates or local rules; use the user's figures and label anything else as an assumption to verify.
- A value range is an estimate, not a formal valuation; say when a surveyor's valuation, a lawyer or a tax adviser is needed (mortgages, disputes, tax on a sale).
- Fair housing: never use or suggest criteria about who lives nearby or who should rent, such as race, religion, disability or family status.
- If the country is unknown, name the assumption and flag where local rules matter.
</constraints>

<output_format>
## Property snapshot
Bullets, then "Missing:" with facts to find.
## Value range
Table: Comparable | Sold price and date | Adjustment | Adjusted value. Then Low | Likely | High.
## Rent and costs
Table: Item | Yearly amount. Then gross and net yield with the arithmetic. Write "Not relevant" if selling only.
## Options
Table: Option | Money | Time | Effort | Main risk.
## Red flags to check
Checklist grouped as legal, physical, market.
## Next step
Two or three sentences.
## Go deeper
One line.
</output_format>
