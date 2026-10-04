---
schema: 1
id: fix-video-generation-drift
kind: prompt
title: Fix drift in generated video
description: Diagnoses generated video problems such as flicker, morphing faces, drifting outfits or physics errors, asking for the prompt and symptoms and changing one variable per attempt.
category: video-generation
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [content-creator, artist]
requires: [none]
inputs: [text, image]
output: [conversation, prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [flicker, character-drift, one-variable-test, morphing-faces]
pairs_with:
  prompts: [turn-storyboard-into-video-shots, write-image-to-video-motion-prompt, write-character-consistency-prompts]
args:
  - name: prompt_used
    description: The exact prompt you generated with, plus any settings you changed (motion amount, seed, reference image, start frame, length).
    type: text
    required: true
  - name: problem
    description: "What goes wrong and when, e.g. 'her face changes halfway through', 'the jacket turns from red to orange', 'the glass passes through the table', 'everything shimmers'."
    type: text
    required: true
  - name: clip_seconds
    description: Length of the generated clip in seconds.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Diagnosis, Change to try, Revised prompt, Test log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a generated clip goes wrong, people usually rewrite the whole prompt, raise every setting and regenerate. If it improves, nobody knows why; if it gets worse, they are lost. Drift has a small number of usual causes: too much motion or too many actions for the clip length, vague or changing descriptors, a camera move that forces the model to invent unseen areas, faces or hands too large in frame during movement, conflicting style words, contradictory physics in the action, and no reference image or start frame. Fixing it is a controlled experiment: one change per attempt, same seed if the tool allows, and a record of what each change did.
</context>

<task>
Troubleshoot this clip with the user, one change at a time.

<prompt_used>
{{prompt_used}}
</prompt_used>

<problem>
{{problem}}
</problem>

Clip length: {{clip_seconds}} seconds.

1. **Intake.** Check what you know: when in the clip the problem starts; whether it happens on every take or only some; whether a reference image or start frame was used; whether the seed was kept between takes; what a good moment and a bad moment look like. If the problem is too vague to point at any cause (for example "it looks weird"), ask for the missing items in one message and wait. Otherwise diagnose from what you have now and ask for the one or two missing facts that would most change the diagnosis at the end of the same reply.
2. **Diagnosis.** Name the most likely cause and up to two alternatives, each tied to evidence in the prompt or symptom. Use these patterns:
   - identity or outfit drift over time: descriptors too loose or missing, clip too long for the motion, no reference or start frame;
   - flicker or shimmer: fine patterns, busy textures, low light noise, conflicting style words, too much motion strength;
   - morphing faces or hands: subject large in frame while turning or gesturing, fast motion, several people interacting;
   - physics errors: action implies contact or cause and effect the model cannot track (pouring, catching, objects passing through each other);
   - camera ignoring instructions: several camera moves in one prompt, vague verbs, the move fighting the subject's motion;
   - scene changes mid-clip: the prompt describes a sequence of events instead of one shot.
3. **Change to try.** Propose exactly one change for the next attempt (tighten one descriptor, remove a second action, shorten the clip, lower motion, switch to a start frame, simplify the camera move, change framing), say what result would confirm or rule out the cause, and give the revised prompt with the change highlighted. Ask the user to keep the seed and every other setting the same if their tool allows.
4. **Iterate.** When the user reports back, update the test log, then either keep the change and target the next symptom, revert it and test the next cause, or stop when the clip is usable. After three attempts on the same symptom without progress, recommend a structural change instead: split the shot in two, cut on the problem moment, start from a still, or cover it in the edit.
5. Before each reply, check that you are changing only one variable and that the revised prompt still contains every element the user needs in the shot.
</task>

<constraints>
- Change one variable per attempt. If the user insists on changing several at once, do it, but say that the result will not show which change helped.
- Do not claim to have seen a clip you were only told about. Base the diagnosis on what the user reports and say what would sharpen it.
- No tool, model or version names; describe settings generically.
- Keep replies short during iteration: diagnosis, one change, revised prompt, what to report back.
</constraints>

<output_format>
Each reply:
**Diagnosis:** likely cause and evidence, then alternatives.
**Change to try:** the one change and what result would confirm it.
**Revised prompt:** code block with the change marked in a line below it.
**Test log:** table: Attempt | Change | Result | Keep or revert. (Starts after the first report.)
</output_format>
