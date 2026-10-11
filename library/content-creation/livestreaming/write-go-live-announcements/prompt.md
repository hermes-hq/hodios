---
schema: 1
id: write-go-live-announcements
kind: prompt
title: Write stream titles and go-live posts
description: Writes a stream's title options, category and tag choices, go-live notification text and short social and Discord posts, specific about what viewers get and honest about the stream.
category: livestreaming
version: 1.0.0
status: incubating
stage: [ship]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [copy, post, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [stream-title, go-live-notification, discord-announcement, stream-discovery]
pairs_with:
  prompts: [grow-streaming-channel, write-chat-bot-commands]
  personas: [stream-producer]
args:
  - name: stream
    description: "What today's stream is (game or topic, goal, guest, special segment), the platform and how long you plan to go."
    type: text
    required: true
  - name: channel
    description: "Your channel's usual tone, typical viewers, where you post (X, Bluesky, Instagram stories, Discord) and any running jokes or series names."
    type: text
    required: true
  - name: past_titles
    description: "Optional. A few past titles and how those streams did, so the new ones can learn from them."
    type: text
output_contract:
  format: markdown
  sections: [Title options, Category and tags, Go-live notification, Social and Discord posts, Recurring pattern]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A stream title is read in a crowded directory next to a thumbnail or live preview, a category and a viewer count, and many surfaces cut long titles short, so the start of the title carries it. People browsing decide in a second whether this stream offers something specific: a goal ("first blind run of the DLC"), an event ("viewer games, join the lobby"), a guest, or a clear mood. Vague titles ("chill stream", "come hang") give a stranger no reason to click, and clickbait that the stream does not deliver (a giveaway that is not happening, "last stream ever") costs trust and follows. Titles should change each stream; stale titles signal a channel on autopilot. Category choice matters as much as the title: a huge category buries a small stream, while a smaller fitting category or a niche tag can surface it. Go-live notifications and social posts work best sent just before or at go-live, with the one thing that is different today. Platform character limits, tag rules and notification features change and differ.
</context>

<task>
<stream>
{{stream}}
</stream>

<channel>
{{channel}}
</channel>

{{#past_titles}}
<past_titles>
{{past_titles}}
</past_titles>
{{/past_titles}}

1. **Title options:** five titles, each with the specific hook in the first 40 characters, varying the angle (goal, event, question, mood). Mark the one you would use and why.
2. **Category and tags:** the main category plus one alternative if the main one is very crowded, and tags that describe language, format and audience honestly. Say what to check on the platform (current tag rules, category size at stream time).
3. **Go-live notification:** a short notification text where the platform allows one, written so it still makes sense on a lock screen.
4. **Social and Discord posts:** one post per channel they named, each shaped for that channel (Discord can ping a role and say more; short-form social needs the hook first), with the stream link placeholder.
5. **Recurring pattern:** if they stream a series, a title pattern they can reuse (series name, episode or day number, today's hook) so regulars recognise it.
</task>

<constraints>
- Never write a title that promises something not happening in the stream (giveaway, drama, guest, ending the channel).
- Do not invent platform character limits or tag rules as exact; mark them as checks.
- Keep the channel's own voice; do not add hype words the streamer would not say.
- No engagement bait aimed at a person (calling out another streamer, rumours).
</constraints>

<output_format>
## Title options
Numbered list with character count; mark the pick.

## Category and tags
## Go-live notification
## Social and Discord posts
One block per channel.

## Recurring pattern
</output_format>
