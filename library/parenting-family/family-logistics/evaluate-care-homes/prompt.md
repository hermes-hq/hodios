---
schema: 1
id: evaluate-care-homes
kind: prompt
title: Evaluate care homes
description: Builds a checklist and questions for choosing a care home or assisted living, covering inspection reports, staffing, a visit checklist, true costs, funding to check and contract terms.
category: family-logistics
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [checklist, questions, table]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [care-homes, assisted-living, nursing-homes, eldercare, care-costs, care-contracts]
pairs_with:
  prompts: [plan-parent-care-conversation, plan-long-term-care-costs, plan-family-meeting]
  personas: [eldercare-advisor]
args:
  - name: care_needs
    description: Who needs care and what kind, for example mobility, help with washing and dressing, nursing needs, dementia or memory problems, medical conditions, what matters to them (garden, faith, language, visits from a pet), and how soon a place is needed.
    type: text
    required: true
  - name: location
    description: Country and area where you are looking, and how far family can travel to visit.
    type: string
    required: true
  - name: budget
    description: What can be paid per week or month and how (savings, pension, insurance, public funding), with currency. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The care you need, Find and shortlist, Before you visit, Visit checklist, Questions to ask, Costs and contract, Compare homes, Red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families choose a care home or assisted living setting with care and rigour. The decision is often made under time pressure after a hospital stay, and families judge by décor and a welcome tour. What matters more: whether the home can meet the person's care needs now and as they change (nursing care, dementia care), what the regulator's latest inspection found, how stable and sufficient the staff are, how residents actually spend their day, and what the contract says about fees, increases and when the home can ask a resident to leave. Fees, funding rules and regulators differ by country and region.

<care_needs>
{{care_needs}}
</care_needs>

Location: {{location}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. The care you need: translate the needs into the type of setting (independent or assisted living, residential care home, nursing home or skilled nursing, specialist memory care) and the specific capabilities to check (24-hour nursing, hoists, dementia training, end-of-life care), and say whether a needs assessment by the local authority, health service or a doctor should come first.
2. Find and shortlist: where to find homes and their inspection results for the location (name the regulator only if you are confident of it, for example the Care Quality Commission in England or the Care Inspectorate in Scotland; otherwise "your national or state care regulator"), and how to narrow to three to five.
3. Before you visit: what to read in inspection reports (the latest rating, enforcement actions, repeated issues in safety, medicines, staffing and leadership), reviews to treat with caution, and calls to make to check availability, fees and whether they can meet the needs.
4. Visit checklist: what to observe on a visit (how staff speak to residents, call bell response, residents engaged or left in front of the TV, smells and cleanliness, food at a mealtime, outdoor access, rooms and bathrooms, safety features), with the advice to visit twice, once unannounced or at a different time such as a weekend or mealtime.
5. Questions to ask: 15–20 questions grouped by care and health (care plans, GP or doctor visits, medicines, falls, hospital admissions, end-of-life care), staffing (ratios day and night, turnover, agency use, training), daily life (activities, food choice, visiting, outings), and communication with families.
6. Costs and contract: the full cost picture (base fee, what is included, extras such as hairdressing or toiletries, top-up fees, deposits, annual increases and how they are decided) and contract terms to check (notice periods, fees after death, what happens if money runs out, grounds for asking a resident to leave, trial period, complaints process), plus types of public funding or insurance to check eligibility for. Recommend that a lawyer or adviser who specialises in elder care reviews the contract.
7. Compare homes: a weighted scoring table based on what matters for this person.
8. Red flags: signs to walk away (a poor or worsening inspection, high staff turnover or heavy agency use, residents unkempt or ignored, evasive answers about fees or incidents, pressure to sign quickly).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent home names, ratings or fees. Fees are given only as "ask for the full written breakdown"; ranges only if you are confident and marked as rough estimates.
- Funding and eligibility rules are stated as "check whether this applies" with the official body to ask; do not say what the person will get.
- Keep the person needing care at the centre: their preferences, culture, faith and wish to stay near people they know, and involve them in visits where possible.
- If the care needs suggest a crisis (unsafe at home now, a hospital discharge in days), give a short fast-track version first.
- Acknowledge that this is often an emotional decision for families, briefly.
</constraints>

<output_format>
## The care you need
## Find and shortlist
## Before you visit
## Visit checklist
A checklist to print.
## Questions to ask
Grouped lists.
## Costs and contract
Table: Item | What to ask | Watch out for.
## Compare homes
Table: Criterion | Weight | Home A | Home B | Home C.
## Red flags
</output_format>
