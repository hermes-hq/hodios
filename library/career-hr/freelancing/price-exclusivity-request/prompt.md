---
schema: 1
id: price-exclusivity-request
kind: prompt
title: Price a client's exclusivity request
description: Helps a freelancer answer a client who wants them not to work for competitors - narrows what is restricted and for how long, prices the work they would give up, and drafts a counter-proposal.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, designer, copywriter, marketer]
advice_risk: [legal]
requires: [none]
inputs: [message, text]
output: [report, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [exclusivity, non-compete, retainer-terms, niche-clients, client-negotiation]
pairs_with:
  prompts: [pitch-retainer-to-client, review-freelance-contract, price-services, negotiate-client-payment-terms]
  personas: [freelance-business-advisor]
args:
  - name: request
    description: The exclusivity or non-compete wording or request, pasted in full, and the work and fee it comes with.
    type: text
    required: true
  - name: business
    description: Your niche, what share of your income and pipeline comes from this client's competitors or sector, how long you expect to work with this client, and your country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is being asked, What it would cost you, Counter-proposal, Reply, Check with a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer respond to a client who wants exclusivity. What experienced freelancers know: the client's underlying worry is usually confidentiality (their plans reaching a rival) or attention (being deprioritised), and both can often be met with a confidentiality clause and a capacity commitment instead of a broad ban. When some exclusivity is reasonable, its price depends on its breadth: who counts as a competitor (a named list beats "anyone in the industry"), which services, which regions, and how long it lasts, especially after the engagement ends. A specialist freelancer whose niche is the client's industry can lose most of their market, so exclusivity should be paid for, typically by a guaranteed minimum fee for its duration. Restraint clauses on independent contractors are treated very differently across countries, and some may also point toward employment status.

<request>
{{request}}
</request>

<business>
{{business}}
</business>
</context>

<task>
1. Say once that enforceability and employment-status questions need a local lawyer.
2. What is being asked: break the request into who, what services, where, how long during and after the work, and what is undefined. Name the likely underlying worry.
3. What it would cost you: income and pipeline at risk from the restricted market, from the freelancer's numbers, and the opportunity cost after the engagement ends. Mark gaps.
4. Counter-proposal: the narrowest version that meets the client's worry (confidentiality only; a named competitor list; same services only; during the engagement only), and a paid version with a guaranteed minimum monthly fee sized against the income at risk. Show the calculation.
5. Reply: short and cooperative; acknowledges the concern, proposes the narrow version first and the paid option second.
6. Check with a lawyer: the points to review before signing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a restraint is or is not enforceable; flag it for local legal review.
- Do not invent a market premium for exclusivity; base any price on the freelancer's own numbers.
- Do not advise signing broad post-engagement restrictions without a guaranteed fee and legal review.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is being asked
Table: Element | As written | Undefined?

## What it would cost you
Short calculation.

## Counter-proposal
Narrow option and paid option.

## Reply
Ready to send.

## Check with a lawyer
Numbered.
</output_format>
