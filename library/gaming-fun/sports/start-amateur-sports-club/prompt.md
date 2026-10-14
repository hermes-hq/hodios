---
schema: 1
id: start-amateur-sports-club
kind: prompt
title: Start an amateur sports club
description: Plans setting up a community sports club - purpose, affiliation, a simple constitution and committee, insurance and safeguarding to check, venue, fees and a first-season launch.
category: sports
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [club-setup, community-sport, club-committee, affiliation, grassroots-sport, volunteer-organiser]
pairs_with:
  prompts: [plan-team-season]
  workflows: [amateur-league-season-track]
args:
  - name: sport
    description: The sport and what kind of club, for example "social adult netball club", "junior cricket section", "running club".
    type: string
    required: true
  - name: location
    description: Country and region, so you know which governing bodies, legal forms and checks to look into.
    type: string
    required: true
  - name: situation
    description: Who is involved, expected members, ages, venues you have in mind, money available and your timeline.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Purpose and shape, Affiliation and league entry, Structure and committee, Must-check items, Money, Venue and kit, First season launch, Questions to ask locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people start community and amateur sports clubs. Most new clubs that fail do so for avoidable reasons: one founder doing everything, no written rules on money and decisions, no insurance, no venue booked long term, or juniors taken on before safeguarding is in place. The usual path is to agree a purpose and who the club is for, affiliate with the sport's governing body (often required for league entry, insurance and coaching courses), adopt a short constitution with a small committee (chair, secretary, treasurer, and a welfare officer if there are under-18s or vulnerable adults), open a club bank account needing two signatories, sort public liability insurance, and book a venue. Legal forms, tax status, background checks and governing bodies differ by country.

Sport: {{sport}}

Location: {{location}}

Situation:
{{situation}}
</context>

<task>
1. Purpose and shape: who the club is for, what it offers (social, competitive, junior, mixed), and a realistic first-year size.
2. Affiliation and league entry: what kind of body to affiliate with for this sport in this country, what affiliation usually gives, and league entry deadlines to check. Name bodies only if you are confident they exist; otherwise describe how to find them.
3. Structure and committee: whether to start as an unincorporated association or another form (with the trade-offs to check locally), the outline of a simple constitution, committee roles and a rule that no single person controls money.
4. Must-check items: insurance, safeguarding policy and background checks for anyone working with children, first aid, data protection for member records, and any coach qualifications the league requires.
5. Money: a first-year budget with typical cost lines (affiliation, insurance, venue, kit, equipment, league fees) as placeholders to price, a fee structure, and simple bookkeeping.
6. Venue and kit: what to book, how far ahead, and what to borrow or buy second-hand.
7. First season launch: a dated plan from now to the first match or session, including recruiting members and volunteers.
8. Questions to ask locally: a list for the governing body, council or sports development office.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state specific laws, tax rules, prices or organisation names as fact unless you are confident; mark them as items to confirm for {{location}}.
- Treat safeguarding as required before any under-18s join, not as a later improvement.
- Say when to ask the governing body, the local council or sports development office, or a qualified legal or tax adviser.
- Keep the structure light enough for volunteers.
</constraints>

<output_format>
## Purpose and shape
## Affiliation and league entry
## Structure and committee
## Must-check items
Checklist.
## Money
Table: Cost line | Estimate to confirm | When due.
## Venue and kit
## First season launch
Table: By when | Task | Who.
## Questions to ask locally
</output_format>
