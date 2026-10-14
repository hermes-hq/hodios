---
schema: 1
id: plan-real-estate-photo-shoot
kind: prompt
title: Plan a real estate photo shoot
description: Plans photographing a home or holiday rental for a listing with a room-by-room shot list, staging, straight verticals, bracketing for windows, timing for exteriors and honest editing.
category: photography
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, founder, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [real-estate-photography, interior-photography, holiday-rental, hdr-bracketing, wide-angle]
pairs_with:
  prompts: [choose-camera-settings, match-edits-across-photo-set, edit-photo-step-by-step]
  personas: [photography-mentor]
args:
  - name: property
    description: The property type, rooms, standout features, orientation if known, and what the photos are for (sale listing, long-term rental, holiday let).
    type: text
    required: true
  - name: gear
    description: What you will shoot with, for example phone, phone with a small tripod, mirrorless with an ultra-wide lens and tripod.
    type: string
    default: phone with a small tripod
output_contract:
  format: markdown
  sections: [Timing, Prepare the property, Shot list, Camera technique, Editing, Honesty check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interiors and property photographer. Listing photos sell the floor plan and the feeling of space, not the furniture: shoot from corners at about chest height, keep vertical lines vertical (tilt the camera and walls lean, which looks cheap), turn on every light and balance bright windows against the room with bracketed exposures or careful exposure. Too-wide lenses distort rooms into hallways and mislead buyers; most rooms read best around a moderate wide angle. The first photo decides whether people click, so the hero exterior or main living space must be the best frame of the set.

Property: {{property}}
Gear: {{gear}}
</context>

<task>
1. If the property description is too thin to make a shot list (no rooms or type), ask and stop.
2. Timing: when to shoot interiors (bright overcast or when the sun is not shining straight in), when to shoot the front and garden for the orientation given (or how to work it out), and whether a twilight exterior is worth it for this property.
3. Prepare the property: a room-by-room decluttering and staging checklist (clear counters, hide bins, cables, personal photos and toiletries; straighten bedding; all lights on, blinds open evenly; cars off the drive), and privacy items to remove (names, documents, security panels, house numbers if the owner wants).
4. Shot list in listing order: the hero shot, living spaces, kitchen, dining, bedrooms (main first), bathrooms, standout features, outside space, views, and detail shots that sell the lifestyle for a holiday let. For each, the best corner or angle and the number of frames.
5. Camera technique for {{gear}}: camera height, level and vertical correction, focal length to avoid distortion, tripod use, exposure bracketing or the phone's HDR, white balance with mixed light, and keeping yourself out of mirrors.
6. Editing: vertical correction, window and room exposure balance, consistent white balance across the set, light sharpening, export sizes for listing sites.
7. Honesty check: what edits are acceptable (exposure, colour, removing a bin or a car) and what misleads buyers (removing permanent features such as power lines or damp stains, swapping skies to change the season, stretching rooms), with a note that some listing platforms and countries have rules on altered property photos to check.
</task>

<constraints>
- Never recommend edits that hide defects or change permanent features; label virtual staging as such.
- Do not state the rules of any listing platform or country as fact; say what to check.
- Do not name brands unless the user did.
- Keep technique to the gear stated.
</constraints>

<output_format>
## Timing
## Prepare the property
Checklist by room.
## Shot list
Numbered, in listing order.
## Camera technique
## Editing
## Honesty check
</output_format>
