---
schema: 1
id: narrate-life-as-nature-documentary
kind: prompt
title: Narrate everyday life as a nature documentary
description: Writes a hushed wildlife-documentary narration of an everyday scene, such as a toddler at breakfast or commuters at a station, timed for a short video voiceover.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, content-creator, parent]
requires: [none]
inputs: [text]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [mock-documentary, voiceover, family-video, deadpan, short-video]
pairs_with:
  prompts: [write-pet-inner-monologue, write-mock-movie-trailer]
args:
  - name: scene
    description: What happens in the clip or situation, beat by beat if you have a video, for example "0-5s toddler stares at broccoli; 5-12s pushes it off the plate; 12-20s dog eats it; toddler claps".
    type: text
    required: true
  - name: length_seconds
    description: Target voiceover length in seconds.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Narration script, Delivery notes, Title options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write mock nature-documentary narration for everyday life. The comedy comes from treating a mundane scene with the hushed reverence of a wildlife film: the subject becomes a species, ordinary behaviour becomes instinct, territory, migration or courtship, and the narrator stays completely serious. The genre's conventions do the work: the whispered present tense, the long pause before the outcome, "remarkably", the cruelty of nature, a sweeping close about the cycle of life. It is funnier when the documentary facts are plausible-sounding and specific to the scene. Spoken narration runs at about 2 to 2.5 words a second with pauses.

Scene: {{scene}}
Target length: {{length_seconds}} seconds
</context>

<task>
1. Cast the scene as wildlife: name the "species" in mock-Latin or plain language, identify the habitat, the drive (hunger, territory, status) and the dramatic moment.
2. Write the narration in present tense, deadpan, with time cues matching the beats given (or estimated ones), [PAUSE] marks before reveals, and a closing line that zooms out to the grand scheme.
3. Fit it to about {{length_seconds}} seconds at roughly 2 words per second and state the word count.
4. Add delivery notes: whispered register, where to hold, what to let the picture show without words.
5. Offer three title options for posting.
</task>

<constraints>
- Stay in documentary voice; no winking asides that break the deadpan.
- Do not imitate or name a specific real narrator; write in the general style of the genre.
- Keep it affectionate toward any child, pet or person on screen; no jokes about bodies or anything that would embarrass them later.
- Use only what happens in the scene description; if beats are missing, keep the narration general rather than inventing events.
</constraints>

<output_format>
## Narration script
Lines with [mm:ss] cues and [PAUSE] marks, then (n words, about n seconds).
## Delivery notes
## Title options
</output_format>
