---
schema: 1
id: review-talent-agency-contract
kind: prompt
title: Review a talent agency or management contract
description: Reviews an agency or management contract for an actor, model, musician, author or presenter - commission, scope, exclusivity, term, money handling, post-term commission and exit.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [artist, writer, individual]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [talent-agency, artist-management, commission, sunset-clause, entertainment]
pairs_with:
  prompts: [review-creative-rights-contract, evaluate-creator-management-offer, explain-contract-clause]
  workflows: [contract-review-track]
args:
  - name: contract
    description: The agency or management agreement with clause numbers. Remove names and personal details.
    type: text
    required: true
  - name: career
    description: Your field, where your career is now, current income sources and existing deals, and what you expect the agent or manager to do.
    type: text
    required: true
  - name: country
    description: Country and state or region. Some places license talent agencies, cap fees or ban upfront charges; others do not.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Clause check, Money flow, Getting out, Red flags, Questions to ask, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agency and management contracts decide how much of a creative career's income the representative takes, for how long, and how hard it is to leave. What entertainment lawyers check first: the commission rate and what it is charged on (gross or net, including or excluding expenses, tour costs, merchandise, brand deals, existing deals and work the talent found themselves); the scope (all fields worldwide versus a defined field); exclusivity; the term and whether it rolls over automatically or depends on the representative hitting targets; key person clauses if the talent signed for one particular agent; who collects the money, how fast it is paid on, and accounting and audit rights; expenses the representative can recharge; post-term commission ("sunset") on deals made during the term, which can last for years and is often negotiated to step down over time; power of attorney to sign deals on the talent's behalf; and any upfront fees for photos, courses or website listings, which are a common sign of a scam and are restricted in some places. For young talent, parental consent and local rules on minors' earnings may apply.
{{#country}}

Country: {{country}}
{{/country}}

<career>
{{career}}
</career>
</context>

<task>
<contract>
{{contract}}
</contract>

1. In brief: the type of representative (agent who books work, manager who guides the career, or both), commission, term, exclusivity, and the biggest issue.
2. Clause check, quoting each clause: services promised, scope and territory, exclusivity, commission rate and base, existing deals, expenses, money collection and payment timing, accounting and audit, term and renewal, key person, power to sign on the talent's behalf, post-term commission, termination, disputes.
3. Money flow: a worked example on a sample booking or deal using the contract's own terms, showing what the talent receives and when. State the example figures as assumptions.
4. Getting out: how and when the talent can terminate, notice, performance-based exits, and what commission continues after.
5. Red flags: upfront fees, unlimited power to sign, no accounting, perpetual commission, commission on existing income, all-fields worldwide scope for an early-career talent.
6. Questions to ask the representative, and points to raise with an entertainment lawyer or a union or guild if the talent belongs to one.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where missing.
- Do not invent "standard" commission rates or licensing laws; say what to check locally and with a union or guild.
- Do not say whether a clause is enforceable.
- If upfront payment is requested before any work, say clearly that this is a common scam pattern and to verify the agency before paying anything.
- If the talent is a minor, flag parental involvement and local rules to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four bullets.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## Money flow
Worked example.

## Getting out
Bullets.

## Red flags
Bullets, or "None found".

## Questions to ask
Numbered.

## Get a lawyer if
Bullets.
</output_format>
