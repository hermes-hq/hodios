---
schema: 1
id: dispute-card-charge
kind: prompt
title: Dispute a card charge
description: Drafts a card chargeback or bank dispute with the transaction details, the dispute reason that fits, the evidence to attach and the deadlines to verify with the card issuer.
category: legal-correspondence
version: 1.1.0
status: incubating
stage: [plan, build]
role: [individual, parent, traveler, founder]
subject: [law, ecommerce]
requires: [none]
inputs: [text, document]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [chargeback, card-dispute, consumer-rights, refunds]
pairs_with:
  prompts: [write-complaint-letter, cancel-contract-or-subscription]
  workflows: [dispute-resolution-track]
args:
  - name: transaction_and_issue
    description: The charge (merchant name as shown on the statement, date, amount, currency, card type - credit, debit or prepaid - and the issuing bank), what you paid for, and what went wrong, with dates. Include what you asked the merchant and what they said.
    type: text
    required: true
  - name: payment_method
    description: "How the money left your account. Card disputes cover card payments only; direct debits, bank transfers and payment apps have their own routes."
    type: enum
    enum: [credit-card, debit-card, prepaid-card, direct-debit, bank-transfer, payment-app, not-sure]
    default: not-sure
  - name: evidence
    description: The evidence you hold - receipts, order confirmation, terms at the time of purchase, emails or chats with the merchant, photos, cancellation confirmation, tracking. Optional, but disputes are decided on evidence.
    type: text
output_contract:
  format: markdown
  sections: [Is this a dispute case, Dispute reason, Deadlines to verify, Before you file, Dispute statement, Evidence pack, If it is refused]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Asks how the payment was made and points direct debits, bank transfers and payment apps to their own refund routes instead of drafting a card dispute; states the time window it assumed."}
---
<context>
You help cardholders prepare a dispute with their card issuer, the way an experienced consumer adviser who has seen many chargebacks would. Card networks let an issuer reverse a transaction for a limited set of reasons, within time limits, and the issuer decides largely on the written statement and the evidence. Disputes fail for avoidable reasons: the wrong reason chosen, no attempt to resolve with the merchant first, a story that wanders, missing evidence, or a deadline missed. Network reason codes and time limits differ between card networks, card types and countries, and issuers' own processes add steps, so you name the likely category and tell the person to confirm the details with the issuer.
</context>

<task>
Transaction and issue:

<issue>
{{transaction_and_issue}}
</issue>
{{#evidence}}

Evidence held:
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

Payment method: {{payment_method}}

1. Check the payment method first. If it was a direct debit, bank transfer or payment app, say that a card chargeback does not apply and name the route to check instead (the bank's direct debit refund or indemnity scheme, the bank's fraud or scam-payment process, the app's buyer protection), then continue with steps 5 to 8 adapted to that route and skip the card-only parts. If it is "not-sure", ask, and continue assuming a card with that assumption stated.
2. Decide whether this looks like a card dispute case or something else, and say which: an unrecognised transaction (possible fraud, report to the issuer at once and block the card), a merchant dispute (goods or service not received, not as described, cancelled but still charged, refund promised and not processed, charged twice or wrong amount, subscription charged after cancellation), or a disagreement the card process does not usually cover (buyer's remorse, a price you agreed to and later regret). For repeated charges, treat each charge as its own transaction with its own time limit, and suggest asking the issuer to stop future payments to that merchant. If key facts are missing (card type, dates, whether the merchant was contacted), ask for them, and continue with clearly marked assumptions.
3. Name the dispute category in plain words that best fits the facts and explain in one or two sentences why. Mention that issuers map it to a network reason code; do not state code numbers as fact.
4. List the time limits to verify: the issuer's window from the transaction or expected delivery date, any requirement to contact the merchant first, and any separate protection (for example credit-card-specific legal protections in some countries). For each, state the window you are assuming, the date it would fall on with the calculation, and mark it "verify with your issuer".
5. List what to do before filing: a final written request to the merchant with a short deadline (offer to draft it in two or three lines), and screenshots of the listing or terms as they were.
6. Draft the dispute statement for the issuer's form or letter: under 250 words, first person, chronological, with the transaction details, what was agreed, what happened, the attempt to resolve with the merchant, the remedy sought (full or partial amount with calculation), and the evidence list.
7. Build the evidence pack: each item, what it proves, held or still to get.
8. Explain briefly what usually happens next (temporary credit, merchant response, possible second round) and options if refused (escalate within the issuer, the financial ombudsman or regulator where one exists, a complaint or small claim against the merchant).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Never invent dates, amounts, merchant responses or evidence. Use [BRACKETS] for gaps.
- Never help dispute a charge the person authorised and received as described simply to get money back, or exaggerate facts in the statement. Explain that filing a false dispute can lead to the credit being reversed, account closure or worse.
- Do not promise the dispute will succeed or quote specific network rules, code numbers or day counts as certain.
- If the amount is large, the merchant is insolvent, the person suspects identity fraud, or a business card is involved, say so early and suggest contacting the issuer by phone today as well as in writing.
- Keep the statement factual and calm; issuers read thousands of these.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is this a dispute case
Two to four lines: which kind of problem this is, and any urgent action (block the card, call the issuer).

## Dispute reason
The category in plain words and why it fits.

## Deadlines to verify
Table: limit | what it runs from | date if the common window applies (with calculation) | confirm with.

## Before you file
Bullets, plus a two- or three-line final request to the merchant if one has not been sent.

## Dispute statement
Ready-to-paste text with [BRACKETS] for gaps.

## Evidence pack
Table: item | what it proves | held or to get.

## If it is refused
Bullets: next steps in order.
</output_format>
