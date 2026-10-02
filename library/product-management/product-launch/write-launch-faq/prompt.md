---
schema: 1
id: write-launch-faq
kind: prompt
title: Write a launch FAQ
description: Writes internal and external launch FAQs covering pricing, availability, migration, limitations and tough questions, with an owner and deadline for every unknown. Use before launch day.
category: product-launch
version: 1.0.0
status: incubating
stage: [build, ship]
role: [product-manager, marketer, support-agent, sales-rep]
requires: [none]
inputs: [text, spec, notes]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [launch-faq, launch-readiness, objection-handling, internal-enablement]
pairs_with:
  prompts: [plan-product-launch, write-sales-enablement-brief, write-launch-announcement, write-prfaq]
  personas: [product-marketing-manager]
  workflows: [product-launch-track]
args:
  - name: launch
    description: What is launching - what it does, who it is for, pricing and plan availability, regions, dates, migration or changes for existing customers, and links or notes from the spec.
    type: text
    required: true
  - name: known_limitations
    description: Known gaps, bugs, unsupported cases, roadmap items deliberately left out, and sensitive topics (security, data, competitors). Optional.
    type: text
output_contract:
  format: markdown
  sections: [External FAQ, Internal FAQ, Unknowns and owners, Consistency check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager preparing a launch with marketing, sales and support. Launch FAQs exist so that everyone gives the same accurate answer on day one. They fail when they only cover the easy questions, when answers differ between the public page and what sales says, when limitations are hidden until a customer finds them, and when unknowns are left blank without anyone owning them. The external FAQ is for customers and prospects; the internal FAQ is for the people who will be asked hard questions and need honest, approved answers.
{{#known_limitations}}

Known limitations and sensitive topics:

<known_limitations>
{{known_limitations}}
</known_limitations>
{{/known_limitations}}
</context>

<task>
Launch:

<launch>
{{launch}}
</launch>

1. Write the external FAQ, 8-15 questions customers and prospects will really ask, grouped under: What it is; Who can get it and what it costs (plans, regions, trials, limits); Getting started; Existing customers and migration (what changes for them, whether anything is removed or moves to another plan, what they need to do and by when); Limitations (what it does not do yet, said plainly); Security, privacy and data (only what the input supports); Help and support. Answer in plain customer language, two to four sentences each.
2. Write the internal FAQ, 8-15 questions for sales, support, success and leadership, including the uncomfortable ones: Why now and why not the thing customers asked for instead? How does this compare with named competitors (facts only, from the input)? What do we say about the limitations? Will the price change for existing customers? What happens if a customer asks for a discount or an exception? What if it breaks on launch day: how do we escalate and what do we tell customers? What are we not allowed to promise? Who owns questions after launch?
3. Wherever the input does not give the answer, write [TBD] in the answer and add the question to the unknowns table with why it matters, a suggested owner by role (for example pricing to the product or revenue lead, security to the security lead, legal terms to legal), and a deadline relative to launch day (L).
4. Check consistency: answers about price, availability, dates and limits match across the two FAQs and the input; flag any contradiction in the input itself.
</task>

<constraints>
- Never invent facts: prices, dates, regions, certifications, integrations, performance numbers or competitor details. Use [TBD] and route it to an owner.
- Be honest about limitations in the external FAQ; do not bury them or spin them into benefits.
- No internal jargon, code names or roadmap promises in the external FAQ. The internal FAQ may mention plans only as "not committed" unless the input commits to them.
- Competitor comparisons in either FAQ must be factual, current and sourced from the input; recommend a legal check for any public comparative claim.
</constraints>

<output_format>
## External FAQ
Grouped headings; bold questions with plain answers.

## Internal FAQ
Bold questions with answers; mark answers that need approval before use with [APPROVAL NEEDED].

## Unknowns and owners
Table: question | why it matters | suggested owner | due (relative to L).

## Consistency check
Bullets: contradictions found, or "No contradictions found".
</output_format>
