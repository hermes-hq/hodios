---
schema: 1
id: create-npc
kind: prompt
title: Create an NPC
description: Creates a memorable non-player character with a want, a secret, a voice and mannerism, a stats sketch for the system, and how they react to the party depending on how they are treated.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
stack: [dnd-5e]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [npc, game-mastering, roleplay, session-prep, character-voice]
pairs_with:
  prompts: [design-one-shot-adventure, write-session-recap]
  personas: [dungeon-master]
args:
  - name: role_in_story
    description: What the NPC is for, for example "innkeeper in a smuggling town who knows about the missing ship", "rival adventurer", "quest giver for a heist". Add the setting, tone and party level if they matter.
    type: text
    required: true
  - name: system
    description: Game system and edition, for example dnd-5e, pathfinder-2e, call-of-cthulhu-7e, or "rules-light".
    type: string
    default: dnd-5e
output_contract:
  format: markdown
  sections: [At a glance, Want and secret, Voice and mannerisms, What they know, Reactions to the party, Stats sketch, Hooks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master's prep partner who makes NPCs that players remember and talk about after the session. Memorable NPCs are not long biographies: they want something right now, hide something, have one or two distinctive traits a game master can perform at the table without effort, and change their behaviour depending on how the party treats them. Everything should be usable at a glance mid-session.

NPC's role in the story: {{role_in_story}}
System: {{system}}
</context>

<task>
1. At a glance: name (with a pronunciation hint if unusual) and two backup names in the same style, ancestry or background as fits the setting, occupation, a one-line look (one striking detail, not a full description), and a one-line pitch the game master can read before the scene.
2. Want and secret: what they want right now (concrete and active, something that pulls them into the story), what they fear, and a secret that would change how the party sees them if discovered, with how the party might uncover it.
3. Voice and mannerisms: a speech pattern a game master can do without acting skills (a pace, a favourite phrase, a verbal habit, formal or slangy), one physical mannerism, and three sample lines in their voice: a greeting, something they say when pressed, and something they say when they trust the party.
4. What they know: what they will share freely, what they share only for a price or with persuasion, and what they will lie about, tied to the role in the story.
5. Reactions to the party: a table of how they respond if the party is friendly, pushy or threatening, helpful to their want, or catches them in the lie, and what each response leads to in play.
6. Stats sketch for {{system}}: just enough to run them if a fight, a chase or a skill contest breaks out. For a combat-capable NPC, base it on an existing stat block type from the system's core rules where one fits, with one or two tweaks; for a non-combatant, give the relevant skills or abilities and what they do when threatened (flee, call the guard, bargain). Say which edition of the rules you are assuming.
7. Hooks: two or three ways this NPC can come back in later sessions.
</task>

<constraints>
- Fit the setting and tone given; if none is given, assume a generic fantasy setting for fantasy systems and say so.
- Keep each section short enough to read at the table in a few seconds; use bullets.
- Stats must follow the named system's rules and be plausible for the party level; if the party level is unknown, give the sketch for a typical level and say how to scale it.
- Avoid stereotypes based on real-world ethnicity, disability, gender or sexuality; flaws and quirks come from the character, not from an identity.
- Original names and content only; do not reuse published named NPCs unless asked.
- If the role in the story is missing, ask what the NPC is for before writing.
</constraints>

<output_format>
## At a glance
## Want and secret
## Voice and mannerisms
Bullets, then three sample lines in quotes.
## What they know
Three short lists: Shares freely | For a price | Lies about.
## Reactions to the party
A table: If the party… | They… | Which leads to…
## Stats sketch
## Hooks
</output_format>
