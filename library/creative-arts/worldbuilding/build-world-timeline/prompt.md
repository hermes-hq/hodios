---
schema: 1
id: build-world-timeline
kind: prompt
title: Build a world timeline
description: Builds a fictional world's history as eras and pivotal events with causes, lasting consequences and contested memories that feed the present-day story's conflict. Use for novels, games and campaigns.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [world-history, fictional-history, causality, factions]
pairs_with:
  prompts: [design-fictional-culture, design-fictional-geography, build-magic-system, build-series-bible]
  personas: [dungeon-master]
args:
  - name: world_summary
    description: The world as it stands, such as its geography, peoples, nations or factions, technology and magic, religions, and any history you already have (events, ruins, legends) that must stay.
    type: text
    required: true
  - name: present_day_conflict
    description: The conflict your story or campaign starts with, e.g. "a succession crisis in the empire", "a plague in the river cities". Leave blank to get suggested conflicts the history sets up.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Timeline at a glance, Eras, Pivotal events, Roads to the present, History in the present, Contested history, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fictional history often reads like a list of dates: a golden age, a great war, a dark age, ten thousand years in which nothing changes and every language and technology stays frozen. Histories that make a world feel real work like real history: events have structural causes (scarcity, demographic pressure, a new technology or belief, a climate shift) and triggers (an assassination, a failed harvest, a marriage); consequences last for generations in borders, laws, grudges, holidays, place names and ruins; and different peoples remember the same events differently. For a story, the purpose of history is the present: every era should leave something the characters still live with, fight over or misunderstand.
</context>

<task>
Build a history for this world:

<world>
{{world_summary}}
</world>

Present-day conflict: {{present_day_conflict}}

1. **Assumptions:** the time depth you are covering (prefer a few thousand years at most unless the premise demands more, with detail concentrated in the last few centuries), the calendar or dating system you will use and who invented it, and what you treat as fixed from the summary. If the summary lacks peoples, places or anything to anchor history, ask up to three questions and stop. If no present-day conflict is given, propose three that a history could set up, pick one, and say so.
2. **Timeline at a glance:** a table of eras with dates, a name (as historians in the world call it, and what rivals call it if different), and the defining change.
3. **Eras:** for each era, a short paragraph: how it began, what defined daily life and power, what technology, magic or belief changed, and how it ended.
4. **Pivotal events:** six to ten events, each with: date; what happened; structural causes and the trigger; who won and lost; consequences that still matter today; and what physical traces remain (ruins, monuments, scars on the land, artefacts).
5. **Roads to the present:** two or three causal chains, written as "because A, B; therefore C", that connect early events to the present-day conflict, so the conflict looks inevitable in hindsight.
6. **History in the present:** concrete ways the past shows up in daily life: place names, festivals and holidays, laws and taxes, insults and sayings, borders, religious practices, inherited feuds, forbidden places, and how many people still have family memory of the most recent upheaval.
7. **Contested history:** three events that different factions remember differently, with each side's version and what the truth (or the author's options for it) is, plus any lost history that only a few know and that could be revealed in the story.
8. **Open questions:** three or four gaps deliberately left open for the author to fill or to discover in play.
</task>

<constraints>
- Keep every fact from the world summary; add, do not override. If something in the summary is inconsistent, flag it rather than silently fixing it.
- Make change happen: technology, language, borders and beliefs evolve across eras; avoid long periods of stasis unless the premise explains them.
- Avoid simple good versus evil histories: give every faction understandable reasons.
- Avoid copying real-world history wholesale or recognisable histories from well-known fiction; drawing on real patterns is fine.
- Keep it usable at the table or the desk: concrete names, dates and consequences over long prose.
</constraints>

<output_format>
Use the sections in order as level-two headings. Timeline at a glance is a table: Era | Dates | Name | Defining change. Pivotal events are numbered with labelled parts.
</output_format>
