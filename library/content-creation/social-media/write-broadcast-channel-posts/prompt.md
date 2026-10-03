---
schema: 1
id: write-broadcast-channel-posts
kind: prompt
title: Write broadcast channel posts
description: Writes posts for a WhatsApp, Telegram or Instagram broadcast channel with a cadence, varied formats and engagement prompts that fit the platform. Use to plan a week or more of channel updates.
category: social-media
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, founder]
stack: [instagram]
inputs: [topic, notes]
output: [post, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [broadcast-channel, whatsapp-channels, telegram, direct-audience]
pairs_with:
  prompts: [write-newsletter-issue, plan-sustainable-posting-schedule, write-community-guidelines]
  personas: [community-manager]
args:
  - name: channel_topic
    description: What the channel is about, who follows it, why they joined, the voice, and anything coming up (launches, events, content) to mention.
    type: text
    required: true
  - name: platform
    description: The platform, such as whatsapp, telegram or instagram.
    type: string
    required: true
  - name: count
    description: How many posts to write.
    type: number
    default: 7
output_contract:
  format: markdown
  sections: [Cadence, Posts, Engagement notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write for one-to-many broadcast channels, where a creator or brand posts and followers mostly read and react. Posts arrive like messages, sometimes with a notification, so the bar is higher than a feed post: every message must be worth the interruption, short enough to read in a glance, and feel personal and a little exclusive. Over-posting is the fastest way to get muted. Platform features shape what is possible:
- **whatsapp:** channels are one-way; followers can react with emoji, vote in polls and forward posts, but cannot reply in the channel. Posts are text, images, videos, voice notes, links, polls and stickers.
- **telegram:** channels support long formatted posts, polls and quizzes, scheduled posts, and comments when a discussion group is linked.
- **instagram:** broadcast channels let the creator send text, photos, videos, voice notes, polls and prompts; members can react and vote, and may reply to some prompts, but cannot post freely.
Features change, so the creator should check what their channel currently supports.
</context>

<task>
Write {{count}} posts for a {{platform}} channel.

<channel_topic>
{{channel_topic}}
</channel_topic>

1. Recommend a cadence that respects attention: usually three to seven posts a week, with the best times for this audience, and say why. Explain what to do in a busy week (fewer, better posts) and a quiet week.
2. Write {{count}} posts that use a mix of formats the platform supports: a short update, an exclusive or early look, a quick tip, a poll or quiz, a voice-note script, a behind-the-scenes photo prompt, a question or prompt where replies are possible, and a link post that gives a reason to click. Avoid using the same format twice in a row.
3. Each post: opens with the point (the notification preview shows only the start), stays short (most under 60 words, a voice-note script under 45 seconds), and sounds like one person talking to people they know.
4. Add engagement that fits the platform: reactions to a clear question on whatsapp, polls and linked discussion on telegram, polls and prompts on instagram. Never ask followers to reply where they cannot.
5. Mark which posts are time-sensitive and suggest a send time for each.
</task>

<constraints>
- Only mention launches, events, prices or dates given in the notes; use `[FILL: …]` for details to confirm.
- No spam patterns: no "forward this to 10 people", no fake scarcity, no misleading links.
- Keep any link to one per post, with a reason to click.
- If {{platform}} is not one of the three, say so and write for its closest equivalent with the features to confirm.
- If the voice is not described, write warm and direct, in first person, and say so.
</constraints>

<output_format>
## Cadence
A short weekly rhythm and the reasoning.

## Posts
Numbered posts, each with the format, the suggested send day and time, the text (or voice-note script), and poll options if any.

## Engagement notes
How to use reactions, polls and replies on this platform, and what to watch for (mutes, unfollows, poll response rate).
</output_format>
