---
schema: 1
id: write-opening-or-closing-remarks
kind: prompt
title: Write opening or closing remarks for an event
description: Writes the short welcome or closing remarks a chair, host organisation lead or dignitary gives at a conference, ceremony or community event, framing the day and thanking people.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [executive, manager, individual, teacher]
requires: [none]
inputs: [notes, spec]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [welcome-remarks, closing-remarks, conference, ceremony, chairperson]
pairs_with:
  prompts: [write-emcee-script, write-speaker-introduction, give-vote-of-thanks]
args:
  - name: which
    description: Whether these are the opening or the closing remarks.
    type: enum
    enum: [opening, closing]
    default: opening
  - name: event
    description: "The event, audience and your role, for example 'annual regional nursing conference, 250 delegates, I'm the association chair', 'opening of a new community library, I'm the council leader'."
    type: string
    required: true
  - name: details
    description: "What the day is for, the programme, who to thank (sponsors, organisers, volunteers), any protocol (dignitaries present, acknowledgements your organisation always makes), and for closing remarks what actually happened today."
    type: text
    required: true
  - name: minutes
    description: Time allowed. Opening remarks are usually 3 to 5 minutes; closing 2 to 4.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Remarks, Length, Names and protocol to confirm, Cut version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Opening and closing remarks are not keynotes. The person giving them (a chair, a president, a mayor, a head of school) is there to frame the occasion, not to make the main argument, and the audience is waiting for the programme. Good opening remarks do four things in a few minutes: make people feel welcome and expected, say why this event matters now in one or two concrete sentences, acknowledge the people who must be acknowledged, and hand over cleanly. Good closing remarks pick out two or three moments from the day that people will recognise, thank the people who made it happen, and send people off with one clear next step (the date of the next event, a survey, an action).

The failures are long welcome lists that read every dignitary's full title, thanking sponsors in a way that sounds like an advert, a mini-keynote that eats the first speaker's time, and closing remarks written before the event that clearly ignore what happened. Protocol varies by country and organisation: the order in which dignitaries are acknowledged, land or traditional owner acknowledgements, and formal forms of address. Follow what the user gives rather than guessing.
</context>

<task>
Write {{which}} remarks for: {{event}}. Time: {{minutes}} minutes.
<details>
{{details}}
</details>

1. If you do not know the event's purpose, or for closing remarks you have nothing about what happened during the event, ask for it in one or two questions and stop.
2. For opening remarks: a warm first line, any required acknowledgements in the order given, why this event matters now (one or two concrete sentences from the details), what people will get from the day, brief practical notes only if no emcee is covering them, thanks to organisers and sponsors in one sentence each, and a handover line to the next item.
3. For closing remarks: two or three specific moments or ideas from the day, thanks to speakers, organisers, volunteers and sponsors, one clear next step for the audience, and a warm farewell.
4. Name dignitaries by the titles given; where a title or order is uncertain, write `[confirm title]`.
5. Write for the ear, about 130 words per minute, and keep under the time allowed.
6. Give a cut version of about half the length for when the programme is running late.
</task>

<constraints>
- Do not invent names, titles, statistics, sponsor claims or event highlights; use placeholders.
- Do not use the remarks to deliver a keynote; at most one or two sentences of substance.
- Sponsor thanks must be thanks, not promotion.
- Follow the acknowledgement and protocol order the user gives; if none is given, list in Names and protocol to confirm what is commonly expected and ask, rather than inserting set wording.
</constraints>

<output_format>
## Remarks
Full text with [pause] marks and the handover line.
## Length
"N words, about M minutes".
## Names and protocol to confirm
Each name, title and pronunciation to check, and the acknowledgement order.
## Cut version
The same remarks at about half the length.
</output_format>
