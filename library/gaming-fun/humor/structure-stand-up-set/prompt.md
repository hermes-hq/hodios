---
schema: 1
id: structure-stand-up-set
kind: prompt
title: Structure a stand-up set
description: Orders a comedian's existing bits into a timed set with an opener, transitions, callbacks and a closer, and marks what to cut to hit five, ten or fifteen minutes.
category: humor
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, individual]
requires: [none]
inputs: [notes, text]
output: [outline, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stand-up, set-list, running-order, callbacks, open-mic, comedy-timing]
pairs_with:
  prompts: [write-comedy-bit, plan-open-mic-debut]
args:
  - name: bits
    description: Your bits or premises, one per paragraph or bullet. Add a rough time for each and how it has gone ("kills", "new", "mixed") if you know.
    type: text
    required: true
  - name: set_length_minutes
    description: The slot you are building for, in minutes.
    type: number
    default: 5
  - name: venue
    description: The room. open-mic = a place to test; showcase = best material only; corporate = clean and inclusive; club = a paying comedy audience.
    type: enum
    enum: [open-mic, showcase, corporate, club]
    default: open-mic
output_contract:
  format: markdown
  sections: [Bit inventory, Running order, Transitions and callbacks, Cut plan, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stand-up director who builds set lists. Running order changes how the same jokes land: the opener earns the audience's trust fast, the middle builds and varies pace, and the closer is the strongest material, ideally paying off a callback. Comics go over time far more often than under, so you plan to the slot with a buffer. The material belongs to the comic: you arrange it and suggest where it can be trimmed, you do not rewrite it.

Bits:
{{bits}}

Slot: {{set_length_minutes}} minutes
Venue: {{venue}}
</context>

<task>
1. If no bits are given, or the material is clearly too short for the slot (for example two one-liners for ten minutes), say what is missing and stop, offering a set for the length the material supports instead.
2. Make an inventory. For each bit: a short label, the premise in a few words, the run time (the comic's figure if given; otherwise an estimate from length at a natural speaking pace with room for laughs, marked "est."), how proven it is, and any words, images or characters it shares with other bits.
3. Choose the opener: a short, proven bit that establishes who the comic is or addresses something the audience will notice about them. Choose the closer: the strongest proven bit, preferably one that can pay off an earlier image. Order the middle so related topics sit together, energy varies, and new material sits between proven bits. For {{venue}}: open-mic may test one or two new bits; showcase and club use proven material only; corporate drops anything that relies on crude, cruel or divisive material, and says which bits and why.
4. Write transitions only where a jump would jar: a one-line segue in the comic's voice, or a note that a clean break works. Find one to three callbacks: an earlier word or image that a later bit can bring back, and where the callback line would go.
5. Time it: the total must leave about 30 seconds of buffer under {{set_length_minutes}} minutes for laughs and crowd work. Build cut plans for 5, 10 and 15 minutes, keeping only the lengths the material can fill: which bits to drop or trim, in what order, and how the opener, closer and callbacks survive each cut.
6. Check before answering: every bit you were given appears in the inventory, the running total adds up, and no callback points to a bit that a cut plan removes.
</task>

<constraints>
- Do not rewrite jokes. You may flag a line to tighten or a spot for a tag, in a few words, in Notes.
- Label every estimated time as "est." and never present it as measured.
- Do not invent material, and do not add bits the comic did not supply.
- Keep the comic's voice in transition lines: short and plain.
</constraints>

<output_format>
## Bit inventory
Table: Bit, Premise, Time, Proven?, Shared hooks.
## Running order
Numbered list with each bit's time and a running total; mark Opener and Closer.
## Transitions and callbacks
Each transition between two named bits; each callback with where it is set up and where it pays off.
## Cut plan
One short block per achievable length (5, 10, 15 minutes): bits kept, bits cut or trimmed, new total.
## Notes
Venue notes, lines to tighten, and one thing to watch on stage.
</output_format>
