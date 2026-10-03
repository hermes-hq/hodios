---
schema: 1
id: write-read-aloud-text
kind: prompt
title: Write read-aloud text
description: Writes short read-aloud descriptions for locations, NPC entrances and events that engage the senses, end on something to act on, and never decide what the characters do.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [build]
role: [gamer]
requires: [none]
inputs: [text, notes]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [boxed-text, scene-description, game-mastering, session-prep]
pairs_with:
  prompts: [design-one-shot-adventure, create-npc]
  workflows: [session-prep-track]
args:
  - name: scenes
    description: The locations, NPC entrances or events to describe, one per line, with any facts that must be included (exits, hidden things not to reveal, who is present).
    type: text
    required: true
  - name: tone
    description: Mood and genre, for example "gothic dread", "light-hearted fairy tale" or "gritty cyberpunk". Optional; inferred from the scenes if omitted.
    type: string
output_contract:
  format: markdown
  sections: [Read-aloud, GM notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write boxed text for game masters to read aloud at the table. Players stop listening after about 30 seconds, so good read-aloud text is short, concrete and ends with something the players can react to. It describes what the characters perceive, never what they think, feel or do. It reveals only what is obvious; secrets go in notes for the game master.

Scenes:
{{scenes}}
{{#tone}}Tone: {{tone}}{{/tone}}
</context>

<task>
For each scene:
1. Pick the one dominant impression (the thing the characters notice first) and lead with it.
2. Use at least two senses beyond sight: sound, smell, temperature, texture, or a feeling in the air. Choose details that hint at the scene's story or danger.
3. Include every required fact (exits, people present, obvious objects) in plain, unambiguous words so players can make decisions from it.
4. End on a hook: a movement, a sound, a question from an NPC, or an object that invites interaction. Never end on a summary.
5. For NPC entrances, show the character through one action and one physical detail, and give their first line of dialogue if they speak.
6. Under the text, add GM notes: what is hidden and how it could be found, and the likely player questions with short answers.
If no tone was given above, infer it from the scenes and state it at the top in one line.
If a scene is too vague to describe without inventing its key facts (no idea what the place is or who is there), list what you need for that scene instead of writing it, and write the others.
</task>

<constraints>
- 40 to 90 words per read-aloud. Two or three sentences for quick transitions.
- Second person ("you see", "you hear") or neutral description; never "you feel afraid", "you decide" or any action the characters take.
- Do not reveal secrets, traps, hidden enemies or monster names the characters would not know.
- Short sentences that are easy to read aloud. No words the game master would stumble over; give a pronunciation for invented names.
- Plain vocabulary over purple prose; one striking image beats five adjectives.
</constraints>

<output_format>
One block per scene:
### <Scene name>
> Read-aloud text as a block quote.

**GM notes:** hidden elements, how to find them, and likely questions with answers.
</output_format>

<examples>
Input scene: "Abandoned mill by the river. Exits: front door, broken waterwheel. Hidden: a goblin lookout in the loft."

### The old mill
> The waterwheel groans as the current pushes it a few inches, then it stops with a wet crack. Inside, flour dust hangs in the slanted light and coats everything grey. It smells of mould and something sharper, like old smoke. Above you, a ladder climbs into the dark loft, and a single fresh footprint marks the dust on its bottom rung.

**GM notes:** A goblin lookout hides in the loft (a perception check, or your system's equivalent, spots movement through the boards). The footprint is the clue. Likely question: "Is the waterwheel climbable?" Yes, slippery; it reaches the loft window.
</examples>
