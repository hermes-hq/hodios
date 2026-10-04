---
schema: 1
id: script-filmed-fundraising-appeal
kind: prompt
title: Script a fundraising appeal video
description: Scripts a short fundraising appeal video for a charity, school or community project around one consented story, a concrete need, what a gift does and a single ask, captioned for muted viewing.
category: video
version: 1.0.0
status: incubating
stage: [plan, build]
role: [content-creator, marketer, writer]
subject: [nonprofit]
requires: [none]
inputs: [notes, text]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [appeal-video, ethical-storytelling, informed-consent, donation-ask, burned-in-captions]
pairs_with:
  prompts: [write-short-form-script, plan-video-shoot]
  personas: [grant-writer]
args:
  - name: cause
    description: The organisation or project, the problem it tackles, the appeal target and deadline, and what money is spent on, with real costs if your finance team has them.
    type: text
    required: true
  - name: story_notes
    description: Notes on the one person, family or group at the centre - what happened, in their words where possible, what changed - and what they agreed to (filming, name, face, location).
    type: text
    required: true
  - name: length_seconds
    description: Target length in seconds.
    type: number
    default: 90
  - name: ask
    description: Optional. The single ask, for example "give 15 a month" or "donate by 31 May". Leave empty to have one proposed from the cause.
    type: string
output_contract:
  format: markdown
  sections: [Concept, Script, Shot list, Consent and dignity check, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write appeal videos for small charities and community projects. Good appeals follow one person's real story, show the problem concretely, make clear what a gift changes, and end with one ask. Bad ones use pity framing (the helpless victim waiting to be saved), stock images of suffering, inflated "your 10 feeds a child for a year" claims nobody has costed, and stories taken from people who did not fully understand where the video would go. The person in the story is a protagonist with agency, and the donor is a partner, not a rescuer. Many viewers watch muted, so the video must work from captions and pictures alone.

Length: about {{length_seconds}} seconds.
{{#ask}}Ask: {{ask}}{{/ask}}
</context>

<task>
<cause>
{{cause}}
</cause>

<story_notes>
{{story_notes}}
</story_notes>

1. Concept: one sentence for the story, the change it shows, and the ask. If no ask is given, propose one tied to a real cost in the cause notes, or mark [AMOUNT] for the finance team.
2. Structure for {{length_seconds}} seconds:
   - 0-5 s: a specific, human moment with a caption (not a statistic, not a logo).
   - Problem: the need in concrete terms (what, how many, where) using only the given figures.
   - Turn: what the organisation did, with the person's own words.
   - What a gift does: one concrete, costed example or a plain "your gift funds X", honest about whether funds are restricted to this project.
   - Ask: one action, one link or method, the deadline if any. Repeat on the end card.
3. Write the script as a table with caption text for every line of speech, captions burned in, under about 40 characters per line.
4. Shot list: the person in their own setting doing something, close-ups of hands and work, the project in action; no stock suffering imagery, no children shown in distress, no shots that reveal a vulnerable person's home or location unless agreed.
5. Consent and dignity check: confirm informed consent covers this use, platforms and how long the video stays up; that they saw or will see the edit; that they can withdraw; parental consent plus the child's own agreement for under-18s; and that any payment or service is not conditional on taking part.
</task>

<constraints>
- Use only the facts, figures and quotes in the notes. Never invent statistics, costs, outcomes or quotes; mark gaps as [CHECK] or [AMOUNT].
- No pity framing, guilt lines or language that defines the person by their need ("helpless", "suffering", "the poor"). Use their name or chosen pseudonym and describe what they did.
- Do not identify survivors of abuse, refugees at risk, children or people in crisis beyond what the notes say they agreed to; default to first name only or a pseudonym, faces out of shot and no location.
- Interview with care: ask for prompts that let the person tell their story without reliving trauma on camera, and offer to stop.
- If the story notes lack consent details, write the script but put consent first under Questions and say not to film or publish until it is confirmed.
</constraints>

<output_format>
## Concept
Three lines: story, change, ask.

## Script
Table: seconds | visual | speech or voice-over | caption.

## Shot list
Numbered shots with notes on framing and what not to show.

## Consent and dignity check
Checklist with yes, no or unknown for each item.

## Questions
Missing facts, costs and consent items.
</output_format>
