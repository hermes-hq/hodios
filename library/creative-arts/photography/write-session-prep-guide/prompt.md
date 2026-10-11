---
schema: 1
id: write-session-prep-guide
kind: prompt
title: Write a photo session prep guide
description: Writes the guide a photographer sends clients before a portrait, family, couple or branding session, covering what to wear, how to prepare, timing, what happens on the day and bad weather.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, consultant]
requires: [none]
inputs: [notes, preferences]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [client-guide, what-to-wear, portrait-photography, family-portraits, branding-photos]
pairs_with:
  prompts: [plan-portrait-shoot, write-posing-prompts, plan-team-headshot-day]
  personas: [photography-mentor]
args:
  - name: session
    description: The session type (family outdoors, couple, newborn, personal branding, school leavers), the location and season, and your shooting style.
    type: text
    required: true
  - name: business_details
    description: Your policies to include, such as arrival time, session length, rescheduling for weather, how many photos and when they arrive. Leave out anything you have not decided.
    type: text
output_contract:
  format: markdown
  sections: [Welcome, Before the day, What to wear, Bringing children or pets, On the day, If the weather turns, After the session]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a portrait photographer who writes the client guides for your studio. A good prep guide cuts most of what goes wrong on the day: clashing outfits, late arrivals, tired children, missing glasses cloths and nervous clients. Clothing advice works best as a palette (coordinated, not matching), textures and layers, avoiding large logos, neon and fine stripes that shimmer on screen, and shoes that suit the location. Clients relax when they know what will happen, that they do not need to know how to pose, and that the photographer will direct them.

Session: {{session}}
{{#business_details}}Policies: {{business_details}}{{/business_details}}
</context>

<task>
1. If the session type is missing, ask and stop.
2. Welcome: two or three warm sentences in the photographer's voice that set expectations and reassure.
3. Before the day: practical preparation for this session type (haircuts a week before, nails, ironing, a light meal, sleep and nap timing for children, a list of must-have shots or people), and anything to bring (brush, lip balm, wipes, a cloth for glasses, a change of clothes, snacks).
4. What to wear: a palette approach for the location and season, two or three example outfit combinations described in words, what to avoid and why, and inclusive notes (wear what makes you feel like yourself; cultural and religious dress is welcome).
5. Bringing children or pets: how to prepare them, bribes and breaks, and why their real behaviour is fine. Skip if not relevant.
6. On the day: arrival, how the session flows, that the photographer directs posing, how long it takes.
7. If the weather turns: the rescheduling approach using the stated policy; if no policy was given, write a placeholder marked [your policy].
8. After the session: how selection and delivery work, using only the policies given and placeholders otherwise.
</task>

<constraints>
- Never invent prices, delivery times, numbers of images or policies; use the given details or clearly marked placeholders.
- Avoid advice that pressures clients about weight, appearance or buying new clothes.
- Keep the guide short enough to read on a phone in five minutes.
- Do not name brands or shops.
</constraints>

<output_format>
## Welcome
## Before the day
Checklist.
## What to wear
## Bringing children or pets
## On the day
## If the weather turns
## After the session
</output_format>
