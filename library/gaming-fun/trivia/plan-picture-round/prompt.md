---
schema: 1
id: plan-picture-round
kind: prompt
title: Plan a picture round for a quiz
description: Plans a picture round handout, such as close-ups, logos, flags or famous faces, with an image list, how to source or make each image fairly, layout, answer key and accessibility notes.
category: trivia
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher, gamer]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [picture-round, handout, close-ups, pub-quiz, answer-key, image-sourcing]
pairs_with:
  prompts: [host-trivia-night, plan-music-quiz-round]
args:
  - name: format
    description: The picture round type.
    type: enum
    enum: [close-ups, logos, flags, famous-faces, landmarks, silhouettes, mixed]
    default: mixed
  - name: images
    description: Number of pictures.
    type: number
    default: 12
  - name: audience
    description: Who plays and how (printed sheets on tables, a projector, a video call).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Round plan, Picture list, Sourcing, Layout, Answer key]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan picture rounds for quizzes. Picture rounds keep teams busy while the host marks other rounds, so they work best as a handout teams can puzzle over for the whole evening. The common mistakes are images that print too dark or small to read, close-ups so extreme they are guesswork, logos with the brand name visible, and pictures copied from anywhere without thinking about who owns them.

Format: {{format}}
Pictures: {{images}}
Audience and setup: {{audience}}
</context>

<task>
1. Choose {{images}} subjects that suit the audience, ordered from easy to hard, with a hidden theme if the person wants one.
2. For each picture, describe exactly what the image must show and what must be hidden (crop out text, brand names, captions, giveaway backgrounds). For close-ups, describe the crop so a careful eye can still solve it (a recognisable texture or edge, not a blank patch).
3. Sourcing: for each picture, the best fair route: take your own photo of an everyday object, draw a simple silhouette, use an openly licensed or public-domain image (check the licence and credit on the sheet if it asks), or use official press images where allowed. Flag famous faces and logos as needing extra care.
4. Layout: grid size, picture size (at least 5 to 6 cm wide on paper), numbering, answer lines under each, team-name box, greyscale-safe if printing in black and white; for a projector or video call, one picture per slide with a number and time on screen.
5. Write the answer key with acceptable alternatives and scoring (for example one point each, half a point for a near-miss on close-ups).
</task>

<constraints>
- Never describe how to remove watermarks or copy images from paid stock sites.
- Do not include photos of private individuals; famous faces only of public figures, shown neutrally.
- For flags and logos, use current versions and mark any that changed recently [verify].
- Add an accessibility note: a large-print copy on request, and no round that depends on telling red from green.
</constraints>

<output_format>
## Round plan
Format, theme, number of pictures, when to hand it out and collect it.
## Picture list
Table: # | Subject | What to show | What to hide | Difficulty.
## Sourcing
Per picture or by group: how to get a fair image.
## Layout
Bullets for print and for screen.
## Answer key
Table: # | Answer | Also accept | Points.
</output_format>
