---
schema: 1
id: process-damaged-in-transit-claim
kind: prompt
title: Process a damaged-in-transit claim
description: Processes a customer report of goods damaged in delivery - evidence to request, replace or refund, the carrier claim with its deadlines and paperwork, and packaging fixes when damage repeats.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, support-agent, operations-manager]
subject: [ecommerce, supply-chain]
requires: [none]
inputs: [message, text, notes]
output: [checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [transit-damage, carrier-claims, packaging, replacement, proof-of-damage]
pairs_with:
  prompts: [write-support-reply, escalate-customer-issue-to-supplier, analyze-support-tickets]
args:
  - name: report
    description: The customer's report and order facts - item, value, order and tracking numbers, delivery date, carrier and service, what the damage looks like, photos already sent, and whether the customer signed for it or noted damage.
    type: text
    required: true
  - name: carrier_terms
    description: What you know of the carrier's claim rules - deadline to report, cover limit, packaging requirements, evidence needed, whether you bought extra cover. Optional; gaps become checks.
    type: text
  - name: recent_damage
    description: Any similar damage claims recently, for example "3 broken mugs this month, all by the same courier". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Case checklist, Customer reply, Carrier claim, Packaging review, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help online sellers, wholesalers and makers process damaged-in-transit reports. Two separate jobs run side by side: putting things right with the customer quickly (the customer's contract is usually with the seller, not the carrier), and recovering the cost from the carrier, whose claim windows are short and strict about evidence. Claims are usually lost because the seller asked the customer to throw the item away before photos of the outer packaging were taken, missed the carrier's reporting deadline, or packed below the carrier's packaging requirements. Repeated damage is a packaging or carrier problem worth fixing, not bad luck.
</context>

<task>
<report>
{{report}}
</report>
{{#carrier_terms}}
<carrier_terms>
{{carrier_terms}}
</carrier_terms>
{{/carrier_terms}}
{{#recent_damage}}
<recent_damage>
{{recent_damage}}
</recent_damage>
{{/recent_damage}}

1. Case checklist, in order: log the report with date; request proportionate evidence from the customer (photos of the item, the inner packing and the outer box with the label, and any delivery note annotation) and ask them to keep everything until the claim is settled; check the carrier's reporting deadline and note the date it expires; decide the remedy.
2. Remedy: replace or refund promptly for low-value items without waiting for the carrier; for high-value or suspicious claims, wait for evidence or arrange collection first. Say which applies and why, and who pays return postage.
3. Customer reply: acknowledge, apologise once, say what happens next and by when, request the photos simply, and ask them not to throw anything away yet.
4. Carrier claim: what to file, the evidence list (photos, proof of value such as invoice or cost price, proof of postage, packaging description, tracking), the deadline and cover limit to check, and what to do if the claim is rejected.
5. Packaging review: only if damage repeats or the packing looks thin from the report, suggest fixes (box strength, void fill, corner protection, double boxing for fragile items, the carrier's packaging rules), and whether to switch service for fragile goods.
6. Questions: missing facts.
</task>

<constraints>
- Never state a carrier's deadline, cover limit or rules as fact; use the terms given or mark them [check].
- Use only the facts given; mark missing order or tracking details as [X].
- Do not accuse the customer of fraud; for suspicious patterns, recommend proportionate verification (collection, return of the item) in the checklist only.
- The customer reply is under about 120 words.
</constraints>

<output_format>
## Case checklist
Numbered steps with dates or deadlines.
## Customer reply
Ready to send.
## Carrier claim
Evidence checklist and deadline line.
## Packaging review
Bullets, or "Not needed for a one-off".
## Questions
Bullets.
</output_format>
