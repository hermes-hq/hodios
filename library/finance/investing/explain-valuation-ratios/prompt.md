---
schema: 1
id: explain-valuation-ratios
kind: prompt
title: Calculate and explain a company's valuation ratios
description: Calculates P/E, P/B, EV/EBITDA, dividend yield and free cash flow yield from figures you supply, explains each with its blind spots, and compares them with peers you provide.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual, student, financial-analyst]
subject: [economics]
requires: [none]
inputs: [dataset, text]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [valuation-multiples, price-to-earnings, enterprise-value, free-cash-flow, peer-comparison]
pairs_with:
  prompts: [read-company-financials, learn-dcf-valuation, research-company-stock]
  personas: [investing-educator]
args:
  - name: figures
    description: The company's figures with units, currency and date - share price, diluted shares, earnings, book equity, debt, cash, EBITDA, operating cash flow, capex, dividends per share. Say whether earnings are reported or adjusted.
    type: text
    required: true
  - name: peers
    description: The same figures or ready-made ratios for comparable companies, and the company's own past ratios if you have them. Optional.
    type: text
  - name: industry
    description: The industry or sector. Optional, but ratios mean different things in banks, utilities, software or miners.
    type: string
output_contract:
  format: markdown
  sections: [Ratios calculated, What each one says here, Compared with peers and history, Where these ratios mislead, What is missing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Valuation multiples are shortcuts that compress many assumptions into one number, so each needs reading with its blind spots. P/E uses earnings that can be inflated by one-offs or "adjusted" definitions, means nothing when earnings are negative or tiny, and looks lowest for cyclical companies at the top of their cycle. P/B suits banks and insurers whose assets are mostly financial, but says little for asset-light firms whose value sits in brands, software or people. Enterprise value (market value plus debt, minus cash, plus items such as minority interests, preferred shares and often leases) is needed for EV/EBITDA, which ignores capital spending and so flatters capital-heavy businesses. A high dividend yield can signal a coming cut. Free cash flow yield (free cash flow over market value) is often the most direct, but one year's capex can distort it. Use diluted shares, keep periods consistent (trailing versus forward), and compare only with true peers and with the company's own history. A low multiple is not the same as cheap: the market may expect decline.

<figures>
{{figures}}
</figures>
{{#peers}}Peers and history: {{peers}}{{/peers}}
{{#industry}}Industry: {{industry}}{{/industry}}
</context>

<task>
1. Check the inputs: units, currency, date of the price, diluted versus basic shares, reported versus adjusted earnings, and whether the periods line up. Flag mismatches before calculating.
2. Calculate market value, enterprise value, P/E, P/B, EV/EBITDA, dividend yield and FCF yield where the data allows, with formula and working for each. Skip any ratio the data cannot support and say why.
3. Explain what each ratio says about this company in plain words, including the implied expectations (for example, what earnings growth a high P/E assumes in broad terms).
4. If peers or history are supplied, compare in a table and explain the gaps, considering differences in growth, margins, debt and business mix rather than calling one cheaper.
5. Where these ratios mislead for this company or industry: one-offs, cycles, leases, heavy capex, negative earnings, share-based pay.
6. What is missing for a fuller picture.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Calculate only from the figures given. Do not look up or recall prices, earnings or peer ratios; ask for them instead.
- Do not call the stock cheap, expensive, undervalued or a buy. Describe what the ratios imply and what would have to be true.
- Show every calculation so the learner can check it. Keep the same units throughout.
- If adjusted earnings are used, say what the reported figure would give if available.
{{> output/uncertainty}}
</constraints>

<output_format>
## Ratios calculated
Table: ratio | formula | working | result.

## What each one says here
Bullets, one per ratio.

## Compared with peers and history
Table and short commentary, or "no peers supplied".

## Where these ratios mislead
Bullets specific to this company or industry.

## What is missing
Bullets.
</output_format>
