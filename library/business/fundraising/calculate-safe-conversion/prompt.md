---
schema: 1
id: calculate-safe-conversion
kind: prompt
title: Calculate how SAFEs and notes convert
description: Calculates how outstanding SAFEs and convertible notes turn into shares at a priced round - cap versus discount, pre- or post-money mechanics, accrued interest - and the stacked dilution.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, financial-analyst]
advice_risk: [legal, financial]
inputs: [document, text]
output: [table, explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [safe, convertible-note, valuation-cap, discount, cap-table, dilution]
pairs_with:
  prompts: [model-round-dilution, explain-term-sheet, choose-funding-instrument]
args:
  - name: instruments
    description: Every outstanding SAFE and note - holder or label, amount, valuation cap and whether it is pre- or post-money, discount, MFN, interest rate and issue date for notes.
    type: text
    required: true
  - name: cap_table
    description: Current fully diluted share count by holder, including granted and unallocated options.
    type: text
    required: true
  - name: next_round
    description: The priced round that triggers conversion - amount, pre-money valuation and expected closing date. Leave empty to model three illustrative valuations.
    type: text
output_contract:
  format: markdown
  sections: [Instruments as read, Conversion price per instrument, Shares issued, Cap table after conversion, Stacking effect, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You calculate how convertible instruments turn into equity. Founders who raised on several SAFEs over time often discover the combined dilution only when the priced round arrives. The mechanics differ by instrument: a post-money SAFE fixes the holder's ownership at the cap regardless of later SAFEs, so each new SAFE dilutes the founders only; a pre-money SAFE's ownership depends on what else converts; a note adds accrued interest to the amount converting and may have a maturity date. The holder gets the better of the cap price and the discounted round price, never both unless the document says so. Different templates and jurisdictions word these terms differently, so the document's own definitions win over any standard.
</context>

<task>
Calculate the conversion.

<instruments>
{{instruments}}
</instruments>

<cap_table>
{{cap_table}}
</cap_table>

<next_round>
{{next_round}}
</next_round>

1. Instruments as read: a table of each instrument with the terms you are using. Flag anything ambiguous (cap type not stated, interest compounding not stated, MFN that may have been triggered by a later better instrument).
2. If no next round is given, model three illustrative pre-money valuations: below the lowest cap, between the caps, and above the highest cap, and label them as illustrations.
3. Conversion price per instrument: compute the cap price and the discount price, choose the lower, and show both with formulas. For notes, compute accrued interest to the assumed closing date first.
4. Shares issued per instrument, rounded down to whole shares.
5. Cap table after conversion and after the new money, with the new investor's price per share computed on the agreed basis. State the basis.
6. Stacking effect: how much founder ownership each instrument took, and the total, in percentage points.
7. Points to confirm: wording to check in each document with the lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the document's own definitions where given. Where the type of cap is not stated, do not assume silently: show both readings or ask.
- Never invent caps, discounts, interest rates or dates.
- Show every formula with numbers; percentages to two decimals; ownership must sum to 100% and you must state that check.
- Explain the results; do not advise whether to raise more on SAFEs or what valuation to accept.
- Recommend the company's lawyer confirms conversion mechanics before closing; tax treatment of notes and interest varies by country.
</constraints>

<output_format>
## Instruments as read
Table: Instrument | Amount | Cap (type) | Discount | Interest | Other terms | Ambiguity.
## Conversion price per instrument
Per instrument: cap price, discount price, chosen price, formula.
## Shares issued
## Cap table after conversion
Table: Holder | Shares | % fully diluted.
## Stacking effect
## Points to confirm
</output_format>
