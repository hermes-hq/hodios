---
schema: 1
id: brainstorm-ways-to-celebrate
kind: prompt
title: Brainstorm ways to celebrate a win
description: Suggests ways to mark a win - a finished project, a passed exam, a team milestone, a personal first - matched to the people involved, how they like to be recognised, the budget and the time.
category: brainstorming
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, individual, parent, teacher]
requires: [none]
inputs: [topic, preferences, text]
output: [ideas, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [recognition, milestones, team-morale, appreciation, marking-achievements]
pairs_with:
  prompts: [write-thank-you-note, plan-surprise-party, run-personal-retrospective]
args:
  - name: win
    description: What was achieved, by whom, and why it matters. For example "my team shipped a migration after 8 hard months" or "my son passed his driving test on the third try".
    type: text
    required: true
  - name: details
    description: Optional - who is celebrating or being celebrated, how they like to be recognised (public, private, quiet), budget, time available, and anything to avoid such as alcohol or surprises.
    type: text
output_contract:
  format: markdown
  sections: [What is worth marking, Ideas, Best three, Words to say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Recognition lands when it is specific (what exactly was done and what it made possible), timely, and in a form the person actually enjoys. A public shout-out delights some people and mortifies others; a team lunch excludes someone who cannot eat out or has caring duties at that time; alcohol-centred events exclude people. The default celebration (pizza, cake, a drinks evening) is often forgotten by the next week. Memorable ones connect to the win itself, involve the people who made it possible, and include a moment of reflection on what it took. Marking effort and progress, not only outcomes, matters after a hard stretch.

<win>
{{win}}
</win>
{{#details}}
Details:
<details>
{{details}}
</details>
{{/details}}
</context>

<task>
1. Name what is worth marking: the outcome, the effort or obstacle overcome, and the people who contributed. If it is unclear who is celebrating whom, ask one question and stop.
2. Generate 15 ideas across kinds: words (spoken or written recognition), a shared experience, a small token or gift, a ritual or tradition, time back or rest, something that connects to the win itself, and a moment of reflection. Include options at zero cost{{#details}}, and fit the stated budget, time and preferences{{/details}}.
3. Note who each idea suits (quiet or public, team or individual) and anything it could exclude.
4. Choose the three best fits and explain why, with what to prepare.
5. Write words to say or write: a short specific message that names what was done and what it made possible.
</task>

<constraints>
- Respect stated preferences and things to avoid; if none were given, offer both public and private options and include alcohol-free options.
- Do not invent details about the people or the achievement; use placeholders like [name] where needed.
- Keep ideas inclusive of people with different budgets, dietary needs, caring duties and abilities.
- For a workplace, avoid gifts or events that could look like favouritism or breach a gifts policy; say to check it if unsure.
</constraints>

<output_format>
## What is worth marking
Three short bullets: outcome, effort, people.

## Ideas
Table: Idea | Kind | Cost (none, low, more) | Suits | Watch out.

## Best three
Numbered with reasons and preparation.

## Words to say
A short message in a quote block.
</output_format>
