---
schema: 1
id: reactivate-old-leads
kind: prompt
title: Reactivate old leads
description: Plans a database reactivation campaign for aged and closed-lost leads, with segments, consent checks, short email or SMS messages and a script for handling the replies that come back.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, founder, marketer]
requires: [none]
inputs: [dataset, notes]
output: [plan, message, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [lead-reactivation, closed-lost, crm-cleanup, sms-sales, follow-up]
pairs_with:
  prompts: [revive-stalled-deal, qualify-leads, design-lead-follow-up-process]
  personas: [sales-coach]
args:
  - name: lead_data
    description: A description or sample of the old leads - how many, how old, where they came from (form, quote request, event, purchased list), why deals were lost if known, and what consent you recorded.
    type: text
    required: true
  - name: offer
    description: What you sell now and anything genuinely new since these leads went cold (new product, lower price, new proof, new location).
    type: text
    required: true
  - name: channels
    description: Channels you can use, such as email, SMS, phone or WhatsApp.
    type: text
    default: email
  - name: country
    description: Country or countries the leads are in, for consent rules.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Segments, Consent check, Messages, Reply handling, Schedule and measures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help businesses earn revenue from leads already in their CRM. Old leads are cheap to reach, but campaigns go wrong in predictable ways: blasting one generic "checking in" message to everyone, pitching hard to people who said no for a clear reason, ignoring that someone's situation or role has changed, and messaging people who never consented, which can breach privacy and marketing laws and damage sender reputation.

Reactivation works with a short, low-pressure message that gives a reason to reply now (something changed, a simple yes/no question, a useful resource), sent to segments that share a context. The classic one-line question ("Are you still looking at X, or should I close your file?") gets replies because it is easy to answer. Reply handling matters as much as the message: most replies are "not now", "wrong person" or "remove me", each of which needs a fast, correct response.
</context>

<task>
Plan an old-lead reactivation campaign.

<lead_data>
{{lead_data}}
</lead_data>

<offer>
{{offer}}
</offer>

Channels: {{channels}}
Country: {{country}}

1. Split the leads into three to five segments by age, source and loss reason (for example price, timing, went with a competitor, no response), and say which to skip.
2. Run a consent check: for each source, whether you are likely able to contact them on each channel, and what to confirm, using {{country}} as context. Treat purchased lists and SMS without recorded consent as high risk.
3. Write messages per segment for the given channels: an email of 40 to 90 words with a plain subject, and an SMS or chat message under 160 characters where SMS or chat is in scope, each with an opt-out.
4. Write reply-handling scripts for: interested now, not now (with a date), wrong person, already bought elsewhere, remove me, and angry.
5. Give a schedule (sends spread over days, small batches first to check bounces) and three measures.
</task>

<constraints>
- Do not give definitive legal conclusions; describe common rules (for example consent requirements for SMS and email in the EU, UK, Canada and the US TCPA for texts) and tell the user to confirm.
- Never suggest messaging leads who opted out or were marked do-not-contact.
- No fake familiarity ("Great speaking last week") or invented news; only use changes given in the offer.
- Remove-me replies are processed immediately with a confirmation, never argued with.
</constraints>

<output_format>
## Segments
Table: Segment | Size or share | Context | Action (contact or skip).

## Consent check
Table: Source | Channel | Risk | What to confirm.

## Messages
Per segment: email and, where in scope, SMS or chat.

## Reply handling
A short script for each reply type.

## Schedule and measures
Steps and three measures.
</output_format>
