---
schema: 1
id: handle-debts-after-death
kind: prompt
title: Handle a loved one's debts after their death
description: Explains who usually has to pay a dead relative's debts, how the estate settles them in priority order, what joint and guaranteed debts mean, and drafts the notice to send creditors.
category: debt
version: 1.0.0
status: incubating
stage: [discover, ship]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text, document]
output: [explanation, checklist, message]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [bereavement, estate-debts, executor, joint-liability]
pairs_with:
  prompts: [settle-estate-checklist, respond-to-debt-collector, plan-finances-after-partner-death]
  personas: [legal-information-guide]
args:
  - name: debts
    description: The debts you know about or that creditors are asking about - type, rough amount, whose name they were in (sole, joint, guaranteed by someone), and any letters or calls.
    type: text
    required: true
  - name: estate
    description: Your relationship to the person, whether there is a will and an executor, roughly what they left (home, savings, life insurance, pensions), and whether you lived with them. Optional.
    type: text
  - name: jurisdiction
    description: Country and state or region where the person lived.
    type: string
output_contract:
  format: markdown
  sections: [The main rule, Who is responsible for each debt, How the estate pays, What to do now, Letter to creditors, Questions for a professional]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help bereaved people deal with debts left by someone who has died. Collectors sometimes call relatives and imply they must pay, and grieving people often pay out of guilt. In most places the debts of the person who died are paid from their estate (what they left), not by family members personally, unless the relative is a joint borrower, a guarantor or co-signer, or is personally liable under a specific local rule (for example, some community-property states or certain necessities or care debts). If the estate does not have enough, some debts usually go unpaid, and creditors are paid in a legal order of priority that typically starts with funeral and administration costs and secured debts. Executors who pay creditors out of order, or distribute to heirs before debts are dealt with, can become personally liable. Some assets may pass outside the estate (life insurance with a named beneficiary, some pensions, jointly owned property) depending on local law. Some debts, such as certain student loans, may be written off on death.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Debts:

<debts>
{{debts}}
</debts>
{{#estate}}

Estate and relationship:

<estate>
{{estate}}
</estate>
{{/estate}}

1. State the main rule in two or three sentences, with a brief, sincere acknowledgement of the loss.
2. For each debt, say who is likely responsible: the estate only, a joint borrower, a guarantor, or possibly a relative under a local rule, and whether it might be written off on death or covered by payment protection or life cover. Mark each conclusion "general rule - verify locally".
3. Explain how the estate pays: collect assets, pay debts in priority order, then distribute; what happens if there is not enough; and why the executor should not pay any creditor or distribute money until the full picture is known.
4. What to do now: notify creditors in writing, ask them to freeze interest and charges, request statements as at the date of death, check for payment protection or insurance, redirect mail, and stop any payments from the person's accounts that are no longer due.
5. Draft a short letter to creditors with [BRACKETS]: notice of death, the executor or contact person, request to freeze interest and charges and to send a statement, and a clear statement that the writer is not accepting personal liability.
6. List questions for a probate lawyer or advice service, especially if the estate may be insolvent, there is a home, or a relative is a joint borrower or guarantor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell a relative they must pay a debt they are not legally liable for. Never draft a letter that accepts personal liability unless the person is a joint borrower or guarantor and chooses to.
- Never invent priority orders, write-off rules or state laws. Mark specifics "verify locally".
- If a collector is pressuring a grieving relative, say that this pressure may be unlawful in some places and how to complain.
- Be gentle and brief; avoid platitudes.
{{> output/uncertainty}}
</constraints>

<output_format>
## The main rule
Two or three sentences.

## Who is responsible for each debt
Table: debt | in whose name | likely responsible | note.

## How the estate pays
Short numbered explanation.

## What to do now
Checklist.

## Letter to creditors
Complete letter with [BRACKETS].

## Questions for a professional
Bullets.
</output_format>
