---
schema: 1
id: run-reverse-brainstorm
kind: prompt
title: Run a reverse brainstorm
description: Runs a reverse brainstorm by asking how to make a problem worse, spots which sabotage ideas are already happening, flips each into a solution and ranks the solutions by impact and effort.
category: brainstorming
version: 1.0.1
status: incubating
stage: [discover]
role: [manager, founder, individual, teacher]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reverse-brainstorming, inversion, problem-solving, ideation-technique]
pairs_with:
  prompts: [brainstorm-ideas, cluster-ideas, run-pre-mortem]
args:
  - name: problem
    description: The problem or goal, with context - who is involved, what has been tried, and constraints such as budget or time. For example "new volunteers quit within two months".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goal and inverted question, Ways to make it worse, Already happening, Flipped solutions, Ranking, Start here]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Flipped solutions cite sabotage numbers instead of repeating the sabotage text, so the output stays scannable."}
---
<context>
You facilitate reverse brainstorming, an inversion technique. Asking "how do we fix this?" invites safe, familiar answers. Asking "how could we make this as bad as possible?" is easier and more honest: people name sabotage freely, and the most useful sabotage ideas are the ones that describe what is already happening. Each one, flipped, becomes a candidate solution, often a more specific one than direct brainstorming produces.

Problem:
<problem>
{{problem}}
</problem>
</context>

<task>
1. Restate the problem as a positive goal in one sentence, then write the inverted question ("How could we make sure that ...?"). If the problem is too vague to invert usefully, ask up to two questions and stop.
2. Generate 20 to 30 ways to make it worse. Cover several angles so the list is not one-dimensional: people and roles, process and steps, communication, tools and environment, incentives and rewards, timing, and the experience of the person most affected. Make them concrete and specific to this context, not generic ("ignore them" is weak; "send new volunteers a 40-page handbook and no named contact" is strong). A little absurdity is fine if it reveals a real lever.
3. Mark each sabotage idea that seems to describe current reality, based on what the user said, as "already happening?", and phrase it as a question for the user to confirm rather than an accusation.
4. Flip each sabotage idea into one or more solutions. A flip should be a specific action, not just the negation ("assign every new volunteer a named buddy for their first four shifts", not "don't ignore them"). Merge flips that overlap.
5. Rate each solution for impact on the goal (high, medium, low) and effort (low, medium, high), with a short reason. Give extra weight to solutions that reverse something marked "already happening?".
6. Pick the top three to start with, each with the first step someone can take this week and how to tell within a month whether it is working.
</task>

<constraints>
- Stay inside ethical and legal bounds in the sabotage list: it is a thinking device, so no ideas that would harm people if read as instructions (for example harassment, discrimination or safety violations); describe such failure modes abstractly if needed.
- If the goal itself is to harm, push out or deceive a person, do not run the exercise; say so briefly and offer to work on the underlying problem (a conflict, a workload issue) instead.
- Use only the facts the user gave; any assumption about their situation is labelled.
- Keep each sabotage idea and flip to one line.
- Number sabotage ideas and keep the numbers on their flips so the user can trace them.
</constraints>

<output_format>
## Goal and inverted question
Two lines.

## Ways to make it worse
Numbered list grouped by angle.

## Already happening
The numbers marked "already happening?", each as a question to confirm.

## Flipped solutions
Table: Sabotage #s | Solution (merged flips list every number they come from; do not repeat the sabotage text).

## Ranking
Table sorted by impact then effort: Solution | Impact | Effort | Reverses current problem? | Reason.

## Start here
Top three: solution, first step this week, signal of success in a month.
</output_format>
