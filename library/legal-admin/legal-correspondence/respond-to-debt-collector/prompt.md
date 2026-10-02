---
schema: 1
id: respond-to-debt-collector
kind: prompt
title: Respond to a debt collector
description: Drafts a written response to a debt collector that requests validation, disputes errors or proposes payment, after checking the letter for red flags and listing the rights to verify locally.
category: legal-correspondence
version: 1.0.1
status: incubating
stage: [build, ship]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [debt-collection, debt-validation, limitation-period, payment-plan]
pairs_with:
  prompts: [explain-legal-letter, dispute-credit-report-error, plan-debt-payoff]
  personas: [legal-information-guide]
args:
  - name: letter
    description: The collector's letter, email or a note of the call - who they are, the original creditor, the amount, account reference, dates and what they demand. Remove full account and ID numbers.
    type: text
    required: true
  - name: situation
    description: What you know about the debt - is it yours, the amount right, when you last paid, any earlier disputes, and whether you can pay something. Optional but changes the response.
    type: text
  - name: jurisdiction
    description: Country and state or region where you live, for example "Ohio, USA" or "Scotland". Optional, but debt collection rules differ a lot by place.
    type: string
output_contract:
  format: markdown
  sections: [What this letter is, Red flags, Your response route, Letter, Rights to check, Do and do not, Get help]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Uses a written dispute rather than a bare information request where a validation window may apply, and has the letter limit contact to writing when the person wants that."}
---
<context>
You help people respond to debt collectors in writing, calmly and on their own terms. Collection letters are designed to produce a quick payment; the person's interest is to first establish that the debt is real, theirs, correctly calculated, owned or managed by this collector, and still collectable, and then to decide what to do. Many places give debtors rights to request proof of the debt, to dispute it, to limit contact and to be treated fairly, and many have limitation periods after which a debt cannot be enforced through the courts. In some places, a payment or a written acknowledgement can restart that limitation period, so the first letter must not admit the debt by accident. Collection scams are also common.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Collector's communication:

<letter>
{{letter}}
</letter>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Explain what the letter is: who is writing (collector, debt buyer, law firm, the original creditor), what they claim, the amount and how it is broken down, and any deadline. Put any deadline first.
2. Check for red flags: amounts that do not match, unexplained fees or interest, a creditor the person does not recognise, threats of arrest or jail, demands for payment by gift card, crypto or wire transfer, refusal to give a postal address, pressure to pay by phone today, or a debt that may be very old. If it looks like a scam, say so and tell the person to verify the collector independently before sending anything or paying.
3. Choose the response route from the facts, and explain why:
   - Validation request: the person does not recognise the debt or the amount, or has not received proof.
   - Dispute: the person believes the debt is wrong, already paid, not theirs, or the result of identity theft.
   - Possibly time-barred: the last payment or acknowledgement may be old. Do not admit or pay; ask for the date of last payment and the original creditor's details, and recommend checking the limitation period locally before any further step.
   - Payment proposal: the debt is valid and the person wants to pay. Offer an affordable amount or a settlement figure, ask for written confirmation of the agreed terms (and, for a settlement, that the balance is treated as settled) before paying.
   - Contact preference: in any route, the person may state how and when the collector may contact them.
   If the facts do not make the route clear, draft a validation request, which is the safest default, and say what would change it.
   Where a dispute or validation window may apply (for example the US, where a written dispute sent within the window stated in the collector's validation notice generally requires the collector to pause collection until it sends verification), word the letter as a dispute plus a request for verification, not only a request for information, unless the person accepts that the debt is theirs and correct. Tell them to send it inside that window and to confirm the window's end date on the notice.
4. Draft the letter: the person's details as [BRACKETS], the collector's reference, a clear statement of the request, a list of the documents requested where relevant (signed agreement or original contract, statement of account from the original creditor, proof of assignment or authority to collect, breakdown of fees and interest), and a request to pause collection while it is answered. If the person wants contact limited, add a sentence asking that all further contact be in writing to the stated address. The letter must not admit the debt unless the person has chosen the payment route.
5. List rights to check locally, as "to verify", naming any law only if you are confident it applies to the stated jurisdiction (for example, in the US, validation and dispute rights under the federal fair debt collection rules and state laws). Include the dispute or validation window if one may apply, and the limitation period.
6. Give a short do and do-not list and where to get free help.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never draft a letter that acknowledges the debt, promises payment, or gives bank access unless the person has chosen to pay.
- Do not invent laws, section numbers, windows or regulator names. If the jurisdiction is unknown, describe rights in general terms and ask for it.
- Do not advise ignoring court papers. If the letter is a court claim, summons or judgment rather than a collection letter, say so first: it has its own deadline and the person should get advice from a debt advice service or lawyer immediately.
- Recommend sending by a method that proves delivery and keeping copies of everything.
- Point to free, non-profit debt advice where it exists, rather than paid debt-relief companies.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this letter is
Three to five lines, deadline first.

## Red flags
Bullets, or "None found".

## Your response route
The route chosen and why, in two or three sentences.

## Letter
The complete letter with [BRACKETS] for missing details.

## Rights to check
Bullets, each marked "to verify".

## Do and do not
Two short lists.

## Get help
Two or three lines on free debt advice and when to see a lawyer.
</output_format>
