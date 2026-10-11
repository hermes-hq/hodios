---
schema: 1
id: write-feedback-request-email
kind: prompt
title: Write a feedback request email
description: Writes plain, personal emails asking users for feedback at a key moment such as after onboarding, after 30 days or after a support case, built to get real replies rather than survey clicks.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, operate]
role: [product-manager, founder, ux-researcher, marketer]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [customer-email, reply-rate, lifecycle-email, customer-outreach, feedback-request]
pairs_with:
  prompts: [design-in-product-survey, close-feedback-loop]
args:
  - name: product
    description: What the product does and who the users are.
    type: text
    required: true
  - name: moment
    description: When the email is sent and what the user has just done or not done, for example "7 days after signup, has created a project but not invited anyone" or "2 days after a support case was closed".
    type: text
    required: true
  - name: sender
    description: Who the email comes from (name and role) and what they can actually do with replies. Optional.
    type: string
  - name: what_to_learn
    description: The one thing you most want to learn from this group. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Moment and goal, Email, Variants, Send rules, Handling replies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write lifecycle emails that ask customers for feedback. The emails that get replies look like a note from one real person: plain text, a short subject, one specific question about the user's own recent experience, and a reply-to address someone reads. Branded templates, "we value your feedback" openers, multi-question lists and survey links all cut replies. Timing matters more than wording: send right after a meaningful moment (finishing setup, a first result, a support case closing), and ask inactive users what got in the way rather than how they are enjoying it. After a support case, avoid duplicating the support satisfaction survey. Incentives raise volume but bias answers, so they are rarely needed for a one-line reply. Rules on commercial email and consent differ by country; a service-related feedback request is usually treated differently from marketing, but the sender should check their own obligations.

Product:

<product>
{{product}}
</product>

Moment:

<moment>
{{moment}}
</moment>
{{#sender}}

Sender: {{sender}}
{{/sender}}
{{#what_to_learn}}

What we most want to learn:

<what_to_learn>
{{what_to_learn}}
</what_to_learn>
{{/what_to_learn}}
</context>

<task>
1. Restate the moment and the one thing to learn. If no learning goal was given, pick the most useful one for this moment and say so.
2. Write the email: three subject line options (short, lowercase-friendly, no hype), and a plain-text body of about 50 to 110 words from a named person, with one specific question about what the user just did or did not do, a sentence on why you are asking and what you will do with answers, and an easy way to reply (for example "just hit reply, one line is fine"). No images, buttons or survey links unless the user asked for one.
3. Write two variants for the realistic split at this moment: for example active versus stalled users, or a resolved versus an unresolved support case. Change the question, not just the greeting.
4. Set send rules: trigger and delay, who is excluded (users contacted in the last N days, open support cases, users who unsubscribed, enterprise accounts managed by a named contact unless coordinated), a frequency cap across all feedback asks, and a reminder rule (at most one, or none).
5. Explain how to handle replies: who reads them and how fast, a short reply template that thanks and asks one follow-up, how to log replies, and when to route to support.
</task>

<constraints>
- One question per email; never a list of questions.
- Do not promise rewards, changes or response times the sender cannot keep.
- Never tie a reward to positive feedback, ratings or reviews; if a testimonial is wanted, make it a separate, optional permission ask.
- No fake personalisation tokens beyond what the product would have (first name, product actions); mark them clearly like [first name].
- Do not claim the email is legally compliant; remind the user to check consent and unsubscribe rules for their country.
</constraints>

<output_format>
## Moment and goal
Two sentences.

## Email
Subject options, then the body.

## Variants
Two variants with a one-line note on who gets each.

## Send rules
Bullets.

## Handling replies
Bullets and a short reply template.
</output_format>
