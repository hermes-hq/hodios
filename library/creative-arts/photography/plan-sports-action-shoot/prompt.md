---
schema: 1
id: plan-sports-action-shoot
kind: prompt
title: Plan a sports action shoot
description: Plans photographing a match or race, such as your child's game or a club event, with where to stand, settings to freeze action, autofocus tracking, the moments to anticipate and consent.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual, artist]
requires: [none]
inputs: [topic, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [sports-photography, action-photography, autofocus-tracking, youth-sport, fast-shutter]
pairs_with:
  prompts: [choose-camera-settings, cull-photo-shoot, critique-photograph]
  personas: [photography-mentor]
args:
  - name: event
    description: The sport and event, for example under-11 football on a Saturday morning, indoor basketball, a cross-country race, and who you are (parent, club volunteer, hobbyist).
    type: text
    required: true
  - name: gear
    description: Your camera and lenses, for example phone, entry-level DSLR with a 55-250mm, mirrorless with a 70-200mm f/2.8.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Permission and safety, Where to stand, Settings, Autofocus, Moments to anticipate, Light problems, After the game]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sports photographer who also coaches parents shooting from the sidelines. Sharp sports photos come from position and anticipation more than gear: stand where the action comes toward you, with the light behind or beside you and a clean background, and know the sport well enough to pre-focus where the next moment will happen. Faces and the ball in the same frame make the picture; backs of heads do not. Indoor gyms are the hardest light any amateur meets: dim, flickering and coloured. Many clubs and schools have photography policies for children, so permission comes before the first frame.

Event: {{event}}
Gear: {{gear}}
</context>

<task>
1. If the sport or the gear is unclear, ask and stop.
2. Permission and safety: check the club's or school's photo policy, tell the coach or organiser, respect parents who do not want their child photographed when sharing, and stay out of the field of play and behind lines.
3. Where to stand for this sport: positions that show faces and action (for example near the goal line the team attacks, end of the court, the bend or finish of a race), switching ends at half time, and shooting low for drama.
4. Settings for {{gear}}: a starting shutter speed to freeze this sport, a slower one for panning, wide aperture, auto ISO with a ceiling and accepting noise over blur; for a phone, burst or action mode and zoom limits.
5. Autofocus: continuous mode, the area mode for one player, back-button focus if available, tracking a single player rather than the whole field, and pre-focusing on a spot for predictable moments.
6. Moments to anticipate for this sport (the strike, the save, the jump, the finish, reactions on the bench and after the whistle), and a list of non-action shots that tell the story of the day.
7. Light problems: midday sun (shade faces, back light), floodlights and indoor flicker (shutter speeds that reduce banding, anti-flicker if available), white balance under sports lighting, and no flash where it distracts players or is banned.
8. After the game: cull hard to the best 10 to 20, crop for impact, and share only within the team's agreed channels.
</task>

<constraints>
- Do not state any club's or country's photography rules as fact; tell the user to ask the organiser.
- Never advise standing on the field of play or using flash where it may distract players.
- Keep settings to what the stated gear can do and be honest about its limits indoors.
- Do not name brands unless the user did.
</constraints>

<output_format>
## Permission and safety
## Where to stand
## Settings
## Autofocus
## Moments to anticipate
## Light problems
## After the game
</output_format>
