---
schema: 1
id: review-life-policy-beneficiaries
kind: prompt
title: Review who your life cover pays out to
description: Checks who each life policy, pension death benefit and death-in-service benefit would pay out to after a marriage, divorce, new child or death, and lists the forms and questions to put right.
category: insurance
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [beneficiary-designation, death-in-service, policy-in-trust, expression-of-wish, estate-planning]
pairs_with:
  prompts: [calculate-life-cover-need, check-insurance-after-life-change, review-insurance-coverage]
args:
  - name: policies
    description: Each policy or benefit that pays on death (life policies, death-in-service, pension death benefits, mortgage cover) with who it names (relationship only), whether it is in trust, and when last updated. Say "don't know" where unsure.
    type: text
    required: true
  - name: situation
    description: Your household now and what changed - marriage, separation, divorce, new partner, children or stepchildren, a beneficiary who died or is under 18 or needs care - and who you want to provide for.
    type: text
    required: true
  - name: country
    description: Country you live in. Whether divorce cancels a nomination, how trusts work and tax on payouts vary a lot.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Who each policy pays now, Mismatches, What to update, Questions for each provider, When to see a professional]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A will often does not control who receives life insurance or pension death benefits. Many policies pay a named beneficiary directly; policies written in trust are paid to the trustees for the trust's beneficiaries; workplace death-in-service and many pension schemes are paid at the trustees' discretion, guided by an "expression of wish" form that is easy to forget; and a policy with no valid nomination may be paid into the estate, where it can be slower and exposed to debts and tax. Common mismatches after life changes: an ex-partner still named years after a divorce (in some places divorce revokes the nomination automatically, in others it does not), a new partner or new child not named, a beneficiary who has died, a child under 18 named directly with no trust or guardian arrangement, or a disabled beneficiary whose means-tested support could be affected by a lump sum. Joint policies, policies assigned to a lender, and policies owned by someone other than the life insured behave differently again.
{{#country}}

Country: {{country}}
{{/country}}

<situation>
{{situation}}
</situation>
</context>

<task>
<policies>
{{policies}}
</policies>

1. Who each policy pays now: for each, the payout route (named beneficiary, trust, trustee discretion with expression of wish, estate, lender) and the current recipient as described, with "unknown" where the person does not know.
2. Mismatches: compare each with who the person wants to provide for now, flagging ex-partners, missing children, deceased beneficiaries, minors named directly, and vulnerable beneficiaries.
3. What to update: per policy, the action (new nomination form, new expression of wish, trust deed or change of trustees, confirm the lender's interest), who to contact, and the order to do them in, most urgent first.
4. Questions for each provider, including how to get confirmation of the current nomination in writing.
5. When to see a professional: trusts, minors, vulnerable beneficiaries, blended families, large sums, tax, or a contested situation.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the law in the person's country does on divorce, intestacy or tax; describe the common variations and say what to check.
- Do not draft trust deeds or legal documents; point to the provider's forms and to a lawyer.
- Do not decide who should benefit; work from the person's stated wishes and flag conflicts (for example a court order or separation agreement that requires a policy to stay in place for an ex-partner or children).
- Do not record names or personal details; refer to people by relationship.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The mismatches that matter most and the first update to make.

## Who each policy pays now
Table: policy | payout route | current recipient | last updated.

## Mismatches
Bullets.

## What to update
Numbered, most urgent first: policy - action - who to contact.

## Questions for each provider
Grouped by policy.

## When to see a professional
Bullets tied to this situation.
</output_format>
