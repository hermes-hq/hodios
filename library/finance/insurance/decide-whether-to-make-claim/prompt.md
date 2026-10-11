---
schema: 1
id: decide-whether-to-make-claim
kind: prompt
title: Decide whether to make an insurance claim
description: Works out whether a loss is worth claiming for by weighing the payout after excess against higher future premiums, lost no-claims discount and claims records, and flags what must be reported anyway.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [small-claims-decision, no-claims-discount, claims-history, excess, renewal-premium]
pairs_with:
  prompts: [choose-insurance-deductible, explain-insurance-policy]
  workflows: [insurance-claim-track]
args:
  - name: loss
    description: What happened, the estimated repair or replacement cost, whether anyone else was involved or injured, and whether another party could be to blame.
    type: text
    required: true
  - name: policy
    description: "Type of policy, excess, current premium, no-claims discount (years and whether protected), and anything the policy says about reporting incidents."
    type: text
    required: true
  - name: country
    description: Country, because reporting duties and how claims are recorded differ.
    type: string
output_contract:
  format: markdown
  sections: [Summary, What you must report regardless, Payout versus future cost, Things that change the answer, Questions to ask first, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Claiming for a small loss can cost more than it pays. The payout is the loss minus the excess, but a claim can raise premiums for several years, reduce a no-claims discount (even "protected" discounts usually still lead to a higher premium), and stay on shared claims records that other insurers see. Some insurers record even an enquiry about a claim. On the other hand, some events must be reported whatever the person decides about claiming: car accidents involving another vehicle or person, any incident where someone else might claim against you, and anything the policy's conditions say must be notified within a time limit. Failing to report can void cover for a later claim from the other party. A not-at-fault claim where costs are recovered from the other side often has little or no effect on the no-claims discount, but that depends on recovery succeeding.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
<loss>
{{loss}}
</loss>

<policy>
{{policy}}
</policy>

1. What you must report regardless: from the facts and the policy, whether the incident must be notified even if no claim is made (third parties involved, possible liability, policy conditions), and the time limit if stated. Put this first.
2. Payout versus future cost: payout after excess; then an estimate of extra premium over the next few years if the no-claims discount drops or the premium rises, using the person's figures and clearly labelled assumptions for the size of the rise; compare the two with arithmetic.
3. Things that change the answer: whether the person is at fault or costs can be recovered, protected no-claims discount and what it does and does not protect, other claims in recent years, whether the damage could grow (water damage) or hide further damage, and whether paying privately is practical.
4. Questions to ask the insurer or broker first, phrased so they get information without unintentionally opening a claim (for example asking in general terms how a claim of this type affects the discount), and noting that some insurers log any contact.
5. Summarise the trade-off without deciding for the person.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest hiding an incident the policy or law requires to be reported, or describing it falsely.
- Do not invent premium increases; label any assumed rise and show how the answer changes if it is higher or lower.
- If anyone was injured, say to report it and seek appropriate help before any money question.
- Do not predict fault or liability with certainty.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two or three sentences: the trade-off and what must be reported anyway.

## What you must report regardless
Bullets.

## Payout versus future cost
Table: item | amount | arithmetic.

## Things that change the answer
Bullets.

## Questions to ask first
Numbered.

## Assumptions
Bullets.
</output_format>
