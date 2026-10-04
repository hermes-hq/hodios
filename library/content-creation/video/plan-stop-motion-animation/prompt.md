---
schema: 1
id: plan-stop-motion-animation
kind: prompt
title: Plan a stop-motion animation
description: Plans a stop-motion animation with a short story, characters from clay, paper or toys, frame maths, a shot list and a phone setup, for hobbyists, families and classes.
category: video
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [stop-motion, animation, frame-rate, classroom-project]
pairs_with:
  prompts: [create-storyboard, write-sound-effect-prompts]
args:
  - name: story_idea
    description: "The idea in a sentence or two, e.g. 'a sock puppet tries to escape the washing machine', and who is making it (age, group size)."
    type: text
    required: true
  - name: seconds
    description: Target length of the finished animation in seconds.
    type: number
    default: 30
  - name: fps
    description: "Playback frames per second, one photo per frame. 12 is the classic hobby rate (the same motion as film animated 'on twos' at 24); 8 to 10 is quicker but choppier; 24 is smoothest and doubles the photos unless you shoot on twos."
    type: number
    default: 12
  - name: materials
    description: "What you have to build with: modelling clay, paper cut-outs, building bricks, toys, household objects. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Frame maths, Story, Characters and set, Shot list, Phone setup, Shooting tips, Sound and finish]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Stop motion is simple in principle (move something a little, take a photo, repeat) and easy to underestimate in practice. Thirty seconds at 12 frames per second is 360 photos, and beginners often plan a story that needs ten times more. Finished films that look good share a few habits: a tiny story with one clear action and a payoff, characters that stand up on their own, a camera that never moves between frames, locked exposure and steady light so frames do not flicker, and small, even movements with easing in and out. With children, it also needs a plan that fits a session and keeps everyone involved.
</context>

<task>
Plan a {{seconds}}-second stop-motion film at {{fps}} frames per second from this idea:

<story_idea>
{{story_idea}}
</story_idea>
{{#materials}}

Materials available: {{materials}}
{{/materials}}

1. **Frame maths.** Show it: total frames = {{seconds}} × {{fps}}, and photos needed = total frames, because each photo fills one frame. Two exceptions, stated only when they apply: at 24 fps, offer shooting "on twos" (each photo held for two frames), which halves the photos and moves exactly like 12 fps; and holds on key poses can reuse one photo for several frames, which saves moves but not screen time. Do not hold photos at 12 fps or below except for holds: that drops to 6 poses a second and looks jerky. Estimate shooting time at a realistic beginner pace (about 2 to 4 photos a minute including the moves) and convert it into sessions. If that is too much for the makers (for example a class with one lesson), propose a shorter film, a lower frame rate or the work split across groups, and show the new numbers.
2. **Story.** Shrink the idea to three beats that fit the length: setup, problem, payoff, with seconds per beat that add up to {{seconds}}. Cut anything that needs complex walking, many characters or big camera moves.
3. **Characters and set.** How to build each character from the available materials (or simple suggestions if none were listed) so it stands and holds poses: wire or a heavy base inside clay, sticky tack under feet, paper cut-outs on a flat surface shot from above. A simple set, a background that will not move, and how to fix everything to the table.
4. **Shot list.** A table: shot number, beat, seconds, frames (seconds × fps), framing (wide, medium, close-up), what moves and how far per frame, and a tip for that shot (easing: smaller moves at the start and end of each motion; a hold of a few frames on key poses so viewers can read them).
5. **Phone setup.** Phone on a tripod or taped to a stack of books; never touch it between frames (use a remote shutter, headphones volume button, or a timer); lock focus and exposure; turn off auto white balance changes where the app allows; block daylight and use lamps for steady light; use a stop-motion app with onion skinning if available (no specific app needed).
6. **Shooting tips.** Move small amounts consistently; check the onion-skin overlay; keep hands and shadows out of frame; take a few blank frames of the set first for titles; save often.
7. **Sound and finish.** Add sound after: effects recorded at home or made with the mouth and objects, music the makers have the right to use, simple titles and credits. Export at {{fps}} frames per second.
8. **For children** (if the makers are young or a class): roles that rotate (animator, photographer, director, set keeper), an adult for scissors, wire and any hot glue, and a session plan with a showing at the end.
9. Before answering, check that shot frames add up to the total frames, that beat seconds add up to {{seconds}}, and that the shooting time estimate is stated.
</task>

<constraints>
- Keep the plan achievable with household materials and a phone; mention optional extras without requiring them.
- Safety: hot glue guns, craft knives and wire cutters with adult supervision for children.
- No app, product or brand names.
</constraints>

<output_format>
## Frame maths
The calculation in plain lines, then sessions needed.
## Story
Three beats with seconds.
## Characters and set
## Shot list
Table: # | Beat | Seconds | Frames | Framing | Movement per frame | Tip.
## Phone setup
Checklist.
## Shooting tips
## Sound and finish
</output_format>
