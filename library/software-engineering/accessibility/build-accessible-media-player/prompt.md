---
schema: 1
id: build-accessible-media-player
kind: prompt
title: Build an accessible media player
description: Builds or fixes a web video or audio player with captions, transcripts, audio description, operable controls and no autoplay traps, mapped to the WCAG 1.2 media criteria.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [captions, webvtt, audio-description, transcripts, media-player, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-keyboard-navigation, audit-web-accessibility, build-aria-widget]
args:
  - name: player_code
    description: The current player markup, component and styles. Leave empty to build a new player from scratch.
    type: text
  - name: media_type
    description: What the player plays.
    type: enum
    enum: [video, audio, live-stream]
    default: video
  - name: tech_stack
    description: Framework and any player library in use, for example "Vue 3 with video.js" or "plain HTML". Leave empty for plain HTML and JavaScript.
    type: string
    default: plain HTML and JavaScript
output_contract:
  format: markdown
  sections: [Media requirements, Player code, Content the team must supply, Test checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Media accessibility has two halves that teams often confuse: the content (captions, transcripts, audio description) and the player (controls people can find, operate and understand). A perfect caption file is useless if the captions button is an unlabelled icon that keyboard users cannot reach; a polished custom player fails if there is no caption track. Common failures: custom controls built from `div`s, a single toggle that never exposes its pressed state, a volume slider with no value text, seek bars that only respond to dragging, autoplaying video with sound, captions burned into the video so they cannot be resized, and transcripts that leave out visual information. Native `video` controls are often the most accessible choice; replacing them takes real work to match.
</context>

<task>
Build or fix a {{media_type}} player using {{tech_stack}}.

<player_code>
{{player_code}}
</player_code>

If the code is empty, build a minimal custom player; otherwise fix the given one with the smallest change that meets the requirements.

1. Map the media requirements for {{media_type}} at WCAG 2.2 AA: captions for prerecorded (1.2.2) and live (1.2.4) audio; audio description for prerecorded video when visuals carry information not in the dialogue (1.2.5); a transcript for audio-only (1.2.1) and as good practice for all video; audio control for anything that plays sound for more than 3 seconds (1.4.2); pause for moving content over 5 seconds (2.2.2).
2. Tracks: load captions as `track kind="captions"` with `srclang` and `label`, WebVTT with speaker identification and sound cues ("[door slams]"). Use `kind="descriptions"` only if the player will voice it; otherwise provide a described version or extended audio description as a separate source. For live streams, name the real-time captioning path (CART or the streaming platform's live captions) rather than a file.
3. Controls: real `button` elements with accessible names for play or pause, mute, captions, audio description, transcript, fullscreen and settings; toggles expose state with `aria-pressed`, or swap the name ("Pause" or "Play"), never both. The seek and volume controls are native `input type="range"` or follow the ARIA slider pattern with `aria-valuetext` in human terms ("1 minute 32 seconds of 4 minutes 10 seconds", "Volume 60%"). Arrow keys seek in 5-second steps, Page Up and Page Down by 10 percent.
4. Keyboard and focus: every control reachable in a logical order; visible focus that contrasts 3:1; controls do not hide while one has focus; single-key shortcuts only while the player has focus (2.1.4); Escape exits fullscreen and focus returns to the fullscreen button.
5. Autoplay: no autoplay with sound. Muted autoplay only for short decorative loops, with a visible pause control, and none when `prefers-reduced-motion: reduce` is set.
6. Captions display: user-adjustable size and background contrast, captions positioned to avoid covering controls, no burned-in captions as the only option.
7. Transcript: an expandable or linked text transcript with speakers and important visual information, available without starting playback; optionally interactive, with timestamps that seek.
8. Do not announce time updates continuously; a live region is only for state changes the user triggered and cannot see.
</task>

<constraints>
- Prefer native media elements and controls; build custom controls only when the design requires it, and then meet every point above.
- Do not write caption, transcript or description content for media you have not been given; list what the team must produce and who usually does it.
- Do not invent player library APIs. If the library is unknown to you, ask for its docs or show the plain HTML approach.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Media requirements
Table: Requirement | WCAG SC | Applies to this {{media_type}}? (yes, no, depends with the reason) | Met by.

## Player code
Complete markup, script and CSS in {{tech_stack}}, with short comments at each accessibility decision. For a fix, a diff or the changed parts with context.

## Content the team must supply
Bullets: caption files per language, audio description script or described version, transcript, with format and quality notes (for example 99% accurate, speaker labels, sound cues, synchronised).

## Test checklist
Numbered: keyboard-only pass, screen reader pass with NVDA or VoiceOver hearing each control's name and state, captions on at 200% text size, reduced-motion setting, 320 px width, and automated scan.
</output_format>
