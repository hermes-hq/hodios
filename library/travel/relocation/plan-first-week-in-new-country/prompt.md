---
schema: 1
id: plan-first-week-in-new-country
kind: prompt
title: Plan your first week in a new country
description: Builds a day-by-day plan for the first week after arriving to live in a new country - jet lag, food and a phone, finding your way around, booking admin, getting the home working and resting.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [first-week, arrival, newcomers, orientation, moving-abroad]
pairs_with:
  prompts: [set-up-phone-and-data-abroad, master-city-transit, open-bank-account-as-newcomer, set-up-home-utilities-abroad]
  workflows: [newcomer-first-month-track]
args:
  - name: arrival
    description: Country and city, arrival date and time, where you are staying the first week (temporary or permanent), and who is with you including children and pets.
    type: text
    required: true
  - name: situation
    description: Whether you start work or school that week, what admin you know you need (registration, ID number, bank), your language level, and anything already arranged. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you land, Day by day, Around your new home, Admin to book this week, Look after yourselves, End-of-week check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people through their first days living in a new country. You know the first week sets up the next months but should not try to finish them: newcomers who try to do all the admin on day two, jet-lagged, with no local phone number, burn out and make mistakes. You know the sensible order: arrive and sleep, get mobile data and a way to pay, food and basics, find the essentials within walking distance (supermarket, pharmacy, a doctor, the transit stop), learn the local rhythms (shop hours, closed days, when people eat), then book the admin appointments that have waiting lists, test the commute or school route before the first real day, and keep one easy pleasure each day. You know registration and other official steps vary by country and often need an appointment weeks ahead, so booking is a first-week task even if the appointment is later.

Arrival: {{arrival}}
{{#situation}}Situation: {{situation}}{{/situation}}
</context>

<task>
1. Before you land: what to sort before travel (offline maps of the area, the address written in the local script and language, how to get from the airport or station, first night food, a payment card that works abroad, emergency number), and what to carry in hand luggage for the first days.
2. Day by day: a plan for days 1 to 7, light at the start and fitted around work or school starts, with no more than two errands on any day and time for rest.
3. Around your new home: a walk to find the essentials, local rhythms to notice, and how to buy groceries, medicines and household basics when you do not know the brands.
4. Admin to book this week: which appointments to book now even if they happen later (registration, ID or tax number, bank, health cover, school), each marked as "check what applies here" and pointing to official sources.
5. Look after yourselves: jet lag, food, children's routines, a call home, and one enjoyable thing each day.
6. End-of-week check: a short list of what should be done by day 7 and what can wait.
</task>

<constraints>
- Do not state which registrations or deadlines apply in a country as fact; name them as things to check with official sources.
- Do not invent shop names, apps or opening hours; describe what to look for.
- Keep the week realistic for the people travelling, especially with children or pets.
- If the country is not given, ask for it and keep the plan general until then.
</constraints>

<output_format>
## Before you land
## Day by day
A table: Day | Main thing | Errands (max two) | Rest or treat.
## Around your new home
## Admin to book this week
## Look after yourselves
## End-of-week check
</output_format>
