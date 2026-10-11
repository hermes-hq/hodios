---
schema: 1
id: pitch-broadcast-segment
kind: prompt
title: Pitch a TV or radio segment
description: Turns a story into a pitch for a TV or radio producer - what the segment looks or sounds like, the guest, why now and logistics - with a check on whether the guest is ready for air.
category: public-relations
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder]
requires: [none]
inputs: [text, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [broadcast-pitch, tv-segment, radio-interview, producers, b-roll]
pairs_with:
  prompts: [pitch-journalist, prepare-media-interview, build-media-list]
args:
  - name: story
    description: The story, the news hook or timing, and anything visual or audible about it.
    type: text
    required: true
  - name: guest
    description: Who would appear, what they can talk about, any previous broadcast experience, and their availability.
    type: text
    required: true
  - name: programme
    description: The programme or type of programme you are targeting (for example a regional evening news bulletin, a breakfast show, a call-in radio programme). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Angle for air, Segment idea, Pitch, Guest readiness, Assets and logistics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a broadcast PR specialist. Producers and planning desks think in segments, not stories: what will the viewer see, what will the listener hear, who is the guest, how long, and why today. A good print story often fails on TV because there is nothing to film, and on radio because the guest cannot explain it in thirty seconds. Producers want guests who are articulate, available at short notice and able to speak to the programme's audience, plus pictures (b-roll, a location, people doing something) for TV. Pitches to producers are short and lead with the segment; timing matters because many shows plan days ahead while news desks decide that morning.

<story>
{{story}}
</story>

<guest>
{{guest}}
</guest>
{{#programme}}Programme: {{programme}}{{/programme}}
</context>

<task>
1. Angle for air: restate the story as a segment for this programme's audience, with the timely hook. Say whether it suits TV, radio or both, and if it has no visual or audio element, say what could provide one.
2. Segment idea: format (studio interview, live location, pre-recorded package, phone-in, panel), likely length, what the viewer sees or listener hears, and the three questions a presenter would most likely ask.
3. Pitch: a subject line and a pitch of about 100 to 150 words for a producer: the segment in one line, why now, the guest and why they are good on air, what pictures or sound are available, availability windows, and the contact. Add a shorter version for a phone call to the planning desk.
4. Guest readiness: assess the guest against what producers need (clarity, energy, short answers, ability to handle a challenging question, availability). Give three soundbites under 15 seconds each in the guest's voice from the facts given, and the one thing they should practise.
5. Assets and logistics: b-roll or photos with permissions, location access, consent for anyone filmed, the guest's travel or remote setup (quiet room, wired connection, lighting) and timing to offer.
</task>

<constraints>
- Do not invent visuals, statistics, guest credentials or availability; mark gaps.
- Do not promise the producer exclusivity or access you cannot guarantee.
- If the story involves children, patients or vulnerable people, plan consent and say who must not be identifiable.
- Keep the pitch plain and short; no superlatives about the guest.
- Respect the programme's editorial independence: no suggestion of payment or advertising in exchange for coverage.
</constraints>

<output_format>
## Angle for air
## Segment idea
## Pitch
Subject line, email pitch with word count, and the phone version.
## Guest readiness
## Assets and logistics
A checklist.
</output_format>
