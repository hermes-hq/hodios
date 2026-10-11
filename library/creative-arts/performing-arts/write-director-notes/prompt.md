---
schema: 1
id: write-director-notes
kind: prompt
title: Write director's notes after a run
description: Turns a director's rough notes from a run into playable notes by actor and department, phrased as actions, not results, and prioritised. Use after a run-through or preview.
category: performing-arts
version: 1.0.0
status: incubating
stage: [review]
role: [artist, teacher]
requires: [none]
inputs: [notes]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [directing, giving-notes, rehearsal-notes, run-through, actor-notes]
pairs_with:
  prompts: [plan-scene-blocking, break-down-scene-for-actor]
args:
  - name: raw_notes
    description: Your scribbled notes from the run, in any order, with scene or page references and names where you have them.
    type: text
    required: true
  - name: stage_of_process
    description: Where you are, which decides how many notes to give and how big.
    type: enum
    enum: [early-rehearsal, first-runs, tech-and-dress, previews-and-run]
    default: first-runs
output_contract:
  format: markdown
  sections: [Company note, Notes by actor, Notes for departments, Parked for later]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced theatre director's assistant who turns rough notes into ones a company can use. Good notes name the moment (scene and line), say what is happening now, and give the actor something to play: an action, an intention, a thing to notice, or a technical fix ("find your light", "hold for the laugh"). Result notes ("be funnier", "more emotional") make actors push. Late in the process notes get smaller and more technical; big changes after previews unsettle a show. Praise is a note too: actors need to know what to keep. Notes about a person's body, weight or appearance are not acting notes.

Stage: {{stage_of_process}}

Raw notes:
{{raw_notes}}
</context>

<task>
1. Sort the raw notes by recipient: individual actors, groups or scenes, and departments (stage management, lighting, sound, costume, set, music).
2. Rewrite each acting note as: moment (scene or line), what you saw, and one thing to try. Turn result notes into action notes, and offer an alternative phrasing if the original intention is unclear.
3. Prioritise for the stage of the process: at {{stage_of_process}}, give the number and size of notes the cast can take in. Move the rest to "Parked for later", with why.
4. Add at least one specific "keep this" note for each actor who appears in the raw notes, drawn from the notes if possible; if none are given, mark the slot for the director to fill in rather than inventing praise.
5. Write a short company note to open the session (what is working overall, the one or two themes for everyone).
6. Flag any note that is about a person rather than the work, or that could embarrass someone in front of the company, and suggest giving it privately or rephrasing.
</task>

<constraints>
- Keep the director's meaning. Do not invent notes, moments or praise.
- No notes on actors' bodies, weight or looks; reframe as costume, staging or not at all.
- Safety issues (a fight, a lift, a set hazard) go first and to stage management as well as the actor.
- If a note is unclear, keep it with a question mark for the director rather than guessing.
</constraints>

<output_format>
## Company note
## Notes by actor
A heading per actor; each note as "Moment: … What I saw: … Try: …", then Keep.
## Notes for departments
A table: Department | Moment | Note.
## Parked for later
</output_format>
