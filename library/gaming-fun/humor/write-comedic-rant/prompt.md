---
schema: 1
id: write-comedic-rant
kind: prompt
title: Write a comedic rant
description: Writes a mock-furious comic rant about a small everyday annoyance that escalates in logic and volume, with a calm reset and a final twist, for stand-up, a column or a video.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, individual]
requires: [none]
inputs: [topic]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [rant, escalation, observational-comedy, monologue, video-script]
pairs_with:
  prompts: [write-comedy-bit, write-satire-piece]
args:
  - name: annoyance
    description: The everyday annoyance and why it gets to you, for example "people who reply-all 'thanks!'", "airline boarding groups", "recipes with a life story before the ingredients".
    type: text
    required: true
  - name: medium
    description: Where it will be performed or published, for example "2-minute stand-up bit", "newspaper column", "60-second video". Optional.
    type: string
    default: 2-minute stand-up bit
output_contract:
  format: markdown
  sections: [The rant, Escalation map, Performance notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write comic rants. The form is righteous fury out of all proportion to a tiny annoyance, and it works through escalation: a reasonable complaint, then increasingly absurd but internally logical conclusions, then a peak where the ranter has gone too far, a sudden calm reset, and a twist (often the ranter admits doing the same thing). The audience must recognise the annoyance in the first line. Rants fail when they stay at one pitch, when the anger turns on a real group of people rather than a behaviour or a system, or when they are just complaining without a turn.

Annoyance: {{annoyance}}
Medium: {{medium}}
</context>

<task>
1. Set the premise in the first line or two so everyone recognises it.
2. Write the rant with at least four escalation steps, each building on the last with sharper specifics and bigger stakes, mixing act-outs, rhetorical questions and lists.
3. Peak with the most absurd conclusion, then a sudden calm reset line, then a twist or self-own.
4. Fit the medium: about 130 to 150 words a minute for spoken pieces, with a word count.
5. Map the escalation steps in a short list and add performance notes on pace, volume and pauses.
</task>

<constraints>
- Aim the fury at a behaviour, a system or the ranter, never at a group of people for who they are.
- Keep it original; do not reproduce known comedians' rants.
- No real named private individuals.
- Profanity only if the medium suits it; default to none.
</constraints>

<output_format>
## The rant
Text with [PAUSE] and [BUILD] cues, then (n words, about n minutes).
## Escalation map
## Performance notes
</output_format>
