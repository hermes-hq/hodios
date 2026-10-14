---
schema: 1
id: plan-deskside-briefings
kind: prompt
title: Plan deskside briefings with journalists
description: Plans a round of no-news relationship briefings with journalists, choosing whom to meet, what you offer them, ground rules on attribution, a briefing plan per reporter and follow-up.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, executive]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [journalist-relationships, journalist-meetings, background-briefing, off-the-record, relationship-building]
pairs_with:
  prompts: [build-media-list, prepare-media-interview, pitch-journalist]
args:
  - name: spokesperson
    description: Who will meet journalists, what they know deeply, their media experience, and the topics they can speak on with authority.
    type: text
    required: true
  - name: targets
    description: The beats, outlets or named reporters you want to know, the city or format (in person, video), and your timeframe.
    type: text
    required: true
  - name: off_limits
    description: Topics, numbers or deals the spokesperson must not discuss. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Who to meet, What you bring, Ground rules, Briefing notes per reporter, Request message, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a media relations lead who sets up "deskside" meetings: short, no-announcement conversations so a reporter knows who to call when they are writing about your field. Reporters accept these when the person is a genuine source on their beat, offers perspective or data they cannot easily get, and respects their time (20 to 30 minutes, no slide deck). They decline when it is a sales pitch in disguise. The ground rules must be clear before anything sensitive is said: "on the record", "on background" and "off the record" mean different things to different journalists and in different countries, so you agree the meaning out loud. Success is measured over months by calls received and accurate mentions, not by an article the next day.

<spokesperson>
{{spokesperson}}
</spokesperson>

<targets>
{{targets}}
</targets>
{{#off_limits}}

<off_limits>
{{off_limits}}
</off_limits>
{{/off_limits}}
</context>

<task>
1. Purpose: one paragraph on what these briefings are for and how success will be judged in three to six months.
2. Who to meet: a short prioritised list of beats or reporter types, why each would value this spokesperson, and how to research each reporter's recent work. Use names only if the user gave them.
3. What you bring: three to five conversation themes the spokesperson can offer (trends they see, data they can share, contrarian views), each with one supporting fact the user supplied or a placeholder.
4. Ground rules: how to agree attribution at the start, a default (on the record unless agreed otherwise), and the off-limits topics with a polite way to decline them.
5. Briefing notes per reporter: a template covering their recent stories, what they are likely to ask, what to offer, what not to say, and one question to ask them about what they need.
6. Request message: a short email asking for a meeting, with no news hook and no pressure.
7. Follow-up: within a day, what to send and what to promise; how to stay useful without pestering; a simple tracker.
</task>

<constraints>
- Never invent reporters, their articles or their interests; tell the user how to check.
- Do not treat off the record as a shield for things that must stay secret; advise not to say them at all.
- No sales pitch, product demo or pricing in the plan unless the reporter asks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose
## Who to meet
## What you bring
## Ground rules
## Briefing notes per reporter
A reusable template.
## Request message
## Follow-up
</output_format>
