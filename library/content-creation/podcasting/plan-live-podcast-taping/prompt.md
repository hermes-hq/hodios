---
schema: 1
id: plan-live-podcast-taping
kind: prompt
title: Plan a live podcast taping
description: Plans recording a podcast in front of an audience, with venue sound, backup recorders, a run of show with audience Q&A, ticketing basics, the post-show edit and the failure points on the night.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [live-show, run-of-show, venue-sound, audience-qa, event-production]
pairs_with:
  prompts: [plan-podcast-episode, invent-recurring-podcast-segments, plan-listener-voicemail-episode]
  personas: [podcast-sound-engineer, podcast-producer]
args:
  - name: show_summary
    description: The show, hosts and guests, usual format and length, what the live version adds, and the date if set.
    type: text
    required: true
  - name: venue
    description: The venue type and what it provides, for example "pub back room, house PA with 2 vocal mics" or "100-seat theatre with a sound tech".
    type: string
    required: true
  - name: audience_size
    description: Expected audience, if known.
    type: number
output_contract:
  format: markdown
  sections: [The concept, Sound and recording, Run of show, Making it work for later listeners, Tickets and front of house, On the night, After the show]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan live podcast tapings. A live show has to work twice: for the people in the room and for the much larger audience who hear the episode later. The classic failures are a recording ruined by the venue mixing everything to one stereo file, audience questions that are inaudible on the recording, inside jokes and visual moments that mean nothing on audio, a show that runs 40 minutes over, and no backup when a laptop crashes.

Venue: {{venue}}
{{#audience_size}}Expected audience: {{audience_size}}{{/audience_size}}

<show_summary>
{{show_summary}}
</show_summary>
</context>

<task>
1. The concept: one paragraph on what makes this live episode worth attending and worth hearing later (a game, a live guest, audience participation, a special theme).
2. Sound and recording: separate tracks for every host and guest mic (from the venue desk's direct outputs or a multitrack recorder), two room or audience mics for laughter and atmosphere, a separate backup recorder running the whole time (a stereo mix from the desk or a portable recorder), and a roaming or fixed audience Q&A mic. Include a sound check plan, who runs it, and the questions to ask the venue's technician in advance (inputs available, multitrack recording, monitor speakers, who brings what).
3. Run of show: a timed table from doors to close, keeping the recorded part to about the episode length plus 20 to 30 percent: warm-up (not recorded or marked for cutting), cold open moment, segments, audience Q&A with rules (short questions, repeat into a mic), a closing moment, and merch or thanks after recording stops.
4. Making it work for later listeners: describe what is visual, repeat or summarise audience questions on mic, set up audience participation so it sounds good (count-in for a cheer, a clear response line), and record a short intro and outro afterwards for the feed.
5. Tickets and front of house: free or paid, capacity, a notice that the audience will be recorded (on tickets and signs, and said from the stage), accessibility information, and who handles the door.
6. On the night: a failure points checklist (batteries, power, file space, recorder actually recording, latecomers, hecklers, overruns, a guest dropping out) with the fallback for each.
7. After the show: file backup that night, sync the tracks, edit decisions (cut warm-up and dead air, tighten Q&A, keep laughter natural), a release plan and thank-you to venue and audience.
</task>

<constraints>
- Do not state venue capacity, ticket prices, licences or insurance requirements as fact; list them as things to check with the venue and local rules.
- Do not recommend specific products; give equipment types and the inputs needed.
- If the venue or format details are too thin, ask the five questions that matter most and give a provisional plan with [X] placeholders.
- Keep the plan realistic for a small team; say which roles are essential (host, sound, door) and which are optional.
</constraints>

<output_format>
## The concept
## Sound and recording
Input list table: Source | Mic type | Track | Notes. Then the sound check plan and questions for the venue.
## Run of show
Table: Time | Segment | Who | Recorded? | Notes.
## Making it work for later listeners
## Tickets and front of house
## On the night
Table: Risk | Prevention | Fallback.
## After the show
Numbered steps.
</output_format>
