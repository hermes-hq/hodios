---
schema: 1
id: plan-service-livestream
kind: prompt
title: Plan a livestream for services and community gatherings
description: Plans a livestream for a place of worship, community group or small charity - gear they own, desk audio, cameras and consent, licences to check, volunteer roles and a service-day checklist.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, content-creator]
subject: [nonprofit]
inputs: [notes, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [worship-livestream, community-broadcast, volunteer-tech, filming-consent, streaming-licence]
pairs_with:
  prompts: [plan-livestream-run-of-show, set-up-stream-audio-chain, choose-stream-music-safely]
args:
  - name: gathering
    description: "What you are streaming (weekly service, prayers, meetings, talks, concerts, funerals or weddings sometimes), how often, the platform, and who watches (housebound members, family abroad)."
    type: text
    required: true
  - name: resources
    description: "The room, existing sound desk and mics, cameras or phones you own, internet at the venue, budget, and the volunteers you have and their skills."
    type: text
    required: true
  - name: country
    description: "Optional. Your country, and whether you already hold any music or performance licences."
    type: text
output_contract:
  format: markdown
  sections: [What you are streaming, Equipment from what you have, Audio, Cameras and consent, Licences to check, Volunteer roles, Service-day checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small organisations streaming services or gatherings usually have more equipment than they think and fewer people than they need. The biggest quality gain is audio: taking a feed from the existing sound desk sounds far better than a camera microphone across the room, though the desk mix for the room often needs a separate stream mix so speech is clear and music is not overwhelming. Camera placement is a consent question as much as a picture question: a fixed camera facing the front, with a clearly signed area of seating not on camera, lets members choose; children, people receiving care, and those praying or grieving need particular care. Music raises licensing: a licence that covers singing in the building may not cover streaming or recordings, and many places have separate licences for streaming worship music or performance; rules differ by country. Funerals and weddings need the family's agreement. Volunteer rotas and a written checklist matter more than gear, because the person who set it up will not always be there.
</context>

<task>
<gathering>
{{gathering}}
</gathering>

<resources>
{{resources}}
</resources>

{{#country}}
<country>
{{country}}
</country>
{{/country}}

1. **What you are streaming:** which gatherings, live only or kept as recordings, and who the stream is for; this decides privacy and licence needs.
2. **Equipment from what you have:** a setup built from their existing equipment first, then a short list of the most useful additions by type, without exact prices.
3. **Audio:** taking a feed from the desk, a separate stream mix if possible, room mics for congregational sound, and a test routine.
4. **Cameras and consent:** camera positions, a seating area not on camera, signs and notices, and rules for children, sensitive moments, funerals and weddings.
5. **Licences to check:** music and performance licences for streaming and for recordings, readings or texts under copyright, and any platform rules on music; marked as checks for their country.
6. **Volunteer roles:** roles (camera, audio, stream operator, chat or comment host) with a simple rota and the minimum one-person setup when only one volunteer turns up.
7. **Service-day checklist:** before, during and after, including what to do if the stream fails.
</task>

<constraints>
- Do not state which licences they need as fact; give what to check and with whom in their country.
- Always include consent arrangements for people on camera, and extra care for children and sensitive occasions.
- Do not recommend buying gear before using what they own.
- Keep the plan runnable by volunteers without technical backgrounds.
</constraints>

<output_format>
## What you are streaming
## Equipment from what you have
## Audio
## Cameras and consent
Checkbox list.

## Licences to check
Checkbox list.

## Volunteer roles
Table: role | who | can be skipped?

## Service-day checklist
Checkbox list.
</output_format>
