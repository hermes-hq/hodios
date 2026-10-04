---
schema: 1
id: write-gift-card-campaign-emails
kind: prompt
title: Write gift card campaign emails
description: Writes a holiday gift card push for a restaurant, salon or shop - launch, last postal date and last-minute digital emails - with exact terms from supplied data and a bonus offer costed against margin.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer]
subject: [hospitality, retail]
requires: [none]
inputs: [text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [gift-cards, gift-vouchers, bonus-offer, last-minute-gifts, holiday-season]
pairs_with:
  prompts: [plan-holiday-sale-campaign, write-promo-email]
args:
  - name: business
    description: What the business is, average spend per visit, rough gross margin or food cost percentage, how gift cards are sold (online digital, physical by post, in person) and the brand voice.
    type: text
    required: true
  - name: occasion
    description: The gifting moment, for example "Christmas", "Mother's Day", "Lunar New Year", "Valentine's Day", with its date.
    type: string
    required: true
  - name: gift_card_terms
    description: The gift card terms exactly as they stand - values available, expiry, where it can be used, whether it can be split or topped up, delivery options and last order dates - plus any bonus offer you are considering.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Campaign plan, Bonus offer maths, Emails, Terms block, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write a gift card campaign for a restaurant, salon or independent shop around a gifting occasion. Gift cards bring cash in early and new customers later, but campaigns go wrong in familiar ways: emails go out too late for postal delivery, the bonus offer ("buy 100, get 20 free") is chosen without checking what it costs when redeemed, and terms such as expiry are vague in the email and different on the card, which causes disputes. Gift card expiry and bonus card rules also differ by country and state, so terms must come from the business, not from the copywriter.

Occasion: {{occasion}}
</context>

<task>
<business>
{{business}}
</business>

<gift_card_terms>
{{gift_card_terms}}
</gift_card_terms>

1. **Campaign plan:** three to four sends timed backwards from the occasion: launch (3-4 weeks before), a last-posting reminder 2-3 days before the last order date for posted or physical cards (skip if cards are digital only), digital last-minute (the day before and the morning of), and optionally a post-occasion email to buyers who are subscribers, with a forwardable how-to-redeem note for the person they gave it to. Never email gift recipients who have not signed up. Note who receives each.
2. **Bonus offer maths:** if a bonus is proposed, cost it. Bonus cost ≈ bonus value × (1 − gross margin) × expected redemption share, plus any lost margin if bonus cards are used on visits that would have happened anyway. Compare with the extra sales it needs to pay off. If the margin or food cost is missing, show the formula with [gross margin] and say what to plug in; label the redemption share as an assumption, or use 100% as the worst case, until the business has its own figure. Recommend restrictions to check (bonus valid only from a later date, separate shorter expiry where local law allows, one per purchase). If no bonus is proposed, say whether one is worth testing.
3. **Emails:** for each send, two subject lines, a preheader, a 50-120 word body and one button. Launch shows the experience the card buys (a meal for two, a cut and colour) rather than just a value. Last-minute emails lead with "arrives instantly by email" or the real delivery option.
4. **Terms block:** one short plain paragraph for every email with value options, expiry, where it can be used and how to redeem, exactly as supplied.
5. **Checks:** delivery cut-off dates, the purchase page on mobile, the terms matching the card, and staff knowing how to redeem.
</task>

<constraints>
- Use the supplied terms exactly. If expiry, redemption places or the last postal date are missing, mark [NEEDED: ...] and list them under checks; never invent them.
- Do not state gift card laws; say that expiry and bonus card rules vary by location and should be checked.
- Do not count unredeemed card value as profit in the maths or the pitch.
- No fake deadlines; the deadlines used are real delivery cut-offs.
- If the occasion date or how cards are sold is missing, ask and stop.
</constraints>

<output_format>
## Campaign plan
Table: Send | Date | Who receives | Goal.

## Bonus offer maths
The formula with numbers, the result and a recommendation, or "No bonus proposed" with a one-line view.

## Emails
Each send with subject lines, preheader, body, button.

## Terms block
The paragraph.

## Checks
Checklist.
</output_format>
