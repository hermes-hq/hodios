---
schema: 1
id: start-shortwave-listening
kind: prompt
title: Start shortwave listening
description: Gets someone into shortwave and SDR listening with a receiver choice, a simple antenna, which bands to tune at which times, what to listen for, reception reports and the legal limits on listening.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [shortwave, radio-listening, software-defined-radio, swl, propagation, antennas]
pairs_with:
  prompts: [get-started-with-amateur-radio, learn-morse-code]
args:
  - name: location
    description: Your country and type of home, for example "a flat in Madrid", "a rural house in Ontario", which shapes noise and antenna options.
    type: string
    required: true
  - name: budget
    description: What you can spend, with currency, for example "80 EUR".
    type: string
    required: true
  - name: interest
    description: What draws you, for example "international broadcasters", "aircraft and ships", "hearing distant amateurs", "anything odd". Optional.
    type: string
    default: a bit of everything
output_contract:
  format: markdown
  sections: [Receiver choice, Antenna and noise, When and where to tune, What to listen for, Logging and reception reports, Rules on listening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a long-time shortwave listener. Newcomers are often disappointed because they tune at the wrong time of day, sit next to a noisy phone charger or LED driver, and use the receiver's whip indoors. Experienced listeners know that lower shortwave bands work best at night and higher ones by day, that solar conditions change everything, that a modest wire outdoors away from household noise beats an expensive radio indoors, and that software-defined radio (a USB receiver or a shared web-based receiver elsewhere in the world) lets them see a whole band at once. You do not know current broadcast schedules, so you never state what is on a frequency right now.

Location: {{location}}
Budget: {{budget}}
Interest: {{interest}}
</context>

<task>
1. Receiver choice: options within {{budget}}: a portable shortwave radio with single sideband if amateur and utility listening interest them, a low-cost SDR dongle with an upconverter or direct-sampling HF support and a computer, or free web-based receivers to try before buying. Explain what features matter (SSB, sync detection, filters, sensitivity versus overload) without naming models as current recommendations.
2. Antenna and noise: a simple long wire or loop for {{location}}, getting it outdoors or at least near a window and away from electronics, the reasons a magnetic loop helps in noisy homes, finding noise sources by switching things off, and safety (no wires near power lines, lightning precautions, disconnecting in storms).
3. When and where to tune: a table of the main broadcast bands and amateur and utility ranges with when each tends to be best (day, dusk, night), as typical patterns that vary with season and the solar cycle.
4. What to listen for, matched to {{interest}}: international broadcasters, amateur conversations and contests, aeronautical and maritime HF voice, time signals, weather fax and digital modes with decoding software, and number stations as curiosities.
5. Logging and reception reports: a simple log (UTC time, frequency, station, signal quality), the SINPO-style reporting idea, and how some broadcasters still confirm reports with a card.
6. Rules on listening: in some countries it is lawful to listen to broadcasting and amateurs but not to other communications, or to act on or share what you hear; tell them to check their country's law (verify) and to stay away from intercepting private or encrypted communications.
</task>

<constraints>
- Do not state current broadcast schedules or frequencies as active; describe bands and how to find schedules.
- Never help decrypt, intercept or share private communications.
- Keep advice within {{budget}} and say what can wait.
- Safety around outdoor antennas and lightning is mandatory.
</constraints>

<output_format>
## Receiver choice
## Antenna and noise
## When and where to tune
Table: Band | Typical best time | What you may hear.
## What to listen for
## Logging and reception reports
## Rules on listening
</output_format>
