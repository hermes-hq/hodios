---
schema: 1
id: write-chat-bot-commands
kind: prompt
title: Write chat bot commands and panels
description: Writes a stream's chat bot commands, timed messages and channel panel text from the questions chat asks most, short enough to read at a glance and with a plan for keeping them up to date.
category: livestreaming
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, gamer]
inputs: [notes, logs, text]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [chat-bot, chat-commands, timed-messages, channel-panels, faq]
pairs_with:
  prompts: [write-chat-mod-handbook, design-channel-point-rewards]
args:
  - name: channel
    description: What you stream, schedule and time zone, platform, your setup, links you share (other platforms, community space), rules, and the questions chat asks again and again. A pasted chat log helps.
    type: text
    required: true
  - name: tone
    description: Optional. How the bot should sound, for example plain, playful, deadpan.
    type: string
output_contract:
  format: markdown
  sections: [Commands, Timed messages, Channel panels, Upkeep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Chat commands exist so the streamer does not answer "what game is this", "when do you stream" and "what mic is that" twenty times a night, and so mods can point to rules quickly. Good command replies fit on one line, answer the question first, and avoid walls of emotes. Timed messages remind new viewers of one thing each (schedule, community space, rules) and should be rare enough not to drown a slow chat; on slow chats they are better triggered by message count than by time alone. Panels under the stream are read by people deciding whether to follow: what the stream is, when it runs, and the rules belong at the top. Outdated commands (old schedule, dead links) look careless, so commands need an owner and a review habit. Bot syntax differs between bots; the text is what matters.
</context>

<task>
<channel>
{{channel}}
</channel>

{{#tone}}Tone: {{tone}}{{/tone}}

1. Pick the commands this channel needs from the repeated questions and the details given: usually schedule, rules, socials or community, setup or specs, the current game or project, lurk, and one or two fun ones from the channel's own jokes.
2. **Commands:** for each, the command name, the reply text (one line, under about 200 characters), who can use it (everyone or mods), and a cooldown suggestion. Use placeholders like [game] where the bot fills in a value and say so.
3. **Timed messages:** three to five, one idea each, with a suggested interval or message-count trigger for this chat's speed.
4. **Channel panels:** short panel texts for About, Schedule (with time zone), Rules, Community or socials, and Setup, each under about 80 words.
5. **Upkeep:** which commands go stale, who updates them, and a monthly check.
</task>

<constraints>
- Use only links, handles and facts given; where the user did not give one, write [link] or [handle] rather than inventing it.
- Do not include personal details (location, workplace, real name if not already public).
- No affiliate links or discount codes unless the user provides them, and any sponsored or affiliate link is clearly labelled.
- Bot syntax varies; write plain text and say to adapt variables to their bot.
</constraints>

<output_format>
## Commands
Table: command | reply | who | cooldown.

## Timed messages
Table: message | trigger.

## Channel panels
One short subsection per panel.

## Upkeep
</output_format>
