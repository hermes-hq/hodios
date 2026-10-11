---
schema: 1
id: plan-recurring-meetup
kind: prompt
title: Plan a recurring meetup
description: Plans a monthly or regular meetup series - format, cadence, host venues, a speaker pipeline, an organiser rota that prevents burnout, a code of conduct, newcomer welcome and simple measures of health.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, developer-advocate]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [meetups, community-building, speaker-pipeline, code-of-conduct, volunteers]
pairs_with:
  prompts: [manage-event-rsvps, write-event-invitation, outline-tech-talk-with-live-demo]
args:
  - name: meetup
    description: The topic or community (for example "Python developers", "beginner runners", "board gamers", "local founders"), the city or online, who it is for, and what success looks like in a year.
    type: text
    required: true
  - name: resources
    description: The organisers available and their time per month, any budget or sponsor, venues you could use, and how you will publicise it. Optional.
    type: text
  - name: current_state
    description: If the meetup already exists, how it is going - attendance, what is hard (finding speakers, venues, organiser fatigue, the same faces every time). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Shape of the series, Calendar and cadence, Venues and hosts, Speakers and content, Organiser rota, Welcome and conduct, Measures of health]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have organised and advised meetup groups for years. You know that recurring meetups rarely die from one bad night; they die from organiser burnout, a speaker scramble every month, and a feeling among newcomers that it is a clique. What sustains them: a predictable rhythm (the same week and weekday each month, announced well ahead), a format that does not depend on a big-name talk every time (lightning talks, demos, discussion tables, a social half), a pipeline of speakers booked two to three months ahead with an open call and personal asks to newer members, venue hosts rotated so no single sponsor owns the group, an organiser team of at least three with a rota and a written run book, a code of conduct that is enforced with a named contact, and deliberate welcome for first-timers. Free meetups see many registered people not come, so RSVP numbers need a turnout assumption. Sponsorship is useful but comes with expectations to manage openly.

Meetup: {{meetup}}
{{#resources}}Resources: {{resources}}{{/resources}}
{{#current_state}}Current state: {{current_state}}{{/current_state}}
</context>

<task>
1. Shape of the series: who it is for, the core format for a typical session with timings, and two or three alternate formats to rotate in.
2. Calendar and cadence: frequency, fixed slot, how far ahead dates are published, a seasonal plan (lighter months, a special event), and when to take a break.
3. Venues and hosts: what a host venue must provide, how to find and rotate hosts, what to offer them, and a simple host agreement checklist (date, capacity, access, food, sponsor mention, AV, who locks up).
4. Speakers and content: a pipeline with an open call, personal invitations, first-time speaker support, a backlog of three months, and what to do when a speaker cancels.
5. Organiser rota: roles per session (host, door and welcome, venue liaison, speakers, comms), a rota across the team, a run book of tasks by week before the event, and how to bring in new organisers and let people step back.
6. Welcome and conduct: how first-timers are greeted and introduced, a code of conduct with a reporting contact and how reports are handled, accessibility basics, and how to avoid a clique.
7. Measures of health: a few numbers to watch each quarter (turnout against RSVPs, share of first-timers and returners, speaker diversity and first-time speakers, organiser hours), and what each would prompt you to change.
</task>

<constraints>
- Do not invent venue names, sponsors or speakers. Describe types and how to find them.
- Keep the plan within the organisers' stated time; if it needs more, say what to drop.
- Turnout and no-show rates are estimates; present them as assumptions to replace with the group's own data.
- Recommend that sponsorship terms be written down and disclosed to members.
</constraints>

<output_format>
## Shape of the series
## Calendar and cadence
## Venues and hosts
## Speakers and content
## Organiser rota
A table: Role | What it covers | Who (placeholder) | Hours per month.
## Welcome and conduct
## Measures of health
</output_format>
