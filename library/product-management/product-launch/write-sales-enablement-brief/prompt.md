---
schema: 1
id: write-sales-enablement-brief
kind: prompt
title: Write a sales enablement brief
description: Writes an internal enablement brief for sales and customer success - what shipped, who it is for, talk track, discovery questions, objection handling, what not to promise and an FAQ.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, marketer, sales-rep, founder]
requires: [none]
inputs: [text, spec]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [sales-enablement, talk-track, objection-handling, product-marketing]
pairs_with:
  prompts: [plan-product-launch, write-launch-announcement, write-case-study]
args:
  - name: feature
    description: What shipped, how it works, pricing and plan availability, limits, launch date, competitors' equivalents if known, and any proof (beta results, customer quotes).
    type: text
    required: true
  - name: target_customers
    description: Ideal customers and buyer roles for this feature, and the situations that signal a fit. Optional; without it, the brief proposes them from the feature.
    type: string
output_contract:
  format: markdown
  sections: [In one line, Who it is for, Why it matters, Talk track, Discovery questions, Objections, What not to say, Availability and pricing, FAQ, Resources]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketing manager writing enablement for sales and customer success. Reps read enablement minutes before a call, so the brief must be scannable and give them words they can say. The two biggest risks are reps not knowing who the feature is for, so they pitch it to everyone, and reps over-promising (roadmap items, unsupported plans, unproven results), which creates churn and support escalations later.

{{#target_customers}}Target customers: {{target_customers}}{{/target_customers}}
</context>

<task>
Feature:

<feature>
{{feature}}
</feature>

1. Write what shipped in one sentence a rep could say out loud.
2. Define who it is for: the ideal customer, the buyer and user roles, the trigger situations that signal a fit, and who it is not for.
3. Explain why it matters: the customer problem, the before-and-after, and the business value, using only proof in the feature notes.
4. Write a 30-second talk track and a two-minute version, in natural spoken language.
5. Give four to six discovery questions that reveal whether the customer has the problem.
6. Handle likely objections (price, "we already use X", timing, security or compliance, effort to adopt): objection, response, and proof or next step.
7. List what not to say or promise: unreleased capabilities, plans or regions where it is not available, performance claims without proof, and comparisons the company cannot support.
8. Summarise availability, pricing and packaging, and how to enable it for a customer.
9. Write an FAQ with six to ten questions reps and customers will ask, and the resources to link (placeholders).
</task>

<constraints>
- Use only facts in the feature notes. Missing facts become [CONFIRM: what] in the brief, never guesses, especially for pricing, availability and competitor claims.
- Competitive positioning only from information given; if none is given, write how to handle "how is this different from X" without naming specific competitor weaknesses.
- Scannable: short bullets, bold lead words, no paragraph longer than three lines.
- Internal only: mark it as not for forwarding to customers.
</constraints>

<output_format>
A heading "Internal - not for customers", then these H2 sections in order: In one line, Who it is for, Why it matters, Talk track, Discovery questions, Objections (as a table: objection | response | proof or next step), What not to say, Availability and pricing, FAQ, Resources.
</output_format>
