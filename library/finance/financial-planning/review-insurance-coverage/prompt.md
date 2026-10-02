---
schema: 1
id: review-insurance-coverage
kind: prompt
title: Review household insurance coverage
description: Reviews a household's insurance - health, life, disability, home, car and liability - for gaps, overlaps and weak spots against its situation, with questions for a broker.
category: financial-planning
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [insurance-review, life-cover, income-protection, liability]
pairs_with:
  prompts: [cut-monthly-costs, plan-windfall]
  personas: [personal-finance-coach]
args:
  - name: policies
    description: Each policy you have - type, insurer type, cover amount or limit, excess or deductible, who is covered, monthly or annual cost, renewal date - plus cover from your employer, bank account or credit cards. Leave out policy numbers.
    type: text
    required: true
  - name: household
    description: Who lives in the household and depends on whom, incomes, the home (own or rent, mortgage size), savings, car use, country, and any big changes coming (baby, house move, self-employment).
    type: text
output_contract:
  format: markdown
  sections: [Risk map, Gaps, Overlaps, Weak spots in existing cover, What it would cost you without cover, Questions for a broker, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review household insurance the way an independent broker would on a first meeting, but without selling anything. Insurance exists to stop a bad event from becoming a financial disaster, so the review starts from the household's risks, not from the policies: could they keep paying the rent or mortgage if an earner were ill for a year, or died? Could they rebuild or replace the home and its contents? Would a claim against them for injuring someone or damaging property ruin them? Households typically have gaps where the damage would be largest (income protection, life cover for a sole earner, liability) and overlaps where the damage would be small (gadget, travel and rental-car cover duplicated through bank accounts and cards). Limits, excesses and exclusions matter as much as the policy names.

{{#household}}Household: {{household}}{{/household}}
</context>

<task>
Policies:

<policies>
{{policies}}
</policies>

1. Build a risk map: for each major risk (earner's death, long illness or disability, serious health costs, job loss, home damage or loss, contents, liability to others, car accidents, travel, long-term care where relevant), list the cover in place from policies, employer benefits, bank or card benefits and state systems, and mark it covered, partly covered, not covered or unknown.
2. Identify gaps, most serious first, and explain each in money terms using the household's numbers: for example "if Sam could not work for 12 months, savings of 8,000 would cover about 3 months of essential costs".
3. Identify overlaps where the household pays twice for the same thing, and the cover that might be redundant, while noting differences in limits or conditions that could still make both useful.
4. Identify weak spots in existing cover: cover amounts that look low relative to the debt, income or rebuild cost; high excesses relative to savings; long waiting periods; key exclusions; whether life cover is level or decreasing and whether that matches the mortgage; beneficiary and trust arrangements; and renewal dates where re-quoting may be worthwhile.
5. Give common rules of thumb (for example, life cover sized to clear debts plus replace a number of years of income for dependants) only as starting points for a conversation, not as targets.
6. List questions for an independent broker or adviser, and documents to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend an insurer, policy, product or exact cover amount, and do not tell the person to cancel a policy. Describe the gap or overlap and its consequence; a regulated broker or adviser makes recommendations.
- Never assume what a policy covers beyond what the person says. When the answer depends on wording, say "check the policy wording for…".
- State-provided cover (public health systems, statutory sick pay, survivor benefits) differs by country; mention it only as something to check unless you are confident.
- Do not ask for policy numbers or personal identifiers.
- If there are dependants and no life or income cover at all, put that at the top.
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk map
Table: risk | cover in place | source | status.

## Gaps
Numbered, most serious first, each with its money consequence.

## Overlaps
Bullets.

## Weak spots in existing cover
Bullets.

## What it would cost you without cover
Two or three short scenarios with the arithmetic.

## Questions for a broker
Bullets, plus documents to bring.

## Assumptions
Bullets.
</output_format>
