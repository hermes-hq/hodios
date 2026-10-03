---
schema: 1
id: create-puppet-show
kind: prompt
title: Create a puppet show for kids to perform
description: Creates a puppet show for children to perform, with a short script sized to the number of performers, sock or paper-bag puppet instructions, a simple stage and a rehearsal plan.
category: kids-activities
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher]
requires: [none]
inputs: [preferences, topic]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [puppet-show, kids-theatre, sock-puppets, pretend-play, kids-performing, script-for-kids]
pairs_with:
  prompts: [create-kids-craft, write-jokes-for-kids, plan-rainy-day-activities]
args:
  - name: ages
    description: The performers' ages, for example "5 and 8" or "class of 7-year-olds". Decides line length and whether children read or learn lines by repeating.
    type: string
    required: true
  - name: performers
    description: How many children will perform. Every child gets a part of similar size.
    type: number
    default: 2
  - name: theme
    description: What the show is about, for example "a dragon who is scared of the dark", "the three little pigs but the wolf is friendly", "a day at the zoo", or a value such as sharing.
    type: string
    required: true
  - name: minutes
    description: Running time of the show in minutes.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [The show at a glance, Cast, Script, Make the puppets, Build the stage, Rehearsal plan, Showtime]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You create puppet shows that children make and perform themselves, at home or in a classroom. Puppets help shy children speak, practise storytelling and turn-taking, and give a rainy afternoon a goal: a show for the family. Shows work for children when lines are short and repeated, every performer has an equal moment to shine, there is a part for the audience to join in, and the puppets and stage can be made in under an hour from things at home.

Performers: {{performers}}, aged {{ages}}
Theme: {{theme}}
Running time: {{minutes}} minutes
</context>

<task>
1. If the ages or theme are missing, ask and stop.
2. The show at a glance: a title, a three-sentence story with a beginning, a problem and a happy ending, and the audience participation moment (shouting a warning, counting, a sound effect).
3. Cast: one character per performer, each with a clear trait and a catchphrase, and a narrator role shared or given to a grown-up for children under six. If there are more characters than performers, show which child plays two puppets and where they swap.
4. Script: a script sized to {{minutes}} minutes (about 100 spoken words per minute, allowing time for actions and audience moments), with character names in capitals, stage directions in brackets, lines of at most about ten words for under-sevens, repeated phrases young children can learn by ear, and roughly equal lines for each performer. Mark the participation moment.
5. Make the puppets: for each character, a sock, paper-bag or wooden-spoon puppet design from household items, with numbered steps split into child jobs and grown-up jobs, and a time estimate.
6. Build the stage: two options - a table turned on its side or a sheet over a broom handle between two chairs, and a cardboard-box theatre - with steps and decoration ideas.
7. Rehearsal plan: two or three short rehearsals (read-through or repeat-after-me, puppet movement practice, full run with sound effects), tips for puppet craft (mouth moves on every word, puppet looks at the audience, keep it above the stage line) and how to help a child who freezes.
8. Showtime: tickets or invitations the children can draw, a programme, an announcer's opening line, bows and a simple snack interval for longer shows.
9. Before answering, check that every performer has a similar number of lines, the script fits the running time, and every material listed is a common household item.
</task>

<constraints>
- Kind, age-appropriate story: any baddie is silly rather than scary and is reformed or outwitted, not hurt.
- Safety for making: grown-ups handle sharp scissors, hot glue and craft knives; for under-threes in the audience or helping, avoid small parts such as buttons and googly eyes that can be choking hazards.
- No buying required; suggest substitutes for anything not found at home.
- Encourage children to improvise and change lines; the script is a starting point.
</constraints>

<output_format>
## The show at a glance
## Cast
## Script
## Make the puppets
## Build the stage
## Rehearsal plan
## Showtime
</output_format>
