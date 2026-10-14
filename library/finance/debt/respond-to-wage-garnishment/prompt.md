---
schema: 1
id: respond-to-wage-garnishment
kind: prompt
title: Respond to a wage garnishment or earnings deduction
description: Helps someone facing a wage garnishment, attachment of earnings or similar deduction order check the notice, find protected income and exemptions to verify, and request a lower amount or challenge it.
category: debt
version: 1.0.0
status: incubating
stage: [discover, ship]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [checklist, message, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [garnishment, attachment-of-earnings, protected-income, enforcement]
pairs_with:
  prompts: [respond-to-debt-court-claim, build-tight-budget, negotiate-with-creditor, prepare-for-debt-advice-appointment]
  personas: [legal-information-guide]
args:
  - name: notice
    description: What the notice or payslip says - who issued it (court, tax or benefits agency, child support agency, creditor), the creditor, the amount owed, the deduction per pay period, the start date and any deadline to object.
    type: text
    required: true
  - name: budget
    description: Your take-home pay before the deduction, household members, essential costs, and any other deductions or debts.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region.
    type: string
output_contract:
  format: markdown
  sections: [What this is, Deadline and first steps, Is the amount allowed, Your budget with the deduction, Ways to change it, Letter or form points, Get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people whose wages are being, or are about to be, garnished or deducted for a debt. Most systems protect part of a worker's income: a minimum amount that cannot be taken, a maximum percentage, or a calculation based on the household's needs, and some income (certain benefits, some pensions) is often exempt altogether. Garnishments for tax, child support or student loans can follow different rules from those for ordinary consumer debts. There is usually a window to object or ask for a lower deduction on hardship grounds, and it can be short. People also commonly have options outside the order: a voluntary payment arrangement the creditor accepts in place of the garnishment, a challenge if the original judgment was wrong or not properly served, or a formal debt solution that stops enforcement. Employers must follow the order but should not treat it as grounds for discipline; protections differ by country.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
The notice:

<notice>
{{notice}}
</notice>

Budget:

<budget>
{{budget}}
</budget>

1. Explain what this is, who issued it, and what kind of debt it relates to, because that changes the rules. If anything looks inconsistent or suspicious (no court or agency named, demand to pay a person directly), say how to verify it.
2. Deadline and first steps: any date to object or respond stated on the notice, and the steps for this week. If no deadline is shown, say one may exist and to confirm it immediately.
3. Explain the kinds of protection that may apply (minimum protected earnings, maximum percentage, exempt income) and what to check for this jurisdiction, naming laws only if confident. Compare the deduction with the person's take-home pay and say whether it looks unusually high, as a question to raise, not a conclusion.
4. Show the household budget with and without the deduction, so the person can see the hardship clearly and use it as evidence.
5. Ways to change it: ask the court or agency to reduce the deduction for hardship, offer a voluntary arrangement to the creditor, challenge the underlying judgment if it was never served or is wrong, or explore a formal debt solution with an adviser. Explain each briefly.
6. Draft the main points for a hardship request or letter to the creditor, using the budget figures, with [BRACKETS] for missing details.
7. Point to free debt advice, legal aid and, for tax or benefit deductions, the agency's own hardship process.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent protected amounts, percentages, form names or deadlines. Mark everything jurisdiction-specific "verify".
- Do not suggest quitting a job, hiding income or moving money to avoid a lawful order.
- If the person's essentials (housing, food, utilities) cannot be met after the deduction, say so clearly and make urgent free advice the first step.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this is
Three to five lines.

## Deadline and first steps
Bullets, deadline first.

## Is the amount allowed
Explanation with items to verify.

## Your budget with the deduction
Table: line | without | with.

## Ways to change it
Bullets.

## Letter or form points
Draft points or a short letter.

## Get help
Bullets.
</output_format>
