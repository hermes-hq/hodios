---
schema: 1
id: plan-long-distance-caregiving
kind: prompt
title: Plan long-distance caregiving
description: Plans support for a relative who lives far away, with a local network, information held centrally, check-ins that notice change, useful visits, remote tasks and an emergency plan.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [long-distance, ageing-parents, carers, check-ins, emergency-plan]
pairs_with:
  prompts: [build-care-rota, prepare-emergency-medical-summary, protect-relative-from-scams, choose-care-technology]
  personas: [eldercare-advisor]
args:
  - name: situation
    description: Who you are supporting, where they live and with whom, what they manage and struggle with, how far away you are (travel time, time zone, cost), who is nearby (neighbours, friends, other relatives, faith community), services already in place, and the country or countries.
    type: text
    required: true
  - name: constraints
    description: Your own work, family, budget and how often you can realistically visit. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The picture, Local network, Information to hold, Regular check-ins, Making visits count, What you can do from afar, When something goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people care for a relative from a distance, the way a care manager who works with families scattered across countries would. Distance carers often swing between guilt and crisis: everything seems fine on the phone ("I'm fine, love"), then a neighbour calls about a fall. What works: a small local network with clear roles and permission to call; one shared place for key information; check-ins designed to notice change, not just say hello; visits planned around assessments and appointments rather than only chores; and an agreed plan for emergencies including who can get in the house. Remote carers are often best placed to take on admin, research, money and coordination, which frees nearby helpers for hands-on tasks.

<situation>
{{situation}}
</situation>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. The picture: a short summary of what they manage, what is changing, the risks you can see from the description (falls, isolation, medicines, scams, driving, home upkeep), and what you do not know yet.
2. Local network: a table of possible local people and services (neighbour with a key, friend, faith or community group, GP practice or doctor, pharmacy, paid help, the relative's care team), with role, how often, and how to ask them. Blanks for names.
3. Information to hold: a checklist of what to have in one shared, secure place (contacts, medicines list, doctors, key safe or spare key, bank and bills, legal documents like power of attorney or local equivalent, insurance, passwords plan) and consent from the relative.
4. Regular check-ins: a rhythm of calls or video with questions that notice change (eating, sleep, getting out, mood, post piling up, mentions of new "friends" or offers), and what change should trigger a closer look.
5. Making visits count: a visit checklist (fridge and food, medicines, post and bills, house safety, mobility, mood, meeting local helpers, attending appointments) and planning visits around appointments or assessments.
6. What you can do from afar: remote tasks (online shopping, bill management with permission, booking appointments, researching services, coordinating siblings, video company).
7. When something goes wrong: who gets the first call, who can get into the house, hospital admission steps, how to get information (consent), travel funds, and when to consider more support or a move, with the relative's wishes central.
</task>

<constraints>
- Keep the relative in charge of their own life while they can decide; get their consent for sharing information and for access to accounts.
- Never invent services, names, numbers or legal rules; legal and financial documents vary by country, so say to check locally or with an advisor.
- Do not assume anyone has agreed to a role; mark every role for a named person as "to ask".
- If the situation describes someone unsafe now (not eating, falls, scams in progress, neglect), say what to do today before longer planning.
- Practical, compact, no guilt.
</constraints>

<output_format>
## The picture
## Local network
Table: Person or service | Role | How often | How to ask.
## Information to hold
## Regular check-ins
## Making visits count
## What you can do from afar
## When something goes wrong
</output_format>
