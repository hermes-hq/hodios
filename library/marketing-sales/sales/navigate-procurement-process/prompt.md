---
schema: 1
id: navigate-procurement-process
kind: prompt
title: Navigate a buyer's procurement process
description: Maps the steps between a buyer's verbal yes and a signed contract - procurement, legal, security, finance and vendor onboarding - with documents, owners, lead times and the risks to the close date.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant, operations-manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [procurement, paper-process, vendor-onboarding, contract-signature, deal-closing, b2b-sales]
pairs_with:
  prompts: [write-mutual-action-plan, prepare-deal-negotiation, answer-security-questionnaire, inspect-deal-qualification]
  personas: [deal-desk-analyst]
args:
  - name: deal
    description: The buyer (size, sector, country, public or private), what they are buying and for how much, who said yes, the target signature and start dates, and what you know of their purchasing rules.
    type: text
    required: true
  - name: known_steps
    description: Anything the buyer has already told you or sent (vendor forms, security questionnaire, their contract template, approval limits, board or committee dates, fiscal year end). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Likely path to signature, Documents to prepare, Timeline back from signature, Risks to the close date, Questions to ask now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help sellers get from "we want to go ahead" to a signature. Deals that are won on value regularly slip a month or a quarter in the paper process because the seller assumed the yes was the end. Experienced sellers know the usual sequence: the business owner's approval, then budget or finance sign-off (often against approval limits that trigger a higher signer), procurement (vendor registration, sometimes competitive quotes or a tender above a threshold), information security and privacy review (questionnaire, data processing agreement), legal review of the contract or the buyer's own template, and finally the signer, who may only sign on certain days or after a committee. Many of these run in parallel if started early. Public bodies, banks and healthcare organisations have longer and stricter steps, and rules vary by country and organisation, so the seller must ask rather than assume.
</context>

<task>
<deal>
{{deal}}
</deal>

{{#known_steps}}<known_steps>
{{known_steps}}
</known_steps>{{/known_steps}}

1. **Likely path to signature:** the steps this buyer is likely to require, marking each as confirmed (the buyer told you) or typical (to confirm). For each, the owner at the buyer, what triggers it, typical lead time for an organisation of this type, and which steps can run in parallel.
2. **Documents to prepare:** what you will likely need to provide (company and banking details, tax forms, insurance certificates, security questionnaire and certifications, data processing agreement, references, order form, accessibility or sustainability statements for some public buyers) and who on your side owns each.
3. **Timeline back from signature:** count back from the target signature date to show when each step must start. If the date is not realistic, say so and give the realistic date.
4. **Risks to the close date:** the steps most likely to slip for this buyer, and how to reduce each (start the security review now, ask whether they will accept your paper, pre-agree a fallback clause list with your legal team).
5. **Questions to ask now:** a short list for the champion, phrased so they can answer or find out quickly, such as "Who signs at this amount, and do they need anything from us?".
</task>

<constraints>
- Do not state a specific organisation's rules, thresholds or legal requirements as fact. Label lead times and thresholds as typical ranges to confirm with the buyer.
- Do not give legal advice on contract terms; flag where the seller's legal team must review.
- Do not invent names or dates. Use placeholders for unknown owners.
- If the buyer is a public body, note that procurement law may require a formal tender and that the seller should ask whether this purchase falls under it.
</constraints>

<output_format>
## Likely path to signature
Table: Step | Confirmed or typical | Buyer owner | Trigger | Typical lead time | Parallel with.

## Documents to prepare
Checklist: document, owner on our side.

## Timeline back from signature
Table: Start by | Step | Ends by.

## Risks to the close date
Bullets: risk, how to reduce it.

## Questions to ask now
Numbered questions.
</output_format>
