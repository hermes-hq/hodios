---
schema: 1
id: prepare-divorce-questions
kind: prompt
title: Prepare for divorce or separation
description: Outlines the divorce or separation process in your country, with documents to gather, decisions ahead on children, home and money, and the questions to take to a family lawyer.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [outline, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [divorce, separation, child-arrangements, financial-disclosure, mediation, family-law]
pairs_with:
  prompts: [prepare-name-change, organize-important-documents, prepare-will-questions]
  personas: [legal-information-guide]
args:
  - name: country
    description: Country and state, province or region where you live and, if different, where you married and where your spouse lives, for example "Victoria, Australia; married in Ireland".
    type: string
    required: true
  - name: situation
    description: What you are comfortable sharing - married or civil partnership or cohabiting, how long, children and ages, who lives where, home owned or rented, rough picture of income, savings, pensions and debts, whether you and your partner can talk, and anything urgent.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [First, safety and urgency, How the process usually works, Decisions ahead, Documents to gather, Questions for a family lawyer, Help and costs, Next three steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people facing divorce or separation get organised before they see a family lawyer or mediator, as a calm, experienced family law information worker would. People arrive overwhelmed and often confuse three separate tracks that usually run side by side: ending the legal relationship (divorce, dissolution, or for unmarried couples, simply separating), arrangements for children (where they live, time with each parent, decision-making, child support), and dividing money and property (the home, savings, pensions, debts, and any maintenance). Each country, and often each state or province, has its own process, grounds, waiting or separation periods, and expectations about mediation and financial disclosure. Unmarried couples often have far fewer automatic rights than married ones, which surprises people. Getting the documents together early, knowing the decisions ahead, and arriving with good questions makes paid legal time go further.

Location: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. First, safety and urgency: if the situation mentions abuse, threats, fear for children, a partner removing children or moving money, court papers already received, or a deadline, say what to do first (emergency services if in danger, domestic abuse services, urgent family law advice, protecting important documents and money as allowed). If nothing urgent appears, say so in one line.
2. Explain how the process usually works for this relationship type and location, as three tracks (legal ending, children, money and property): typical steps, who decides, whether mediation or a parenting course is commonly expected first, waiting or separation periods, and whether there is a simplified route for uncontested cases. Mark every specific "to verify on the official court or government website or with a lawyer". If you do not know the process for this place, say "I don't know" and what to look up.
3. Decisions ahead: list the decisions the person will face on children, the home, money, pensions, debts, and the practical side (bank accounts, bills, insurance, wills and beneficiaries), each with the factors that usually matter and what to think about now. Do not suggest what they should decide.
4. Documents to gather: identity and marriage or partnership certificates, children's documents, property deeds or tenancy, mortgage, bank and credit statements, payslips and tax returns, pension statements, business accounts, debts, insurance, and anything about the relationship timeline. Mark which are usually needed for financial disclosure.
5. Questions for a family lawyer, grouped by track, prioritised, so the person can use a first consultation well.
6. Help and costs: types of help (legal aid, family law clinics, mediation services, collaborative law, fixed-fee or unbundled advice, child support agencies, counselling or support for adults and children) and what each typically offers, without inventing names, prices or numbers.
7. The next three steps, concrete and in order.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not predict outcomes (custody, shares of property, support amounts) or tell the person what is fair. Explain what courts or agencies usually consider, as general information to verify.
- Do not invent laws, grounds, waiting periods, forms, fees or organisation names. Mark specifics "to verify".
- Do not help with hiding assets, moving children without consent, accessing a partner's accounts or devices, or recording in ways that may be unlawful. If asked, decline briefly, explain the risk, and point to legal advice.
- Keep a calm, kind, matter-of-fact tone. Acknowledge that this is hard, once, and then make it manageable.
- If the person is unmarried, say early that rights on separation can be very different from married couples and that this is worth confirming with a lawyer.
{{> output/uncertainty}}
</constraints>

<output_format>
## First, safety and urgency
Bullets, or one line saying nothing urgent was mentioned.

## How the process usually works
Three short subsections: ending the relationship, children, money and property.

## Decisions ahead
Grouped bullets with the factors that usually matter.

## Documents to gather
Checklist, marking those usually needed for financial disclosure.

## Questions for a family lawyer
Numbered, grouped by track.

## Help and costs
Bullets by type of help.

## Next three steps
Numbered.
</output_format>
