---
schema: 1
id: explain-surcharges-to-customers
kind: prompt
title: Explain surcharges to customers
description: Writes clear explanations and replies for charges customers dispute - service charges, card fees, call-out fees, weekend rates, delivery minimums - and checks whether each is shown early enough.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate, review]
role: [founder, manager, support-agent]
subject: [hospitality]
requires: [none]
inputs: [text, message]
output: [copy, message, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [surcharges, price-transparency, service-charge, card-fees, disputed-charges]
pairs_with:
  prompts: [resolve-invoice-dispute, respond-to-online-review, write-support-reply]
args:
  - name: surcharges
    description: Each extra charge you apply - what it is, the amount or percentage, why you charge it, and where and when customers currently see it (menu, website, quote, booking confirmation, only on the bill).
    type: text
    required: true
  - name: customer_message
    description: A complaint or question from a customer about a charge, to answer. Optional.
    type: text
  - name: country
    description: Country (and state if relevant), since rules on surcharges and price display differ.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Disclosure check, Customer-facing wording, Reply, Staff lines, Points to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help restaurants, trades, hotels and delivery services explain extra charges. Customers rarely object to a charge they saw before deciding to buy; they object to one that appears on the bill, sounds invented, or is described in a way that feels like a trick ("discretionary" charges added without saying so, a "card fee" larger than the cost of taking cards). Many countries regulate how surcharges and total prices must be shown, whether card surcharges are allowed and capped, and whether service charges are optional. So the job has two parts: check that each charge is shown clearly and early enough, then explain it in plain, non-defensive words. Country: {{country}}.
</context>

<task>
<surcharges>
{{surcharges}}
</surcharges>
{{#customer_message}}
<customer_message>
{{customer_message}}
</customer_message>
{{/customer_message}}

1. Disclosure check: for each charge, where and when the customer first sees it, whether that is before they commit (booking, ordering, accepting the quote), whether the wording is clear about amount and whether it is optional, and a verdict: fine, improve, or risky. List the rule questions to verify for the country (card surcharge allowed and capped, service charge optional and how displayed, total-price display rules, tips and staff distribution rules).
2. Customer-facing wording: one or two plain sentences per charge for the menu, website, quote or booking page, stating amount, what it covers and whether it is optional.
3. Reply: if a customer message is given, answer it - acknowledge, explain the charge plainly, and if it was not shown clearly or is optional, remove or refund it without argument. If no message is given, write one model reply per charge.
4. Staff lines: short lines for staff when a customer queries a charge at the till or door, including how to remove an optional charge gracefully.
5. Points to verify: the legal questions from step 1 with where to check (consumer protection authority, trade association).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state surcharge or price display rules as fact for the country; list them to verify.
- Never write wording that disguises a mandatory charge as optional, or an optional charge as mandatory.
- If a charge was not disclosed before the customer committed, recommend waiving or refunding it in the reply and fixing disclosure, rather than defending it.
- Use only the charges and amounts given; mark missing amounts as [X].
</constraints>

<output_format>
One opening line: general guidance, not legal advice; check the rules in your country.
## Disclosure check
Table: Charge | First seen | Before commitment? | Verdict | Fix.
## Customer-facing wording
Per charge, ready to paste.
## Reply
Ready to send.
## Staff lines
Quoted lines.
## Points to verify
Bullets.
</output_format>
