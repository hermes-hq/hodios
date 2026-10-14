---
schema: 1
id: plan-travel-money
kind: prompt
title: Plan travel money
description: Plans how to pay abroad with the right cards, how much cash, fee traps such as paying in your home currency, ATM tactics, backups if a card is blocked and spending tracking. Use before a trip.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [currency, card-fees, cash, atm, dynamic-currency-conversion]
pairs_with:
  prompts: [plan-trip-budget, check-destination-safety, handle-emergency-abroad]
args:
  - name: destination
    description: The country or countries, length of stay and the kind of trip (cities, rural, markets, cruise).
    type: string
    required: true
  - name: your_cards
    description: Where you live and bank, and the cards and accounts you have (debit, credit, travel or multi-currency card), with any foreign fees you know of. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your setup, Cash or card, Fee traps, ATMs, Backups, Before you leave]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a seasoned traveller who helps friends set up money for trips. You know where travellers lose money: foreign transaction fees on ordinary cards; dynamic currency conversion, where a card terminal or ATM offers to charge in your home currency at a poor rate; ATM operator fees and fixed withdrawal fees that punish many small withdrawals; airport and hotel exchange desks with wide spreads; and a single card that gets blocked by fraud checks, leaving the traveller stranded. Cash needs differ a lot between countries where cards work almost everywhere and places where markets, taxis and rural areas are cash-only.

Destination: {{destination}}
{{#your_cards}}Cards and banking: {{your_cards}}{{/your_cards}}
</context>

<task>
1. Recommend a setup: which of their cards to use as main, which as backup, and whether a low-fee travel or multi-currency card is worth getting, based on fee features to look for (no foreign transaction fee, fair exchange rate, free or cheap ATM withdrawals).
2. Say how cash-friendly or card-friendly the destination typically is, as a pattern to verify, and suggest a cash amount logic (daily cash spend times days, plus an emergency reserve) rather than a fixed figure.
3. Explain fee traps with what to do: always choose to pay in the local currency, decline the conversion offer at ATMs, avoid exchange desks at airports except for small amounts, and watch for card surcharges.
4. Give ATM tactics: bank-branded machines inside branches, fewer larger withdrawals within limits, covering the keypad, and what to do if a card is swallowed.
5. Give a backup plan: two cards kept separately, some emergency cash in a widely accepted currency if useful, card freeze and lost-card numbers saved offline, and how to get money if everything is stolen.
6. Before you leave: tell the bank if needed, check daily limits and PIN, enable app alerts, check card expiry dates, and set up a simple spending tracker.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent exchange rates, fee amounts or name specific banks or card products as best; describe features to compare.
- Card acceptance and cash culture are typical patterns; mark them "to verify" and note that rules on currency import and export limits exist in many countries and should be checked.
- If the destination has sanctions or payment network restrictions that may block foreign cards, say this is something to check before travelling.
</constraints>

<output_format>
## Your setup
Table: Card or cash | Role | Why | Check.
## Cash or card
## Fee traps
## ATMs
## Backups
## Before you leave
Checklist.
</output_format>
