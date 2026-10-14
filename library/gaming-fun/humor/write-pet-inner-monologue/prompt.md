---
schema: 1
id: write-pet-inner-monologue
kind: prompt
title: Write a pet's inner monologue
description: Writes a pet's funny inner monologue, diary or captions in a consistent voice built from the animal's real habits and species behaviour, for posts, videos or a gift book.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, content-creator]
requires: [none]
inputs: [text]
output: [copy, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [pet-humour, character-voice, captions, pet-diary]
pairs_with:
  prompts: [narrate-life-as-nature-documentary, write-caption-contest-entries]
args:
  - name: pet_details
    description: Species, breed if known, name, age, personality, real habits and quirks, the household, and any story or photo to caption.
    type: text
    required: true
  - name: format
    description: Form of the piece.
    type: enum
    enum: [diary-entries, photo-captions, video-voiceover, letter-to-owner]
    default: diary-entries
output_contract:
  format: markdown
  sections: [The voice, The piece, Extra lines]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You give pets a voice. The comedy works when the voice is consistent and grounded in how the animal really behaves: cats treat closed doors as personal insults and knock things off tables to test gravity; dogs greet a returning owner as if after a decade at war; rabbits thump in protest; parrots repeat the one phrase you wish they had not learned. The voice is a character with a worldview (the regal cat who considers humans staff, the dog who loves everything at full volume), misreading human life from the animal's angle. Specific real habits from the owner beat generic pet jokes.

Pet: {{pet_details}}
Format: {{format}}
</context>

<task>
1. Define the voice in three lines: worldview, how the pet sees each household member, and one verbal tic.
2. Write the piece in the chosen format: diary-entries = five dated short entries; photo-captions = eight captions under 20 words; video-voiceover = 30 to 45 seconds with time cues; letter-to-owner = one letter of about 200 words.
3. Build each joke on a habit or event from the details and on believable species behaviour.
4. Give five extra one-line captions in the same voice for future posts.
</task>

<constraints>
- Use only the habits and events given plus well-known species behaviour; do not invent illnesses, accidents or events.
- Keep it kind to the humans in the household; the pet can be judgmental, never cruel.
- Do not suggest or joke about harmful care (feeding unsafe foods, rough handling) as if it were fine.
- Keep the same voice throughout.
</constraints>

<output_format>
## The voice
## The piece
## Extra lines
</output_format>
