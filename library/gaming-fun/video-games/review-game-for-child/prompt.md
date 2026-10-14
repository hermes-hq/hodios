---
schema: 1
id: review-game-for-child
kind: prompt
title: Review a game for a child
description: Checks whether a specific video game suits a particular child, covering content, online contact, spending, time design and settings, and gives a yes, not yet or yes-with-conditions call.
category: video-games
version: 1.0.0
status: incubating
stage: [review]
role: [parent, teacher]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [age-ratings, kids-gaming, online-safety, in-game-purchases, family-gaming]
pairs_with:
  prompts: [set-up-parental-controls, set-screen-time-plan, talk-to-teen-about-online-safety]
args:
  - name: game
    description: The game and platform the child wants to play.
    type: string
    required: true
  - name: child
    description: The child's age, maturity, what worries or scares them, and anything that matters (for example "sensitive to gore", "already chats with strangers in other games").
    type: text
    required: true
  - name: concerns
    description: What you are worried about, if anything specific, and your country (ratings systems differ).
    type: text
output_contract:
  format: markdown
  sections: [Quick answer, What is in the game, Online and spending risks, Settings to change, Talk with your child]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents judge games for their own child. Official age ratings (PEGI, ESRB, USK, CERO, ACB, IARC and others) describe content such as violence, language and fear, but they often do not cover online interaction with strangers, user-generated content, or in-game purchases and reward mechanics, which are frequently the bigger risks. The same game can be fine for one ten-year-old and wrong for another, and playing together at first is the most reliable way to find out.

Game: {{game}}
Child: {{child}}
{{#concerns}}Concerns and country: {{concerns}}{{/concerns}}
</context>

<task>
1. If you do not know the game well enough to describe it, say so, give the questions a parent should answer by watching gameplay or reading the rating descriptors, and stop after the checklist.
2. Describe what is in the game: genre, tone, the kind of content that earns its rating, and anything that tends to upset younger children (jump scares, realistic violence, horror themes). Give the rating as something to check on the official rating site for their country.
3. Assess online and spending risks: voice and text chat with strangers, friend requests, user-created content, trading, in-game currency, randomised paid rewards, battle passes, and designs that push long sessions (daily streaks, limited-time events).
4. List settings to change on the game and the platform: chat limits, friends-only, purchase approvals, time limits, and where to find them in general terms.
5. Give the call (yes, yes with conditions, or not yet) for this child, with the conditions, and a few conversation starters to agree rules with the child.
</task>

<constraints>
- Do not state a rating as certain; ratings vary by region and change with updates.
- Do not invent features; if you are unsure whether the game has chat or purchases, say so and say how to check.
- Respect that the decision belongs to the parent; give reasons, not moral judgments.
- If the parent describes signs of grooming, threats or sexual contact from someone online (requests to move to a private app, gifts, secrecy), lead with that before any game review: save evidence, do not confront the person, report to the platform, contact the police or the national child protection service, and talk calmly with the child without blame.
</constraints>

<output_format>
## Quick answer
One line: the call and the main reason.
## What is in the game
Bullets.
## Online and spending risks
Table: Risk | Present? | What to do.
## Settings to change
Checklist.
## Talk with your child
Three to five conversation starters.
</output_format>
