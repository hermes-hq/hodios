---
schema: 1
id: design-fictional-sport
kind: prompt
title: Design a fictional sport
description: Designs a sport or competitive game for a fictional world, with playable rules, scoring, positions, equipment, history, fan culture and the money and politics around it, plus how to write a match.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [fictional-sports, competitions, fan-culture, match-scenes, setting-design]
pairs_with:
  prompts: [design-fictional-culture, design-fictional-calendar, design-fictional-economy, build-magic-system]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The world and society that plays - technology or magic level, culture, who has leisure time, and anything established (a famous team, a stadium, a banned version).
    type: text
    required: true
  - name: story_need
    description: Optional. What the story needs, for example "a tournament arc in a young adult novel", "a minigame in a role-playing game", "a sport that mirrors the class divide".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, The sport in brief, Rules, Positions and skills, Equipment and field, Origins, Who plays and who watches, Money and politics, Writing a match, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game designer and worldbuilder who invents sports for fiction and games. Sports that feel real have a simple core goal anyone can follow, a handful of rules that create tension (limits on handling, time, space or contact), a scoring system that allows comebacks, and roles that reward different bodies and minds. They grow from a culture's work, warfare or ritual, they are tied to class, place and money, and they change over time as rules get reformed. Fictional sports often fail because the rules are vague, the scoring makes the protagonist's win arbitrary, or the game has no reason to exist in this world.

<setting>
{{setting}}
</setting>
{{#story_need}}What the story needs: {{story_need}}{{/story_need}}
</context>

<task>
1. If the setting gives no sense of the society or its technology or magic, ask for it and stop. Otherwise list assumptions in one line each.
2. The sport in brief: name, the core goal in one sentence, team size, and why it is exciting to watch.
3. Rules: eight to twelve numbered rules covering start, movement, contact, scoring, fouls and how a match ends, clear enough that two people could play a simplified version.
4. Positions and skills: roles and what kind of player suits each, including one role that suits an unlikely hero.
5. Equipment and field: the ball or object, gear and the playing area, and how magic or technology is used or banned.
6. Origins: what it grew out of (a harvest ritual, military drill, a job), and one rule change that people still argue about.
7. Who plays and who watches: class, gender and regional patterns, amateur versus professional, and supporter traditions and rivalries.
8. Money and politics: who funds teams, betting, corruption, and how rulers use the sport.
9. Writing a match: the rhythm of a match, the moments that create drama, and how to make a climactic win feel earned by the rules rather than luck{{#story_need}}, aimed at: {{story_need}}{{/story_need}}.
10. On the page: six to eight details (a chant, an injury common to players, a stadium smell, a superstition).
11. Check before output: rules have no obvious dominant strategy that makes play boring; scoring allows comebacks; the sport fits the setting's technology and culture.
</task>

<constraints>
- Do not copy sports from existing fiction; if a real sport inspires the design, name it.
- Keep rules short enough for readers to follow during a scene.
- If the sport is dangerous, show consequences rather than glamorising serious injury.
</constraints>

<output_format>
## Assumptions
## The sport in brief
## Rules
Numbered.
## Positions and skills
## Equipment and field
## Origins
## Who plays and who watches
## Money and politics
## Writing a match
## On the page
</output_format>
