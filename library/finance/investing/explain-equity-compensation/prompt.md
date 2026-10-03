---
schema: 1
id: explain-equity-compensation
kind: prompt
title: Explain employee equity compensation
description: Explains employee equity such as RSUs, stock options and ESPPs - vesting, strike price, exercise choices, tax events to verify and concentration risk - with worked numbers.
category: investing
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual, software-engineer, executive]
requires: [none]
inputs: [text, document]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rsu, stock-options, espp, vesting, concentration-risk, startup-equity]
pairs_with:
  prompts: [explain-tax-on-investments, check-portfolio-diversification, plan-windfall]
  personas: [investing-educator]
args:
  - name: grant_details
    description: "What the grant letter or equity portal says: type (RSU, ISO, NSO, EMI, ESPP or other), number of shares or units, strike or exercise price, grant date, vesting schedule and cliff, current share price or latest valuation, public or private company, and your salary if relevant."
    type: text
    required: true
  - name: country
    description: Country (and state if relevant) where you are tax resident, since equity taxation differs widely. Optional; the explanation stays general without it.
    type: string
output_contract:
  format: markdown
  sections: [What you have, How it vests, Worked example, Tax events to verify, Decisions you will face, Concentration risk, What we could not assess, Questions for a tax adviser]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain employee equity to the person who received it, the way a patient equity-compensation educator would. People misjudge equity in a few recurring ways: they value options at the share price instead of the spread over the strike, forget that private-company shares may be illiquid for years and sit behind investors' liquidation preferences, miss that vesting or exercise can be a taxable event before they have any cash from selling, let the exercise window after leaving lapse, and end up with a large part of their net worth tied to their employer, the same company that pays their salary.

{{#country}}Tax residence: {{country}}{{/country}}
</context>

<task>
Grant details:

<grant_details>
{{grant_details}}
</grant_details>

1. What you have: identify each instrument (RSU, stock option and its type if stated, ESPP, or a local scheme such as EMI or a phantom or virtual share plan) and explain in two or three sentences what it is and what the person actually owns today. If the type is unclear, say what the documents would need to show.
2. How it vests: lay out the schedule from the details (cliff, monthly or quarterly vesting, performance conditions, acceleration if stated) as a table of dates and cumulative units. Note what typically happens to unvested units and to the exercise window when someone leaves, and tell them to check their plan's terms.
3. Worked example with their numbers, or round hypothetical ones clearly labelled:
   - RSUs: value at vest = units x share price; show it at today's price and at 50% lower and 50% higher.
   - Options: spread = (share price - strike) x shares; cost to exercise = strike x shares; show the same three price scenarios, including the case where the options are underwater.
   - ESPP: purchase price after any discount and lookback, the immediate gain, and what happens if the price falls before they sell.
   - Private company: say that the latest valuation is not a market price, that preferred shareholders are usually paid first in an exit, and that shares may not be sellable until an exit or tender.
4. Tax events to verify: list the moments that are commonly taxable (grant, vest, exercise, purchase, sale) and how each is commonly treated, flagging where it depends on the country, the plan type and holding periods. If the country is the United States, name the concepts to discuss (ordinary income at vest or exercise for some types, AMT exposure for ISOs, 83(b) elections for early exercise, qualifying versus disqualifying ESPP dispositions) without computing a final tax figure. For any other country, describe the general pattern and mark every specific rule "verify". Point out when tax could be due before they can sell.
5. Decisions you will face: sell at vest or hold, when and whether to exercise, early exercise, ESPP participation level. For each, the factors and trade-offs, not a choice.
6. Concentration risk: estimate what share of their net worth (if given) or annual pay the equity represents, explain why holding a lot of the employer's stock doubles their exposure to one company, and describe common de-risking approaches (a sell plan, selling at vest, staged diversification) in general terms.
7. What we could not assess: missing data that changes the answer.
8. Questions to bring to a tax adviser or a fee-only financial planner.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person to sell, hold, exercise or buy, and do not predict the share price or an exit. Present scenarios and the factors that decide.
- Show every calculation. Label any number you assumed.
- Never state a tax rate, holding period or deadline as fact unless you are confident it is current for their country; otherwise mark it "verify". Deadlines such as the 30-day window for a US 83(b) election or a post-departure exercise window are critical: tell them to confirm the exact date in writing.
- If the documents mention trading windows, blackout periods or insider status, say that selling may be restricted and they must follow company policy.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you have
Short paragraph per instrument.

## How it vests
Table: date | units vesting | cumulative units | notes.

## Worked example
Table per instrument: scenario | share price | value or spread | cash needed | notes. Arithmetic shown under the table.

## Tax events to verify
Table: event | what commonly happens | depends on | confidence.

## Decisions you will face
Bullets: decision, factors, trade-off.

## Concentration risk
Two or three sentences plus the share of net worth or pay.

## What we could not assess
Bullets.

## Questions for a tax adviser
Numbered.
</output_format>
