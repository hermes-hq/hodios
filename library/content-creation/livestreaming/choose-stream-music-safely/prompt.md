---
schema: 1
id: choose-stream-music-safely
kind: prompt
title: Choose music for a stream safely
description: Plans what music a streamer can play live and keep in VODs and clips - licensed sources, game soundtracks, covers and DJ sets - with a setup that protects VODs and steps if a claim arrives.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, gamer]
inputs: [notes, preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stream-music, copyright-claims, dmca, vod-audio, music-licensing]
pairs_with:
  prompts: [set-up-stream-audio-chain, pick-vod-highlight-clips]
  personas: [stream-producer]
args:
  - name: plan
    description: "What music you want and where: background music while gaming, music in breaks or starting-soon screens, game soundtracks, singing covers, DJ sets, reacting to music videos."
    type: text
    required: true
  - name: channel
    description: "Your platform or platforms, whether you keep VODs, post clips or upload highlights to YouTube or TikTok, and your country."
    type: text
    required: true
  - name: history
    description: "Optional. Any claims, strikes, muted VODs or warnings you have had so far."
    type: text
output_contract:
  format: markdown
  sections: [Where your risk is, Music sources by risk, Setup to protect VODs, Special cases, If you get a claim, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Playing a song on a livestream is a public performance and, in VODs and clips, a copy; owning the song, paying for a music streaming subscription or crediting the artist does not grant those rights. Streaming platforms act on rights holders' notices and automated matching, and penalties range from muted VOD sections to strikes that can end a channel; enforcement often lands weeks later on old VODs and clips, which is why many streamers were caught by mass takedowns of archived clips. Risk differs by where audio ends up: live-only is lower than VODs, which is lower than highlights uploaded to platforms with strong automated matching. Safer sources are music the streamer has a licence for that explicitly covers live streaming and VODs, platform-provided libraries for that platform, stream-safe catalogues whose terms name streaming, and music from artists who have given written permission. Game soundtracks are not automatically safe; some publishers allow streaming, some tracks are licensed music that is claimed. Singing or playing covers still uses the song's composition rights, and DJ sets of commercial tracks are the highest risk unless the platform has a specific licensed programme. Rules and programmes change and differ by country and platform.
</context>

<task>
<plan>
{{plan}}
</plan>

<channel>
{{channel}}
</channel>

{{#history}}
<history>
{{history}}
</history>
{{/history}}

1. **Where your risk is:** rate their plan by where the audio ends up (live, VOD, clips, uploads elsewhere) and their history, in plain words.
2. **Music sources by risk:** a table of the source types they could use, from lowest to highest risk, and what to read in each licence (does it name live streaming, VODs, monetised channels, other platforms).
3. **Setup to protect VODs:** route music on its own audio track and exclude it from the VOD track where the platform or software allows, keep a separate scene for music-heavy segments, and decide which clips get deleted or muted.
4. **Special cases:** singing or instrument covers, game soundtracks, music reactions, and DJ sets, each with the honest risk and what permission or programme to look for.
5. **If you get a claim:** what to do in order: read the notice, remove or mute the content, do not reupload, keep records, when a counter-notice might be appropriate and why to get advice before filing one.
6. **Checks:** what to confirm on their platform's current music and copyright rules and in each licence's terms.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that any specific song, service or game soundtrack is safe as fact; describe what licence terms to check.
- Do not suggest tricks to evade content matching (pitch shifting, speeding up, low volume); explain that they do not grant rights.
- Do not encourage filing counter-notices without a real basis; that has legal consequences.
- Mark platform rules and programmes as checks; they change.
</constraints>

<output_format>
## Where your risk is
## Music sources by risk
Table: source | risk | what to check in the terms.

## Setup to protect VODs
Checkbox list.

## Special cases
## If you get a claim
Numbered steps.

## Checks
</output_format>
