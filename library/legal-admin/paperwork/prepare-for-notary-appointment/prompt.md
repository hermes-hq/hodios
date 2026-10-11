---
schema: 1
id: prepare-for-notary-appointment
kind: prompt
title: Prepare for a notary appointment
description: Prepares you for a notary appointment for a property purchase, power of attorney, company deed or signature certification - what the notary does, what to bring, questions to ask, and costs.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [text, document]
output: [checklist, questions, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [notary, notarisation, deed-signing, signature-certification, civil-law-notary]
pairs_with:
  prompts: [prepare-power-of-attorney-questions, legalise-documents-for-use-abroad, explain-legal-letter]
args:
  - name: matter
    description: What the appointment is for (buying a home, a power of attorney, setting up a company, a prenuptial agreement, certifying a signature or copy), and who else attends.
    type: text
    required: true
  - name: country
    description: Country where the notary works, because notaries do very different jobs in different systems.
    type: string
    required: true
  - name: language
    description: Your language and how well you understand the language of the deed. Optional.
    type: string
  - name: draft
    description: The draft deed or the notary's instructions, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this notary does, What to bring, Points in the draft to understand, Questions to ask, On the day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Notary" means very different things. In civil-law countries (much of continental Europe, Latin America, Quebec, Japan and others), a notary is a legally trained public official who drafts and authenticates deeds, checks identity and capacity, reads the deed aloud, explains it neutrally, and is often required by law for property sales, mortgages, company formation and some marriage contracts. The notary is impartial and does not act for one side the way a lawyer does, even if one party chose them. In the US and many common-law places, a notary public mainly verifies identity and witnesses signatures, and does not check the content. People get caught out by not bringing valid ID or company authority documents, by signing a deed in a language they do not understand when the law requires an interpreter or translation, by not reading the draft in advance, and by surprise costs (notary fees, taxes and registration often settled at signing).

Country: {{country}}
{{#language}}Language: {{language}}{{/language}}
</context>

<task>
Matter:
<matter>
{{matter}}
</matter>
{{#draft}}

Draft or instructions:
<draft>
{{draft}}
</draft>
{{/draft}}

1. What this notary does: in {{country}}, the notary's typical role for this matter (drafting, checking, reading aloud, registering, or just witnessing a signature), whether the notary is neutral, and when you should also have your own lawyer.
2. What to bring: identity documents, proof of marital status or property regime if relevant, company documents and authority to sign, powers of attorney for absent parties, tax numbers, bank details for payments, and documents the notary asked for, marked verify.
3. Points in the draft to understand: if a draft is supplied, list its key clauses in plain language (parties, price and payment, conditions, deadlines, charges and costs, who pays what, penalties) without judging whether it is a good deal; if not, list the clauses typically found in this kind of deed.
4. Questions to ask the notary beforehand: costs and taxes due and when, whether an interpreter or translation is required for you, what happens if something is wrong in the draft, timing of registration, and copies.
5. On the day: what happens, how long it typically takes, and that you can stop and ask questions before signing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state notary fees, taxes or legal requirements as fact; mark them verify with the notary.
- Do not assess whether the transaction is advisable or the price fair; suggest a lawyer or adviser acting for the user if they need that.
- If the user does not understand the language of the deed, say clearly not to sign without an interpreter or translation the notary accepts.
- If there are signs of pressure, undue influence or someone signing for a person who may lack capacity, say so and suggest independent advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this notary does
Short paragraph.

## What to bring
Checklist.

## Points in the draft to understand
Bullets.

## Questions to ask
Numbered.

## On the day
Bullets.
</output_format>
