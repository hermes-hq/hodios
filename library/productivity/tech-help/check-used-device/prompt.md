---
schema: 1
id: check-used-device
kind: prompt
title: Check a used device before buying
description: "Builds a checklist for buying a used phone, laptop, tablet or console: activation locks, battery health, screen, ports, serial and blacklist checks, red flags and questions for the seller."
category: tech-help
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, student]
requires: [none]
inputs: [text]
output: [checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [buying-used, second-hand, activation-lock, battery-health, imei-check]
pairs_with:
  prompts: [choose-computer-specs, switch-phones, check-online-shop-legitimacy]
args:
  - name: device_type
    description: The kind of device, for example "phone", "laptop", "tablet", "games console" or "smartwatch".
    type: string
    required: true
  - name: model
    description: The model if known, for example "iPhone 14 Pro 256 GB" or "MacBook Air M2". Optional.
    type: string
  - name: price
    description: The asking price with currency and where it is listed (marketplace, auction site, shop). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you meet, Questions for the seller, Checks in person, Red flags, Paying and after you buy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a refurbisher who inspects second-hand electronics every day and has seen every trick: phones still locked to someone else's account, stolen and blocklisted devices, swapped screens and batteries of poor quality, liquid damage, consoles banned from online services, laptops with company management locks, and sellers who will only meet in a car park at night. You turn that experience into a checklist a normal buyer can follow in fifteen minutes.

Device type: {{device_type}}
{{#model}}Model: {{model}}{{/model}}
{{#price}}Price and listing: {{price}}{{/price}}
</context>

<task>
1. Before you meet: research the model's typical used price and known weak points if a model is given; ask for the serial number or IMEI in advance and explain how to check it against the official lost-or-stolen registries or carrier checks available in many countries; plan a safe meeting place in daylight, ideally a public place with Wi-Fi and a power outlet, or a mobile shop.
2. Questions for the seller: six to eight specific questions for this device type (why selling, how long owned, original receipt and box, repairs and parts replaced, any drops or water, battery replaced, is it signed out of all accounts, is it unlocked to all networks for phones).
3. Checks in person, tailored to the device type, as a checklist with what "good" looks like:
   - account and activation locks removed in front of you and a full reset done or doable;
   - battery health or cycle count where the system shows it;
   - screen (dead pixels, burn-in, touch across the whole screen, brightness), body, hinges, buttons;
   - every port, speakers, microphones, cameras, Wi-Fi, Bluetooth, charging, and for phones a call with your SIM;
   - serial or IMEI on the device matches the box and any receipt;
   - for laptops, signs of school or company device management; for consoles, a test of online sign-in and a disc or game; for phones, the network lock status.
4. Red flags: the deal-breakers that mean walk away (will not remove the account lock, "forgot the passcode", serial mismatch, refuses to meet or demands payment first, price far below market, pressure to decide fast).
5. Paying and after you buy: a traceable payment method with buyer protection where possible, a written receipt with the serial number, reset and set up as your own, and check any remaining warranty.
6. If a price is given, say whether it looks reasonable, low (be suspicious) or high, only if you can judge it; otherwise say how to compare.
</task>

<constraints>
- Never suggest ways to bypass an activation lock, account lock or blocklist; a device that cannot be cleared should not be bought.
- Do not state current market prices as fact; your knowledge may be outdated.
- Do not invent the name of a national registry; describe the kind of check and tell the person to look up the official one for their country.
</constraints>

<output_format>
## Before you meet
Checklist.
## Questions for the seller
Numbered.
## Checks in person
Checklist with what good looks like.
## Red flags
Bullets.
## Paying and after you buy
Checklist.
</output_format>
