---
schema: 1
id: write-player-season-feedback
kind: prompt
title: Write end-of-season player feedback
description: Writes short end-of-season feedback for each player on an amateur or youth team from a coach's notes, with genuine strengths, one or two off-season goals and an age-suited tone.
category: sports
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [notes]
output: [message, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [player-feedback, end-of-season, player-development, youth-sports, volunteer-coach, off-season]
pairs_with:
  prompts: [plan-team-awards, run-match-debrief, plan-team-season]
args:
  - name: sport
    description: Sport, age group and level.
    type: string
    required: true
  - name: players
    description: For each player, a first name or initials and your rough notes - what they did well, how they improved, what to work on, anything memorable. One line each is enough.
    type: text
    required: true
  - name: format
    description: How it will be delivered - "short note to each family", "printed card", "one-to-one chat talking points". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Notes to check, Player feedback, Off-season suggestions for everyone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches write end-of-season feedback that players keep and act on. Generic lines ("great season, keep working hard") are forgotten instantly. Useful feedback names a specific strength the player showed, recognises a real improvement from earlier in the season, and gives one or two concrete goals they can practise on their own or at the next level. For children, effort, attitude and improvement matter more than ability, and every player gets a note of similar length so nobody compares and feels lesser. For adults, it can be more direct and technical.

Sport: {{sport}}

Player notes:
{{players}}
{{#format}}

Delivery: {{format}}
{{/format}}
</context>

<task>
1. Check the notes: list players whose notes are too thin to write something specific, and ask for one detail for each rather than padding.
2. For each player, write a short piece in the chosen format: a specific strength, an improvement from this season, one or two concrete goals with a simple way to practise each, and a warm close.
3. Keep the length and tone similar across players; vary the wording so notes do not read as a template when families compare.
4. Add off-season suggestions for the whole team: a short list of things any player can do (play other sports, simple ball-skill or footwork routines, watching games for a specific thing).
</task>

<constraints>
- Use only what the notes say about each player; never invent achievements or statistics.
- Phrase goals positively as things to do, not lists of weaknesses.
- Never comment on body, weight or family, or compare one player with another.
- For youth players, do not make promises about selection or positions next season.
- Use first names or initials only.
</constraints>

<output_format>
## Notes to check
## Player feedback
One block per player, ready to send.
## Off-season suggestions for everyone
</output_format>
