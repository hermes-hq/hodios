---
schema: 1
id: write-emcee-script
kind: prompt
title: Write an emcee script
description: Writes an emcee script for an event with welcome, housekeeping, speaker introductions, transitions, ready-made filler for delays and a close, timed against the run of show.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, marketer, operations-manager, manager]
requires: [none]
inputs: [text, notes]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [emcee, master-of-ceremonies, event-hosting, speaker-introductions, run-of-show]
pairs_with:
  prompts: [moderate-panel, write-speech, write-professional-bio]
  personas: [speechwriter, speaking-coach]
args:
  - name: event
    description: The event (conference, gala, awards night, company offsite, wedding reception, school event), audience, venue, tone, the host organisation, and the emcee's own name and connection to it.
    type: text
    required: true
  - name: run_of_show
    description: The schedule with times and each segment, speakers with their names, roles and talk titles, sponsors to thank, breaks, meals, awards and housekeeping facts (exits, Wi-Fi, toilets, photography policy, hashtags).
    type: text
output_contract:
  format: markdown
  sections: [Script, Delay and filler kit, Cue sheet, Placeholders]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An emcee is the event's glue, not its star. The job is to welcome people warmly, give them the information they need, introduce each speaker so the audience is ready to listen, move smoothly from one segment to the next, keep time, and cover the gaps when something runs late or breaks. Weak emcee scripts read long speaker bios aloud, repeat the same "Without further ado" at every handover, forget housekeeping until someone asks, and have nothing ready when a speaker is not on stage yet. Good ones are short, warm, specific to the event, and built to be spoken.
</context>

<task>
Write an emcee script for this event.

<event>
{{event}}
</event>
{{#run_of_show}}
<run_of_show>
{{run_of_show}}
</run_of_show>
{{/run_of_show}}

1. If there is no run of show, or it lacks the speakers and timings, write the opening and a template for introductions and transitions, and ask for the schedule. Do not invent speakers or times.
2. Write the opening (1 to 2 minutes): a warm welcome tied to the event's purpose, the emcee's one-line introduction, any acknowledgement the event requires (hosts, sponsors, traditional owners or a land acknowledgement if the event provides one), and what the audience can look forward to.
3. Write housekeeping in under a minute, using only facts given: exits, toilets, Wi-Fi, phones, photography or recording policy, accessibility, schedule changes, hashtags. Mark gaps `[NEEDED: …]`.
4. For each speaker or segment, write an introduction of 30 to 60 seconds: why this person and topic matter to this audience, two or three credentials or a specific detail, and the talk title, ending with the speaker's name as the cue for applause. Write a short thank-you and bridge after each, referencing something from the segment where the emcee can fill it in live (`[callback: one line from their talk]`).
5. Write transitions into breaks, meals, awards and the return from them, with the time people need to be back.
6. Write the close: thanks to speakers, organisers, sponsors and volunteers, practical next steps (reception, feedback survey, travel), and a warm send-off.
7. Build the delay and filler kit: lines for a late speaker, technical failure, an early-finishing segment, a fire alarm or emergency announcement (point to the venue's procedure and staff, never improvise safety instructions), and two or three light audience interactions suitable for the tone.
</task>

<constraints>
- Use only names, titles, facts and times provided. Check pronunciation: add a `[pronunciation?]` marker after any name the emcee should confirm.
- Vary handover phrases; avoid "without further ado", "needs no introduction" and reading CVs aloud.
- Humour, if the tone allows, is gentle and never at a speaker's or attendee's expense.
- Keep spoken lines short and easy to say; put stage directions and cues in brackets.
- Timings for emcee segments must fit the run of show; flag any segment where the schedule leaves no time for the emcee.
</constraints>

<output_format>
## Script
In running order: time, segment heading, spoken lines with [cues].
## Delay and filler kit
Situation | What to say.
## Cue sheet
A one-page table for the lectern: Time | Segment | Emcee says (first words) | Who is next | Notes.
## Placeholders
Every `[NEEDED: …]`, `[callback: …]` and `[pronunciation?]`. "None" if none.
</output_format>
