---
schema: 1
id: handle-haggling-at-stall
kind: prompt
title: Handle haggling at a stall
description: Prepares a market stall or car-boot seller for haggling, with floor prices from costs, bundle and end-of-day offers instead of straight discounts, short phrases for common asks and warm refusals.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
subject: [retail]
requires: [none]
inputs: [text]
output: [table, script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [market-stall, craft-fair, car-boot, floor-price, bundle-offers, bargaining]
pairs_with:
  prompts: [pitch-to-stockists, practise-shop-floor-selling]
  personas: [small-business-selling-mentor]
args:
  - name: products_and_costs
    description: Each product or product group with its sticker price and what it costs you (materials, stock price, pitch fee share, card fees). For second-hand goods, what you paid or what you would accept. Rough notes are fine.
    type: text
    required: true
  - name: market_type
    description: Where you sell and how buyers behave there (for example "Sunday car boot, everyone haggles", "Christmas craft fair, few haggle", "weekly flea market with dealers").
    type: string
    default: general market
output_contract:
  format: markdown
  sections: [Price floors, Offers instead of discounts, Phrases, Saying no warmly, Stall checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who sells at a market stall, craft fair, flea market or car boot get ready for buyers who ask "what's your best price?". Sellers lose money in three ways: they have no floor price in their head so they agree to whatever is asked, they discount handmade goods that do not need it and train regulars to always ask, or they get flustered and sound rude. Experienced stallholders decide floors before the day, offer more for the same money (bundles, an extra small item, free wrapping) rather than less money for the same item, keep end-of-day deals for perishables and bulky items, and have three or four short, friendly phrases ready.

Market: {{market_type}}
</context>

<task>
<products_and_costs>
{{products_and_costs}}
</products_and_costs>

1. For each product or group, calculate the cost per item including a share of the pitch fee (pitch fee divided by the items the seller expects to sell that day; if that number is not given, write it as [items sold] and ask) and card fees where given, then set a floor: the lowest price you will take. For handmade goods, the floor should cover materials, the making time at the seller's hourly rate and the pitch share; if no hourly rate is given, show the floor as materials plus pitch share plus "[your hourly rate] x making time", give a worked figure only as an example, and ask for the rate. For resale goods, use cost or the minimum the seller named. Show the arithmetic.
2. Set a "first move" for each: what to offer when someone asks (often a bundle or small extra, not a cut), and a "last move" just above the floor.
3. Decide which items are never discounted (bestsellers, items selling well at full price), which can be bundled, and which get an end-of-day price (perishables, bulky items you do not want to carry home), with the time it starts.
4. Adjust to the market type: where haggling is expected, price with a small margin for it; where it is not, hold price and use bundles only.
5. Write short phrases for the common asks: "what's your best price?", "I'll give you [X]" well below the floor, "it's cheaper online", "I'll come back later", the dealer who wants a bulk deal, and a regular asking for a discount.
6. Write how to say no warmly and keep the buyer.
</task>

<constraints>
- Use only the costs and prices given. If a cost is missing for an item, mark its floor [X] and ask for it; do not guess.
- Arithmetic must be shown and correct.
- Phrases are short (under 15 words), friendly and honest. No fake claims ("last one" when it is not, "someone else wants it").
- Never set a floor below cost unless the user says the goal is clearing stock, and say so plainly when it is.
- If no products are given, ask for them and stop.
</constraints>

<output_format>
## Price floors
Table: Item | Sticker price | Cost per item | Floor | First move | Last move | Never discount? (yes/no). Arithmetic notes below.

## Offers instead of discounts
Bundles with prices, small extras, and the end-of-day list with start time and price.

## Phrases
Table: Buyer says | You say.

## Saying no warmly
Three lines that hold the price and keep the conversation going.

## Stall checklist
Up to eight bullets: floor list taped behind the stall, a small bag of extras for sweeteners, change and card reader, a sign for bundles, and similar.
</output_format>
