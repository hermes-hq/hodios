---
schema: 1
id: announce-shop-move
kind: prompt
title: Announce a shop move
description: Writes customer announcements when a shop, salon or restaurant moves, closes temporarily or changes hours - window sign, social posts, email, profile updates and a staff script - from supplied facts.
category: copywriting
version: 1.0.0
status: incubating
stage: [build, ship]
role: [founder, marketer, operations-manager]
subject: [retail, hospitality]
requires: [none]
inputs: [text]
output: [copy, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shop-move, temporary-closure, opening-hours, customer-communication, shopfront]
pairs_with:
  prompts: [plan-reopening-campaign, write-local-business-profile, write-promo-email, write-sms-campaign]
args:
  - name: change_details
    description: What is changing (move, temporary closure, new hours), the dates, old and new address, directions and landmarks, parking and access at the new place, what stays the same (bookings, gift cards, phone, staff), the reason if you want to share it, and anything uncertain.
    type: text
    required: true
  - name: channels
    description: Channels you use (for example "window sign, Instagram, email list of 800, Google profile, booking app, WhatsApp"). Optional.
    type: string
    default: window sign, social posts, email, online profiles, staff script
output_contract:
  format: markdown
  sections: [Key facts, Window sign, Social posts, Email, Online profile updates, Staff script, Timeline]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the announcements a local business needs when it moves, closes for a while or changes its hours. Customers do not read one post: they need the same few facts repeated across every place they look, in the order they care about. What changes, when, where to go now, and what stays the same (bookings, gift cards, loyalty points, the people they know). Businesses lose regulars in a move by announcing once, burying the new address in a story, forgetting maps and booking profiles that keep sending people to the old door, and giving dates they cannot keep.

Channels: {{channels}}
</context>

<task>
<change_details>
{{change_details}}
</change_details>

1. If the type of change, the dates or the new address (for a move) are missing, ask for them and stop. If a date is uncertain (a reopening that depends on works), say "we'll confirm the date" instead of guessing, and plan a second announcement.
2. Pull out the key facts once: what changes, dates, new address with directions from a landmark people know, parking and step-free access, new hours, and what stays the same. Every piece of copy uses these exact facts.
3. Window sign for the old premises (and a "coming soon" sign for the new one if useful): large headline, the date, the new address and a simple map description or arrow, in under 30 words.
4. Social posts: an announcement, a reminder a week before, the day before or last day, opening day at the new place, and a "we've moved" post for the following weeks. Lead each with the change, not with a story.
5. Email: subject line options and a short email with the facts in a box at the top, then any story or thanks.
6. Online profile updates: a checklist of every place the address or hours live (map listings, website footer and contact page, booking system, delivery apps, social bios, email signature, voicemail, invoices and receipts, directories) and the exact text to paste.
7. Staff script: how to answer "where have you gone?", "are my bookings still on?" and "do my vouchers work?" in one or two sentences each.
8. Timeline: when each piece goes out, relative to the change date.
</task>

<constraints>
- Use only supplied facts; never invent dates, addresses, opening hours or reasons. Mark gaps as [X].
- If the reason is personal (illness, bereavement, a dispute), keep it brief or leave it out unless the owner wants it shared.
- Keep the old-premises sign up and the old address redirect in place for some weeks after the move; say so.
- Give honest wording for uncertainty; no promises about dates that depend on works, inspections or permits.
- Mention accessibility of the new site factually if supplied; if not, list it as a question, because customers will ask.
</constraints>

<output_format>
## Key facts
A short fact box.

## Window sign
Sign text, and the new-premises sign if used.

## Social posts
Numbered posts with when each goes out.

## Email
Three subject lines and the email.

## Online profile updates
Checklist with the text to paste.

## Staff script
Question and answer pairs.

## Timeline
Table: When | Channel | Message.
</output_format>
