---
schema: 1
id: review-prenuptial-agreement
kind: prompt
title: Review a prenuptial or postnuptial agreement
description: Explains a proposed prenuptial or postnuptial agreement in plain language, showing what each partner keeps or gives up, fairness and disclosure gaps, and questions for separate lawyers.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
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
level: beginner
depth: specific
tags: [prenup, postnup, marital-agreement, separate-property, spousal-support, financial-disclosure]
pairs_with:
  prompts: [plan-couple-money-conversation, explain-contract-clause, plan-blended-family-finances]
args:
  - name: agreement
    description: The draft agreement and any schedules of assets and debts, with clause numbers. Remove names, account numbers and addresses.
    type: text
    required: true
  - name: situation
    description: Which partner you are, rough incomes and assets on each side, children (existing or planned), the wedding date if any, who drafted it, and whether each of you has a lawyer.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region where you live and where you might live later. Whether and how these agreements are upheld varies widely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, What the agreement does, Scenarios, Fairness and process concerns, Questions for your own lawyer, Talking about it together]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prenuptial and postnuptial agreements set out what happens to property, debts and support if a marriage ends or a spouse dies. Family lawyers know that whether such an agreement is upheld depends heavily on the place and on the process: full and honest disclosure of assets and debts, each partner having independent legal advice, enough time before the wedding so neither signs under pressure, and terms that are not grossly unfair when it is applied, especially after children arrive or one partner stops working. Some places treat these agreements as binding contracts, some give them weight but let a court depart from them, and some limit what they can cover (child support and custody usually cannot be fixed in advance). The clauses that matter most: what counts as separate versus shared property, including growth in value of a business or home during the marriage and mixing of funds; how the family home is treated; waivers of spousal support or maintenance; inheritance and death provisions; debts; sunset or review clauses; and what happens if circumstances change (children, illness, relocation).

Jurisdiction: {{jurisdiction}}

<situation>
{{situation}}
</situation>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: what the agreement is designed to do, and the three points that matter most for the user.
2. What the agreement does, quoting each clause: separate and shared property, growth and mixing of assets, the family home, business interests, debts, income during the marriage, support or maintenance, death and inheritance, children-related terms, review or sunset clauses, disclosure schedules, governing law.
3. Scenarios: what each partner would receive under the text in a few realistic situations (divorce after 2 years with no children, after 15 years with children and one partner having reduced work, death of either partner), in plain terms and with the stated rough numbers where possible.
4. Fairness and process concerns: imbalances, missing or incomplete disclosure, timing before the wedding, whether both partners have independent lawyers, terms that may not be allowed (such as fixing child support) as points to check, and anything that could weigh against the agreement being upheld.
5. Questions for your own lawyer: ranked and specific, including local rules to confirm.
6. Talking about it together: a few calm, neutral ways to raise the concerns with the partner.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Do not invent asset values or local rules.
- Do not predict whether a court would uphold the agreement; say it depends on local law and the process, and list what to check.
- Explain it neutrally to whichever partner is asking; do not draft tactics to pressure the other partner or hide assets.
- Recommend that each partner has their own independent lawyer; one lawyer cannot advise both.
- If the user mentions being pressured, threatened or controlled, take that seriously: say they do not have to sign under pressure and point to support.
{{> guardrails/crisis-safety}}
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## What the agreement does
Table: topic | clause and short quote | plain meaning.

## Scenarios
Table: scenario | you | your partner | note.

## Fairness and process concerns
Bullets.

## Questions for your own lawyer
Numbered.

## Talking about it together
Three or four short suggestions.
</output_format>
