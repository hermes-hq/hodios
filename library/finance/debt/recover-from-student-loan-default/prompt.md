---
schema: 1
id: recover-from-student-loan-default
kind: prompt
title: Get a student loan out of default
description: Helps a borrower whose student loan is in default or close to it understand the consequences, compare routes back to good standing, and prepare the call or letter to the loan servicer or agency.
category: debt
version: 1.0.0
status: incubating
stage: [discover, plan, ship]
role: [individual, student]
requires: [none]
inputs: [document, text]
output: [explanation, plan, script]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [student-loans, loan-default, rehabilitation, repayment-plans]
pairs_with:
  prompts: [compare-student-loan-repayment, improve-credit-score, respond-to-debt-collector, build-tight-budget]
  personas: [personal-finance-coach]
args:
  - name: loan
    description: The loan type (government or private, and the scheme if you know it), balance, how long since the last payment, who is contacting you now (servicer, collection agency, government agency), and any letters about wage or tax refund deductions.
    type: text
    required: true
  - name: finances
    description: Income, household size, essential costs and other debts. Optional but needed for an affordable plan.
    type: text
  - name: country
    description: Country (and state if relevant), because student loan systems differ completely.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, What default can mean, Routes back, Which route fits you, What to say, Watch out for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people whose student loans are in default or about to be. Student loans work differently from other debt and differ completely between countries. Some systems collect through the tax or payroll system based on income, so "default" in the usual sense rarely happens; others, such as US federal loans, have specific default rules, powerful collection tools (wage deductions without a court order, taking tax refunds or some benefits), and specific routes back to good standing such as rehabilitation (a series of agreed affordable payments) or consolidation into a new loan, often each usable only once. Private student loans follow ordinary contract and debt-collection rules, may be time-barred, and may involve co-signers. Programme rules change, sometimes quickly, so every rule must be checked with the official source. Scam companies charge fees for help the borrower could get free from the servicer or the government.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Loan:

<loan>
{{loan}}
</loan>
{{#finances}}

Finances:

<finances>
{{finances}}
</finances>
{{/finances}}

1. Where you stand: whether the loan sounds government or private, whether it is in default or late, and who holds it now. If unclear, say how to find out (the official loan record or the lender's statements).
2. What default can mean for this loan type, in general terms marked "verify": collection costs added, deductions from wages, tax refunds or benefits, credit file effects, loss of access to flexible repayment, and for private loans, possible court action and co-signer liability.
3. Routes back: for government loans, the general options that commonly exist (rehabilitation through agreed payments, consolidation, paying in full, or income-based plans once out of default), and for private loans, negotiation, settlement, hardship programmes, and checking limitation periods. Explain the trade-offs, including which routes may only be used once and which remove the default record.
4. Which route fits: based on the person's figures, suggest which route to ask about first and why, with an affordable monthly figure from their budget.
5. What to say: a short call or letter script with [BRACKETS] asking about options, requesting an affordable payment based on income, and asking for everything agreed in writing.
6. Watch out for: fee-charging "student loan relief" companies, giving login details to third parties, and paying a collector before getting terms in writing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent programme names, eligibility rules, payment formulas or deadlines; mark everything "verify with the official source" and note that rules change.
- Do not recommend ignoring a government student loan; collection can happen without a court.
- If the country's system collects through tax or payroll, say default may not apply in the same way and adjust the advice.
- Point to the official servicer or government source and free advice, not paid relief firms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Three to five lines.

## What default can mean
Bullets marked verify.

## Routes back
Table: route | how it works | trade-offs.

## Which route fits you
Short recommendation of what to ask about first, with the affordable figure.

## What to say
Script with [BRACKETS].

## Watch out for
Bullets.
</output_format>
