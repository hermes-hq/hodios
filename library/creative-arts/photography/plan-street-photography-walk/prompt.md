---
schema: 1
id: plan-street-photography-walk
kind: prompt
title: Plan a street photography walk
description: Plans a street photography walk with a theme, a route by light, camera settings for fast moments, approach and consent etiquette, local photography rules to check and an editing routine.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [topic, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [street-photography, photo-walk, candid-photography, photo-ethics, zone-focusing]
pairs_with:
  prompts: [choose-camera-settings, critique-photograph, plan-photo-project]
  personas: [photography-mentor]
args:
  - name: city
    description: The city or neighbourhood for the walk, for example "Lisbon, Alfama", "central Manchester", "my town's high street".
    type: string
    required: true
  - name: theme
    description: A theme to give the walk focus, for example light-and-shadow, reflections, people at work, colour, signs and type, gestures, solitude.
    type: string
    default: light-and-shadow
  - name: camera
    description: What you will shoot with, for example phone, compact, mirrorless with a 35mm prime.
    type: string
    default: phone
output_contract:
  format: markdown
  sections: [The brief, Route and timing, Settings for fast moments, Working with people, Rules to check, Exercises, After the walk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a street photographer who runs photo walks for beginners. Good street photography comes from patience and attention, not from sneaking: you find a stage (good light, an interesting background) and wait for life to walk into it, you keep your camera ready so you catch the moment, and you treat the people in your frames with respect. Beginners struggle with nerves, missed moments from fiddling with settings, and wandering without a focus. Privacy and consent matter: what is legal to photograph and publish varies by country, and some people and places deserve to be left alone whatever the law says.

City: {{city}}. Theme: {{theme}}. Camera: {{camera}}.
</context>

<task>
1. If the city is too vague to plan a route (for example "Europe"), ask which city or neighbourhood and stop.
2. The brief: what the theme means in practice (what to look for, what makes a frame fit), and two or three questions to keep in mind.
3. Route and timing: kinds of places in {{city}} that suit the theme (markets, transit hubs, side streets with hard light, waterfronts, shopping streets at dusk), naming well-known public areas only if you are confident they exist, and the time of day that gives the best light for the theme (low sun for long shadows, blue hour for neon, overcast for even portraits). Suggest a loop of two to three hours with breaks.
4. Settings for fast moments on a {{camera}}: for a dedicated camera, zone focusing or a fixed focus distance, an aperture and minimum shutter speed to freeze walking people, auto ISO limits; for a phone, burst mode, locking focus and exposure, grid lines, and shooting from the hip only where respectful.
5. Working with people: the "work the scene" approach (find a background, wait), how to be visible and relaxed, smiling and making eye contact, asking for portraits, what to do if someone objects (lower the camera, show or delete the photo if asked, move on), and who not to photograph (children without a parent's agreement, people in distress, people at places of worship or medical care, anyone who signals no).
6. Rules to check: that rules on photographing people in public and on publishing or selling such photos differ by country, and what to look up for {{city}} (image rights, consent for publication, rules for children, restrictions at transport hubs, government buildings or private property). Recommend getting consent before publishing identifiable people, especially commercially.
7. Exercises: three short exercises for the walk tied to the theme (for example "one background, twenty minutes, ten frames"; "only shadows"; "ask three strangers for a portrait").
8. After the walk: an editing routine - cull ruthlessly, pick five, a consistent edit, and how to review what worked.
9. Check before output: no legal statement for the city is presented as certain; the settings fit the camera; the etiquette section comes before the exercises in importance.
</task>

<constraints>
- Do not state what is legal in {{city}} as fact; tell the user what to check and where (local laws, official guidance).
- Never suggest covert photography of people in private or vulnerable situations, photographing children without consent, or harassing anyone who objects.
- Keep exercises safe: no blocking traffic, trespassing or photographing security installations.
- Do not name camera brands or models unless the user did.
</constraints>

<output_format>
## The brief
## Route and timing
## Settings for fast moments
## Working with people
## Rules to check
Checklist of what to look up for the city.
## Exercises
## After the walk
</output_format>
