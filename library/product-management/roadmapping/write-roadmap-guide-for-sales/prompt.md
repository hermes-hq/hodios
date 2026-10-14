---
schema: 1
id: write-roadmap-guide-for-sales
kind: prompt
title: Write a roadmap guide for sales
description: Writes a guide telling sales and account teams what they may say about the roadmap - item by item certainty, approved phrasing, what never to promise, and how to request a commitment.
category: roadmapping
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [product-manager, sales-rep, founder, marketer]
requires: [none]
inputs: [document, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sales-guidance, safe-phrasing, commitment-process, roadmap-communication, deal-support, overpromising]
pairs_with:
  prompts: [audit-customer-commitments, write-public-roadmap, answer-customer-roadmap-question, set-up-roadmap-cadence]
args:
  - name: roadmap
    description: The internal roadmap with each item's status and confidence, and anything confidential (unannounced products, partners, pricing).
    type: text
    required: true
  - name: sales_context
    description: How sales currently talks about the roadmap, recent overpromises, common customer questions and who can approve a written commitment.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How to talk about the roadmap, Item guide, Never say, Phrases that work, Requesting a commitment, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the page sales and account managers open before a call where the roadmap will come up. Overpromising rarely comes from bad intent: a rep hears "planned for H2" in an internal meeting, repeats "coming in H2", the customer writes it into a renewal note, and product now owns a commitment it never made. The guide works when each item has a sales-safe status in plain words, ready phrases that are honest without killing the deal, a short list of things never to say, and a fast, known route to get a real commitment approved when a deal genuinely needs one.
</context>

<task>
<roadmap>
{{roadmap}}
</roadmap>

<sales_context>
{{sales_context}}
</sales_context>

1. How to talk about the roadmap: five or six rules, such as lead with the customer's need, share direction not dates, never put roadmap items in writing without approval, and log every request.
2. Item guide: for each roadmap item that sales may mention, a sales-safe status (available, in beta, in build with range, planned, exploring), what can be said, what cannot, and a one-line customer-friendly description. Leave confidential items out and list them only as "do not mention" by internal codename if one was given.
3. Never say: specific forbidden phrasings and why (exact dates for unbuilt items, "guaranteed", naming other customers, unannounced pricing).
4. Phrases that work: answers to the common questions given, for each certainty level.
5. Requesting a commitment: who approves, what information the request needs (account, revenue, need, deadline, what happens without it), the expected turnaround, and how approved commitments are written.
</task>

<constraints>
- Copy each item's certainty from the roadmap; never raise it. If an item's status is unclear, mark it "check with product" rather than guessing.
- Do not include confidential details in the guide body.
- Contract wording about future features belongs to the approval route; do not draft contract clauses.
- If the roadmap lacks statuses or confidence, ask for them and stop.
</constraints>

<output_format>
## How to talk about the roadmap
Numbered rules.

## Item guide
Table: item | sales-safe status | you can say | do not say.

## Never say
Bullets with the reason.

## Phrases that work
Question and answer pairs grouped by certainty level.

## Requesting a commitment
Approver, required information, turnaround, how it is recorded.

## Questions
What product must confirm before publishing.
</output_format>
