---
schema: 1
id: write-review-request-messages
kind: prompt
title: Write review request emails and texts
description: Writes email and SMS requests for public reviews for a service business, sent at the right moment with a direct review link, one reminder and no review gating or incentives.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, operations-manager]
subject: [hospitality, retail, healthcare]
requires: [none]
inputs: [text]
output: [copy, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [online-reviews, review-requests, local-business, reputation, sms-copy]
pairs_with:
  prompts: [write-post-purchase-emails, respond-to-online-review, write-sms-campaign]
args:
  - name: business
    description: The type of business (dentist, plumber, salon, restaurant, agency), the review platforms you want reviews on, who sends the request (owner, staff member by name) and the voice.
    type: text
    required: true
  - name: service_moment
    description: When the job or visit is complete and how you contact customers afterwards (email, SMS, both), plus any customers you should not ask (complaints open, sensitive services).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Timing and rules, Messages, Staff script, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write review requests for a local or service business. Most happy customers never leave a review because nobody asked at the right moment, the link was buried, or leaving a review took six taps. The best requests arrive within hours of the job or visit while the experience is fresh, come from a real person by name, go straight to the review form, and ask once with one gentle reminder. Two common practices cause real trouble: "review gating" (asking happy customers to review publicly and steering unhappy ones to a private form) and offering discounts or gifts for reviews. Major review platforms' policies generally prohibit both and consumer protection authorities in several countries treat them as misleading; the user should check the current policies of their platforms. Feedback from unhappy customers is still valuable, so the same message can offer a way to contact the owner, as long as everyone is also invited to review.
</context>

<task>
Write review requests for this business.

<business>
{{business}}
</business>

<service_moment>
{{service_moment}}
</service_moment>

1. **Timing and rules:** when to send (for example 2 to 4 hours after the visit or same evening after a job), one reminder after 3 to 5 days if no review, who is excluded (open complaints, sensitive services where a public review could reveal private information, such as health), and a rule never to ask twice in a period.
2. **Messages:** an SMS (short, the sender's name, the business name, one direct link placeholder `{review_link}`, opt-out wording if it is a marketing number) and an email (subject, two or three sentence body, a large button). Write the reminder for both.
3. Where the business is health, legal or similar, add a note not to reply to reviews with any private details and to keep requests free of treatment details.
4. **Staff script:** one or two sentences staff can say in person at the end of the visit, plus how to hand over a QR card.
5. **Checks:** test the direct review link on a phone, confirm the sender name, and confirm the same request goes to every eligible customer.
</task>

<constraints>
- No review gating: every eligible customer receives the same public review invitation. A private feedback option may be offered alongside, never instead.
- No incentives, discounts or prize draws for reviews; no suggested star ratings or scripted review text.
- No invented platform features or links; use `{review_link}` as a placeholder.
- Keep SMS within one segment where possible and state the character count.
</constraints>

<output_format>
## Timing and rules
Bullets.

## Messages
SMS, email and reminders, each labelled.

## Staff script
Short lines.

## Checks
A checklist.
</output_format>
