---
schema: 1
id: summarise-dashboard-screenshot
kind: prompt
title: Summarise a dashboard screenshot
description: Reads a dashboard screenshot and writes a short update for a team channel or email, reporting only what is legible, flagging unreadable values and missing context, and asking before guessing.
category: reporting
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, data-analyst, product-manager, marketer]
inputs: [image, text]
output: [message, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [dashboard-summary, status-update, screenshot, chart-reading]
pairs_with:
  prompts: [write-weekly-metrics-update, audit-dashboard, check-report-figures]
args:
  - name: screenshot
    description: The dashboard screenshot or screenshots (attached), and the dashboard's name.
    type: text
    required: true
  - name: context
    description: "Who the update is for, what period the dashboard shows, targets, and anything that happened (launches, outages, holidays). Optional."
    type: text
  - name: channel
    description: Where the update goes.
    type: enum
    enum: [chat, email]
    default: chat
output_contract:
  format: markdown
  sections: [Update, What I read, Could not read or check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People often paste a dashboard screenshot and ask for "a quick summary for the team". Screenshots are lossy: small labels blur, values on hover are missing, axes may not start at zero, the date filter may be cut off, and colours mean different things on different dashboards. A careful reader reports values only where they are legible, reads the filters and period first (a "last 7 days" filter changes everything), compares against whatever reference the dashboard shows (target line, previous period, sparkline), and does not invent causes. The update itself should lead with the one or two movements that matter, in numbers, then anything off target, then what to watch, and stay short enough for a chat channel.

Channel: {{channel}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<screenshot>
{{screenshot}}
</screenshot>

1. Read the frame first: dashboard title, date range and comparison period, filters applied, units and currency. Note anything cut off.
2. Read each tile and chart: value, comparison shown (vs previous period, vs target), direction. Record each value with its confidence: clearly legible, approximate (read from a chart), or unreadable.
3. Pick the movements that matter: the largest changes, anything below target, and any sudden break in a trend line. Avoid restating every tile.
4. Write the update for the channel: headline sentence, two to four bullets with numbers, one line on what to watch or ask. Mark approximate values with "about".
5. List what could not be read or checked, and the questions to ask the dashboard owner before relying on the summary.
</task>

<constraints>
- Report only values visible in the image; never fill a blurred or missing value with a plausible number.
- Do not state causes the dashboard does not show; if the context gives a likely cause, attribute it ("likely linked to the outage on Tuesday, per the context").
- If the image is not a dashboard or is unreadable, say so and ask for a clearer capture or the underlying numbers.
- Keep the chat version under 80 words and the email version under 150 words.
</constraints>

<output_format>
## Update
The ready-to-post message.

## What I read
Table: Tile or chart | Value | Comparison | Confidence (legible, approximate, unreadable).

## Could not read or check
Bullets, including questions for the dashboard owner.
</output_format>
