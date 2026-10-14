---
schema: 1
id: plan-end-of-stream-raid
kind: prompt
title: Plan end-of-stream raids
description: Plans who a streamer raids at the end of each stream - a raid list by fit and size, checks before sending viewers, raid messages, welcoming incoming raids, and turning raids into relationships.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [raids, stream-networking, raid-etiquette, community-building, small-streamers]
pairs_with:
  prompts: [plan-collab-stream, grow-streaming-channel, prepare-hate-raid-response]
  personas: [stream-producer]
args:
  - name: channel
    description: "What you stream, platform, typical viewers, schedule, and the kind of community and values you have."
    type: text
    required: true
  - name: network
    description: "Streamers you know or watch, who has raided you before, and any groups or teams you belong to."
    type: text
    required: true
  - name: concerns
    description: "Optional. Worries such as sending viewers to someone who turned out to be toxic, raids feeling transactional, or getting few raids back."
    type: text
output_contract:
  format: markdown
  sections: [Raid list, Picking each night, Before you send, Raid messages, Receiving raids, Building relationships]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Raiding at the end of a stream sends the streamer's viewers to another live channel. It is the cheapest way to build relationships between streamers, and it reflects on the raider: viewers trust that the destination fits the community's tone and values. Good raids go to channels of similar or slightly larger size and similar content or vibe, where the raiders will be noticed and welcomed; raiding a huge channel is invisible, and raiding into a mature or hostile stream with a young or sensitive audience breaks trust. Before sending, experienced streamers check that the target is live, what they are doing right now (not mid-cutscene, not in a serious conversation, not about to end), and often warn the target. A raid message gives raiders something to say. Receiving raids well matters as much: a real welcome, a shoutout with what the raider streams, and returning the favour over time. Raid trains and teams can help, but raids done only to be raided back feel transactional and fade.
</context>

<task>
<channel>
{{channel}}
</channel>

<network>
{{network}}
</network>

{{#concerns}}
<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. **Raid list:** a table of six to ten candidate channels from their network or types to look for, with content, size relative to theirs, schedule overlap, and fit notes.
2. **Picking each night:** a quick rule for choosing a target at the end of a stream (who is live, fit for tonight's chat, not raided recently, rotation).
3. **Before you send:** a short check: still live, what they are doing now, content and tone fit, and a heads-up message to the target.
4. **Raid messages:** a raid message and two variations, plus what to tell your chat about the target.
5. **Receiving raids:** a welcome routine, a shoutout command text, and what mods do when a raid arrives (including spotting a hate raid).
6. **Building relationships:** turning raids into collabs, lurking and chatting in others' streams, and keeping it genuine.
</task>

<constraints>
- Do not invent other streamers or claim facts about real ones; use names they give or describe types to look for.
- Always include checking that the target suits the raiding audience, especially if viewers may be minors.
- No raid tactics aimed at overwhelming, spamming or targeting a channel.
- Mark platform raid features as checks.
</constraints>

<output_format>
## Raid list
Table: channel or type | content | size | fit.

## Picking each night
## Before you send
Checkbox list.

## Raid messages
## Receiving raids
## Building relationships
</output_format>
