---
schema: 1
id: plan-geographic-farm
kind: prompt
title: Plan a geographic farm
description: Plans a real estate agent's geographic farm - choosing the patch by turnover and competition, a 12-month touch plan, local-expert content, cost per home and listings needed to break even.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, marketer]
subject: [real-estate]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [geographic-farming, listings, direct-mail, local-expert, break-even]
pairs_with:
  prompts: [write-real-estate-market-update, write-listing-presentation, write-open-house-promotion, write-direct-mail-letter]
  personas: [real-estate-agent]
  rules: [fair-housing-ad-rules]
args:
  - name: candidate_areas
    description: The neighbourhoods or streets you are considering, with number of homes in each, why you like them, and any you already have listings or connections in.
    type: text
    required: true
  - name: budget
    description: What you can spend on the farm per month or year, and the hours per week you can give it.
    type: string
    required: true
  - name: market_data
    description: For each area if you have it - sales in the last 12 months, average price, days on market, and which agents or brokerages list most. Optional; the plan lists what to pull otherwise.
    type: text
  - name: commission
    description: Your typical net income per listing sold after brokerage split and costs (for example "about 6,000 per sale"). Optional; used for break-even.
    type: string
output_contract:
  format: markdown
  sections: [Area choice, Twelve-month touch plan, Local-expert content, Budget per home, Break-even, Tracking and rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help residential real estate agents plan a geographic farm: a defined patch of homes the agent markets to consistently so that owners think of them first when they decide to sell. Farms pay back slowly and only with consistency; most agents quit after a few mailings, choose a patch too big for their budget, or pick an area where few homes sell or one competitor already dominates. The patch is chosen on numbers: turnover rate (homes sold per year divided by homes in the area), average price and therefore income per sale, competition share, and the agent's own links. The plan then mixes touches (mail, doors, events, digital) so each home hears from the agent roughly monthly with something useful, not just "just sold" brags.

Budget: {{budget}}
{{#commission}}Net income per listing: {{commission}}{{/commission}}
</context>

<task>
<candidate_areas>
{{candidate_areas}}
</candidate_areas>

{{#market_data}}<market_data>
{{market_data}}
</market_data>{{/market_data}}

1. If home counts per area are missing, ask for them and continue with [X]. If market data is missing, list exactly what to pull from the local listing service or property records (sales in 12 months, average price, days on market, listing share by agent) and continue with [X] placeholders.
2. Area choice: for each candidate compute turnover rate and expected sales per year; note the top competitor's share if given. Rules of thumb (label them): a turnover rate around 5% or more is commonly sought, and a single agent holding a large share of listings makes entry harder. Recommend one area and a size the budget can cover with monthly touches.
3. Twelve-month touch plan: a month-by-month table mixing direct mail (market update, local guide, seasonal checklist, just listed or sold), door knocking or door hangers (for flats or gated blocks with controlled entry, use mail or a lobby notice with management permission instead), one or two community events or sponsorships, and digital (a local social page, an email list from opt-ins, geo-targeted ads using the platform's housing ad rules). Every touch offers something useful.
4. Local-expert content: six to ten content ideas that make the agent the go-to source (quarterly price updates from real data, a local business guide, school-term calendar, planning applications explained, a "what's my home worth" offer).
5. Budget per home: work backwards first: yearly budget divided by homes = what you can spend per home per year, then divided by 12 for each monthly touch. Fit the touch mix to that figure. Use printing, postage and ad costs only if supplied; otherwise list them as quotes to get and show cost per touch x touches per year x homes as a formula with [X].
6. Break-even: yearly cost divided by net income per listing = listings needed; compare with expected sales in the area and the share the agent would need to win. Say plainly if it does not add up in year one and when it might (farms often take a year or more to produce listings).
7. Tracking and rules: a source question for every lead, a monthly log, and compliance points to check locally (mail and do-not-call rules, no-soliciting signs, data protection for mailing lists, fair housing in ads).
</task>

<constraints>
- Never invent market statistics, prices, competitor shares or response rates. Mark missing figures as [X].
- Arithmetic must add up; show it.
- Respect no-soliciting and no-junk-mail signs and do-not-call lists; flag that rules differ by country and state.
- All advertising and targeting follows fair housing rules: target by location, never by protected characteristics.
- Do not promise listings or a timeline; say what the numbers imply.
{{> output/uncertainty}}
</constraints>

<output_format>
## Area choice
Table: Area | Homes | Sales last 12 months | Turnover rate | Average price | Top competitor share | Notes. Then the recommendation in three lines.

## Twelve-month touch plan
Table: Month | Mail | Door | Event | Digital.

## Local-expert content
Numbered ideas with the data source each needs.

## Budget per home
Arithmetic and a short cost table.

## Break-even
Listings needed, share of expected sales, and a plain verdict.

## Tracking and rules
Bullets.
</output_format>
