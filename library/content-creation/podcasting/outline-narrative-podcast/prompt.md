---
schema: 1
id: outline-narrative-podcast
kind: prompt
title: Outline a narrative podcast episode
description: Outlines a narrative or documentary podcast episode with story structure, scene order, narration beats, a tape list and reporting gaps. Use before recording interviews or writing narration.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, writer, researcher]
inputs: [notes, document]
output: [outline, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [narrative-audio, documentary, story-structure, tape-list, scene-writing]
pairs_with:
  prompts: [write-documentary-outline, create-podcast-edit-list, plan-podcast-season]
  personas: [podcast-producer]
args:
  - name: story
    description: The story, what you know so far, the people involved and their access, tape or archive you already have, and what you are unsure about.
    type: text
    required: true
  - name: length_minutes
    description: Target length of the episode in minutes.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Logline and question, Structure, Scene-by-scene outline, Tape list, Reporting gaps, Ethics and rights]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a narrative audio editor. Narrative podcasts hold listeners with the same engine as any story (a character who wants something, obstacles, a turn and a change) but in audio the listener cannot see, skim or rewind easily, so structure must be clearer than in print. Episodes are built from scenes (tape of something happening, with sound you can picture), interviews (people reflecting), archival audio, and narration that sets up, connects and interprets. Good narration does not repeat what the tape says; it sets up what to listen for. A rule of thumb used in many shows is an anecdote followed by a moment of reflection, again and again, with a central question that is raised early and answered, or deliberately left open, at the end. Planning the tape before reporting saves weeks: you know which scenes you must capture and which questions you must ask.
</context>

<task>
Outline a {{length_minutes}}-minute narrative episode.

<story>
{{story}}
</story>

1. **Logline and question.** One sentence about whose story this is, what they want and what stands in the way. Then the central question the listener will carry through the episode, and the answer if it is known.
2. **Choose a structure** (chronological, a cold open from the climax then back to the beginning, two braided timelines, or an investigation following the reporter), and explain why it suits this story.
3. **Outline scene by scene** with minute budgets that add up to {{length_minutes}}: cold open, the setup of character and stakes, rising complications, the turn, the resolution and the closing reflection. Mark mid-roll break points at cliffhanger moments if the show has ads.
4. For each scene give: what happens, the tape it needs (scene, interview, archive, ambient sound), the narration beat in one or two sentences (what the narrator sets up or connects, not a full script), and what the scene adds to the central question.
5. **Build the tape list**: every piece of tape the outline relies on, marked "have", "need to record" or "need to find", with who or where it comes from and the interview questions or scene moments to capture.
6. **List reporting gaps**: facts to verify, people not yet contacted, alternative perspectives missing, and what the episode does if a key interview falls through.
7. **Note ethics and rights**: consent for recording, people who could be identified or harmed, fairness to those criticised (a chance to respond), and permissions for archival audio and music.
</task>

<constraints>
- Use only facts from the story notes. Treat everything else as a question to report, never as an invented detail, quote or scene.
- Do not write dialogue or quotes for real people; describe the tape needed instead.
- If the story lacks a character with something at stake, say so and suggest who or what could carry the story.
- Keep narration beats short; this is an outline, not a script.
- If the story involves crime, health, children or allegations against identifiable people, flag the legal and ethical review it needs before release.
</constraints>

<output_format>
## Logline and question
## Structure
The chosen structure and why, in a short paragraph.

## Scene-by-scene outline
A table: # | minutes | scene | tape needed | narration beat | what it adds.

## Tape list
A table: tape | status (have, record, find) | source | questions or moments to capture.

## Reporting gaps
Bullets, including the fallback if a key interview falls through.

## Ethics and rights
Bullets.
</output_format>
