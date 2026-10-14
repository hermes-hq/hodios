---
schema: 1
id: plan-vtuber-debut
kind: prompt
title: Plan a VTuber debut
description: Plans a VTuber debut - model route and budget, commission timeline and licence terms, tracking setup, character and lore, identity separation for privacy, the debut stream and the pre-debut checklist.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [vtuber, avatar-model, live2d, face-tracking, debut-stream]
pairs_with:
  prompts: [audit-stream-for-privacy-leaks, plan-stream-scenes, write-go-live-announcements]
  personas: [stream-producer]
args:
  - name: idea
    description: "The character or persona idea, what you will stream, platform, and why VTubing rather than a face cam."
    type: text
    required: true
  - name: resources
    description: "Budget range, what you can make yourself (art, rigging, 3D), your PC and webcam or phone, and how soon you want to debut."
    type: text
    required: true
  - name: current
    description: "Optional. Any existing channel or online identity you have and whether you want the VTuber to be linked to it."
    type: text
output_contract:
  format: markdown
  sections: [Model route, Budget and timeline, Licence and rights, Character and lore, Identity and privacy, Tech setup, Debut stream, Before announcing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A VTuber debut has more lead time than a normal channel launch: commissioned art and rigging often book weeks to months out, and art and rigging are usually separate jobs by separate people. Routes range from free or low-cost starter models and avatar makers, to pre-made models with a licence, to full commissions. Each comes with licence terms that matter later: whether commercial use and monetisation are allowed, whether the model is exclusive, whether the artist must be credited, and who can modify or re-rig it. Face tracking quality depends on lighting and the camera or phone used, and running tracking, a game and the stream on one PC costs performance. Many VTubers choose anonymity, which only holds if the voice-only identity is separated from personal accounts, payment names, usernames, and room audio; leaks usually come from linked accounts, old usernames, reflections or metadata rather than the face. A debut stream is a one-time event: introduce the character, show the model's range, set the stream's format and schedule, and give viewers a reason to return.
</context>

<task>
<idea>
{{idea}}
</idea>

<resources>
{{resources}}
</resources>

{{#current}}
<current>
{{current}}
</current>
{{/current}}

1. **Model route:** two or three routes that fit their budget and skills, with trade-offs, and a recommendation for a first model they can upgrade later.
2. **Budget and timeline:** a table of items (art, rigging, tracking, overlays, assets) with placeholders or ranges they confirm with sellers, and a working-back timeline to debut that allows for commission waits and revisions.
3. **Licence and rights:** the terms to get in writing for art and rigging: commercial use, monetisation, exclusivity, credit, modifications, and what happens if the artist stops trading.
4. **Character and lore:** a light character sheet (name check, personality, voice, a few lore hooks) that supports the content rather than replacing it, plus a quick check that the name is not taken.
5. **Identity and privacy:** if anonymity matters, separate accounts, email, payment and business names to check, usernames not reused, room audio and reflections, and file metadata.
6. **Tech setup:** tracking method for their hardware, lighting for tracking, performance budget with a game running, and a test plan.
7. **Debut stream:** a run of show for the first stream: reveal, introduction, model showcase, first content, schedule, and the ending.
8. **Before announcing:** a checklist of what must be ready before the debut date is public.
</task>

<constraints>
- Do not quote commission prices or artists' rates as fact; use ranges as placeholders to confirm.
- Never suggest using art, models or assets without a licence, or tracing another creator's character.
- Do not promise anonymity; describe risks and reduction steps.
- Mark software and tracking tool features as checks.
</constraints>

<output_format>
## Model route
## Budget and timeline
Table: item | route | cost placeholder | lead time.

## Licence and rights
Checkbox list.

## Character and lore
## Identity and privacy
Checkbox list.

## Tech setup
## Debut stream
Table: time | segment | note.

## Before announcing
Checkbox list.
</output_format>
