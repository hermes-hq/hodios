---
schema: 1
id: write-customer-change-notice
kind: prompt
title: Write a customer change notice
description: Tells customers about a change such as new hours, a move, a temporary closure or a discontinued product - what changes, when, why and what to do - across email, signs, posts and listings.
category: business-writing
version: 1.1.0
status: incubating
aliases: [announce-shop-move]
stage: [build, ship]
role: [founder, operations-manager, marketer, support-agent]
requires: [none]
inputs: [text, notes]
output: [message, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [customer-notice, service-change, opening-hours, discontinued-product, local-business, moving-abroad, shop-move, temporary-closure]
pairs_with:
  prompts: [plan-price-change-communication, write-internal-announcement, plan-change-communications, write-local-business-profile, plan-reopening-campaign, write-service-disruption-notices]
args:
  - name: change
    description: What is changing and what stays the same, for example "closing on Mondays; other hours unchanged". For a move, give both addresses, directions from a landmark people know, parking, step-free access, and what stays the same (team, phone, bookings, vouchers).
    type: text
    required: true
  - name: effective_date
    description: When the change takes effect, and any earlier key dates such as last order or last day at the old location.
    type: string
    required: true
  - name: reason
    description: The honest reason, as much as you are willing to share.
    type: text
  - name: customer_actions
    description: What customers need to do, if anything, for example "use remaining credit by 31 Jan" or "re-book appointments online"; also any replacement, refund or alternative on offer.
    type: text
  - name: channels
    description: Where the notice will go, for example "email list, website banner, sign on the door, Instagram, SMS to members". Defaults to email plus a website or door notice.
    type: text
output_contract:
  format: markdown
  sections: [Email, Other channels, FAQ, Checklist, Timeline]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Merged announce-shop-move: moves and temporary closures with directions, a post sequence, listing updates, staff answers and a timeline; honest wording for uncertain reopening dates."}
---
<context>
Customers accept most changes when they hear about them early, plainly and from the business itself, and when the notice answers their real questions: what exactly is different, from when, does it affect me, what do I need to do, and what happens to what I already paid for. They are annoyed by notices that bury the change under "exciting news", dress up a reduction as an improvement, or leave them to discover the change at a locked door. Small businesses also need the same message to work across very different channels: an email, a door sign read in five seconds, a 160-character text, a social post, and an updated listing on maps and booking sites. Some changes carry notice obligations from consumer law, contracts or subscription terms.
</context>

<task>
Write a customer change notice. Effective: {{effective_date}}.

<change>
{{change}}
</change>
{{#reason}}
<reason>
{{reason}}
</reason>
{{/reason}}
{{#customer_actions}}
<customer_actions>
{{customer_actions}}
</customer_actions>
{{/customer_actions}}
{{#channels}}
Channels: {{channels}}
{{/channels}}

1. If it is unclear what is changing, ask and stop. For a move, also stop and ask if the new address or the dates are missing. If a date is uncertain (a reopening that depends on works, an inspection or a permit), write "we'll confirm the date" instead of guessing and plan a second notice.
2. If the change is a price increase, write the notice but add under Checklist that price changes are better planned with segment impact and grandfathering in mind, and keep the wording factual.
3. Email:
   - Subject: the change and the date, plainly ("From 1 February we're closed on Mondays").
   - First two sentences: what changes and from when, and whether customers need to do anything.
   - What stays the same, as a short line or list.
   - The reason in one or two honest sentences, if given. Do not invent one.
   - What customers need to do, with deadlines, and what happens to existing bookings, credit, gift cards, subscriptions or orders, using only the facts given or `[need: …]`.
   - Alternatives or replacements if offered, and where to ask questions.
   - A sincere thank-you; one line acknowledging inconvenience if the change takes something away.
4. Other channels: for each channel listed (or website banner and door sign by default), a version fitted to it: a door sign of at most about 25 words in large-print style; a website banner of one line; an SMS under 160 characters including the business name; a social post of two to four sentences. Keep the date and the key fact identical across all versions. For a move or temporary closure, customers miss single posts, so write a short sequence instead of one post: the announcement, a reminder a week before, the last day, the first day at the new place or back open, and a "we've moved" post for the weeks after. Each leads with the change, not a story.
5. FAQ: three to five questions customers will actually ask, with answers from the input or `[need: …]`, short enough for staff to say at the counter or on the phone ("are my bookings still on?", "do my vouchers work?").
6. Checklist: when to send relative to the effective date (at least the notice period in any contract or terms, and generally the earlier the better), a reminder a few days before, briefing staff, every place the hours or address live (map listings such as Google Business Profile, website footer and contact page, booking system, delivery apps, social bios, email signature, voicemail, invoices) with the exact line to paste, and checking any notice obligations in the terms or consumer rules with an adviser if unsure. For a move, keep a sign at the old premises for some weeks afterwards.
7. Timeline: when each message goes out relative to the effective date.
</task>

<constraints>
- Email under about 180 words.
- Use only facts given; never invent reasons, dates, compensation, refunds or alternatives. Use `[need: …]`.
- Never present a reduction (fewer hours, a smaller product, a discontinued service, a higher price) as an improvement. If the input asks for that, write it honestly and note why under Checklist.
- Dates are written with weekday and date and are identical everywhere.
- Plain, warm language; no "exciting news" for a reduction, no corporate euphemisms.
- If the reason is personal (illness, bereavement, a dispute), keep it brief or leave it out unless the owner wants it shared.
- State accessibility of new premises only as supplied; if it is missing for a move, list it under FAQ as `[need: …]`, because customers will ask.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Other channels
A sub-heading per channel with its version.
## FAQ
Questions and answers.
## Checklist
Bullets.
## Timeline
Table: When | Channel | Message.
</output_format>
