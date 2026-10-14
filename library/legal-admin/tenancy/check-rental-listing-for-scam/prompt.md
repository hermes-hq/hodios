---
schema: 1
id: check-rental-listing-for-scam
kind: prompt
title: Check a rental listing for a scam
description: Checks a rental listing and the person behind it for scam signs before paying anything, with ownership checks, viewing rules, safe payment and what to do if money was sent.
category: tenancy
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, student]
subject: [law]
requires: [none]
inputs: [text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [rental-scam, fake-listing, holding-deposit, fraud-check, house-hunting]
pairs_with:
  prompts: [compare-rental-offers, prepare-rental-application, claim-scam-reimbursement-from-bank]
args:
  - name: listing
    description: The listing text, price, location, where it was posted, and anything unusual about the photos or details.
    type: text
    required: true
  - name: contact
    description: What the landlord or agent has said and asked for - messages, payment requests, reasons they cannot meet, documents they sent - and anything you have already paid or shared.
    type: text
    required: true
  - name: location
    description: Country and city. Typical rents, agent rules and reporting channels differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Red flags found, Checks to do before paying, Safe way to proceed, If you have already paid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a renter decide whether a listing is genuine before they hand over money or documents. Rental scams follow a small number of patterns: a listing copied from a real property or a sale listing at a below-market rent; a "landlord" who is abroad, a missionary, in the military or otherwise cannot show the home; pressure to pay a deposit or first month to "secure" it before viewing, often by bank transfer, gift cards, crypto or a money transfer service; requests for passport or bank details early; fake agent websites and fake "escrow" or platform payment emails; a viewing with a person who has a key but no right to let it (sometimes a short-let guest); and hijacked accounts of real agents. A genuine landlord or agent will normally let you view in person or by a live video call you control, can show they have the right to let the home, and accepts traceable payment after a contract is signed. Bank transfers to a scammer are hard to recover, though some countries now have reimbursement schemes if reported quickly.

Location: {{location}}

<listing>
{{listing}}
</listing>

<contact>
{{contact}}
</contact>
</context>

<task>
1. Give a verdict: likely scam, unclear, or no obvious red flags, with a confidence level and the reasons. Never call a listing safe; at best say no red flags were found yet.
2. List each red flag found in the listing and messages, quoting the wording, and explain why it matters. Also list positive signs if any.
3. Give checks to do before paying: reverse image search the photos, search the address and listing text for duplicates or a sale listing, compare the rent with similar homes, verify ownership through the property register or tax records where available ("[to verify]" for the local source), check an agent's registration or membership in a redress or licensing scheme where one exists, call the agency on a number found independently, and insist on an in-person or live video viewing.
4. Explain the safe way to proceed: sign a written agreement first, pay by a traceable method to an account in the landlord's or agent's name, get receipts, and share identity documents only once the tenancy is real, with sensitive details covered where possible.
5. If money or documents were already sent, give urgent steps in order: contact the bank's fraud team immediately, report to the platform and the national fraud reporting channel, preserve messages and ads, watch for identity misuse, and be wary of "recovery" offers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a specific person is a criminal; describe signs and risk.
- Do not tell the user to contact the scammer to "test" them by sending small amounts, or to visit an address alone to confront anyone.
- Do not invent registry names, agent schemes or typical rents; describe what to check and mark local sources "[to verify]".
- If money was sent, put the bank call first because speed affects recovery.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line verdict, confidence, then two or three reasons.

## Red flags found
Table: Sign | Quote from listing or messages | Why it matters.

## Checks to do before paying
Checklist.

## Safe way to proceed
Bullets.

## If you have already paid
Numbered steps, or one line saying it does not apply.
</output_format>
