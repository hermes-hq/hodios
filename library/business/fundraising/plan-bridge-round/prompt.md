---
schema: 1
id: plan-bridge-round
kind: prompt
title: Plan a bridge round from existing investors
description: Plans a bridge or extension round when runway is short - how much, to which milestone, likely terms, the pitch to insiders, and the cost-cutting plan that goes with it.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive]
advice_risk: [legal, financial]
inputs: [dataset, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [bridge-round, extension-round, insider-round, runway, cost-cutting]
pairs_with:
  prompts: [calculate-cash-runway, evaluate-down-round-terms, write-investor-update]
args:
  - name: position
    description: Cash, monthly net burn, revenue trend, the milestone you were aiming for and how far off it you are, and why the next round has not happened yet.
    type: text
    required: true
  - name: investors
    description: Your current investors, their likely capacity and appetite to put in more, and any pro rata or other rights they hold.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Honest diagnosis, Bridge to what, Size, Likely terms, The pitch to insiders, Cost plan, If the bridge fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders plan a bridge round, usually from existing investors, when cash will run out before the next round is achievable. A bridge works only if it reaches a specific, provable milestone that changes the next investor's answer; otherwise it extends the problem. Insiders will ask what changes, why they should keep funding when new investors would not, and what the company will cut. Bridges commonly come as convertible instruments with a discount and sometimes extra terms (warrants, a lower cap); the company must also plan what happens if the bridge falls short, because waiting too long removes the options of a sale or an orderly wind-down.
</context>

<task>
Plan the bridge.

<position>
{{position}}
</position>

<investors>
{{investors}}
</investors>

1. Honest diagnosis: why the round did not happen, in plain words, from the input. Separate market conditions from company-specific gaps.
2. Bridge to what: the specific milestone the bridge must reach, how it changes the next investor's decision, and the month it is reached under the plan.
3. Size: cumulative burn to the milestone after the cost plan, plus a buffer for a fundraise, minus cash. Show the formula. Show the size with and without cuts.
4. Likely terms: the term structures bridges commonly use in general (discount, cap, interest, warrants, pro rata participation requirements), what each costs the founders, and which points to resolve with the lawyer.
5. The pitch to insiders: a short email to the lead investor first, then the group, with the diagnosis, the milestone, the plan, the cuts and the ask.
6. Cost plan: cuts that extend runway without killing the milestone, with the monthly saving and the new runway.
7. If the bridge fails: the decision date, and the alternatives to consider early (acquisition talks, revenue-based or debt options, a smaller team, an orderly wind-down), as options to explore with advisers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the numbers given; show every runway and sizing calculation.
- Be candid: if the input shows no plausible milestone within any realistic bridge, say so.
- Do not promise investor appetite or terms; describe them as possibilities.
- For wind-down or insolvency questions, point to a lawyer or insolvency professional; directors' duties when a company may become insolvent vary by country and can be serious.
</constraints>

<output_format>
## Honest diagnosis
## Bridge to what
## Size
Table: Scenario | Monthly burn | Months to milestone + buffer | Bridge needed.
## Likely terms
## The pitch to insiders
## Cost plan
Table: Cut | Monthly saving | Effect on milestone.
## If the bridge fails
</output_format>
