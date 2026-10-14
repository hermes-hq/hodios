---
schema: 1
id: script-storytime-video
kind: prompt
title: Script a storytime video
description: Scripts a personal storytime video from a real event with a cold open, clear stakes, escalating beats, a payoff and visual notes, without embellishing what happened.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator]
requires: [none]
inputs: [notes, text]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [storytime, cold-open, personal-story, story-beats, privacy]
pairs_with:
  prompts: [write-video-hooks, package-video-title-thumbnail, give-rough-cut-notes]
  personas: [video-editor]
args:
  - name: story
    description: What happened, in your own words and in any order - who was involved (use roles or first names), where, what was at stake, how it ended and how you feel about it now. Include any photos, messages or clips you have.
    type: text
    required: true
  - name: length_minutes
    description: Target runtime in minutes.
    type: number
    default: 8
  - name: voice_sample
    description: A short transcript of you talking on camera, used to match your voice.
    type: text
output_contract:
  format: markdown
  sections: [Story spine, Script, Visual list, Privacy and accuracy check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help creators turn something that really happened to them into a storytime video. Most storytimes lose viewers in the first minute because the teller starts at the chronological beginning with backstory ("so, three years ago I moved to..."). Good storytellers open in the middle, at the moment of highest tension, then rewind just enough to make it make sense. They make the stakes concrete (what could be lost), escalate through a few complications, slow down at the turning point with specific detail, and keep the reflection short. A talking-head story also needs visual relief: photos, screenshots, a simple map, text on screen, re-enactment shots or b-roll. Because the story is about real people, it must stay true and must not expose or defame anyone.
</context>

<task>
<story>
{{story}}
</story>

<voice_sample>
{{voice_sample}}
</voice_sample>

Runtime: about {{length_minutes}} minutes (about 150 spoken words a minute).

1. Find the spine: the one-line version of the story, the moment of highest tension, the stakes, the turning point and the payoff. If the story has no clear tension or ending yet, say so and suggest the angle that is strongest (what you learned, the absurdity, the near miss).
2. Cold open (under 30 seconds): start at or just before the tension moment, then cut back with a line that promises how it turned out.
3. Setup: only the backstory the viewer needs to understand the stakes, in under a minute.
4. Beats: three to five escalating moments in order, each with a specific detail from the input (what was said, seen or felt). Mark where the creator should pause or slow down.
5. Turning point and payoff: give them room; this is where the most detail goes.
6. Reflection and close: one or two sentences on what changed or what the viewer can take from it, then a call to action to a related video. No long moral.
7. Match the voice sample if given; otherwise write as natural speech with contractions and short sentences.
</task>

<constraints>
- Never invent events, dialogue, names, places or details. Where the script would benefit from a detail the input does not give, insert `[DETAIL: what to add]` for the creator to fill from memory.
- Do not exaggerate danger, cruelty or tragedy beyond what the input says. If the creator wants a dramatised version, label the dramatised parts in the script.
- Refer to other people by role or first name only. Flag anything that identifies a private person (full names, workplaces, faces in screenshots, addresses, usernames), anything that could be defamatory (accusing someone of a crime or misconduct), and anything involving a child, so the creator can blur, cut or get consent.
- If the story involves someone else's trauma, health or legal case, recommend asking them before publishing.
</constraints>

<output_format>
## Story spine
One-line story, tension moment, stakes, turning point, payoff.

## Script
Blocks headed with approximate timestamps and labels (`### [00:00] Cold open`). Spoken lines as paragraphs; cues on their own lines as `[PAUSE]`, `[ON SCREEN: ...]`, `[PHOTO: ...]`, `[B-ROLL: ...]`.

## Visual list
Bullets of every photo, screenshot, map, text card or shot the edit needs, with whether the creator has it.

## Privacy and accuracy check
Checklist: people and details to blur or anonymise, consents to get, claims about others to soften or verify, every `[DETAIL]` placeholder, then the word count and estimated runtime.
</output_format>
