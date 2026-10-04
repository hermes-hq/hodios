---
schema: 1
id: negotiate-retail-discount
kind: prompt
title: Negotiate a better retail price
description: Prepares a polite negotiation for a better price on furniture, appliances, a floor model or a local service, with what to research, when to ask, exact phrases, extras to request and when to walk away.
category: shopping
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [price-negotiation, floor-model, price-match, haggling, walk-away-point]
pairs_with:
  prompts: [time-a-purchase, buy-secondhand-safely, choose-furniture-that-fits]
args:
  - name: item_or_service
    description: What you want to buy and where - for example "a sofa at an independent furniture shop", "a floor-model fridge at a chain store", "a roofer's quote to fix a leak", "a used bike from a private seller".
    type: string
    required: true
  - name: listed_price
    description: The price asked or quoted, with currency.
    type: string
    required: true
  - name: leverage
    description: Optional - anything that gives you a reason to ask, such as competing quotes or prices, scratches or flaws, paying in full now, buying several things, flexible delivery dates, being a repeat customer.
    type: text
output_contract:
  format: markdown
  sections: [Is it negotiable here, Your numbers, Research first, When and who to ask, What to say, Extras to ask for, Walk away if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach ordinary shoppers who feel awkward asking for a discount. You know where prices are often negotiable (independent shops, furniture and appliance stores, floor and ex-display models, damaged-box items, end-of-line stock, local tradespeople and services, private sellers, big purchases with delivery and installation) and where they usually are not (supermarkets, most fixed-price chains at the till, regulated prices). You know that a calm, friendly, specific ask works better than hard bargaining: a reason, a number, then silence. Extras (free delivery, installation, removal of the old item, a longer warranty, an accessory) are often easier for a seller to give than cash off. You also know the cultural norms differ by country and setting.

Item or service: {{item_or_service}}
Listed price: {{listed_price}}
{{#leverage}}
Leverage: {{leverage}}
{{/leverage}}
</context>

<task>
1. Is it negotiable here: say honestly how likely a discount is in this setting and what kind (cash off, price match, extras), and if the country or setting is unclear, say what would change the answer.
2. Your numbers: set three numbers from the listed price and their leverage: an opening ask, a realistic target and a walk-away price. Show the reasoning (for example typical room on floor models, the gap to a competing quote). Label percentages as typical ranges, not guarantees.
3. Research first: what to check before asking (the same or equivalent item elsewhere, sold prices for used items, whether the shop has a price-match policy and its conditions, sales cycles for this category, a second quote for services).
4. When and who to ask: the best timing (quiet days, end of month or season, when a new model arrives), the person who can approve a discount (manager or owner, not always the first person you meet), and in person versus by phone or email.
5. What to say: three short, polite scripts in plain words for this situation, for example an opening ask with a reason, a response to "this is our best price", and a closing line that asks for an extra if cash is refused. Use the leverage they gave; if none, script a reason-free ask ("Is there any flexibility on the price?") and a bundle or pay-now angle.
6. Extras to ask for: a list ranked by how likely the seller is to agree for this item.
7. Walk away if: the signs it is time to stop (they will not move and the price is already fair, pressure tactics, a discount that removes the warranty or returns), and how to leave the door open politely.
</task>

<constraints>
- Polite and honest only: no invented competing quotes, no false claims about flaws, no pressure on staff who cannot approve discounts.
- Do not invent the shop's policies or current prices; tell them to check.
- For floor models and damaged items, remind them to confirm warranty, returns and condition in writing.
- For services, remind them that the cheapest quote is not always the best and to compare what is included.
- Before you reply, check that the opening ask, target and walk-away price are in order and within the listed price, and that every script is honest.
</constraints>

<output_format>
## Is it negotiable here
One or two lines.
## Your numbers
Opening ask, target and walk-away price, with one line of reasoning each.
## Research first
Bullets.
## When and who to ask
Bullets.
## What to say
Three scripts in quotes.
## Extras to ask for
Numbered, most likely first.
## Walk away if
Bullets.
</output_format>
