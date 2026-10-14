---
schema: 1
id: project-service-demand-from-demographics
kind: prompt
title: Project service demand from demographics
description: Projects future demand for a public or community service (care places, clinic visits, library use, social housing) from population projections by age times usage rates, with scenarios.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [data-analyst, researcher, operations-manager, executive]
subject: [public-sector, social-care, healthcare]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [demographic-projection, needs-assessment, usage-rates, service-planning]
pairs_with:
  prompts: [forecast-school-enrollment, review-forecast-assumptions, present-forecast-uncertainty]
args:
  - name: population
    description: "Population projections for the area by age band (and sex or other groups if relevant) for the years needed, with the source and date of the projection."
    type: text
    required: true
  - name: usage
    description: "Current service use by the same age bands (users, visits or places), from which usage rates can be computed, plus any trends in rates and policy changes expected."
    type: text
    required: true
  - name: purpose
    description: "The planning question and horizon, for example care home places needed in 10 years, or clinic sessions next 5 years."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Usage rates, Projection, Scenarios, Sensitivities, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Public service planners project demand with a simple, auditable method: current usage rate per head by age band, times projected population in each band, summed. Its power is that ageing shows up correctly: a stable total population can hide a fast-growing over-85 group whose care use is many times that of the 65-74 group, so projecting on total population badly understates demand. Its weaknesses are also known. Usage rates are not fixed: they move with healthier ageing, policy (eligibility thresholds, a shift from residential care to home care), supply (use reflects what is available, so unmet need is invisible), and prices. Population projections are themselves trend-based, not forecasts, and are least reliable for small areas and long horizons. Good practice therefore presents a constant-rate baseline plus scenarios for rate change, says where current use understates need, and shows which age band drives the growth.

Purpose: {{purpose}}
</context>

<task>
<population>
{{population}}
</population>

<usage>
{{usage}}
</usage>

1. Compute current usage rates by age band (users or units per 1,000 population), checking that population and usage cover the same area, period and bands.
2. Project demand at constant rates for each projection year, by age band and total; show which bands drive the change.
3. Build scenarios: rates falling (for example healthier ageing or prevention), rates rising (for example tighter informal care), and a policy or supply change named in the inputs; state each scenario's assumption as a labelled assumption.
4. Note where current use understates need (waiting lists, unmet demand, supply limits) and what data would show it.
5. Show sensitivities: the effect of a stated change in the rate of the most important band, and of the population projection's uncertainty if a range is supplied.
6. Translate demand into the planning unit asked for (places, sessions, staff) only where conversion figures are supplied.
</task>

<constraints>
- Compute only from figures supplied and show the rate table and one band's projection in full.
- Do not invent population projections or usage rates; label every assumed rate change.
- Present results as projections under stated assumptions, not predictions.
- Flag small-area or small-number results as unreliable.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Demand now and at the horizon under constant rates, the scenario range, and the age band that drives it.

## Usage rates
Table: Age band | Population now | Users now | Rate per 1,000.

## Projection
Table: Age band | Rate | Population year X | Demand year X ... | Change.

## Scenarios
Table: Scenario | Assumption | Demand at horizon | Change vs now.

## Sensitivities
Bullets.

## Caveats
Bullets.
</output_format>
