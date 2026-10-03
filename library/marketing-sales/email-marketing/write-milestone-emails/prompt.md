---
schema: 1
id: write-milestone-emails
kind: prompt
title: Write lifecycle milestone emails
description: Writes lifecycle milestone emails such as birthday, anniversary and achievement messages that feel personal and drive a light action, with triggers and data checks. Use to add warmth to email.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [milestone-emails, birthday-email, customer-anniversary, lifecycle-email, personalisation]
pairs_with:
  prompts: [write-post-purchase-emails, design-loyalty-program, write-email-sequence, plan-email-segmentation]
  personas: [copywriter]
args:
  - name: business
    description: What you do, the brand voice (paste a past email if you can), the data you hold for personalisation (first name, signup date, birthday, purchases, usage stats), the email platform, and any loyalty programme or perks you can offer.
    type: text
    required: true
  - name: milestones
    description: The milestones to write for (for example "birthday, 1-year customer anniversary, 10th order, 100 workouts logged, first month on the app") and what, if anything, each one should offer.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Milestone map, Emails, Data and trigger checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lifecycle copywriter. Milestone emails (a birthday, the anniversary of joining, a tenth order, a usage achievement) are among the most opened and best-liked emails a brand sends, because they are about the customer, not the brand. They work when they feel like a note from someone who noticed: specific to what the customer did, short, warm in the brand's voice, with a small gift or a light next step rather than a hard sell. They backfire when the data is wrong (a birthday email on the wrong day, "Happy 1 year!" to someone who cancelled), when they over-reach into private life, or when they are a promo with a party hat on.
</context>

<task>
Write milestone emails.

<business>
{{business}}
</business>

<milestones>
{{milestones}}
</milestones>

1. If you cannot tell what data exists to trigger a milestone (for example no birthday field for a birthday email), say which milestones are possible now, ask whether to proceed with those, and suggest how to collect the missing data. If the brand voice is unclear, write in a warm, plain voice and say so.
2. Milestone map: for each milestone, the trigger (field and rule), timing (on the day, or a few days before if a gift needs time to use), the personal detail to mention, the gift or perk if one was given, and the light action (redeem the gift, share, try a feature, leave a review).
3. Write each email: two subject lines with character counts, a preheader, a body of about 40 to 120 words that leads with the customer's milestone and uses one personal detail, the gift or perk with its terms (how long it lasts, how to use it), one call to action, and a sign-off from a real team or person name placeholder.
4. Write a fallback for each email for contacts missing the personal field (for example no first name, no stats), so no email shows an empty merge tag.
5. Data and trigger checks: field formats and time zones, suppression of cancelled, refunded or unsubscribed customers, frequency caps if two milestones collide, and how to test the trigger with a sample contact.
</task>

<constraints>
- Use only data fields the business holds. Never invent stats about the customer; personal details come from merge fields named in the copy, for example {first_name} or {orders_count}, with the fallback.
- Avoid milestones or wording that touch sensitive areas (health, weight, pregnancy, religion, relationship status, finances) unless the product is about them and the customer opted in, and even then keep it neutral and private.
- Gifts and perks must match what the business said it can offer; state expiry and conditions plainly. No fake urgency.
- Collecting birthdays needs consent and a reason the customer understands; ask for month and day only, not the year, unless age matters to the product.
- Keep milestone emails free of unrelated promotions.
</constraints>

<output_format>
## Milestone map
A table: Milestone | Trigger | Timing | Personal detail | Gift or perk | Action.

## Emails
For each milestone: subject lines with counts, preheader, body, button, and the fallback version.

## Data and trigger checks
A checklist.
</output_format>
