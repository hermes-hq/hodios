---
schema: 1
id: plan-stream-scenes
kind: prompt
title: Plan stream scenes and overlays
description: Plans the scene set for a stream - starting soon, main, chatting, BRB, guest and ending - with layout and safe areas, alerts, audio per scene and hotkeys, fitted to the streamer's setup.
category: livestreaming
version: 1.0.0
status: incubating
stage: [design, build]
role: [content-creator, gamer]
inputs: [notes, preferences, image]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [obs-scenes, stream-overlays, stream-layout, alerts, hotkeys]
pairs_with:
  prompts: [plan-livestream-run-of-show, choose-first-streaming-setup, audit-stream-for-privacy-leaks]
  personas: [stream-producer]
args:
  - name: stream
    description: What you stream (game, art, music, cooking, just chatting), whether you use a camera, guests or a second camera, your software, monitors and computer, and how you want it to feel.
    type: text
    required: true
  - name: current_layout
    description: Optional. A description or screenshot of your current scenes and what you dislike about them.
    type: text
output_contract:
  format: markdown
  sections: [Scene list, Layouts, Audio per scene, Alerts and on-screen text, Hotkeys and switching, Build order, Test checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Viewers judge a stream in seconds, and most of what they judge is readable content and clean audio, not fancy overlays. A good scene set is small: each scene has a job, the streamer can reach it with one press, and nothing important is covered. Common mistakes: the camera or alerts covering the game's minimap, health bar or subtitles; text too small to read on a phone, where much live viewing happens; a starting scene with no audio so new viewers think the stream is broken; BRB scenes that leave the microphone live; and window or display captures that show notifications, email or private tabs. Vertical clips cut from the stream need the important parts near the centre. Alerts should be short and quiet enough not to drown the streamer.
</context>

<task>
<stream>
{{stream}}
</stream>

{{#current_layout}}
<current_layout>
{{current_layout}}
</current_layout>
{{/current_layout}}

1. **Scene list:** the scenes this stream needs and no more (typically starting soon, main, just chatting or camera-only, BRB, ending or raid, plus guest or second camera if used), each with its job.
2. **Layouts:** for each scene, what is on screen and where, described in plain positions (for example "camera bottom-right, 20% width, clear of the minimap"), with game or content areas to keep clear for this type of stream, text size readable on a phone, and a central safe zone for vertical clips.
3. **Audio per scene:** which sources are live in each scene (microphone muted on BRB and starting soon unless intended), music under voice, and a rule for anything copyrighted.
4. **Alerts and on-screen text:** which alerts to keep, length and volume, a short line of on-screen text per scene (schedule, now playing, chat command), and what to leave out to reduce clutter.
5. **Hotkeys and switching:** one hotkey or button per scene, a panic hotkey that cuts to a safe scene with the microphone muted, and how to switch while playing.
6. **Build order:** what to build first to go live sooner, and what can wait.
7. **Test checklist:** a private test recording covering every scene, audio levels and a phone-screen check.
If the user describes their current layout, say first what to fix and why.
</task>

<constraints>
- Fit the plan to the stated hardware; do not add scenes, sources or effects the computer is unlikely to carry without saying they are optional.
- Prefer capturing a single game or application window over a whole display, and say why (privacy).
- Do not recommend specific paid overlay products; describe what to look for or make.
- Software menus change between versions; describe what to do, not exact menu paths you are unsure of.
</constraints>

<output_format>
## Scene list
Table: scene | job | when to use.

## Layouts
One short subsection per scene.

## Audio per scene
Table: scene | microphone | desktop or game | music.

## Alerts and on-screen text
## Hotkeys and switching
## Build order
Numbered.

## Test checklist
Checkbox list.
</output_format>
