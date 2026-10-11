---
schema: 1
id: write-dialogue-scene-video-prompts
kind: prompt
title: Write dialogue scene video prompts
description: Turns a short dialogue scene between original characters into shot prompts for speaking video, with one speaker per shot, locked voices and eyelines, and a silent-shot fallback with recorded voice.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer, artist]
requires: [none]
inputs: [text]
output: [prompt, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dialogue, lip-sync, shot-reverse-shot, character-voice]
pairs_with:
  prompts: [plan-generated-scene-coverage, turn-storyboard-into-video-shots, fix-video-generation-drift]
args:
  - name: scene
    description: The dialogue as script lines, with who says what and any action.
    type: text
    required: true
  - name: characters
    description: "Each character's look and voice, e.g. 'Mara: 60s, grey bob, green cardigan, low calm voice with a dry edge'."
    type: text
    required: true
  - name: setting
    description: Where and when the scene happens, and the mood.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Coverage plan, Character and voice lock, Shot prompts, Audio route, Edit notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generated dialogue breaks in familiar ways: two characters talk over each other, the wrong mouth moves, the voice changes between shots, lines run longer than the clip, and the eyelines do not match so the cut feels like two people talking to nobody. Editors solve dialogue with coverage: shot and reverse shot from the same side of the line, one speaker per shot, reactions to cover cuts, and over-the-shoulder angles that hide the listener's mouth. Lines that last more than a few seconds rarely sync well in one generation, so long speeches are split across shots or covered with cutaways. When speaking shots keep failing, the dependable route is silent performance shots plus a recorded or separately generated voice laid in the edit, with the mouth kept small in frame or turned away.
</context>

<task>
Write shot prompts for this dialogue scene.

<scene>
{{scene}}
</scene>

<characters>
{{characters}}
</characters>

<setting>
{{setting}}
</setting>

1. If a character has no visual description or no voice description, or it is unclear who speaks a line, ask in one message and stop.
2. **Coverage plan.** Put the characters on fixed sides of the frame and keep the camera on one side of the line between them. Plan an establishing two-shot, then singles or over-the-shoulder shots for each line, and at least two reaction shots. One speaker per shot; split any line that will run past about eight seconds at natural pace.
3. **Character and voice lock.** For each character, a fixed visual block (face, hair, clothing, props) and a fixed voice block (age, pitch, pace, accent described neutrally, texture). These are repeated word for word in every shot with that character.
4. **Shot prompts.** For each shot: framing and lens, who is on which side and where they look (screen left or right), the locked blocks, the action, the exact line in quotes for the speaking character, and the listener's reaction if they are in frame. Put the line last so it is easy to swap.
5. **Audio route.** Say which shots are safest generated with speech and which should be silent with voice added later, and why. Give the voice block to reuse if the user records or generates the voice separately.
6. **Edit notes.** Where to cut on reactions to hide sync errors, where to use an over-the-shoulder angle to cover a weak line, and room tone to lay under the whole scene.
7. Before answering, check that every line in the scene appears once, every shot keeps the same screen sides and eyelines, and the voice blocks are identical across shots.
</task>

<constraints>
- Only original characters, or real people who have given consent. Do not write speaking prompts that put words in the mouth of a real, identifiable person, or that imitate a real person's voice.
- Do not change the dialogue's meaning; flag any line you split or trim.
- No tool, model or version names.
</constraints>

<output_format>
## Coverage plan
A short paragraph on screen sides and the line, then a table: Shot | Framing | Speaker | Line or reaction.
## Character and voice lock
One code block per character.
## Shot prompts
Numbered code blocks.
## Audio route
Bullets per shot.
## Edit notes
Bullets.
</output_format>
