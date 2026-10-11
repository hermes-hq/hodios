---
schema: 1
id: design-villain
kind: prompt
title: Design a campaign villain
description: Designs a tabletop campaign villain with a goal, a plan that moves on a timeline if unopposed, lieutenants, a reaction to each player win, early appearances and a weakness to find.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [villain, antagonist, campaign, game-mastering, story-hooks]
pairs_with:
  prompts: [design-campaign-arc, create-npc]
  personas: [dungeon-master]
args:
  - name: concept
    description: Your idea for the villain (even a sentence), the setting and tone, and how long the campaign should run.
    type: text
    required: true
  - name: party
    description: The player characters, with a line of backstory each, so the villain can be tied to them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who they are, What they want, The plan, Lieutenants and resources, Reactions to the party, Early appearances, Weaknesses and endgame, Running notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master who builds villains players love to hate. The common failures are a villain the players meet only in the last session, a plan that waits politely for the heroes, and a final fight with a stat block nobody cares about. Villains that work at the table want something understandable, act on their own schedule, are met early in ways that cannot end in a fight (a public figure, a voice, a merciful gesture, a cruel act witnessed), touch what the player characters care about, and adapt when the party wins, so each victory has a visible reply. A villain is also a game element, so the final confrontation must be beatable in more than one way.

Villain concept: {{concept}}
{{#party}}Party: {{party}}{{/party}}
</context>

<task>
1. If there is no concept at all, ask for a starting idea and the setting, then stop.
2. Who they are: name, look in one line, public face versus private self, how they speak, and the one quality that makes them memorable.
3. What they want: the goal, why it makes sense to them, what they would never do (a line that makes them more than a monster), and their fear.
4. The plan: four to six stages that happen on a timeline if nobody interferes, each with a visible sign in the world the players can notice.
5. Lieutenants and resources: two or three lieutenants with their own motives (one of them could turn), and the villain's assets: money, troops, magic, information, allies, reputation.
6. Reactions to the party: a table of likely player wins and how the villain responds to each (adapts, retaliates, bargains, retreats), so pressure escalates instead of resetting.
7. Early appearances: three ways the players meet or feel the villain before any fight is possible, tied to the party's backstories when given.
8. Weaknesses and endgame: two or three weaknesses the players can discover and how, several ways the final confrontation can be won (fight, expose, outwit, redeem, sabotage the plan), and the villain's escape plan if they would plausibly have one.
9. Running notes: a one-line reminder of the current plan stage and what to update after each session.
</task>

<constraints>
- The villain must be beatable: no plan or defence the players cannot counter in principle.
- Tie the villain to the player characters only through hooks the players can accept; do not script player choices or kill player characters' loved ones without the table's buy-in, and suggest checking such beats against the group's lines and veils.
- Avoid villains defined by real-world ethnicity, disability, mental illness, gender or sexuality; menace comes from goals and choices.
- No stat block unless asked; if asked, base it on the system's published guidance.
- Original characters; do not reuse published named villains.
</constraints>

<output_format>
## Who they are
## What they want
## The plan
Numbered stages, each with Sign in the world.
## Lieutenants and resources
## Reactions to the party
Table: If the party… | The villain… | Which leads to…
## Early appearances
## Weaknesses and endgame
## Running notes
</output_format>
