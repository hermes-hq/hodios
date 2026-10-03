---
schema: 1
id: write-credit-control-policy
kind: prompt
title: Write a credit control policy
description: Writes a credit control policy for a small business covering credit checks and limits, payment terms, invoicing, a dated reminder timetable, disputes, escalation, stop-supply rules and write-offs.
category: accounting
version: 1.0.1
status: incubating
stage: [plan, operate]
role: [founder, operations-manager]
requires: [none]
inputs: [text, document]
output: [docs, checklist, table]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [credit-control, accounts-receivable, payment-terms, debt-collection]
pairs_with:
  prompts: [chase-late-payment, write-invoice, analyze-working-capital]
  personas: [bookkeeper]
args:
  - name: business
    description: What you sell, to whom (businesses or consumers, size, sector), typical invoice size, how many customers on credit, country, and current problems such as late payers or bad debts.
    type: text
    required: true
  - name: current_terms
    description: Your current payment terms, contract or terms-and-conditions wording on payment and late fees, and how you chase today. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Policy, Reminder timetable, Customer-facing terms summary, Measures to track, Points to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Asks for the country and customer type before writing late-payment and collection terms."}
---
<context>
You write the credit control policy a small business needs before late payment becomes a cash crisis. Credit control works when the rules are decided in advance and applied to every customer, so chasing is routine rather than personal: who gets credit and how much, what the terms are and where they are written, how invoices go out, exactly when reminders and calls happen, who can put an account on hold, and when a debt is handed on or written off. Clear terms agreed before the first order are also what make late payment interest, compensation or stop-supply enforceable.
</context>

<task>
Business:

<business>
{{business}}
</business>

{{#current_terms}}Current terms and process:

<current_terms>
{{current_terms}}
</current_terms>{{/current_terms}}

1. Check two facts that decide the legal parts: the country, and whether customers are businesses, consumers or both. If either is missing, ask, and until it is answered write those parts as clearly marked options. Then write the policy as a document the business can adopt, with these sections: purpose and scope; roles (who approves credit, who chases, who can stop supply, who approves write-offs); new customer credit (application details, checks such as credit reference, trade references or company records, starting limits, deposits or upfront payment for first orders or high-risk customers); payment terms (standard terms, early payment, payment methods); invoicing standards (sent on the day of supply or milestone, purchase order numbers, correct contact, clear due date); the reminder and escalation timetable; disputes (log, pause chasing only on the disputed part, resolve within a set time); stop-supply and account-hold rules; late payment interest and compensation (statutory or contractual, verify for the country and customer type); escalation (final notice, payment plans, collection agency, court or small claims); bad debt write-off and approval; credit limit reviews; and records.
2. Turn the timetable into a dated table from invoice date: for example a courtesy reminder before the due date, a reminder the day after, a call at 7 days overdue, a final notice at 14 to 21 days, account on hold at 30 days, and escalation after that. Adjust to the business's terms and invoice sizes.
3. Write a short customer-facing summary of terms suitable for a quote, onboarding email or invoice footer.
4. List the measures to track monthly: days sales outstanding, aged debt by bucket, percentage of invoices paid on time, and bad debts as a share of revenue.
5. List points to verify locally, especially late payment interest, compensation and consumer rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Mark every legal entitlement (statutory interest rates, fixed compensation, rules on charging consumers, limits on payment terms) "verify" unless you are confident it is current for the country and customer type; recommend a solicitor or lawyer review the terms before adoption.
- Rules for consumers usually differ from business customers; if the business sells to consumers, keep the policy within consumer protection and debt collection rules and say so.
- Firm but fair: no threatening or misleading wording in any customer-facing text, and a route for customers in genuine difficulty (a payment plan).
- Fit the policy to the business's size: a sole trader does not need a credit committee.
{{> output/uncertainty}}
</constraints>

<output_format>
## Policy
The full policy with numbered headings, ready to edit.

## Reminder timetable
Table: day relative to invoice or due date | action | channel | owner.

## Customer-facing terms summary
Four to six sentences.

## Measures to track
Table: measure | how to calculate | target.

## Points to verify
Numbered.
</output_format>
