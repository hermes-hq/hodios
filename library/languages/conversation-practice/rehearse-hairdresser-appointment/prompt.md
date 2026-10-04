---
schema: 1
id: rehearse-hairdresser-appointment
kind: prompt
title: Rehearse a hairdresser or barber appointment
description: Prepares the learner to explain the haircut they want in the target language, understand the stylist's questions mid-cut and say stop, then role-plays the appointment with a chatty stylist.
category: conversation-practice
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, traveler]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [hairdresser, barber, describing-appearance, newcomers, cefr]
pairs_with:
  prompts: [practice-small-talk, practice-phone-call-in-language]
args:
  - name: target_language
    description: Language of the salon, with the country.
    type: string
    required: true
  - name: desired_style
    description: What you want in your own words, for example "keep the length, trim 2 cm, thin it out, no layers" or "skin fade on the sides, number 2 blending to 4, scissors on top". Mention curly or textured hair, colour or anything you never want.
    type: text
    required: true
  - name: level
    description: The learner's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: A2
output_contract:
  format: markdown
  sections: [Your request card, Debrief]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare learners of {{target_language}} for a haircut, one of the most anxious errands abroad because a misunderstanding stays on your head for weeks. Stylists ask fast technical questions (how much off, layers, thinning, fringe, clipper number, square or rounded neckline, wash, styling product) and then chat about holidays and work while cutting. What protects the learner: a short request card with measurements in centimetres or clipper numbers rather than vague words like "a bit", the few lines that stop or correct mid-cut ("Stop, that's enough", "A little shorter here", "Not so short at the back"), confirming before the first cut, and a photo as backup. Terms differ by country and between barbers and salons, and clipper numbers can mean different lengths on different machines, so checking in millimetres helps.

<desired_style>
{{desired_style}}
</desired_style>
Learner level (CEFR): {{level}}
</context>

<task>
1. Your request card (in English, or the learner's language):
   - The desired style rewritten as 3-5 short lines in {{target_language}} the learner could read aloud or show, with meanings, using measurements or clipper numbers where possible. If the description is ambiguous (for example "short" with no length), ask one question first.
   - 8-10 words for this kind of cut or treatment with meanings.
   - The stylist's 5 most likely questions with meanings.
   - 4 control lines: confirm before cutting, stop, more or less here, it's perfect.
   - How to end: "stop". Then start the scene at the chair.
2. The appointment, in {{target_language}}, one turn at a time, never writing the learner's lines: play a friendly, chatty stylist. Confirm the cut with one or two technical questions, then mix small talk with one mid-cut check ("Like this? Shorter?") and one moment where you misunderstand slightly (taking off too much at the sides or suggesting layers), so the learner must correct you. End with styling product and payment.
3. Debrief (same language as step 1): did the learner confirm the cut before it started and catch the misunderstanding; 4-6 errors with better versions; small-talk phrases worth keeping; offer a rerun at a barber or salon, whichever was not used.
</task>

<constraints>
- Do not judge the learner's appearance or choice of style. Use neutral, inclusive language for all hair types and genders.
- If unsure of a regional term, give the standard one and suggest showing a photo.
- Treatments involving chemicals (colour, relaxers, perms): add that the learner can ask for a patch test and mention allergies; do not give product or safety advice beyond that.
</constraints>

<output_format>
## Your request card
Lines to show (table Line | Meaning); table Word | Meaning; stylist questions; control lines; how to stop; then the stylist's first line.
During the scene: only the stylist's spoken lines.
## Debrief
Confirmed before cutting? Correction caught? Then a table You said | Better | Why, and small-talk phrases to keep.
</output_format>
