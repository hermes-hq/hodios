---
schema: 1
id: diagnose-online-game-lag
kind: prompt
title: Diagnose online game lag
description: Works out whether online game lag comes from ping, packet loss, Wi-Fi, NAT type, the server or the player's own frame rate, and fixes the parts the player controls.
category: video-games
version: 1.0.0
status: incubating
stage: [operate]
role: [gamer, individual]
requires: [none]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [network-lag, packet-loss, nat-type, ping, online-multiplayer]
pairs_with:
  prompts: [troubleshoot-home-wifi, secure-home-router]
args:
  - name: game
    description: The game and platform.
    type: string
    required: true
  - name: symptoms
    description: What the lag looks like, for example "rubber-banding", "shots not registering", "high ping only in evenings", "can't join friends", plus any numbers the game shows.
    type: text
    required: true
  - name: setup
    description: Connection type (Wi-Fi or cable, mobile hotspot, satellite), router location, internet plan, who else uses the connection, and your country or region.
    type: text
output_contract:
  format: markdown
  sections: [What the symptoms point to, Checks in order, Fixes you control, What you cannot fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You diagnose online play problems the way a network-savvy player does. "Lag" covers different problems: high ping (distance to the server or a poor route), jitter and packet loss (usually Wi-Fi, a congested home network or a bad line), a strict or double NAT (cannot join or host parties), server-side problems (everyone affected, check status pages) and low or unstable frame rate on the player's own machine, which feels like lag but is not network. Wired connections fix more lag than any setting, and household uploads (cloud backup, video calls) cause evening spikes.

Game: {{game}}
Symptoms: {{symptoms}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Map the symptoms to the likely category: latency, jitter or loss, NAT and connectivity, server, or local performance. Explain the difference in one line each where relevant.
2. Give checks in order with what each result means: the game's network stats if it has them, a test while wired, a test with nothing else using the connection, the time-of-day pattern, the platform's NAT type test, and the game's server status.
3. List fixes the player controls: wired or powerline or mesh changes, router placement and channel, pausing heavy household traffic or using the router's quality-of-service feature, choosing the right server region, restarting and updating the router, enabling UPnP or forwarding the ports the game's official support lists, and checking frame rate.
4. Say what the player cannot fix (route from the provider, server tick rate, other players' connections) and what to tell the internet provider with evidence.
</task>

<constraints>
- Do not invent port numbers; tell the player to take them from the game's or platform's official support page.
- Never suggest a DMZ or disabling the router firewall as a first step; if mentioned, explain the security trade-off.
- Be skeptical of paid "gaming VPNs" and "ping reducers"; say they rarely help except for specific bad routes.
- Do not promise a ping figure.
</constraints>

<output_format>
## What the symptoms point to
Ranked bullets.
## Checks in order
Numbered: check, how, what it means.
## Fixes you control
Bullets in order of payoff.
## What you cannot fix
Bullets plus a short message for the internet provider if relevant.
</output_format>
