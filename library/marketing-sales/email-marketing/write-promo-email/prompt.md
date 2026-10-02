---
schema: 1
id: write-promo-email
kind: prompt
title: Write a promotional email
description: Writes a promotional campaign email with subject line and preheader variants, a single call to action, clear offer terms and a plain-text version. Use for sales, launches and limited-time offers.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
requires: [none]
inputs: [spec, text]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [promo-email, subject-lines, email-campaign, offer]
pairs_with:
  prompts: [write-email-sequence, write-headline-variations]
  personas: [copywriter]
args:
  - name: offer
    description: The promotion with its exact terms (what, discount or price, code, what is excluded, who qualifies) and the landing page. Include the brand voice or a past email if you have one.
    type: text
    required: true
  - name: audience
    description: Which segment receives it and how they relate to the brand (for example "past buyers who have not ordered in 6 months"). Optional.
    type: string
  - name: deadline
    description: When the offer ends, with date, time and time zone. Optional; without it the email uses no urgency.
    type: string
output_contract:
  format: markdown
  sections: [Subject lines, Preheaders, Email, Plain-text version, Send notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an email marketer who writes campaign emails that get clicked without training subscribers to ignore you. Most readers see only the sender, the subject line and the preheader, then give the email two or three seconds, often on a phone. So the offer must be clear from the inbox view and the top of the email, there is one action to take, and the terms are honest and easy to find.
</context>

<task>
Write a promotional email.

<offer>
{{offer}}
</offer>

{{#audience}}Audience: {{audience}}{{/audience}}
{{#deadline}}Deadline: {{deadline}}{{/deadline}}

1. Identify the one thing the reader gets and why it matters to this audience now. If the offer's terms are unclear (the discount, what it applies to, or how to redeem it), ask before writing.
2. Write five subject lines, each on a different angle (the offer stated plainly, the benefit, curiosity, urgency only if there is a real deadline, personal or segment-specific), at most about 50 characters, with counts.
3. Write three preheaders (about 40-90 characters) that add new information to the subject instead of repeating it.
4. Write the email:
   - Hero: a headline that states the offer, one or two lines on why it matters, and the call-to-action button.
   - Body: two to four short points or one short story that builds desire for the product, not for the discount alone.
   - The button again lower down, with the same action.
   - Terms in plain words: what qualifies, exclusions, code if needed, and the end date and time with time zone if there is a deadline.
   - Footer reminders: unsubscribe link and postal address placeholders.
5. Write a plain-text version that works without images.
6. Give send notes: segment, best send window if the offer suggests one, and a reminder email idea if there is a deadline.
</task>

<constraints>
- One call to action. The button text starts with a verb and says what happens ("Get 20% off boots", not "Click here").
- Use only the terms in the offer. Never invent discounts, stock levels, deadlines or prices. Urgency only from a real deadline.
- No all-caps subjects, no strings of exclamation marks, no misleading "Re:" or "Fwd:" prefixes.
- Accessible: meaningful alt text for images (given as notes), the key message also in live text, not only in an image.
- Keep the body short: about 75-200 words before the terms.
- Add a note that the email should go only to people who agreed to marketing email where the law requires it.
</constraints>

<output_format>
## Subject lines
A table: # | Subject | Angle | Characters.

## Preheaders
A numbered list with character counts.

## Email
The email in reading order with labels (Hero headline, Intro, Button, Body, Button, Terms, Footer). Image ideas in [brackets] with alt text.

## Plain-text version
The full plain-text email.

## Send notes
Bullets.
</output_format>
