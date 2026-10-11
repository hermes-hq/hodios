---
schema: 1
id: plan-viewer-game-night
kind: prompt
title: Plan a viewer game night
description: Plans a stream where viewers join the streamer's game - game and format, a fair queue, private lobbies, voice and conduct rules, age and safety checks, mod roles and the rules post.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [plan, checklist, post]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [viewer-games, community-night, game-lobby, queue-rules, stream-sniping]
pairs_with:
  prompts: [write-chat-mod-handbook, design-chat-interactive-segments, plan-livestream-run-of-show]
  personas: [stream-producer]
args:
  - name: plan
    description: "The game or games, platform, how many viewers can join at once, how often you want to run it, and how long a session lasts."
    type: text
    required: true
  - name: community
    description: "Typical viewers and chatters, whether viewers are likely under 18, existing mods, Discord, and any past trouble (snipers, griefers, toxic voice chat)."
    type: text
    required: true
  - name: perks
    description: "Optional. Whether subs, members or regulars get priority and how you feel about that."
    type: text
output_contract:
  format: markdown
  sections: [Game and format, Queue rules, Joining safely, Voice and conduct, Mod roles, Rules post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Playing with viewers is one of the strongest community builders for small and mid-size channels, and one of the easiest to get wrong. The queue decides who feels welcome: sub-only queues can earn money but leave new viewers out, while a mixed approach (rotating spots, a subscriber lane and an open lane, one game per person before repeats) feels fair. Lobby codes shown on stream get taken by stream snipers and griefers, so codes go privately (to the person, via a whisper, Discord role or delayed reveal), and the stream may need a short delay. Viewer voice chat goes out on the streamer's broadcast, so anything a viewer says becomes the streamer's problem; push-to-talk, a mute plan and a rule that slurs mean removal protect everyone. Game age ratings and platform rules apply, and adults should not move young viewers to private chats or DMs. Friend requests and account details shared with strangers are a privacy risk for both sides.
</context>

<task>
<plan>
{{plan}}
</plan>

<community>
{{community}}
</community>

{{#perks}}
<perks>
{{perks}}
</perks>
{{/perks}}

1. **Game and format:** how a game night runs for their game (rounds, teams, custom rules), how long each viewer plays, and how it fits a stream's length.
2. **Queue rules:** a fair queue for their audience, with any sub or member priority balanced against open spots, and bot commands to join and see position.
3. **Joining safely:** how lobby codes or invites are shared privately, whether to use a stream delay, friend request and account privacy for both sides, and age rating checks for the game.
4. **Voice and conduct:** voice settings, what gets someone removed, the streamer's mute or kick plan, and no private DMs between adults and minors.
5. **Mod roles:** who runs the queue, who watches for snipers, who handles removals, and the signals between mods and the streamer.
6. **Rules post:** a short post for the panel or Discord with how to join, the queue, conduct and removal rules.
</task>

<constraints>
- Never suggest showing lobby codes openly on stream.
- If viewers may be minors, include age rating checks and no private DMs or off-platform contact between adult players and minors.
- Do not design pay-to-play queues where only paying viewers can ever join, unless the streamer asks, and then say the trade-off.
- Mark game and platform features (custom lobbies, delay settings) as checks.
</constraints>

<output_format>
## Game and format
## Queue rules
## Joining safely
Checkbox list.

## Voice and conduct
## Mod roles
Table: role | who | job.

## Rules post
</output_format>
