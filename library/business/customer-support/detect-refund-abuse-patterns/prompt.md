---
schema: 1
id: detect-refund-abuse-patterns
kind: prompt
title: Detect refund and return abuse
description: Reviews refund and return records for serial abuse such as wardrobing or false not-received claims, separates signals from proof, and drafts fair rules and a non-accusing reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate, review]
role: [operations-manager, founder, support-agent, data-analyst]
requires: [none]
subject: [ecommerce, retail]
inputs: [dataset, notes]
output: [report, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [refund-abuse, return-fraud, wardrobing, item-not-received, loss-prevention]
pairs_with:
  prompts: [screen-orders-for-fraud, decide-goodwill-refund, design-returns-process, respond-to-chargeback-as-merchant]
args:
  - name: records
    description: Refund, return and claim records - customer id (pseudonymised is fine), order dates and values, reason codes, outcome, delivery proof, return condition notes. A table or CSV excerpt.
    type: text
    required: true
  - name: policy
    description: Your current returns and refund policy, and any limits or blocklists already in place.
    type: text
    required: true
  - name: context
    description: What prompted the review, your typical return rate by category, and your appetite for risk versus customer friction. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Patterns found, Accounts to review, Rules to consider, Reply to a flagged customer, Limits of this analysis]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an online or physical retailer spot refund and return abuse without punishing honest customers. Common patterns: wardrobing (buying to wear or use once, then returning), serial "item not received" claims on parcels with delivery proof, "arrived damaged" claims with no photos or the same photo reused, empty-box or swapped-item returns, bracketing taken to extremes (buying five sizes and returning four is normal; doing it every week with worn items is not), refund-then-chargeback double dipping, and many accounts sharing one address, device or payment card. Every one of these also happens honestly sometimes, so a single event proves nothing; patterns across orders, compared with the normal rate for the category, are what matter. High-return customers are often also high-value customers, so the response is usually a graded one (manual review, photo requirements, signature on delivery, store credit only) rather than a ban.
</context>

<task>
<records>
{{records}}
</records>

<policy>
{{policy}}
</policy>

{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Describe the data briefly: rows, date range, overall refund and return rate, and any fields missing that limit the analysis.
2. Look for patterns: per-customer claim frequency against the median, not-received claims on orders with delivery proof, damaged claims without evidence, returns flagged as worn or swapped, claim timing (always just inside the window), shared addresses, cards or devices across accounts, refunds followed by chargebacks. Show the counts.
3. List accounts or clusters that warrant human review, each with the specific signals, the money involved, and the innocent explanations that should be ruled out (a courier problem at one address, a faulty batch, a genuine fit problem with one brand).
4. Propose graded rules: what triggers manual review, when to require photos or return-before-refund, when to switch to store credit or signature delivery, and when (rarely) to decline future orders. Say how each rule could hurt honest customers and how to limit that.
5. Write a reply template for a flagged customer that states the new requirement for their next claim without accusing them of anything.
6. State the limits: what the data cannot show, and what to check before acting on any account.
</task>

<constraints>
- Treat every finding as a signal, not proof. Never label a named or identifiable person a fraudster.
- Use only the records given; do not invent rates or industry benchmarks. If you mention a typical range, say it is an assumption to check.
- Do not recommend sharing customer data with third parties or publishing blocklists; note that data protection and consumer rules differ by country and should be checked before changing refund rights.
- The customer reply contains no accusation, no threat and no reference to "fraud" or "abuse".
{{> output/uncertainty}}
</constraints>

<output_format>
## Patterns found
Bullets with counts and the rate compared with the dataset's normal rate.

## Accounts to review
Table: account or cluster | signals | value at stake | innocent explanations to rule out.

## Rules to consider
Table: trigger | action | effect on honest customers.

## Reply to a flagged customer
Ready-to-use template.

## Limits of this analysis
Bullets.
</output_format>
