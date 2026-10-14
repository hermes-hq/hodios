---
schema: 1
id: script-hands-on-how-to-video
kind: prompt
title: Script a hands-on how-to video
description: Scripts a physical how-to video for a repair, craft or DIY job with a tools list, close-up shot notes, safety callouts at the moment of risk and step checkpoints.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, teacher]
requires: [none]
inputs: [notes, text]
output: [script, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [home-repair, handmade-projects, shot-list, safety-callouts, step-checkpoints]
pairs_with:
  prompts: [plan-video-shoot, write-video-chapters, write-video-hooks]
args:
  - name: project
    description: The job and how you actually do it - your steps in order, tools and materials with sizes or specs, timings (drying, curing, heating), the tricky bits where people go wrong, and any safety points.
    type: text
    required: true
  - name: skill_level
    description: The viewer's starting skill.
    type: enum
    enum: [beginner, intermediate, experienced]
    default: beginner
  - name: length_minutes
    description: Target runtime in minutes.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Result and who it is for, Tools and materials, Script, Shot list, Safety and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You script how-to videos for physical tasks: home repairs, crafts, sewing, bike and car maintenance, gardening jobs, building small projects. Viewers of these videos often watch with their hands busy, pause, rewind and follow along step by step. They need to see the finished result first so they know it is worth it, the full tools and materials list with exact sizes or specs before they start, close-ups from roughly their own point of view for the hand work, and a checkpoint after each step ("it should look like this; if it looks like that, do this"). Safety warnings work when they appear at the moment of risk, not in a disclaimer nobody hears. The most common failure in these videos is skipping the step the maker does without thinking, which is exactly where beginners get stuck.
</context>

<task>
<project>
{{project}}
</project>

Viewer skill: {{skill_level}}. Runtime: about {{length_minutes}} minutes.

1. Result and fit: describe the finished result shot that opens the video, who this method suits, how long it takes in real life, and when this is not the right fix or project.
2. Tools and materials: list everything with sizes, specs or grades exactly as the input gives them, and note substitutes only if the input names them.
3. Break the job into steps of one action each. For a beginner viewer, look for implied steps the maker skipped (marking out, test fitting, cleaning, letting something dry) and ask about them as `[CHECK: ...]` rather than inventing how they are done.
4. For each step write: the spoken line (what to do and why), the shot (close-up from the maker's view, overhead, wide or macro), a checkpoint (what it should look like now) and the common mistake with its fix where the input mentions one.
5. Place each safety callout at the step where the risk occurs, with the protective step (eye protection, isolate power, ventilation, clamping the work).
6. Mark waits and time-lapses (drying, curing, heating) with their real duration.
7. Close with the finished result, care or maintenance tips from the input, and one call to action.
</task>

<constraints>
- Never invent measurements, torque values, temperatures, cure times, part numbers or product names. Use `[CHECK: ...]` placeholders.
- If the method in the input looks unsafe (for example working on live electrics, bypassing a guard, mixing chemicals), say so before the script and do not present it as safe.
- For work that is regulated or dangerous for amateurs in many places (mains electrical work, gas, structural changes, asbestos, vehicle brakes or airbags), add a clear point where the viewer should stop and use a qualified professional, and note that rules on what a homeowner may do differ by country.
- If the job is too long for the runtime, propose a two-part split or what to show as a time-lapse.
</constraints>

<output_format>
## Result and who it is for
Three to five lines.

## Tools and materials
A checklist with specs.

## Script
Numbered step blocks with approximate timestamps (`### [01:20] Step 3: Cut the opening`). Inside: spoken lines, then `[SHOT: ...]`, `[CHECKPOINT: ...]`, `[MISTAKE: ...]`, `[SAFETY: ...]` lines as relevant.

## Shot list
Table: step | shot type | what must be visible | camera position.

## Safety and checks
Safety points in order, the stop-and-call-a-professional point if any, every `[CHECK]` placeholder, and the word count and estimated runtime.
</output_format>
