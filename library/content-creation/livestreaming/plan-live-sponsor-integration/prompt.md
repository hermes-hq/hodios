---
schema: 1
id: plan-live-sponsor-integration
kind: prompt
title: Plan a live sponsor integration
description: Plans how a sponsor appears in a live stream - deliverables mapped to the run of show, live talking points, overlay and chat command, disclosure, handling sceptical chat, and proof for the sponsor.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [document, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sponsored-stream, live-ad-read, sponsor-overlay, sponsorship-disclosure, campaign-proof]
pairs_with:
  prompts: [plan-livestream-run-of-show, write-sponsored-content-concept, write-sponsorship-policy-page]
  workflows: [brand-deal-track]
  personas: [stream-producer]
args:
  - name: brief
    description: "The sponsor's brief or agreement summary: product, required deliverables (minutes on screen, mentions per hour, overlay, link, chat command, segments), claims allowed and forbidden, and reporting asked for."
    type: text
    required: true
  - name: stream
    description: "What the sponsored stream is (game or topic, length), platform, typical viewers, how chat usually reacts to sponsors, and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Deliverables map, Live talking points, On-screen and chat, Disclosure, Handling chat, Proof for the sponsor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A live sponsor integration is not a podcast ad read: there is no edit, chat reacts in real time, and the deliverables are usually counted per hour (mentions, minutes the overlay is visible, link clicks, command uses). Streamers who read a script word for word sound like an ad; experienced ones use a few talking points they believe, show the product doing something real on stream, and space mentions so they land at natural breaks rather than mid-fight. Chat often tests sponsored streams with jokes or accusations of selling out; a calm, honest answer and one line on why they took the deal works better than defensiveness, and mods should not ban fair criticism. Disclosure is required in many places: the platform's paid-promotion label where it exists, a clear verbal and on-screen mention, and #ad or equivalent on related posts, with rules that differ by country. Sponsors usually ask for proof (timestamps, screenshots, overlay time, clicks), which is far easier to collect live than to reconstruct.
</context>

<task>
<brief>
{{brief}}
</brief>

<stream>
{{stream}}
</stream>

1. **Deliverables map:** a table placing every required deliverable on the stream's timeline (opening, natural breaks, mid-stream, ending), with how it will be counted.
2. **Live talking points:** three to five points in the streamer's voice, a short opening mention and a natural mid-stream mention, using only claims the brief allows. Mark any claim that needs the sponsor's confirmation.
3. **On-screen and chat:** overlay placement that does not cover gameplay or face, how long it shows, chat command text and timer intervals that do not spam.
4. **Disclosure:** the platform label to switch on (as a check), what to say at the start and after breaks, overlay disclosure, and post disclosure, noting country differences.
5. **Handling chat:** likely chat reactions and honest replies, and a note to mods on what to leave alone and what is spam.
6. **Proof for the sponsor:** what to capture during the stream (timestamps, screenshots, overlay minutes, command counts, link clicks) and who records it.
</task>

<constraints>
- Never write claims the brief does not allow or the streamer cannot back.
- Disclosure is always included; never suggest hiding the sponsorship.
- Do not overload the stream with mentions beyond the agreed deliverables; flag if the brief is unrealistic for the stream length.
- Do not suggest banning viewers for fair criticism of the sponsor.
</constraints>

<output_format>
## Deliverables map
Table: time | deliverable | how counted.

## Live talking points
## On-screen and chat
## Disclosure
Checkbox list.

## Handling chat
Table: likely message | reply.

## Proof for the sponsor
</output_format>
