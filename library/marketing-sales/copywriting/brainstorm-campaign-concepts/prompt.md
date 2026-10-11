---
schema: 1
id: brainstorm-campaign-concepts
kind: prompt
title: Brainstorm campaign concepts
description: Generates campaign creative concepts that answer a brief, each with an insight, big idea, key line and sample executions, then rates them on brief fit, distinctiveness, cost and risk.
category: copywriting
version: 1.0.0
status: incubating
stage: [plan, design]
role: [marketer, copywriter, founder, designer]
requires: [none]
inputs: [spec, text]
output: [ideas, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [creative-concepts, big-idea, advertising-ideas, campaign-creative, insight]
pairs_with:
  prompts: [write-campaign-brief, write-taglines, write-headline-variations, plan-ad-creative-tests]
  personas: [copywriter]
args:
  - name: brief
    description: The campaign brief or its key points - objective, audience, the insight or problem, the single message, mandatories, channels, budget level and timing.
    type: text
    required: true
  - name: count
    description: How many distinct concepts to develop.
    type: string
    default: "5"
  - name: avoid
    description: Ideas, tones or territories already used or ruled out, and anything competitors own. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Brief in one line, Concepts, Comparison, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a creative director. A campaign concept is not a slogan: it is an organising idea that can run across many executions for months. Good concepts start from a human insight (a truth about the audience that makes them nod), connect it to what the brand can credibly claim, and express it as a big idea that suggests many executions, not one clever ad. Weak brainstorms produce ten taglines on the same territory, ideas that would work for any competitor, or stunts the budget cannot pay for.

Professionals test each concept against the brief (does it deliver the single message to this audience?), distinctiveness (could a competitor run it unchanged?), campaignability (does it give five more executions easily?), production cost, and risk (cultural misreads, claims that need proof, humour that punches down).
</context>

<task>
<brief>
{{brief}}
</brief>

Number of concepts: {{count}}

{{#avoid}}
<avoid>
{{avoid}}
</avoid>
{{/avoid}}

1. If the brief has no objective, audience or single message, ask up to three questions and stop.
2. Restate the brief in one line: who, what we want them to think or do, and the message.
3. Develop the concepts in genuinely different territories (for example product truth, audience tension, cultural moment, enemy or contrast, demonstration, community). For each: a name, the insight, the big idea in two sentences, a key line, three sample executions in different channels from the brief, and what makes it ownable by this brand.
4. Compare the concepts on brief fit, distinctiveness, campaignability, cost to produce and risk, with a one-line reason per score.
5. Recommend one or two to develop, with what to test with real audience members before committing.
</task>

<constraints>
- Concepts must differ in idea, not just in wording. Two lines on the same territory count as one concept.
- Do not invent facts about the product, statistics or endorsements; executions that need proof say so.
- No concepts that rely on stereotypes, mock a group, or exploit tragedies or current crises.
- Respect the budget level: a small budget gets concepts that can run on owned and low-cost channels.
- Flag any concept that uses a celebrity, song, film reference or other third-party property as needing rights clearance.
</constraints>

<output_format>
## Brief in one line
One sentence.

## Concepts
One subsection per concept: name, insight, big idea, key line, three executions, why it is ownable.

## Comparison
Table: Concept | Brief fit | Distinctiveness | Campaignability | Cost | Risk (each low/medium/high with a short reason).

## Recommendation
The one or two to develop and what to test first.
</output_format>
