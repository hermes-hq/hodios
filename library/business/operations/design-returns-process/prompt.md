---
schema: 1
id: design-returns-process
kind: prompt
title: Design a returns and exchanges process
description: Designs a returns and exchanges process for a shop or online store - policy, step-by-step handling, grading and restocking, staff instructions, customer messages and a plan to cut the return rate.
category: operations
version: 1.0.0
status: incubating
stage: [design, operate]
role: [operations-manager, founder, support-agent]
subject: [ecommerce]
inputs: [notes, dataset, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [returns, exchanges, refunds, return-rate, restocking, reverse-logistics]
pairs_with:
  prompts: [write-refund-policy, plan-order-fulfilment, write-support-reply, build-service-recovery-playbook]
args:
  - name: business
    description: What you sell, where (shop, online or both), order volume, return rate if known, top return reasons, and how returns are handled now.
    type: text
    required: true
  - name: current_policy
    description: Your current returns policy text, or "none".
    type: text
output_contract:
  format: markdown
  sections: [Policy, Process map, Staff instructions, Grading and restock, Customer messages, Cutting the return rate, Measures, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design returns operations for small retailers. A returns process has two jobs that pull in opposite directions: make returning painless enough that customers buy with confidence, and keep the cost (postage, refunds, damaged stock, staff time, fraud) under control. The biggest saving is rarely a stricter policy; it is fixing the reasons people return: wrong size, item not as pictured, damage in transit, slow delivery. Consumer rights on returns and refunds differ by country and by sales channel (online sales often carry a statutory cancellation right; faulty goods have rights beyond any shop policy), so you separate what the law may require from what the business chooses to offer.
</context>

<task>
Design the returns process.

<business>
{{business}}
</business>
{{#current_policy}}
<current_policy>
{{current_policy}}
</current_policy>
{{/current_policy}}

1. Policy: propose a clear policy covering the return window, condition, proof of purchase, refund method and timing, exchanges, who pays return postage, exclusions (for example hygiene or personalised items) and faulty items. Mark every point that depends on local consumer law as `[CHECK LOCAL LAW: …]`. If a current policy is given, review it first: what is unclear, what may conflict with statutory rights, what is costing money.
2. Process map: from the customer's request to the refund or exchange, for each channel (in store, online), with the decision points: in window, condition, faulty or change of mind, refund or exchange or store credit.
3. Staff instructions: a short script and checklist for the counter or inbox, including how to say no politely and when to escalate (suspected fraud, abusive customer, high value).
4. Grading and restock: grades for returned items (resell as new, resell as seconds, repair, write off), who decides, and recording the reason code.
5. Customer messages: return request received with instructions, item received, refund issued, exchange shipped, return declined with reason and options.
6. Cutting the return rate: from the reason codes, the fixes per reason (size guides, better photos and descriptions, packaging, delivery promises), ordered by expected effect and effort.
7. Measures: return rate by product and reason, time to refund, cost per return, resale recovery.
</task>

<constraints>
- Never tell the business it can refuse returns or refunds the law may require; flag those points for checking.
- Do not invent return rates or reasons. If none are given, define the reason codes to start collecting and explain how they feed step 6.
- Messages are short, friendly and specific: what the customer does next and when they get their money.
- Keep the process runnable by the current team; say which steps a returns tool could automate without naming a product as the answer.
</constraints>

<output_format>
## Policy
Customer-facing text, then a list of `[CHECK LOCAL LAW]` points. If reviewing, a table first: Issue | Why it matters | Fix.
## Process map
Numbered steps per channel with decision points.
## Staff instructions
## Grading and restock
Table: Grade | Condition | Action | Recorded as.
## Customer messages
Five messages, each under 90 words.
## Cutting the return rate
Table: Reason | Fix | Effort | Expected effect.
## Measures
## Questions
At most four.
</output_format>
