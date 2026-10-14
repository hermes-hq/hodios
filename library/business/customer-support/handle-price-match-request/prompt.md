---
schema: 1
id: handle-price-match-request
kind: prompt
title: Handle a price match request
description: Handles a customer asking you to match a competitor's or your own lower price - checks like-for-like, applies or drafts a price-match rule, and writes the reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, founder, operations-manager]
requires: [none]
subject: [retail, ecommerce]
inputs: [message, text]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [price-match, price-adjustment, competitor-price, retail-policy, margin]
pairs_with:
  prompts: [decide-goodwill-refund, write-support-reply]
  rules: [support-commitment-rules]
args:
  - name: request
    description: The customer's request - the product, the price they paid or would pay, the competitor or sale price they found, where and when, and any link or screenshot details.
    type: text
    required: true
  - name: product_facts
    description: Your product details (exact model, size, condition, bundle), price paid and date, delivery and warranty terms, and your cost or margin if you want that weighed.
    type: text
    required: true
  - name: policy
    description: Your price match or price adjustment policy if you have one, and who can approve exceptions. Leave empty if you have none.
    type: text
output_contract:
  format: markdown
  sections: [Like-for-like check, Decision, Reply, Policy suggestion]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a shop or online store answer price match requests: a customer found the same item cheaper elsewhere, or bought from you and then saw your own price drop. Most price match disputes come from things not actually being identical: a different model number or region variant, a refurbished or grey-import unit, a bundle versus a single item, a marketplace seller rather than the retailer, a price that excludes delivery or tax, a members-only or clearance price, or a listing that is out of stock. Retailers that state their exclusions clearly can match confidently; those without a policy end up deciding case by case and appearing unfair. A price drop on your own site shortly after purchase is usually cheaper to refund as the difference than to process a return and repurchase, which the customer can often do anyway.
</context>

<task>
<request>
{{request}}
</request>

<product_facts>
{{product_facts}}
</product_facts>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Classify the request: competitor match before purchase, competitor match after purchase, or own price drop after purchase.
2. Run the like-for-like check: exact model and variant, new versus refurbished, seller type (retailer versus marketplace third party), in stock and currently live, total price including delivery and tax, warranty and returns equivalence, any membership, coupon or clearance condition. Mark each as matches, differs or unknown.
3. Decide: match, partial adjustment, decline with an alternative, or need more information. If the policy is given, apply it exactly and quote the deciding rule. If there is no policy, recommend a decision and note the margin impact if cost was given. If a return-and-rebuy would happen anyway, say so.
4. Write the reply: decision first; if matching, the amount and how it will be refunded or applied; if declining, the specific reason (for example "that listing is a refurbished unit") and the best alternative; if more information is needed, exactly what.
5. If no policy exists or the case exposed a gap, suggest a short price-match policy: eligible competitors, like-for-like conditions, time window after purchase, exclusions, proof required.
</task>

<constraints>
- Do not assume the competitor price is valid; anything you cannot verify from the information given is "unknown", with what to check.
- Do not invent competitor names, prices or your own policy terms.
- Never disparage the competitor in the reply.
- Reply under about 120 words, friendly and plain.
</constraints>

<output_format>
## Like-for-like check
Table: factor | ours | theirs | matches, differs or unknown.

## Decision
Outcome, amount, deciding rule or reasoning, approver if needed.

## Reply
Ready to send.

## Policy suggestion
Short policy or "policy covers this".
</output_format>
