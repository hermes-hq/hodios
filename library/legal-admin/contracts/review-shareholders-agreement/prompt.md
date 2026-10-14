---
schema: 1
id: review-shareholders-agreement
kind: prompt
title: Review a shareholders' agreement as a minority holder
description: Reviews a shareholders' agreement for a minority holder - angel, employee shareholder or junior co-founder - covering control, dilution, transfers, leaver terms, drag and tag rights.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, individual, executive]
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
depth: specific
tags: [shareholders-agreement, minority-shareholder, drag-along, good-leaver, pre-emption-rights]
pairs_with:
  prompts: [outline-cofounder-agreement, explain-contract-clause, summarize-contract]
  workflows: [contract-review-track]
args:
  - name: agreement
    description: The shareholders' agreement and, if available, the relevant parts of the company's articles or bylaws, with clause numbers.
    type: text
    required: true
  - name: position
    description: How you hold shares (invested cash, employee or option holder, co-founder), your percentage, whether you are a director or employee, and what you care about most.
    type: text
    required: true
  - name: country
    description: Country of the company. Company law sets default minority protections that the agreement adds to or changes.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, Clause check, Scenarios, What to negotiate, Questions, Get a lawyer for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A shareholders' agreement, together with the company's constitution, decides what a minority shareholder can actually do with their shares and what can be done to them. Advisers look first at: reserved matters needing minority or investor consent; board seats or observer rights; information rights; pre-emption rights on new shares (protection against dilution) and the carve-outs that bypass them; transfer restrictions and rights of first refusal that make shares hard to sell; drag-along (the majority can force a sale), its threshold and minimum price protections; tag-along (the right to join a sale on the same terms); leaver provisions that force employees or founders who leave to sell, with good and bad leaver definitions deciding whether they get market value or a nominal price, and whether "bad leaver" includes resignation; vesting; restrictive covenants; deadlock and dispute mechanisms; and how shareholders exit if there is never a sale. Many terms are also in the articles, which may prevail on some points, so both documents matter.

Country: {{country}}

<position>
{{position}}
</position>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: what the agreement gives and takes from the user, and the three most important issues for their position.
2. Clause check, quoting each clause: reserved matters, board and information rights, pre-emption on new shares and carve-outs, transfer restrictions, drag-along, tag-along, leaver provisions and valuation, vesting, restrictive covenants, deadlock, dividend policy, exit, interaction with the articles.
3. Scenarios: walk through what happens to the user's shares if (a) the company raises a new round, (b) a majority holder sells, (c) the user leaves employment or resigns as director, (d) the company is sold below its last valuation. Show figures only from the user's own inputs or clearly labelled examples.
4. What to negotiate: ranked asks suited to the user's leverage (an employee or small angel usually has less), with fallback positions.
5. Questions for the company or majority shareholders.
6. Get a lawyer for: features of this agreement that warrant it, and what to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where missing, and note when the articles should be checked.
- Do not state the default minority protections of any company law; say what to check locally.
- Do not value the shares or give tax advice on them; flag tax as a question for an adviser where leaver or vesting terms create it.
- Recommend a lawyer before signing any shareholders' agreement where the user is investing or giving up rights.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four bullets.

## Clause check
Table: topic | clause and short quote | effect on you | rating (fine / check / negotiate).

## Scenarios
One short section per scenario.

## What to negotiate
Numbered: ask - why - fallback.

## Questions
Numbered.

## Get a lawyer for
Bullets.
</output_format>
