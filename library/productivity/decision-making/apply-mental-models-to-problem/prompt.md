---
schema: 1
id: apply-mental-models-to-problem
kind: prompt
title: Apply mental models to a problem
description: Picks the three or four mental models that genuinely fit a situation - opportunity cost, inversion, incentives, margin of safety and others - applies each to it and shows what they change.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, manager, consultant]
requires: [none]
inputs: [text, notes]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mental-models, inversion, opportunity-cost, margin-of-safety, frameworks]
pairs_with:
  prompts: [run-second-order-thinking, reason-from-first-principles, map-incentives-in-situation]
args:
  - name: problem
    description: The problem or decision, with the facts you have and what you are leaning towards.
    type: text
    required: true
  - name: goal
    description: Optional - what a good outcome looks like for you.
    type: text
output_contract:
  format: markdown
  sections: [The problem, Models that fit, Applying each model, Where they agree and disagree, What changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You apply mental models with discipline. Lists of "100 mental models" are popular but useless when every model is applied to everything; the skill is choosing the few that expose something about this specific problem and showing concretely what each reveals. Useful general models include: opportunity cost (what else the same money, time or attention could do), inversion (what would guarantee failure, then avoid it), incentives (what each party is rewarded for), margin of safety (how much could go wrong before the plan breaks), second-order effects (and then what?), reversibility (one-way versus two-way doors), base rates (what usually happens in cases like this), circle of competence (where the person's knowledge ends), regression to the mean (extreme results tend to be followed by ordinary ones), sunk cost (past spending is irrelevant to the next choice), Hanlon's razor (do not assume malice where error explains it), and diminishing returns. A model fits when it points to a fact or question the person has not considered; it does not fit if it only restates what they already know in new vocabulary.

Problem:
<problem>
{{problem}}
</problem>
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Restate the problem in two or three lines, including the current lean.
2. Choose three or four models that fit, and for each say in one line why it fits this problem. Name one or two popular models you considered and rejected, and why they add nothing here.
3. Apply each chosen model concretely to the facts: what it reveals, the question it raises, and a rough number where the model allows one (for example the opportunity cost in money or hours, the margin of safety in months of savings).
4. Show where the models agree and where they pull in different directions.
5. Say what changes: whether the lean still holds, what to check or do differently, and the one question to answer next.
</task>

<constraints>
- Use plain language; explain each model in one sentence the first time it appears.
- Do not stack models for show. Three well-applied models beat ten name-checked ones.
- Do not invent facts about the situation; where a model needs a figure the user has not given, ask or state an assumption.
- If the problem is mainly medical, legal or financial, say the models help structure thinking but do not replace a qualified professional.
</constraints>

<output_format>
## The problem
Two or three lines.

## Models that fit
Bullets: model, one-sentence definition, why it fits. Then the rejected models in one line each.

## Applying each model
A short subsection per model: what it reveals, the question it raises, any rough number.

## Where they agree and disagree
Short paragraph.

## What changes
The updated view, what to check, and the next question.
</output_format>
