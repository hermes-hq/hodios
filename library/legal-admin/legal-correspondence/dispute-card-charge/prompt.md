---
schema: 1
id: dispute-card-charge
kind: prompt
title: Dispute a card charge
description: Drafts a card chargeback or bank dispute with the transaction details, the dispute reason that fits, the evidence to attach and the deadlines to verify with the card issuer.
category: legal-correspondence
version: 1.0.0
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

1. Decide whether this looks like a card dispute case or something else, and say which: an unrecognised transaction (possible fraud, report to the issuer at once and block the card), a merchant dispute (goods or service not received, not as described, cancelled but still charged, refund promised and not processed, charged twice or wrong amount, subscription charged after cancellation), or a disagreement the card process does not usually cover (buyer's remorse, a price you agreed to and later regret). If key facts are missing (card type, dates, whether the merchant was contacted), ask for them, and continue with clearly marked assumptions.
2. Name the dispute category in plain words that best fits the facts and explain in one or two sentences why. Mention that issuers map it to a network reason code; do not state code numbers as fact.
3. List the time limits to verify: the issuer's window from the transaction or expected delivery date, any requirement to contact the merchant first, and any separate protection (for example credit-card-specific legal protections in some countries). Mark each as "verify with your issuer" with the date it would fall on if the common window applied, showing the calculation.
4. List what to do before filing: a final written request to the merchant with a short deadline (offer to draft it in two or three lines), and screenshots of the listing or terms as they were.
5. Draft the dispute statement for the issuer's form or letter: under 250 words, first person, chronological, with the transaction details, what was agreed, what happened, the attempt to resolve with the merchant, the remedy sought (full or partial amount with calculation), and the evidence list.
6. Build the evidence pack: each item, what it proves, held or still to get.
7. Explain briefly what usually happens next (temporary credit, merchant response, possible second round) and options if refused (escalate within the issuer, the financial ombudsman or regulator where one exists, a complaint or small claim against the merchant).
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
