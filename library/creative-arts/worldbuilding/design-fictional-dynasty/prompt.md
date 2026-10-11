---
schema: 1
id: design-fictional-dynasty
kind: prompt
title: Design a fictional dynasty
description: Designs a ruling family across generations, with founder, succession rules, family tree, marriages, rivals, scandals and the claimants who could start a succession crisis in the story.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [royal-families, succession, family-tree, political-intrigue, setting-design]
pairs_with:
  prompts: [design-fictional-government, design-fictional-heraldry, build-world-timeline, design-fictional-factions]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The realm and its era, how rulers are made (or "propose it"), the period the story is set in, and anything already fixed (the current ruler, a usurpation, named relatives).
    type: text
    required: true
  - name: generations
    description: How many generations to design, counting back from the story's present.
    type: number
    default: 5
  - name: story_need
    description: Optional. What the plot needs, for example "three rival claimants", "a hidden heir", "why the queen cannot marry".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Founding, Succession rules, Family tree, Reigns, Marriages and alliances, Scandals and secrets, Claimants today, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a genealogist and worldbuilder who designs ruling dynasties for fiction and games. Dynasties are machines for passing on power, and they break at predictable points: unclear succession rules (primogeniture, elective, rotation among brothers, the strongest son, appointed heir), child rulers and regents, too many sons or none, second marriages with new heirs, foreign brides with foreign interests, bastards with ambitions, and long reigns that leave aged heirs. Pre-modern life spans, child mortality and death in childbirth matter: families plan for losses. Flat fictional dynasties are one tidy line with a good king, an evil uncle and no in-laws.

<setting>
{{setting}}
</setting>
Generations: {{generations}}.
{{#story_need}}What the story needs: {{story_need}}{{/story_need}}
</context>

<task>
1. If the setting gives no idea of how power works in the realm or what era it is, ask for it and stop. Otherwise list assumptions in one line each and keep every established person and event.
2. Founding: how the dynasty took power, the founder's story as officially told, and what really happened.
3. Succession rules: the formal rule, the customs around it (who may not inherit, regencies, the role of a council or church), and where the rule is ambiguous.
4. Family tree: {{generations}} generations as an indented text tree with names, birth and death years in a consistent dating system, spouses and children, and cause of death where it matters. Include realistic child deaths, remarriages and illegitimate children.
5. Reigns: a table of each ruler with years, epithet, one achievement, one failure and how the reign ended.
6. Marriages and alliances: the key marriages, what each was meant to secure, and the foreign or noble families now tied in.
7. Scandals and secrets: three to five things the family hides (a swapped child, a poisoning, a secret marriage, a disputed legitimacy), who knows and what proof exists.
8. Claimants today: everyone with a plausible claim in the story's present, the argument for each, who backs them, and what each would do to win{{#story_need}}, shaped for: {{story_need}}{{/story_need}}.
9. On the page: six to eight details (portraits hung or removed, a naming tradition, a family saying, a royal tomb, a habit passed down).
10. Check before output: dates are consistent (no one has children before about 15 or after natural limits, generations span plausible gaps); every claimant follows from the tree; the succession rule creates at least one real dispute.
</task>

<constraints>
- Keep names consistent with the culture and distinct enough to tell apart; use regnal numbers when names repeat.
- Do not base the family on a real living or recent royal family.
- State that dates are invented and keep one calendar throughout.
- Mark anything that is only rumour in the world as rumour.
</constraints>

<output_format>
## Assumptions
## Founding
## Succession rules
## Family tree
Indented text tree.
## Reigns
Table: Ruler | Reign | Epithet | Achievement | Failure | End.
## Marriages and alliances
## Scandals and secrets
## Claimants today
Table: Claimant | Claim | Backers | Next move.
## On the page
</output_format>
