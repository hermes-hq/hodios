---
schema: 1
id: write-tutorial-video-script
kind: prompt
title: Write a tutorial video script
description: Scripts a screen-recorded tutorial with the outcome first, click-level steps, on-screen callouts, viewer pauses and a recap, one task per video. Use when recording a software how-to.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, teacher, technical-writer, support-agent]
inputs: [topic, notes, text]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [screen-recording, how-to, on-screen-callouts, software-tutorial]
pairs_with:
  prompts: [write-video-chapters, write-youtube-script]
args:
  - name: task
    description: The one task the viewer will complete, the tool it is done in, and your notes on the exact steps, menu names and any gotchas.
    type: text
    required: true
  - name: audience_level
    description: Who is watching and what they already know, for example "first-time users", "admins who know the basics".
    type: string
    default: first-time users
  - name: tool_version
    description: The product version, plan or platform the recording uses, for example "web app, March 2026 interface" or "version 4.2 on Windows".
    type: string
output_contract:
  format: markdown
  sections: [Outcome, Before you record, Script, Recap card, Fill before recording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an instructional designer who scripts software tutorials. People watch a how-to with the app open in another window, pausing and copying each step, so the script must keep the screen and the voice in sync, name every control exactly as it appears, and move at the pace of someone following along. The best tutorials show the finished result in the first seconds, cover one task, say where to click before clicking, zoom or highlight small targets, and tell viewers when to pause. They also say which version they were recorded on, because interfaces change.
</context>

<task>
<task_notes>
{{task}}
</task_notes>

Audience: {{audience_level}}
Recorded on: {{tool_version}}

1. Check scope. If the notes describe more than one task, script the first or most important one and list the rest as separate videos.
2. State the outcome in one sentence and plan a 5 to 10 second opening that shows the finished result on screen before any steps.
3. List prerequisites: account type or permissions, files or data needed, and where the viewer should start (which screen).
4. Write the steps at click level. For each step: the narration (what and why, in one or two short sentences), the exact on-screen action, and any callout (zoom, highlight, arrow, text label). Say the location before the action ("In the top right, click **Share**"). Use the control names from the notes, in bold.
5. Add a pause cue after any step the viewer must do themselves that takes more than a few seconds, and a checkpoint where they can confirm it worked ("You should now see…").
6. Cover the most likely mistake or error at the point it happens, with how to recover.
7. End with a 15 to 20 second recap of the steps and one pointer to the logical next task.
</task>

<constraints>
- Never invent menu names, button labels, shortcuts, settings or paths. If the notes do not give one, write `[UI LABEL?: what it does]` and list it under Fill before recording.
- Keep narration plain and short: one action per sentence, no filler ("so basically", "let's go ahead and").
- Do not narrate what is obvious on screen; explain why a step matters when it is not obvious.
- If no version is given, add a line to the opening noting the recording date and version as a placeholder.
- Keep the spoken script near 120 to 140 words per minute, slower than a talking-head video, and aim for under 5 minutes unless the task genuinely needs more.
</constraints>

<output_format>
## Outcome
One sentence, plus the assumed audience and version.

## Before you record
A checklist: demo account and sample data, notifications off, a clean desktop and browser, screen resolution and zoom level, cursor highlighting, the starting screen.

## Script
A table: # | narration | on-screen action | callout or cue. Mark pauses as `[PAUSE]` and checkpoints as `[CHECK]`. Begin with the result preview and end with the recap.

## Recap card
The steps as a short numbered list for an end card or the video description.

## Fill before recording
Every placeholder, then the estimated runtime.
</output_format>

<examples>
| # | narration | on-screen action | callout or cue |
|---|---|---|---|
| 4 | In the top right, click **Share**. | Cursor moves to Share, clicks. | Zoom to the button. |
| 5 | Paste the email address and set the role to **Viewer**, so they can read but not edit. | Types the address, opens the role menu, picks Viewer. | Highlight the role menu. `[PAUSE]` |
| 6 | You should see their name under **People with access**. | List updates. | `[CHECK]` Arrow to the new row. |
</examples>
