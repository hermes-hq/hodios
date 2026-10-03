---
schema: 1
id: write-explainer-video-script
kind: prompt
title: Write an explainer video script
description: Writes a 60 to 120 second explainer script moving from problem to solution, how it works and a call to action, with visual direction for every line. Use for product or concept explainers.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, marketer, founder]
inputs: [topic, spec]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [explainer-video, motion-graphics, voiceover, product-video, storyboard]
pairs_with:
  prompts: [write-video-hooks, write-short-form-script, plan-video-shoot]
args:
  - name: product_or_concept
    description: What to explain, what it does, the problem it solves, how it works in a few steps, any proof (numbers, customers, results) and the action viewers should take. Say if you want animation or live action.
    type: text
    required: true
  - name: audience
    description: Who will watch and where, for example "small restaurant owners seeing this on our homepage" or "patients in a clinic waiting room".
    type: string
    required: true
  - name: length_seconds
    description: Target length in seconds, between 60 and 120.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Core message, Script, Production notes, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write explainer videos: short, tightly scripted pieces that make one product or idea clear to a specific audience, usually as motion graphics with a voiceover or as live action with a presenter. Explainers fail in predictable ways: they open with the company instead of the viewer's problem, try to explain every feature, use jargon the viewer does not share, and let visuals merely illustrate the words instead of carrying part of the explanation. A good one makes the viewer recognise their own problem in the first few seconds, shows the solution working rather than describing it, explains how it works in at most three steps, and ends with one clear action. Voiceover for explainers runs at about 2.3 words per second, so 90 seconds holds roughly 200 words; silence under a strong visual is allowed.
</context>

<task>
Write a {{length_seconds}}-second explainer for this audience: {{audience}}.

<material>
{{product_or_concept}}
</material>

1. Write the core message in one sentence: who has what problem, and what this makes possible. Everything in the script must serve that sentence; list anything from the material you deliberately leave out.
2. Plan the time budget across five parts, roughly: problem 15 to 20%, solution introduced 10 to 15%, how it works 35 to 40% (at most three steps), proof or benefit 15%, call to action 10%.
3. Write the script line by line. For each line give the time range, the voiceover, the visual direction (what is on screen and how it moves or changes), and any on-screen text. Use the viewer's words, not the company's: name the problem as the viewer experiences it.
4. Visual direction: if the material asks for live action, direct shots and presenter actions; otherwise direct for motion graphics, and where live action would differ meaningfully, add a one-line alternative. Let visuals carry information (a before and after, a number counting up, a step being completed) instead of repeating the voiceover.
5. End with one call to action that matches where the video plays (for example "start a free trial" on a homepage, "ask at reception" in a clinic).
</task>

<constraints>
- Voiceover word count stays within about 2.3 words per second of {{length_seconds}}; state the final count.
- No company history, mission statements or feature lists. One problem, one solution, three steps at most.
- On-screen text: at most six words per card, never a duplicate of the full voiceover line.
- Use only the facts, numbers and claims in the material. If proof is missing, write `[PROOF: …]` with what kind would work, rather than inventing customers, statistics or results.
- Plain language at the audience's level; define any unavoidable term in the same line.
- If the material contains more than one product or message, explain only the main one and say what you left out.
- If the material is too thin to say how it works, ask the specific questions under Open questions and write the clearest script you can with placeholders.
</constraints>

<output_format>
## Core message
One sentence, then the time budget per part, then anything deliberately left out.

## Script
A table: time | voiceover | visual direction | on-screen text. Label the five parts.

## Production notes
Voiceover tone and pace, music mood, captions on, the voiceover word count, and any visual that needs real footage or screenshots from the client.

## Open questions
Specific questions and every placeholder to fill, or "None".
</output_format>
