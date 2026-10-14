---
schema: 1
id: claim-compensation-for-disrepair
kind: prompt
title: Claim compensation for disrepair
description: Helps a tenant put together a claim for losses caused by a landlord's delay in fixing a defect - damaged belongings, extra costs, rooms lost - with a schedule of loss, evidence and a claim letter.
category: tenancy
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
subject: [law, real-estate]
requires: [none]
inputs: [text, document, image]
output: [table, message, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [disrepair-claim, schedule-of-loss, compensation-letter, tenant-rights, damaged-belongings]
pairs_with:
  prompts: [keep-repair-evidence-log, request-landlord-repair, prepare-small-claims-case]
  personas: [tenant-rights-advisor]
args:
  - name: defect_history
    description: The defect, when it started, when and how you reported it each time, when it was fixed (or not), and what the landlord said.
    type: text
    required: true
  - name: losses
    description: What it cost you - damaged items with age and value, receipts, extra heating or laundry costs, time a room could not be used, time off work, health effects. Rough figures are fine.
    type: text
    required: true
  - name: country
    description: Country and region. Optional, but claims routes and how loss of use is valued vary.
    type: string
output_contract:
  format: markdown
  sections: [Is there a claim worth making, Schedule of loss, Evidence, Claim letter, If they refuse]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tenants claim for disrepair losses the way a housing caseworker prepares a claim. Claims tend to rest on three things: the landlord was responsible for the repair, knew or was told about it, and took longer than reasonable to fix it, causing loss. Losses usually fall into specific costs (damaged belongings, valued at their second-hand worth rather than replacement price, extra energy, cleaning, alternative accommodation) and general loss of use or enjoyment of the home, which some systems value as a share of the rent for the affected period. Health effects need medical evidence and often a lawyer. Insurers, deposit offsets and rent withholding are separate questions. Tenants weaken claims by inflating values, by claiming for the period before they reported the problem, or by not mitigating. Many disputes settle on a reasoned written claim, and some no-win-no-fee firms in this area have poor practices, so tenants should check before signing up.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<defect>
{{defect_history}}
</defect>

<losses>
{{losses}}
</losses>

1. Is there a claim worth making: the timeline from first report to repair, the period that likely counts, and the strengths and gaps, without predicting an outcome.
2. Schedule of loss: a table of specific losses with item, date, how valued (second-hand value, receipts), amount and evidence, then loss of use as a separate line with the method shown (for example a percentage of rent for the affected period, the percentage being the tenant's reasoned proposal), marked as a negotiating figure.
3. Evidence: what supports each line and what is missing.
4. Claim letter: a formal, measured letter setting out the defect, reports, delay, losses with the schedule attached, a total and a deadline to respond, and an invitation to settle.
5. If they refuse: routes to check locally (negotiation, mediation, a housing ombudsman or tribunal, small claims), when to get legal advice (health effects, larger sums), and a caution about no-win-no-fee terms.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Do not inflate values or add losses the user did not mention.
- Do not state what a court or tribunal would award, or set percentages as rules.
- If there are health effects or the sums are large, recommend legal advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is there a claim worth making
Timeline and short assessment.

## Schedule of loss
Table: item | date | valuation basis | amount | evidence; then the loss-of-use line and a total.

## Evidence
Bullets: have, missing.

## Claim letter
Under 350 words, with [BRACKETS].

## If they refuse
Numbered routes.
</output_format>
