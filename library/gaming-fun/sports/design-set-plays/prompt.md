---
schema: 1
id: design-set-plays
kind: prompt
title: Design set plays for an amateur team
description: Designs two to four set plays for an amateur or youth team - corners, free kicks, inbounds, line-outs or serve receive - with roles, a call, a diagram in text and an option when it is defended.
category: sports
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [set-pieces, set-plays, tactics, restarts, amateur-coach, playbook]
pairs_with:
  prompts: [scout-opponent, plan-youth-sports-practice, choose-team-formation]
args:
  - name: sport
    description: The sport, format and level, for example "U12 7-a-side football", "adult rec basketball", "club rugby union, 3rd XV", "masters field hockey".
    type: string
    required: true
  - name: situations
    description: The restarts you want plays for, such as "attacking corners and sideline inbounds", plus how often they happen in a typical game if you know.
    type: text
    required: true
  - name: players
    description: What your players can do - who is tall, who strikes or passes well, who is quick, who is left-footed or left-handed. Use roles or shirt numbers rather than full names.
    type: text
    required: true
  - name: practice_time
    description: How much practice time you can spend on set plays per week. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Which restarts are worth a play, Plays, How to teach them, If it is defended, Check against the rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design set plays for amateur and youth coaches. At this level, restarts decide a large share of tight games, yet most teams waste them because nobody knows where to stand. What works is a small number of simple plays, each built on one or two of the team's real strengths, called with one word or signal, practised until every player knows their spot, and each with a built-in second option for when the opponent defends the first one. Complex plays with five moving parts fall apart under pressure at this level; plays that depend on a player the team does not have fail before kick-off.

Sport: {{sport}}

Restarts wanted:
{{situations}}

Our players:
{{players}}
{{#practice_time}}

Practice time available: {{practice_time}}
{{/practice_time}}
</context>

<task>
1. Decide which of the requested restarts are worth a designed play given how often they occur and the team's strengths, and say which ones should just use a simple default setup.
2. Design two to four plays. For each: a short name or call, the setup with every player's starting spot, the movement in order with timing cues ("when the ball is lifted", "on the second slap"), the primary target, and the role of every player not directly involved (rebound, cover, safety against a counter).
3. Draw each play as a simple text diagram (a grid or labelled positions) a coach can copy onto a whiteboard.
4. Build each play around a strength named in the players list and say which strength it relies on.
5. Give an option for when the play is read: what the key player looks for and where the ball goes instead.
6. Plan how to teach them: walk-through, then unopposed, then opposed, with the practice time needed and a check that each player can say their own job.
7. List the rules that limit each play for this sport and level (for example offside at free kicks, three-second rules, lifting in the line-out, screens that become fouls, youth restrictions) and ask the coach to confirm them against their league's rules.
</task>

<constraints>
- Keep each play to at most three moving parts and one call word or signal.
- Use only legal actions; never design a play around a foul, an illegal screen, blocking the keeper or obstructing an opponent.
- Do not invent players or abilities that are not in the players list; if the squad lacks a strength a play needs, say so and pick another play.
- For young children, favour simple shapes that teach spacing and movement over trick plays.
- Rules vary by league and age group; state rule assumptions and do not present them as certain.
</constraints>

<output_format>
## Which restarts are worth a play
## Plays
For each: name and call, setup, movement in order, text diagram, strength it uses.
## How to teach them
## If it is defended
## Check against the rules
</output_format>
