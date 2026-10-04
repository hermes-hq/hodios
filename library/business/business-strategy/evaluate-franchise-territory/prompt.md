---
schema: 1
id: evaluate-franchise-territory
kind: prompt
title: Evaluate a franchise territory
description: Evaluates a franchise territory offer - target customers, competitors and nearby units, drive times, rents and realistic sales against the franchisor's figures - with questions to push back on.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder, individual]
advice_risk: [financial]
requires: [none]
inputs: [text, document, dataset]
output: [report, questions, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [franchise, territory-analysis, catchment, sales-projections, encroachment, due-diligence]
pairs_with:
  prompts: [evaluate-buying-a-business, model-unit-economics, calculate-break-even]
  personas: [franchise-consultant]
args:
  - name: brand_concept
    description: The franchise brand and format - what it sells, typical customer, unit type (shop, van, home-based, kiosk), fees and royalty, and the investment asked.
    type: text
    required: true
  - name: territory
    description: The territory on offer - boundaries or postcodes, population or households if known, existing units nearby, competitors you know of, likely premises and rents, and whether it is exclusive.
    type: text
    required: true
  - name: franchisor_figures
    description: Any sales, cost or break-even figures the franchisor has shown you, and where they came from (average of all units, top performers, a model). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Territory profile, Competition and encroachment, Sales reality check, Pushback questions, What to verify, Decision conditions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a prospective franchisee judge whether a specific territory can support a unit, before they sign. The brand may be good and the territory still wrong. Common traps: a territory drawn on population when the brand depends on a narrower group (families with young children, homeowners, office workers); exclusivity that covers only physical sites and not online orders, delivery apps or "national accounts"; drive times that make a service van territory unworkable; and sales projections built from the best units or from mature units, not from a new unit in a comparable area. Your job is to compare the territory with what the format needs, rebuild the sales case from the bottom up and arm the buyer with questions. A solicitor reviews the franchise agreement; an accountant reviews the numbers.
</context>

<task>
<brand_concept>
{{brand_concept}}
</brand_concept>

<territory>
{{territory}}
</territory>

{{#franchisor_figures}}
<franchisor_figures>
{{franchisor_figures}}
</franchisor_figures>
{{/franchisor_figures}}

1. Define the target customer the format really sells to and what a unit needs to thrive (number of target households or businesses, footfall, drive time, parking, visibility). Say which needs you inferred.
2. Profile the territory against those needs: the count of target customers (not total population), how far the edges are in drive time at the hours the business trades, and natural barriers (rivers, ring roads, rural gaps). Use only given figures; where a figure is missing, name the public source type to check (census, local authority data, business directories, a drive-time map) and leave a placeholder [X].
3. Competition and encroachment: direct competitors, substitutes, other units of the same brand nearby, and what the exclusivity really covers (sites, deliveries, online sales, corporate accounts, future formats). Flag any gap.
4. Sales reality check: build a bottom-up estimate - target customers x share you might win x visits or jobs per year x average spend - with a low, middle and high case and labelled assumptions. Compare it with the franchisor's figures and ask which units they come from, how old those units are and how comparable their areas are. Show the gap in percent.
5. Costs that change by territory: rent level, local wages, travel or fuel, marketing needed to become known. Show how far sales must reach to cover them plus royalty and marketing levy, as arithmetic.
6. Write the pushback questions for the franchisor and for existing franchisees in similar territories.
7. Set decision conditions: the facts that must be true before signing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent population, competitor counts, rents or unit sales. Use the user's figures, or placeholders with the source to check.
- Treat franchisor projections as claims to test, not facts. Note that disclosure rules on earnings claims differ by country and that a solicitor should check what the franchisor is allowed and required to provide.
- Do not tell the user to sign or not sign; give a clear reading and the conditions.
- If the brand's unit type or the territory boundaries are missing, ask for them and stop.
- Show every calculation so the user can redo it with real numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences: does the territory look strong, marginal or weak for this format, and why. One line naming the solicitor and accountant reviews needed.
## Territory profile
Table: Need of the format | What the territory offers | Evidence or source to check | Fit (good, weak, unknown).
## Competition and encroachment
Bullets, ending with the exclusivity gaps found.
## Sales reality check
Low, middle and high cases as arithmetic, then a table: Measure | Franchisor figure | Bottom-up estimate | Gap.
## Pushback questions
Numbered, grouped: for the franchisor; for existing franchisees.
## What to verify
Checklist with the source for each item.
## Decision conditions
Checklist of conditions that must all be true before signing.
</output_format>
