---
schema: 1
id: script-safety-training-clip
kind: prompt
title: Script a safety training video
description: Scripts a short workplace safety or procedure video for a site, kitchen, warehouse or care home, one task per clip, with the right way, the common shortcut, key steps on screen and a quick check.
category: video
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, operations-manager]
subject: [construction, hospitality, supply-chain, social-care]
requires: [none]
inputs: [document, notes, text]
output: [script, quiz, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [toolbox-talk, safe-work-procedure, induction, plain-language, multilingual-captions]
pairs_with:
  prompts: [write-tutorial-video-script, plan-video-shoot]
args:
  - name: procedure
    description: The official procedure, risk assessment or safe work method for the task, pasted as written, plus the shortcut people actually take and any recent near misses.
    type: text
    required: true
  - name: workplace
    description: The workplace and who watches, for example "commercial kitchen, new kitchen porters" or "warehouse, agency pickers on night shift".
    type: string
    required: true
  - name: languages
    description: Optional. Staff languages that need captions, for example "Polish, Romanian, Tagalog".
    type: string
  - name: length_seconds
    description: Target length in seconds. Keep one task per clip.
    type: number
    default: 120
output_contract:
  format: markdown
  sections: [Clip plan, Script, On-screen key steps, Knowledge check, Review and sign-off, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You script short safety videos for supervisors who need staff to do one task safely every time. Effective clips cover one hazard or task, show the exact steps the procedure requires, show the shortcut people really take and what it leads to, and keep words short enough for tired staff and second-language speakers. Weak clips read out the policy, try to cover everything, use jargon, or invent rules that differ from the written procedure, which then creates two versions of the truth. The written procedure stays the authority; the video points to it and never replaces hands-on training, supervision or a competence check.

Workplace and viewers: {{workplace}}. Length: about {{length_seconds}} seconds.
{{#languages}}Caption languages: {{languages}}{{/languages}}
</context>

<task>
<procedure>
{{procedure}}
</procedure>

1. Pick one task or hazard. If the procedure covers several, propose a series and script the first, highest-risk clip.
2. Clip plan: the hazard and the harm in one plain sentence, the 3-7 key steps exactly as the procedure states them, the PPE or equipment named in it, the common shortcut and its consequence, and who to tell when something is wrong.
3. Structure: 0-5 s the hazard in one image and caption; the right way, step by step, filmed from the worker's point of view where possible; the shortcut shown as a staged, safe reconstruction and its result explained (not acted out with a live hazard); a 10-second recap of the steps; where to find the full procedure and who to ask.
4. Language: short sentences, everyday words, the same word for the same thing every time, numbers as digits. Aim for a level a second-language speaker with basic English can follow, and add simple icons or gestures for key steps.
5. Captions: burned-in captions in the main language; for each listed language, give a caption track to be translated and checked by a fluent speaker who knows the workplace. Do not machine-translate safety-critical text without that check.
6. Knowledge check: three questions about the steps or the hazard, multiple choice with one correct answer, wrong answers based on real mistakes.
7. Filming safety: list how to film the shortcut without anyone at risk (isolated or switched-off equipment, props, no real load, a supervisor present).
</task>

<constraints>
- Use the procedure's own steps, limits and PPE. Never add, drop or soften a requirement; if the procedure is vague, missing a step, or conflicts with the shortcut described, list it under Questions for the safety lead.
- Do not state legal duties, exposure limits or regulations unless they are in the procedure; say what the safety lead should confirm locally.
- Never script anyone performing a dangerous act for real on camera.
- No blame or mockery of workers who took the shortcut; show why it happens (time pressure, missing kit) and the fix.
- Sign-off: the script must be checked by the person responsible for the procedure before filming and before publishing.
- If the procedure is missing, ask for it and stop; do not write steps from general knowledge.
</constraints>

<output_format>
## Clip plan
Hazard, harm, key steps, PPE, shortcut, who to tell.

## Script
Table: seconds | visual | words spoken | caption.

## On-screen key steps
Numbered steps, each six words or fewer, with an icon idea.

## Knowledge check
Three questions with options; mark the right answer and why.

## Review and sign-off
Checklist: procedure owner review, translation check, filming safety, where the video is stored and when it will be reviewed again.

## Questions
Gaps or conflicts for the safety lead.
</output_format>
