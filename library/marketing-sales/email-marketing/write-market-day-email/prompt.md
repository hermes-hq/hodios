---
schema: 1
id: write-market-day-email
kind: prompt
title: Write a market day email
description: Writes a market stall holder's short weekly email - where and when the stall is, what is fresh or new, a reserve or pre-order option and weather or cancellation notes - plus a reusable template.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual]
subject: [agriculture, retail]
requires: [none]
inputs: [notes, text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: "off"
level: beginner
tags: [market-stall, farmers-market, pre-orders, weekly-update, email-template]
pairs_with:
  prompts: [write-weekly-specials-email, grow-email-list-in-store, write-sms-campaign]
args:
  - name: this_week
    description: Your notes for this week - which market, day, times and pitch location, what is fresh, new or ending, prices if you share them, any weather or cancellation risk, and anything you want to say personally.
    type: text
    required: true
  - name: preorder_method
    description: How people reserve or pre-order - reply to the email, a form link, a text - and the cut-off. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Subject lines, Email, Template, Before you send]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the weekly email for a market trader: a grower, baker, cheesemaker or pop-up seller. It is read on a phone the evening before or the morning of the market, so where and when must come first, then what is worth coming for, then how to reserve. Stall holders often lose sales by burying the location in a chatty story, by writing about produce that sold out or never came, and by not saying what happens if it rains or they cannot trade. Keep it short, true and easy to reuse every week.
</context>

<task>
<this_week>
{{this_week}}
</this_week>

{{#preorder_method}}Reserve or pre-order: {{preorder_method}}{{/preorder_method}}

1. Write three subject lines under 45 characters that lead with the day and one draw ("Saturday: first strawberries at Castle Market").
2. Write the email, 70-140 words:
   - First line: market name, day, times and where the stall is (pitch, landmark).
   - What is fresh, new or last-of-the-season: three to six items as a short list, with prices only if given.
   - Reserve or pre-order: how, by when, and pickup at the stall; if no method is given, use [HOW TO RESERVE].
   - Weather or cancellation note: what happens if the market is off and where to check on the day.
   - One personal line from the trader, only if the notes contain one.
   - Payment methods if mentioned.
3. Write a template with square-bracket fields ([MARKET], [DAY AND TIME], [PITCH], [FRESH THIS WEEK], [RESERVE BY]) and a three-line fill-in guide.
4. List the checks before sending.
</task>

<constraints>
- Use only items, prices and times in the notes. Do not add produce, claims (organic, local, unsprayed, free-range) or prices that are not stated; mark gaps as [NEEDED: ...].
- If the market, day or times are missing, ask and stop, because the email has no use without them.
- Allergens or dietary claims for food only as stated in the notes.
- No fake urgency; "limited" only if the notes say quantities are small.
</constraints>

<output_format>
## Subject lines
Three numbered options.

## Email
Ready to paste.

## Template
The bracketed template and the fill-in guide.

## Before you send
Checklist: day and times, items actually ready, cut-off time, link or reply method works, unsubscribe link present.
</output_format>
