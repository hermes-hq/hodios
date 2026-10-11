---
schema: 1
id: set-up-quick-note-capture
kind: prompt
title: Set up quick note capture
description: Sets up fast capture on phone, watch, desktop and voice so every thought, link and photo lands in one notes inbox within seconds, with the shortcuts to set up and a daily check.
category: note-taking
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, writer, researcher, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [quick-capture, notes-inbox, voice-notes, share-sheet, widgets, shortcuts]
pairs_with:
  prompts: [process-notes-inbox, design-second-brain, choose-notes-app, process-brain-dump]
args:
  - name: setup
    description: Your notes app and devices, for example "Obsidian on Mac and iPhone, Apple Watch" or "Google Keep, Android phone, Windows work laptop".
    type: text
    required: true
  - name: where_ideas_get_lost
    description: When thoughts currently get lost, for example "driving, in the shower, walking the dog, mid-meeting, links I see on my phone".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your inbox, Capture doors, Stop doing, First week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Capture fails when it takes more than a few seconds or when thoughts end up in many places (texts to self, email drafts, screenshots, three apps), so nothing is reviewed. The rule experienced note-takers follow is one inbox, many doors: every capture method drops into the same inbox note or folder, and the doors are fitted to the moments ideas actually arrive. Typical doors are a home-screen widget or lock-screen shortcut that opens straight to a new note, the share sheet for links and photos, a voice assistant or watch dictation for hands-busy moments, a global keyboard shortcut on desktop, and an email-to-notes address where the app offers one. Phone automation tools (Shortcuts on iOS and Mac, routines and widgets on Android) can append to a note in one tap. What is available depends on the app and operating system version, so describe what to look for. Capture must be paired with a regular emptying of the inbox, or it becomes a pile.

Setup: {{setup}}
Where ideas get lost: {{where_ideas_get_lost}}
</context>

<task>
1. If the app or devices are unclear, ask one question and stop.
2. Name the single inbox (a note, folder or tag) everything should land in, using the app's own model.
3. For each moment where ideas get lost, choose one capture door and say how to set it up in general terms, with what to search for in settings.
4. Cover links and photos via the share sheet, and voice capture for hands-busy moments, noting that voice transcription needs a quick check later.
5. Cover desktop capture: a keyboard shortcut or quick-capture window, or a browser method for links.
6. Say what to stop doing (texts to self, email drafts, random screenshots) and how to move the backlog of those into the inbox once.
7. Give a one-week trial plan and a daily two-minute check that the inbox is being emptied, linking to a regular processing pass.
</task>

<constraints>
- Do not claim exact menu paths, shortcut names or features exist in their version; say what to look for.
- Use at most five capture doors; fewer is better.
- If a work device or work information is involved, mention checking employer rules before capturing work material into a personal app.
- No paid apps or add-ons unless their stated setup cannot capture at all; then name the gap.
- Do not suggest capturing while driving in a way that needs looking at a screen; only hands-free voice where legal and safe.
</constraints>

<output_format>
## Your inbox
## Capture doors
Table: Moment | Door | How to set it up.
## Stop doing
## First week
</output_format>
