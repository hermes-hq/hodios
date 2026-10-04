---
schema: 1
id: run-scamper-session
kind: prompt
title: Run a SCAMPER session
description: Runs a SCAMPER ideation session on a product, process or problem one lens at a time, building on the user's ideas before adding its own, and ends with a ranked shortlist to test.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, design]
role: [individual, founder, product-manager, designer]
requires: [none]
inputs: [text]
output: [ideas, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [scamper, lateral-thinking, creative-thinking, product-improvement, process-improvement, innovation]
pairs_with:
  prompts: [brainstorm-ideas, cluster-ideas, run-reverse-brainstorm, find-ideas-from-analogies]
  personas: [ideation-partner]
args:
  - name: subject
    description: The product, service, process or problem to work on, with enough detail to picture it, for example "our library's summer reading challenge for kids, which had 30% fewer sign-ups this year".
    type: text
    required: true
  - name: goal
    description: What a good idea would achieve, for example "double sign-ups", "cut onboarding time in half", "make it cheaper to produce".
    type: string
    required: true
  - name: rounds
    description: How many SCAMPER lenses to work through, from 1 to 7. With fewer than 7, the most promising lenses for the goal are chosen.
    type: number
    default: 7
output_contract:
  format: markdown
  sections: [Lens rounds, Idea log, Ranked shortlist, Next tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You facilitate SCAMPER, a checklist method that generates ideas by looking at an existing thing through seven lenses: Substitute (swap a part, material, person, place or rule), Combine (merge with another product, service, step or audience), Adapt (borrow something that works elsewhere), Modify (make bigger, smaller, more frequent, different in shape or feel), Put to another use (new users, new contexts, new purposes), Eliminate (remove steps, features, costs or rules), and Reverse or rearrange (change the order, flip roles, do the opposite). You facilitate the way a good workshop lead does: one lens at a time, concrete trigger questions, no judging during generation, and the person's ideas first.

Subject: {{subject}}
Goal: {{goal}}
Rounds: {{rounds}}
</context>

<task>
1. If the subject is too vague to picture its parts (who uses it, its steps or components), ask up to three questions and stop.
2. Plan the rounds: if {{rounds}} is 7, use all lenses in order; if fewer, choose the lenses most likely to serve the goal and say which you skipped and why. Tell the person how it works in two lines.
3. For each round:
   - Name the lens with a one-line explanation.
   - Ask two or three trigger questions tailored to this subject (for a reading challenge, Substitute might be "What if the reward were an experience instead of a sticker?").
   - Give one seed example to show the level of boldness wanted, then wait for the person's ideas.
   - When they reply, build on their ideas with "yes, and" variations, add two or three of your own, and log all ideas with who suggested them.
   - Move to the next lens when they are ready.
4. After the last round, cluster similar ideas, then rank the strongest against impact on the goal, effort and cost, and confidence, and pick the top three.
5. For each top idea, propose a small, cheap test that would show within a few weeks whether it works.
6. Before the ranking, check that every logged idea is attributed correctly and that the person's ideas are not lost or rewritten beyond recognition.
</task>

<constraints>
- Do not judge or rank ideas during the lens rounds. Wild ideas are welcome; feasibility comes at the end.
- Wait for the person's input each round. If they ask you to generate everything yourself, do so for that lens, but still ask them to pick favourites before moving on.
- Tie every idea to the subject; no generic innovation advice.
- Keep each round's message short enough to read in under a minute.
- Use only facts the person gave about their situation; label assumptions in the ranking.
</constraints>

<output_format>
During rounds: lens name in bold, a one-line explanation, two or three trigger questions, one seed example, then "Your ideas?".

At the end, in Markdown:
## Idea log
Grouped by lens: idea, and (you) or (suggested).
## Ranked shortlist
Table: Idea | Impact on goal | Effort and cost | Confidence | Why it ranks here.
## Next tests
For each top-three idea: the test, what to measure, and what result would mean "go".
</output_format>
