---
schema: 1
id: build-personal-board-of-advisors
kind: prompt
title: Build a personal board of advisors
description: Maps the people who support someone's life and work into roles such as mentor, challenger and cheerleader, finds the gaps and plans how to invite and keep those relationships.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, student]
requires: [none]
inputs: [text, preferences]
output: [table, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [personal-board, support-network, mentors, sponsors, networking]
pairs_with:
  prompts: [find-mentor, build-connection-plan, discover-my-strengths]
args:
  - name: current_network
    description: The people you turn to now and how each helps, for example "my old boss (career advice twice a year), sister (listens, always on my side), uni friend (fellow founder, we vent)". Use first names or roles only.
    type: text
    required: true
  - name: goals
    description: What you are working toward over the next year or two, for example "move from engineer to engineering manager" or "launch my design studio and stay sane".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your board today, Gaps and overloads, Who to add, How to ask, Keeping it alive]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people build a "personal board of advisors": a small, deliberate set of relationships that together give the support, challenge and access they need for their goals. You know no single mentor can play every role, and that useful roles include: mentor (has done what you are trying to do), sponsor (has influence and speaks up for you when you are not in the room), challenger (tells you hard truths), cheerleader (believes in you on bad days), connector (introduces you to people), peer (in the same boat now), expert (deep knowledge in one area you need), and an anchor outside the goal who keeps your life in proportion. Distant mentors, such as authors and public figures whose work you study, can fill some roles. You know these relationships work best as specific, reciprocal asks rather than a formal "will you be my mentor?".

Current network:
<current_network>
{{current_network}}
</current_network>
Goals:
<goals>
{{goals}}
</goals>
</context>

<task>
1. Your board today: map each person they named to the roles they play, how often they are in touch, which goal they serve, and how strong the tie feels (from what they wrote).
2. Gaps and overloads: name the roles their goals need that nobody fills, and any person carrying too many roles (a single point of failure, or a relationship under strain). Say which two gaps matter most for these goals and why.
3. Who to add: for each priority gap, describe the kind of person to look for, where such people are found (inside their organisation, professional communities, alumni networks, meetups, online groups, former colleagues), and whether a distant mentor could cover it for now. Also suggest one existing person who could take on a role if asked.
4. How to ask: for each priority gap, a short, specific first message that asks for one small thing (a 20-minute call about a specific question, feedback on one piece of work) and says why them, plus a note on what they can offer back (updates, help, introductions, thanks).
5. Keeping it alive: a simple rhythm (who to contact monthly, quarterly, twice a year), a habit of closing the loop ("I tried your advice, here's what happened"), and a yearly review of the board as goals change.
</task>

<constraints>
- Do not invent details about the people they named; mark guesses as guesses.
- Use only first names or roles as given; do not ask for more personal details than needed.
- Keep asks small and respectful of people's time; never suggest asking a stranger to "be my mentor" in a first message.
- This is not a search for a single mentor; if they only want one mentor, say a focused mentor search is a separate exercise and still map the board briefly.
- Before answering, check that every gap is tied to one of their goals and every message is specific to the gap.
</constraints>

<output_format>
## Your board today
Table: Person | Roles | How often | Goal served | Tie strength.
## Gaps and overloads
## Who to add
Bullets per priority gap.
## How to ask
Messages in quote blocks, labelled by gap.
## Keeping it alive
Table: Who | Rhythm | How.
</output_format>
