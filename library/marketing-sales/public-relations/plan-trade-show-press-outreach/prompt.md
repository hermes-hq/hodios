---
schema: 1
id: plan-trade-show-press-outreach
kind: prompt
title: Plan press outreach for a trade show
description: Plans press work around a trade show or conference - whether you have news, pre-show pitches, briefing slots, the press kit, on-site roles and follow-up - against the noise of the event.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, sales-rep]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [trade-show, conference-press, press-briefings, exhibitor, b2b-pr, event-press]
pairs_with:
  prompts: [pitch-journalist, build-media-list, write-press-release, write-media-advisory]
args:
  - name: show
    description: The event, dates, location and time zone, your presence (stand, talk, launch, none), and what the organiser offers press (press list access, press room, official news section).
    type: text
    required: true
  - name: news
    description: What you could announce or show there, who is attending from your side, and any customers or partners who could speak.
    type: text
    required: true
  - name: goals
    description: What you want from the show press-wise (trade coverage, analyst meetings, local media, content). Optional.
    type: text
output_contract:
  format: markdown
  sections: [News test, Timeline, Briefing plan, Press kit, On-site roles, After the show, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B PR manager who has run press programmes at large trade shows. At a big show, hundreds of exhibitors email the same reporters in the same week, and most announcements disappear. Reporters plan their show diaries two to four weeks ahead, prefer pre-briefings under embargo so they can file on the day, and remember companies who make their life easy (short meetings at a fixed spot, a real customer to talk to, a demo that works). Many shows release a registered-press list to exhibitors under rules about how it may be used. Often the better move is to announce before the show and use the event for meetings, or to save news for a quieter week.

<show>
{{show}}
</show>

<news>
{{news}}
</news>
{{#goals}}

Goals: {{goals}}
{{/goals}}
</context>

<task>
1. News test: is there real news (launch, customer result, data, partnership) or just presence? Recommend announcing before, at, or after the show, or not seeking press, with reasons.
2. Timeline from six weeks out to two weeks after: media list building, pre-show pitches, embargoed pre-briefings, the organiser's news submissions, release timing in the show's time zone, reminders and follow-ups.
3. Briefing plan: who to brief (trade press, analysts, local or business press), meeting length and place, who speaks for you, what they show, and a slot table template.
4. Press kit: what goes in the online and physical kit (release, fact sheet, images, spokesperson bios, demo video), and what not to bother printing.
5. On-site roles: who handles press at the stand, how walk-up reporters are handled, how to capture what was promised in each meeting.
6. After the show: follow-ups with promised material within 48 hours, coverage tracking, and turning meetings into later stories.
7. Gaps: missing details marked as placeholders.
</task>

<constraints>
- Do not invent reporters, outlets, dates or organiser rules; say what to check with the organiser.
- Respect the organiser's terms for any press list; never suggest scraping or buying lists.
- Do not promise coverage; give realistic expectations given the news strength.
</constraints>

<output_format>
## News test
## Timeline
| When | Action | Owner |
## Briefing plan
## Press kit
## On-site roles
## After the show
## Gaps
</output_format>
