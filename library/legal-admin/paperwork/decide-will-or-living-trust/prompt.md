---
schema: 1
id: decide-will-or-living-trust
kind: prompt
title: Decide between a will and a living trust
description: Compares a will with a living trust for a person's assets and family on probate, cost, privacy, incapacity and upkeep, and lists the questions to take to an estate lawyer.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [estate-planning, living-trust, probate, beneficiary-designations, wills]
pairs_with:
  prompts: [prepare-will-questions, prepare-power-of-attorney-questions, apply-for-probate]
args:
  - name: assets
    description: What you own in broad terms and roughly what each is worth - home (and in which state or country), other property, bank and investment accounts, retirement accounts, life insurance, a business - and which already have named beneficiaries or joint owners.
    type: text
    required: true
  - name: family
    description: Marital status, children and their ages, stepchildren, anyone with special needs, anyone you want to protect or exclude, and any wishes about how and when people inherit.
    type: text
    required: true
  - name: location
    description: Country and state or province where you live, and anywhere else you own property. Probate cost and trust practice vary hugely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How your assets would pass today, Will versus living trust for you, What tips the decision, Questions for an estate lawyer, What to gather]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone think through whether a will alone or a revocable living trust fits their situation. Facts people miss: many assets never pass under a will or a trust at all, because retirement accounts, life insurance and payable-on-death accounts go to named beneficiaries and jointly owned property goes to the survivor, so outdated beneficiary forms often matter more than either document. A living trust mainly helps by avoiding or reducing probate for assets retitled into it, keeping the estate private, managing assets if the person becomes incapacitated, and avoiding separate probate in each state or country where real property sits. It costs more to set up, works only for assets actually moved into it (an unfunded trust achieves little), and still needs a "pour-over" will and, for parents, a will to name guardians for minor children. A will is cheaper and simpler but usually goes through probate, which is slow and costly in some places and fairly simple in others. Trusts are common estate tools in some legal systems (much of the US) and less used or treated differently in others, including civil law countries with forced heirship rules that limit who can be left out. Neither document by itself avoids estate or inheritance tax.

Location: {{location}}

<assets>
{{assets}}
</assets>

<family>
{{family}}
</family>
</context>

<task>
1. Map how each asset would likely pass today: by beneficiary designation, joint ownership, under a will, or by intestacy rules if there is no will. Flag designations that look missing or outdated.
2. Compare a will alone with a revocable living trust plus pour-over will for this person in a table: probate exposure, set-up and ongoing cost (as ranges to check, not quotes), privacy, incapacity planning, property in more than one place, control over when children inherit, upkeep (retitling assets), and how common and recognised trusts are in {{location}} ("[to verify]").
3. Explain what tips the decision for this person in plain language: for example property in two states, a blended family, a beneficiary with special needs, minor children, a desire for privacy, or a small simple estate where a will is enough. Do not choose for them; say which factors point which way.
4. Note what each option does not do: neither avoids estate or inheritance tax on its own; a trust still needs a will for guardianship; forced heirship or spousal rights may limit choices.
5. List questions to take to an estate lawyer or notary.
6. List what to gather before the meeting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person which document to sign; the decision needs a local estate lawyer or notary.
- Do not quote probate fees, tax thresholds or legal rules as fact; mark them "[to verify]".
- Do not offer to draft a will or trust deed; this entry compares options only.
- If the person mentions doubts about their own capacity, pressure from a relative, or a terminal diagnosis with little time, recommend seeing a lawyer urgently.
{{> output/uncertainty}}
</constraints>

<output_format>
## How your assets would pass today
Table: Asset | Passes by | Note.

## Will versus living trust for you
Table: Factor | Will only | Living trust plus pour-over will.

## What tips the decision
Bullets.

## Questions for an estate lawyer
Numbered list.

## What to gather
Checklist.
</output_format>
