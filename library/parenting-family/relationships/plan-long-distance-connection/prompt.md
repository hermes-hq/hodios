---
schema: 1
id: plan-long-distance-connection
kind: prompt
title: Plan a long-distance connection
description: Plans ways to stay close at a distance with a partner, family or grandchildren, with a call rhythm across time zones, rituals, shared activities, small surprises and a visit plan.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [long-distance, grandparents, video-calls, time-zones, family-rituals, connection]
pairs_with:
  prompts: [plan-relationship-check-in, choose-meaningful-gift, plan-date-night]
args:
  - name: relationship
    description: Who you want to stay close to and why you are apart, for example "my partner, abroad for a 2-year job" or "grandparents and our kids aged 3 and 7". Add how you keep in touch now, what is not working, visit budget and any limits (shifts, hearing, tech skills).
    type: text
    required: true
  - name: time_zones
    description: Where each person is, for example "London and Sydney" or "UTC-5 and UTC+1", plus usual waking and working hours if known. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your overlap, Call rhythm, Rituals, Between calls, Doing things together, Visits, Check in on the plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people keep relationships strong across distance. What keeps people close is less the length of calls than their predictability and shared experience: a reliable rhythm, small everyday glimpses of each other's lives, doing things together rather than only reporting news, and something to look forward to. The right plan depends on who it is for. Partners need intimacy and a shared future; grandparents and young children need short, playful, routine contact with a parent's help; adult children need low-pressure contact that respects their independence.

<relationship>
{{relationship}}
</relationship>
{{#time_zones}}Time zones: {{time_zones}}{{/time_zones}}
</context>

<task>
1. Your overlap: if time zones are given, work out the hours difference and the windows when both are awake and free, in both local times, noting that daylight saving changes can shift the difference by an hour at certain times of year. If not given, ask and explain how to find the overlap.
2. Call rhythm: a weekly table of contact (longer calls, short check-ins, asynchronous messages) that fits the overlap and everyone's routines, kept realistic and light enough to sustain.
3. Rituals: two to four recurring rituals suited to the relationship (for example a Sunday breakfast call, a goodnight voice note, reading the same bedtime story over video, a weekly photo of the same thing, a shared countdown).
4. Between calls: asynchronous ways to share daily life (voice and video notes, a shared photo album, letters and parcels, a shared list or journal), and small surprises.
5. Doing things together: activities to do at the same time remotely (watching a film in sync, cooking the same recipe, online games, a shared book, a walk while on the phone, a craft for grandparent and grandchild), with tips for young children's attention spans (short calls, a puppet, a game, show-and-tell, a parent on hand) and for anyone less confident with technology.
6. Visits: how often is realistic for the budget, how to plan them (alternating who travels, booking early, a mix of everyday time and special plans), and how to handle goodbyes and the post-visit dip, especially for children.
7. Check in on the plan: a short monthly question to ask each other ("What's working? What should we change?") and how to adjust when life gets busy or a time zone changes.
</task>

<constraints>
- Fit the plan to the relationship type and ages; do not apply partner advice to grandparents or vice versa.
- Do not name specific apps or products; describe the kind of tool (a video calling app, a shared photo album, a multiplayer word game).
- Be careful with time-zone maths: state the offsets you used and say to double-check around daylight-saving changes.
- Keep it light and kind; no guilt about missed calls. If the description suggests the relationship involves control or fear, gently note that support is available, without assuming.
- If key details are missing, give a plan with assumptions and list them.
</constraints>

<output_format>
## Your overlap
Table: Window | Their time | Your time.
## Call rhythm
Table: Day | Type | Length | Notes.
## Rituals
## Between calls
## Doing things together
## Visits
## Check in on the plan
</output_format>
