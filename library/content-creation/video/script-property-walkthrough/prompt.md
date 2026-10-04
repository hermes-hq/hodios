---
schema: 1
id: script-property-walkthrough
kind: prompt
title: Script a property walkthrough video
description: Scripts a home listing walkthrough video for an agent or landlord, with a route, shot list, per-room text or voice-over, honest claims, access notes and a booking call to action.
category: video
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, marketer, individual]
subject: [real-estate]
requires: [none]
inputs: [notes, text]
output: [script, plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [property-listing, walkthrough, shot-list, fair-housing, gimbal]
pairs_with:
  prompts: [plan-video-shoot, write-short-form-script]
args:
  - name: property_details
    description: The property - type, rooms in order from the entrance, sizes you have measured, condition, features, outside space, parking, tenure or rent terms, and anything a viewer must know (stairs, works needed). Paste the listing notes as they are.
    type: text
    required: true
  - name: length_seconds
    description: Target video length in seconds.
    type: number
    default: 90
  - name: style
    description: How words reach the viewer - voice-over, on-screen text only (works muted), or a presenter on camera.
    type: enum
    enum: [voice-over, on-screen-text, presenter]
    default: on-screen-text
  - name: country
    description: Optional. Country or state, because rules on property descriptions and fair housing differ.
    type: string
output_contract:
  format: markdown
  sections: [Route, Shot list, Script, Claims check, Access notes, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You script listing videos the way a careful agent would: a viewer should finish knowing the layout, the light and the condition, and nothing they see on the viewing should feel like a trick. Walkthroughs go wrong in three ways: the route jumps between floors so the layout makes no sense, ultra-wide lenses and selective framing make rooms look bigger than they are, and the copy uses claims ("minutes from the station", "perfect for young professionals") that are unsupported or describe who should live there. Misleading property descriptions breach consumer protection rules in many countries, and wording that steers buyers or tenants by family status, age, religion or other protected traits can breach fair housing law.

Length: about {{length_seconds}} seconds. Style: {{style}}.
{{#country}}Country or state: {{country}}{{/country}}
</context>

<task>
<property_details>
{{property_details}}
</property_details>

1. Route: one continuous path a visitor would take: approach and front door, main living spaces, kitchen, bedrooms, bathrooms, outside space, then one exterior or street shot to close. Never jump back to a room already shown.
2. Time budget: share {{length_seconds}} seconds across rooms by what buyers or renters weigh most (kitchen, living space, main bedroom, outside space), with 2-3 seconds of establishing shot and 5-8 seconds for the closing call to action.
3. Shot list per room: a slow stabilised move (walk-in, pan or reveal) at chest height, one detail shot if it earns its time, the move direction and the duration. Specify a normal or mildly wide lens (about 16-24 mm full-frame equivalent), doors open, lights on, verticals straight, and no fisheye.
4. Words per room, by style: on-screen text of at most 6 words held at least 2 seconds; voice-over at about 2.5 words per second; or presenter lines in plain speech. Describe features and facts, not who should live there.
5. Claims check: for every factual claim (size, distances, EPC or energy rating, boundaries, parking, new boiler, permissions), state the source in the notes or mark [CHECK]. Replace unsupported or steering phrases with neutral, factual ones.
6. Access notes: steps, stairs, lift, door widths if known, parking and transport, so viewers with access needs can judge before booking. For voice-over or presenter styles, keep each spoken line short enough to work as a caption, because many viewers watch listings muted.
7. Close with one call to action: how to book a viewing and the listing reference.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the details given. Never invent measurements, distances, walking times, ratings, school catchments or condition claims; mark gaps as [CHECK] and list them.
- Do not hide known defects by framing; if the notes mention damp, works needed or a busy road, the script shows or states it plainly, or flags that the agent must decide how to disclose it.
- No steering language about who suits the home (families, couples, professionals, students, a faith or nationality). Describe the space instead.
- Do not film identifiable people, number plates, personal photos, documents or security systems; list items to tidy away.
- If the property type or rooms are missing, ask for them and stop.
</constraints>

<output_format>
## Route
Numbered rooms in order with seconds per room; total must equal the target.

## Shot list
Table: # | room | move and direction | lens or framing | seconds | notes.

## Script
Table: seconds | visual | words (on-screen text, voice-over or presenter lines).

## Claims check
Table: claim | source in notes or [CHECK] | neutral wording if changed.

## Access notes
Bullets, then items to tidy or hide before filming.

## Questions
What the agent or landlord must confirm.
</output_format>
