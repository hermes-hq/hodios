---
schema: 1
id: review-generated-video-takes
kind: prompt
title: Review generated video takes
description: Scores several generated takes of one shot against its brief for match, continuity, motion and artefacts, finds each take's usable range and picks one, or says to regenerate and what to change.
category: video-generation
version: 1.0.0
status: incubating
stage: [review, verify]
role: [content-creator, artist, editor]
requires: [none]
inputs: [text, image]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [take-selection, dailies, quality-review, usable-range]
pairs_with:
  prompts: [fix-video-generation-drift, plan-video-generation-budget, turn-storyboard-into-video-shots]
args:
  - name: shot_brief
    description: What the shot must do in the edit, its length, and the locked look and character details it must match.
    type: text
    required: true
  - name: takes
    description: "Each take described (or frames attached): what happens second by second and anything that goes wrong, e.g. 'Take 3: good walk, but at 3s her scarf changes colour, hands fine'."
    type: text
    required: true
  - name: must_haves
    description: Anything non-negotiable, e.g. 'face must match the reference', 'needs 3 clean seconds'.
    type: text
output_contract:
  format: markdown
  sections: [Scorecard, Usable ranges, Pick, Regenerate or not]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
With generated video, the work shifts from shooting to selecting. People tend to pick the take with the best overall impression, then discover in the edit that it breaks continuity with the next shot, or that only the first two seconds are clean. Editors review dailies against the shot's job: does it deliver the story beat, does it match the shots around it, is the motion believable, and what in and out points give a clean usable range. A take with a perfect three seconds often beats one that is good throughout but slightly off-model. And sometimes no take is usable, and the honest call is to regenerate with one specific change.
</context>

<task>
Review these takes.

<shot_brief>
{{shot_brief}}
</shot_brief>

<takes>
{{takes}}
</takes>
{{#must_haves}}
Must-haves: {{must_haves}}
{{/must_haves}}

1. If the takes are described only as "good" or "bad" with no detail, ask for what happens in each and where problems appear, in one message, and stop.
2. **Scorecard.** Score each take 1 to 5 on: brief match (does it deliver the beat), continuity (matches the locked look and neighbouring shots), motion (believable, right pace), artefacts (hands, faces, text, physics, flicker). Fail any take that breaks a must-have, whatever its scores.
3. **Usable ranges.** For each take, the in and out points of clean footage from the description, and whether that range is long enough for the brief.
4. **Pick.** Choose the best take and an alternate, with the reason tied to the brief. Mention fixes that are cheap in the edit (trim, crop, speed change, cover with a cutaway) versus ones that need regeneration.
5. **Regenerate or not.** If no take meets the brief, say so, name the most common failure across takes, and give the one change to make in the prompt or settings before regenerating.
6. Before answering, confirm the pick passes every must-have and its usable range covers the length needed.
</task>

<constraints>
- Do not claim to have watched clips you were only told about; judge from the descriptions and frames given and say what you could not assess.
- Do not soften a failed must-have.
- No tool, model or version names.
</constraints>

<output_format>
## Scorecard
Table: Take | Brief | Continuity | Motion | Artefacts | Must-haves (pass or fail).
## Usable ranges
Table: Take | In | Out | Clean seconds | Enough?
## Pick
Best take and alternate with reasons and edit fixes.
## Regenerate or not
Verdict and, if regenerating, the one change.
</output_format>
