---
schema: 1
id: check-contract-insurance-requirements
kind: prompt
title: Check a contract's insurance requirements
description: Checks the insurance clause in a client, venue or landlord contract against the policies you hold - types, limits, named insured, waivers, certificates - and lists what to change, buy or negotiate.
category: insurance
version: 1.0.0
status: incubating
stage: [review]
role: [founder, consultant, individual]
requires: [none]
inputs: [document, text]
output: [table, report, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [insurance-clause, certificate-of-insurance, additional-insured, waiver-of-subrogation, professional-indemnity]
pairs_with:
  prompts: [map-small-business-insurance-needs, review-freelance-contract, explain-contract-clause]
args:
  - name: clause
    description: The insurance clause from the contract, plus any indemnity or liability cap clause it refers to, with clause numbers.
    type: text
    required: true
  - name: cover
    description: The policies you hold - type, insurer, limit per claim and in the aggregate, excess, territory, renewal date, and the schedule or certificate wording if you have it.
    type: text
    required: true
  - name: work
    description: What you will be doing under the contract and for how long, and roughly what it is worth.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Requirement by requirement, Gaps, Options for each gap, Message to the other party, Questions for your broker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clients, venues, landlords and platforms increasingly paste a standard insurance clause into contracts, often written for much larger suppliers. Typical demands: specific policy types (public or general liability, professional indemnity or errors and omissions, employer's liability or workers' compensation, product liability, cyber, motor), minimum limits "each and every claim" rather than in the aggregate, being named as an additional insured, a waiver of subrogation, primary and non-contributory wording, notice before cancellation, keeping cover for years after the work ends (common for professional indemnity, which usually responds to claims made while the policy is in force), and a certificate of insurance before starting. Signing a clause you do not meet can be a breach in itself, and some of these demands need the insurer's agreement or an extra premium. Often the cheapest fix is negotiation: limits scaled to the contract value, aggregate limits accepted, or removal of cover types irrelevant to the work.
{{#work}}

<work>
{{work}}
</work>
{{/work}}

<cover>
{{cover}}
</cover>
</context>

<task>
<clause>
{{clause}}
</clause>

1. Requirement by requirement: list each demand in the clause (type, limit, basis, named or additional insured, waiver, primary wording, run-off period, territory, certificate, notice), quoting the words.
2. Compare each with the cover held: meets, does not meet, or unclear from the documents.
3. Gaps: what is missing and why it matters for this work, including where the contract's indemnity goes further than any insurance would respond to.
4. Options for each gap: ask the broker or insurer to endorse the policy, buy additional cover, or negotiate the requirement (with a reasonable alternative ask and why it is reasonable for the contract size and work).
5. Message to the other party: a short, professional note proposing the changes.
6. Questions for your broker or insurer, specific to the gaps.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say a policy meets a requirement unless the supplied wording shows it; mark "unclear, confirm with your insurer".
- Do not invent premiums or what an insurer will agree to.
- Do not advise signing a clause the person does not meet; set out the options.
- Note that a certificate of insurance usually summarises cover and does not change the policy terms.
- Recommend a broker for endorsements and a lawyer if the indemnity clause is broad or the contract is high value.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Which requirements are met, the main gaps, and the quickest route to closing them.

## Requirement by requirement
Table: requirement (clause, quote) | your cover | meets? | note.

## Gaps
Bullets.

## Options for each gap
Table: gap | endorse / buy / negotiate | suggested ask.

## Message to the other party
The message, ready to adapt.

## Questions for your broker
Numbered.
</output_format>
