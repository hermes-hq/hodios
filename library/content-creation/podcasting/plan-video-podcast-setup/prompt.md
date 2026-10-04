---
schema: 1
id: plan-video-podcast-setup
kind: prompt
title: Plan a video podcast setup
description: Plans adding video to an audio podcast with camera count, framing, budget lighting, remote video, a file and sync workflow, and what to publish where, sized to room, budget and edit time.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [video-podcast, camera-setup, lighting, multicam-editing, clips]
pairs_with:
  prompts: [choose-podcast-setup, repurpose-video-into-posts]
  personas: [podcast-sound-engineer, podcast-producer]
args:
  - name: current_setup
    description: Your audio setup today, the room (size, windows, background), how many people record and whether guests are remote, and how many hours you can spend editing per episode.
    type: text
    required: true
  - name: budget
    description: Budget for video with currency, and what you already own (phones, webcams, a camera, lights).
    type: string
    required: true
  - name: hosts_in_room
    description: How many people sit in the room on camera.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Is video worth it here, Camera plan, Light and background, Remote guests, Recording and sync workflow, What to publish where, Shopping list]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help audio podcasters add video. Video can widen discovery and gives short clips, but it adds real cost: cameras, light, storage, sync and much more edit time. Shows that add video badly end up with dark, noisy footage, cameras that overheat or stop recording at a time limit, eyelines that make hosts look past each other, and a weekly edit nobody can keep up with. The audio stays the priority: a visible microphone close to the mouth beats a hidden mic that sounds worse.

People on camera in the room: {{hosts_in_room}}
Budget: {{budget}}

<current_setup>
{{current_setup}}
</current_setup>
</context>

<task>
1. Is video worth it here: weigh the stated edit time and goals; suggest the lightest version that works (for example one wide shot plus clips only) if time is short.
2. Camera plan: number of cameras for the people in the room (common patterns: one wide; one wide plus one close-up per person; a single camera with digital crops from a high-resolution frame), angles, framing (eyes about a third from the top, a little headroom, mics not covering mouths), and eyelines (hosts look at each other; for remote guests, the host looks near the lens). Note recording limits to check: continuous recording time, overheating, battery versus mains power, storage.
3. Light and background: key light at about 45 degrees, a soft fill or reflector, separation from the background, matching colour temperatures, using or blocking window light, and a background with depth and something on brand, not a bare wall.
4. Remote guests: record each person's video locally where possible, minimum guest setup (camera at eye level, light facing them, plain tidy background, wired headphones), and fallbacks.
5. Recording and sync workflow: separate audio and video files, a clap or slate at the start for sync, frame rate and resolution to keep consistent, file naming, backup, and the editing approach (multicam switching, or wide shot with occasional cuts) with an honest estimate of extra edit hours per episode.
6. What to publish where: full episode as video, audio feed kept as is (or video feed if the host supports it), vertical clips, thumbnails, and which pieces to skip if time is short.
7. Shopping list within the budget, using what they own first.
</task>

<constraints>
- Stay within the budget including mounts, cables, memory cards and storage; if it cannot cover the plan, give the phased version.
- Recommend by type and specification; name example models only if confident they exist and are widely sold, with prices as rough ranges to check.
- Never trade audio quality for picture; keep the existing audio chain.
- If the room, edit time or budget is missing, ask and mark assumptions.
</constraints>

<output_format>
## Is video worth it here
Three or four sentences and the recommended level of video.
## Camera plan
Table: Camera | Shot | Framing | Notes. Plus a simple text diagram of the room.
## Light and background
Bullets.
## Remote guests
Bullets and a guest checklist.
## Recording and sync workflow
Numbered steps and extra edit hours per episode.
## What to publish where
Table: Asset | Where | Effort.
## Shopping list
Table: Item | Spec | Quantity | Rough price, with total against budget.
</output_format>
