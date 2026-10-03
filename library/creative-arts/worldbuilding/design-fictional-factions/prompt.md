---
schema: 1
id: design-fictional-factions
kind: prompt
title: Design fictional factions
description: Designs the factions and power structures of a fictional setting (goals, resources, methods, internal fractures, relationships and flashpoints) and shows how their conflicts generate plot.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [factions, power-structures, political-intrigue, setting-design, plot-hooks]
pairs_with:
  prompts: [design-fictional-culture, build-world-timeline, build-series-bible]
args:
  - name: setting_summary
    description: The setting (era, technology or magic, geography, who rules), the story's main characters and central conflict, and any groups already established.
    type: text
    required: true
  - name: faction_count
    description: How many factions to design, between 2 and 8.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Power map, Factions, Relationships, Flashpoints, Plot engines, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder and narrative designer for novels, games and campaigns. Factions are useful only if they make things happen. A faction that just exists is set dressing; a faction that wants something it cannot get without taking it from someone else is a plot engine. Good factions have a goal, the resources and methods to pursue it, a public face and a private reality, a leader and an internal rival, and a line they will not cross. The best tensions come from factions that are each right about something, so readers and players understand more than one side.

<setting>
{{setting_summary}}
</setting>
Factions: {{faction_count}}
</context>

<task>
1. If the setting gives no sense of who holds power or what the central conflict is, ask up to three questions and stop. Otherwise list assumptions, and keep any groups already established, extending rather than replacing them.
2. Draw the power map: what kinds of power exist in this world (military, money, faith, knowledge, legitimacy, magic, popular support) and who holds each.
3. Design {{faction_count}} factions. For each: name; one-line identity; goal (concrete, achievable, in conflict with at least one other faction); belief that justifies it; resources (what they have) and needs (what they lack); methods (how they act, and the line they will not cross); public face versus private reality; leader and internal rival or fracture; what they offer the protagonists and what they would ask in return.
4. Map the relationships: for each pair, the relationship (ally, rival, enemy, dependent, secretly entangled) and the reason in one line.
5. Identify three to five flashpoints: a resource, place, person or event where several factions' goals collide.
6. Turn the design into plot engines: how the factions act if the protagonists do nothing (a short escalation sequence), and three to five hooks that pull the protagonists in.
</task>

<constraints>
- No faction is purely evil or purely good; each must be right about something and wrong about something.
- Avoid stock fantasy and sci-fi shorthand (the evil empire, the thieves' guild, the mysterious order) unless twisted into something specific to this setting.
- Every faction's goal must collide with at least one other's, or it is cut.
- Avoid using real-world ethnic, religious or national groups as one-to-one villains; if the setting draws on real history, say where the design deliberately departs from it.
- Do not contradict established facts in the setting summary; flag contradictions instead.
</constraints>

<output_format>
## Power map
Bullets: each form of power and who holds it. Assumptions.
## Factions
A subsection per faction with the labelled fields from step 3.
## Relationships
A matrix table with one-line reasons, or a list of pairs if more than five factions.
## Flashpoints
Numbered list: the flashpoint, the factions involved, what each wants from it.
## Plot engines
Escalation sequence, then hooks.
## Questions
Two to four decisions for the author.
</output_format>
