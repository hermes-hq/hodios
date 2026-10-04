---
schema: 1
id: brief-staff-on-refund-rights
kind: prompt
title: Brief staff on refund rights
description: Writes a till-side cheat sheet that separates what consumer law requires (to verify) from the shop's own goodwill policy - faulty, change of mind, online, sale items - with phrases staff can use.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, learn]
role: [manager, founder, operations-manager]
subject: [retail]
requires: [none]
inputs: [text, document]
output: [docs, checklist, script]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [refund-rules, returns, till-phrases, consumer-rights, staff-training]
pairs_with:
  prompts: [write-refund-policy, write-job-aid, answer-product-warranty-claim]
args:
  - name: country
    description: Country (and state or province if rules differ) where the shop trades.
    type: string
    required: true
  - name: shop_policy
    description: Your current returns and refund policy, what staff may approve alone, and anything you sell that is special (made-to-order, perishable, hygiene items, gift cards, sale stock). Optional.
    type: text
  - name: sells_online
    description: Whether you also sell online or by phone, which can bring different cancellation rules.
    type: enum
    enum: ["no", "yes"]
    default: "no"
output_contract:
  format: markdown
  sections: [The two layers, Cheat sheet, Phrases for the till, When to call a manager, Owner checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write staff guidance for shops. At the till, staff mix up two different things: the customer's legal rights when goods are faulty, not as described, or bought at a distance, and the shop's own goodwill policy for change of mind, which in many countries is optional and set by the shop. Mixing them causes both kinds of trouble: refusing a refund the customer is entitled to ("no refunds on sale items" for a faulty item), or giving away money the shop never promised. A good cheat sheet keeps the two apart, gives staff calm words, and sends anything unusual to a manager.

Country: {{country}}. Sells online or by phone: {{sells_online}}.
</context>

<task>
{{#shop_policy}}
<shop_policy>
{{shop_policy}}
</shop_policy>
{{/shop_policy}}

1. The two layers: explain in four or five plain sentences the difference between legal rights (faulty, not as described, distance selling) and the shop's goodwill policy (change of mind, no receipt, exchange only, credit notes).
2. Cheat sheet: a table of common situations - faulty item, item not as described, change of mind with receipt, change of mind without receipt, sale item faulty, sale item change of mind, gift returned by the recipient, online order returned (if sold online), opened hygiene or perishable item, made-to-order item. For each: which layer applies, what staff can do, and what to verify for this country (time limits, refund versus repair, proof of purchase rules).
3. Phrases for the till: short lines for yes, for a goodwill "no" with an alternative, for a faulty item, and for an upset customer. Staff never quote law at customers.
4. When to call a manager: the clear list (amount above the staff limit, suspected fraud, safety issue, disputes about whether a fault is real, any mention of legal action).
5. Owner checklist: the legal points the owner must confirm with the official consumer authority before staff use the sheet, and signs ("no refunds" notices) that may be misleading in their country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not present statutory time limits, remedies or exceptions as fact for the country; mark each as [verify] in the cheat sheet and list it in the Owner checklist.
- Never write wording that suggests customers lose legal rights for faulty goods because of a sale, a missing box or the shop's policy.
- Use the shop's policy as given; where it seems to conflict with likely legal rights, flag it in the Owner checklist rather than repeating it.
- The cheat sheet fits one printed page: short cells, no paragraphs.
</constraints>

<output_format>
One opening line: general guidance, not legal advice; verify each [verify] item locally.
## The two layers
Four or five sentences.
## Cheat sheet
Table: Situation | Layer | Staff can | [verify] for this country.
## Phrases for the till
Quoted lines grouped by situation.
## When to call a manager
Bullets.
## Owner checklist
Bullets with what to confirm and where (official consumer authority, trade association).
</output_format>
