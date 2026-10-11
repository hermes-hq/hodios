---
schema: 1
id: write-request-for-information
kind: prompt
title: Write a request for information
description: Writes a request for information (RFI) to sound out suppliers before a tender, with background, the need in outline, focused questions, a response format, deadline and no-commitment terms.
category: business-writing
version: 1.0.0
status: incubating
stage: [discover]
role: [operations-manager, project-manager, manager, business-analyst]
requires: [none]
inputs: [notes, text]
output: [docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rfi, market-sounding, procurement, supplier-research, pre-tender]
pairs_with:
  prompts: [write-rfp, compare-vendors, write-sole-source-justification]
  personas: [procurement-specialist]
args:
  - name: need
    description: What you are looking to buy or solve, why, rough volumes or scale, timing, constraints, and what you do not know yet about the market.
    type: text
    required: true
  - name: organisation_and_process
    description: Who is issuing the RFI, how it will be sent (portal, email, published notice), the response deadline, and what may follow (tender, demos, nothing). Optional.
    type: text
output_contract:
  format: markdown
  sections: [RFI document, Why each question, Before issuing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A request for information (RFI) is used before a tender to learn what the market can offer, how it prices, what it needs from the buyer, and whether a tender is even the right route. It is not a mini-RFP: suppliers answer RFIs for free, so a long one gets few or poor replies. Procurement professionals keep RFIs short, describe the problem and outcomes rather than a fixed solution (so suppliers can suggest better approaches), ask questions whose answers will shape the later specification or budget, ask for indicative rather than binding prices, protect suppliers' confidential information, and state clearly that responding creates no obligation and gives no advantage in a later tender. Public bodies must also be careful that market engagement does not give one supplier an unfair advantage.
</context>

<task>
Write a request for information.

<need>
{{need}}
</need>
{{#organisation_and_process}}
<organisation_and_process>
{{organisation_and_process}}
</organisation_and_process>
{{/organisation_and_process}}

1. If the need is too vague to describe to a supplier (no idea what is being bought or solved), ask up to two short questions and stop.
2. Introduction: who is issuing the RFI, its purpose (market research only), and what may follow.
3. Background and need: the problem, desired outcomes, scale and timing, written in terms of outcomes rather than a specific product.
4. Questions: 8 to 15 focused questions grouped under company and experience, solution approach, implementation and support, commercial model and indicative pricing, and risks or dependencies (what the supplier would need from the buyer). Each question must have a clear purpose for later decisions.
5. Response instructions: format, maximum length, deadline (as given or `[NEEDED: deadline]`), how to send, and a contact for questions, with a note that answers to questions may be shared with all respondents anonymously.
6. Terms: no commitment to buy or to tender, no payment for responses, indicative pricing is non-binding, handling of confidential information, and that responding gives no advantage in any later process.
7. Explain separately why each question is asked, so the buyer can cut questions that do not drive a decision.
</task>

<constraints>
- Use only facts given; never invent volumes, budgets, dates or organisation details.
- Keep the RFI document to about two pages; suppliers answer free of charge.
- Do not ask for binding prices, full proposals or detailed solution designs.
- Do not name or favour a particular supplier or product in the need.
- Keep the terms section plain and short; note that the legal or procurement team should confirm it.
</constraints>

<output_format>
## RFI document
Title and reference placeholder; Introduction; Background and need; Questions (numbered, grouped); Response instructions; Terms.
## Why each question
Table: Question number · What the answer will decide.
## Before issuing
Up to four checks, such as getting legal sign-off on terms and choosing which suppliers to send it to.
</output_format>
