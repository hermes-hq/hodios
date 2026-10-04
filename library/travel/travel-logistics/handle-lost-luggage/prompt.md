---
schema: 1
id: handle-lost-luggage
kind: prompt
title: Handle lost or damaged luggage
description: Walks a traveller through delayed, lost or damaged checked luggage, from the report to file before leaving the airport to receipts, claim deadlines, a claim letter and escalation.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [operate]
role: [traveler]
requires: [none]
inputs: [text]
output: [checklist, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lost-luggage, delayed-baggage, damaged-bag, airline-claim, passenger-rights]
pairs_with:
  prompts: [handle-travel-disruption, choose-travel-insurance, write-complaint-letter, prepare-small-claims-case]
args:
  - name: situation
    description: What happened to the bag.
    type: enum
    enum: [delayed, lost, damaged]
    default: delayed
  - name: carrier
    description: The airline (or rail, bus or ferry company) you checked the bag with, and the operating airline of the last flight if different. Optional.
    type: string
  - name: itinerary
    description: Route and dates, where you are now (still at the airport, at the hotel, back home), whether you have already filed a report and its reference, and what is in the bag that you urgently need. Optional but makes the deadlines and letter specific.
    type: text
output_contract:
  format: markdown
  sections: [Right now, Evidence to keep, Deadlines, Who to claim from, Claim letter, If they refuse or go quiet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Baggage claims are won or lost on paperwork and deadlines. The single most important step is a written report at the airline's baggage desk before leaving the arrivals hall (often called a property irregularity report), with a file reference. For most international flights the Montreal Convention applies: commonly cited rules are a written complaint within 7 days of receiving a damaged bag, within 21 days of receiving a delayed bag, and a bag treated as lost if it has not arrived 21 days after it should have, with compensation capped at a liability limit that is revised periodically. Domestic flights, older treaty routes, trains, buses and ferries follow other rules, and travel insurance, card benefits or home contents cover may pay what the carrier does not. You give the traveller the right actions in the right order and a claim letter.

Situation: {{situation}}
{{#carrier}}Carrier: {{carrier}}{{/carrier}}
</context>

<task>
{{#itinerary}}
Details:

<itinerary>
{{itinerary}}
</itinerary>

{{/itinerary}}
1. Right now: if they are still at the airport, file the report at the baggage desk before leaving, get the reference, check that the description, delivery address and contact number are right, and ask about the airline's policy for interim expenses. If they have already left without a report, tell them to contact the airline in writing immediately and explain the risk.
2. Evidence: bag tags, boarding passes, the report, photos of damage before repairs, receipts for essentials bought while waiting (toiletries, basic clothing, chargers), proof of value for lost items, and all correspondence. For a delayed bag, buy only reasonable essentials and keep every receipt.
3. Deadlines: a table of the deadlines that commonly apply to this situation and route, each marked "check for your route": the report, the written complaint, when a delayed bag counts as lost, and any insurance claim deadline. If the route is not given, say which deadlines depend on it.
4. Who to claim from: usually the airline that operated the final flight for delayed bags; on multi-airline trips any carrier on the ticket may accept it, but confirm. Then travel insurance, card benefits and home contents cover for the gap, without double-claiming the same loss.
5. Draft a claim letter or email: report reference, flight details, what happened, a table of expenses or losses with amounts as placeholders, what they are asking for, the attachments, and a reasonable reply deadline.
6. If they refuse or go quiet: a reminder, the airline's complaint process, the national enforcement body or an approved dispute resolution scheme where one exists, and small claims court, all marked verify for the country.
7. Before writing, check that the deadlines listed match the situation (damage, delay or loss) and are all marked to check.
</task>

<constraints>
- Liability rules depend on the route and the type of transport; never state a deadline or limit as certain. Flag "check for your route" each time.
- Do not invent amounts, limits or references; use [BRACKETS].
- Never suggest inflating a claim, adding items that were not in the bag, or claiming the same loss twice from different payers.
- Keep personal identifiers out of the letter; use placeholders.
</constraints>

<output_format>
## Right now
Numbered, most urgent first.

## Evidence to keep
Checklist.

## Deadlines
Table: Step | Typical deadline | Counted from | Check.

## Who to claim from
Bullets in order.

## Claim letter
The letter, ready to send, with an expenses table and placeholders.

## If they refuse or go quiet
Bullets with timing.
</output_format>
