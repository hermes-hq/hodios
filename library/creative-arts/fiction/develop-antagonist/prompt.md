---
schema: 1
id: develop-antagonist
kind: prompt
title: Develop an antagonist
description: Builds a story's antagonist or opposing force with a goal, a reason that makes sense to them, a plan that moves without the hero, escalating pressure and a final clash that tests the protagonist.
category: fiction
version: 1.0.0
status: incubating
stage: [design]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [villain, opposition, character-motivation, stakes, story-conflict]
pairs_with:
  prompts: [develop-character, outline-story]
args:
  - name: story
    description: Premise, genre, the protagonist's goal and flaw, and where the story is (idea, outline or draft).
    type: text
    required: true
  - name: antagonist
    description: What you have for the antagonist so far, even if it is only a role ("the corrupt mayor"), or the opposing force if it is not a person (nature, a system, the protagonist's own past). Optional.
    type: text
  - name: problem
    description: What feels wrong with the antagonist now (flat, cartoonish, absent for long stretches, too easy to beat, more interesting than the hero). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Function in the story, Antagonist profile, Their plan, Pressure map, The final clash, Scenes to add or change, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor who specialises in conflict. A story is only as strong as its opposition. Antagonists go flat when they are evil for its own sake, when they only act when the hero is on the page, when their power changes to suit the plot, or when they want something unrelated to the protagonist so the final clash proves nothing. Strong antagonists believe they are right, want something concrete that collides with the protagonist's goal, follow a plan that would succeed if no one stopped them, and press on the protagonist's specific flaw. They often mirror the protagonist: a version of who the hero could become. An antagonist does not need to be a villain or even a person; in quieter stories it is a rival, a parent, a system or the protagonist's own fear, but the same rules about goals and pressure apply.

Story: {{story}}
{{#antagonist}}Antagonist so far: {{antagonist}}{{/antagonist}}
{{#problem}}What feels wrong: {{problem}}{{/problem}}
</context>

<task>
1. Define the antagonist's function: what they force the protagonist to face, change or lose, and how they connect to the theme. If the story or the protagonist's goal is too thin to do this, ask for the missing pieces first.
2. Build the profile: concrete goal, why it matters to them, the belief that justifies their actions, their resources and limits, what they will not do, and how they mirror or oppose the protagonist.
3. Write their plan as it would run without the protagonist: steps, timeline and what changes in the world at each step.
4. Map the pressure: where the antagonist's plan and the protagonist's goal collide, how the pressure escalates by act, and how each escalation hits the protagonist's flaw. Show where the antagonist is felt even when off the page.
5. Design the final clash so it can only be won by the protagonist's change, not by luck or a sudden new power, and say what the antagonist loses or learns.
6. List scenes to add or change in the author's outline or draft, with what each must do.
7. Ask up to five questions only the author can answer.
</task>

<constraints>
- Keep the author's story, characters and genre; build from what is given and mark new suggestions as options.
- Keep the antagonist's power consistent; flag any point where the plot needs them to be stronger or weaker than established.
- Avoid stock villain traits and cliches used as shorthand for evil (disability, disfigurement, mental illness, a marginalised identity); give a motive instead.
- Match the genre's register: a cosy mystery or children's book antagonist stays within that tone.
</constraints>

<output_format>
## Function in the story
## Antagonist profile
## Their plan
Numbered steps with what happens if no one intervenes.
## Pressure map
Table: Act or stage | Antagonist move | Effect on protagonist | Flaw it presses.
## The final clash
## Scenes to add or change
## Questions for the author
</output_format>
