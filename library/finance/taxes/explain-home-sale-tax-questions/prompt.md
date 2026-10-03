---
schema: 1
id: explain-home-sale-tax-questions
kind: prompt
title: List tax questions for a home sale
description: Lists the tax questions to settle when selling a home, such as main residence relief, capital gains, improvements and reporting deadlines in the user's country, as a brief for an adviser.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [questions, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [capital-gains, home-sale, main-residence-relief, property-tax]
pairs_with:
  prompts: [explain-tax-on-investments, plan-windfall, organize-tax-documents]
args:
  - name: country
    description: Country (and state or region if relevant) where the home is and where you are tax resident, if different.
    type: string
    required: true
  - name: property_history
    description: When and for how much you bought, who owns it, periods you lived there or did not, any letting or home office use, major works done, expected sale price and date, and anything unusual (inherited, divorce, land sold separately).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Timeline, Reliefs that may apply, Questions to settle, Gain worksheet, Records to gather, Deadlines to confirm, Brief for your adviser]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a homeowner prepare for a tax conversation before they sell. Many countries exempt all or part of the gain on a main home, but the relief usually turns on facts people do not track: exactly when they lived there, periods away, whether part was let or used only for business, how much land goes with it, and which costs count as improvements rather than repairs. Some countries also impose short reporting or payment deadlines after completion, and non-resident sellers often face withholding or separate returns. The goal is a precise list of questions and records, so the adviser's time goes on judgement.

Country: {{country}}
</context>

<task>
Property history:

<property_history>
{{property_history}}
</property_history>

1. Build a dated timeline of ownership and use: purchase, moves in and out, letting periods, home office use, works, and planned sale. Mark gaps where the dates are unclear.
2. For {{country}}, describe the main residence relief or exclusion and how it is usually tested (ownership period, occupation period, minimum years, final-period rules, absence rules, letting, exclusive business use, land size, spouses or partners). Mark rules and limits "verify" unless you are confident they are current.
3. Turn the facts into specific questions the adviser must answer, for example whether a period abroad counts as occupation, or whether a let room reduces the relief.
4. Lay out a gain worksheet with the usual components: sale price, selling costs, purchase price, purchase costs, capital improvements (not repairs), any depreciation or allowances claimed while let, and the resulting gain before relief. Use the user's numbers where given and leave blanks to fill where not.
5. List the records that support each line, and note which ones are usually missing (improvement invoices, proof of occupation).
6. List deadlines and withholding points to confirm: reporting or payment windows after completion, non-resident rules, and the tax return where the sale is reported.
7. Close with a short brief the user can send to an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not conclude whether tax is due or how much. Present relief rules as questions to confirm with an adviser.
- Never present a threshold, period or deadline as certain unless you are confident it is current for {{country}}; mark it "verify" and name the official source.
- Explain the difference between an improvement (adds value or life, usually adds to cost) and a repair or maintenance (usually does not), and say the boundary is a judgement call to confirm.
- If the user is non-resident, the home was inherited, or ownership changed through divorce, flag that these change the rules and need professional advice.
- If you do not know the country's rules well, say "I don't know" for those parts and keep to the common structure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Timeline
Table: from | to | use (lived in, let, empty, business use) | notes.

## Reliefs that may apply
Bullets with the main tests and confidence.

## Questions to settle
Numbered, each tied to a fact in the timeline.

## Gain worksheet
Table: line | amount | evidence | note. Totals where figures allow.

## Records to gather
Checklist.

## Deadlines to confirm
Table: item | usual timing | confirm with.

## Brief for your adviser
Five to eight sentences.
</output_format>
