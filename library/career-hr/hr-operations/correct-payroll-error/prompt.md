---
schema: 1
id: correct-payroll-error
kind: prompt
title: Correct a payroll error with an employee
description: Handles an overpayment or underpayment to an employee - confirms the facts, plans the correction and any repayment arrangement, writes the employee message and fixes the cause.
category: hr-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, founder, manager]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, dataset]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [payroll-error, overpayment, underpayment, repayment-plan, employee-communication]
pairs_with:
  prompts: [set-up-first-payroll, answer-employee-hr-question, define-hr-metrics]
  personas: [hr-business-partner]
args:
  - name: error
    description: What went wrong (overpaid or underpaid, which pay element, which pay periods), the amounts gross and net if known, how it was found and how many employees are affected (roles, not names).
    type: text
    required: true
  - name: context
    description: Country or state, pay frequency, what the contract or policy says about deductions and overpayments, whether the employee has noticed or raised it, and whether they are still employed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Facts to confirm, Correction plan, Employee message, Fix the cause, Questions for payroll or an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help HR fix a payroll mistake. What experienced payroll and HR people know: an underpayment should be corrected fast, ideally off-cycle, because people budget to the payslip and some underpayments (below minimum wage, unpaid overtime) carry legal exposure. Overpayments are more delicate: rules on recovering them by deduction from wages vary by country and contract, often requiring written consent or limiting how much can be taken per period; tax and social contributions on the overpaid amount may also need correcting, and the gross and net amounts differ. Taking the whole amount back in one go from someone who spent it in good faith causes real hardship and damages trust. The message matters as much as the maths: say plainly what happened, own the mistake, show the numbers and offer choices.

<error>
{{error}}
</error>

<context_details>
{{context}}
</context_details>
</context>

<task>
1. Facts to confirm: periods, pay elements, gross and net amounts, tax and contribution effect, and whether any other employees are affected by the same cause. If the employee is underpaid below a legal minimum, flag it as urgent.
2. Correction plan: for an underpayment, how and when to pay it (off-cycle or next run) and how it appears on the payslip. For an overpayment, the options (one deduction, instalments over several periods, direct repayment, writing it off for small amounts), with consent and deduction limits marked "confirm locally", and a proposed default that avoids hardship.
3. Employee message: plain, apologetic for the company's error, with a short table of the amounts, the options and a date to reply by; for an overpayment, a clear statement that nothing will be deducted until agreed.
4. Fix the cause: the control that failed and the change that prevents it recurring.
5. Questions for payroll or an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state legal rules on deductions, recovery time limits or tax correction as fact; mark them "confirm locally".
- Never recommend deducting an overpayment without consent where it may be required, or taking a deduction that would leave pay below a legal minimum.
- Do not compute net amounts without the tax data; show gross and mark net as to confirm with payroll.
- Use roles, not names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Facts to confirm
Checklist.
## Correction plan
Table: Option | How | Timing | Consent needed? | Risk.
## Employee message
Ready to adapt.
## Fix the cause
## Questions for payroll or an adviser
Numbered.
</output_format>
