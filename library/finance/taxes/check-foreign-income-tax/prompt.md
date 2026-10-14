---
schema: 1
id: check-foreign-income-tax
kind: prompt
title: Check tax on foreign income
description: Lists how to report income from another country - rent, pension, work or investments - where it is taxed first, double-tax relief and treaty points, for someone who has not moved.
category: taxes
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [foreign-income, double-taxation, tax-treaties, foreign-tax-credit]
pairs_with:
  prompts: [plan-tax-move-abroad, explain-tax-on-investments, organize-rental-income-records]
  personas: [tax-educator]
args:
  - name: income
    description: Each source of foreign income - the country, type (rent from property, pension, remote or occasional work, interest, dividends, sale of an asset), yearly amount and currency, and any tax already withheld or paid there. Say if you are a citizen of either country.
    type: text
    required: true
  - name: country
    description: Country where you live and are tax resident.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Income by type, Where each is taxed first, Double-tax relief, Reporting duties, Records and currency, Questions for an adviser, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a resident understand how income from another country is usually taxed and reported, without moving anywhere. Most countries tax residents on worldwide income, and some (notably the US) tax citizens wherever they live; a few allow special regimes for some residents, which need advice. The source country often taxes certain income first: rent from property is usually taxed where the property is, and may require a non-resident return there; dividends and interest often have tax withheld at source, which a tax treaty may reduce; pensions depend on the treaty and on whether the pension is a government or private one. Double taxation is then relieved at home by a credit for foreign tax paid (usually capped at the home tax on that income) or by exempting the income, sometimes while still counting it to set the rate on other income. Excess foreign withholding above the treaty rate is usually reclaimed from the source country, not credited at home. Income is usually converted at an official or transaction-date rate, and many countries require separate reporting of foreign accounts or assets, with penalties for not reporting even when no tax is due. Information is increasingly exchanged automatically between tax authorities.

Country of residence: {{country}}
</context>

<task>
Foreign income:

<income>
{{income}}
</income>

1. Income by type: list each source with country, type, amount, currency and tax already paid abroad.
2. Where each is taxed first: for each source, whether the source country usually taxes it (and whether a non-resident return or registration is needed there) and whether {{country}} also taxes it. Say whether a tax treaty between the two countries likely exists and what it typically decides for that income type. Mark treaty specifics "verify" unless confident.
3. Double-tax relief: credit or exemption method for each income type, the usual cap on credits, treaty withholding rates versus what was actually withheld, and how to reclaim excess withholding from the source country.
4. Reporting duties in {{country}}: where the income goes on the return, foreign account or asset reporting, and any separate forms. Mark them "verify".
5. Records and currency: documents to keep from both countries, and how amounts are usually converted.
6. Questions for an adviser with cross-border experience.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is for people staying in their country of residence. If the person is moving or has recently moved, note that residency and exit rules are a separate question and suggest planning that move with an adviser.
- Never invent treaty rates, thresholds, forms or deadlines; mark everything country-specific "verify" and point to the tax authorities' guidance or the treaty text.
- Do not help hide foreign income or accounts. If asked, explain that information is exchanged between countries and that voluntary disclosure routes usually reduce penalties, and suggest an adviser.
- Flag that citizenship-based taxation, special residence regimes, trusts, foreign companies and pensions transfers need specialist advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Income by type
Table: source | country | type | amount | tax paid abroad.

## Where each is taxed first
Table: source | taxed in source country? | taxed at home? | treaty point (verify) | action needed abroad.

## Double-tax relief
Bullets by income type.

## Reporting duties
Checklist marked "verify".

## Records and currency
Checklist.

## Questions for an adviser
Up to six questions.

## Points to verify
Bullets with where to check each.
</output_format>
