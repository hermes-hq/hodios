---
schema: 1
id: map-buying-committee
kind: prompt
title: Map a B2B buying committee
description: Maps everyone in a business customer's buying decision, from users and champion to economic buyer, IT, procurement and blockers, with each one's goal, objection and discovery questions.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, marketer]
requires: [none]
inputs: [text, notes]
output: [table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [b2b, buying-committee, stakeholder-map, economic-buyer, champion, procurement]
pairs_with:
  prompts: [write-customer-interview-guide, interview-non-customers, write-research-screener]
args:
  - name: product_and_customer_type
    description: What you sell, the price range, and the kind of organisation that buys it (size, sector, the team that uses it).
    type: text
    required: true
  - name: what_you_know_about_deals
    description: What you know from won and lost deals, sales notes, support tickets or onboarding - who was involved, who signed, what stalled. Rough notes are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Committee map, Where they disagree, Discovery questions by role, Gaps in what you know, Product implications]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B product manager who has sat in on many sales cycles. In business buying, the person who uses the product, the person who champions it, the person who pays, and the people who can block it (IT, security, legal, procurement, finance, a works council or union) all judge it on different terms. Product teams that only talk to users build delightful tools that never pass security review or never show the return the budget holder needs; teams driven by sales feedback build for the buyer who never logs in. Discovery has to cover each role with questions about their own job.
</context>

<task>
Product and customer type:

<product_and_customer_type>
{{product_and_customer_type}}
</product_and_customer_type>

What we know about deals:

<what_you_know_about_deals>
{{what_you_know_about_deals}}
</what_you_know_about_deals>

1. List the roles likely in the decision for this product and price: end users, team lead or manager of users, champion, economic buyer (owns the budget), technical evaluator (IT, data, integration), security and data protection, legal, procurement, finance, and any blockers or influencers (an incumbent vendor's internal owner, a union or works council for tools that monitor staff). Drop roles that do not apply at this price and size, and say why.
2. For each role: the job title it usually maps to, their problem or goal in their own terms, how they measure success, their likely objection or risk, what they need to see to say yes, and how much influence they have (decides, can veto, influences, uses).
3. Mark each role as "seen in deals" (from the notes) or "assumed" (typical for this kind of sale).
4. Where they disagree: the main tensions (for example users want flexibility, IT wants control; buyer wants a fast return, users want less effort).
5. Discovery questions per role: three or four questions about their own past experience (the last purchase like this, the last time a tool was rejected and why, how they justified the budget), not about your product.
6. Product implications: features, evidence or materials that each blocking role needs (admin controls, single sign-on, audit logs, a return-on-investment case, a data processing agreement), labelled as questions to test, not requirements.
</task>

<constraints>
- Clearly separate what the deal notes show from typical patterns you are assuming.
- Do not invent named people, companies or deal figures.
- Discovery questions are about the person's past behaviour and decisions, never a pitch.
- If the product or customer type is too vague to know who buys it, ask up to three questions and stop.
</constraints>

<output_format>
## Committee map
Table: role | usual title | goal | success measure | likely objection | needs to see | influence | seen or assumed.

## Where they disagree
Bullets naming the roles in each tension.

## Discovery questions by role
Per role, three or four numbered questions.

## Gaps in what you know
Bullets: roles never spoken to, stages of the deal you cannot see.

## Product implications
Table: role | what they need | hypothesis to test | how to test it.
</output_format>
