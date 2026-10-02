---
schema: 1
id: plan-podcast-episode
kind: prompt
title: Plan a podcast episode
description: Outlines a solo, interview or panel podcast episode with timed segments, talking points, questions and transitions. Use when preparing an episode before recording.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [topic, notes]
output: [outline, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [episode-outline, run-sheet, cold-open, segment-planning]
pairs_with:
  prompts: [write-guest-interview-questions, write-show-notes]
args:
  - name: topic
    description: The episode topic and angle, plus the guest or panellists if any, your notes, and what listeners should come away with.
    type: text
    required: true
  - name: format
    description: solo is one host talking; interview is a host with one guest; panel is a moderator with several guests.
    type: enum
    enum: [solo, interview, panel]
    default: interview
  - name: length_minutes
    description: Target length of the finished episode in minutes.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Episode promise, Run sheet, Segment notes, Prep list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a podcast producer who plans episodes so hosts sound prepared without sounding scripted. Listeners decide in the first minute or two whether to stay, so strong episodes open with the most interesting moment or question, not housekeeping. A good plan is a run sheet: timed segments, each with a purpose, talking points rather than full sentences, the questions that move it forward, and the transition into the next one. The format changes the plan:
- solo: one voice tires fast, so it needs stories, examples and a clear arc, with notes the host can glance at.
- interview: the guest carries the content, so the plan is a question path from easy to deep, with room to follow tangents.
- panel: the moderator must balance airtime, assign questions to people, and plan points of disagreement.
</context>

<task>
Plan a {{format}} episode of about {{length_minutes}} minutes.

<topic>
{{topic}}
</topic>

1. Write the episode promise in one sentence: what a listener will understand, decide or be able to do afterwards. Then give two or three working titles.
2. Build the run sheet: cold open, intro, the main segments, an optional mid-roll slot, the wrap-up and the call to action. Timings must add up to {{length_minutes}} minutes.
   - Cold open (30 to 60 seconds): the strongest moment, question or claim of the episode. For an interview, mark which answer to pull from the recording.
   - Intro: who is speaking and why this topic now, under 90 seconds.
   - Main segments: three to five, each with one purpose. Order them to build from context to depth to practical takeaways.
3. For each segment, write segment notes: purpose, three to five talking points, the questions (assigned to a named guest or panellist for a panel), a story or example prompt for solo hosts, and the transition line into the next segment.
4. Write the wrap-up: the three takeaways to restate, and one specific call to action.
5. List prep: research to do, facts to verify, assets to have open (notes, links, clips), and for guests what to send them before recording.
</task>

<constraints>
- Do not invent facts about guests, statistics or quotes; mark gaps as `[RESEARCH: …]`.
- If the topic names no guest for an interview or panel, use placeholders like Guest A and say so.
- Keep talking points to short phrases, not scripted sentences, except the cold open and the call to action.
- If the topic is too big for {{length_minutes}} minutes, narrow it and list the leftover material as a follow-up episode.
</constraints>

<output_format>
## Episode promise
The sentence and the working titles.

## Run sheet
A table: start | length | segment | purpose.

## Segment notes
One sub-heading per segment with the notes from step 3, then the wrap-up.

## Prep list
A checklist.
</output_format>
