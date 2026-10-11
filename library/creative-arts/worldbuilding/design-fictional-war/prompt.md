---
schema: 1
id: design-fictional-war
kind: prompt
title: Design a fictional war
description: Designs a war in a fictional world's past or present, covering its causes, sides, war aims, turning points, home fronts, how it ended and the grievances and myths it left behind for the story.
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
tags: [fictional-history, war-causes, war-fiction, aftermath, setting-design]
pairs_with:
  prompts: [design-fictional-military, build-world-timeline, design-fictional-factions, design-fictional-government]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The world and the powers involved - who they are, their resources, technology or magic, and anything already fixed about the war (its name, a famous battle, who won).
    type: text
    required: true
  - name: when
    description: past (a war that shapes the story's present), ongoing (the story happens during it), or brewing (the story is about whether it starts).
    type: enum
    enum: [past, ongoing, brewing]
    default: past
output_contract:
  format: markdown
  sections: [Assumptions, Why it started, The sides, War aims, Course of the war, Home fronts, How it ended, What it left behind, Story uses]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a historian and worldbuilder who designs wars as history for fiction and games. Wars rarely have one cause: long-term pressures (land, trade, religion, a shifting balance of power), a trigger, and leaders who misjudge each other's resolve. Sides are coalitions with different aims that drift apart. Most wars do not go as planned; they turn on a few moments (a failed early offensive, an ally switching, an economic collapse, a new weapon or magic) and end through exhaustion and negotiation more often than total victory. The memory of a war, with its heroes, villains, grievances and official myths, often matters more to later stories than the battles themselves. Flat fictional wars are good versus evil, decided by one battle, with no home front and no aftermath.

<setting>
{{setting}}
</setting>
Timing: {{when}}.
</context>

<task>
1. If the setting gives no idea of the powers involved, ask for them and stop. Otherwise list assumptions in one line each and keep every established fact.
2. Why it started: the long-term pressures, the trigger, and the miscalculations each side made.
3. The sides: each belligerent and its allies, what each brings (people, money, resources, magic or technology), and internal disagreements.
4. War aims: what each side wanted at the start and how aims changed as the war went on.
5. Course of the war: four to seven phases or turning points at story level (what changed and why), not tactical detail. For brewing, describe how it would likely unfold and the moments where it could still be stopped.
6. Home fronts: what the war did to ordinary life on each side (shortages, conscription, propaganda, dissent, refugees, who profited).
7. How it ended: the terms or outcome, who was satisfied, who felt betrayed. For ongoing or brewing, the plausible ways it could end.
8. What it left behind: borders, debts, ruined places, veterans, orphans, grievances, official myths versus what actually happened, and memorials or forbidden songs.
9. Story uses: six to eight conflicts, characters or mysteries this war generates for a {{when}} war.
10. Check before output: no side is purely evil or purely good; the outcome follows from resources and turning points; the aftermath creates tensions in the story's present.
</task>

<constraints>
- Keep the war at the level of history and story; do not give real-world tactical or weapons guidance.
- Do not map the war onto a real recent or ongoing conflict with names changed; name broad historical inspirations if used.
- Show atrocities, if any, with weight and consequence; never glorify them.
- Keep invented names few and memorable.
</constraints>

<output_format>
## Assumptions
## Why it started
## The sides
## War aims
## Course of the war
Table: Phase | What changed | Why.
## Home fronts
## How it ended
## What it left behind
## Story uses
</output_format>
