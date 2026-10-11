---
schema: 1
id: choose-tax-preparer
kind: prompt
title: Choose how to get your taxes done
description: Decides between free filing, tax software, a preparer or an accountant for your situation, with credentials to check, fee models, questions to ask and red flags to avoid.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
requires: [none]
inputs: [text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [tax-preparation, accountants, tax-software, scams]
pairs_with:
  prompts: [organize-tax-documents, choose-financial-advisor, explain-tax-notice]
  personas: [tax-educator]
args:
  - name: situation
    description: Your income sources, life events this year (move, marriage, new baby, sale of a home or shares, inheritance, starting a business), anything abroad, past tax problems, how comfortable you are with forms, and your budget for help.
    type: text
    required: true
  - name: country
    description: Country where you file.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Level of help that fits, Options compared, Credentials to check, Questions to ask, Red flags, What to bring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone choose the right level of help for their tax return. The options usually run from free routes (pre-filled or government filing services, free volunteer clinics for people on lower incomes or older people in some countries), through tax software, to paid preparers and qualified professionals (certified accountants, chartered tax advisers, enrolled agents or lawyers, depending on the country). Simple employment income with few deductions rarely needs paid help; self-employment, rental property, investments sold, foreign income, a death in the family, a business, or a letter from the tax authority often does. Credentials matter because in many places anyone can call themselves a tax preparer, and only some professionals can represent you before the authority. The person signing the return is still responsible for it. Well-known red flags: fees based on the size of the refund, a preparer who will not sign the return, promises of a bigger refund than others, asking for the refund to be paid into their account, and pressure to claim credits the person does not qualify for.

Country: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Say which level of help fits and why, tying it to the specific features of the situation (for example "you sold shares and have rental income, so...").
2. Compare the realistic options for {{country}}: free routes, software, paid preparer, qualified professional. For each: who it suits, typical fee model (fixed fee, hourly, by forms), what it covers (filing only, advice, representation if the authority writes), and limits. Do not quote prices.
3. Credentials to check: the professional titles and registers in {{country}} you are confident of, marked "verify", and how to check them (official register, professional body).
4. Questions to ask before hiring: experience with situations like theirs, fee and what it includes, who prepares and who reviews, whether they sign as preparer, how they handle letters or audits, engagement letter, data security, timeline.
5. Red flags.
6. What to bring: a short list tailored to the situation, and a suggestion to prepare a full document checklist before the first meeting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend specific firms, software brands or individuals.
- Never invent credential names, registers or free schemes; mark country-specific items "verify".
- Do not quote prices; describe fee models and suggest getting two or three written quotes.
- Remind the person that they remain responsible for what is filed and should read the return before it is submitted.
{{> output/uncertainty}}
</constraints>

<output_format>
## Level of help that fits
Two or three sentences.

## Options compared
Table: option | suits | fee model | covers | limits.

## Credentials to check
Bullets marked "verify", with how to check.

## Questions to ask
Numbered list.

## Red flags
Bullets.

## What to bring
Short checklist.
</output_format>
