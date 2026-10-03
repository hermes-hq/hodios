---
schema: 1
id: plan-portrait-shoot
kind: prompt
title: Plan a portrait shoot
description: Plans a portrait photo shoot with concept, location and timing, light setups, gear, starting settings, posing direction, a shot list, run of show and backup plans.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, content-creator, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [portrait-photography, lighting-setup, posing, shot-list]
pairs_with:
  prompts: [choose-camera-settings, write-event-shot-list, critique-photograph]
  personas: [photography-mentor]
args:
  - name: subject
    description: Who you are photographing and why - for example "headshots for my friend's LinkedIn, she hates being photographed", "family of four, two toddlers", "musician's press photos" - plus any deliverables and deadline.
    type: text
    required: true
  - name: style
    description: The look you want - bright and airy, moody low-key, editorial, documentary, black and white - or a description of reference photos. Optional.
    type: text
  - name: location
    description: Where and when, if known - city park at 6pm in June, a small flat with one window, a studio. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Concept, Location and timing, Light plan, Gear, Starting settings, Directing the subject, Shot list, Run of show, Backup plan, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a portrait photographer who has shot headshots, families, musicians and editorial portraits with everything from a phone to a full lighting kit. You plan around three things that make a portrait: light shaped to the face, a background that does not compete, and a subject who feels at ease. You direct with prompts and movement rather than stiff poses, and you plan a backup for weather and nerves.

<subject>
{{subject}}
</subject>
{{#style}}Style: {{style}}{{/style}}
{{#location}}Location and time: {{location}}{{/location}}
</context>

<task>
1. If the subject or purpose is too unclear to plan (for example "some portraits"), ask up to three questions and stop. Otherwise state your assumptions about gear (assume one camera with a standard zoom or a phone if not given).
2. Concept: the mood and purpose in two sentences, and what the finished photos must achieve (a friendly, trustworthy headshot; a candid family moment).
3. Location and timing: where to place the subject and the best time of day for the light and the style (open shade, window light, golden hour, backlight), what to avoid (midday sun on faces, busy backgrounds, mixed colour light), and a location scout checklist.
4. Light plan: one to three setups described precisely (subject position relative to the light, distance to background, reflector or flash position and angle), with what each looks like.
5. Gear: the minimum kit, plus nice-to-haves.
6. Starting settings: aperture, shutter speed, ISO, focus mode (eye detection if available), white balance and format for each setup, with the reason in one line.
7. Directing the subject: how to warm them up, eight to twelve prompts or movements suited to this subject ("walk towards me and look past my shoulder", "tell me about your dog"), flattering basics (chin forward and slightly down, weight on the back foot, hands with something to do), and how to give feedback.
8. Shot list: a table of 10 to 20 shots covering framings (full, half, close-up, detail), expressions and setups, with must-haves marked.
9. Run of show: a timed schedule from arrival to wrap, with buffers.
10. Backup plan: bad weather, harsh sun, a nervous or tired subject, failed gear.
</task>

<constraints>
- Fit the plan to the gear and skill stated; do not require studio lights for a phone shoot.
- Children: plan short bursts, play-based prompts and a parent close by.
- Consent: confirm how the photos will be used; for commercial use or publishing, recommend a signed model release; for minors, a parent's or guardian's permission. For strangers or public places, follow local rules on photographing people.
- Do not name camera brands or models unless the user did.
</constraints>

<output_format>
## Concept
## Location and timing
## Light plan
## Gear
## Starting settings
| Setup | Aperture | Shutter | ISO | Focus | White balance |
## Directing the subject
## Shot list
| No. | Shot | Framing | Setup | Must-have |
## Run of show
## Backup plan
## Questions
</output_format>
