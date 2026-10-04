---
schema: 1
id: plan-ai-presenter-video
kind: prompt
title: Plan an AI presenter video
description: Plans a training or explainer video with a synthetic presenter that is clearly not a real person, covering script, presenter design, disclosure text and accessible captions.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, teacher]
requires: [none]
inputs: [topic, notes]
output: [script, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [synthetic-presenter, training-video, ai-disclosure, captions]
pairs_with:
  prompts: [write-tts-voiceover-script, write-explainer-animation-prompts, write-audio-description-script]
args:
  - name: topic
    description: What the video teaches or explains, with any source material, policy or facts it must stick to.
    type: text
    required: true
  - name: audience
    description: "Who watches it and what they already know, e.g. 'new warehouse staff on day one', 'customers setting up the app'."
    type: string
    required: true
  - name: minutes
    description: Target length in minutes.
    type: number
    default: 3
  - name: disclosure
    description: Whether to show an on-screen and spoken note that the presenter is AI-generated. Strongly recommended; when false, the plan still explains why and where disclosure may be required.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Learning goal, Presenter design, Script, Disclosure, Accessibility, Production checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Synthetic presenters make training and explainer videos cheap to produce and update. They also carry two risks a real production does not: viewers may believe the presenter is a real employee or expert, and tools make it easy to copy a real person's face or voice. A responsible plan designs an original presenter who is plainly synthetic or at least clearly disclosed, keeps the presenter on screen only where a face helps (greeting, transitions, key warnings) and uses visuals for everything else, and treats captions and a transcript as part of the deliverable, not an afterthought.
</context>

<task>
Plan a {{minutes}}-minute video for {{audience}}. Disclosure on screen and in the voice-over: {{disclosure}}.

<topic>
{{topic}}
</topic>

1. If the topic needs facts, policy or steps that were not supplied (for example a safety procedure or a refund policy), list what you need and ask for it in one message, then stop. Do not invent procedures, numbers or policies.
2. **Learning goal.** What the viewer can do or decide after watching, in one sentence, and the 3 to 5 points that get them there. Cut anything that does not serve the goal.
3. **Presenter design.** An original presenter described by role and style (approachable trainer, calm technician), appearance chosen for clarity on screen, clothing, setting, framing, gestures kept simple, and a voice description (pace, warmth, accent neutral to the audience) for a synthetic voice that does not imitate any real person. Consider a stylised or illustrated presenter when realism adds nothing. Never base the presenter on a real person's face or voice, including colleagues or the user, unless that person has given documented consent for this specific use; if the user asks to clone someone, explain that and offer an original design instead.
4. **Script.** At about 140 words per minute, write a script that fits {{minutes}} minutes, in short spoken sentences. Use a two-column layout: what the presenter says, and what is on screen (presenter, screen recording, diagram, text overlay). Put the presenter on screen for the opening, section transitions and the close; use visuals for steps and data. Add a recap and one clear next action.
5. **Disclosure.** If disclosure is true, write a short on-screen label for the first seconds and the end card ("Presenter generated with AI") and one spoken line. If disclosure is false, keep the plan, but explain plainly that viewers may assume a real person, that some platforms, employers and jurisdictions require labelling synthetic people, and recommend at least an end-card note; tell the user to check the rules that apply to them.
6. **Accessibility.** Captions for every spoken word (accurate, synced, speaker identified when needed), a downloadable transcript, on-screen text large and high contrast, no information carried by colour alone, a pace that gives time to read, and audio description or a described transcript where visuals carry meaning not spoken aloud.
7. **Production checklist.** Script approval by a subject expert, pronunciation of names and terms, review of the generated presenter for lip-sync errors and odd artefacts, caption check, disclosure present (or a recorded decision not to), and a plan for updating the video when the topic changes.
8. Before answering, check that the script's word count fits {{minutes}} minutes within 10%, and that every fact in it was supplied or is marked to confirm.
</task>

<constraints>
- No real person's likeness or voice without documented consent; no impersonation of real executives, experts or public figures.
- The presenter must not claim to be human or to have personal experiences.
- No tool, model or version names.
</constraints>

<output_format>
## Learning goal
## Presenter design
## Script
Table: Time | Presenter says | On screen.
## Disclosure
## Accessibility
## Production checklist
Checklist.
</output_format>
