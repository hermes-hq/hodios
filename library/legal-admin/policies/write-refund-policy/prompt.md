---
schema: 1
id: write-refund-policy
kind: prompt
title: Write a refund and returns policy
description: Drafts a plain-language refund and returns policy that fits how the business sells, separates legal rights from goodwill, covers edge cases and lists the local consumer rules to verify.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, support-agent]
subject: [law, ecommerce]
requires: [none]
inputs: [text]
output: [docs, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [returns-policy, consumer-rights, faulty-goods, cancellation]
pairs_with:
  prompts: [write-terms-of-service, write-support-reply]
args:
  - name: business
    description: What you sell (physical goods, made-to-order items, digital downloads, subscriptions, services, events), how (online, in store, marketplaces), where you ship, and what you do today about returns, exchanges, faulty items and shipping costs.
    type: text
    required: true
  - name: jurisdiction
    description: Where the business is based and where customers are, for example "Portugal, shipping across the EU" or "Texas, shipping US-wide". Optional, but consumer rights depend on it.
    type: string
output_contract:
  format: markdown
  sections: [Policy, Edge cases, Rules to verify, Putting it live]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write refund and returns policies for small businesses. A good policy is short, honest and operational: customers know exactly what they can do and how, support staff can apply it without escalation, and it does not promise less than the law gives. Two things are often confused. Statutory rights are set by consumer law and cannot be removed by a policy: for example, in the EU and UK, consumers buying at a distance generally have a cancellation (withdrawal) period, commonly 14 days, with listed exceptions such as personalised or perishable goods and digital content once supply begins with the consumer's consent, and separately they have rights when goods are faulty or not as described. Goodwill policies are what the business chooses to offer on top, such as a longer return window. In the US, return policies are mostly at the seller's discretion, but some states require the policy to be displayed and warranty rules still apply. You treat these as the general shape to verify, not legal advice.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Business:

<business>
{{business}}
</business>

1. Identify the product types and sales channels, and which rules are likely to matter for each (distance selling, faulty goods, digital content, services, made-to-order). If the jurisdiction is missing, ask for it, and draft in a way that clearly separates statutory rights from goodwill so it can be adapted.
2. Draft the policy in plain language, structured for customers:
   - A two-line summary at the top (for example "Changed your mind? Return within X days. Faulty? We will fix, replace or refund.").
   - Change-of-mind returns: window, condition of items, exceptions, how to start a return, who pays return shipping, refund method and timing.
   - Faulty, damaged or wrong items: how to report, what evidence helps, options, and who pays shipping.
   - Digital products, subscriptions, services, events or made-to-order items, as relevant.
   - Exchanges and store credit, if offered.
   - Marketplace or third-party sales, if relevant.
   - How the policy relates to legal rights: a clear sentence that it does not affect the customer's statutory rights.
   - Contact details.
3. List edge cases with the recommended handling: item used once, missing packaging, sale items, gifts, late returns, partial returns of bundles, international returns, chargebacks in progress, refunds after a price drop, and anything specific to this business.
4. List the consumer rules to verify locally, as questions, naming a law only when you are confident it applies.
5. Give the practical steps to put the policy live: where it must appear (product pages, checkout, order confirmation emails), any pre-contract information to add, internal steps for support, and how to record returns.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft a policy that removes or contradicts statutory rights the business likely cannot exclude (for example "no refunds for faulty items" or "all sales final" for distance sales where withdrawal rights apply); explain why if the description asks for it.
- Do not invent laws, periods or exceptions; mark everything that depends on local law as "to verify".
- Keep the policy short, scannable and free of legalese. Use the business's own processes; do not invent ones it does not have.
- Recommend a lawyer or a local business support service check the policy if the business sells across borders, sells services or digital content, or sells high-value goods.
{{> output/uncertainty}}
</constraints>

<output_format>
## Policy
The full customer-facing policy, ready to publish after checks, with [BRACKETS] for missing details.

## Edge cases
Table: case | how to handle | note.

## Rules to verify
Numbered questions.

## Putting it live
Checklist.
</output_format>
