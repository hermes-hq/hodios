---
schema: 1
id: review-llc-operating-agreement
kind: prompt
title: Review an LLC operating or partnership agreement
description: Reviews an LLC operating agreement or partnership agreement for one member, covering capital calls, profit splits, management, deadlock, transfer limits and buy-sell exits.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, individual, consultant]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [operating-agreement, partnership-agreement, llc, capital-contributions, buy-sell, deadlock]
pairs_with:
  prompts: [review-shareholders-agreement, outline-cofounder-agreement, choose-business-structure, explain-contract-clause]
args:
  - name: agreement
    description: The operating agreement, partnership agreement or members' agreement, with section numbers. Remove tax ID numbers and addresses.
    type: text
    required: true
  - name: position
    description: Your role and percentage, what you contribute (money, work, property), the other members, how the business makes money, and what you are worried about.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region where the entity is formed and the governing law. LLC and partnership default rules differ a lot between places.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, Money in and money out, Clause check, Exit scenarios, Questions for your lawyer and accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Operating and partnership agreements are often copied from a template at formation and read properly only when the members fall out. What business lawyers look at first: whether the business is member-managed or manager-managed and which decisions need unanimous or majority consent; capital contributions, and whether members can be required to put in more money (capital calls), with dilution or penalty loans if they cannot; how profits and losses are allocated versus how cash is actually distributed, including tax distributions so members can pay tax on income they are taxed on but did not receive (common for pass-through entities); whether a member who contributes work (sweat equity) has vesting or just an outright percentage; salaries or guaranteed payments to working members; restrictions on transfer, rights of first refusal, drag and tag rights; buy-sell triggers (death, disability, divorce, leaving, breach) and how the price is set (formula, appraisal, book value) and paid (often over years); deadlock between equal members; non-competes and duties; and dissolution. Where the agreement is silent, default rules of the place of formation fill the gap, and those vary.

Jurisdiction: {{jurisdiction}}

<position>
{{position}}
</position>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: what the user's rights and obligations are as a member, and the three issues that matter most for their position.
2. Money in and money out: contributions and capital calls, consequences of not contributing, profit and loss allocation, distributions and tax distributions, payments to working members. Work a short example with the stated percentages.
3. Clause check, quoting each section: management and voting, reserved decisions, contributions and capital calls, allocations and distributions, compensation, vesting of interests, information rights, duties and conflicts, non-compete, transfer restrictions and first refusal, drag and tag, buy-sell triggers, valuation and payment terms, deadlock, removal of a manager, admission of new members, dissolution, disputes, amendments.
4. Exit scenarios: what happens to the user under the text if they leave voluntarily, are pushed out, die or become disabled, divorce, or if the members deadlock, including how their interest would be valued and paid.
5. Questions for your lawyer and accountant: ranked, including where local default rules would apply because the agreement is silent, and tax questions to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote section numbers; write "not stated" where a topic is missing. Do not invent percentages, valuations or default rules.
- Do not state what the local default rules are as fact; say the jurisdiction's default rules may apply and should be checked.
- Do not give tax treatment as fact; flag it for an accountant.
- Recommend that the user has their own lawyer, not the company's or another member's, review the agreement before signing or amending it, especially where capital calls, a buy-out price or personal guarantees are involved.
- Stay on the user's side as stated, but point out terms that would be unfair to other members too, since lopsided terms cause disputes.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Money in and money out
Bullets, then a worked example.

## Clause check
Table: topic | section and short quote | rating (fine / check / negotiate) | why.

## Exit scenarios
Table: scenario | what the text says | price and payment | concern.

## Questions for your lawyer and accountant
Numbered, marked lawyer or accountant.
</output_format>
