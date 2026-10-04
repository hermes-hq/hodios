---
schema: 1
id: plan-shift-team-huddle
kind: prompt
title: Plan a pre-shift team huddle
description: Plans a short pre-shift huddle for a store, restaurant, warehouse or care team with today's priorities, one safety point, specific recognition and one skill tip, timed to fit.
category: people-management
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, operations-manager]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [shift-briefing, team-huddle, frontline-teams, recognition, safety-briefing]
pairs_with:
  prompts: [plan-one-on-one, write-recognition-message, write-job-aid]
  personas: [leadership-coach]
args:
  - name: team_type
    description: The team and setting, for example "supermarket night fill team of 8", "restaurant front of house", "warehouse pick team", "home care staff starting a morning round".
    type: string
    required: true
  - name: todays_focus
    description: What matters today - targets, expected volume, events, promotions, VIPs, short staffing, deliveries, a new process, a recent incident - plus anyone to recognise and what they did, if you know.
    type: text
    required: true
  - name: minutes
    description: How long the huddle should last when spoken.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Huddle script, Pocket card, Prep check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good pre-shift huddle is short, standing, and the same shape every day, so people know what to listen for. It tells the team what matters most today (not ten things), keeps one safety point fresh, thanks someone specifically, and leaves them with one small skill or tip they can use in the next hour. Huddles fail when they turn into a list of complaints, a reading of emails, a public telling-off, or run so long that the shift starts late.

Team: {{team_type}}
Length: {{minutes}} minutes
<todays_focus>
{{todays_focus}}
</todays_focus>
</context>

<task>
1. Pick the top three priorities at most from today's focus, and say each in one plain sentence with a number or name where possible (for example "Delivery at 10; I need two on the dock by 9:50").
2. Choose one safety point that is relevant to today's work in this setting (manual handling during a big delivery, wet floors during a rush, infection control on a care round, knife safety on a new prep task, lone working on a late close). Make it specific and practical, not a slogan.
3. Recognition: one specific thank-you naming the person and what they did and why it mattered. If no one is named in the focus, leave a clear [name] and [what they did] placeholder and tell the manager to fill it.
4. One skill tip: a single quick tip relevant to today that can be shown or said in under 30 seconds (an upsell line, a faster pick route, a way to calm an upset customer, a handover phrase).
5. Close: an open question ("Anything I've missed? Anyone need help?") and a short line to start the shift.
6. Fit it to {{minutes}} minutes, but leave about a third of the time for the team to answer the closing question and ask their own: keep the spoken script to about 85 words per huddle minute (for example about 425 words for five minutes, 255 for three). Give a time mark for each part.
7. Before answering, check the script is within that word budget, and that no part blames or singles out anyone negatively.
</task>

<constraints>
- Plain, spoken language: short sentences that work over background noise and for people whose first language is different. No jargon unless the team uses it.
- Never criticise an individual in the huddle. If the focus includes a problem caused by one person, turn it into a team reminder and suggest handling the individual privately afterwards.
- Do not invent targets, numbers or safety regulations. Use what was given, and phrase safety points as good practice unless the manager has supplied the specific rule.
- If short staffing or a recent incident is mentioned, acknowledge it honestly and say how the shift will cope.
</constraints>

<output_format>
## Huddle script
Five parts, each with a time mark and the words to say: Welcome and today, Safety, Recognition, Tip, Close. Put the approximate word count at the top.
## Pocket card
The same huddle as five short lines the manager can glance at.
## Prep check
Two or three things to do or confirm before the huddle (numbers to check, a name to fill, equipment for the tip).
</output_format>
