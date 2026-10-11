---
schema: 1
id: design-channel-point-rewards
kind: prompt
title: Design channel point rewards
description: Designs a stream's channel point or loyalty rewards with cost tiers, cooldowns and caps, automatic versus manual rewards and who fulfils them, so redemptions add to the show without derailing it.
category: livestreaming
version: 1.0.0
status: incubating
stage: [design]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [channel-points, loyalty-rewards, viewer-interaction, redemptions, community]
pairs_with:
  prompts: [write-chat-bot-commands, grow-streaming-channel]
args:
  - name: stream
    description: What you stream, platform, average viewers, how often, the running jokes and rituals in your chat, and current rewards if any (with what goes wrong).
    type: text
    required: true
  - name: limits
    description: Optional. Things you never want viewers to control (for example game difficulty, your appearance, anything during competitive matches).
    type: text
output_contract:
  format: markdown
  sections: [Principles for this channel, Reward list, Pricing logic, Running them, What to drop, Review after a month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Loyalty points reward people for watching, so good rewards make regulars feel seen and give quiet viewers a way to take part. Bad rewards derail the show: a redemption that interrupts a hard section every five minutes, rewards the streamer forgets to fulfil (which feels like a broken promise), or rewards that let viewers push the streamer into things they dislike. Points cost viewers no real money, but they must still feel worth saving up for. Useful design levers: cost tied to how often it should happen per stream, global and per-viewer cooldowns, a cap per stream, rewards that run automatically (a sound, an on-screen effect, a highlighted message) versus ones the streamer must act on, and a queue the mods can manage. Inside jokes from the chat make the best rewards. Platforms differ in what is built in; some features need a bot or extension.
</context>

<task>
<stream>
{{stream}}
</stream>

{{#limits}}
<limits>
{{limits}}
</limits>
{{/limits}}

1. **Principles for this channel:** three short rules (for example "nothing that interrupts a boss fight", "every manual reward gets done on the same stream"), drawn from the stream and limits.
2. **Reward list:** 8 to 12 rewards across three tiers (cheap and frequent, mid, rare and big), each with what it does, whether it is automatic or manual, cost relative to the others, cooldown and per-stream cap, and who fulfils it. Build several from the chat's own rituals.
3. **Pricing logic:** how to set costs from how often viewers earn points in a typical stream on their platform (tell them to check the earn rate), so cheap rewards are used a few times a stream and rare ones roughly weekly; adjust after watching usage.
4. **Running them:** pausing rewards during focused segments, a mod-managed queue for manual ones, refunds for unfulfilled redemptions, and a chat command explaining rewards.
5. **What to drop:** current rewards that cause trouble, with why.
6. **Review after a month:** what to look at (which are never used, which cause friction) and how to adjust.
</task>

<constraints>
- Never design rewards that ask viewers for personal information, pressure anyone into spending real money, or let viewers control anything the streamer listed as off limits.
- No rewards that target or embarrass other viewers or guests.
- Mark platform feature names, limits and earn rates as things to check.
- Keep rewards the streamer can sustain every stream.
</constraints>

<output_format>
## Principles for this channel
## Reward list
Table: reward | tier | what it does | automatic or manual | relative cost | cooldown and cap | who fulfils.

## Pricing logic
## Running them
## What to drop
## Review after a month
</output_format>
