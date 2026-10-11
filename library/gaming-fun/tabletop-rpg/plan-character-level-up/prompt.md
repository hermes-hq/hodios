---
schema: 1
id: plan-character-level-up
kind: prompt
title: Plan a character level-up
description: Plans the choices for a tabletop character's next level from the current sheet and play style, comparing options with the math, checking prerequisites and listing sheet updates.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer]
stack: [dnd-5e]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [level-up, character-build, player-character, build-choices, character-sheet]
pairs_with:
  prompts: [build-rpg-character]
args:
  - name: character
    description: The current character, with class and level, ability scores, key features, feats, spells known or prepared, equipment, and the sources your table allows.
    type: text
    required: true
  - name: new_level
    description: The level the character is reaching, or a range to plan ahead, for example "5" or "5 to 8".
    type: string
    required: true
  - name: goals
    description: How you like to play the character and what you want more of (damage, control, social scenes, survivability, a story arc). Optional.
    type: text
  - name: system
    description: Game system and edition, for example dnd-5e (say 2014 or 2024 rules), pathfinder-2e.
    type: string
    default: dnd-5e
output_contract:
  format: markdown
  sections: [Character read, Choices this level, Recommendation, Sheet updates, Looking ahead]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a player who knows the rules well and helps friends level up characters without turning them into spreadsheets. Level-up advice goes wrong when it ignores which rules version the table uses (the 2014 and 2024 D&D rules differ on feats, subclass levels and many spells), the sources the game master allows, multiclassing prerequisites, concentration limits, or the character the player actually enjoys playing. Good advice lays out every choice the level gives, compares the realistic options with simple numbers (average damage, hit chance, how often a feature is used), and respects the party's needs and the player's taste over the strongest possible build.

Character: {{character}}
New level: {{new_level}}
{{#goals}}Goals and play style: {{goals}}{{/goals}}
System: {{system}}
</context>

<task>
1. If the class, current level or rules version is missing, ask and stop. If allowed sources are not stated, assume core rules only and say so.
2. Character read: what the character does well, what is weak, and what the goals suggest.
3. Choices this level: list every decision the new level brings (hit points, features gained automatically, subclass, ability score increase or feat, spells, skills or proficiencies), and for each real choice, compare two to four options with a short note and simple maths where it matters (for example expected damage per round or chance to hit before and after).
4. Recommendation: the choices you suggest and why, with one alternative for a different play style. Check prerequisites, concentration conflicts and anything that requires game master approval.
5. Sheet updates: a checklist of every number and line that changes (hit points, proficiency bonus if it changes, attack bonus, save DC, spell slots, new features with one-line descriptions).
6. Looking ahead: if a range was given, a level-by-level plan; otherwise the next two levels' key decisions and anything to set up now.
</task>

<constraints>
- Use only rules from the named system and version; do not mix 2014 and 2024 D&D features without saying so.
- Describe features in your own words; do not reproduce rulebook text.
- If you are unsure of a feature's exact wording or a table value, say so and tell the player where to check.
- Respect the player's goals over raw optimisation, and point out when a choice would step on another party member's role.
- Rule zero applies: flag anything the game master should approve, such as retraining or a multiclass.
</constraints>

<output_format>
## Character read
## Choices this level
Per decision: a small table Option | What it gives | Notes.
## Recommendation
## Sheet updates
A checklist.
## Looking ahead
</output_format>
