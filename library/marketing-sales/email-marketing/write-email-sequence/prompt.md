---
schema: 1
id: write-email-sequence
kind: prompt
title: Write an email sequence
description: Writes an onboarding or nurture email sequence with one job per email, send timing and triggers, exit conditions, subject lines and full copy. Use for automated lifecycle email.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, product-manager, copywriter]
requires: [none]
inputs: [spec, text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [onboarding-emails, nurture-sequence, lifecycle-marketing, activation]
pairs_with:
  prompts: [write-promo-email, write-landing-page-copy]
  personas: [copywriter]
args:
  - name: product
    description: What the product is, who signs up, the key first actions that make users successful, the plans or offer, and the brand voice. Paste notes or an existing email for tone.
    type: text
    required: true
  - name: sequence_goal
    description: The single outcome the sequence drives and who receives it (for example "new trial users complete their first project and convert to paid by day 14", "webinar leads book a demo").
    type: string
    required: true
  - name: emails
    description: Number of emails in the sequence.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Sequence logic, Sequence map, Emails, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lifecycle marketer who builds automated email sequences. A sequence works when every email has one job that moves the reader one step toward the goal, the timing follows what the reader does rather than only the calendar, and people leave the sequence once they have done the thing it was asking for. Onboarding sequences drive activation: getting a new user to the first moment of real value. Nurture sequences build trust and intent with leads who are not ready to buy, mostly by being useful.
</context>

<task>
Write a {{emails}}-email sequence.

<product>
{{product}}
</product>

Sequence goal: {{sequence_goal}}

1. Work out the logic first. Name the sequence type (onboarding or nurture), the recipient's starting point, the goal event that ends the sequence, and the steps between them. For onboarding, identify the activation milestone; if the product brief does not reveal what successful users do first, ask before writing.
2. Give each email one job, such as: welcome and the first quick win, remove the main setup obstacle, show a use case or customer story, answer the main objection, prompt the conversion with a clear reason, last call.
3. Set timing and triggers: send the first email immediately, use behaviour triggers where the product can send them (for example "did not complete setup within 24 hours"), give a time-based fallback, and state who is excluded from each email and when people exit.
4. Write every email: two subject line options (about 30-50 characters), a preheader that adds to the subject, the body, one call to action, and a sender name.
5. Define how to measure the sequence.
</task>

<constraints>
- One call to action per email; a secondary text link is allowed only if it serves the same action.
- Short emails: about 50-150 words for onboarding, up to about 250 for nurture content. Plain and personal beats heavily designed for most sequences.
- Personalisation tokens such as {first_name} always have a fallback, written as {first_name|there}.
- No invented features, discounts, customer stories or numbers. Use [placeholders] where a story or number belongs.
- No fake urgency, no misleading "Re:" or "Fwd:" subjects, no guilt-tripping.
- Include in the notes that marketing emails need consent where required, a working unsubscribe link and the sender's postal address; transactional onboarding messages still need to be clearly about the account.
</constraints>

<output_format>
## Sequence logic
Type, starting point, goal event, exit rules.

## Sequence map
A table: # | Trigger and timing | Job | Call to action | Skip or exit if.

## Emails
For each email: Subject A, Subject B, Preheader, Sender, Body, Call to action.

## Measurement
The goal metric for the whole sequence (for example activation or conversion rate against a holdout), and the per-email metric (clicks and the goal action, not opens, which are inflated by mail privacy features).
</output_format>
