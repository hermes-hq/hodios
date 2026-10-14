---
schema: 1
id: prepare-for-concert
kind: prompt
title: Get ready for an artist's concert
description: Prepares you musically for seeing an artist live, with a listening plan built from their recent setlists, the deep cuts worth knowing, singalong moments and what to expect on the night.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [concerts, live-music, setlists, listening-plan, gig-prep]
pairs_with:
  prompts: [discover-new-music, prepare-for-first-opera-or-ballet, explain-song-meaning]
args:
  - name: artist
    description: The artist and the tour, for example "Fontaines D.C., spring tour".
    type: string
    required: true
  - name: setlists
    description: Optional. One or two recent setlists you have looked up, pasted in. Without them the plan is based on the artist's best-known songs and is less precise.
    type: text
  - name: familiarity
    description: How well you know them, for example "only the hits", "big fan of the first album", "going with a friend, know nothing".
    type: string
    required: true
  - name: days_left
    description: Days until the concert.
    type: number
    default: 14
output_contract:
  format: markdown
  sections: [What they are playing, Your listening plan, Moments to know, On the night]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Touring artists usually play a stable core set with a few rotating slots, so recent setlists from the same tour predict most of the night; the encore and the opener are the most predictable songs. Live versions often differ from the record: extended intros, medleys, slowed or reworked arrangements, and crowd singalongs or call-and-response parts that fans know and newcomers miss. A short plan that front-loads the songs most likely to be played, and the ones with crowd moments, makes the night much better than listening to the whole discography once. Logistics are a separate job; this is about the music.

Artist and tour: {{artist}}
{{#setlists}}Recent setlists:
{{setlists}}{{/setlists}}
Familiarity: {{familiarity}}
Days left: {{days_left}}
</context>

<task>
1. If the artist is not named clearly or you do not recognise them, ask which artist and tour, then stop. If no setlists were given, say the plan is based on the artist's best-known songs and suggest checking recent setlists from this tour, because sets change. Do not claim to know what they are currently playing.
2. If setlists were given, sort songs into core (in every set), likely (in most) and rotating, and note the opener and encore pattern.
3. Build a listening plan across {{days_left}} days that starts with core songs they do not know, then likely songs, then the albums those songs come from. Keep it realistic for their familiarity.
4. Moments to know: singalongs, call-and-response parts, songs that are reworked live, and songs where the crowd does something specific, only where you are confident; otherwise say what to listen for.
5. On the night: typical show length from the setlist count, whether there is usually a support act, how to enjoy it without filming everything, and hearing protection for loud shows.
</task>

<constraints>
- Never invent setlists, tour dates, venues or crowd rituals; mark uncertainty "(check)".
- Do not reproduce lyrics beyond a few words to name a part, even when asked to print them for memorising; point to the artist's official releases or licensed lyric sources instead.
- No ticket, resale or price advice; that belongs to trip planning.
</constraints>

<output_format>
## What they are playing
Core, likely and rotating lists, or the caveat if no setlists.
## Your listening plan
Day-range table: Days | Listen to | Why.
## Moments to know
Bullets.
## On the night
Short checklist.
</output_format>
