---
schema: 1
id: design-virtual-workshop
kind: prompt
title: Design a virtual working workshop
description: Designs a remote working session where a group produces something together online - timed agenda, breakout plan, online board layout, energy breaks, tech checks and a facilitator run sheet.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, product-manager, consultant, designer]
requires: [none]
inputs: [text]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [remote-facilitation, online-whiteboard, breakout-rooms, workshop-design, distributed-teams]
pairs_with:
  prompts: [run-hybrid-meeting, write-workshop-report, design-workshop]
  personas: [meeting-facilitator]
args:
  - name: goal
    description: What the group must produce by the end (for example "a prioritised list of 2027 initiatives", "a mapped customer journey with pain points", "a draft team charter").
    type: text
    required: true
  - name: participants
    description: How many people, their roles, time zones and how comfortable they are with online tools.
    type: text
    required: true
  - name: time_available
    description: Total time available, and whether it can be split across days (for example "3 hours", "two 90-minute sessions").
    type: text
    required: true
  - name: tools
    description: The video and whiteboard tools you have, if any. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Shape of the session, Agenda, Board layout, Breakouts, Before the day, Facilitator run sheet, Capturing outputs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design online workshops where a group works together to produce something, not training sessions. Remote workshops fail differently from in-person ones: attention drops after 60 to 90 minutes on a screen; people go silent in big video rooms; breakout instructions are lost the moment people leave the main room; time is wasted on tool confusion; a few people dominate the whiteboard while others watch; and the board ends as a mess nobody turns into decisions. Experienced remote facilitators keep sessions to about three hours a day with a break every 45 to 60 minutes, split long workshops over several days, prepare the board in advance with one frame per activity and written instructions inside each frame, use silent individual work before discussion, size breakouts at three to five with a named reporter, run a short tool warm-up, have a co-facilitator or producer handle tech and rooms, and end each activity with a converge step that produces a decision or shortlist.

Goal: {{goal}}
Participants: {{participants}}
Time available: {{time_available}}
{{#tools}}Tools: {{tools}}{{/tools}}
</context>

<task>
1. Shape the session: given the time, recommend one session or several, the arc (open, diverge, converge, decide, close), and whether the goal is realistic; if not, say what can be achieved.
2. Write a timed agenda with breaks every 45 to 60 minutes, each activity with its method (for example silent brainstorm, affinity grouping, dot voting, impact-effort grid), mode (plenary, breakout, solo) and output.
3. Describe the board layout: one frame per activity in order, instructions written inside each frame, named or coloured spaces per breakout group, a parking area and a final outputs frame. Keep tool-neutral unless tools are named.
4. Plan breakouts: group size and mix, the instruction text to paste in chat before sending people out, a reporter per group, time warnings, and how groups report back without each reading everything out.
5. List pre-work and logistics: invites with links, a five-minute tool test, any pre-reading or pre-submitted ideas, roles (lead facilitator, producer for tech and rooms, note-taker).
6. Provide a facilitator run sheet with the key words for transitions and for drawing in quiet people, and what to do if tech fails.
7. Explain how outputs are captured and sent: a cleaned summary of decisions and next steps within two days.
</task>

<constraints>
- Do not exceed about three hours of screen time per day; split the workshop instead.
- Every activity must end with something converged (a shortlist, a vote, a decision), not only a wall of notes.
- Do not claim specific features of named tools; describe the activity so it works in any whiteboard tool.
- Account for time zones and participants' tool comfort.
</constraints>

<output_format>
## Shape of the session
Short paragraph.

## Agenda
Table: Time | Activity | Method | Mode | Output.

## Board layout
Ordered list of frames with contents.

## Breakouts
Plan plus paste-ready instruction text.

## Before the day
Checklist.

## Facilitator run sheet
Per activity: say, watch for, fallback.

## Capturing outputs
Bullets.
</output_format>
