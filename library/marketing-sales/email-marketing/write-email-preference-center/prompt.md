---
schema: 1
id: write-email-preference-center
kind: prompt
title: Write an email preference centre
description: Writes copy for an email preference page and unsubscribe confirmation - topic and frequency choices, a pause option, easy one-click unsubscribe - plus the confirmation email.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
subject: [ecommerce, nonprofit]
requires: [none]
inputs: [text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [preference-centre, unsubscribe-page, email-pause, one-click-unsubscribe, ux-copy]
pairs_with:
  prompts: [set-email-frequency, plan-email-segmentation]
  rules: [email-consent-rules]
args:
  - name: email_types
    description: The kinds of email you send and how often - for example "weekly newsletter, sale alerts 2-3 a month, new product drops, event invites (UK only)" - and any channels like SMS that people may manage on the same page.
    type: text
    required: true
  - name: brand_voice
    description: How the brand sounds, for example "warm and plain" or "playful". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Preference page, Unsubscribe confirmation page, Confirmation email, Rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the copy for an email preference centre and the unsubscribe flow. A good preference page keeps people who want fewer or different emails, and lets everyone else leave in one step. Brands get this wrong by hiding "unsubscribe from all" under a wall of options, by guilt-tripping copy ("We'll miss you, are you sure?"), by asking people to log in or type their email address before they can leave, and by sending a confirmation email full of promotions. Large mailbox providers now expect bulk senders to support one-click unsubscribe from the inbox, so the page must never be the only or the hardest way out.

{{#brand_voice}}Brand voice: {{brand_voice}}{{/brand_voice}}
</context>

<task>
<email_types>
{{email_types}}
</email_types>

1. **Preference page:** a heading and one-sentence intro; a checkbox for each email type with a one-line description and its real frequency; a pause option (for example 30, 60 or 90 days) with what happens at the end; a "fewer emails" option if the sender can deliver it; a save button; and an "Unsubscribe from all marketing emails" option visible without scrolling on a phone, not greyed out or hidden in small print. Add a one-line note on messages they will still get (receipts, booking confirmations, account messages).
2. **Unsubscribe confirmation page:** a calm confirmation that it worked, when it takes effect (now, or the platform's maximum processing time if the user gives it), a "changed your mind?" link to resubscribe, and an optional one-question reason survey that is clearly optional.
3. **Confirmation email:** decide whether to send one at all; if yes, a short message with no marketing, no offer and no request to come back, just confirmation and the resubscribe link. Note that some places restrict even this, so keep it purely confirmatory and check local rules.
4. **Rules:** checklist the developer or platform setup must meet: one-click unsubscribe header supported, no login or retyping email to leave, choices saved without extra confirmation, unsubscribes honoured promptly, pause end date respected, and preference wording matching what is actually sent.
</task>

<constraints>
- Describe only email types and frequencies the user listed; do not promise options the sender has not said it can deliver (such as "monthly digest only"), or mark them [IF AVAILABLE].
- No guilt, confirm-shaming, pre-ticked boxes or tricks to keep people subscribed.
- Do not state specific legal deadlines for processing unsubscribes; say to check the rules for the markets mailed.
- If the email types are missing, ask what is sent and how often, and stop.
</constraints>

<output_format>
## Preference page
Copy block in page order: heading, intro, each option with label and description, pause, save button, unsubscribe-all, still-receive note.

## Unsubscribe confirmation page
Copy block.

## Confirmation email
Send or not, with reason; if send, subject and body.

## Rules
Checklist.
</output_format>
