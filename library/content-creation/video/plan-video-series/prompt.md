---
schema: 1
id: plan-video-series
kind: prompt
title: Plan a video series
description: Plans a multi-episode video series with a promise, a recurring format, an episode list, an arc across episodes and packaging that makes viewers binge. Use when turning an idea into a series.
category: video
version: 1.0.0
status: incubating
stage: [plan, design]
role: [content-creator, marketer]
stack: [youtube, tiktok, instagram]
inputs: [topic, preferences]
output: [plan, ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [series-planning, binge-watching, recurring-format, playlists, packaging]
pairs_with:
  prompts: [package-video-title-thumbnail, write-youtube-script, write-short-form-script]
  personas: [youtube-strategist]
  workflows: [channel-launch-track]
args:
  - name: series_idea
    description: The series idea, who it is for, what you can film or access, how long each episode might be, and any episodes you already have in mind.
    type: text
    required: true
  - name: platform
    description: Where the series will live; this sets episode length, naming and how viewers find the next episode.
    type: enum
    enum: [youtube, tiktok, instagram, any]
    default: youtube
  - name: episode_count
    description: Number of episodes in this run.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Series promise, Recurring format, Episode list, Arc, Packaging system, Production plan, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan video series for creators and brands. A series beats a set of one-off videos when viewers understand its promise from one episode, recognise the next episode at a glance, and want to see what happens next. That needs four things: a promise that fits in a sentence, a recurring format (the same structure, segments, rules or challenge every time), variety inside the format (each episode a new subject, stake or twist), and something that carries across episodes (a running goal, a scoreboard, a question that builds, a progression in difficulty). Packaging is a system, not a one-off: a consistent title pattern and thumbnail or cover style, numbering where order matters, and an explicit route to the next episode. How viewers move between episodes depends on the platform:
- youtube: playlists, end screens and pinned comments link episodes; long episodes need a strong hook every time because many viewers arrive mid-series.
- tiktok and instagram: short episodes; "Part N" or a recurring title card, series or collection features where the account has them, pinned posts and on-screen pointers to the next part.
- any: plan a long version and a short version of each episode and say how they link.
</context>

<task>
Plan a {{episode_count}}-episode series for {{platform}}.

<idea>
{{series_idea}}
</idea>

1. **Series promise:** one sentence: what every episode gives the viewer. Then a working series title and a one-line pitch.
2. **Recurring format:** the fixed structure every episode follows (segments with rough timings, recurring rules, signature moments, the closing beat), plus what changes each time.
3. **Episode list:** {{episode_count}} episodes, each with a working title in the series pattern, the specific subject, the stake or question, the payoff, and what it needs to film.
4. **Arc:** what carries across episodes (a running goal, escalation, a question answered in the finale), how episode 1 hooks viewers into the series, where the strongest episodes sit (first and last, not buried), and the cliffhanger or pointer at the end of each episode.
5. **Packaging system:** the title formula, thumbnail or cover template (what stays fixed, what changes), numbering rules, and how each episode links to the next on {{platform}}.
6. **Production plan:** batch order, what to film once and reuse (intro, graphics, set), and the release cadence, including whether to release some episodes together.
7. **What to measure:** the share of viewers who watch a second episode, retention per episode compared with the series average, and when to decide on a second run.
</task>

<constraints>
- Every episode must keep the series promise; cut or replace any that do not and say why.
- Episode 1 must work for someone who will never see another episode, and must still make them want the next one.
- Do not invent facts, guests or access the creator did not mention; mark needed items `[NEED: …]`.
- Do not rely on platform features you are unsure the account has; describe a fallback (pinned comment, on-screen text) for each.
- If the idea cannot sustain {{episode_count}} distinct episodes, say so and propose a shorter run or a wider format.
</constraints>

<output_format>
## Series promise
Promise, title, pitch.

## Recurring format
Segments with timings, then fixed versus variable elements.

## Episode list
A table: # | title | subject | stake or question | payoff | needs.

## Arc
Bullets.

## Packaging system
Title formula with two examples, thumbnail or cover template, linking plan.

## Production plan
Bullets.

## What to measure
Bullets with the decision each number informs.
</output_format>
