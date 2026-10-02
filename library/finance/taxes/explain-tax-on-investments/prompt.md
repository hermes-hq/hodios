---
schema: 1
id: explain-tax-on-investments
kind: prompt
title: Explain tax on investments
description: Explains how investment income is commonly taxed in a country - interest, dividends, capital gains, losses and allowances - with a worked example and the points to verify.
category: taxes
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [topic, text]
output: [explanation, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [capital-gains, dividends, cost-basis, tax-wrappers]
pairs_with:
  prompts: [compare-retirement-accounts, organize-tax-documents, check-portfolio-diversification]
  personas: [investing-educator]
args:
  - name: country
    description: Country where you are tax resident (and state or region if it adds its own tax).
    type: string
    required: true
  - name: investment_types
    description: "Optional: what you hold or plan to hold - savings accounts, bonds, shares, funds or ETFs (domestic or foreign), crypto, rental property - and whether any sit inside tax-advantaged accounts."
    type: text
output_contract:
  format: markdown
  sections: [The overview, Income type by income type, Worked example, Losses and timing, Foreign investments, Records to keep, Points to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain investment taxation for one country to an investor who wants to understand it before they talk to an adviser or file a return. Every system answers the same questions: which kinds of return are taxed (interest, dividends, gains, fund distributions, accumulating fund income); at what rates and with what allowances or exemptions; when a gain is taxed (when realised, annually on a deemed basis, or on distribution); how cost basis is worked out; how losses can be used; how tax-advantaged accounts change things; and how foreign income and withholding are handled. Investors are most often caught out by tax on reinvested income they never received as cash, by foreign withholding they could have reduced, by loss rules (such as rules against selling and quickly rebuying), and by poor records of what they paid.

Country: {{country}}
</context>

<task>
{{#investment_types}}
Investments:

<investments>
{{investment_types}}
</investments>

{{/investment_types}}
1. Give a short overview of how {{country}} taxes investment income: whether it is taxed with other income or separately, whether there is a final withholding tax, and which accounts or wrappers shelter investments.
2. For each income type relevant to the person (or all common ones if none were given), explain: how it is taxed, the usual rate structure, any allowance or exemption, when it is taxed, and how it is reported or withheld. Give rates and allowances only if you are confident, with the tax year, and mark them "verify".
3. Work one example with round, hypothetical numbers: for instance buying 10,000 of a fund, receiving 300 of dividends, then selling for 13,000 after three years, showing the taxable amounts and how the allowance or rate would apply under the rules you described. Label the rates used as assumptions.
4. Explain losses and timing: offsetting losses against gains, carrying them forward, holding-period distinctions, and any rule restricting selling and rebuying the same investment to realise a loss.
5. Explain foreign investments: foreign withholding on dividends, treaty relief or credits, special treatment of foreign funds, and currency gains.
6. List the records to keep (purchase dates and prices, fees, reinvested distributions, corporate actions, broker statements).
7. List the points to verify and where: the tax authority's guidance, the broker's annual tax statement, or a tax adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person how much tax they will owe, which strategy to use, or what to buy or sell for tax reasons. Explain mechanics so they can ask good questions.
- Never invent rates, allowances or rules. If you are unsure of a figure, explain the mechanism and say exactly what to look up.
- Note when a state or regional tax, a church tax, a solidarity surcharge or social contributions may apply on top, only if you are confident it exists in that country.
- Flag that cross-border situations, crypto, derivatives, rental property and company shares can have special rules, and recommend a tax adviser for them.
{{> output/uncertainty}}
</constraints>

<output_format>
## The overview
One short paragraph.

## Income type by income type
Table: income type | how it is taxed | rate or band (tax year, verify) | allowance or exemption | when taxed | how reported.

## Worked example
Step-by-step arithmetic with stated assumptions.

## Losses and timing
Bullets.

## Foreign investments
Bullets.

## Records to keep
Checklist.

## Points to verify
Bullets with where to check each.
</output_format>
