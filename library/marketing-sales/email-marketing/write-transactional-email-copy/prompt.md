---
schema: 1
id: write-transactional-email-copy
kind: prompt
title: Write transactional email copy
description: Writes the copy for order, shipping, account, password and receipt emails so they are clear, on-brand and free of promotion clutter, with the key fact in the subject and a plain-text version.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, founder, product-manager]
subject: [ecommerce, saas]
requires: [none]
inputs: [text]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [transactional-email, order-confirmation, shipping-notification, password-reset, receipts]
pairs_with:
  prompts: [implement-transactional-email, write-post-purchase-emails, write-dynamic-email-content]
args:
  - name: business
    description: What the business sells or does, brand voice, support contact options and hours, returns or cancellation policy, and the platform sending these emails.
    type: text
    required: true
  - name: emails_needed
    description: Which transactional emails to write (order confirmation, payment receipt, shipped, out for delivery, delivered, delayed, refund issued, account created, password reset, email change, login alert) and the data fields available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Email set, Copy, Shared rules, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write transactional emails: the messages people expect because they did something (bought, signed up, asked to reset a password). They are the most opened emails a business sends, and the default platform templates are often confusing: the order number hidden at the bottom, "Your order is confirmed" with no delivery estimate, password resets that look like phishing. Experts put the key fact in the subject and first line, make the one next action obvious, answer the question people will otherwise ask support ("When will it arrive?", "Can I change it?"), keep security emails plain and recognisable (who requested it, link expiry, "didn't request this?"), and keep promotions out or to a small, clearly secondary block. In many places, mixing heavy promotion into transactional emails can change how they are treated for consent purposes, so the user should check that.
</context>

<task>
Write transactional email copy.

<business>
{{business}}
</business>

<emails_needed>
{{emails_needed}}
</emails_needed>

1. **Email set:** list each requested email with its trigger, the key fact for the subject line, the one action, and the fields it uses.
2. **Copy:** for each email write the subject, preheader, body with merge fields as `{field}`, the primary button, a support line, and a short plain-text version. Order and shipping emails show items, totals, address and tracking where the fields exist; delays say what happened, the new estimate and the options.
3. Security emails (password reset, email change, login alert): name the action, the expiry of the link if supplied, what to do if the reader did not request it, and never ask for a password or code by reply.
4. **Shared rules:** sender name, reply-to that reaches a person or a clear "do not reply" alternative, how much brand promotion is allowed (none in security emails), tone, and accessibility (live text, alt text, clear button labels).
5. **Checks:** field rendering with multiple items and long names, currency and date formats, time zones, links that work when logged out, and dark mode readability.
</task>

<constraints>
- Policies, times and contact details only as supplied; `[NEEDED: ...]` otherwise.
- No promotional content in security emails; at most one small, clearly secondary block in order emails.
- Never include full passwords, full card numbers or one-time codes alongside a link that uses them.
- Plain language; no blame in delay or failure emails.
</constraints>

<output_format>
## Email set
A table: Email | Trigger | Subject key fact | Action | Fields.

## Copy
Each email labelled, with subject, preheader, body, button and plain-text version.

## Shared rules
Bullets.

## Checks
A checklist.
</output_format>
