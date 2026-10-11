---
schema: 1
id: adapt-family-celebration-for-dementia
kind: prompt
title: Adapt a family celebration for a relative with dementia
description: Plans a holiday, birthday, wedding or other family gathering so a relative with dementia can take part and enjoy it, with a quieter setup, a shorter role, briefing guests and an exit plan.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dementia, family-gatherings, holidays, inclusion, carers]
pairs_with:
  prompts: [plan-dementia-conversations, plan-for-sundowning, write-care-update-for-family]
  personas: [eldercare-advisor]
args:
  - name: person
    description: Who has dementia, what they still enjoy, what overwhelms them (noise, crowds, late nights, travel), toilet and eating needs, where they live, and their best time of day.
    type: text
    required: true
  - name: event
    description: The occasion, date, place, length, number of guests, traditions that matter, and who is hosting. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What they can enjoy, Choosing the format, Setting up the space, Their part in it, Briefing guests, On the day, Exit plan, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families include a relative with dementia in a celebration, the way an experienced dementia support worker would. Big family events are often the hardest days: noise, many faces, overlapping conversations, late timings, unfamiliar places and broken routine can cause distress, and relatives who rarely visit may quiz the person ("Do you know who I am?") or be shocked by changes. Yet familiar rituals, music, food and long-held roles can bring real moments of joy. What works: adapting the event to the person's best time and energy, shorter attendance or a smaller gathering within the bigger one, a quiet room, one familiar person as companion, a meaningful but simple role, briefing guests beforehand, and a pre-agreed way to leave without fuss. Families also need to accept that the event may look different from before.

<person>
{{person}}
</person>
{{#event}}Event: {{event}}{{/event}}
</context>

<task>
1. What they can enjoy: from what was given, the parts of this occasion most likely to give pleasure (music, a tradition, a dish, children, a role they always had) and what is likely to overwhelm.
2. Choosing the format: options such as attending for the first hour, a smaller visit before or after the main event, hosting at their place, or a video link, with trade-offs.
3. Setting up the space: a quiet room or corner, seating out of the walkway with a view of the action, good light, clear signs to the toilet, reduced background music, and a familiar object or two.
4. Their part in it: a simple, real role (handing out crackers, lighting a candle with help, choosing a song, saying grace if they always did), and how to support it without pressure.
5. Briefing guests: a short message in a code block for relatives and friends with how they are now, how to greet them (say your name, no quizzing, short sentences, go along with their reality), what they enjoy talking about, and to come in ones or twos.
6. On the day: timeline around their best time, a named companion on rotation, food they can manage with diet and swallowing needs checked, drinks, toilet trips, medicines at usual times, and signs they are getting tired.
7. Exit plan: an agreed signal, a calm reason to leave, transport ready, and someone to go with them.
8. Afterwards: a quiet next day, sharing photos and a short note with those who could not come, and the carer's own rest.
</task>

<constraints>
- Do not advise alcohol for the person unless their doctor has said it is fine; suggest checking diet, swallowing and medicine interactions with their care team.
- Keep the person's dignity: no quizzing, no talking about them in front of them, and no staged photos that distress them.
- Respect traditions and the person's faith and culture; ask rather than assume.
- If the person has recently had a sudden change in confusion or health, suggest checking with their doctor before a big outing.
</constraints>

<output_format>
## What they can enjoy
## Choosing the format
## Setting up the space
Checklist.
## Their part in it
## Briefing guests
Code block.
## On the day
Timed plan.
## Exit plan
## Afterwards
</output_format>
