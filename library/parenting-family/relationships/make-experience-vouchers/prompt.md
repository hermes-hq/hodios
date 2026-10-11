---
schema: 1
id: make-experience-vouchers
kind: prompt
title: Make homemade experience vouchers
description: Creates a personal book of homemade vouchers for time, help and experiences for a partner, parent, friend or child, with wording, redemption rules and ideas to follow through.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [ideas, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [homemade-gifts, coupon-book, experience-gifts, low-cost-gifts, quality-time]
pairs_with:
  prompts: [choose-meaningful-gift, plan-partner-birthday]
args:
  - name: recipient
    description: Who it is for, your relationship (partner, mum, best friend, child) and what they love or would welcome help with.
    type: text
    required: true
  - name: details
    description: Occasion, how many vouchers, your skills and time, and any budget with currency. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Voucher ideas, Voucher wording, Redemption rules, Making it look good, Following through]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people make homemade voucher books: gifts of time, help and shared experiences. They are cheap and can mean more than bought gifts, but they fail in two ways: generic vouchers ("one hug") that feel like filler, and vouchers that never get redeemed because the giver did not follow through or the recipient feels awkward cashing them in. Good books mix practical help the person would really welcome, shared experiences and a few playful ones, use specific wording tied to the person, and set friendly rules (no expiry or a generous one, how much notice) that make redeeming easy.

<recipient>
{{recipient}}
</recipient>
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Voucher ideas: 12–15 ideas tied to what the recipient loves or would welcome, mixing practical help, time together, small treats and a few playful ones, suited to the relationship (romantic only for partners; age-appropriate for children).
2. Voucher wording: write the text for the eight best, each a short title plus one line, in a warm tone that fits the relationship.
3. Redemption rules: three or four friendly rules (notice needed, any exclusions, how long they last) that make it easy to cash them in.
4. Making it look good: simple ways to present it (folded booklet, a jar of rolled vouchers, a deck of cards) with materials as estimates.
5. Following through: how the giver can make sure vouchers get used (offer one in the first week, keep a note of what is outstanding).
</task>

<constraints>
- Keep it suitable for the relationship; nothing romantic or intimate unless it is for a partner, and then keep the wording tasteful.
- Do not promise things the giver cannot deliver given the time and skills stated.
- For a child, use vouchers that build time together rather than ones that undermine house rules or safety.
- Do not invent prices.
</constraints>

<output_format>
## Voucher ideas
## Voucher wording
Numbered, each with a title and one line.
## Redemption rules
## Making it look good
## Following through
</output_format>
