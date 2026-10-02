---
schema: 1
id: chase-late-payment
kind: prompt
title: Chase a late payment
description: Writes an escalating reminder sequence for an overdue invoice, from a friendly nudge to a final notice, with a call script, a payment-plan offer and lawful next steps.
category: accounting
version: 1.0.1
status: incubating
stage: [operate]
role: [consultant, founder]
requires: [none]
inputs: [text]
output: [message, script, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [overdue-invoice, payment-reminder, cash-collection, getting-paid]
pairs_with:
  prompts: [write-invoice, forecast-cash-flow]
  personas: [bookkeeper]
args:
  - name: invoice_details
    description: Invoice number, amount and currency, issue and due dates, what it was for, the client and contact name, agreed terms (including any late-fee clause), what you have already sent and any reply received.
    type: text
    required: true
  - name: relationship
    description: How you want to come across and how much the relationship matters, for example "long-term client, keep it warm", "one-off client" or "they have gone silent".
    type: string
    default: valued client, want to keep working together
output_contract:
  format: markdown
  sections: [Before you chase, Timeline, Messages, Call script, Payment-plan offer, If it stays unpaid]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Asks for today's date instead of guessing how overdue the invoice is."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You write payment reminders for small businesses and freelancers. Most late invoices are not malice: the invoice went to the wrong person, is missing a purchase order number, is stuck in an approval queue, or the client is short of cash. A good sequence removes those obstacles first, then raises firmness in steps, each one clear about the amount, the invoice, the date and the single action wanted. It never threatens anything the sender will not or cannot lawfully do, and it leaves the door open to a payment plan, because some payment soon beats a dispute later.

Relationship and tone: {{relationship}}
</context>

<task>
Invoice and history:

<invoice>
{{invoice_details}}
</invoice>

1. Work out how overdue the invoice is today and where it sits in the sequence (if today's date is not given, ask for it and meanwhile state the date you assumed), given what has already been sent. Start the sequence from the next appropriate step rather than from the beginning.
2. List the "before you chase" checks: the invoice reached the right person or accounts address, it has everything the client needs (PO number, supplier details, correct entity), and the work was accepted with no open complaint.
3. Plan a timeline relative to the due date, typically: day 1-3 overdue friendly nudge; day 7-10 firmer reminder that asks for a payment date; day 14-21 phone call plus written follow-up; day 30 final notice that states the next step and its date. Adjust the gaps and tone to the relationship.
4. Write each message with a subject line: invoice number, amount, original due date, days overdue, how to pay, and one clear ask. Attach or re-link the invoice each time. Escalate tone through clarity and consequences, not rudeness.
5. Write a short call script: confirm the invoice was received, ask what is holding it up, agree a date and amount, and confirm in writing afterwards.
6. Write a payment-plan offer they can send if the client is struggling: instalment amounts and dates that clear the balance within a set period, what happens if an instalment is missed, and a request to confirm in writing.
7. List what can happen if it stays unpaid, in order: pausing further work, charging contractual late fees or statutory interest where the law provides it, a formal letter before action, a small-claims process, or a collection agency. Present these as options to confirm locally.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Only mention late fees, interest or legal steps that the contract or local law supports, and flag them as "confirm before using". Never invent a statutory rate.
- No harassment: no excessive contact, no contacting the client's family, employer or customers, no public shaming, and no misleading claims that a matter is already with a court or lawyer.
- If the client is an individual consumer rather than a business, note that stricter debt-collection rules may apply and a gentler process is usually required.
- If the client disputes the work, stop the sequence and suggest resolving the dispute first, with a short reply that acknowledges it and proposes a call.
- If the amount is large or the client may be insolvent, suggest speaking to a lawyer or accountant early.
- Keep each message under 150 words.
</constraints>

<output_format>
## Before you chase
Checklist.

## Timeline
Table: when (relative to due date and as a calendar date if dates were given) | channel | step.

## Messages
Each message with a heading for its step, a subject line and the body.

## Call script
Short bullet script.

## Payment-plan offer
A ready-to-send message with an instalment table.

## If it stays unpaid
Ordered bullets, each marked "confirm locally".
</output_format>
