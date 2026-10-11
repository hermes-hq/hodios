---
schema: 1
id: explain-corporate-action
kind: prompt
title: Explain a corporate action notice
description: Explains a corporate action notice - split, rights issue, spin-off, takeover, scrip dividend, tender - what it does to your holding, your choices, the deadline and what happens if you do nothing.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [corporate-actions, rights-issue, stock-split, takeover-offer, spin-off]
pairs_with:
  prompts: [explain-brokerage-statement, explain-equity-compensation]
  personas: [investing-educator]
args:
  - name: notice
    description: The notice from your broker, platform or the company, pasted as written, including any dates, ratios, prices and options.
    type: text
    required: true
  - name: holding
    description: How many shares you hold, what you paid if you know it, and the account type (ordinary, tax-advantaged, through an employer plan). Optional but needed for numbers.
    type: text
  - name: country
    description: Your country of tax residence and where the company is listed, since tax treatment differs. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What is happening, What it does to your holding, Your options, If you do nothing, Key dates, Tax and cost basis questions, Questions to ask your broker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Corporate actions split into mandatory events that happen whatever you do (splits, consolidations, most mergers once approved, name changes, many spin-offs) and voluntary or elective ones where you must choose (rights issues, tender and buyback offers, takeover offers before they become compulsory, scrip or cash dividend elections). What novices miss: a split or consolidation changes the number of shares, not the value; in a rights issue, doing nothing usually dilutes you, and the theoretical ex-rights price shows why taking up, selling the rights, or a mix are the real options (some markets sell lapsed rights and pay the proceeds, others do not); takeover offers can be cash, shares or a mix, with elections and possible scaling back; broker deadlines are often several days earlier than the company's, and platforms may not offer every option; fractions are usually paid in cash; a spin-off requires splitting the original cost basis between the two holdings; and holdings in tax-advantaged accounts may be treated differently. The notice itself, not general rules, decides what applies.

<notice>
{{notice}}
</notice>
{{#holding}}Holding: {{holding}}{{/holding}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Name the type of corporate action, whether it is mandatory or voluntary, and explain in two or three sentences why companies do this.
2. Show what it does to their holding with their numbers (or 1,000 shares if none, labelled illustrative): shares before and after, value before and after at the prices in the notice, fractions, any cash. For a rights issue, compute the theoretical ex-rights price and the value of the rights, and the dilution if they do nothing. For an offer, compare the offer value with the market price in the notice if given.
3. List every option the notice gives, with what each costs and leads to, in a table.
4. Spell out what happens if they do nothing, quoting the notice's default.
5. Key dates: record date, ex-date, broker deadline, company deadline, payment or settlement date. Flag that the broker deadline is the one that counts.
6. Tax and cost basis questions to check for their country and account type, such as cost basis allocation in a spin-off, whether shares received instead of cash are taxed, and whether selling rights is a disposal.
7. Questions to ask the broker or the company's registrar.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the terms in the notice. If a ratio, price or date is missing, say what it is and where to find it; do not fill it in from memory.
- Do not tell them which option to choose. Explain the consequences of each in money where possible.
- Do not state tax treatment as settled; describe what usually needs checking and label it "verify for your country".
- If the deadline is very close, put that first.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is happening
Short paragraph.

## What it does to your holding
Table: before | after, with working.

## Your options
Table: option | what you do | cost | result.

## If you do nothing
One or two sentences, quoting the notice where possible.

## Key dates
Table: date | what happens.

## Tax and cost basis questions
Bullets.

## Questions to ask your broker
Bullets.
</output_format>
