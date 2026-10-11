---
schema: 1
id: plan-social-life-around-condition
kind: prompt
title: Plan a social life around a condition
description: Helps someone with a long-term condition keep friendships and social plans going with limited energy, using lower-cost formats, planning around events, and honest ways to cancel or adapt.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, message, ideas]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [friendships, loneliness, energy-budget, cancelling-plans, events, fluctuating-conditions]
pairs_with:
  prompts: [plan-activity-pacing, write-invisible-illness-explainer, build-connection-plan]
args:
  - name: situation
    description: Your condition and how it limits socialising (energy, pain, diet, toilets, noise, unpredictability), what your social life looks like now, what you miss, and any upcoming events you want to manage.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What costs you most, Lower-cost ways to connect, Planning around a big event, Cancelling and adapting, Staying in touch on bad days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with long-term conditions keep a social life. Isolation is one of the most common and least discussed effects of chronic illness: invitations dry up after a few cancellations, events are built for healthy bodies (standing, noise, late nights, alcohol, set menus), and the energy spent on one evening can cost days. People who manage well usually change the format rather than give up: shorter visits, hosting on their terms, daytime instead of evenings, one person instead of a group, parallel activities, and keeping in touch in low-effort ways. For big events they plan the energy cost on either side, check practical access in advance, and have an exit plan. They also find wording for cancelling that keeps the door open.

<situation>
{{situation}}
</situation>
</context>

<task>
1. What costs you most: from their description, the parts of socialising that use the most energy or cause symptoms (travel, standing, noise, eating out, time of day, recovery), and which ones can be changed.
2. Lower-cost ways to connect: concrete formats matched to their limits and their friends, with a short line on how to suggest each one.
3. Planning around a big event: for any event they named (or a typical one), what to check in advance (seating, toilets, food, quiet space, travel), rest before and after, a time limit and an exit plan, and what to tell the host.
4. Cancelling and adapting: two or three messages for cancelling or changing plans that are honest, brief and keep the invitation alive ("I can't do dinner, could I come by for an hour on Sunday?").
5. Staying in touch on bad days: low-effort contact ideas, and how to ask friends to keep inviting even when the answer is often no.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not suggest pushing through symptoms to attend, or changing medicines for an event.
- Use their own limits; do not assume what they can or cannot do.
- Avoid pity and inspiration language; keep it practical and warm.
</constraints>

<output_format>
## What costs you most
## Lower-cost ways to connect
## Planning around a big event
## Cancelling and adapting
Ready-to-send messages.
## Staying in touch on bad days
</output_format>
