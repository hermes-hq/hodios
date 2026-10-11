---
schema: 1
id: request-quote-from-supplier
kind: prompt
title: Request quotes from suppliers
description: Writes a request for quotation to several suppliers or tradespeople with specs, quantities, dates and a reply format that makes the quotes directly comparable, plus a tracker table.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, founder, individual, project-manager]
requires: [none]
inputs: [notes, spec]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [request-for-quotation, procurement, supplier-quotes, comparison, purchasing]
pairs_with:
  prompts: [write-rfp, compare-vendors, prepare-supplier-negotiation]
args:
  - name: need
    description: What you are buying (goods or a service), specifications, quantities, quality or standards required, delivery or start date, location, and anything optional you want priced separately.
    type: text
    required: true
  - name: buyer
    description: Your organisation or household, contact details, and how you will decide (price, lead time, warranty, references).
    type: text
  - name: reply_by
    description: Date quotes are due.
    type: string
output_contract:
  format: markdown
  sections: [Email, Quote comparison table, Questions to settle first, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Buyers who get three quotes and cannot compare them almost always sent a loose request: one supplier quotes with delivery, one without, one adds tax, one quotes a different grade. Experienced purchasers send every supplier the same short, precise request and tell them exactly how to price it: unit and total price, what is included and excluded, taxes, delivery, lead time, validity, payment terms and warranty, with options priced as separate lines. They also say how the decision will be made and by when, which gets faster and more honest replies. For large or complex purchases a formal RFP document is the better tool; this is the email for everyday purchases and trade jobs.
</context>

<task>
Write a request for quotation for this need.{{#reply_by}} Quotes due: {{reply_by}}.{{/reply_by}}

<need>
{{need}}
</need>
{{#buyer}}
<buyer>
{{buyer}}
</buyer>
{{/buyer}}

1. List any specs that are too vague to price consistently (grade, size, finish, quantities, site access) under "Questions to settle first"; use [placeholders] for them in the email.
2. Subject: "Request for quotation: [item or job], [quantity], needed by [date]".
3. One-line introduction of the buyer, then the requirement as a numbered list: item or scope, specification, quantity, delivery or start date, location, standards or certificates required.
4. "Please include in your quote", as a list: unit and total price, currency, tax shown separately, delivery or call-out costs, lead time, quote validity, payment terms, warranty or guarantee, and each option as a separate line.
5. Due date, how to send the quote, who to ask questions, and that the same questions and answers will be shared with all suppliers if relevant.
6. How the decision will be made (the criteria given) and when suppliers will hear back.
7. For trade jobs that need a site visit, offer visit times rather than asking for a blind price.
8. A comparison table with one row per line item from step 4 and columns for Supplier A, B and C, to fill in when quotes arrive.
</task>

<constraints>
- Email body under about 250 words; the numbered spec can make it longer if needed.
- Never invent specifications, quantities, budgets, standards or dates. Do not reveal a budget unless the input says to.
- Neutral and businesslike; the same email must work for every supplier, so no supplier-specific details.
- If the need mentions regulated work (gas, electrical, structural), add a line asking for proof of the relevant registration or certification, without naming a specific scheme unless the country is given.
</constraints>

<output_format>
## Email
Subject, then body.
## Quote comparison table
Markdown table.
## Questions to settle first
Bullets. "None" if complete.
## Notes
Placeholders and tips. "None" if nothing.
</output_format>
