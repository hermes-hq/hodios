---
schema: 1
id: write-household-operations-manual
kind: prompt
title: Write a household operations manual
description: Writes a household manual covering bills, where accounts are kept, appliances, contractors, emergencies and routines, so a partner, relative or carer could step in and run the home.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, parent]
requires: [none]
inputs: [text, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [household-manual, emergency-planning, bus-factor, caregiving, home-admin, contingency]
pairs_with:
  prompts: [set-up-life-admin-calendar, plan-digital-legacy, build-reusable-checklist, secure-personal-accounts]
args:
  - name: household
    description: How the home runs today, as messy as you like - who lives there, bills and who pays them, where documents are, appliances and their quirks, people you call for repairs, pets, children's routines, medical needs, anything only you know.
    type: text
    required: true
  - name: sections
    description: The parts that matter most to you or anything to leave out, for example "focus on the kids' routines and the boiler; skip the car". Optional.
    type: text
  - name: privacy_level
    description: Who will read it. shared-with-partner = a working manual for another adult in the home; for-emergencies = for someone stepping in cold (a relative, friend or carer), with less personal detail and more pointers to who holds what.
    type: enum
    enum: [shared-with-partner, for-emergencies]
    default: shared-with-partner
output_contract:
  format: markdown
  sections: [Read this first, Emergencies, Money and bills, Accounts and documents, Home and appliances, People and pets, Routines, Contacts, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help households write down how the home actually runs, so that if the person who usually handles things is ill, away, in hospital or gone, someone else can keep the lights on, the bills paid, the children fed and the pets cared for. A good manual is short, organised by what someone needs in the moment, and points to where things are rather than copying sensitive data into it. It is a living document, reviewed once or twice a year.

How the home runs: {{household}}
{{#sections}}
Priorities and exclusions: {{sections}}
{{/sections}}
Reader: {{privacy_level}}
</context>

<task>
1. If the description is too thin to write a useful manual (for example it does not say who lives there or how bills are paid), ask up to four questions in one message and stop.
2. Sort everything in the description into the manual's sections. Put what someone needs in the first hour of an emergency at the front.
3. Read this first: one page on the essentials - the three things that must not be missed this month, who to call first, and where the rest of the information lives.
4. Emergencies: how to turn off water, gas and electricity (where the stopcock, meter and fuse box are), what to do in a leak, power cut, break-in or medical emergency in this home, and who has spare keys.
5. Money and bills: each bill or payment with what it is for, when it is paid, how (direct debit, card, manual transfer) and from which account, described by a nickname such as "joint account", never by number.
6. Accounts and documents: a list of important accounts and where their login lives, as a pointer ("in the password manager under Utilities"; "the password manager's emergency access is set up for [name]"). Say where originals are kept (passports, birth certificates, insurance, wills or powers of attorney if they exist).
7. Home and appliances: boiler and heating, washing machine, alarms, bins, anything with a quirk ("the dishwasher needs the door pushed until it clicks"), servicing dates and where manuals are.
8. People and pets: children's routines, school and activity contacts, who can collect them; dependants' care needs and where medication information is kept; pets' food, walks, vet and insurance. Keep medical information to what a stand-in needs and point to where details are held.
9. Routines: daily, weekly, monthly and seasonal jobs as short checklists.
10. Contacts: tradespeople, neighbours, family, doctor, school, vet, landlord or managing agent, with placeholders for numbers if not given.
11. Gaps to fill: everything the description left out that the reader would need, as a checklist.
12. Adjust to {{privacy_level}}: for shared-with-partner, write practical working notes; for for-emergencies, write for someone who does not know the home, keep personal detail minimal, and add who holds sensitive information (a trusted person, the password manager's emergency access, a sealed envelope with a solicitor).
13. Before answering, scan the whole manual for passwords, PINs, security answers, full account, card or ID numbers. Remove any you find, replace them with a pointer, and add a note at the top saying what you removed and why.
</task>

<constraints>
- Never store passwords, PINs, security answers or full account, card or ID numbers in the manual, even if they were given. Pointers only.
- Use only the facts given. Mark anything missing as [to fill] rather than inventing names, dates, numbers or locations.
- Legal arrangements (wills, powers of attorney, guardianship) are mentioned only as where documents are and that they are worth having; do not advise on them.
- Plain, friendly language that a stressed person can follow. Short checklists beat paragraphs.
- If the requested sections leave something safety-critical out (for example how to turn off gas), include a short version anyway and say why.
</constraints>

<output_format>
A Markdown document titled "How our home runs" with the date and "review by [date]".
## Read this first
## Emergencies
## Money and bills
Table: Bill | What for | When | How paid | From.
## Accounts and documents
Table: Account or document | Where to find access or the original.
## Home and appliances
## People and pets
## Routines
Checklists by daily, weekly, monthly and seasonal.
## Contacts
Table: Who | For what | Number or [to fill].
## Gaps to fill
Checklist.
</output_format>
