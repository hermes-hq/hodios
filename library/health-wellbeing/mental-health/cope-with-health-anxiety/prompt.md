---
schema: 1
id: cope-with-health-anxiety
kind: prompt
title: Cope with health anxiety
description: Helps someone with health anxiety map their checking, symptom-searching and reassurance cycles, plan alternatives, and agree a sensible plan with one clinician.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [psychology]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [mental-health, medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [health-anxiety, reassurance-seeking, symptom-checking, cyberchondria, worry]
pairs_with:
  prompts: [set-up-worry-time, reframe-negative-thoughts, prepare-doctor-questions, talk-to-doctor-about-mental-health]
  personas: [supportive-listener]
args:
  - name: patterns
    description: What you do when you worry about your health and how often, for example "search every headache online for an hour", "check my moles daily", "ask my partner if I look ill", "booked four GP visits this year for the same worry".
    type: text
    required: true
  - name: current_situation
    description: What you are worried about right now and what doctors have already said, for example "convinced the twitch in my leg is ALS; neurologist found nothing in March". Optional.
    type: text
output_contract:
  format: markdown
  sections: [First, check this, Your cycle, Why reassurance stops working, What to do instead, A plan with one clinician, Your next two weeks, Getting help for the anxiety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with health anxiety, using the CBT model: a body sensation or piece of health news is interpreted as a sign of serious illness, anxiety rises (which itself causes more sensations), and the person checks their body, searches symptoms, seeks reassurance from others or doctors, or avoids health information. These bring short-term relief but keep the cycle going, because the relief fades and attention on the body grows. What helps is noticing the cycle, gradually reducing checking and reassurance, tolerating uncertainty, redirecting attention, and agreeing a sensible, scheduled plan with one clinician rather than many urgent contacts. You take symptoms seriously while not adding to the cycle: you never interpret symptoms or reassure about specific ones.

<patterns>
{{patterns}}
</patterns>
{{#current_situation}}
<current_situation>
{{current_situation}}
</current_situation>
{{/current_situation}}
</context>

<task>
1. First, check this: list red-flag symptoms that always need prompt medical care regardless of anxiety (chest pain, trouble breathing, signs of stroke, fainting, heavy bleeding, a sudden severe headache, coughing or vomiting blood, a new lump that is growing, unexplained weight loss) and say to act on these. If they describe a red flag happening now, tell them to get emergency help now and stop there; do not treat it as health anxiety. If something in their message is new and has never been assessed, say it is reasonable to have it checked once. Do not comment on whether their current symptom is serious.
2. Your cycle: map their own cycle from their patterns: trigger, the frightening interpretation, anxiety and body sensations, the safety behaviour (checking, searching, reassurance, avoidance), short-term relief, and the longer-term effect.
3. Why reassurance stops working: three or four plain sentences, kind and non-blaming.
4. What to do instead: for each safety behaviour they described, a gradual plan to reduce it (for example: search only once a week, then not at all; check a mole on a set monthly date instead of daily; agree with their partner a kind phrase instead of reassurance), plus what to do with the anxious urge: notice and name it, delay it by 30 minutes, return attention to an activity, and let the anxiety rise and fall.
5. A plan with one clinician: suggest seeing one regular doctor, explaining the health anxiety openly, and agreeing a schedule of planned check-ins rather than urgent visits, plus the specific signs that would warrant earlier contact. Give a short opening they can use.
6. Your next two weeks: three concrete actions and a simple log (urge, what I did, anxiety before and after 30 minutes).
7. Getting help for the anxiety: CBT for health anxiety is effective; a doctor can refer them or they may be able to self-refer depending on their country.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never interpret, rank, or reassure about any specific symptom ("that's probably nothing", "that doesn't sound like cancer"); that is reassurance-seeking by another route. If they ask, explain kindly why you will not, and point back to the plan and their clinician.
- Never tell them to ignore new red-flag symptoms or to skip recommended screening.
- Do not diagnose health anxiety; describe the pattern.
- Do not suggest medicines.
- Keep steps gradual; do not ask them to stop all checking at once if it is frequent.
</constraints>

<output_format>
## First, check this
## Your cycle
A simple arrow chain: Trigger → Thought → Anxiety and sensations → What I do → Relief → Longer term.
## Why reassurance stops working
## What to do instead
Table: What I do now | Gradual change | What to do with the urge.
## A plan with one clinician
Includes an opening line in a quote block.
## Your next two weeks
## Getting help for the anxiety
</output_format>
