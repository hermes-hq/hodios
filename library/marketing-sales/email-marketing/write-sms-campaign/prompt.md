---
schema: 1
id: write-sms-campaign
kind: prompt
title: Write an SMS or WhatsApp campaign
description: Writes SMS or WhatsApp marketing messages within length limits, with a clear opt-out, consent assumptions to verify, character and segment counts, and send timing.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
requires: [none]
inputs: [text, spec]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sms-marketing, whatsapp, text-messages, opt-out, consent]
pairs_with:
  prompts: [write-promo-email, write-abandoned-cart-emails, write-post-purchase-emails]
  personas: [copywriter]
args:
  - name: offer
    description: The offer or news, its terms, price, code and deadline, the link to send people to, the brand name, and whether you send by SMS or WhatsApp. Include the country of your recipients.
    type: text
    required: true
  - name: audience
    description: Who receives the messages and how they opted in (for example "customers who ticked the SMS box at checkout in the last 12 months"). Optional, but needed to check consent.
    type: string
  - name: message_count
    description: How many messages in the campaign, for example an announcement, a reminder and a last call. Usually 1 to 3.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Consent and compliance assumptions, Messages, Send plan, Pre-send checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write text-message marketing for retailers, restaurants and service businesses. A marketing text interrupts someone's personal phone, so it has to be worth it: clearly from a brand they know, one useful offer, a short link, and an easy way to stop. Texts are also the most tightly regulated marketing channel in many countries. Prior consent for marketing texts, an opt-out in the message, quiet hours and identifying the sender are common rules, and penalties can be per message.

Length is a hard limit. A standard SMS segment holds 160 characters of the basic GSM-7 alphabet; a single emoji or certain accented or curly characters switch the whole message to Unicode, where a segment holds only 70 characters, and longer messages are split and billed per segment (153 or 67 characters per segment when concatenated). WhatsApp marketing messages must use templates approved by the platform and go only to people who opted in to WhatsApp messages from the business.
</context>

<task>
Write a {{message_count}}-message text campaign.

<offer>
{{offer}}
</offer>

{{#audience}}Audience and opt-in: {{audience}}{{/audience}}

1. If the offer, the link or the brand name is missing, ask for it and stop. If the channel is not stated, write for SMS. If the recipients' country is unknown, say which rules you assumed.
2. State the consent assumptions: who may receive these messages, the opt-in that covers them, and what the user must verify before sending. If the audience was bought, scraped or never opted in to texts, do not write the campaign for them; explain why and suggest how to build an opted-in list.
3. Plan the sequence. With 1 message: the announcement. With 2: announcement and last call. With 3: announcement, reminder to people who have not clicked or bought, and last call. With more than 3, warn that frequency drives opt-outs and spread them across at least several days. If the number is below 1 or above 6, use the nearest bound and say so.
4. Write each message: brand name first, the offer in plain words, the deadline if real, a short link, and the opt-out (for example "Reply STOP to opt out"). Aim for one segment of 160 GSM-7 characters including link and opt-out; avoid emoji and curly quotes unless the user accepts Unicode segments.
5. Count characters and segments for each message, treating the link as its full length, and say which characters would force Unicode.
6. Give send timing in the recipients' local time, within common quiet-hour limits (for example not before 8am or after 8pm), and avoid early mornings, late evenings and religious or national holidays unless the offer is tied to them.
7. For WhatsApp, format each as a template: category (marketing), body with numbered variables for personal fields, an optional button, and the opt-out wording; note that templates need approval before use.
</task>

<constraints>
- No fake urgency, fake "last chance" or deadlines that are not real.
- No misleading sender identity; the brand name appears in every message.
- Never use public link shorteners in SMS; recommend a branded short domain or the platform's own link tracking, as carriers often filter generic shorteners.
- No sensitive personal data in messages (health, finance or anything that would embarrass the recipient if read on a lock screen).
- You flag legal requirements to check; you do not rule on whether a specific list is compliant.
</constraints>

<output_format>
## Consent and compliance assumptions
Bullets: opt-in assumed, country rules assumed, what to verify.

## Messages
A table: # | Purpose | Message | Characters | Encoding | Segments.

## Send plan
A table: # | Day and local time | Who receives it (including exclusions such as buyers and opt-outs).

## Pre-send checklist
Short checklist: test send, link works and is tracked, opt-out keyword processed, quiet hours, exclusions applied.
</output_format>
