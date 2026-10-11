---
schema: 1
id: animate-old-family-photo
kind: prompt
title: Animate an old family photo
description: Plans a gentle, respectful animation of an old family photograph, choosing small motions that keep faces recognisable, restoring first, and labelling the result so it is never mistaken for footage.
category: video-generation
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
requires: [none]
inputs: [image, text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [family-history, old-photographs, photo-animation, respectful-ai]
pairs_with:
  prompts: [restore-old-photo-prompt, write-image-to-video-motion-prompt]
args:
  - name: photo
    description: "The photo (attach it) or a description: who is in it, how many people, framing, condition (scratches, fading, blur), black and white or colour."
    type: text
    required: true
  - name: people
    description: "Who the people are to you, whether they are living, and whether living people (or close family of those who are not) are happy with this."
    type: text
    required: true
  - name: use
    description: "What it is for, e.g. 'a family reunion slideshow', 'a memorial service', 'a private keepsake'."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you animate, Motion prompt, Settings, Gentler version, Sharing and labelling]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Seeing a grandparent blink or smile can be moving, and it can also go wrong in ways that hurt. Image-to-video models do not know what the person looked like from other angles, so a head turn or a big smile invents a face that is no longer quite theirs; relatives notice at once. Damage and blur in old prints get read as features and animate strangely. Colourised versions are guesses, not records. Families also differ in how they feel about animating people who have died. A good result uses the smallest motion that brings life (a slow breath, a blink, a slight change of expression, hair or fabric moving, a gentle camera push), restores the photo first, keeps the original alongside, and is labelled as an animation so it never becomes a false record in the family archive.
</context>

<task>
Plan an animation of this photo.

<photo>
{{photo}}
</photo>

People: {{people}}
Use: {{use}}

1. **Before you animate.** Say whether to restore first (scratches, tears, heavy grain and blur cause warping) and point to doing a restoration pass on a copy. Note that faces smaller than a fair share of the frame, group photos and profile views are riskier; for group photos suggest animating the camera and environment rather than every face. If anyone in the photo is living, or close family may object, suggest asking them first.
2. **Motion prompt.** One paragraph: a very slow camera push or none; at most one or two subtle motions per face (a blink, a soft breath, the faintest smile) and none if the face is small or blurred; light environmental motion if present (hair, fabric, leaves, smoke from a pipe); an explicit statement that faces keep their exact features, expression and age, and that the photo's grain, tone and framing stay the same. No speech, no head turns, no added people or objects.
3. **Settings.** Low motion strength, a short clip (a few seconds), keep the original aspect ratio, and generate several takes to choose the one where the face stays truest. Tell the user to check their tool's controls rather than assuming names.
4. **Gentler version.** A version where only the environment and camera move and the faces stay completely still, as the safe fallback.
5. **Sharing and labelling.** Keep the original and restored stills with the animation; add a short caption such as "animated from a photo taken around [year]"; store it so it is not mistaken for real film in the family archive; respect relatives who would rather not see it.
6. Before answering, confirm the prompt contains no speech, no head turn and no change to age or expression beyond the subtle motions named.
</task>

<constraints>
- Do not make the person speak, say words or deliver messages; this puts words in the mouth of someone who cannot agree. Decline and offer the gentle version.
- Do not alter age, body or appearance, or place the person in events they were not part of.
- Do not present colourisation or animation as historical fact.
- No tool, model or version names.
</constraints>

<output_format>
## Before you animate
Bullets.
## Motion prompt
Code block.
## Settings
Bullets.
## Gentler version
Code block.
## Sharing and labelling
Bullets with a sample caption.
</output_format>
