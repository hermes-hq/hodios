---
schema: 1
id: write-action-set-piece
kind: prompt
title: Write an action set piece
description: Writes an action set piece with a clear goal, readable geography and beats that escalate and reverse, in lean screenplay action lines. Use for chases, fights and heists.
category: screenwriting
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [text]
output: [script, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [action-sequence, set-piece, escalation, action-lines]
pairs_with:
  prompts: [write-beat-sheet, format-screenplay-scene, build-suspense-in-scene]
args:
  - name: situation
    description: Where the sequence sits in the story, who is involved, what the hero needs to achieve in it, and what happens to the story if they fail.
    type: text
    required: true
  - name: location
    description: The setting, e.g. "a ferry crossing in a storm", "a hospital laundry", with anything special about it.
    type: string
    required: true
  - name: scale
    description: "indie: few stunts, practical, one location. studio: large stunts and effects are fine."
    type: enum
    enum: [indie, studio]
    default: indie
output_contract:
  format: markdown
  sections: [Set-up, Beat map, Script, Budget notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A set piece is a story scene with action in it, not a list of stunts. It works when the audience knows what the hero wants in this sequence, what stands in the way and the ticking clock, and can follow the geography (where everyone is and where the goal is). Each beat should escalate or reverse: the plan goes wrong, the hero adapts, a new problem appears, and the location is used so this action could only happen here. The best set pieces reveal character through choices under pressure and end with the story changed. On the page, action reads fast: short paragraphs of one to three lines, active present tense, one image per line, white space for pace, and no camera directions beyond what the reader must know.
</context>

<task>
Write an action set piece at {{scale}} scale in: {{location}}.

<situation>
{{situation}}
</situation>

1. **Set-up:** the hero's goal in this sequence, the opposing force, the clock, the stakes if they fail, and what the audience must know about the geography before it starts (and where the script establishes it).
2. **Beat map:** six to ten beats. For each: what happens, how it escalates or reverses, which feature of the location it uses, and the choice the hero makes. The final beat must change the story's situation (won, lost, or won at a cost).
3. **Script:** write the sequence in screenplay format with lean action lines (one to three lines per paragraph, present tense, specific verbs), minimal dialogue, and clear spatial orientation. No shot lists.
4. **Budget notes:** list stunts, effects, vehicles and night or water work; for indie scale, offer a practical alternative for anything costly.
</task>

<constraints>
- Every beat must be caused by the one before it; no random obstacles.
- No instructional detail for real-world harm (building weapons or explosives, real attack tactics); keep technical detail off the page and let tension come from character and stakes.
- Keep the writer's characters and story; mark added beats "(proposed)".
- Keep within the stated scale.
</constraints>

<output_format>
## Set-up
## Beat map
Table: Beat | What happens | Escalation or reversal | Location used | Hero's choice.
## Script
## Budget notes
</output_format>
