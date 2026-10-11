---
schema: 1
id: plan-collab-stream
kind: prompt
title: Plan a collab stream
description: Plans a livestream with another streamer once the collab is agreed - format, who hosts, shared audio, roles, moderation across both chats, promotion and how the stream ends.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [collaboration, co-streaming, guests, raids, cross-promotion]
pairs_with:
  prompts: [pitch-creator-collaboration, plan-livestream-run-of-show, grow-streaming-channel]
  personas: [stream-producer]
args:
  - name: collab
    description: Who you are streaming with, both channels' platforms and sizes, what you agreed to do together, the date and time zones, and whether you will be in the same room or remote.
    type: text
    required: true
  - name: goals
    description: Optional. What each side wants from it (fun, new viewers, a charity total, testing a new format).
    type: text
output_contract:
  format: markdown
  sections: [Format, Technical plan, Roles, Run of show, Moderation, Promotion, After the stream, Message to your collaborator]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Collab streams fail on logistics more than chemistry: echo because both people stream the voice call to their own stream, one streamer's audio far louder than the other's, nobody sure who ends the stream or raids where, two chats with different rules, and a smaller streamer feeling like a guest prop. The main formats each have a setup: both stream their own view with a shared voice call (each keeps their own chat and the audio from the call); one hosts and the other joins as a guest on the host's stream; or a platform's own shared or co-streaming feature where it exists. Agree before the day: format, whose audio is the reference level, the run of show, mod coverage on both channels, any sponsor or brand conflicts, what can be clipped by whom, and how the stream ends. Time zones cause more missed starts than tech.
</context>

<task>
<collab>
{{collab}}
</collab>

{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

1. **Format:** recommend one format for this pair (both streaming their own view, one host with a guest, or a shared feature on the platform if available) and why; mark platform features as things to confirm.
2. **Technical plan:** voice call setup, avoiding echo (headphones, not routing the call back into the call), balancing levels, a quick soundcheck 20 minutes before, and what happens if one side drops.
3. **Roles:** who leads which segment, who watches which chat, who reads alerts, and fair airtime for the smaller channel.
4. **Run of show:** a timed outline with start time in both time zones, segments, breaks and the ending.
5. **Moderation:** shared basics both chats follow, sharing mod contacts, and how to handle a problem in the other person's chat.
6. **Promotion:** announcement copy for each side, posted at agreed times, with each other's handles.
7. **After the stream:** who raids whom or how to end, clipping permissions, thank-you posts.
8. **Message to your collaborator:** a short message confirming all agreed points and listing open questions.
</task>

<constraints>
- Do not invent the other streamer's preferences or numbers; list what to confirm with them.
- Clips and highlights that feature the other person need their agreement; say so.
- If either channel has a sponsor, flag possible brand conflicts to check before the day.
- Platform co-streaming features and rules change; mark them as checks.
</constraints>

<output_format>
## Format
## Technical plan
## Roles
Table: role | who.

## Run of show
Table: time (both zones) | segment | lead | notes.

## Moderation
## Promotion
Two short posts, one per side.

## After the stream
## Message to your collaborator
</output_format>
