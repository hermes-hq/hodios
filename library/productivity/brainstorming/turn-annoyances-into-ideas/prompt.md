---
schema: 1
id: turn-annoyances-into-ideas
kind: prompt
title: Turn annoyances into ideas
description: Builds a bug list of everyday annoyances in a place, routine or job, digs into why each one happens, and turns the most common and fixable ones into ideas you could make, change or offer.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, founder, student, operations-manager]
requires: [none]
inputs: [topic, notes, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bug-list, pain-points, problem-finding, everyday-friction, opportunity-spotting]
pairs_with:
  prompts: [validate-business-idea, write-how-might-we-questions, generate-business-ideas]
args:
  - name: area
    description: The place, routine or job to look at, for example "my morning commute", "running a kids' football club", "our office kitchen".
    type: text
    required: true
  - name: annoyances
    description: Optional - annoyances you have already noticed, as a rough list. The more specific the better.
    type: text
  - name: goal
    description: Optional - what you want from the ideas - fix it for yourself, improve it at work, or find something to build or sell.
    type: text
output_contract:
  format: markdown
  sections: [Bug list, Why they happen, Ideas, Best bets, Keep the list going]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bug list is a long, honest list of things that annoy you, a technique taught in creativity courses because annoyances are problems people have stopped seeing. Most people stop at the complaint. The ideas come from asking why the annoyance happens (who designed it that way, what constraint forced it, who would have to change), because the cause shows where an intervention could work and who would care. Annoyances that many people share, that happen often, and that someone already pays to work around are the strongest leads for anything you might build or sell; ones you can fix alone are the quickest wins.

<area>
{{area}}
</area>
{{#annoyances}}
Annoyances already noticed:
<annoyances>
{{annoyances}}
</annoyances>
{{/annoyances}}
{{#goal}}
Goal: {{goal}}
{{/goal}}
</context>

<task>
1. If the area is too broad or vague (such as "life"), ask the user to narrow it to one place, routine or role and stop.
2. Build a bug list of 20 to 30 specific annoyances{{#annoyances}}, starting with the user's own and keeping their wording{{/annoyances}}. Prompt across the senses and stages: before, during and after; waiting, searching, repeating, remembering, carrying, paying, coordinating with others. Mark the ones you added as "possible, check if this bugs you".
3. Pick the ten most promising and, for each, give the likely cause (design, rules, incentives, habit, cost) and who else is likely affected.
4. For each of the ten, write one or two ideas: a fix you can make yourself, a change to ask someone for, or something that could be made or offered to others.
5. Rate the ideas on how often the annoyance happens, how many people share it, whether people already pay or work around it, and effort to try. Choose three best bets{{#goal}} suited to the goal{{/goal}}, each with a first step this week.
6. Suggest a light way to keep the bug list going for two weeks to find more.
</task>

<constraints>
- Do not invent statistics about how common an annoyance is; describe it as likely or check with others.
- Label annoyances you suggested as guesses; the user's own experience is the source of truth.
- If an idea would mean selling something, note checks on safety or local rules where relevant, without stating specific rules.
- One line per annoyance.
</constraints>

<output_format>
## Bug list
Numbered list; your additions marked.

## Why they happen
Table: # | Annoyance | Likely cause | Who else it affects.

## Ideas
Table: # | Idea | Type (fix myself, ask for change, make or offer).

## Best bets
Three ideas, each with rating summary and a first step.

## Keep the list going
Two or three bullets.
</output_format>
