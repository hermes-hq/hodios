---
schema: 1
id: compare-kids-investment-accounts
kind: prompt
title: Compare accounts for investing for a child
description: Compares the account types for investing for a child in your country - custodial, junior, education and parent-held accounts - on who controls the money, tax, access age and aid effects.
category: investing
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [parent, individual]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [children, custodial-accounts, education-savings, financial-aid, gifting]
pairs_with:
  prompts: [plan-education-savings, compare-retirement-accounts, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: country
    description: The country (and state or region, if relevant) where the child and the person investing live.
    type: string
    required: true
  - name: goal
    description: What the money is for - education, a first home, a general start in adult life, or not decided - and the child's age.
    type: text
    required: true
  - name: who_pays
    description: Who will contribute (parents, grandparents, others), roughly how much, and whether you want to keep control after the child turns 18. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What matters most here, Account types compared, Who controls the money and when, Tax points to check, Effect on student aid or benefits, Questions to settle before opening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The biggest difference between accounts for children is not return but control. Money given into the child's own name (custodial or junior accounts) usually becomes the child's legally, cannot be taken back, and passes to them outright at a set age, often 18 to 21, whatever their plans. Education-specific accounts often let the adult owner keep control but limit what the money can be used for, with tax or penalties on other uses (some systems now allow limited transfers to other accounts; verify the current rules). Investing in a parent's own account keeps full control and flexibility but is the parent's money for tax and inheritance. Other points experts check: rules that tax a parent on income from money the parent gave a child, or tax a child's investment income at the parent's rate above a threshold; whether gifts from grandparents are treated differently; how student financial aid formulas count assets held by the child versus by a parent; government top-ups or bonuses; and that a child can only use some retirement accounts if they have earned income. The names and rules vary by country, so the comparison should be by type, with local scheme names marked "verify".

Country: {{country}}

Goal and child's age: {{goal}}
{{#who_pays}}Who contributes: {{who_pays}}{{/who_pays}}
</context>

<task>
1. State in two or three sentences what will matter most for their goal and age (time horizon, control, flexibility, tax).
2. Compare the account types that exist in their country, by type, with local scheme names only where confident and marked "verify": child's own custodial or junior account, education-specific account, parent-held general or tax-advantaged account, child's retirement account where earned income allows, government-supported schemes. Cover: who owns it, who controls it and until when, access age, permitted uses, tax on growth and withdrawals, contribution limits to check, effect on aid or benefits, what happens if the goal changes.
3. Explain the control question plainly: what the child can do with the money at the access age, and how each option keeps or gives up adult control.
4. Tax points to check: parental gift income rules, child income thresholds, gifts from grandparents and inheritance rules, taxes on non-qualified use.
5. Effect on student aid or means-tested benefits, if that applies in their country.
6. Questions to settle before opening an account, and who confirms them (provider, tax authority guidance, an adviser).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state limits, thresholds, ages or tax rates as current fact unless supplied; say "check the current figure".
- Do not recommend a specific account, provider or investment. Show how the options line up against their goal.
- If you do not know the account types in their country, say so and give the general types and the questions that identify the local equivalents.
- Note that saving for a child usually comes after the adults' own emergency fund and retirement saving in most planning approaches, without lecturing.
{{> output/uncertainty}}
</constraints>

<output_format>
## What matters most here
Two or three sentences.

## Account types compared
Table: account type | owner and control | access age | allowed uses | tax | aid effect | if plans change.

## Who controls the money and when
Short paragraph.

## Tax points to check
Bullets.

## Effect on student aid or benefits
Short paragraph or "not usually relevant in your country" with reason.

## Questions to settle before opening
Bullets.
</output_format>
