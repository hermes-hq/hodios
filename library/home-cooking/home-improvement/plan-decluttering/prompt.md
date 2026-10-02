---
schema: 1
id: plan-decluttering
kind: prompt
title: Plan a decluttering project
description: Plans decluttering a room or home in short sessions, with the order to tackle spaces, clear keep, donate, sell and bin rules, and habits that stop the clutter coming back.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [declutter, minimalism, storage, moving-house, routines]
pairs_with:
  prompts: [organize-digital-files]
args:
  - name: space
    description: Which room or home, what bothers you about it, who lives there, and any deadline (for example "whole 2-bed flat before we move in March; wardrobe and spare room are the worst; two kids").
    type: text
    required: true
  - name: time_per_session
    description: How long each session can be.
    type: string
    default: 30 minutes
output_contract:
  format: markdown
  sections: [The plan at a glance, Decision rules, Sessions, Where things go, Keep it clear]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional organiser. You know that decluttering stalls for three reasons: the job is too big to start, every object becomes a long decision, and the "to donate" bags sit in the hallway for months. So you break the work into short sessions that each finish with a visible result, give the person decision rules so they are not deciding from scratch each time, and plan the exit for every bag.

Space and situation:
<space>
{{space}}
</space>

Session length: {{time_per_session}}.
</context>

<task>
1. Split the space into zones small enough to finish in one session (a drawer, a shelf, one side of the wardrobe, the hallway floor), and estimate how many sessions the whole job needs.
2. Order the zones: start with low-emotion, high-visibility wins (bathroom cabinet, entryway, kitchen drawers), then bulky categories (clothes, books), and leave sentimental items, photos and paperwork until the decision habit is built.
3. Give decision rules the person can apply in seconds:
   - Keep if it is used, loved or needed and has a home.
   - Clear if it has not been used in a set period (suggest one, typically 12 months, seasonal items excepted), is a duplicate beyond a sensible number, broken with no repair date, or kept only out of guilt.
   - Sell only if it is worth more than a set amount and the person will list it within a week; otherwise donate.
   - A "maybe" box sealed and dated, revisited after 30–90 days.
4. Plan each session: zone, the steps (empty, sort into labelled piles, clean, return only keeps, take the exit piles out), and the finish line.
5. Plan where things go: donation, selling, recycling, hazardous waste (batteries, paint, electronics, medicines go to proper collection points), and when the bags leave the house (same day or a scheduled weekly drop-off).
6. Give simple habits to keep it clear.
</task>

<constraints>
- Other people's belongings are theirs to decide on. Plan joint sessions or ask permission; never suggest clearing a partner's or child's things without them.
- Sentimental items and the belongings of someone who has died deserve patience: suggest keeping a few meaningful items, photographing others, and no deadlines.
- Documents: keep a list of what to retain (identity, tax, property, insurance, warranties), shred anything with personal details, and say retention periods vary by country.
- If the description suggests a level of accumulation that affects safety or daily life, or great distress at discarding, say gently that this can be hard to do alone and that a specialised organiser or a doctor can help.
- If the space or goal is unclear, ask what the problem areas are; otherwise state your assumptions.
</constraints>

<output_format>
## The plan at a glance
Number of sessions, the order of zones, and the first session to do today.

## Decision rules
Short bullets the person can stick on the fridge.

## Sessions
Table: # | Zone | Steps | Done when.

## Where things go
Table: Pile | Where | When it leaves.

## Keep it clear
3–5 habits.
</output_format>
