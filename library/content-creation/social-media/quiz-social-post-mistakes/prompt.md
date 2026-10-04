---
schema: 1
id: quiz-social-post-mistakes
kind: prompt
title: Quiz on social post mistakes
description: Runs a spot-the-problem quiz with flawed example posts covering alt text, disclosure, privacy leaks, misleading claims and tone-deaf timing, then explains each. Use to train new staff and volunteers.
category: social-media
version: 1.0.0
status: incubating
stage: [learn]
role: [marketer, content-creator, manager]
requires: [none]
inputs: [text]
output: [quiz, conversation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [staff-training, volunteer-training, spot-the-mistake, social-media-policy, alt-text]
pairs_with:
  prompts: [write-community-guidelines, run-social-media-audit]
  personas: [social-media-manager]
args:
  - name: organisation_type
    description: The kind of organisation the player posts for (for example "primary school", "charity shop", "council leisure centre", "dental clinic"), so the examples feel real.
    type: string
    default: small nonprofit
  - name: rounds
    description: How many posts to show.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Scorecard, Your strong spots, Watch for, House rules to remember]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
New staff and volunteers who post for an organisation make predictable mistakes, and a policy document rarely sticks. A quick game of spotting problems in realistic posts trains the eye better. The mistakes worth training are the costly ones: privacy leaks (a child's full name with a school photo, a visible address, a whiteboard with patient names), missing accessibility (no alt text, text only in an image, uncapitalised hashtags, flashing video without warning), hidden paid or gifted promotion, misleading or unverifiable claims, copyrighted music or images, tone-deaf timing (an upbeat promo on a day of local tragedy), arguing with a customer in public, and broken basics (wrong date, dead link).

Organisation type: {{organisation_type}}
Rounds: {{rounds}}
</context>

<task>
1. Open with two lines: how the game works (you will see a post, find what is wrong, one point per problem found, a bonus point for the fix) and that they can type "hint", "skip" or "stop" any time. Ask if they are ready, or start straight away if they say go.
2. Each round, show one fictional post set at a {{organisation_type}}: the caption, a description of the image or video in [square brackets], hashtags, posting time and context if relevant. Each post hides one to three problems. Vary the categories so all of them appear across the game, and get harder in later rounds (subtle privacy clues, a disclosure buried after the fold).
3. Wait for the player's answer. Then give: points scored; each problem they found, confirmed briefly; each problem they missed, with why it matters in one line; and a fixed version of the post (short).
4. If an answer is partly right, give partial credit and name the missing piece. If they spot a "problem" that is fine, say why it is fine. Never mock a wrong answer.
5. After every three rounds, give a one-line running score.
6. After the last round or "stop", give the closing summary below.
</task>

<constraints>
- All posts, names, places and people are fictional; never use a real person or organisation.
- One post per message; feedback under 120 words per round.
- Keep fixes practical and general; where rules vary by country (advertising disclosure, data protection, photo consent for children), say "check your organisation's policy and local rules" rather than stating the law.
- Do not show graphic or hateful content in examples; describe a tone-deaf post rather than writing slurs.
</constraints>

<output_format>
Per round: **Round N of {{rounds}}**, the post in a quote block, then "What's wrong with this post?"

After the answer: **Score** line, **Found**, **Missed**, **Fixed post**.

At the end:
## Scorecard
Total points out of maximum, and rounds played.

## Your strong spots
Two or three bullets.

## Watch for
The categories they missed most, each with a one-line habit.

## House rules to remember
Five short rules drawn from the game.
</output_format>
