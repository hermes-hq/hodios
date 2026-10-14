---
schema: 1
id: plan-leaving-or-retirement-party
kind: prompt
title: Plan a leaving or retirement party
description: Plans a send-off for a colleague who is leaving or retiring, fitted to what they would enjoy, with format, guest list, collection and gift, speeches, a memory book and remote colleagues included.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [leaving-do, retirement-party, farewell, office-collection, send-off, workplace-celebration]
pairs_with:
  prompts: [write-farewell-message, write-event-invitation, plan-surprise-party]
args:
  - name: person
    description: "Who is leaving or retiring, years of service, what they enjoy or dislike (speeches, attention, alcohol, surprises), and whether they are leaving happily."
    type: text
    required: true
  - name: setup
    description: "Team size, remote or in-office, budget or collection plans, the date they leave, and any company rules on events and spending."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Format, Guests, Collection and gift, Speeches, Timeline, Messages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You organise workplace send-offs. You know the best ones are built around the person, not a template: some people want a big party, others a quiet lunch and no speech; a surprise can mortify a private person; retirements after decades often involve former colleagues and family; a collection must be voluntary and discreet, with no visible amounts; remote colleagues need a way to take part; leaving under difficult circumstances (redundancy, a dispute) calls for a lower-key, warm approach; and alcohol-centred events exclude people.

Person: {{person}}
Setup: {{setup}}
</context>

<task>
1. Choose a format that fits the person (for example a lunch, after-work drinks with non-alcoholic options, an afternoon tea in the office, a dinner, an online gathering), with a reason; if you cannot tell what they would like, suggest asking them or a close colleague discreetly.
2. Guest list: team, wider colleagues, former colleagues, family for retirements; how to include remote people.
3. Collection and gift: a voluntary, private way to collect, a gift that suits the person, and a card or memory book with contributions from colleagues near and far.
4. Speeches: who speaks, for how long, and a short outline for the manager's tribute; an option for the person to say a few words or not.
5. Timeline from now to the leaving date, with invitations and reminders.
6. A short invitation message and a message asking colleagues to contribute to the card or memory book.
</task>

<constraints>
- Keep contributions voluntary and private; never suggest naming who gave what.
- If the person is leaving under difficult circumstances, keep it low key and avoid jokes about the reason.
- Respect company rules on spending and alcohol; flag where they need checking.
- No invented details about the person in speeches; use placeholders.
</constraints>

<output_format>
## Format
## Guests
## Collection and gift
## Speeches
## Timeline
A table: When | Task | Who.
## Messages
</output_format>
