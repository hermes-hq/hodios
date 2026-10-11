---
schema: 1
id: claim-refund-for-faulty-product
kind: prompt
title: Claim a refund or repair for a faulty product
description: Writes a consumer-rights letter to a retailer about a faulty product, choosing refund, repair or replacement by how long ago it was bought, with evidence and next steps.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [consumer-rights, faulty-goods, refund-claim, retailer-letter, statutory-rights]
pairs_with:
  prompts: [dispute-card-charge, write-complaint-letter, explain-warranty-terms, complain-to-ombudsman]
args:
  - name: purchase
    description: What you bought, from whom (shop or online seller, not just the brand), the date bought and delivered, the price, how you paid, and any receipt or order number.
    type: text
    required: true
  - name: fault
    description: What is wrong, when it started, how you have used it, what you have already asked for and what the seller said.
    type: text
    required: true
  - name: remedy
    description: Optional. What you want - refund, repair or replacement - or "not sure".
    type: string
  - name: country
    description: Country and state or region. Consumer rights and time limits differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where you stand, Who to claim against, Letter, Evidence to keep, If they refuse]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a consumer claim for faulty goods. In most countries the legal claim is against the retailer who sold the item, not the manufacturer; a manufacturer's warranty is an extra promise on top of statutory rights, and shops often wrongly send customers to the maker. Many systems tier the remedy by time: a short early window when the buyer can reject a faulty item for a full refund, then a period when the seller gets one chance to repair or replace before a refund or price reduction is due, then a longer period when the buyer can still claim for goods that were not durable enough, but may have to show the fault was there from the start. In some places, faults appearing within a set period after delivery are presumed to have existed at delivery. Statutory rights usually cannot be removed by "no refunds" signs. Fair wear and tear, misuse and faults the buyer was told about are generally excluded. Paying by card can open a second route through the card issuer (chargeback, or in some countries the credit provider being jointly liable). Online purchases may also carry a separate change-of-mind cancellation right, which is a different thing from a fault claim.

Location: {{country}}

<purchase>
{{purchase}}
</purchase>

<fault>
{{fault}}
</fault>

{{#remedy}}Remedy wanted: {{remedy}}{{/remedy}}
</context>

<task>
1. Work out where the buyer probably stands: time since delivery, which remedy tier that likely puts them in, and whether the fault looks like a defect or wear, misuse or a known fault. Mark rights and time limits "[to verify]" and name the type of official consumer body to check with.
2. Say who to claim against (normally the seller) and correct the buyer if they were told to go to the manufacturer. Note any card or credit route as a backup.
3. If the remedy is "not sure" or unrealistic for the timing, recommend one with the reason.
4. Write the letter or email to the seller: order details, the fault and when it appeared, that the goods are not of the quality or fit for purpose the law requires (in neutral wording that fits the country), the remedy requested, a deadline of around 14 days, and what the buyer will do next. Under 300 words. Use only facts given and placeholders like [order number].
5. List evidence to keep: receipt, photos or video of the fault, messages with the seller, any repair report, and a note not to dispose of the item.
6. Give next steps if the seller refuses or ignores it: escalate in writing, card or credit claim with its time limits, alternative dispute resolution or ombudsman if the trader belongs to one, and small claims as the last resort.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name statutes, sections or exact time limits unless confident for {{country}}; mark them "[to verify]".
- Never overstate the fault, invent dates or hide misuse; a claim built on false facts fails and can harm the buyer.
- If the item is dangerous (overheating battery, electrical fault, child safety), say to stop using it and suggest reporting it to the product safety authority.
- Keep the letter firm and polite, without threats the buyer will not carry out.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Four to six lines with the likely remedy tier, marked "[to verify]".

## Who to claim against
Two or three lines.

## Letter
The draft, ready to send.

## Evidence to keep
Checklist.

## If they refuse
Numbered escalation steps.
</output_format>
