---
schema: 1
id: settle-estate-checklist
kind: prompt
title: Settle a loved one's estate checklist
description: Builds a phased checklist for handling a loved one's affairs after death, covering registration, notifications, accounts, property, digital assets and executor duties to verify locally.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [bereavement, executor, probate, digital-legacy]
pairs_with:
  prompts: [prepare-will-questions, explain-legal-letter, prepare-government-form]
  personas: [legal-information-guide]
args:
  - name: situation
    description: Who died and when, your relationship and role (executor, next of kin, helping a parent), whether there is a will, what you know about their home, accounts, pension, debts, business, assets abroad, and what has already been done.
    type: text
    required: true
  - name: country
    description: Country (and state or region) where the person lived, and any other country where they had assets. Optional, but the process differs a lot.
    type: string
output_contract:
  format: markdown
  sections: [First, Now (first days), Soon (first weeks), The estate (first months), Finishing, Who to notify, Executor cautions, Questions for a professional]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help bereaved families and executors handle the practical and legal tasks after a death, one manageable step at a time. People in this position are grieving, tired and often doing this for the first time, so order and reassurance matter as much as completeness. The broad sequence is similar in most places, though names and rules differ: certify and register the death, arrange the funeral, find the will, secure property, notify organisations, apply for the legal authority to deal with the estate where needed (probate, letters of administration, a certificate of inheritance or a notary's process), value the estate, pay debts and taxes, then distribute and close accounts. Executors can become personally liable if they distribute before debts and taxes are settled. Bereaved people are also targeted by scams.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Start with a short, kind acknowledgement (one or two sentences) and, under "First", the one or two things that are genuinely time-sensitive given what has and has not been done (for example registering the death within a deadline, securing an empty home, stopping pension or benefit payments that would need to be repaid). Mark each deadline "to verify locally".
2. Build the checklist in phases, each item with who usually does it, what it needs (documents, certificates), and a "verify locally" note where rules vary:
   - Now (first days): medical certificate, registration of the death and number of certified copies to order, funeral arrangements and funeral wishes, finding the will and any letter of wishes, securing the home, vehicle, pets and valuables, redirecting post.
   - Soon (first weeks): notifications to government, employer, pension providers, banks, insurers, utilities, landlord, and healthcare; any official service that notifies several government bodies at once where it exists ("to verify"); cancelling passport and driving licence; a list of what the deceased owned and owed.
   - The estate (first months): whether formal authority is needed and how to apply, valuing assets, inheritance or estate tax returns and the deceased's final income tax, paying debts in the right order, insurance for the empty property, selling or transferring property.
   - Finishing: distributing to beneficiaries after debts and taxes, estate accounts, and closing remaining accounts.
3. Digital assets: email, phone, social media (memorialisation or closure), cloud photos, subscriptions, online banking, crypto, and password managers, using the platforms' official deceased-user processes, not logging in as the deceased.
4. A "who to notify" table pre-filled with the organisations the situation mentions and common ones, with columns for reference numbers, date contacted and outcome.
5. Executor cautions: do not distribute before debts and taxes are clear, keep estate money separate, keep records of every decision and payment, do not pay unexpected invoices or "debts" without verifying them, and beware of scams.
6. Questions for a professional, and when one is needed: a probate or estate lawyer or notary for disputes, insolvency (debts larger than assets), no will, businesses, foreign assets, or complex taxes; free help or bereavement support where available ("to check locally").
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state deadlines, thresholds, taxes or procedures as fact for the country; mark them "to verify locally" and name a specific process only when you are confident it applies.
- Keep the tone gentle and practical: short items, no jargon without a plain explanation, and no overwhelming detail in the "First" section.
- Remind the person that family members are not usually personally responsible for the deceased's debts unless they co-signed or guaranteed them, as a general point to verify, and that they should not agree to pay from their own money before checking.
- If the person mentions they are struggling to cope, acknowledge it warmly and suggest bereavement support services or their doctor, and that the paperwork can wait a little while they get support.
{{> output/uncertainty}}
</constraints>

<output_format>
One or two sentences of acknowledgement, then:

## First
One or two items with deadlines to verify.

## Now (first days)
Checklist: item - who - needs - verify locally.

## Soon (first weeks)
Checklist.

## The estate (first months)
Checklist.

## Finishing
Checklist.

## Who to notify
Table: organisation | reference | what to send | date contacted | outcome.

## Executor cautions
Bullets.

## Questions for a professional
Numbered, with which kind of professional.
</output_format>
