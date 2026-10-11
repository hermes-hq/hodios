---
schema: 1
id: request-debt-write-off
kind: prompt
title: Ask a creditor to write off a debt
description: Drafts a request to a creditor to write off a debt for someone with no realistic way to pay - because of long-term illness, disability or very low fixed income - with the evidence to attach.
category: debt
version: 1.0.0
status: incubating
stage: [ship]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [message, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [debt-write-off, vulnerability, hardship, creditor-letters]
pairs_with:
  prompts: [negotiate-with-creditor, compare-debt-relief-options, prepare-for-debt-advice-appointment, build-tight-budget]
  personas: [personal-finance-coach]
args:
  - name: debts
    description: The debts you want written off - creditor, type, balance, how far behind, and whether any are in your name only.
    type: text
    required: true
  - name: circumstances
    description: Why you cannot pay and why this will not change - illness, disability, age, caring, fixed income - only as much as you are comfortable sharing, plus your income, essential costs and any assets of value.
    type: text
    required: true
  - name: country
    description: Country and region.
    type: string
output_contract:
  format: markdown
  sections: [Is a write-off realistic, Evidence to gather, Letter, If they say no, Get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people ask creditors to write off debts they will never be able to repay. Creditors do write off debts, more often than people think, when the cost of continuing to chase is higher than what they will recover: typically when the person's only income is low and fixed (benefits or a small pension), they have no assets of value, and their situation is long-term (serious illness, disability, terminal illness, advanced age, severe mental health problems). A good request is short, factual and evidenced: a budget showing no surplus, a statement of no significant assets, and medical or other evidence where relevant. Requests carry more weight when sent by a free debt adviser. Write-offs can be partial, can come with conditions, and may still be recorded on credit files; and in some places a formal debt solution designed for people with no surplus may be a better route.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Debts:

<debts>
{{debts}}
</debts>

Circumstances:

<circumstances>
{{circumstances}}
</circumstances>

1. Say honestly whether a write-off request looks realistic, based on the factors creditors usually weigh (no surplus, no assets, long-term situation), and what else might fit better (a token payment, a payment freeze, or a formal solution for people with no surplus to ask an adviser about).
2. List evidence to gather: a budget statement showing income and essential costs, a statement of assets, medical or other evidence of the situation if available, and proof of income.
3. Draft one letter template to adapt for each creditor, with [BRACKETS]: account reference, a brief factual explanation, the budget summary, a statement that the situation is not expected to change, the specific request (write off the balance and stop collection), and a request that interest and charges be frozen while they decide. Keep personal health detail to the minimum needed.
4. If they say no: ask for a reason, ask again with an adviser, ask for a payment freeze or token payment instead, use the creditor's complaints process, and ask about formal options with a free debt adviser.
5. Get help: free debt advice services that can make the request on the person's behalf, described generally and named only when confident.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not promise a write-off or claim creditors are obliged to grant one, unless confident a specific rule applies in the stated country.
- Never invent rules, schemes or organisation names. Mark country specifics "verify".
- Do not exaggerate or invent circumstances in the letter; it must be truthful.
- Be warm and brief; people writing these letters are often unwell or exhausted.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is a write-off realistic
Short honest assessment and alternatives.

## Evidence to gather
Checklist.

## Letter
Complete template with [BRACKETS].

## If they say no
Bullets.

## Get help
Two or three lines.
</output_format>
