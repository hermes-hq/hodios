---
schema: 1
id: promote-pop-up-with-ads
kind: prompt
title: Promote a pop-up with ads
description: Plans a short burst of geo-targeted ads for a pop-up shop, market, fair or one-off event, with a venue radius, countdown schedule, date-and-place creative, budget split and a footfall count.
category: advertising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual, artist]
subject: [retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pop-up-shop, market-stall, event-promotion, geo-targeting, countdown, footfall]
pairs_with:
  prompts: [plan-pop-up-shop, plan-market-stall, decide-post-boost, target-slow-day-ads]
  personas: [local-ads-advisor]
args:
  - name: event
    description: What and where (venue, address, stall number), dates and hours, what you sell and price range, whether the event has its own crowd (a market with regulars) or depends on you bringing people, and your social accounts and follower locations.
    type: text
    required: true
  - name: budget
    description: Total ad budget for the event, for example "80 GBP".
    type: string
    required: true
  - name: audience
    description: Who buys from you and where they live, if you know (for example "women 25-45 who follow slow fashion, mostly within 10 km"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan in brief, Targeting, Countdown schedule, Ads, Counting the footfall]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a market trader, maker, food truck or pop-up shop running a short, one-off or recurring event. Event ads have a hard deadline: anything seen after the doors close is wasted, and people need two or three reminders before they make plans. The usual mistakes: running ads to a wide area as if selling online, ads that do not say the date, time and place in the first line, spending evenly over weeks when most decisions happen in the last 48 hours, ignoring the event's own crowd and the organiser's channels, and no way to tell whether anyone came because of the ad.
</context>

<task>
<event>
{{event}}
</event>

Budget: {{budget}}
{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}

1. If the venue, dates and hours or what is sold are missing, ask in one message and stop.
2. Decide the job of the ads: bring new people to a busy event (stand out within it, give a reason to find your stall) or create the crowd for your own pop-up (awareness first, then reminders).
3. Targeting: a radius around the venue sized to how far people travel for this kind of event (a neighbourhood market about 2 to 5 km; a destination fair or a city pop-up wider), an optional second small radius around where your followers or customers live, and audiences of past customers, followers and engaged people. Keep detailed interests minimal on small budgets.
4. Countdown schedule: announce (7 to 14 days before, small share), reminder (2 to 3 days before), and the final push (the day before and the morning of, the biggest share), plus during-event ads for multi-day events with "on now until 6 pm". Turn ads off when the event ends.
5. Budget split by phase and day, with daily amounts that add up to the budget.
6. Ads: one per phase, each with the date, time and place in the first line, a photo or short video of the actual products or the stall, the reason to come (launch, new range, event-only offer, first come), and a simple call to action (Get directions, Remind me, Save the date). Add an event-only offer or freebie with a code word to measure.
7. Free amplification to pair with the ads: the organiser's posts, neighbouring stallholders, local groups and a pinned post.
8. Counting the footfall: the code word, a tally of "how did you hear about us", sales per hour against a previous event, and reach in the radius from the ad reports.
</task>

<constraints>
- Do not invent visitor numbers, reach or costs; any estimate is the platform's, to read before paying.
- Check that dates, times and addresses match exactly what the user gave; flag anything ambiguous.
- Note that food, alcohol and age-restricted products have extra ad rules, and that the event's own rules on promotion should be checked.
- Keep the plan within the stated budget and simple enough to set up in under an hour.
</constraints>

<output_format>
## Plan in brief
Three lines: the job of the ads, the radius, the budget split.

## Targeting
Bullets.

## Countdown schedule
A table: Phase | Dates | Daily budget | Audience | Ad.

## Ads
One block per phase: first line, body, call to action, visual.

## Counting the footfall
Bullets and a simple tally template.
</output_format>
