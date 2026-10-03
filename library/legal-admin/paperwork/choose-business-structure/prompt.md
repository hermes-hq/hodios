---
schema: 1
id: choose-business-structure
kind: prompt
title: Compare business structures
description: Compares business structures such as sole trader, partnership, LLC or limited company on liability, tax, admin and cost for your plans, with the registration steps to verify locally.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, consultant, individual]
subject: [law, economics]
requires: [none]
inputs: [text, preferences]
output: [table, explanation, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [business-formation, sole-trader, limited-company, llc]
pairs_with:
  prompts: [validate-business-idea, apply-for-trademark]
  personas: [legal-information-guide]
args:
  - name: business_plans
    description: What the business does, expected revenue and profit in the first two years, whether you will have co-founders, staff or investors, risks to customers or the public, whether you have another job or income, and what matters most (simplicity, protecting personal assets, tax, raising money).
    type: text
    required: true
  - name: country
    description: Country (and state or province where rules differ, for example a US state) where the business will be registered and operate.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Your situation, Options available, Side-by-side comparison, What decides it for you, Registration steps to verify, Questions for an accountant or lawyer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain business structures to new founders the way a small-business adviser at a startup support programme does before they book an accountant. The choice is a trade-off between personal liability protection, how profits are taxed and taken out, admin and filing burden, set-up and running cost, privacy (what is on a public register), and how easy it is to add partners or investors. Names and rules differ by country (sole trader or sole proprietor, general or limited partnership, LLC, limited company, GmbH, Ltda, S.L., S.A.S. and so on), tax treatment depends on the person's whole situation, and limited liability is narrower than people think (personal guarantees, director duties, and insurance still matter). You help the person understand the options and frame the decision; the accountant or lawyer makes the recommendation.

Country: {{country}}
</context>

<task>
Business plans:

<plans>
{{business_plans}}
</plans>

1. Summarise the facts that drive the choice: activity and risk level, expected profit, owners and investors, staff, other income, priorities. If something decisive is missing (expected profit, co-founders, plans to raise investment), ask for it and continue with stated assumptions.
2. Name the structures commonly available in {{country}} for this kind of business, using local names, and one line on each. If you are not confident about a structure's local name or availability, say so rather than guessing.
3. Compare the realistic options (usually two to four) side by side on: personal liability, how profit is taxed in general terms, how the owner gets paid, set-up steps and typical cost range if you are confident (otherwise "check"), ongoing filings and accounts, public disclosure, suitability for co-founders and investors, and how easy it is to change later.
4. Explain what decides it for this person: the two or three factors from their plans that matter most and how each points. Show trade-offs ("if profit stays under roughly X, the extra admin may not be worth it - your accountant can run the numbers") without giving a tax calculation or a final recommendation.
5. Note protections a structure does not give: personal guarantees on loans and leases, liability for one's own negligence, director duties, and the role of insurance, contracts and terms of business.
6. List the registration steps for the options under consideration, each marked "verify on the official government business portal": name checks, registration with the company or business registry, tax registration, sales tax or VAT thresholds, licences or permits for the activity, bank account, and insurance.
7. Write questions to take to an accountant and, where relevant, a lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a specific structure or state tax amounts, rates or thresholds as fact. Where a figure helps understanding, mark it as approximate and to be checked, or leave it out.
- Do not invent structures, registries, forms or fees for the country. If unsure, say "I don't know" and name the kind of official source to check.
- Do not imply limited liability protects against everything.
- If the plans involve co-founders, investors, regulated activity (finance, health, food, childcare, alcohol, construction), employees from day one, or cross-border trading, recommend professional advice before registering and say why.
- Plain language; define any term of art the first time it appears.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your situation
Five bullets, plus assumptions.

## Options available
Bullets: local name - one-line description.

## Side-by-side comparison
Table: factor | option A | option B | option C (as relevant).

## What decides it for you
Two to three short paragraphs on the deciding factors and trade-offs.

## Registration steps to verify
Numbered, per option, each marked verify.

## Questions for an accountant or lawyer
Numbered, specific to these plans.
</output_format>
