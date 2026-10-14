---
schema: 1
id: set-up-voice-mode-assistant
kind: prompt
title: Set up an assistant for hands-free voice use
description: Sets up an AI assistant for talking hands-free while cooking, walking or driving, with spoken-reply instructions, read-back of numbers, device settings and a driving safety plan.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [voice-conversation, hands-free, driving-safety, spoken-replies]
pairs_with:
  prompts: [write-custom-instructions, set-up-assistant-for-accessibility]
  styles: [{id: speakable, level: 5}]
args:
  - name: situations
    description: When you want to talk to the assistant, for example while cooking, on a walk, commuting by car, doing chores, practising a talk.
    type: text
    required: true
  - name: device
    description: "Optional: phone, smart speaker, car system or headphones, and the assistant app."
    type: text
  - name: needs
    description: "Optional: anything that matters, such as an accent the assistant mishears, a noisy kitchen, or a language."
    type: text
output_contract:
  format: markdown
  sections: [Situations, Voice instructions, Device checklist, Safety, Starter phrases, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Talking to an assistant hands-free needs different behaviour from typing. Lists, tables and links are useless when heard; long answers cannot be held in memory; and speech recognition mishears names, numbers and quantities ("fifteen" and "fifty"), so anything that matters should be read back. People interrupt, so short turns that end with a choice work best. Situations differ: a cook needs one step at a time and timers, a walker can take a longer explanation, and a driver needs the least attention of all. Driving is the hard case: road laws on phone use vary by place, set-up should happen before setting off, and nothing should invite reading or typing while moving. Always-listening devices and stored voice recordings are a privacy choice to make on purpose.

<situations>
{{situations}}
</situations>
{{#device}}
Device: {{device}}
{{/device}}
{{#needs}}
<needs>
{{needs}}
</needs>
{{/needs}}
</context>

<task>
1. For each situation, say what the assistant should do and avoid, and how long a turn should be.
2. Write voice instructions, phrased so they apply when the user is talking by voice: plain spoken sentences, no lists or symbols, one step at a time for tasks, read back names, numbers, quantities and times, stop after each turn with a short choice, and keep anything long for later as text.
3. Write a device checklist: microphone permission, voice and speed, how the assistant is woken, what works from a locked screen (and the risk of others using it), where voice recordings and transcripts are stored and how to delete them, headphones in shared spaces.
4. If driving is a situation, write a safety plan: set up before driving, use only the car's or phone's hands-free mode, no reading, writing or complex tasks while moving, pull over for anything that needs a screen, and follow local road law.
5. Give starter phrases for each situation, short and natural to say.
6. Give four tests, including a number read-back and an interruption.
</task>

<constraints>
- Do not state specific road laws or device menu paths as fact; tell the user to follow local law and check their device.
- Never suggest tasks that need looking at a screen while driving.
- Keep the voice instructions under about 1,000 characters.
</constraints>

<output_format>
## Situations
A table: situation, do, avoid, turn length.
## Voice instructions
One fenced block, ready to paste.
## Device checklist
A checkbox list.
## Safety
Bullets, or "No driving use mentioned" with one line on walking near traffic if relevant.
## Starter phrases
Bullets grouped by situation.
## Tests
Four bullets: what to say and pass condition.
</output_format>
