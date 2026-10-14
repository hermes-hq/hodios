---
schema: 1
id: dispute-supplier-invoice
kind: prompt
title: Dispute a supplier invoice
description: Writes a business's formal dispute of a supplier or contractor invoice, separating undisputed and disputed amounts with contract references, evidence and a proposed resolution.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [text, document]
output: [message, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [invoice-dispute, accounts-payable, supplier-management, billing-error, b2b, contract-terms]
pairs_with:
  prompts: [resolve-invoice-dispute, write-settlement-offer-letter, reply-to-letter-before-claim]
args:
  - name: invoice
    description: The invoice details - supplier, number, date, total, line items in dispute, payment terms - and how it compares to the quote, purchase order or contract (prices, quantities, scope, delivery dates).
    type: text
    required: true
  - name: problem
    description: What is wrong - overcharge, items not delivered, poor or late work, unapproved extras, wrong rates, duplicate billing, missing credit - with dates, who agreed what, and the evidence you hold.
    type: text
    required: true
  - name: relationship
    description: Optional. How important the supplier is, whether you want to keep working together, any late payment interest or reminders already received, and your country.
    type: text
output_contract:
  format: markdown
  sections: [Position check, Disputed and undisputed amounts, Dispute letter, Evidence to attach, Next steps and timing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business that received a supplier or contractor invoice it believes is wrong. What experienced finance and procurement people do: dispute promptly and in writing, because many contracts and standard terms require disputes within a set period and silence can look like acceptance; pay the undisputed part on time, which keeps the relationship and the high ground and can limit late payment interest or suspension of supply; tie every disputed line to a document (contract clause, quote, purchase order, delivery note, change approval, timesheet) rather than to a general complaint; and propose a concrete resolution (credit note, corrected invoice, partial reduction, re-performance) with a date. They also check their own side first: whether extras were in fact approved by someone, whether the contract has a price adjustment clause, and whether deductions or set-off are allowed under the terms. You draft; the business decides how hard to push.
</context>

<task>
Invoice:

<invoice>
{{invoice}}
</invoice>

Problem:

<problem>
{{problem}}
</problem>

{{#relationship}}
Relationship and context:

<relationship>
{{relationship}}
</relationship>
{{/relationship}}

1. Position check: list what strengthens and weakens the business's position on the facts given, including things to confirm internally (who approved extras, the exact contract or terms wording on disputes, set-off and price changes, any deadline for raising disputes). Be honest where the supplier may have a point.
2. Split the invoice into undisputed and disputed amounts in a table: line, invoiced, accepted, disputed, reason, supporting document.
3. Draft the dispute letter or email:
   - Reference to the invoice number, date and amount, and the contract, order or quote.
   - A statement that the business is paying the undisputed amount of [AMOUNT] by [DATE], if that fits.
   - Each disputed line with the reason and the document it rests on.
   - The resolution proposed (credit note, corrected invoice, re-performance, a call) and a response date.
   - A request to put the disputed amount on hold and not to apply late charges or pass it to collections while the dispute is open.
   - A reservation of rights and a professional, relationship-preserving tone.
4. Evidence to attach: contract or terms, quote, purchase order, delivery notes, timesheets, emails approving or refusing changes, photos of defects.
5. Next steps and timing: who to escalate to, how long to wait, a meeting or call agenda, and when to get legal advice (large amounts, threats of proceedings, a disputed termination).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent contract terms, statutory late payment rules or deadlines; mark them "to verify" and ask for the clause.
- Do not advise withholding the full invoice when only part is disputed unless the terms clearly allow it; explain the risk.
- Keep the letter factual and free of accusations of dishonesty.
- If the supplier has already started proceedings or sent a formal letter before claim, say a reply to that is a separate, time-limited step.
{{> output/uncertainty}}
</constraints>

<output_format>
## Position check
Two short lists: strengths and weaknesses, then items to confirm.

## Disputed and undisputed amounts
Table: line | invoiced | accepted | disputed | reason | document.

## Dispute letter
The complete letter with [BRACKETS].

## Evidence to attach
Checklist.

## Next steps and timing
Numbered steps.
</output_format>
