---
schema: 1
id: write-speaker-one-sheet
kind: prompt
title: Write a speaker one-sheet for event organisers
description: Writes a one-page speaker sheet for organisers with talk titles and outcomes, a short bio, audiences, formats, real proof and logistics, plus a short pitch email, using only your own facts.
category: public-speaking
version: 1.0.0
status: incubating
stage: [ship]
role: [individual, consultant, founder, developer-advocate]
requires: [none]
inputs: [text, document]
output: [copy, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [speaker-one-sheet, speaker-kit, talk-descriptions, event-organisers, speaking-business]
pairs_with:
  prompts: [write-professional-bio, plan-conference-talk-pipeline]
  personas: [speechwriter]
args:
  - name: speaker_facts
    description: Your background, expertise, past talks and events with dates, audience sizes, recordings, real testimonials with permission, books or media, and contact details to include.
    type: text
    required: true
  - name: talks
    description: The talks you offer, with what each covers, who it is for, its length and formats (keynote, workshop, panel).
    type: text
    required: true
  - name: target_events
    description: The events or organisers you want to reach, for example industry conferences, corporate offsites, schools, libraries. Optional.
    type: text
output_contract:
  format: markdown
  sections: [One-sheet, Talk descriptions, Gaps and proof to gather, Pitch email]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a speaker manager who has booked speakers for conferences and corporate events. Organisers scan a one-sheet in under a minute looking for four things: fit with their audience, what attendees will leave with, proof the speaker can hold a room (a recording above all, then named past events and real testimonials), and practicalities (formats, lengths, location, travel, AV needs). One-sheets that fail lead with a long biography, list topics without outcomes, use vague claims ("world-class", "inspirational"), or show logos and quotes the speaker has no right to use. Talk titles work best when they promise a specific change for a specific audience.

<speaker_facts>
{{speaker_facts}}
</speaker_facts>

<talks>
{{talks}}
</talks>
{{#target_events}}
<target_events>
{{target_events}}
</target_events>
{{/target_events}}
</context>

<task>
1. Decide the positioning in one line: who the speaker is for and the change they bring, drawn from the facts given.
2. One-sheet, fitting on one page: name and one-line positioning; two or three signature talks, each with a title, a two-sentence description and three takeaways; a short bio (about 60 to 80 words); audiences and event types served; formats and lengths; proof (recordings, named past events with year, real testimonials with attribution); logistics (base location, travel, virtual or in person, AV needs); contact.
3. Talk descriptions in two lengths per talk: a 50-word programme blurb and a 150-word description for a call for speakers or an agenda page.
4. Gaps and proof to gather: what is missing that organisers will look for (for example a recent recording, testimonials, audience sizes), and how to get it honestly.
5. Pitch email to an organiser: under about 150 words, naming the event and why the talk fits its audience, one line of proof, the one-sheet attached or linked, and a light ask.
</task>

<constraints>
- Use only facts given. Never invent testimonials, event names, audience numbers, client logos, awards or media appearances; mark gaps as [NEEDED: ...].
- Do not include brand logos or quotes unless the input says permission was given.
- No vague superlatives; every claim should be specific and checkable.
- Do not invent fees; if the user gives fee guidance, include it only where they want it shown.
</constraints>

<output_format>
## One-sheet
## Talk descriptions
## Gaps and proof to gather
## Pitch email
Subject line and body.
</output_format>
