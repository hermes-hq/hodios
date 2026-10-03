---
schema: 1
id: write-caption-contest-entries
kind: prompt
title: Write caption contest entries
description: Writes caption contest entries for a cartoon or photo across several comic angles, from understatement to the absurd, and picks the strongest with a reason.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [image, text]
output: [ideas, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [captions, caption-contest, cartoons, one-liners, comic-angles]
pairs_with:
  prompts: [write-puns, punch-up-with-humor]
args:
  - name: image_description
    description: What the picture shows, including who is in it, where, what is odd about it and any speech bubble or sign. An attached image works too; add anything the image does not make obvious.
    type: text
    required: true
  - name: angles
    description: How many different comic angles to write, one caption per angle, from 4 to 12.
    type: number
    default: 8
  - name: tone
    description: clean = safe for any audience; dry = deadpan and understated; absurd = surreal and escalating; mixed = a spread across all three.
    type: enum
    enum: [clean, dry, absurd, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [What the picture sets up, Captions, Best pick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write caption contest entries. A winning caption works only together with the picture: it never describes what the reader can already see, it gives one character a line (or the scene a label) that reframes the oddity, and it ends on the word that makes the joke. The strongest entries tend to treat a bizarre scene as completely ordinary, or bring an everyday worry into an extraordinary moment.

Picture:
{{image_description}}

Angles: {{angles}}
Tone: {{tone}}
</context>

<task>
1. If there is no picture or description, or the description lacks the odd element the caption would play on, ask for what is missing and stop.
2. Read the picture: who could be speaking, what is incongruous, what the setting is, and what the reader will notice first. Note the two or three details a caption could hook onto.
3. Write {{angles}} captions, each from a different angle, chosen to suit the {{tone}}. Draw on angles such as: understatement; treating the absurd as routine; an everyday complaint in an extraordinary moment; a literal reading of an idiom the scene suggests; workplace or bureaucratic language in the wrong place; a character's private thought; role reversal; absurd escalation; a familiar phrase given a new meaning by the image.
4. Craft each caption: one speaker or a label, as short as it can be (most winners are under fifteen words), the payoff word last, no explaining.
5. Check each one against the picture: it does not restate the visible scene, it would not work equally well on any other image, and it is not a famous published caption or joke. Replace any that fail.
6. Pick the strongest and a runner-up, each with a reason that names what makes it land.
</task>

<constraints>
- Keep clean tone fully family-friendly; no cruelty in any tone.
- If the picture shows identifiable private people, write captions about the situation, not about their looks, body or identity.
- Write captions in the language of the description unless asked otherwise.
- Do not explain the jokes in the caption list; reasons belong in Best pick.
</constraints>

<output_format>
## What the picture sets up
Two or three bullets: the incongruity and the hooks.
## Captions
Numbered list: the caption in quotation marks, then the angle in brackets, for example `"I said I wanted a corner office." [literal reading]`.
## Best pick
The strongest caption and the runner-up, each with one sentence on why.
</output_format>
