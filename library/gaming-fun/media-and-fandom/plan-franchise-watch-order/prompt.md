---
schema: 1
id: plan-franchise-watch-order
kind: prompt
title: Plan a franchise watch or reading order
description: Works out the best order to watch or read a sprawling franchise or book universe for your goal, with what is essential, what is skippable and how long each path takes.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, gamer]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [watch-order, reading-order, release-order, chronological-order, cinematic-universe, spoiler-free]
pairs_with:
  prompts: [catch-up-on-series-spoiler-free, plan-movie-marathon, triage-entertainment-backlog]
args:
  - name: franchise
    description: The franchise, shared universe or book series, for example "Star Wars", "Discworld", "the Marvel films", "Doctor Who" or "the Cosmere".
    type: string
    required: true
  - name: goal
    description: What you want, for example "first time, best experience", "catch up before the new film in March", "only the essentials".
    type: text
    required: true
  - name: already_done
    description: What you have already watched or read, or "none".
    type: text
    default: none
  - name: time_budget
    description: Optional time you have, for example "about 20 hours" or "two months of evenings".
    type: string
output_contract:
  format: markdown
  sections: [The orders people argue about, Your order, Skippable and optional, Time it takes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Big franchises have several defensible orders and fans argue about them for good reasons. Release order preserves the reveals and the way the audience first met the story; in-world chronological order can spoil twists that later entries assume you already know; hybrid orders (such as watching some prequels as a flashback after an original) try to keep both. Book universes like Discworld are best entered through a sub-series rather than book one. Some entries are essential to the main arc, some are good but standalone, and some are widely considered weak or contradicted later. Spin-off series, specials and tie-in comics may or may not matter for the next big instalment.

Franchise: {{franchise}}
Goal: {{goal}}
Already done: {{already_done}}
{{#time_budget}}Time available: {{time_budget}}{{/time_budget}}
</context>

<task>
1. If the franchise name is ambiguous (for example a reboot and an original share a name), ask which one, then stop.
2. Describe the two or three orders people use for this franchise, what each preserves and what each risks spoiling, in one or two sentences each, without spoiling anything yourself.
3. Recommend one order for the stated goal and explain why. Remove what is already done.
4. List every item in your order with type (film, season, book, special), year, approximate length (runtime or page band) and a status: essential, recommended or optional. Say in a spoiler-free phrase what each essential item sets up.
5. List what can be skipped for this goal and what you lose by skipping it.
6. Total the time for the full order and for the essential-only path. If a time budget was given, say which path fits and what to cut first.
7. Note where your knowledge may be out of date (new releases, announced entries) and tell them to check the latest instalments.
</task>

<constraints>
- Never reveal plot twists, deaths or identities while explaining orders or skips.
- Do not invent entries, years or runtimes; mark estimates "approx." and unsure items "(check)".
- Present fan debates fairly; your recommendation is for the stated goal, not the only right answer.
- Do not say where to stream or buy anything.
</constraints>

<output_format>
## The orders people argue about
Bullets, one per order.
## Your order
Numbered table: # | Item | Type | Year | Length | Status | Sets up.
## Skippable and optional
Bullets with what you lose.
## Time it takes
Full path and essential path totals, and the fit with the time budget.
</output_format>
