---
schema: 1
id: plan-vlog-episode
kind: prompt
title: Plan a vlog episode
description: Plans a vlog episode with a story arc, a shot list to capture during the day, talking-head beats and an edit outline. Use the night before filming a day-in-the-life or event vlog.
category: video
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
stack: [youtube]
inputs: [topic, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [vlog, story-arc, shot-list, b-roll, day-in-the-life]
pairs_with:
  prompts: [plan-video-shoot, create-paper-edit, package-video-title-thumbnail]
  personas: [video-editor]
args:
  - name: topic_or_day
    description: What the vlog is about or what the day holds, such as the schedule, places, people involved, anything uncertain and what you hope happens.
    type: text
    required: true
  - name: length_minutes
    description: Target length of the finished video in minutes.
    type: number
    default: 10
  - name: style
    description: The vlog style or a creator whose pacing you like, such as cinematic, chatty and handheld, documentary or fast-cut. Leave empty to match the day.
    type: string
output_contract:
  format: markdown
  sections: [Story, Shot list by time of day, Talking-head beats, Edit outline, Packing and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan vlogs for creators who film their own lives. Most vlogs fail in the edit, not the shoot: the creator comes home with hours of footage and no story, because they filmed what happened instead of what the story needed. A vlog that holds viewers has a question or goal stated early ("Can I find the best ramen in Osaka in one day?", "Moving day, and the van is two hours late"), a rising line of small obstacles and payoffs, at least one honest moment where the creator reacts to camera, and an ending that resolves the opening question. The day will not go to plan, so the plan must name what to film whatever happens: establishing shots, transitions, reactions and a closing thought. A useful shooting ratio for a solo vlogger is 10 to 20 minutes of footage per finished minute.
</context>

<task>
Plan a {{length_minutes}}-minute vlog.

<day>
{{topic_or_day}}
</day>

<style>
{{style}}
</style>

1. **Find the story.** Write the episode's question or goal in one sentence, the stakes (why a viewer should care how it turns out), and two or three likely complications from what the day holds. If nothing in the day creates tension, propose a framing that does (a challenge, a countdown, a comparison, a first-time attempt) and say it is your suggestion.
2. **Draft the arc** in four parts with rough minute budgets that add up to {{length_minutes}}: the hook (the most interesting moment teased in the first 15 seconds), the setup, the middle with its obstacles, and the resolution with a closing reflection.
3. **Write the shot list by time of day.** For each part of the day, list the must-get shots: one establishing shot per location, the action itself, two or three close-up details, a transition (walking out the door, a car window, a time-lapse), and the creator's reaction. Mark each shot A (the story breaks without it) or B (nice to have). Add a "film whatever happens" list of five shots that save the edit if plans change.
4. **Write the talking-head beats.** The lines the creator should say to camera at set points: the opening question, a check-in after each obstacle, and the closing reflection. Write them as prompts the creator can say in their own words, not a script to memorise, with one example phrasing each.
5. **Outline the edit.** Sequence the sections with target timings, where the hook comes from, where music changes, and one pacing note per section. Suggest a title angle and a thumbnail moment to capture on the day.
6. **List packing and risks:** batteries, storage, audio, permissions and anything about filming others the creator must check.
</task>

<constraints>
- Fit the style if given; if empty, choose the style that suits the day and name it.
- Timings must add up to {{length_minutes}} minutes within 10%.
- Do not invent events, places or people that are not in the day; mark suggestions as suggestions.
- Filming people: flag anyone who has not agreed to appear (staff, strangers, children, private venues) and suggest how to get consent or keep them out of shot. Flag places where filming may be restricted.
- If the day description is too thin to plan (no idea where the creator will be or what happens), ask up to three short questions before planning.
</constraints>

<output_format>
## Story
The question, the stakes and the likely complications, then the four-part arc with minute budgets.

## Shot list by time of day
A table: time or place | shot | type (establishing, action, detail, transition, reaction) | A/B. Then the "film whatever happens" list.

## Talking-head beats
Numbered beats, each with when to say it, the prompt, and an example line.

## Edit outline
A table: section | timing | source footage | music and pacing note. Then the title angle and the thumbnail moment.

## Packing and risks
Short bullets.
</output_format>
