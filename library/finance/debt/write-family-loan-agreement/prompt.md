---
schema: 1
id: write-family-loan-agreement
kind: prompt
title: Write a loan agreement between family or friends
description: Drafts a plain loan agreement for money lent between family or friends - amount, repayments, interest, missed payments, death - plus a repayment record and the tax and legal points to check.
category: debt
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [docs, table, checklist]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [personal-loan-agreement, repayment-schedule, promissory-note, family-money, written-terms]
pairs_with:
  prompts: [decide-whether-to-lend-money, plan-supporting-family-financially, ask-family-for-financial-help, decline-to-lend-money]
args:
  - name: loan
    description: Who is lending and who is borrowing (relationship, no full names needed), the amount, what it is for, and when the money will be handed over.
    type: text
    required: true
  - name: terms
    description: What you have agreed or want - repayment amount and frequency, start date, any interest, early repayment, and what should happen if a payment is missed. Leave blank parts you are unsure about.
    type: text
  - name: country
    description: Country (and state or region), because tax on interest, gift rules and what makes an agreement enforceable differ.
    type: string
output_contract:
  format: markdown
  sections: [Before you sign, Loan agreement, Repayment schedule, Repayment record, Points to check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft a simple written agreement for money lent between family members or friends, once the decision to lend has been made. Informal loans go wrong in predictable ways: nobody wrote down whether it was a gift or a loan, the repayment date was "when you can", a missed payment became an awkward silence, the lender died and other relatives disagreed about whether the money was owed, or a mortgage lender later asked whether the deposit money had to be repaid. A short agreement fixes most of this by recording the amount, the purpose, the repayment schedule, interest or no interest, what happens after a missed payment (a conversation and a revised plan first), early repayment, what happens on death or separation, and how payments will be made (bank transfer, so there is a record). Things people do not know: in some countries an interest-free or low-interest loan above a certain size has tax consequences, interest received may be taxable income, a loan used for a house deposit must be declared to the mortgage lender and may affect the application, and some places require specific wording, witnesses or signatures for an agreement to be enforceable. Larger sums, property-related loans or complex situations deserve a solicitor or lawyer.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The loan:

<loan>
{{loan}}
</loan>
{{#terms}}

Terms so far:

<terms>
{{terms}}
</terms>
{{/terms}}

1. Before you sign: a short list of decisions they must make or confirm, including any terms missing from their details (ask for them in brackets in the draft rather than inventing them), whether this is truly a loan or partly a gift, and whether the borrower can afford the repayments. If the money is for a house deposit, flag that it must be disclosed to the mortgage lender.
2. Draft the agreement in plain English with placeholders in square brackets for names, addresses and dates: parties, amount and date advanced, purpose, repayment schedule, interest (or a clear statement that none is charged), how payments are made, early repayment, missed payments (notice, a meeting to agree a new plan, and what happens if still unpaid), what happens if either person dies or the borrower's circumstances change, changes only in writing signed by both, and signature lines with date and optional witness.
3. A repayment schedule table based on the terms, with dates and running balance; if interest applies, show how it is calculated.
4. A repayment record table both people can keep, with columns for date, amount, method, balance and initials.
5. Points to check locally: tax on interest received, tax rules for interest-free or below-market loans, gift or inheritance rules if part is forgiven, any wording or witnessing needed for the agreement to be enforceable, and when to involve a lawyer (large amounts, property, money for a business, or a borrower who is vulnerable).
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a plain template, not a guaranteed legally enforceable contract. Say so once at the top of the agreement.
- Do not invent tax thresholds, interest rate rules or legal formalities. List them as checks for their country.
- Do not fill in terms the person did not give; leave placeholders and ask.
- If the details suggest pressure, coercion or a borrower who cannot understand the agreement, say this needs a careful conversation and independent advice before anyone signs.
- No personal data in the draft beyond placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you sign
Checklist.

## Loan agreement
The full draft with numbered clauses and placeholders.

## Repayment schedule
Table: payment | date | amount | interest | balance.

## Repayment record
Empty table: date | amount | method | balance | lender initials | borrower initials.

## Points to check locally
Bullets.
</output_format>
