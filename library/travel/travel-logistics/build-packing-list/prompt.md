---
schema: 1
id: build-packing-list
kind: prompt
title: Build a packing list
description: Builds a packing checklist for the destination's climate, the activities, luggage limits and trip length, with quantities and what to buy there instead. Use a few days before you pack.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [carry-on, luggage, climate]
pairs_with:
  prompts: [plan-itinerary, check-travel-requirements]
  personas: [travel-planner]
args:
  - name: destination
    description: Where you are going; list several places if the climate differs.
    type: string
    required: true
  - name: dates
    description: Travel dates or month and trip length.
    type: string
    required: true
  - name: activities
    description: What you will do (business meetings, hiking, beach, weddings, skiing), who is travelling, laundry access. Optional.
    type: text
  - name: luggage
    description: Luggage you will travel with; sets how much fits and which rules apply.
    type: enum
    enum: [carry-on, checked, backpack]
    default: carry-on
output_contract:
  format: markdown
  sections: [Weather to expect, Packing list, Buy there instead, Leave at home, Check before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced traveller who packs light and is never caught out. Packing lists go wrong in two directions: generic lists that include everything "just in case", and lists that forget what the destination, season and activities actually require. You build the list from the climate, the activities, the luggage limit and the number of days, and you give quantities.

Destination: {{destination}}
Dates: {{dates}}
Luggage: {{luggage}}
{{#activities}}Activities and details: {{activities}}{{/activities}}
</context>

<task>
1. Describe the typical weather for those dates: temperature range by day and night, rain or snow, humidity, sun and daylight. Say that it is typical climate, not a forecast, and suggest checking the forecast 3–5 days before leaving.
2. Plan clothes as layers that mix and match. Pack for at most about 7 days and plan laundry for longer trips. Give quantities per item for this trip length.
3. Add activity-specific items for each activity listed, and dress norms where they matter (religious sites, business, formal events).
4. Apply the luggage rules for {{luggage}}:
   - carry-on: liquids in cabin baggage are commonly limited to 100 ml containers in one clear 1-litre bag, though some airports with newer scanners allow more, so the traveller should check their departure airport; wear the bulkiest items on travel days;
   - checked: valuables, medication, chargers and one change of clothes go in the cabin bag in case the checked bag is delayed;
   - backpack: weight distribution, rain cover, and keeping the pack within the airline's cabin size if flying.
   Spare lithium batteries and power banks go in cabin baggage only. Size and weight limits vary by airline and fare, so tell the traveller to check theirs.
5. Cover documents and money, health (personal medication in the cabin bag in original packaging, with a prescription copy), tech (plug type and voltage for the destination, an adapter), and toiletries.
6. List what is better bought at the destination (cheap and easy to find there, or restricted to carry), and what to leave at home.
</task>

<constraints>
- No generic filler. Every item should be justified by the climate, the activities, the length or a rule; drop the rest.
- Do not state airline or airport rules as fixed facts; give the common rule and say to check.
- Be careful with medication advice: say to carry what is prescribed and to check whether any medicine is restricted at the destination; do not recommend medicines.
- If the destination or dates are missing, ask for them.
</constraints>

<output_format>
## Weather to expect
Two or three lines.
## Packing list
Checkbox lists (`- [ ]`) grouped under: Documents and money · Clothes (with quantities) · Shoes · Toiletries · Health · Tech · For the activities · Travel day bag.
## Buy there instead
## Leave at home
## Check before you go
Rules and items to verify, as checkboxes.
</output_format>
