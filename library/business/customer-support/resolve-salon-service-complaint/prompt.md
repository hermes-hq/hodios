---
schema: 1
id: resolve-salon-service-complaint
kind: prompt
title: Resolve a salon service complaint
description: Handles a salon client unhappy with a colour, cut, nails or lashes - what to ask, correction or refund, what to record on the client card, and the reply in person or by message.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, support-agent]
requires: [none]
inputs: [message, notes]
output: [message, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [salon, colour-correction, redo-policy, client-record, lash-and-nails]
pairs_with:
  prompts: [write-salon-client-consultation, write-aftercare-instructions, respond-to-online-review]
args:
  - name: complaint
    description: What the client said and how (in the chair, by phone, message or review), with photos described if they sent any.
    type: text
    required: true
  - name: service_details
    description: The service - what was agreed at consultation, products and formulas used, who did it, the date, the price, the patch test record, aftercare given, and anything the client said or did since.
    type: text
    required: true
  - name: salon_policy
    description: Your redo and refund policy (for example free correction within 7 days, no refunds on completed colour), and who can approve exceptions. Leave empty if you have none.
    type: text
output_contract:
  format: markdown
  sections: [What went wrong, Questions to ask, Remedy, Reply, Client card note]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a hairdresser, barber, nail technician or lash and brow artist handle a client who is unhappy with a service. Salon complaints are personal: the result is on the client's face, hands or head, and they often feel embarrassed as well as let down. Experienced salon owners separate four causes before choosing a remedy: a technical fault (wrong formula, uneven cut, poor prep causing lifting), a consultation gap (what was agreed was not what the client pictured), an aftercare or lifestyle cause (hot tools, swimming, picking, oil on lashes), and a reaction that needs medical attention. The common mistakes are defending the work at the desk, refunding without offering a fix the client might prefer, sending the client back to the stylist they no longer trust, and not writing anything down.
</context>

<task>
<complaint>
{{complaint}}
</complaint>

<service_details>
{{service_details}}
</service_details>

{{#salon_policy}}
<salon_policy>
{{salon_policy}}
</salon_policy>
{{/salon_policy}}

1. Check for a reaction first. Redness, swelling, burning, blistering, itching scalp, weeping skin or eye irritation after colour, lashes, nails or brows: the reply leads with "please see a pharmacist or doctor today, or emergency services if your eyes, face or breathing are affected", tells the client not to try home remedies or home removal with solvents, offers removal at the salon by a trained person if the pharmacist or doctor agrees, and the case is recorded as a reaction. No correction service until it has fully settled and a new patch test is done.
2. Work out the likely cause from the details: technical, consultation gap, aftercare or unclear. Say what points each way, without judging the client.
3. List questions to ask: what exactly they dislike, a photo in daylight with no filter, what they pictured (a reference photo), when they noticed, what products, heat or activities since, and whether they want it fixed or their money back.
4. Choose the remedy using the policy, or this default if none is given:
   - Technical fault within 7-14 days: free correction, the client chooses the stylist (offer a senior one), at a time that suits them.
   - Consultation gap: a correction at no charge or a part charge, plus a consultation fix for next time; be honest about what is possible in one session (big colour changes may need staged appointments).
   - Aftercare cause: kindly explain the likely cause, offer a goodwill touch-up at reduced or no cost if the relationship matters.
   - Refund (full or partial) when a correction cannot work, the client will not return, or the service caused damage.
5. Write the reply for the channel used: in person (a short script), or a message under about 120 words. Acknowledge how they feel, do not argue the technique, offer the remedy and a choice of times.
6. Write the client card note: date, complaint, photos received, cause found, remedy offered and accepted, who approved, patch test or reaction notes, and what to do differently next visit.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the details given. Do not invent formulas, dates or policy terms; mark gaps as [X] and ask for them.
- Never diagnose a reaction or suggest treatments or medicines. Point to a pharmacist, doctor or emergency services.
- Do not blame the stylist by name in the reply. Take ownership as the salon.
- Do not promise a result a correction cannot guarantee (for example a lighter colour in one sitting on dark-dyed hair).
- If the complaint is a public review, keep details of the client's appointment out of the public reply and invite them to talk privately.
</constraints>

<output_format>
## What went wrong
Likely cause, with confidence and the facts it rests on. Lead with the reaction warning if step 1 applies.

## Questions to ask
Numbered, up to six.

## Remedy
The recommended remedy, an alternative, and who must approve it.

## Reply
Ready to say or send.

## Client card note
A filled-in note in bullets.
</output_format>
