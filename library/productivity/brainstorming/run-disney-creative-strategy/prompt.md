---
schema: 1
id: run-disney-creative-strategy
kind: prompt
title: Run the Disney creative strategy
description: Takes an idea through Dreamer, Realist and Critic rounds kept strictly apart, then loops the Critic's concerns back to the Dreamer and Realist until a workable version emerges.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, individual, manager, product-manager]
requires: [none]
inputs: [topic, text]
output: [ideas, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [disney-strategy, dreamer-realist-critic, perspective-shifting, idea-development]
pairs_with:
  prompts: [run-six-thinking-hats, run-pre-mortem, develop-idea-with-ppco]
args:
  - name: idea
    description: The idea, project or goal to develop, with what you know so far - who it is for, resources, deadline, what worries you.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Dreamer, Realist, Critic, Second pass, Workable version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Disney creative strategy, modelled by Robert Dilts on how Walt Disney was said to move between roles, separates three kinds of thinking that usually collide: the Dreamer imagines without limits, the Realist works out how it could actually be done, and the Critic looks for what could fail. Mixed together, the Critic kills ideas before they are formed and the Dreamer ignores real risks. Kept apart and run in order, then looped, they produce ideas that are both ambitious and buildable. The Critic criticises the plan, never the dreamer, and every criticism is phrased so it can be answered. The difference from six thinking hats: this is a development loop for one idea, not a balanced survey of a decision.

<idea>
{{idea}}
</idea>
</context>

<task>
1. If the idea is too thin to develop (no sense of who it is for or what it does), ask up to two questions and stop.
2. **Dreamer**: describe the idea at its most ambitious and attractive. What would it look, feel and sound like if it worked perfectly? Who benefits and how? Write 8 to 12 bold possibilities, with no feasibility filter.
3. **Realist**: take the Dreamer's material as given and work out how it could be done. Steps, people, time, resources, a first version, how progress is measured. Choose which dream elements make the first version and which wait.
4. **Critic**: review the Realist's plan, not the dream. List what could go wrong, what is missing, who would object and why, and what is assumed without evidence. Phrase each as a question the plan must answer ("What happens if fewer than ten people sign up?").
5. **Second pass**: for each Critic question, return to the Dreamer for a fresh angle where useful, then to the Realist for a concrete answer. Mark any question that has no good answer yet as an open risk.
6. Write the workable version: the idea as it now stands, the first version to try, the open risks and how to test the biggest one cheaply.
</task>

<constraints>
- Keep the three roles strictly separate in their sections: no criticism in Dreamer, no dreaming in Critic.
- The Critic targets the plan and its assumptions, never the person.
- Do not invent costs, laws, market sizes or other facts; mark estimates as estimates and say what to check.
- Use the user's constraints; label assumptions.
</constraints>

<output_format>
## Dreamer
Short vivid paragraph, then a numbered list of possibilities.

## Realist
Numbered steps and a table: Element | In first version? | What it needs.

## Critic
Numbered list of questions.

## Second pass
Table: Critic question | Dreamer angle | Realist answer | Status (answered, open risk).

## Workable version
The idea in three to five sentences, the first version, open risks and the cheapest test of the biggest one.
</output_format>
