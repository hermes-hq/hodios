---
schema: 1
id: handle-wrong-item-received
kind: prompt
title: Handle a wrong or missing item complaint
description: Resolves a customer who received the wrong item, size or colour, or an order with items missing - checks the picking records, picks reship, refund or keep-it, and writes the reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager, founder]
requires: [none]
subject: [ecommerce, retail]
inputs: [message, notes, image]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [wrong-item, missing-item, mispick, reshipment, return-label]
pairs_with:
  prompts: [resolve-missing-parcel-complaint, process-damaged-in-transit-claim, decide-goodwill-refund, design-returns-process]
  rules: [support-commitment-rules]
args:
  - name: complaint
    description: What the customer says they ordered and what arrived, with any photos described (item label, barcode, packing slip), and what they want.
    type: text
    required: true
  - name: order_facts
    description: The order lines, values, packing or picking records, parcel weight if recorded, stock of the right item, shipping cost, and any earlier claims by this customer.
    type: text
    required: true
  - name: policy
    description: Your rules for mispicks and missing items - reship or refund, return labels, keep-it thresholds, who approves. Leave empty if none.
    type: text
output_contract:
  format: markdown
  sections: [What went wrong, Resolution, Reply, Fix the cause]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an online shop or retailer handle orders that arrived with the wrong product, the wrong size or colour, or with items missing. These are almost always the shop's fault (a picking or packing error, a mislabelled bin, a supplier sending the wrong variant, a multi-parcel order arriving in parts), and the customer should not have to pay or wait for the shop's mistake. The standard fix is to send the right item quickly, not after the wrong one comes back, and to handle the wrong item in the cheapest way: a prepaid return label for valuable items, or "keep it or donate it" when return postage and handling cost more than the item is worth. Before deciding, check two things: whether the "missing" item is actually in a second parcel or listed as back-ordered, and whether the records (packing photo, parcel weight, scan of the item) support the claim, because repeated "wrong item" claims from one account are a known abuse pattern.
</context>

<task>
<complaint>
{{complaint}}
</complaint>

<order_facts>
{{order_facts}}
</order_facts>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Establish what went wrong: wrong product, wrong variant, missing item, or not actually an error (split shipment, back-order, item listed differently from what the customer expected). Say what the records show and what is still unknown.
2. Check the evidence: packing slip versus contents, photo of label or barcode, parcel weight against expected weight, stock counts, earlier claims. Note any signal that needs a closer look, without assuming bad faith.
3. Choose the resolution: send the correct item now (and by which service), refund if the right item is out of stock or the customer prefers, and what to do with the wrong item (prepaid return with a deadline, or keep it) based on its value against return cost. State who approves if outside agent limits.
4. Write the reply: own the mistake in one sentence, say what you are sending and when it should arrive, explain what to do with the wrong item in simple steps, and give a reference. If it is not an error (a second parcel on the way), explain kindly with the tracking.
5. Suggest one fix to stop it recurring: check the bin or SKU label, add a packing photo or scan step, alert the supplier, or improve the product page wording if variants are confusing.
</task>

<constraints>
- Use only the facts given; do not invent stock levels, delivery dates or costs. Use `[CHECK: ...]` where needed.
- Do not make the customer pay return postage for the shop's error.
- Do not withhold the correct item until the wrong one is returned, unless policy or a clear abuse signal requires it, and then explain it neutrally.
- Reply under about 130 words, no blame on the warehouse team by name.
</constraints>

<output_format>
## What went wrong
Type of error, evidence, unknowns.

## Resolution
Action, shipping method, what to do with the wrong item, cost note, approver if needed.

## Reply
Ready to send.

## Fix the cause
One or two process fixes.
</output_format>
