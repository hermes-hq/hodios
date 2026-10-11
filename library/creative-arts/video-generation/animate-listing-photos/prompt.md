---
schema: 1
id: animate-listing-photos
kind: prompt
title: Animate property listing photos
description: Plans gentle camera-move clips from real property listing photos without changing rooms, views or condition, labelling any virtual staging and checking local advertising rules.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, content-creator]
subject: [real-estate]
requires: [none]
inputs: [image, text]
output: [prompt, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [listing-video, property-marketing, virtual-staging, truthful-advertising]
pairs_with:
  prompts: [write-image-to-video-motion-prompt, write-room-staging-prompt, script-property-walkthrough]
args:
  - name: photos
    description: "The listing photos (attach them) or a list describing each: room, angle, lens (wide or normal), windows and views, anything staged."
    type: text
    required: true
  - name: purpose
    description: "Where the video goes and its length, e.g. 'a 30-second vertical clip for social' or 'a 60-second listing page video'."
    type: text
    required: true
  - name: country
    description: Country or region of the property, for advertising rules.
    type: text
output_contract:
  format: markdown
  sections: [Photo triage, Shot prompts, Sequence, Labels and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Animating listing photos is an inexpensive way to make a property video, but image-to-video models invent pixels as the camera moves: rooms grow, windows show different views, furniture appears, cracks and stains vanish, and wide-angle distortion gets worse. In property advertising, that is misrepresentation, and many places have rules or codes that require images to show the property as it is and virtual staging to be labelled. The safe approach uses small camera moves (slow push, gentle lateral slide, slight tilt) that reveal little new space, keeps the room's contents and condition exactly as photographed, and treats exteriors and views with care because the model will happily invent a nicer garden.
</context>

<task>
Plan an animated listing video.

<photos>
{{photos}}
</photos>

Purpose: {{purpose}}
{{#country}}Country or region: {{country}}{{/country}}

1. **Photo triage.** For each photo: suitable (simple geometry, little hidden space), risky (very wide lens, mirrors, windows with views, busy patterns, people, readable signs) or not suitable (would need the camera to reveal areas not in the photo). For risky ones, name the protection: smaller move, crop, or keep as a still with a slow digital zoom in the edit.
2. **Shot prompts.** For each usable photo, a motion prompt with one small camera move, slow pace, and a plain statement that walls, windows, views, furniture, fixtures and condition stay exactly as in the photo. No added objects, light changes, or weather unless the photo shows them. Keep any virtual staging exactly as it appears in the photo.
3. **Sequence.** Order the clips for {{purpose}}: exterior or best feature first, a logical walk through the home, closing on a strong room or view. Give each clip's length and where captions (room names, key facts the user supplies) go; add text in the edit, not in the prompt.
4. **Labels and checks.** A checklist before publishing: compare each clip frame by frame with its source photo for added or removed features, size changes and altered views; label virtually staged rooms; disclose that the video is animated from photos if the platform or local rules require it; check rules for the user's country or region with the platform or a local professional body.
5. Before answering, confirm no prompt asks for anything not present in its source photo.
</task>

<constraints>
- Do not write prompts that add, remove or improve features, enlarge rooms, change views, hide damage or alter the condition of the property. Decline requests to do so and explain the misrepresentation risk.
- Do not state what a specific country's law requires as fact; point to where to check.
- Do not invent facts about the property for captions; use only what the user provides.
- No tool, model or version names.
</constraints>

<output_format>
## Photo triage
Table: Photo | Verdict | Risk | Protection.
## Shot prompts
One code block per usable photo.
## Sequence
Table: Order | Photo | Seconds | Caption from the user's facts.
## Labels and checks
Checklist.
</output_format>
