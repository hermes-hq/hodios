---
schema: 1
id: write-video-negative-prompt
kind: prompt
title: Write a video negative prompt
description: Writes a short negative prompt aimed at the faults you actually saw in generated video, such as flicker, warping or unwanted cuts, and a positive rewrite for tools without a negative field.
category: video-generation
version: 1.0.0
status: incubating
stage: [build, verify]
role: [content-creator, artist]
requires: [none]
inputs: [text]
output: [prompt, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [negative-prompt, artefacts, flicker, positive-phrasing]
pairs_with:
  prompts: [fix-video-generation-drift, write-video-generation-prompt]
args:
  - name: prompt_used
    description: The prompt you generated with.
    type: text
    required: true
  - name: problems_seen
    description: "What went wrong in the takes, e.g. 'the camera shakes', 'a second person appears', 'it cuts to a new scene halfway', 'text on the sign is gibberish'."
    type: text
    required: true
  - name: negative_field
    description: "Whether your tool has a separate negative prompt field: yes, no, or unsure."
    type: enum
    enum: ["yes", "no", unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Targeted terms, Negative prompt, Positive rewrite, What not to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long copied lists of negative terms ("ugly, deformed, blurry, bad anatomy, extra fingers...") mostly add noise. Each extra term dilutes the ones that matter, and naming things that are not in the scene can bring them in. In video, the faults worth naming are specific: flicker, morphing faces or objects, jitter, unwanted camera shake or zoom, sudden scene cuts, extra people appearing, warped text, objects passing through each other. A good negative prompt names only the faults observed, in a few words each. Many tools have no negative field and handle "no" or "without" in the main prompt badly, so the same intent must be phrased positively: "locked-off camera" instead of "no camera shake", "one continuous shot" instead of "no cuts".
</context>

<task>
Write a negative prompt for these problems.

<prompt_used>
{{prompt_used}}
</prompt_used>

<problems_seen>
{{problems_seen}}
</problems_seen>

Negative field available: {{negative_field}}.

1. **Targeted terms.** If no specific problem is reported, or the user asks for a long generic list, say why a long list backfires and ask what went wrong in the takes, offering at most a minimal list for the most common faults of this kind of shot. Otherwise map each problem to one or two short terms. Mark which problems a negative prompt is unlikely to fix (for example a physics error caused by an impossible action, or text that should be added in the edit) and say what would fix them instead.
2. **Negative prompt.** A comma-separated list of at most about ten terms, most important first, built only from step 1.
3. **Positive rewrite.** Rewrite the original prompt with each negative intent stated positively inside it. Change nothing else. Highlight the changed phrases in a line below.
4. **What not to add.** Name any terms the user seems to have copied from a generic list that are unrelated to the problems seen, and any that mention things absent from the scene.
5. Before answering, check that every term traces to a problem the user reported and that the rewrite keeps every original element.
</task>

<constraints>
- Do not pad with generic quality words.
- Do not claim a negative prompt will guarantee the fault disappears; suggest testing with the same seed and settings.
- No tool, model or version names.
</constraints>

<output_format>
## Targeted terms
Table: Problem | Term(s) | Likely to help (yes, partly, no) | Better fix if not.
## Negative prompt
Code block. If the tool has no negative field, say to skip it and use the rewrite.
## Positive rewrite
Code block, then changed phrases.
## What not to add
Bullets, or "Nothing to remove."
</output_format>
