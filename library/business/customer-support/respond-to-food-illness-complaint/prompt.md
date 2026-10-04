---
schema: 1
id: respond-to-food-illness-complaint
kind: prompt
title: Respond to a food illness complaint
description: Responds to a customer who says they fell ill after eating at your cafe, restaurant or takeaway - a caring reply, facts gathered without admitting fault, internal checks, records and who to involve.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, manager]
subject: [hospitality]
requires: [none]
inputs: [message, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [food-poisoning, food-safety, allergen, environmental-health, incident-record]
pairs_with:
  prompts: [write-support-reply, respond-to-online-review]
args:
  - name: complaint
    description: The customer's message, call notes or review, including when they visited, what they say they ate, who was ill, symptoms and timing, and what they are asking for.
    type: text
    required: true
  - name: what_was_eaten
    description: Optional. What your records show - the order or bill, dishes and batches, who prepared them, temperature and cooling logs for the day, allergen information given, and any other complaints about the same day.
    type: text
output_contract:
  format: markdown
  sections: [Severity check, Reply to customer, Facts to gather, Internal checks today, Records to keep, When to involve others]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the owner or manager of a cafe, restaurant or takeaway respond when a customer says they became ill after eating there. The first reply matters twice: the customer needs to feel cared for, and the business needs to avoid both a cold denial and an admission of fault it cannot yet know. Illness is often blamed on the last meal eaten even when another source is more likely, but some complaints are the first sign of a real problem, and a second, unrelated complaint about the same day or dish is a serious signal. Allergic reactions are a different, urgent category.
</context>

<task>
<complaint>
{{complaint}}
</complaint>

{{#what_was_eaten}}
<what_was_eaten>
{{what_was_eaten}}
</what_was_eaten>
{{/what_was_eaten}}

1. Severity check. Treat as urgent and say so first if the complaint mentions an allergic reaction, breathing difficulty, blood in stool or vomit, signs of dehydration, a hospital visit, or a vulnerable person ill (pregnant, very young, elderly, immunocompromised). The reply urges them to seek medical help now (local emergency services if severe).
2. Write the reply to the customer: sorry that they are unwell (empathy, not admission), encourage them to see a doctor or pharmacist and mention that a doctor can arrange tests, ask for the facts below, say you are checking your kitchen records today, and give a named contact and when you will reply. Use phrases like "we take this seriously and are looking into it" rather than "we are sorry our food made you ill".
3. Facts to gather, politely: date and time of the visit, booking name or receipt, every item eaten and drunk by each person, who in the party was ill and who was not, when symptoms started and what they were, other places eaten in the 72 hours before, whether a doctor was seen or a sample tested, and contact details for follow-up.
4. Internal checks today: the dishes and batches served, temperature, cooling and reheating logs, deliveries and suppliers for those ingredients, allergen records and what the customer was told, staff illness (anyone ill should stay off work under your food safety rules), cleaning records, and other complaints from the same day or dish.
5. Records: keep everything (messages, logs, receipts, CCTV for the visit if held, any retained food samples), write a dated incident note, and do not change or "tidy" records after the event.
6. When to involve others: your insurer (early, before any offer of money); the local food safety or environmental health authority if there are two or more unconnected complaints, a confirmed lab result, a serious allergic reaction, or a possible outbreak; and a solicitor or lawyer if a claim or legal letter arrives. If the customer reports it to the authority themselves, cooperate openly.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never diagnose the illness, guess its cause or say the food could not have caused it. Never give medical advice beyond seeking care.
- Do not admit liability, offer compensation or a refund "for making you ill", or ask the customer to sign anything. A goodwill refund of the bill can be offered without admission only if the insurer agrees; mark it for checking.
- Never ask the customer to delete a review or post as a condition of anything.
- Do not invent logs, temperatures or test results. If the business has given no records, list what to pull and mark gaps as [X].
- Food safety and reporting rules differ by country and area. State that you are assuming a local food safety authority exists and that the owner should check its reporting duties.
</constraints>

<output_format>
## Severity check
One or two lines: urgent or routine, and why.

## Reply to customer
Ready to send, under about 150 words.

## Facts to gather
Checklist.

## Internal checks today
Checklist with who does each.

## Records to keep
Bullets.

## When to involve others
Table: who | trigger | what to send them.
</output_format>
