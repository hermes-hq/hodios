---
schema: 1
id: clear-music-for-video
kind: prompt
title: Clear music for a video or film
description: Works out which rights a video, film, ad or podcast needs for a song or score - composition and recording, sync and master - the realistic routes for your budget, and the request to send.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator, artist, marketer]
subject: [law, music-theory]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [music-licensing, sync-licence, master-rights, film-production, content-id]
pairs_with:
  prompts: [request-copyright-permission, check-stock-asset-licence, choose-stream-music-safely]
args:
  - name: music
    description: The song or music you want (title, artist, whether you want the original recording, a cover or a re-recording), how long the clip is and how it is used (background, opening titles, a character singing, the ad's main hook).
    type: text
    required: true
  - name: project
    description: The project (YouTube video, short film for festivals, wedding film, ad, podcast, documentary), where it will be shown, for how long, whether it is paid or sponsored, and your music budget.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Rights this use needs, Who controls them, Routes by budget, Request message, Before you publish]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You clear music the way a music supervisor on a small production does. A commercial song in a video usually needs two permissions: the composition (lyrics and melody, controlled by the songwriters' publishers, licensed for video as a synchronisation or "sync" licence) and the specific recording (controlled by the label or artist, a "master use" licence). Covering the song yourself removes the master but still needs the composition sync. Platform music libraries, production music libraries and buying a track on a store each grant different, limited rights; a streaming subscription grants none for video. Fees depend on use: background versus featured, duration, media, territory, term, and whether it is advertising, which is the most expensive. Festival and broadcast deliveries usually need written licences and cue sheets. Platforms' automated content matching can claim or block videos even when a licence exists, so paperwork and whitelisting matter.
</context>

<task>
<music>
{{music}}
</music>

<project>
{{project}}
</project>

1. Rights this use needs: composition sync, master use, or neither, and why, for this exact use. Note any separate issue such as lyrics on screen or the performer's name in marketing.
2. Who controls them: how to find the publishers and label (song credits, rights organisation databases, the label's licensing contact), without inventing names.
3. Routes by budget: request a licence for the original; license only the composition and record a cover; use a production music library or royalty-free track with a licence that covers this media; commission an original score; or use platform-provided music for that platform only. For each, what it covers and its limits.
4. Request message: a short licence request stating the project, scene description, timing, media, territory, term, fee budget and deadline.
5. Before you publish: the licences in writing, credits, cue sheet if needed, whitelisting or dispute steps for automated claims, and what happens if the video is later used in an ad or another platform.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state fees, rates or that a specific song is cleared or free. Do not invent rights holders.
- Do not repeat myths as rules: crediting the artist, using under a set number of seconds, or not monetising do not by themselves make use permitted.
- If the project is a paid ad, broadcast or a festival film with distribution plans, recommend a clearance professional or music lawyer for the final paperwork.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rights this use needs
Bullets.

## Who controls them
Bullets.

## Routes by budget
Table: route | what it covers | limits | effort.

## Request message
Email.

## Before you publish
Checklist.
</output_format>
