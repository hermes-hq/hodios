---
schema: 1
id: grow-email-list-in-store
kind: prompt
title: Grow an email list in store
description: Plans how a shop, cafe, salon or market stall collects email sign-ups face to face, with a staff ask, QR and paper options, a costed incentive, consent wording and a weekly tally.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, individual]
subject: [retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [list-growth, point-of-sale, qr-code, staff-script, sign-up-incentive, capture-rate]
pairs_with:
  prompts: [write-email-sequence, design-loyalty-program]
  workflows: [start-email-list-track]
args:
  - name: business
    description: What the business is, where it trades, average spend per visit, rough gross margin, customers per week, and how many staff serve at the counter.
    type: text
    required: true
  - name: touchpoints
    description: Where you meet customers in person - till, tables, fitting room, appointment chair, market stall, deliveries, events - and what you already use (card reader receipts, booking app, paper forms). Optional.
    type: text
  - name: incentive_budget
    description: What you could give for a sign-up, if anything (for example "a free coffee" or "up to 2 EUR per sign-up"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Where to ask, Staff script, Sign-up options, Incentive and its cost, Consent wording to check, Weekly tally, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a shop, cafe, salon or market stall build an email list from the people who already walk in. In-person sign-ups are the best contacts a small business can get, yet most counter sign-up efforts stall for three reasons: the ask comes at a busy or awkward moment and staff stop doing it after a week; the sign-up method loses data (unreadable handwriting, paper sheets left on the counter where others can read them); and an incentive is chosen without checking what it costs per sign-up or whether a receipt email counts as consent to marketing (in many places it does not).
</context>

<task>
<business>
{{business}}
</business>

{{#touchpoints}}<touchpoints>
{{touchpoints}}
</touchpoints>{{/touchpoints}}
{{#incentive_budget}}Incentive budget: {{incentive_budget}}{{/incentive_budget}}

1. **Where to ask:** rank the touchpoints by the moment the customer is happiest and least rushed (after payment while the receipt prints, when the plate is cleared, at the end of an appointment, when bagging at a stall). Name one primary moment and at most two backups. Avoid queues at peak times.
2. **Staff script:** one sentence of at most 20 words that gives a concrete reason ("We email new arrivals first, about twice a month. Want in?"), a graceful line for "no" and a line for "what do you do with my email?". Add a 10-minute briefing plan and how the owner checks the ask is still happening.
3. **Sign-up options:** QR code to a short form (email, first name, one optional preference; nothing else), a staff tablet or the till or booking system if it can capture marketing consent separately, and paper as a fallback with block-capital boxes, a separate consent tick box, a locked place to store slips and entry within 48 hours then shredding. Include sign text for a counter card.
4. **Incentive and its cost:** if an incentive is used, cost it: cost per sign-up = value given × cost ratio (for a free product, use its cost of goods, not its price) × expected redemption rate. Compare with the margin from one extra visit. Prefer incentives redeemed on a later visit. If no budget, use a non-cash reason (first look, members' evening, recipes).
5. **Consent wording:** a draft line for the form and the paper slip that says who is emailing, what about and how often, with an unticked opt-in box and an easy way to unsubscribe. Separate it from receipts and loyalty sign-up.
6. **Weekly tally:** a simple sheet: day, transactions, asks made if tracked, sign-ups by method; capture rate = sign-ups ÷ transactions. Set a starting target from the first fortnight, not a guessed benchmark.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Ask for the country if consent wording depends on it, or mark the wording "draft, check locally".
- Do not invent customer numbers, margins or prices; if margin is missing, show the formula with [margin] and say what to plug in.
- No pressure tactics, no making the incentive conditional on agreeing to unrelated marketing beyond what the form says, and no staff targets that reward fake or forced sign-ups.
- Keep data collection to what the emails need.
</constraints>

<output_format>
## Where to ask
Primary moment and backups, one line each with the reason.

## Staff script
The ask, the "no" reply, the privacy answer, then the briefing plan in bullets.

## Sign-up options
Bullets per method, plus the counter card text.

## Incentive and its cost
The calculation with numbers, and a recommendation.

## Consent wording to check
Form line and paper slip line.

## Weekly tally
A table template with column names and the capture-rate formula.

## Questions
Anything missing that would change the plan.
</output_format>
