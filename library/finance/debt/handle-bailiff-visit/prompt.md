---
schema: 1
id: handle-bailiff-visit
kind: prompt
title: Handle a bailiff or enforcement visit
description: Prepares someone for a bailiff, sheriff or enforcement agent visit about a debt - checking the paperwork, what they can usually do and take, protected goods to verify, and how to stop or pause it.
category: debt
version: 1.0.0
status: incubating
stage: [discover, ship]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [checklist, message, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [enforcement-agents, bailiffs, protected-goods, payment-arrangement]
pairs_with:
  prompts: [respond-to-debt-court-claim, respond-to-wage-garnishment, negotiate-with-creditor, prepare-for-debt-advice-appointment]
  personas: [legal-information-guide]
args:
  - name: notice
    description: What the letter or notice says - who sent it, the debt type (council or local tax, parking fine, court judgment, tax, rent), the amount and fees, the creditor, and any visit date. Or what happened at a visit already.
    type: text
    required: true
  - name: situation
    description: Your household (children, anyone vulnerable or disabled), income and essential costs, what you could pay, whether you rent or own, and whether a vehicle is needed for work or disability. Optional.
    type: text
  - name: jurisdiction
    description: Country and region, because enforcement powers differ a lot.
    type: string
output_contract:
  format: markdown
  sections: [Act now, Is this genuine, What they can usually do, Things usually protected, How to stop or pause it, What to say or write, Get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people facing a visit from bailiffs, sheriffs, enforcement agents or their local equivalent about a debt. Fear makes people either hide or pay whatever is demanded, and both can go badly. In many places enforcement follows a set process with notice periods, fixed fee stages that rise at each step, rules about entry (often no forced entry for ordinary debts on a first visit, but different powers for some debts such as criminal fines or tax), and goods that cannot be taken, such as basic household items and tools of a trade up to a value. Some debts can be returned to the creditor or paused if the person is vulnerable (illness, disability, young children, bereavement). Fees grow quickly, so contacting the agency or the creditor early to agree an affordable arrangement, ideally through a free debt adviser, is often the cheapest route. Scammers also pose as bailiffs.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Notice or what happened:

<notice>
{{notice}}
</notice>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Act now: the two or three things to do today, including contacting a free debt adviser and not ignoring letters.
2. Is this genuine: how to check the agent's identity and certification with an official source, the debt details with the original creditor, and warning signs of a scam (payment to a personal account, refusal to give details, threats of arrest for an ordinary debt).
3. What they can usually do: explain the general stages (notice, visit, controlled goods or inventory, removal and sale) and the questions to verify locally: whether they can force entry for this debt type, when visits may happen, and what fees can be added at each stage.
4. Things usually protected: categories of goods often exempt (essential household items, items needed for work up to a value, goods belonging to others, vehicles with a disability badge), marked "verify for your jurisdiction". Explain proving ownership of goods that belong to someone else.
5. How to stop or pause it: pay or arrange instalments with the agency, ask the creditor to take the debt back, raise vulnerability, dispute the underlying debt or judgment, or seek a formal debt solution. Say which fit the person's facts.
6. Give a short script for the doorstep (calm, through a closed door or window if allowed, ask for ID and the warrant or authority, offer a proposal in writing) and a short written offer of payment with [BRACKETS].
7. Get help: free debt advice and legal aid, and the regulator or complaints route for agent misconduct, naming them only when confident.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent entry rules, fee amounts, exemption values or regulators. Mark jurisdiction-specific points "verify".
- Never suggest hiding goods, moving assets to others, or physically obstructing an agent; these can make things worse or be unlawful.
- If anyone is at risk of harm, or the person feels unsafe at a visit, say to contact the police or emergency services.
- Prioritise essentials: an arrangement must leave money for housing, food and utilities.
{{> output/uncertainty}}
</constraints>

<output_format>
## Act now
Up to three bullets.

## Is this genuine
Checklist.

## What they can usually do
Short explanation with points to verify.

## Things usually protected
Bullets marked verify.

## How to stop or pause it
Bullets with when each fits.

## What to say or write
Doorstep script and written offer.

## Get help
Bullets.
</output_format>
