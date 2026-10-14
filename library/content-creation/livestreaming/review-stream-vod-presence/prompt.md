---
schema: 1
id: review-stream-vod-presence
kind: prompt
title: Review on-camera presence in a stream VOD
description: Reviews a past stream's transcript or notes for on-camera habits - dead air, how chat is greeted, narration, energy dips, filler, self-talk about numbers - with timestamps and three habits to change.
category: livestreaming
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, gamer]
inputs: [transcript, notes]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [on-camera-presence, dead-air, stream-feedback, vod-review, chat-engagement]
pairs_with:
  prompts: [practise-talking-to-empty-chat, read-stream-analytics, pick-vod-highlight-clips]
  personas: [stream-producer]
args:
  - name: vod
    description: "The stream's transcript (auto captions are fine) with timestamps, or detailed notes and timestamps of moments you want reviewed; plus the chat log if you have it."
    type: text
    required: true
  - name: context
    description: "What the stream was, platform, average viewers and chatters, and what you want feedback on (dead air, energy, chat, explaining gameplay)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What went well, Patterns with timestamps, Dead air, Chat handling, Three habits to change, Drill for next stream]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Watching your own VODs is the fastest way to improve as a streamer and the step most people skip because it is uncomfortable. The useful patterns are concrete and countable: long stretches of silence when a viewer may arrive, reading chat messages without answering them, greeting only regulars, narrating nothing when the game gets hard, repeated filler, and comments about low viewer numbers that make new viewers feel they joined something failing. A new viewer often decides within the first minute or two whether to stay, so the moments when chat is quiet matter more than the moments when it is busy. Feedback works when it is specific (timestamp, what happened, what to try instead) and when the streamer changes two or three habits at a time rather than everything. Transcripts miss tone and on-screen action, so a review from text must say what it cannot judge.
</context>

<task>
<vod>
{{vod}}
</vod>

<stream_details>
{{context}}
</stream_details>

1. **What went well:** two or three specific strengths with timestamps, so they keep doing them.
2. **Patterns with timestamps:** a table of recurring habits found in the transcript (silence, unanswered chat, filler, energy drops, negative self-talk about numbers), with counts and example timestamps.
3. **Dead air:** the longest silent stretches, what was happening, and what they could have said (narrating decisions, asking chat a question, a running goal).
4. **Chat handling:** how chat was greeted and answered, whether new chatters got a response, and examples of better replies in their voice.
5. **Three habits to change:** the three changes most likely to help, each with a concrete replacement behaviour.
6. **Drill for next stream:** a short practice they can do live (a sticky note prompt, a timer reminder, a question bank) and how to check progress on the next VOD.
</task>

<constraints>
- Quote or cite timestamps from the material given; never invent moments.
- Say what a transcript cannot show (tone, facial expression, gameplay) and avoid judging it.
- Be direct but kind; no comments on appearance, voice quality as a person, or identity.
- Limit the change list to three habits.
</constraints>

<output_format>
## What went well
## Patterns with timestamps
Table: pattern | count | example timestamps.

## Dead air
## Chat handling
## Three habits to change
Numbered list.

## Drill for next stream
</output_format>
