---
schema: 1
id: complain-about-irresponsible-lending
kind: prompt
title: Complain about irresponsible lending
description: Builds a complaint to a lender that gave you credit you could not afford - evidence of the affordability failure, the outcome to ask for, the letter, and the route to an ombudsman or regulator.
category: debt
version: 1.0.0
status: incubating
stage: [ship]
role: [individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist, explanation]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [affordability-complaint, unaffordable-credit, ombudsman, refunds]
pairs_with:
  prompts: [break-payday-loan-cycle, negotiate-with-creditor, review-credit-agreement, compare-debt-relief-options]
  personas: [legal-information-guide]
args:
  - name: lending
    description: The credit you are complaining about - lender, type (payday loan, credit card, car finance, personal loan, buy now pay later), dates, amounts, limit increases, and how many times you borrowed.
    type: text
    required: true
  - name: circumstances
    description: Your situation when you were lent to - income, other debts, missed payments, gambling or other signs on your bank statements, and what checks the lender did, if you know.
    type: text
    required: true
  - name: country
    description: Country, because affordability rules and complaint routes differ.
    type: string
output_contract:
  format: markdown
  sections: [Is there a case, Evidence to gather, What to ask for, Complaint letter, Next steps and deadlines, Get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people complain when a lender gave them credit they could not afford. In many countries lenders must check that credit is affordable and sustainable before lending or raising a limit, not only whether the borrower is likely to repay. Signs of irresponsible lending include repeat borrowing (many payday loans in a row, or rolling over), limit increases while the person was struggling, lending when credit files showed missed payments, defaults or heavy existing debt, and ignoring obvious signs such as gambling on statements. Where a complaint succeeds, typical remedies include refunding interest and charges, removing negative credit file entries, or writing off part of the balance. Complaints usually go first to the lender, which gets a set period to reply, and then, if unresolved, to an independent ombudsman or dispute body within a time limit. People can do this for free; claims-management firms take a share of any refund. Rules and remedies differ by country, and some countries have no such route.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The lending:

<lending>
{{lending}}
</lending>

Circumstances:

<circumstances>
{{circumstances}}
</circumstances>

1. Is there a case: assess, as information, which signs of irresponsible lending are present and how strong each looks, and say what would weaken the complaint. If the country has no clear affordability rules or complaint route that you are confident about, say so.
2. Evidence to gather: the credit agreement and account history, credit reports from the time, bank statements from the months before each lending decision, any income and expenditure the lender recorded (ask the lender for a copy of the data it holds), and letters or messages.
3. What to ask for: refund of interest and charges (with statutory interest where the scheme adds it, to verify), removal of negative records, write-off of remaining interest, and an affordable plan for any balance.
4. Draft the complaint letter with [BRACKETS]: account details, each lending decision and why it was unaffordable, the evidence, the outcome wanted, and a request for a final response within the lender's complaint period.
5. Next steps and deadlines: the general time limits for lender response and escalation to an ombudsman or dispute body, marked "verify", and what to do while the complaint is open (keep paying what you can afford, tell the lender you are in hardship).
6. Get help: free debt advice, and a note that claims-management firms charge a share of refunds for something the person can do for free.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not promise an outcome or name a refund amount.
- Never invent rules, regulators, time limits or ombudsman names. Name them only when confident they apply in the stated country.
- The letter must be factual; do not exaggerate the person's circumstances.
- Do not advise stopping payments entirely without free debt advice; explain the risks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is there a case
Bullets per sign, with strength and what weakens it.

## Evidence to gather
Checklist.

## What to ask for
Bullets.

## Complaint letter
Complete letter with [BRACKETS].

## Next steps and deadlines
Bullets marked verify.

## Get help
Two or three lines.
</output_format>
