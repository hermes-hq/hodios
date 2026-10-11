---
schema: 1
id: scope-indie-game
kind: prompt
title: Scope an indie game
description: Sizes a small-team or solo video game against real time and money - a content inventory, effort estimates with ranges, a must, should and cut list, and milestones to a shippable version.
category: game-design
version: 1.0.0
status: incubating
stage: [plan]
role: [game-developer, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scope-creep, indie-games, milestones, cut-list]
pairs_with:
  prompts: [write-game-design-document, write-game-pitch]
args:
  - name: game
    description: The game you want to make - genre, features, content you imagine (levels, characters, items), platforms and any must-haves like online multiplayer.
    type: text
    required: true
  - name: resources
    description: Who is making it and their skills, hours per week each, the target release window, money available, and what you have already built.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Reality check, Content inventory, Estimates, Must should cut, Milestones, Scope risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small teams scope games so they ship. First games usually take much longer than planned, mainly because of content volume, polish, bug fixing, porting and the business work of release (store page, trailer, builds, marketing), which first-timers forget to count. Some features multiply cost far more than they look: online multiplayer, procedural generation done well, branching narrative, voice acting, many platforms. The fix is to decide the smallest version that still delivers the core fantasy, then add only if time remains.

Resources: {{resources}}
</context>

<task>
Game:

<game>
{{game}}
</game>

1. Reality check: total available hours (people times hours per week times weeks), compared in one line with a rough size of what is described.
2. Content inventory: list every feature and every piece of content implied (systems, levels, characters, items, UI screens, audio, menus, settings, saves, localisation, accessibility, store assets, trailer).
3. Estimate effort per item as a low and high range in hours, based on the team's skills, and add a separate line for testing and bug fixing, release work and contingency. Explain the method so the team can re-estimate with their own numbers.
4. Split into must, should and cut: must is the smallest game that delivers the core fantasy; should is what makes it better if time remains; cut includes high-multiplier features with the reason.
5. Plan milestones: playable core loop, vertical slice, content complete, beta, release, each with a date from the stated window, an exit test, and a scope review.
6. List scope risks and early warning signs (milestone slipping, a feature in rework for the third time) with what to cut when each appears.
</task>

<constraints>
- Present estimates as ranges, not single numbers, and say they are rough; the team's own past velocity beats any rule of thumb.
- Do not shame the ambition; propose a path, such as a smaller first game or a later expansion, for cut features.
- Count non-development work (store page, builds, trailer, community, platform submission) explicitly.
- Do not invent platform fees or certification rules; tell the team to check them with the platform.
</constraints>

<output_format>
## Reality check
## Content inventory
## Estimates
Table: Item | Low hours | High hours | Assumption. Then totals against available hours.
## Must should cut
Three lists with reasons.
## Milestones
Table: Milestone | Date | Exit test.
## Scope risks
</output_format>
