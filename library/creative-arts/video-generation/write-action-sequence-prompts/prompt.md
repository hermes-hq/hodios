---
schema: 1
id: write-action-sequence-prompts
kind: prompt
title: Write action sequence video prompts
description: Breaks a chase, fight or stunt sequence into short single-action generated shots, hiding contact moments with cuts and reactions and keeping screen direction, so the action reads clearly.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator, artist, writer]
requires: [none]
inputs: [text, notes]
output: [prompt, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [action-scene, fight-choreography, chase, screen-direction]
pairs_with:
  prompts: [plan-generated-scene-coverage, fix-video-generation-drift, write-slow-motion-shot-prompt]
  workflows: [ai-short-film-track]
args:
  - name: sequence
    description: What happens in the action sequence, beat by beat if you have it.
    type: text
    required: true
  - name: characters
    description: Each character's fixed look and any vehicle or prop.
    type: text
    required: true
  - name: rating
    description: "How intense it may be: family (no blood, no visible injury), teen (impacts shown, no gore), mature (stronger, still no gratuitous gore)."
    type: enum
    enum: [family, teen, mature]
    default: teen
output_contract:
  format: markdown
  sections: [Beat breakdown, Risky beats, Shot prompts, Cut plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Action is where video generation fails most visibly: two bodies in contact merge, punches pass through faces, limbs multiply in fast motion, vehicles change shape mid-chase, and characters swap direction so the audience loses track of who is chasing whom. Action editors already have the answer: break the sequence into short shots of one action each (wind-up, strike, reaction), cut on the moment of impact rather than showing contact, cover with reactions and inserts (a foot hitting a puddle, a hand gripping a rail), and keep screen direction consistent (the pursuer always moving the same way across frame). Generated action works best in two to four second shots with one body in clear motion and a camera that supports the energy without competing with it.
</context>

<task>
Write action shot prompts.

<sequence>
{{sequence}}
</sequence>

<characters>
{{characters}}
</characters>

Rating: {{rating}}.

1. **Beat breakdown.** Split the sequence into beats of two to four seconds, one action per beat. Set screen direction for the whole sequence (for example "the runner always moves frame left to right; the pursuer follows from frame left"), and note any planned change of direction with a shot that shows it.
2. **Risky beats.** Mark beats with contact between bodies, grappling, weapons, falls, crowds or fast vehicles. For each, give a safer coverage: show the wind-up and the reaction and cut on the impact; use an over-the-shoulder or wide shot; split into two shots; use an insert instead.
3. **Shot prompts.** One prompt per shot: locked character and vehicle descriptions repeated word for word, framing, camera energy (handheld follow, tracking, locked wide), the single action with start and end, screen direction, and intensity within the {{rating}} rating.
4. **Cut plan.** The order of shots, where cuts land on impacts, where reactions and inserts cover joins, and sound cues (impacts, whooshes, breath) that sell contact the picture does not show.
5. Before answering, check each shot has one action, screen direction is consistent across shots, and nothing exceeds the {{rating}} rating.
</task>

<constraints>
- Keep violence within the rating; no gore beyond it and no sexual violence at any rating.
- Use original characters; no real, identifiable people in fights or crashes.
- Do not present stunts as safe to copy; keep it fiction.
- No tool, model or version names.
</constraints>

<output_format>
## Beat breakdown
Screen direction rule, then a table: Beat | Seconds | Action | Direction.
## Risky beats
Table: Beat | Risk | Safer coverage.
## Shot prompts
Numbered code blocks.
## Cut plan
Numbered list with sound cues.
</output_format>
