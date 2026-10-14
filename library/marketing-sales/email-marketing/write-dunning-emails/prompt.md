---
schema: 1
id: write-dunning-emails
kind: prompt
title: Write failed payment recovery emails
description: Writes failed-payment recovery emails and in-app notices for a subscription, timed to card retries, with a one-click card update, a grace period and a calm final notice.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, operations-manager]
subject: [saas, ecommerce]
requires: [none]
inputs: [text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [dunning, failed-payments, involuntary-churn, card-update, subscription-billing]
pairs_with:
  prompts: [write-renewal-reminder-emails, write-trial-expiry-emails, write-win-back-campaign]
args:
  - name: billing_setup
    description: What the subscription is, price and billing cycle, the payment processor's retry schedule if known, the grace period, and what happens when it ends (pause, downgrade, cancel).
    type: text
    required: true
  - name: brand_voice
    description: How the business usually sounds and who signs the emails.
    type: string
    required: true
  - name: channels
    description: Channels available besides email (in-app banner, SMS, push) and whether pre-expiry card reminders are possible. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recovery timeline, Messages, Rules, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write payment recovery messages. A large share of subscription churn is involuntary: cards expire, get replaced after fraud, hit limits or are declined by the bank, and the customer never meant to leave. The customer usually does not know the payment failed, so the first message must be neutral and helpful, never accusatory, and the update link must go straight to a pre-filled card form without a password hunt. Experts time emails to the processor's automatic retries (sending "please update" right before a retry that would have worked is wasted), send a pre-dunning reminder before a known card expiry, use in-app banners because logged-in users act fastest, and make the final notice say exactly what stops and when, plus how to restore it. Phishing looks a lot like dunning, so the email must look legitimate: from the usual sender, no request for card numbers by email.
</context>

<task>
Write failed-payment recovery messages.

<billing_setup>
{{billing_setup}}
</billing_setup>
Voice and signer: {{brand_voice}}
{{#channels}}Other channels: {{channels}}{{/channels}}

1. **Recovery timeline:** align messages to the retry schedule and grace period: an optional card-expiring reminder before the failure, failure notice on day 0, reminders between retries, a final notice before access changes, and a "your account has been paused" message with how to restore.
2. **Messages:** for each email, subject options (clear, not alarming: "Your payment didn't go through"), preheader, body, one call to action to a secure card update page. Add in-app banner text and, if supplied as a channel, a short SMS version.
3. Cover the common decline reasons in one plain line (expired card, new card, bank block) and suggest contacting the bank if the card is valid.
4. **Rules:** stop all messages as soon as payment succeeds; send a "thanks, you're all set" confirmation; never ask for card details by email or reply; how to handle annual plans (bigger amounts, more notice); what support should say.
5. **Measurement:** recovery rate by message and by decline reason, time to recover, and involuntary churn rate.
</task>

<constraints>
- Use only the supplied retry schedule, grace period and consequences; mark unknowns `[NEEDED: ...]`.
- Neutral, respectful tone. No threats, debt-collection language, or shame.
- Links go only to the business's own logged-in or tokenised update page; no request for card numbers in the email.
- Tell the user to check that the processor's own automatic emails are not also sending, to avoid duplicates.
</constraints>

<output_format>
## Recovery timeline
A table: Day | Event (retry, grace end) | Message | Channel.

## Messages
Each message with subject, preheader, body, call to action; in-app and SMS text where used.

## Rules
Bullets.

## Measurement
Bullets.
</output_format>
