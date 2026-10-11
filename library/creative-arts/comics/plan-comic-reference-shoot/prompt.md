---
schema: 1
id: plan-comic-reference-shoot
kind: prompt
title: Plan a comic reference shoot
description: Plans the reference photos and 3D or location reference an artist needs for a comic chapter, with a shot list by panel, poses, lighting and lens notes, props and a consent check for models.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [artist]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reference-photos, pose-reference, shot-list, drawing-reference, location-scouting]
pairs_with:
  prompts: [thumbnail-comic-page, write-character-model-sheet-brief, plan-comic-production-schedule]
args:
  - name: pages
    description: The script or thumbnails for the pages, panel by panel, or a list of the hard drawings you need help with.
    type: text
    required: true
  - name: resources
    description: Who can model, what camera or phone, any 3D posing tools or models you already use, locations you can reach, and time available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What needs reference, Shot list, Location and object reference, Session plan, Using the reference, Consent and rights]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help comic artists gather reference. Reference saves the most time on the drawings that are hard to invent: unusual poses and foreshortening, hands holding things, two people interacting, clothing folds, vehicles, interiors that recur, and lighting from an unusual source. It wastes time when artists shoot everything or copy photos so closely that the art goes stiff and the camera's lens distortion ends up in the panel. A good shoot is planned from the thumbnails: each photo matches a panel's camera angle and height, the light direction matches the scene, and the model acts the emotion, not just the pose. Recurring locations are worth a set of establishing shots or a simple 3D block-out so they stay consistent across pages. People photographed need to agree to it, and photos of others' copyrighted work or of identifiable strangers raise rights issues if copied directly.

Pages: {{pages}}
{{#resources}}Resources: {{resources}}{{/resources}}
</context>

<task>
1. What needs reference: go through the pages and mark which panels need reference and why (pose, hands, interaction, costume, object, location, light). Mark the ones that do not need any.
2. Shot list: for each panel needing a photo, the pose and acting, camera angle and height, lens note (avoid wide-angle distortion close up unless wanted), light direction, props or costume stand-ins, and how many variations.
3. Location and object reference: what to photograph or block out once for recurring places and objects, with the set of angles needed.
4. Session plan: the order to shoot in (grouped by model, costume and light setup), timing, and a filename pattern linking each photo to its page and panel.
5. Using the reference: how to draw from it without stiffness: push the pose, adjust proportions to the character's model sheet, correct lens distortion, and keep the comic's style.
6. Consent and rights: get each model's agreement (and a parent's or guardian's for minors), avoid copying identifiable strangers or others' photos and artwork directly, and note any location that needs permission to photograph.
</task>

<constraints>
- Plan only for the panels given; do not invent new scenes.
- Do not recommend buying software or equipment; work with what is listed or basic tools.
- Never suggest photographing people without their agreement.
- Keep the shot list realistic for the time available; say what to drop if it does not fit.
</constraints>

<output_format>
## What needs reference
A table: Page | Panel | Needs | Reason.
## Shot list
A table: Shot | Panel | Pose and acting | Angle and height | Light | Props.
## Location and object reference
## Session plan
## Using the reference
## Consent and rights
</output_format>
