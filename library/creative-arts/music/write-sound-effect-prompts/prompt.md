---
schema: 1
id: write-sound-effect-prompts
kind: prompt
title: Write sound effect prompts
description: Writes prompts for sound effects and ambiences with source, material, distance, room and duration, plus layering, variation and naming notes for games and videos.
category: music
version: 1.0.0
status: incubating
stage: [build]
role: [game-developer, content-creator]
requires: [none]
inputs: [text]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [sound-design, sfx, ambience, foley]
pairs_with:
  prompts: [write-background-music-cues, write-logo-sting-prompt]
args:
  - name: effects
    description: "The sounds you need, one per line, with context if you have it: what triggers it, how long it lasts, whether it loops, e.g. 'door creak in a haunted house, 2 s' or 'forest ambience at night, loop'."
    type: text
    required: true
  - name: style
    description: "Overall style: realistic (true to life), cartoon (exaggerated, comic timing), sci-fi (synthetic, futuristic)."
    type: enum
    enum: [realistic, cartoon, sci-fi]
    default: realistic
output_contract:
  format: markdown
  sections: [Sound list, Prompts, Layering notes, Variations and naming, Delivery checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sound designers describe a sound by what makes it: the source and action, the materials involved, the size and weight, the distance from the listener, the space it happens in, and its shape over time (a sharp attack and fast decay, or a slow swell). A prompt like "explosion sound" gives a generic stock bang; "distant muffled explosion in a valley, deep low rumble rolling for four seconds, no debris" gives something usable. Games add two needs: several variations of repeated sounds so footsteps and hits do not sound robotic, and ambiences that loop cleanly.
</context>

<task>
Write {{style}} sound effect prompts for this list.

<effects>
{{effects}}
</effects>

1. If an item is too vague to describe physically (for example "magic sound"), make a reasonable choice for {{style}}, state it in the sound list and continue; ask only if the whole list is unclear.
2. **Sound list.** For each sound decide: source and action, materials, size and weight, distance (close, medium, far), perspective (on-screen, off-screen), environment (small room, hall, outdoors, underwater, space), duration, envelope (attack, sustain, decay), and whether it is a one-shot or a loop.
3. **Prompts.** One prompt per sound, in plain physical language, in that order: action and source, materials, size, distance, space, duration, envelope, and "isolated, no music, no voice" unless voice is the point. For {{style}}:
   - realistic: true weights and acoustics, no exaggeration;
   - cartoon: exaggerated pitch and timing, comic squash and stretch, clear and short;
   - sci-fi: synthetic textures, modulated tones, still grounded in a physical action (a door, a weapon charge) so it reads.
   For ambiences: background beds without distinct events that would repeat noticeably, with the loop length stated.
4. **Layering notes.** For complex sounds, split into layers generated separately and mixed: transient (the attack), body (the weight), tail (the space and decay), plus sweeteners. Say which sounds benefit.
5. **Variations and naming.** For sounds that repeat in a game (footsteps, hits, UI clicks), ask for 3 to 5 variations with small changes in pitch, timing or material. Propose file names in a consistent scheme (category_object_action_variant, e.g. door_wood_creak_01).
6. **Delivery checks.** Trim silence at the head, keep a natural tail, check loops for clicks at the seam, match loudness across a set, and keep the sample rate and format the project expects (confirm it).
7. Before answering, check that every item from the list has a prompt and that each prompt names distance, space and duration.
</task>

<constraints>
- Do not ask for recognisable copyrighted sounds (a famous film's signature effect, a trademarked sound logo); describe an original sound with similar physical qualities instead.
- No tool, model or version names. Remind the user to confirm the generator's licence covers their use.
</constraints>

<output_format>
## Sound list
Table: Sound | Source and action | Materials | Distance and space | Duration | One-shot or loop.
## Prompts
One code block per sound, labelled with the proposed file name.
## Layering notes
## Variations and naming
## Delivery checks
Checklist.
</output_format>
