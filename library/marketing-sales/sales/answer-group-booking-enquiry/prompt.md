---
schema: 1
id: answer-group-booking-enquiry
kind: prompt
title: Answer a group booking enquiry
description: Replies to a group, party or private dining enquiry for a restaurant, bar or venue, answering every question, offering packages from your prices with deposit terms and a clear way to hold the date.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [manager, founder]
subject: [hospitality]
requires: [none]
inputs: [message, text]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [private-dining, group-bookings, event-packages, minimum-spend, deposit-terms, venue-enquiries]
pairs_with:
  prompts: [reply-to-inbound-lead, answer-price-shopper-calls]
args:
  - name: enquiry
    description: The enquiry as received (email, form, DM or call notes) - date, group size, occasion, budget, dietary needs and any questions asked.
    type: text
    required: true
  - name: packages_and_terms
    description: Your spaces with capacities, set menus or packages with prices, minimum spends by day, service charge, deposit and cancellation terms, availability on the requested date, and extras (cake fee, corkage, AV, decorations).
    type: text
    required: true
  - name: tone
    description: How the venue sounds (for example "relaxed neighbourhood bistro", "smart hotel restaurant", "lively cocktail bar").
    type: string
    default: warm and professional
output_contract:
  format: markdown
  sections: [Enquiry check, Reply, Internal notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a restaurant manager, bar or venue owner, or event coordinator reply to a group or private booking enquiry. Group enquiries are often sent to several venues at once, so the first clear, complete reply has an advantage. Replies lose bookings when they ignore the questions asked, paste the whole events pack, bury the minimum spend so it surprises the customer later, or end without a simple way to hold the date. A good reply answers every question in the order asked, offers two or three options that fit the group and budget, states the money terms plainly (price per head, minimum spend, service charge, deposit, cancellation), and gives one easy next step with a hold deadline.

Venue tone: {{tone}}
</context>

<task>
<enquiry>
{{enquiry}}
</enquiry>

<packages_and_terms>
{{packages_and_terms}}
</packages_and_terms>

1. Extract from the enquiry: date and time, group size, occasion, budget, dietary or access needs, and every question asked. List anything essential that is missing (date, numbers) as a question for the reply.
2. Check fit against the terms: is the date available, does a space fit the group, does the budget meet the minimum spend for that day? If it does not fit, find the honest alternative (another day with a lower minimum, a semi-private area, a smaller menu).
3. Choose two or three options from the packages given that fit, and calculate a total estimate for each: per-head price x guests, service charge, and any minimum spend top-up. Show the arithmetic.
4. Write the reply: thank them and mention the occasion, answer each question in order, present the options briefly (a short list or table), state deposit, cancellation and final-numbers deadline in plain words, address dietary and access needs, and close with how to hold the date (a reply with the chosen option, a deposit link, or a call) and how long you will hold it.
5. Write internal notes for the team.
</task>

<constraints>
- Use only the prices, terms and availability given. If availability for the date is not stated, say "[confirm availability]" and do not promise it.
- Never invent allergens or menu details; for allergies, say the kitchen will confirm and ask for details.
- State the minimum spend and service charge up front, not in small print.
- Keep the reply under 250 words plus the options table.
- If the enquiry or the packages are missing, ask for them and stop.
</constraints>

<output_format>
## Enquiry check
Table: Item | From the enquiry | Fit (yes, no, check).

## Reply
Subject line, then the reply ready to send, with an options table: Option | What's included | Price per head | Estimated total.

## Internal notes
Bullets: date hold expiry, follow-up date if no reply (two working days is typical), allergies to pass to the kitchen, and upsell ideas that genuinely suit the occasion.
</output_format>
