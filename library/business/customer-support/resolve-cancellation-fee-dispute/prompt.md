---
schema: 1
id: resolve-cancellation-fee-dispute
kind: prompt
title: Resolve a cancellation fee dispute
description: Handles a customer disputing a late-cancellation or no-show fee - checks what was agreed and shown, decides uphold, reduce or waive, and writes a firm, kind reply that keeps the policy credible.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, support-agent]
subject: [hospitality]
requires: [none]
inputs: [message, text]
output: [report, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [no-show-fee, late-cancellation, deposit, chargeback-risk, policy-exception]
pairs_with:
  prompts: [write-appointment-reminder-messages, reduce-appointment-no-shows, decide-goodwill-refund, respond-to-chargeback-as-merchant]
args:
  - name: dispute
    description: The customer's message, the booking (service, date, time, price), when and how they cancelled or did not show, the fee charged, and any reason they gave.
    type: text
    required: true
  - name: policy
    description: Your cancellation policy as written, where the customer saw it (booking page, confirmation, reminder text), whether they ticked to accept it, and whether the slot was filled again.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check, Decision, Reply, Policy fixes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a restaurant, salon, hotel, clinic, therapist or tutor handle a customer who disputes a late-cancellation or no-show fee. The fee exists to protect a slot that could not be resold, and it only works if customers see it as fair: clearly shown before booking, proportionate to the loss, and applied consistently with sensible exceptions. Waiving every fee teaches customers it is a bluff; enforcing it rigidly after a genuine emergency, or when the slot was resold, loses the customer and may lose a card dispute. Rules on cancellation charges and unfair terms vary by country.
</context>

<task>
<dispute>
{{dispute}}
</dispute>

<policy>
{{policy}}
</policy>

1. Check the fee stands on its own terms:
   - Was the policy shown before the booking was confirmed, in plain words, with the amount or how it is calculated? Did the customer accept it (tick box, signed form, card held on that basis)?
   - Was it applied as written (the right window, the right amount)?
   - Did reminders go out as promised? A missing reminder the business promised weakens the fee.
   - Is the fee proportionate (a deposit or part of the price, not more than the likely loss)? Was the slot resold or the table filled?
2. Weigh the reason and history: a genuine emergency (illness, accident, bereavement, a caring crisis), the first time versus a pattern, the customer's value, and any error on the business's side (wrong time in the confirmation, unclear address).
3. Decide one: uphold; uphold but convert to credit for a rebooking within a set period; reduce; or waive as a one-off. Say why, and note the chargeback risk if the policy was not clearly shown or accepted.
4. Write the reply: acknowledge their situation, state the decision in the first two sentences, explain the reason for the policy in one line (the slot was held for them), and offer the next step (rebook link, credit expiry, how to pay). Firm and kind, under about 130 words. Never ask for proof of illness or bereavement; accept what they tell you or decide without it.
5. Suggest policy fixes if the check found weaknesses: wording, where it is shown, acceptance, reminder timing, a waitlist to resell slots, and a written rule for exceptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. If the policy wording, the fee amount or when the customer cancelled is missing, ask for it and stop.
- Do not threaten debt collection, bad reviews or legal action in the reply.
- Do not state whether the fee is legally enforceable. If the policy was unclear, not accepted, or the fee looks higher than the likely loss, say the business should check local consumer rules before insisting.
- Waivers are called "a one-off" so they do not become an entitlement.
</constraints>

<output_format>
## Check
Table: question | answer from the facts | strengthens or weakens the fee.

## Decision
The decision, the reason, and the chargeback or complaint risk in one line.

## Reply
Ready to send.

## Policy fixes
Up to five bullets, or "None needed".
</output_format>
