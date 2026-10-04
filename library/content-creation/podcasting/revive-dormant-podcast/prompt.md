---
schema: 1
id: revive-dormant-podcast
kind: prompt
title: Revive a dormant podcast
description: Diagnoses why a podcast stalled and plans either a lighter relaunch with a comeback episode and feed note, or a clean final episode and archive plan, honest about when stopping is right.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes]
output: [plan, report, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [relaunch, burnout, season-model, show-ending, archive]
pairs_with:
  prompts: [plan-podcast-season, read-podcast-listener-stats, plan-podcast-growth]
  personas: [podcast-producer]
args:
  - name: show_history
    description: What the show was, how long it ran, how often it published, when and why it stopped (as honestly as you can), listener numbers or feedback if you have them, and what you miss or do not miss about it.
    type: text
    required: true
  - name: current_capacity
    description: Realistic hours per month you (and any co-hosts) can give it now, and any money or help available.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Why it stalled, Options, Recommendation, Comeback or closing plan, Feed and listener note]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide what to do with a podcast that has gone quiet. Most shows stop for one of four reasons: time (the format costs more hours than life now allows), format (it became repetitive or the energy was in the early episodes), interest (the host's interest moved on), or numbers (the audience never grew enough to feel worth it). Restarting with the same format and cadence usually fails again for the same reason. Sometimes the right answer is a lighter format; sometimes it is a good ending, which keeps the archive useful and the host's reputation intact.

Capacity now: {{current_capacity}}

<show_history>
{{show_history}}
</show_history>
</context>

<task>
1. Why it stalled: name the main cause and any secondary ones, with the evidence from their history. Estimate the hours per episode the old format took (booking, prep, recording, editing, publishing, promotion) and compare with the stated capacity.
2. Options: lay out four realistic paths with what each costs per month in hours and what it gives back:
   - Lighter relaunch: a format that fits the capacity (shorter episodes, solo or less editing, fewer guests, a fixed segment structure).
   - Season model: batches of six to ten episodes with planned breaks, recorded ahead.
   - Pause with a date: a stated return date and what has to be true to come back.
   - Clean ending: a final episode and an archive left in good shape.
3. Recommendation: pick one and explain why in three or four sentences, including when stopping is the better call (no wish to make it, capacity below what even the lightest format needs, or the reason to make it is gone).
4. Comeback or closing plan for the recommended path:
   - Relaunch or season: the new format, cadence, a buffer of finished episodes before announcing (at least two or three), a comeback episode outline (what changed, what to expect, why now), and the first month's calendar.
   - Ending: a final episode outline (thanks, best moments, where to find the host next), a "best of" starting points list for new listeners, and steps to keep the feed and show notes online and tidy.
5. Feed and listener note: a short note for the feed description and an email or social post that tells listeners what is happening, honestly and without over-promising.
</task>

<constraints>
- Be honest but kind; do not guilt the host into continuing or push them to quit.
- Do not invent listener numbers or feedback; if you lack them, say what to look at.
- Never promise a cadence the stated capacity cannot support; show the hours.
- If the history is very thin, ask three questions (why it stopped, hours available, whether they want to make it) and give a provisional view.
</constraints>

<output_format>
## Why it stalled
Main cause, secondary causes, hours per episode then versus capacity now.
## Options
Table: Option | Hours per month | What it gives | What it risks.
## Recommendation
Three or four sentences.
## Comeback or closing plan
Steps for the recommended path.
## Feed and listener note
The feed text and the listener message.
</output_format>
