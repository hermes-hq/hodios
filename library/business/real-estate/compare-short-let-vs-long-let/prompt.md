---
schema: 1
id: compare-short-let-vs-long-let
kind: prompt
title: Compare short-term and long-term letting
description: Compares running a property as a short-term holiday let versus a long-term rental on net income, workload, occupancy risk and local rules, using the owner's figures and stating every assumption.
category: real-estate
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, founder]
subject: [real-estate, hospitality]
requires: [none]
inputs: [text, dataset]
output: [table, report, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [landlord, holiday-let, occupancy, net-yield, licensing]
pairs_with:
  prompts: [analyze-rental-property, write-guest-messages-for-rental, set-asking-rent]
args:
  - name: property
    description: The property - location type, size, furnishing, condition, and whether it is your home, a second home or bought to let; any mortgage, lease or association rules you know of.
    type: text
    required: true
  - name: figures
    description: What you know for each option - expected long-term rent; short-let nightly rates by season and expected occupancy from comparable listings; cleaning, linen, platform and management fees; utilities, internet, insurance, furnishing costs; your available time.
    type: text
    required: true
  - name: country
    description: Country and city or region. Short-let permits, night caps, registration, taxes and planning rules vary sharply and change often.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Income comparison, Workload and risk, Rules to check, Break-even occupancy, Verdict and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You compare short-term and long-term letting the way a cautious operator would. Headline nightly rates make short lets look far more profitable than they are. The gap closes once you price in realistic occupancy by season (comparable listings' calendars are a better guide than the platform's suggestions), platform and management fees, a clean and laundry per stay, utilities and internet the owner now pays, furnishing and replacement, higher insurance, and the owner's own hours. Rules are the other big swing factor: many cities cap nights, require registration or a change of use, or ban short lets in some buildings, and mortgages, leases and association rules often forbid them. A long let earns less at best but has lower costs, steadier income and different legal duties to the tenant.

<property>
{{property}}
</property>

<figures>
{{figures}}
</figures>

Location: {{country}}
</context>

<task>
1. List every assumption you need, using the owner's figures where given and clearly labelled estimates where not (occupancy by season, average stay length, cleaning cost per stay, fees, hours).
2. Build an annual income comparison for both options: gross income, each cost line, net operating income before tax and financing, and net per hour of the owner's time if they self-manage.
3. Compare workload and risk: time per week, seasonality and cash-flow swings, damage and guest or tenant problems, ease of switching back later.
4. List the rules to check before deciding, each marked `[CHECK locally]`: short-let registration, permits or night caps, planning or change-of-use, local tourist taxes and how income from each option is taxed, mortgage lender consent, lease or association restrictions, insurance, and safety requirements for paying guests.
5. Calculate the break-even occupancy at which the short let equals the long let after costs.
6. Give a verdict conditional on the assumptions, and the three facts the owner should confirm first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent market rates or occupancy. If they are missing, use a clearly labelled placeholder and say the conclusion depends on it.
- Do not state local rules or tax treatment as fact; mark them `[CHECK locally]` and suggest the local authority, an accountant and the lender.
- Show the arithmetic so the owner can change any number.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Table: item, value, source (given or estimate).

## Income comparison
Table: line, short let, long let, with the arithmetic.

## Workload and risk
Bullets comparing both.

## Rules to check
Checklist marked `[CHECK locally]`.

## Break-even occupancy
The figure and how it was calculated.

## Verdict and next steps
Short verdict and three facts to confirm.
</output_format>
