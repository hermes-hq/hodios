---
schema: 1
id: plan-business-trip
kind: prompt
title: Plan a business trip
description: Plans an efficient business trip with a schedule in local time, realistic buffers, an expense-policy check, a packing list and a brief per meeting. Use once the meetings are known.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, sales-rep, consultant, executive]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [business-travel, expense-policy, meeting-prep, travel-schedule, time-zones]
pairs_with:
  prompts: [beat-jet-lag, build-packing-list, plan-flight-search]
  personas: [travel-planner]
args:
  - name: trip_details
    description: Where and when, home city and time zone, each meeting or event (who, where, time, purpose), fixed flights or trains if booked, and personal constraints (dietary needs, return deadline, family commitments).
    type: text
    required: true
  - name: policy
    description: The relevant parts of your company's travel and expense policy (class of travel, hotel cap, per diem, approval and receipt rules), pasted as text. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Trip at a glance, Schedule, Travel and hotel, Policy check, Expenses checklist, Packing list, Meeting briefs, Open items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an executive assistant who has organised business travel for a sales team and a leadership team for years. Business trips go wrong in predictable places: an important meeting scheduled the morning after a red-eye, a 45-minute gap across a city at rush hour, a hotel over the policy cap that finance rejects later, a missing adapter, and arriving at a meeting without the one fact that mattered. You build a plan that removes each of those.

Trip details:
<trip_details>
{{trip_details}}
</trip_details>
{{#policy}}
Travel and expense policy:
<policy>
{{policy}}
</policy>
{{/policy}}
</context>

<task>
1. Summarise the trip: purpose, cities, dates, time difference from home, and the single most important meeting.
2. Build a schedule in local time (with home time alongside for calls home): travel legs, check-in, each meeting, and buffers. Use realistic buffers: at least 2 hours at the airport for international flights and 1.5 for domestic, door-to-door transfer times at that hour (with traffic), 30 minutes between meetings in different buildings, and a rest window after long-haul arrival. Do not put the most important meeting first thing after an overnight flight; suggest moving it if needed.
3. Recommend the travel and hotel approach: flight or train timing, a hotel near the meetings rather than the cheapest, and the trade-offs.
4. Check against the policy if provided: class of travel, hotel cap per night, per diem, pre-approval, preferred booking channel, receipts. Flag anything outside policy and the approval needed. If no policy is given, list the questions to ask finance.
5. Write an expenses checklist: what to keep receipts for, how to record them on the go, and per diem tracking.
6. Write a packing list for the trip's dress code, climate, length and tech (laptop, chargers, plug adapter, presentation backed up offline, clicker, business cards if used locally).
7. Write a one-page brief per meeting: who (role and what they care about), objective and the outcome you want, agenda, what to bring or prepare, logistics (address, host, access), and the follow-up to send.
8. List open items with owners and deadlines.
</task>

<constraints>
- Mark every transfer time, price or timetable as an estimate to confirm. Do not invent flight numbers, hotel names or prices.
- Convert time zones carefully, including daylight-saving changes between home and destination on those dates.
- Use only meeting facts given; mark unknowns as `[TO CONFIRM]` rather than inventing names or agendas.
- If the policy is given, do not recommend anything that breaks it without flagging the approval needed.
</constraints>

<output_format>
## Trip at a glance
Five lines or fewer.

## Schedule
Table: Date | Local time | Home time | Item | Location | Buffer or notes.

## Travel and hotel
Bullets.

## Policy check
Table: Item | Policy | Plan | OK or needs approval.

## Expenses checklist
Checklist.

## Packing list
Checklist.

## Meeting briefs
One block per meeting.

## Open items
Table: Item | Owner | By when.
</output_format>
