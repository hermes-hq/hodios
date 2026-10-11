---
schema: 1
id: review-stock-option-grant
kind: prompt
title: Review a stock option or RSU grant agreement
description: Reviews an employee stock option or RSU grant agreement and plan for vesting, cliff, exercise window, leaver terms, acceleration and the tax deadlines to confirm with an adviser.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, software-engineer, job-seeker, manager]
subject: [law]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stock-options, rsu, vesting-schedule, exercise-window, good-leaver, equity-grant]
pairs_with:
  prompts: [explain-equity-compensation, evaluate-job-offer, explain-contract-clause]
args:
  - name: grant
    description: The grant notice or award letter and the relevant parts of the equity plan (vesting, termination, change of control, exercise). Remove ID and account numbers.
    type: text
    required: true
  - name: situation
    description: Your role, start date, whether the company is private or listed, what you were told about the grant, and any plans to leave or questions you have.
    type: text
    required: true
  - name: country
    description: Country where you live and pay tax, and the company's country. Tax treatment of equity differs a lot by country.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, Key terms, Vesting timeline, If you leave, If the company is sold, Dates and decisions to diarise, Questions for HR and a tax adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Employees usually see a number of options or units in an offer letter, and the terms that decide what that number is worth sit in the grant agreement and the plan. What equity advisers check: the type of award (options, restricted stock units, restricted stock, or a local tax-favoured scheme) and its strike price; the vesting schedule, cliff, and whether vesting is by time, performance or a liquidity event (common for private company RSUs, which may not vest until a sale or listing); the post-termination exercise window for options, often 90 days, after which unexercised vested options are lost; good leaver and bad leaver definitions, which can forfeit even vested awards or force a sale back at cost; company repurchase rights and transfer restrictions on shares; acceleration on a sale (single trigger or double trigger, needing both a sale and loss of the job); what happens to unvested awards if the company is acquired; expiry dates; and time-sensitive tax elections or reporting in some countries, which can only be made within a short window after grant or exercise (one example: in the US, a section 83(b) election for restricted stock or early-exercised options has a strict filing deadline counted in days; whether it applies and is wise is a question for a tax adviser). Promises in an offer letter or by a recruiter do not count unless the plan documents say the same.

Country: {{country}}

<situation>
{{situation}}
</situation>
</context>

<task>
<grant>
{{grant}}
</grant>

1. In brief: what was granted, what it could be worth in principle, and the three terms that most affect whether the user ever realises value.
2. Key terms, quoting each: award type, number, strike or purchase price, grant date, vesting schedule and cliff, vesting conditions, expiry, exercise method, post-termination exercise window, leaver definitions, repurchase and transfer restrictions, change of control and acceleration, clawback, governing law.
3. Vesting timeline: when each tranche vests from the stated dates, as a table.
4. If you leave: what happens to vested and unvested awards if the user resigns, is dismissed, is made redundant, or leaves for health reasons, under the text, including the exercise cost and deadline for options.
5. If the company is sold: what the text says happens to vested and unvested awards.
6. Dates and decisions to diarise: vesting dates, exercise deadlines, expiry, and any tax election or reporting window to confirm with a tax adviser.
7. Questions for HR and a tax adviser: ranked, including any gap between what the user was told and what the documents say.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the documents; write "not stated" where a term is missing. Do not invent valuations, share prices or strike prices.
- Do not give tax outcomes or say whether to make a tax election or exercise; list the decisions and deadlines to confirm with a tax adviser in the user's country.
- Any value illustration must use the user's numbers, label hypothetical share prices clearly, and show the arithmetic.
- Flag any conflict between the offer letter or verbal promises and the plan documents.
- Recommend an employment or equity lawyer when the grant is large, the user is negotiating leaver or acceleration terms, or a dispute about forfeiture is likely; recommend a tax adviser before any exercise or election.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Key terms
Table: term | what the document says | note.

## Vesting timeline
Table: date | amount vesting | cumulative.

## If you leave
Table: reason for leaving | vested | unvested | deadline and cost.

## If the company is sold
Short bullets.

## Dates and decisions to diarise
Bullets with dates.

## Questions for HR and a tax adviser
Numbered, marked HR or tax adviser.
</output_format>
