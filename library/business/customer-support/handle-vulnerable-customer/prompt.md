---
schema: 1
id: handle-vulnerable-customer
kind: prompt
title: Support a customer in vulnerable circumstances
description: Guides an agent when a customer discloses bereavement, illness, money hardship or distress - flexible options, safe wording, what to record and when to escalate.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager]
requires: [none]
advice_risk: [mental-health]
inputs: [message, notes]
output: [message, checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [vulnerable-customers, bereavement, financial-hardship, compassionate-handling, safeguarding]
pairs_with:
  prompts: [write-support-reply, decide-goodwill-refund, design-accessible-customer-service]
  rules: [support-tone-rules]
args:
  - name: conversation
    description: What the customer said, in their words where possible, including what they originally contacted you about.
    type: text
    required: true
  - name: account_facts
    description: The account or order situation - balance owed, renewals, deliveries, deadlines, who the account holder is.
    type: text
    required: true
  - name: options
    description: What your business can offer - payment breaks or plans, fee waivers, cancellation without penalty, a named contact, a specialist team, bereavement process. Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Situation, Safety check, Options to offer, Reply, What to record, Escalate or follow up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach a support agent who has just heard something hard from a customer: a death in the family (often the account holder's), a serious illness, job loss and money trouble, domestic abuse, a mental health crisis, or confusion that suggests the customer may not understand what they are agreeing to. Vulnerability is usually temporary and situational, not a type of person. What helps: slowing down, saying once that you are sorry to hear it, asking what would help rather than guessing, cutting the number of steps and repeat explanations, pausing collections or deadlines while things are sorted, and recording the need (with consent) so the customer never has to tell their story again. What harms: scripted sympathy followed by the standard process, demanding documents immediately (a death certificate on the first call), upselling, or an agent improvising promises the business cannot keep. Agents are not counsellors, debt advisers or social workers; their job is to make the business easy to deal with and point to real help.
</context>

<task>
<conversation>
{{conversation}}
</conversation>

<account_facts>
{{account_facts}}
</account_facts>

{{#options}}
<options>
{{options}}
</options>
{{/options}}

1. Summarise the situation in two or three lines: what the customer disclosed, what they originally needed, and what is time-sensitive on the account (a payment due, a renewal, a delivery, a cut-off).
2. Safety check: does anything suggest immediate risk to the customer or someone else (talk of suicide or self-harm, abuse, no heating or food, a person alone and unwell)? If yes, put the safety step first: the agent asks directly and calmly whether they are safe and, if there is immediate danger, urges them to contact local emergency services, following any internal safeguarding procedure.
3. List the options that fit, from the options given: pausing payments or collections, waiving fees, cancelling without penalty, extending deadlines, transferring or closing a deceased person's account with the least paperwork, a single named contact. If the options are unknown, list what to ask the team lead for.
4. Write what the agent says or sends: acknowledge once and simply, explain the practical options in short sentences, ask what would help, set the next step and time, and offer a way to pause or come back later. Avoid pressure, jargon and repeated condolences.
5. List what to record: the need in factual terms, what the customer consented to having noted, what was agreed, and follow-up date. Never record diagnoses or details beyond what is needed.
6. Say when to escalate (safeguarding concern, signs someone else is controlling the account, the customer cannot understand the decision being made, requests beyond agent authority) and when to point to outside help such as free debt advice or bereavement support services in their country.
</task>

<constraints>
- Do not give medical, legal, debt or counselling advice; point to the relevant free or professional service in general terms and do not invent organisation names or phone numbers.
- Do not make offers outside the options given; mark them as "ask the team lead".
- Do not demand proof (such as a death certificate or medical letter) on first contact unless the user's policy requires it, and then explain it gently with an alternative timeline.
- Never disclose account details to a third party (relative, carer) without the authority your process requires.
- Plain words, short sentences, no upselling, no blame.
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Situation
Two or three lines.

## Safety check
Risk signals found or "none found", and the immediate step if any.

## Options to offer
Bullets, each marked "available" or "ask the team lead".

## Reply
What the agent says or sends.

## What to record
Factual, consent-based note.

## Escalate or follow up
When and to whom, and outside help to mention.
</output_format>
