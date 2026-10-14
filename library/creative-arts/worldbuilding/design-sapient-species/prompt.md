---
schema: 1
id: design-sapient-species
kind: prompt
title: Design a sapient species
description: Designs a thinking non-human species from its biology and evolutionary history to how it perceives, communicates, raises young and organises, so its minds and societies feel genuinely non-human.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [aliens, fantasy-races, speculative-biology, first-contact, setting-design]
pairs_with:
  prompts: [design-alien-planet, design-fictional-creature, design-fictional-culture, create-fictional-language]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: Where the species lives and in what kind of story - planet or world conditions, genre, tone, whether humans exist alongside it, and anything already fixed about its look or role.
    type: text
    required: true
  - name: story_role
    description: Optional. What the species must do in the story, for example "allies humans keep misunderstanding", "the playable race in a strategy game", "colonisers seen from the colonised side".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Origins, Body and senses, Mind, Communication, Life cycle and kinship, Society, Meeting others, Story role, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder who designs sapient species for science fiction and fantasy. Convincing non-human minds come from their bodies and history: the senses a species relies on shape its metaphors and art; whether it evolved as predator, prey or forager shapes its attitude to risk and strangers; how many young it has and who raises them shapes its ethics and its politics; lifespan changes what patience and death mean. The common failures are "humans with forehead ridges" (one human trait exaggerated into a whole culture), monocultures where every member thinks alike, and species that exist only to stand in for a real human group.

<setting>
{{setting}}
</setting>
{{#story_role}}Story role: {{story_role}}{{/story_role}}
</context>

<task>
1. If the setting gives no environment or genre, ask for them and stop. Otherwise list assumptions in one line each and keep every established fact.
2. Origins: the environment the species evolved in, its ancestral niche (predator, prey, forager, parasite, symbiont, something else), and the pressure that made intelligence pay off.
3. Body and senses: body plan, size, lifespan, primary and secondary senses, and what they cannot perceive that humans can (and the reverse).
4. Mind: three to five ways their thinking differs from human thinking that follow from steps 2 and 3 (sense of time, individuality, fear, curiosity, honesty, abstraction), each with a concrete example of behaviour.
5. Communication: channels used (sound, colour, scent, touch, gesture, fields), what is easy and hard to say, and what gets lost in translation with humans or other peoples.
6. Life cycle and kinship: reproduction, how many offspring, who raises them, how adulthood is reached, and what that does to family, love and grief.
7. Society: two or three distinct cultures or factions within the species with genuine disagreements, so it is not a monoculture.
8. Meeting others: what they find strange, disgusting, admirable or threatening about humans or neighbouring peoples, and where misunderstanding is most dangerous.
9. Story role: how the species serves the story{{#story_role}} ("{{story_role}}"){{/story_role}}; if no role was given, offer three options the setting suggests. Then give five scene or conflict ideas.
10. On the page: eight to ten concrete details a reader or player notices (posture, a greeting, food, how they react to a lie, what their buildings feel like inside).
11. Check before output: each mental and social trait traces back to biology or history; members disagree with each other; no trait maps onto a real human ethnicity, culture or faith as a caricature.
</task>

<constraints>
- Do not build the species as a disguised stereotype of a real human group, including the noble savage, the conformist hive-mind coded as a real ethnic group, or the warrior-tribe trope; if a trope is requested, subvert it and say how.
- Keep biology consistent with the setting's realism level; flag hand-waves.
- Do not copy species from existing franchises.
- Prefer a few deep differences to a long list of quirks.
</constraints>

<output_format>
## Assumptions
## Origins
## Body and senses
## Mind
## Communication
## Life cycle and kinship
## Society
## Meeting others
## Story role
## On the page
</output_format>
