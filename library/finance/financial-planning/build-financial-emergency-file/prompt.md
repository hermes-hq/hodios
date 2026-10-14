---
schema: 1
id: build-financial-emergency-file
kind: prompt
title: Build a financial emergency file
description: Builds an "if something happens to me" money file - accounts, debts, policies, pensions, bills, advisers and wishes - so a partner or executor can find everything, without storing passwords in it.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, docs, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [estate-planning, incapacity, record-keeping, family-admin]
pairs_with:
  prompts: [build-net-worth-statement, organize-important-documents, plan-digital-legacy, settle-estate-checklist]
  personas: [personal-finance-coach]
args:
  - name: household
    description: Who is in the household, who would need to use the file (partner, adult child, executor), and whether you have a will or powers of attorney.
    type: text
    required: true
  - name: finances
    description: A rough list of what exists - bank accounts, savings, pensions, investments, property, loans and cards, insurance, a business, regular bills - without account numbers or balances if you prefer.
    type: text
  - name: country
    description: Country, because wills, powers of attorney and access to accounts after death differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [How to keep this file, The file template, Gaps to fix, Legal documents to check, Review routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write down their financial life so that someone they trust can manage it if they die or become unable to. Families most often struggle not with the money itself but with finding it: pensions from old jobs, life cover through an employer, a savings account opened years ago, direct debits that keep running, and debts nobody knew about. A good file names what exists, who holds it, how to contact them and where the paperwork is; it does not need full account numbers or passwords, which create a security risk if the file is lost. Access to accounts after death usually needs legal documents (a will, grant of probate or its local equivalent), and access during incapacity needs a power of attorney or local equivalent made while the person still has capacity, which is why the file should point to them.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Household:

<household>
{{household}}
</household>
{{#finances}}

What exists:

<finances>
{{finances}}
</finances>
{{/finances}}

1. Explain how to keep the file: where (a secure physical place and/or an encrypted digital copy), who knows it exists, and what never goes in it (passwords, full card numbers, PINs). Point to a password manager's emergency-access feature or a sealed separate note as the usual way to pass on access, described generically.
2. Produce the file template with sections: people and contacts (executor, attorney, accountant, adviser, solicitor, employer HR); income sources; bank and savings accounts; pensions including old workplace schemes; investments; property and mortgage; debts and credit cards; insurance including employer cover; regular bills and subscriptions to cancel or transfer; business interests; digital accounts with money value; where the will and legal documents are kept; funeral wishes; and a short letter to the reader. Pre-fill rows from what the person gave, with [TO ADD] for missing details.
3. List gaps to fix, ordered by impact: for example, no will, no power of attorney, untraced old pensions, beneficiaries not updated, only one person able to access joint bills.
4. List legal documents to check in the person's country, described generally and marked "verify locally".
5. Set a review routine: yearly, and after life events.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never ask for or include passwords, PINs, full account or card numbers, or identity numbers in the file.
- Do not draft a will or power of attorney; recommend a lawyer or the official local process for those.
- Do not invent document names or legal procedures for a country you are unsure of; describe their purpose instead.
- Keep the tone practical and kind; thinking about death or illness is hard.
{{> output/uncertainty}}
</constraints>

<output_format>
## How to keep this file
Bullets.

## The file template
Headed sections with tables: item | provider | contact | where paperwork is | note.

## Gaps to fix
Numbered list.

## Legal documents to check
Bullets marked "verify locally".

## Review routine
Two or three lines.
</output_format>
