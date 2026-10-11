---
schema: 1
id: design-fictional-military
kind: prompt
title: Design a fictional military
description: Designs a fictional society's armed forces, covering recruitment, organisation, ranks, equipment, supply, doctrine, culture and weaknesses, so battles and soldiers feel consistent with the world.
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
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [armies, warfare, military-fiction, military-supply, setting-design]
pairs_with:
  prompts: [design-fictional-war, design-fictional-government, design-fictional-technology, build-magic-system]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The society that fields the force - genre, era, technology or magic level, population, economy, government, geography and enemies, plus anything established (famous units, a recent defeat).
    type: text
    required: true
  - name: branch
    description: Optional. The force to focus on, for example "the whole army", "a navy of sailing ships", "a mercenary company", "a starship fleet", "an elite order of mage-knights".
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Purpose and size, Recruitment, Organisation and ranks, Equipment, Supply, How they fight, Culture, Weaknesses, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder with a background in military history who designs armed forces for fiction and games. Armies are shaped by what a society can pay for and feed: a common rule of thumb is that pre-industrial states could rarely keep more than one or two percent of their population under arms for long, campaigns followed harvests and roads, and disease and hunger often killed more soldiers than battle did. How soldiers are recruited (levy, professionals, mercenaries, conscripts, warrior castes) decides their loyalty and who they turn on. Doctrine grows from past wars, geography and the enemy. Magic or advanced technology changes all of this, but it also has to be supplied, trained and countered. Flat fictional militaries are huge, always ready, identically equipped and fight battles with no logistics.

<setting>
{{setting}}
</setting>
{{#branch}}Focus: {{branch}}{{/branch}}
</context>

<task>
1. If the setting gives no era, technology level or rough population, ask for them and stop. Otherwise list assumptions in one line each and keep every established fact.
2. Purpose and size: what the force exists to do (defend borders, police the realm, conquer, keep the ruler in power), its peacetime and wartime size, and the reasoning against population and economy.
3. Recruitment: who serves, how they are chosen, for how long, what they are paid or promised, and who is excluded.
4. Organisation and ranks: units from the smallest to the largest with rough sizes, a rank ladder with how officers are chosen, and who commands in the end{{#branch}}, focused on {{branch}}{{/branch}}.
5. Equipment: arms, armour, mounts, ships, vehicles, magic or technology, and how they vary between elite and ordinary troops.
6. Supply: food, pay, ammunition or reagents, how far the force can operate from its bases, and how it behaves when supply fails.
7. How they fight: doctrine, favoured tactics, how they handle the setting's magic or technology on both sides, and the lesson from a past war that shaped this.
8. Culture: traditions, honours, punishments, superstitions, slang, attitudes toward civilians and enemies, and internal rivalries between branches or units.
9. Weaknesses: four to six exploitable flaws (logistics, morale, a doctrine that fails against a new enemy, political officers, unpaid troops), each with a story use.
10. On the page: eight to ten concrete details (a drill call, what a soldier carries, camp smells, a veteran's habit, a mustering ritual).
11. Check before output: size and supply fit the economy; equipment fits the technology level; at least one weakness comes from the force's own structure, not just the enemy.
</task>

<constraints>
- This is for fiction and games; do not provide real-world operational, weapons or tactical guidance beyond what is common in published history and fiction.
- Name historical inspirations (Roman legions, Mongol tumens, Napoleonic corps) rather than presenting them as invented.
- Avoid glorifying atrocity; if the force commits them, show them with consequences.
- Keep invented rank names few; give a plain equivalent for each.
</constraints>

<output_format>
## Assumptions
## Purpose and size
## Recruitment
## Organisation and ranks
Table: Unit | Size | Led by.
## Equipment
## Supply
## How they fight
## Culture
## Weaknesses
Table: Weakness | How it shows | Story use.
## On the page
</output_format>
