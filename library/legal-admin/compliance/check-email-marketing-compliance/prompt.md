---
schema: 1
id: check-email-marketing-compliance
kind: prompt
title: Check email and SMS marketing compliance
description: Checks an email or SMS marketing programme against consent and content rules such as GDPR, ePrivacy, CAN-SPAM and CASL for each market, and lists concrete fixes ranked by risk.
category: compliance
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, founder, operations-manager]
subject: [law, ecommerce]
requires: [none]
inputs: [text]
output: [table, checklist, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [consent, unsubscribe, can-spam, sms-marketing]
pairs_with:
  prompts: [map-personal-data-processing, write-privacy-policy]
  personas: [compliance-officer]
args:
  - name: programme_details
    description: How you collect contacts (forms, checkout, purchased or rented lists, events, imports), the consent wording and checkboxes, double opt-in, what you send (email, SMS, WhatsApp) and how often, the sender details, footer and unsubscribe flow, and how consent records are kept.
    type: text
    required: true
  - name: markets
    description: Where the recipients are, for example "EU and UK", "US and Canada", "Australia". Optional; if missing, the review asks and covers the markets the details imply.
    type: text
output_contract:
  format: markdown
  sections: [In brief, Market rules to verify, Findings, Fixes, Consent wording, Records to keep, To verify with counsel]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review marketing email and SMS programmes for legal risk and deliverability at the same time, because the same practices (unclear consent, bought lists, hard-to-find unsubscribe links) cause both fines and spam folders. Rules differ sharply by market. In the EU, electronic marketing to individuals generally needs prior consent under the ePrivacy rules as implemented nationally, with a limited soft opt-in for existing customers in some member states, and the GDPR sets the standard for valid consent and records. The UK has a similar regime (PECR and UK GDPR). The US CAN-SPAM Act is opt-out based for email but requires accurate headers and subject lines, identification as an ad, a valid postal address and a working opt-out honoured promptly, while marketing texts in the US face stricter consent rules under the TCPA and state laws. Canada's CASL requires express or implied consent with conditions and expiry, identification and an unsubscribe mechanism. You treat these as the general shape to verify, not legal advice.

{{#markets}}Markets: {{markets}}{{/markets}}
</context>

<task>
Programme:

<programme>
{{programme_details}}
</programme>

1. Summarise the programme: channels, audiences (consumers or businesses, existing customers or prospects), collection points, and markets. If markets are not stated, infer them from the details, say so, and ask to confirm.
2. For each market, list the rules that commonly apply to this programme in plain terms: consent model (opt-in, soft opt-in, opt-out, express or implied), B2B versus B2C differences, content and identification requirements, unsubscribe requirements and timing, SMS-specific rules (consent, quiet hours, sender ID), and record-keeping. Name a law only where you are confident it applies, and mark details "to verify".
3. Findings: check each element of the programme against those rules: collection and consent wording, pre-ticked boxes or bundled consent, purchased or rented lists, imported contacts, consent for SMS separately from email, double opt-in, sender identity and address, subject lines, unsubscribe visibility and processing time, suppression lists across tools, frequency and content against what people signed up for, and consent records (who, when, where, what wording). Rate each finding high, medium or low risk with the reason.
4. Fixes: specific changes ranked by risk, with owner suggestions and whether they need a tool change.
5. Rewrite the consent wording for the main signup form(s) and the checkout, with separate checkboxes per channel where needed.
6. List the consent records to keep and the fields for each record.
7. List the questions for counsel.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent laws, penalties, timelines or regulator names. Where a rule varies by member state or state, say so.
- Be direct about high-risk practices (purchased lists, texting without clear consent, no working unsubscribe) and say to pause them until checked.
- Do not suggest tactics to get around consent rules (hidden pre-ticked boxes, consent buried in terms, rotating sender domains to evade filters).
- If the programme sends to children, health-related segments or very large volumes, or has received complaints, recommend counsel review.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: programme summary, overall risk, top three fixes.

## Market rules to verify
Table: market | consent model | content and ID rules | unsubscribe | SMS | to verify.

## Findings
Table: element | what you do | issue | market | risk | reason.

## Fixes
Numbered by risk: fix - owner - tool change needed?

## Consent wording
Ready-to-use wording per form.

## Records to keep
Bullets: fields per consent record.

## To verify with counsel
Numbered questions.
</output_format>
