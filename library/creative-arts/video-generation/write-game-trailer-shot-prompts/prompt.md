---
schema: 1
id: write-game-trailer-shot-prompts
kind: prompt
title: Write game trailer shot prompts
description: Plans an indie game trailer that uses generated cinematic shots for mood and world alongside real captured gameplay, with shot prompts, an honest labelling plan and no fake gameplay.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan, build, ship]
role: [game-developer, marketer]
requires: [none]
inputs: [text, image, notes]
output: [plan, prompt, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [game-trailer, indie-games, cinematic-trailer, truthful-marketing]
pairs_with:
  prompts: [turn-storyboard-into-video-shots, write-logo-sting-prompt, write-music-video-shot-prompts]
args:
  - name: game
    description: "The game: genre, setting, art style, core loop and the one thing that makes it different. Attach key art or screenshots if you have them."
    type: text
    required: true
  - name: gameplay_footage
    description: "What real gameplay capture you have or can record, e.g. 'combat, crafting, map screen; no boss fight yet'."
    type: text
    required: true
  - name: length
    description: Trailer length in seconds.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Trailer structure, Generated versus captured, Shot prompts, Labelling and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small studios increasingly use generated cinematics to open a trailer with mood and world before showing the game. That can work, but players are quick to call out trailers that do not show the real game, and storefronts and ad platforms commonly require that gameplay footage be representative and that non-gameplay footage be identified. The strongest indie trailers lead with the game's hook within the first few seconds and show real gameplay early. Generated shots earn a place where the game itself cannot show something: the world at a scale the camera never reaches, a story moment told in the game as text, an atmospheric opener. They should match the game's art style closely enough that the cut to gameplay does not feel like a different product, and they should never depict mechanics, features or quality the game does not have.
</context>

<task>
Plan this trailer.

<game>
{{game}}
</game>

<gameplay_footage>
{{gameplay_footage}}
</gameplay_footage>

Length: {{length}} seconds.

1. **Trailer structure.** Lay out the {{length}}-second trailer in beats: hook (first few seconds), world and premise, core loop in real gameplay, escalation, the differentiator, ending with title, platforms and a call to action supplied by the user. Mark each beat captured or generated. Real gameplay should take most of the running time and appear early.
2. **Generated versus captured.** For each generated beat, say why it cannot be shown with capture and confirm it shows nothing the game does not contain. Move any beat that would imply missing features (for example a boss fight that is not built) out of the plan or flag it.
3. **Shot prompts.** For each generated shot: a style block matched to the game's art (palette, rendering look, camera language) repeated across shots; the shot's framing, action and length; the end frame chosen to cut cleanly into the next captured shot. Keep the game's logo and any text out of prompts; add them in the edit.
4. **Labelling and checks.** Where to label non-gameplay footage (an on-screen note such as "cinematic, not gameplay" or "pre-rendered"), which storefront or ad rules to check (tell the user to read the current rules of each platform they will use), and a check that every captured shot comes from the current build.
5. Before answering, check that captured gameplay takes most of the running time and that no generated shot shows a feature absent from the game.
</task>

<constraints>
- Do not plan generated shots that pass as gameplay or show features, content or graphical quality the game does not have.
- Do not state platform rules as fact; tell the user to check each platform's current policy.
- Do not copy other games' characters, logos or trailer shots.
- No tool, model or version names.
</constraints>

<output_format>
## Trailer structure
Table: Seconds | Beat | Captured or generated | Content.
## Generated versus captured
Bullets per generated beat.
## Shot prompts
Style block in a code block, then numbered shot prompts.
## Labelling and checks
Checklist.
</output_format>
