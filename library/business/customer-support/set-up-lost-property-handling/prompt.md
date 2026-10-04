---
schema: 1
id: set-up-lost-property-handling
kind: prompt
title: Set up lost property handling
description: Sets up lost property handling for a hotel, venue, gym or bus company - logging, storage, holding periods, valuables and ID, finding owners, returns and disposal - with reply templates.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, build]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [text]
output: [checklist, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lost-property, lost-and-found, valuables, item-log, returns-by-post]
pairs_with:
  prompts: [write-support-reply, write-opening-closing-checklist]
args:
  - name: venue
    description: Your venue or service - type (hotel, theatre, gym, coach or bus company, event site), number of sites or vehicles, who finds items (cleaners, drivers, ushers), storage you have (safe, locked cupboard), and how customers contact you.
    type: text
    required: true
  - name: volume
    description: Roughly how many items you find, for example "5 a week" or "200 after each festival".
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Categories and handling, Log fields, Storage and holding periods, Finding the owner, Returns, Disposal, Reply templates, Check locally]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up lost property handling for a venue or transport operator. Done casually, lost property creates real risk: a missing phone or wallet becomes an accusation against staff, ID documents and bank cards sit in a drawer for months, and customers chase by phone with no way to find their item. Good systems are boring and consistent: every item is logged on the day with a reference number, valuables are handled by two people and locked away, holding periods are set by category, owners are matched by description rather than by asking "is this yours?", and everything left is disposed of on a fixed date with a record.

Volume: {{volume}}
</context>

<task>
<venue>
{{venue}}
</venue>

1. Categories and handling: define at least these, with who may handle them and where they go:
   - High value: phones, laptops, wallets and purses, cash, jewellery, watches, keys with fobs. Logged and sealed in a bag by two staff, kept in a safe or locked cupboard.
   - Identity and payment documents: passports, ID cards, driving licences, bank cards.
   - Medicines and medical items (inhalers, insulin, glasses, hearing aids): try to contact the owner the same day.
   - Everyday items: clothing, umbrellas, bottles, books, toys.
   - Perishable or unsafe: food, open drinks, sharp items, anything suspicious (follow the venue's security procedure).
2. Log fields: reference number, date and time found, exact place (room, seat, vehicle and route), finder, category, description (colour, brand, distinctive marks; for wallets, the contents counted by two people), storage location, status, and owner details when claimed.
3. Storage and holding periods: proposed periods by category as starting points (for example perishables same day, everyday items 30 days, high value 90 days), labelled for local checking; a weekly review of the log.
4. Finding the owner: check booking or ticket records for the place and time; for phones, never unlock or look through them, but answer if it rings or use the emergency or owner information shown on the lock screen; for ID and bank cards, the route set by local rules (return to the issuer, bank or police). Match claims by asking the customer to describe the item and where they lost it before showing anything.
5. Returns: collection with ID matching the claim and a signature; postage only after the owner pays or provides a prepaid label, sent tracked; record how and when it left.
6. Disposal: on the set date, a two-person check, then donate, recycle or destroy (wipe or destroy data devices; never sell them unwiped), with a disposal record.
7. Reply templates: enquiry received and item found, enquiry received and not found (with what happens if it turns up), postage request, and a final notice before disposal.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given. Do not state legal holding periods or rules for finders, ID documents or unclaimed property as fact; propose periods as starting points and list them under Check locally.
- Never tell staff to keep found cash or items, or to share an owner's details with someone else who asks.
- Templates ask the customer to describe the item; they never list what was found in a way that lets anyone claim it.
- Keep the log's personal data to what is needed, and set how long claimed records are kept.
</constraints>

<output_format>
## Categories and handling
Table: category | examples | who handles | storage | first action.

## Log fields
A field list ready to paste into a spreadsheet header.

## Storage and holding periods
Table: category | proposed holding period | then.

## Finding the owner
Numbered steps.

## Returns
Bullets for collection and postage.

## Disposal
Bullets.

## Reply templates
Four short templates with [placeholders].

## Check locally
Bullets: rules to confirm and who to ask.
</output_format>
