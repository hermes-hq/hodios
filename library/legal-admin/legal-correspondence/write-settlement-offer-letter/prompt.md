---
schema: 1
id: write-settlement-offer-letter
kind: prompt
title: Write a settlement offer letter
description: Drafts a without-prejudice offer to settle a money dispute, with the reasoning for the figure, payment terms, what is released, an acceptance deadline and the protections to check locally.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [settlement, without-prejudice, settlement-terms, full-and-final, money-claim]
pairs_with:
  prompts: [reply-to-letter-before-claim, write-complaint-letter, prepare-small-claims-case]
  workflows: [small-claims-track]
args:
  - name: dispute
    description: What the dispute is about, who the other party is, the amount claimed by each side, what has been said so far, and whether court or an outside body is already involved.
    type: text
    required: true
  - name: offer
    description: What you are willing to offer or accept - the amount, payment timing or instalments, and anything non-monetary (return of goods, a reference, removal of a review).
    type: text
    required: true
  - name: side
    description: Whether you are the one-paying (offering to pay) or the one-claiming (offering to accept less than you claim).
    type: enum
    enum: [one-paying, one-claiming]
    default: one-claiming
  - name: country
    description: Country and region, if known. Whether "without prejudice" protection exists and how it works differs by country. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Offer logic, Offer letter, Open-record letter, Before you send, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a person make a written offer to settle a dispute before or during a small claim. Experienced negotiators know a few things novices miss. An offer carries more weight when it explains briefly why the figure is reasonable (the strengths of your case, the cost and time of going to court, the risk for both sides). It needs clear terms: the amount, when and how it is paid, what each side gives up (usually "in full and final settlement" of that dispute only), and how long it stays open. In many common-law countries, an offer marked "without prejudice" or "without prejudice save as to costs" generally cannot be shown to the judge on liability, which lets people negotiate honestly; in other countries this protection works differently or does not exist, and lawyer-to-lawyer confidentiality rules may apply instead. A separate "open" letter restating the main claim is often useful, because the protected letter cannot be relied on later to show what was claimed.

Side: {{side}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Dispute:

<dispute>
{{dispute}}
</dispute>

Offer:

<offer>
{{offer}}
</offer>

1. Explain the offer logic in a few bullets: the full claim, the offer, the gap, and the reasons that justify the figure (evidence, cost and delay of a hearing, uncertainty) using only the facts given. Flag if the offer looks out of line with the facts (for example accepting far less than an undisputed sum, or offering more than claimed).
2. Draft the offer letter:
   - Heading "Without prejudice" (or "Without prejudice save as to costs" where that is used) with a note on what to check locally.
   - Reference to the dispute and earlier correspondence.
   - A short, non-inflammatory statement of why settlement makes sense for both sides. Do not concede facts beyond the offer itself.
   - Terms: amount, payment method and date or instalment schedule, what happens if a payment is missed, any non-monetary terms, the "full and final settlement" scope limited to this dispute, confidentiality if wanted, and that the offer is open until a specific date.
   - How to accept: in writing by the date.
3. Draft a short open letter (not marked without prejudice) that the person could send alongside or keep ready, restating the claim or position and that the matter remains disputed.
4. Pre-send checklist: the figure is final and affordable, the deadline is a real calendar date, instalments are realistic, a written settlement agreement will follow for larger sums, and proof of sending.
5. Say when to get advice before sending.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent rules about costs, interest or court procedure. Describe "without prejudice" and costs consequences in general terms, marked "verify locally".
- Never mix admissions of fact into the offer letter. The offer is a commercial proposal, not an admission.
- No threats, insults or pressure tactics such as exploding deadlines of hours; a reasonable window is usually 7 to 21 days.
- Do not include terms that would be unlawful or unenforceable in most places, such as a promise not to report a crime or to withdraw a complaint to a regulator in exchange for money; flag such a request instead.
- If the dispute involves employment, personal injury, a business sale, family property or a large sum, or a court case has started, recommend legal advice before signing any settlement agreement.
{{> output/uncertainty}}
</constraints>

<output_format>
## Offer logic
Bullets.

## Offer letter
Complete letter with [BRACKETS].

## Open-record letter
Short letter.

## Before you send
Checklist.

## Get advice if
Bullets tied to this case.
</output_format>
