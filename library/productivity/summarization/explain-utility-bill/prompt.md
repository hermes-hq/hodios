---
schema: 1
id: explain-utility-bill
kind: prompt
title: Explain and check a utility bill
description: Explains an energy, water, phone or broadband bill line by line - tariff, standing charges, estimated versus actual readings, extras - and checks it for likely errors and what to query.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [document]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [energy-bill, meter-readings, bill-check, household-bills, overcharging]
pairs_with:
  prompts: [explain-letter-i-received, extract-key-numbers, compare-documents]
args:
  - name: bill
    description: The bill text, all pages, including the readings, tariff details and charges. Remove your account number if you prefer.
    type: text
    required: true
  - name: context
    description: Optional - your previous bill or usual amount, your own meter readings with dates, any recent changes (moved in, new tariff, new contract), and your country.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Bill in brief, Line by line, Readings and usage, Possible errors to query, What to do next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone understand a household bill and spot what to query. Most bill shocks come from a few causes: estimated readings that drifted from real use and then a large catch-up bill, a fixed tariff that ended and rolled onto a pricier default, a promotional phone or broadband price that expired mid-contract, out-of-bundle or roaming charges, charges for a period before the person moved in, a meter serial number that is not theirs, a direct debit set higher or lower than usage, and late-payment or paper-bill fees. Careful readers check the reading type (estimated or actual), the dates and units, recalculate usage times unit rate plus standing charge, compare the tariff with what was agreed, and check the meter number before anything else.

<bill>
{{bill}}
</bill>

{{#context}}Reader's context: {{context}}{{/context}}
</context>

<task>
1. Summarise the bill in a few lines: supplier, period, total due, due date, and whether the account is in credit or debit.
2. Explain each line in plain words: standing charge, unit rate, usage, discounts, taxes, one-off charges, previous balance and payments.
3. Check the readings: actual or estimated, the dates, opening and closing values, and whether usage equals closing minus opening.
4. Recalculate the main charges from the figures on the bill (usage times rate plus standing charge times days, plus tax as stated) and show the working; flag differences.
5. Compare with the previous bill or usual amount if given, and say which line explains the difference.
6. List possible errors or things to query: estimated readings, tariff or promotion ended, charges outside the reader's dates, an unfamiliar meter number, unexpected fees.
7. Give next steps: submit an actual reading with a dated photo, ask for a corrected bill, check the tariff, and how to complain through the supplier's process if it is not resolved.
</task>

<constraints>
- Use only the figures on the bill and those the reader gives. Do not invent tariffs, prices or regulator rules.
- Show calculations so the reader can check them; if rounding explains a small difference, say so.
- Do not say the supplier is wrong as fact; say what does not add up and what to ask.
- Complaint routes and back-billing rules vary by country; mention that an energy or telecoms ombudsman or regulator may exist where they live, without naming rules you are not sure of.
- If the reader mentions being unable to pay or at risk of disconnection, point them to the supplier's hardship options and free debt advice.
</constraints>

<output_format>
## Bill in brief
Three or four lines.

## Line by line
Table: Line | Amount | What it means

## Readings and usage
Bullets with reading types and the usage check.

## Possible errors to query
Bullets with the working that shows the issue.

## What to do next
Numbered steps.
</output_format>
