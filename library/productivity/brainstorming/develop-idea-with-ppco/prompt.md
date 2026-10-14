---
schema: 1
id: develop-idea-with-ppco
kind: prompt
title: Develop an idea with PPCo
description: Strengthens a promising but rough idea with PPCo - pluses, potentials, concerns phrased as "how to" questions, and ways to overcome them - so it is improved rather than killed by early criticism.
category: brainstorming
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, manager, founder, teacher]
requires: [none]
inputs: [topic, text]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [ppco, creative-problem-solving, idea-evaluation, constructive-feedback]
pairs_with:
  prompts: [cluster-ideas, run-disney-creative-strategy, sort-ideas-how-now-wow]
args:
  - name: idea
    description: The idea to develop, as specifically as you can, plus who would have to approve or use it.
    type: text
    required: true
  - name: concerns
    description: Optional - doubts you or others have already raised.
    type: text
output_contract:
  format: markdown
  sections: [The idea, Pluses, Potentials, Concerns as questions, Overcoming concerns, Improved idea]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
PPCo (Pluses, Potentials, Concerns, Overcome concerns) is a tool from the Creative Problem Solving tradition for developing ideas, especially new ones that are easy to kill. Most people evaluate a fresh idea by listing what is wrong with it; the idea dies before it is understood. PPCo reverses the order. Pluses are what is good about it right now. Potentials are what it could lead to if it worked, including spin-offs. Concerns are written as open "How to ...?" or "How might we ...?" questions, which invites solving rather than vetoing. Then each concern gets a few ways to overcome it, and the idea is rewritten to include the best of them. The output is a stronger idea, or a clear view of the concern that genuinely cannot be overcome.

<idea>
{{idea}}
</idea>
{{#concerns}}
Concerns already raised:
<concerns>
{{concerns}}
</concerns>
{{/concerns}}
</context>

<task>
1. Restate the idea in one or two sentences. If it is too vague to evaluate, ask up to two questions and stop.
2. List five to eight pluses: specific strengths today, not general praise.
3. List four to six potentials: what it could lead to if it works, including indirect benefits and future versions.
4. List the concerns{{#concerns}}, including every one already raised{{/concerns}}, each phrased as "How to ...?". Order them from most to least important and keep them about the idea, not the person proposing it.
5. For the top three to five concerns, generate two or three ways to overcome each, then pick the best.
6. Rewrite the idea including the chosen ways to overcome concerns. If a concern cannot be overcome without destroying what makes the idea good, say so plainly; that is a valid result.
</task>

<constraints>
- Pluses and potentials must be specific to this idea; no filler like "it's creative".
- Concerns must be phrased as questions that invite solutions; no flat vetoes.
- Do not invent facts, costs or rules to support or attack the idea; label assumptions and say what to check.
- Keep each item to one or two lines.
</constraints>

<output_format>
## The idea
One or two sentences.

## Pluses
Bulleted list.

## Potentials
Bulleted list.

## Concerns as questions
Numbered list, most important first.

## Overcoming concerns
Table: Concern # | Options | Chosen way.

## Improved idea
Three to six sentences, plus any concern that remains unresolved.
</output_format>
