---
schema: 1
id: write-audio-description-script
kind: prompt
title: Write an audio description script
description: Writes an audio description script so blind and low-vision viewers can follow a video, describing essential action in natural pauses without talking over dialogue.
category: video
version: 1.0.0
status: incubating
stage: [build, verify]
role: [content-creator, teacher]
requires: [none]
inputs: [transcript, notes]
output: [script, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audio-description, described-video, blind-and-low-vision, timed-text]
pairs_with:
  prompts: [write-video-chapters, write-tts-voiceover-script, plan-ai-presenter-video]
args:
  - name: video_transcript
    description: The dialogue and important sounds with timestamps (in and out times for each line), e.g. from your captions file.
    type: text
    required: true
  - name: scene_notes
    description: What is on screen, with timestamps where possible - action, settings, people, on-screen text, graphics, expressions. The assistant cannot watch the video, so this is its only view of the picture.
    type: text
    required: true
  - name: style
    description: "standard fits descriptions into natural gaps in the audio; extended pauses the video where gaps are too short (for online players and training material that support it)."
    type: enum
    enum: [standard, extended]
    default: standard
output_contract:
  format: markdown
  sections: [Gap map, Description script, Did not fit, Delivery notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Audio description (AD) is an extra narration track that tells blind and low-vision viewers what they cannot see: action, settings, people, expressions, on-screen text. Widely followed conventions: describe what is visible, not what it means; use the present tense and plain language; describe in the gaps and never over dialogue or important sound; prioritise what the viewer needs to follow the story or the lesson; identify people by name once the video has established it; read out essential on-screen text; do not censor or editorialise; and do not explain what the soundtrack already makes clear. Standard AD fits within existing pauses; extended AD pauses the video when the pauses are too short, which suits online learning and corporate video.
</context>

<task>
Write a `{{style}}` audio description script.

<video_transcript>
{{video_transcript}}
</video_transcript>

<scene_notes>
{{scene_notes}}
</scene_notes>

1. If the transcript has no timestamps, or the scene notes are too thin to know what happens visually, ask for timestamps or fuller scene notes in one message and stop. Never invent visual content that is not in the scene notes.
2. **Gap map.** From the timestamps, list every gap in dialogue and key sound longer than about 1.5 seconds, with its start, end and length. At a description pace of about 2.5 to 3 words per second, note the word budget for each gap.
3. **Prioritise.** For each stretch of video, decide what a viewer who cannot see must know, in this order: who is present and where (when it changes), essential action, on-screen text and graphics that carry information, expressions and body language that change meaning, and then setting and atmosphere if room remains.
4. **Description script.** For each gap, write the description in present tense, third person, plain words, within the word budget, starting a beat after the previous line ends and ending before the next one starts. Describe what is seen ("She frowns and pushes the letter away"), not interpretation ("She is upset"). Name people once established; before that, describe them briefly ("a woman in a nurse's uniform"). Read essential on-screen text, introduced naturally ("A sign reads: Closed for repairs").
5. **Too-short gaps.** For `standard`, list information that did not fit and suggest the nearest earlier gap where it could go, or a shorter wording. For `extended`, mark where to pause the video, the description to insert, and resume.
6. **Delivery notes.** Voice: neutral, clear, a little lower in energy than the content; mixed so it is clear but does not swamp the soundtrack. Suggest a test with at least one blind or low-vision viewer where possible.
7. Before answering, check that no description overlaps a dialogue line or key sound by its timestamps, that each one fits its word budget, and that every visual statement is supported by the scene notes.
</task>

<constraints>
- Do not describe anything that is not in the scene notes; mark gaps in knowledge as [NEEDS VISUAL CHECK].
- Do not interpret characters' thoughts or tell viewers how to feel.
- Describe people by observable features relevant to the content; mention appearance details such as skin tone, age or disability neutrally and only when they matter to the content or the creator's description policy says to.
</constraints>

<output_format>
## Gap map
Table: Gap | Start | End | Seconds | Word budget.
## Description script
Table: In | Out | Description | Words. For extended, add a Pause column.
## Did not fit
List with the suggested fix, or "Everything essential fits."
## Delivery notes
</output_format>
