---
schema: 1
id: write-tech-rider
kind: prompt
title: Write a technical rider and stage plot
description: Writes a one-page technical rider for a band or solo act with an input list, monitor mixes, backline, power and a text stage plot, sized to what small venues can actually provide.
category: music
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [artist]
requires: [none]
inputs: [text, notes]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tech-rider, stage-plot, input-list, live-sound]
pairs_with:
  prompts: [plan-live-set, pitch-gig-to-venue]
args:
  - name: lineup
    description: 'Each member, what they play and sing, and what they bring (e.g. "Jo: lead vocal and acoustic guitar with piezo, brings own DI"; "Max: drums, brings breakables only").'
    type: text
    required: true
  - name: needs
    description: What you need from the venue, monitor preferences, any tracks or click, and contact details as placeholders. Optional.
    type: text
  - name: venue_size
    description: The kind of venues you play.
    type: enum
    enum: [small-bar, club, theatre, festival]
    default: club
output_contract:
  format: markdown
  sections: [Gaps, Input list, Monitor mixes, Backline and power, Stage plot, Must-haves, Advance checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a touring front-of-house engineer who has read thousands of riders. A rider is read by a busy sound engineer who wants to know, in one page: how many inputs, what goes into each channel, what mics and DIs to set out, how many monitor mixes and what is in each, where people stand, what backline the venue must supply, and where power is needed. The input list follows a conventional order (kick, snare, hats, toms, overheads, bass, guitars, keys, tracks, then vocals) so the engineer can map it to the desk. Small venues often have six or fewer monitor mixes, a limited mic locker and no spare DI boxes; a rider demanding specific premium mics will be ignored or annoy the engineer, so experts write "or similar" and mark only the true must-haves. Clear labelling of who supplies what prevents the classic soundcheck problem of nobody bringing a DI for the keyboard.

<lineup>
{{lineup}}
</lineup>
{{#needs}}Needs: {{needs}}
{{/needs}}Venue size: {{venue_size}}
</context>

<task>
1. **Gaps.** List anything missing that the engineer will need (for example whether the keyboard is stereo, whether the drummer needs a vocal mic, whether there are playback tracks). Ask about them, and use a clearly marked assumption in the rider until answered.
2. **Input list.** Channel number, source, mic or DI (with "or similar"), stand type, who supplies it, and notes (stereo pair, phantom power). Conventional order.
3. **Monitor mixes.** Each mix: who, wedge or in-ear, what they need in it, kept within what a {{venue_size}} typically offers; give a fallback if fewer mixes are available.
4. **Backline and power.** What the act brings, what they need the venue to provide, and power points needed on stage by position.
5. **Stage plot.** A simple text diagram from the audience's view, with each member's position, monitors, amps, DI points and power.
6. **Must-haves vs nice-to-haves.** Mark the true must-haves.
7. **Advance checklist.** What to confirm with the venue before the day: load-in time, line check or full soundcheck, who mixes, changeover time.
</task>

<constraints>
- Keep the rider to what fits on one or two printed pages.
- Use only gear the user named; mark generic suggestions as "or similar".
- Contact details as placeholders; do not invent names or numbers.
</constraints>

<output_format>
## Gaps
## Input list
Table: Ch | Source | Mic or DI | Stand | Supplied by | Notes.
## Monitor mixes
## Backline and power
## Stage plot
A code block, audience at the bottom.
## Must-haves
## Advance checklist
</output_format>
