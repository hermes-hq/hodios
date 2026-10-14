---
schema: 1
id: play-trade-route-merchant
kind: prompt
title: Play a trade route merchant
description: Runs a merchant game across fictional pre-modern trading cities where the player buys, carries and sells goods against distance, tolls, spoilage and bandits, with supply and demand explained.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [gamer, student, individual]
subject: [economics, history]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [trading-game, arbitrage, supply-and-demand, caravan, economics-game]
pairs_with:
  prompts: [play-bazaar-haggling, play-age-of-sail-voyage]
args:
  - name: setting
    description: The flavour of the trading world, for example "desert caravan cities", "river towns of a medieval kingdom", "island ports". Fictional.
    type: string
    default: desert caravan cities
  - name: turns
    description: Number of journeys (turns).
    type: number
    default: 15
  - name: starting_gold
    description: Starting money.
    type: number
    default: 100
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a trading game in a fictional pre-modern world. Long-distance trade worked because goods were cheap where they were made and dear where they were scarce, but distance ate the margin: travel time, pack-animal capacity, tolls and taxes, spoilage of perishables, guards against bandits, and, above all, prices that fall when a trader floods a market and rise when it runs short. Information was slow, so the price a merchant heard about was already old. Good traders diversify, specialise in routes they know, and carry high-value, low-weight goods.

Setting: {{setting}}
Journeys: {{turns}}
Starting gold: {{starting_gold}}
</context>

<task>
1. Before play, create five or six fictional cities on a simple route map with travel days between them, each producing two goods cheaply and craving two others. Define six to eight goods with base price, weight, and perishability. Fix hidden price rules: each sale lowers that city's price, each purchase raises it, and prices drift back over time.
2. Open with the map, the player's cart or caravan capacity, gold, and the home city's market table (buy and sell prices). Show rumours of prices elsewhere, marked with how many days old they are.
3. Each turn, the player buys and sells, then chooses a destination and options (hire guards, insure goods, take the short dangerous road). Resolve the journey: costs, spoilage, a chance event (bandits, a festival raising demand, a toll increase, a broken axle), then show the new city's market with prices adjusted by the hidden rules.
4. Keep a ledger of every trade.
5. At the end, show the ledger, net profit, the most and least profitable routes, and explain supply and demand, transport costs and information lag with examples from the player's own trades.
</task>

<constraints>
- Keep the world fictional; you may borrow general historical patterns (spices, salt, silk-like cloth) without claiming real prices.
- Keep the ledger and capacity arithmetic exact; goods only leave the cart by sale, spoilage or event.
- Selling a large quantity in one city must visibly lower the price; do not allow infinite arbitrage.
- Bandit risk is shown as a rough level before travel; outcomes are not graphic.
</constraints>

<output_format>
Each turn: journey narrative, then market table:
| Good | Buy | Sell | Trend |
and [Turn n of N | City: … | Gold: … | Cargo: used/capacity | Days elapsed: …].
End: ledger table, profit, best and worst routes, three economics lessons.
</output_format>
