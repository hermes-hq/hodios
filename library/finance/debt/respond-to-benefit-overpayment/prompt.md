---
schema: 1
id: respond-to-benefit-overpayment
kind: prompt
title: Respond to a benefit overpayment demand
description: Helps someone told to repay overpaid benefits or tax credits check the period and calculation, see whether it can be challenged or waived, and propose an affordable repayment rate.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [document, text]
output: [explanation, message, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [benefit-overpayment, recovery-rate, official-error, waiver-request, means-tested-support]
pairs_with:
  prompts: [appeal-benefits-decision, negotiate-with-creditor, request-debt-write-off, prepare-for-debt-advice-appointment]
args:
  - name: letter
    description: The overpayment letter or notice, pasted as text with reference numbers and personal identifiers masked, including dates, the benefit, the period, the amount and how they want it repaid.
    type: text
    required: true
  - name: what_happened
    description: What changed and when (income, household, address, work hours), when and how you reported it, and anything the agency told you at the time.
    type: text
    required: true
  - name: budget
    description: Your current income, essential costs and other debts, so a repayment offer is affordable.
    type: text
  - name: country
    description: Country (and state or region), because overpayment rules, recovery limits and challenge routes differ by benefit and country.
    type: string
output_contract:
  format: markdown
  sections: [What the letter says, Check the calculation, Can it be challenged or waived, Deadlines, Your affordable repayment, Letter to the agency, Next steps and free help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who have been told they were overpaid a benefit, tax credit or other public support payment and must pay it back. Overpayment letters are often wrong or open to challenge: the period may start too early, income may be counted in the wrong weeks, a change the person reported was not acted on, or amounts they were entitled to under another rule were not offset. Many systems distinguish between overpayments caused by the claimant and those caused by official error or delay, and some only recover the second kind in limited cases; many also let people ask for recovery to be reduced for hardship or waived entirely. Recovery is often by deduction from ongoing benefits, with rates that can sometimes be lowered on request. Two different processes are often mixed up: challenging whether the overpayment exists or is recoverable (usually with a strict time limit for asking for a review), and negotiating how it is repaid. Any mention of fraud, an interview under caution or prosecution is a different situation that needs legal advice before saying anything.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Letter:

<letter>
{{letter}}
</letter>

What happened:

<what_happened>
{{what_happened}}
</what_happened>
{{#budget}}

Budget:

<budget>
{{budget}}
</budget>
{{/budget}}

1. Summarise what the letter says: the benefit, the period, the amount, the reason given, and how they plan to recover it. If it mentions fraud, an interview under caution, a civil penalty or prosecution, say first that they should get legal advice or advice from a welfare rights service before responding or attending, and stop short of drafting a statement about the facts.
2. Check the calculation: compare the period and amount with what happened and when it was reported. List the points that look questionable and the documents that would prove them (reporting dates, call records, payslips).
3. Explain whether it may be possible to challenge it (it was not overpaid, the amount is wrong, the overpayment was caused by the agency and is not recoverable under local rules) or to ask for it to be waived or written off for hardship, marking every rule as something to confirm locally.
4. Deadlines: any time limit to ask for a review or appeal in the letter, or a reminder that one usually exists and to act within days, not weeks. Note that asking for a review and asking for affordable repayment can usually be done together.
5. Work out an affordable repayment from the budget, and explain asking for a lower deduction rate if recovery from ongoing benefits would leave them unable to cover essentials. If no budget was given, show the method.
6. Draft a letter to the agency with placeholders: the reference, a request for a full breakdown of the calculation if not provided, the grounds for review if any, a request to pause recovery while it is reviewed, and an affordable repayment offer made without accepting the amount is right.
7. Next steps and free help: welfare rights or benefits advice services and debt advice, what to bring, and a dated checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent benefit rules, recovery rates, time limits or official bodies. State typical patterns as typical and to confirm.
- Never suggest hiding income, giving a false account of when a change was reported, or ignoring the letter.
- If fraud or a criminal investigation is mentioned, do not help draft an account of the facts; direct them to legal advice first.
- Keep the tone calm and free of blame; overpayments are common and often not the person's fault.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## What the letter says
Short summary.

## Check the calculation
Table: point | what the letter says | what you say happened | evidence.

## Can it be challenged or waived
Bullets with what to confirm.

## Deadlines
Dates.

## Your affordable repayment
The calculation and the offer.

## Letter to the agency
Ready-to-send letter with placeholders.

## Next steps and free help
Checklist.
</output_format>
