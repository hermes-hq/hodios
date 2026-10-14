---
schema: 1
id: plan-required-minimum-distributions
kind: prompt
title: Plan required minimum distributions
description: Plans US required minimum distributions - when they start for you, roughly how much from which accounts, deadlines, inherited accounts, qualified charitable distributions and the tax effect.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [rmd, retirement-accounts, ira, 401k, qualified-charitable-distribution, usa]
pairs_with:
  prompts: [plan-retirement-drawdown, prepare-financial-adviser-meeting, plan-retirement-scenarios]
  personas: [personal-finance-coach]
args:
  - name: accounts
    description: Each retirement account - type (traditional IRA, 401(k), 403(b), inherited IRA, Roth IRA, Roth 401(k)), the prior 31 December balance, whether you still work for that employer, and for inherited accounts the original owner's relationship to you, date of death and whether they had started RMDs.
    type: text
    required: true
  - name: person
    description: Your birth year (and your spouse's if they are the sole beneficiary and much younger), other income this year, approximate tax bracket, and any charitable giving.
    type: text
    required: true
  - name: question
    description: What you want to sort out, such as your first RMD, which account to take it from, a missed RMD, or using RMDs for charity.
    type: text
output_contract:
  format: markdown
  sections: [Your RMD timeline, Rough amounts, Which accounts and how, Tax and charity options, Missed or late RMDs, Check with your provider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan US required minimum distributions (RMDs) from tax-deferred retirement accounts. The rules have changed several times in recent years, so the starting age and other details depend on the person's birth year and the law in force for the tax year; they must be checked against current IRS guidance. Core mechanics most people miss: the amount is generally the prior 31 December balance divided by a life expectancy factor from the IRS table that applies to them (the Uniform Lifetime Table for most owners, a joint table when a much younger spouse is the sole beneficiary); the first RMD can be delayed to a required beginning date early in the following year (currently 1 April; verify), but then two RMDs fall in the same tax year, which can push income into a higher bracket; RMDs from several traditional IRAs can be totalled and taken from any one of them, but 401(k)-type plans generally each need their own RMD; a person still working may be able to delay RMDs from their current employer's plan if they do not own a significant share of the company; Roth IRAs have no RMDs for the original owner, and Roth accounts in employer plans no longer require them under recent law; inherited accounts follow different rules, often including a 10-year emptying period for many non-spouse beneficiaries, with annual RMDs in some cases. A qualified charitable distribution (QCD) from an IRA, available from a certain age, can count toward the RMD without being added to taxable income. Missing an RMD triggers an excise tax that can be reduced if corrected promptly. RMD income can also affect Medicare premiums and the taxation of Social Security benefits.

<accounts>
{{accounts}}
</accounts>

<person>
{{person}}
</person>
{{#question}}

<question>
{{question}}
</question>
{{/question}}
</context>

<task>
1. Your RMD timeline: from the birth year, state the RMD starting age that likely applies under current law as an item to verify with IRS guidance, the year of the first RMD, the first deadline and the regular annual deadline, and the trade-off of delaying the first one. Flag any account where the still-working exception or inherited-account rules may change this.
2. Rough amounts: for each account, show the illustrative calculation (prior year-end balance divided by the life expectancy factor) and say the factor must be taken from the current IRS table; if you cite a factor, label it as approximate and to verify. Total the illustrative RMDs.
3. Which accounts and how: explain which RMDs can be aggregated (IRAs together; 403(b)s together) and which cannot (each 401(k)), options for taking it (lump sum, monthly, in kind), tax withholding choices, and that Roth accounts are excluded for the original owner.
4. Tax and charity options: the effect on taxable income and bracket with the figures given; the double-RMD year risk; knock-on effects on Medicare premiums and Social Security taxation in general terms; QCDs if they give to charity, including that it must go directly from the IRA to the charity; and spreading withdrawals or earlier Roth conversions as topics for an adviser.
5. Missed or late RMDs: how to correct promptly, that the excise tax may be reduced when corrected in time, and the IRS form or process to ask about, marked to verify.
6. Check with your provider: a list of facts to confirm with each account provider and a tax professional.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state RMD ages, IRS table factors, excise tax rates, QCD ages or limits as settled fact; present them as current understanding that must be verified for the tax year.
- Use only balances and facts provided; show the arithmetic and label every result as illustrative.
- Inherited accounts have complex, recently changed rules; give the general shape and recommend a tax professional for the specific case.
- This applies to US accounts only; if the person's accounts are elsewhere, say the rules differ.
</constraints>

<output_format>
## Your RMD timeline
## Rough amounts
Table: Account | Prior 31 Dec balance | Factor (to verify) | Illustrative RMD | Can aggregate with.
## Which accounts and how
## Tax and charity options
## Missed or late RMDs
## Check with your provider
Checklist.
</output_format>
