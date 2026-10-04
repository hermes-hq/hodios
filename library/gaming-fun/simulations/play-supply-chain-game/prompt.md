---
schema: 1
id: play-supply-chain-game
kind: prompt
title: Play the beer distribution game
description: Runs a beer-game style supply chain where the player orders stock as one link with delayed information, then reveals the bullwhip effect and what would have smoothed it.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, operations-manager, manager]
subject: [economics]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [beer-game, bullwhip-effect, systems-thinking, inventory, operations-class]
args:
  - name: role
    description: The link of the chain the player runs; the other three are played by the game.
    type: enum
    enum: [retailer, wholesaler, distributor, factory]
    default: retailer
  - name: weeks
    description: Number of weekly turns.
    type: number
    default: 20
  - name: demand_pattern
    description: Customer demand at the retailer. Its pattern is never announced; a retailer sees each week's customer order as it arrives, the other links never see it. step = 4 cases a week, then 8 from week 5; seasonal = a slow wave; random = noisy around a stable mean.
    type: enum
    enum: [step, seasonal, random]
    default: step
  - name: debrief_depth
    description: short = results, the bullwhip chart and three lessons; full = also the order history of every link, the causes and the remedies.
    type: enum
    enum: [short, full]
    default: full
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run the classic beer distribution game, a systems-thinking exercise used in operations and management classes. A four-link chain (retailer, wholesaler, distributor, factory) moves cases of beer from the factory to customers. Each link sees only its own inventory, incoming orders and incoming shipments, and orders and shipments take time to travel. The famous result is the bullwhip effect: small changes in customer demand become huge swings in orders and inventory upstream, even when every player acts sensibly. You run the rules and the other three links.

Player's role: {{role}}
Weeks: {{weeks}}
Demand pattern: {{demand_pattern}}
Debrief: {{debrief_depth}}
</context>

<task>
1. Explain the rules in a short block: each week every link receives shipments, receives an order from downstream, ships what it can (unfilled orders become backlog), then places an order upstream. Orders take two weeks to reach the next link; shipments take two weeks to arrive. The factory schedules production with a two-week delay. Costs: 0.50 per case in inventory per week, 1.00 per case of backlog per week. The goal is the lowest total cost for the whole chain.
2. Start every link in balance: inventory 12, 4 cases in each shipment slot, 4 cases in each order slot, last order 4. Customer demand follows {{demand_pattern}}. Never announce the pattern or any future week's demand; if the player is the retailer, their incoming order each week is that week's customer demand, shown as it arrives.
3. Play the other links the way people typically play: they react to recent orders, under-count stock already on the way, and over-order after a shortage. Keep their rule consistent and private.
4. Each week, show the player only what their link would see: incoming shipment, incoming order, inventory or backlog, shipped quantity, cost this week and total cost. Then ask for their order. An order is a whole number of zero or more. If the player asks a rules question, answer it in one or two lines and ask for the order again without advancing the week. HISTORY prints the player's own past weeks (orders placed, shipments received, inventory, backlog), which a real player would have on their own sheet; anything else is not an order, so ask again.
5. Keep the full record for every link and week: orders placed, inventory, backlog and cost.
6. After week {{weeks}}, reveal customer demand and debrief at the chosen depth: total cost per link and for the chain; a text chart of orders per link over time showing the amplification; on full, the complete order history table, why the bullwhip happened (delays, the supply line people forget, overreaction to backlog, no shared information), and remedies (sharing point-of-sale data, shorter lead times, ordering rules that count stock on the way, smaller and steadier orders).
</task>

<constraints>
- Follow the rules exactly; never adjust shipments or orders to help or hurt the player.
- Never reveal the demand pattern, future demand or other links' orders and stock before the debrief. Stock already in transit to the player is not shown either; keeping track of it is part of the game.
- Keep each week's report to the player's own numbers and one line of flavour at most.
- Before each week, check that the player's inventory equals last week's inventory plus the shipment received minus cases shipped, and that backlog is carried correctly.
</constraints>

<output_format>
Each week, one compact block:
[Week n of {{weeks}} | {{role}}]
Received shipment: n · Incoming order: n · Shipped: n · Inventory: n · Backlog: n · Cost this week: x · Total cost: x
Your order upstream?
Debrief: a cost table by link, the chart in a fenced text block, then (on full) the history table with columns Week, Customer, Retailer, Wholesaler, Distributor, Factory orders, and sections Why it happened and What would have smoothed it.
</output_format>
