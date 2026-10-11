---
schema: 1
id: plan-multistream-setup
kind: prompt
title: Plan a multistream setup
description: Decides whether and how to stream to several platforms at once - terms to check, restream or local encoding, bandwidth maths, vertical feeds, merged chat and moderation, and a monthly review.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, gamer]
inputs: [notes, config]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [multistreaming, simulcast, restreaming, vertical-stream, upload-bandwidth]
pairs_with:
  prompts: [diagnose-stream-quality-issues, write-chat-mod-handbook, read-stream-analytics]
  personas: [stream-producer]
args:
  - name: current
    description: "Where you stream now, typical viewers on each, any partner, affiliate or monetisation agreement you have signed, and the platforms you want to add."
    type: text
    required: true
  - name: setup
    description: "Your PC (CPU, GPU), streaming software, measured upload speed, and whether you play games on the same machine."
    type: text
    required: true
  - name: goal
    description: "Optional. Why you want to multistream (grow on a second platform, short-form vertical audience, reach friends elsewhere)."
    type: text
output_contract:
  format: markdown
  sections: [Should you multistream, Terms to check, Technical route, Bandwidth maths, Chat and moderation, Layouts, Review after a month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Multistreaming sends one show to several platforms at once. It can find viewers on a second platform, but it also splits a small chat, so each platform looks emptier in its directory, and it makes community harder when the streamer cannot answer three chats. Some monetisation agreements have restricted simultaneous streaming or required equal quality on the main platform; these terms have changed over time and differ by programme, so the actual signed agreement decides. There are two technical routes: send one stream to a restreaming service that fans it out (saves upload bandwidth and CPU, adds a service and sometimes cost or branding), or encode several outputs locally (more control, more CPU or GPU load and upload). Upload needs headroom: total bitrate across outputs should stay well under measured upload, often around two thirds or less, to survive dips. Vertical platforms need a different layout, not a squashed horizontal feed. Merged chat tools help the streamer read, but each platform still needs its own moderators and bot settings.
</context>

<task>
<current>
{{current}}
</current>

<setup>
{{setup}}
</setup>

{{#goal}}
<goal>
{{goal}}
</goal>
{{/goal}}

1. **Should you multistream:** a recommendation for their situation, including the cost of splitting a small chat, and the alternative (stream on one platform and post clips to the others) when that fits better.
2. **Terms to check:** the clauses to look for in their agreements and platform rules (exclusivity, simultaneous streaming, quality parity, branding), marked as checks, never as settled fact.
3. **Technical route:** restream service or local multi-output encoding for their hardware, with the trade-offs.
4. **Bandwidth maths:** a table of outputs, resolution and bitrate, total against their measured upload with headroom. Show the arithmetic.
5. **Chat and moderation:** a merged chat view for the streamer, moderators and bot rules on each platform, and how to answer viewers fairly across platforms.
6. **Layouts:** horizontal and, if they add a vertical platform, a vertical layout that keeps face, game focus and captions inside safe areas.
7. **Review after a month:** what to compare per platform (average viewers, chatters, follows, effort) and when to drop a platform.
</task>

<constraints>
- Never tell them a platform allows multistreaming as fact; tell them to read their own agreement and current rules.
- Do not plan outputs that exceed their upload with headroom; reduce quality or use a restream service instead.
- Do not name prices for restream services as fact.
- Keep the recommendation honest: if multistreaming would hurt a small channel, say so.
</constraints>

<output_format>
## Should you multistream
## Terms to check
Checkbox list.

## Technical route
## Bandwidth maths
Table: output | resolution | bitrate | total vs upload.

## Chat and moderation
## Layouts
## Review after a month
</output_format>
