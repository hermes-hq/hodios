---
schema: 1
id: map-opportunity-solution-tree
kind: prompt
title: Map an opportunity solution tree
description: Builds an opportunity solution tree from a desired outcome and research, choosing a target opportunity and pairing each candidate solution with its riskiest assumptions and a quick test.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, ux-researcher, founder, designer]
requires: [none]
inputs: [text, notes, transcript]
output: [diagram, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [opportunity-solution-tree, continuous-discovery, assumption-testing, outcomes]
pairs_with:
  prompts: [synthesize-customer-interviews, define-jobs-to-be-done, define-mvp-scope]
args:
  - name: outcome
    description: The measurable outcome the team owns (for example "increase the share of new teams that invite a second member within 7 days from 22% to 30%").
    type: text
    required: true
  - name: research
    description: Interview synthesis, notes, support themes, analytics findings or other evidence about customers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Outcome check, Tree, Opportunities, Target opportunity, Solutions and assumption tests, Evidence gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product discovery coach who uses opportunity solution trees to connect a team's outcome to what customers need and to the work the team will do. The tree has four layers: the desired outcome at the root; opportunities (customer needs, pains and desires, phrased from the customer's point of view and grounded in research) beneath it, broken into smaller sub-opportunities; candidate solutions under a chosen opportunity; and assumption tests under each solution. Teams go wrong when the "outcome" is really a feature, when opportunities are solutions in disguise ("need a dashboard"), when they consider one solution at a time, and when they build before testing the riskiest assumption.
</context>

<task>
Desired outcome:

<outcome>
{{outcome}}
</outcome>

Research:

<research>
{{research}}
</research>

1. Check the outcome. It should be a measurable change in customer or business behaviour that the team can influence, not an output ("ship X"). If it is an output, propose an outcome version and use it, saying so. If it has no metric or target, note what is missing.
2. Extract opportunities from the research only. Phrase each as the customer would ("I don't know which teammate has already replied"), cite its evidence, and group them into a hierarchy: broad opportunities with specific sub-opportunities under them. Flag any opportunity that is really a solution and rewrite it as the need behind it.
3. Compare the opportunities on: how many customers it affects and how often, how much it hurts, how directly it moves the outcome, strength of evidence, and fit with the company's strategy. Pick one target opportunity, preferably a specific sub-opportunity, and explain the choice.
4. Generate at least three distinct solutions for the target opportunity, from different angles (for example product change, process or content, pricing or packaging, removal of a step).
5. For each solution, list its key assumptions across desirability, usability, feasibility, viability and ethics, name the riskiest one or two, and design a fast test for each (what you will do, with whom, how many, and the result that would count as pass or fail, decided in advance).
6. List the evidence gaps: opportunities with thin evidence and what research would fill them.
</task>

<constraints>
- Every opportunity cites its evidence from the research (participant, source or data point). Do not invent opportunities that the research does not support; if you suggest one from general knowledge, mark it "hypothesis - not in research".
- Opportunities never name a feature. Solutions always sit under an opportunity.
- Assumption tests should take days, not months: prototypes, one-question surveys, fake doors with honest follow-up, data pulls, concierge tests. No test that misleads users about what exists without a clear follow-up.
- Keep the tree readable: at most six top-level opportunities.
</constraints>

<output_format>
## Outcome check
The outcome as given, any rewrite and why, and the metric.

## Tree
An indented text tree: outcome, then opportunities and sub-opportunities, then solutions under the target, then tests. Mark the target with [TARGET].

## Opportunities
Table: opportunity | sub-opportunities | evidence | reach and frequency | severity | link to outcome | evidence strength.

## Target opportunity
The choice and the reasoning in three to five sentences.

## Solutions and assumption tests
For each solution: a one-line description; then a table of assumption | type | risk (high, medium, low) | test | pass criterion.

## Evidence gaps
Bullets.
</output_format>
