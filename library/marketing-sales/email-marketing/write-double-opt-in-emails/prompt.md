---
schema: 1
id: write-double-opt-in-emails
kind: prompt
title: Write double opt-in confirmation emails
description: Writes the confirmation email, the check-your-inbox page and the confirmed message for a double opt-in sign-up, plus a reminder, so more new sign-ups actually confirm.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
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
depth: specific
tags: [double-opt-in, confirmation-email, sign-up-flow, list-quality, consent]
pairs_with:
  prompts: [write-welcome-series, grow-email-list-online, write-email-preference-center]
args:
  - name: signup
    description: The business or list, where people sign up, what they were promised (discount, guide, updates) and how often you will email.
    type: text
    required: true
  - name: sender
    description: The sender name and address the confirmation comes from, and the brand voice.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Flow, Copy, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write double opt-in flows. Double opt-in protects list quality and deliverability (no typos, no bots, no people signed up by someone else) and gives clear evidence of consent, but a careless flow loses a large share of sign-ups at the confirmation step. The confirmation email often lands in promotions or spam, comes from an unfamiliar sender name, or looks like a generic system message, and the thank-you page says "Thanks!" without telling people to go and click something. Experts make the post-sign-up page do the work (big "check your inbox" instruction, the sender name to look for, what to do if it is not there), keep the confirmation email plain with one large button and no other links, deliver the promised incentive only after confirmation, and send a single reminder to unconfirmed sign-ups. Whether double opt-in is required depends on the country and the platform; the user should check.
</context>

<task>
Write a double opt-in flow.

<signup>
{{signup}}
</signup>
Sender: {{sender}}

1. **Flow:** sign-up form, check-your-inbox page, confirmation email, confirmed page, welcome email hand-off, and one reminder to unconfirmed sign-ups after about 24 hours (and what happens to unconfirmed contacts after a set period).
2. **Copy:**
   - Check-your-inbox page: headline, the exact sender name and subject line to look for, a tip to check the spam and promotions folders, and a "wrong email? sign up again" link.
   - Confirmation email: three subject line options that name the action ("Confirm your subscription to ..."), a preheader, two or three sentences that restate what they signed up for, one large button, and a line saying they can ignore the email if they did not sign up.
   - Confirmed page: thanks, the promised item or code delivered or where it will arrive, and one next step.
   - Reminder email: short, same button.
3. **Checks:** sender name matches the brand on the form, button works on mobile, confirmation lands in inbox for major providers, and the confirmed page does not let people skip confirming to get the incentive.
</task>

<constraints>
- The confirmation email has one link (the confirm button) plus the required footer; no promotions, images-only design or extra calls to action.
- Do not promise frequency or content beyond what the user supplied.
- Note that consent and record-keeping requirements vary by country and that the user should check what applies; do not state legal rules as fact.
</constraints>

<output_format>
## Flow
Numbered steps with timing.

## Copy
Each page and email labelled, ready to paste.

## Checks
A checklist.
</output_format>
