---
schema: 1
id: prepare-hate-raid-response
kind: prompt
title: Prepare a hate raid response
description: Prepares a streamer and their mods for a hate raid or bot flood with settings to have ready, a 60-second lockdown sequence, evidence and reporting steps, what to say on stream and aftercare.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [content-creator, gamer]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hate-raids, bot-floods, harassment, stream-safety, chat-moderation]
pairs_with:
  prompts: [write-chat-mod-handbook, audit-stream-for-privacy-leaks, respond-to-online-harassment]
  personas: [stream-producer]
args:
  - name: situation
    description: Your platform, how many mods you have and when they are on, what tools or bots you use, whether you have been targeted before (and how), and anything about you that attackers have focused on.
    type: text
    required: true
  - name: timing
    description: Whether you are preparing ahead, or a raid just happened and you need to deal with the aftermath.
    type: enum
    enum: [prepare, aftermath]
    default: prepare
output_contract:
  format: markdown
  sections: [Settings to have ready, Lockdown sequence, What to say on stream, Evidence and reporting, After the stream, Taking care of yourself, Check these on your platform]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A hate raid is a coordinated flood of accounts, often new or automated, posting slurs, threats or a target's personal details, sometimes arriving through a raid or host feature. It is over in minutes if the channel is ready and lasts all stream if it is not. What works: a pre-agreed lockdown that any mod can trigger in seconds (emote-only or subscriber-only chat, follower-only with a minimum follow age, slow mode, blocking incoming raids, phone or email verification for chatters where the platform offers it), not reading the messages aloud, not giving attackers a reaction, saving evidence before mass-deleting, and reporting in bulk. Attackers want a visible reaction; the streamer calmly moving on, or taking a short break, takes that away. Hate raids hurt: aftercare for the streamer and mods matters as much as settings. Threats or doxxing with real-world details are a safety issue, not just a moderation one.
</context>

<task>
<situation>
{{situation}}
</situation>

Mode: {{timing}}

1. **Settings to have ready:** chat restrictions, raid controls, verification, blocked-term categories, a bot or shared ban list if they use one, and which to keep on permanently versus switch on during a raid. Mark platform-specific names and limits as things to confirm.
2. **Lockdown sequence:** a numbered sequence any mod can run in about 60 seconds, who does it if no mod is present (a single hotkey or chat command the streamer can trigger), and when to lift it.
3. **What to say on stream:** two or three short, calm lines that do not repeat or describe the abuse, and a line for switching to a BRB scene.
4. **Evidence and reporting:** what to capture before deleting (usernames, timestamps, screenshots or clips), how to report in bulk through the platform, and when to also contact local police (threats of violence, doxxing with a home address, stalking). If anyone is in immediate danger, contact local emergency services first.
5. **After the stream:** reviewing settings, checking whether personal information spread, locking down other accounts, and a short message for the community if wanted.
6. **Taking care of yourself:** debrief with mods, not reading the logs alone, taking time off without guilt, and support from people they trust.
7. If mode is aftermath, start with steps 4 to 6 and keep 1 to 3 as "for next time".
8. **Check these on your platform:** the items whose exact names and limits the user should confirm.
</task>

<constraints>
{{> guardrails/crisis-safety}}
- Do not reproduce slurs or abusive content; refer to categories.
- Never suggest retaliation, counter-raids, identifying or exposing attackers, or contacting them.
- Do not quote tool names, limits or verification rules as fact for a specific platform when unsure; mark them as checks.
- Treat doxxing and threats of violence as safety matters with real-world steps, not only chat settings.
- Keep the tone steady and supportive; do not blame the streamer.
</constraints>

<output_format>
## Settings to have ready
Table: setting | keep on always or raid only | notes.

## Lockdown sequence
Numbered steps with who does each.

## What to say on stream
Two or three lines.

## Evidence and reporting
Numbered steps.

## After the stream
## Taking care of yourself
## Check these on your platform
Bullets.
</output_format>
