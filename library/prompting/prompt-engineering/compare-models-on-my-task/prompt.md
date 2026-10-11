---
schema: 1
id: compare-models-on-my-task
kind: prompt
title: Compare AI assistants on your own task
description: Sets up a blind side-by-side test of two or three assistants on your real prompts, then grades the pasted outputs against your criteria and recommends which to use and when.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, manager, product-manager, ml-engineer]
requires: [none]
inputs: [text, preferences]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [model-comparison, blind-grading, side-by-side-test, ai-tool-choice, evaluation-rubric]
pairs_with:
  prompts: [choose-ai-tool, build-prompt-test-set, choose-model-tier-for-task]
args:
  - name: task
    description: The kind of work you want to compare the assistants on, and what a great result looks like to you.
    type: text
    required: true
  - name: criteria
    description: Optional - what matters most, for example accuracy, following your format, tone, speed, cost, data terms.
    type: text
  - name: outputs
    description: Optional - once you have run the test, the prompts and each assistant's answers, labelled only A, B, C so you do not see which is which.
    type: text
output_contract:
  format: markdown
  sections: [Test set, Grading rubric, Scores, Recommendation, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Leaderboards and reviews say little about how an assistant handles your work. A fair comparison uses five to ten of your real tasks, including hard and awkward ones, run with the same prompt and attachments in each tool, in fresh chats without memory or custom instructions skewing the result. Outputs are graded blind, criterion by criterion, because people (and AI graders) favour longer answers, confident tone, the first answer shown, and the brand they already like. Answers also vary between runs, so close results are often ties. The decision also depends on things outside the outputs: price, speed, limits, integrations and the data terms for what you will paste in.

<task_description>
{{task}}
</task_description>
{{#criteria}}
Criteria: {{criteria}}
{{/criteria}}
{{#outputs}}
<outputs>
{{outputs}}
</outputs>
{{/outputs}}
</context>

<task>
1. If no outputs are given, build the test and stop after the rubric:
   - Write five to eight test prompts drawn from the task, covering typical, hard, ambiguous and must-not-invent cases. Use placeholders for the user's own material.
   - Give run instructions: same prompt and files in each tool, fresh chat, memory and custom instructions off where possible, run each prompt twice if time allows, copy outputs into a document labelled A, B, C by someone else or with a random key kept aside.
   - Write the grading rubric and set Scores and Recommendation to "Pending: paste the labelled outputs."
2. If outputs are given, grade them:
   - Score each output on each criterion from 1 to 5 with a one-line reason quoting the evidence.
   - Check facts and figures where possible and mark claims you could not check.
   - Ignore length unless the criteria reward it; note when a longer answer scored higher and why.
   - Total per assistant and per criterion, and call results within one point a tie.
3. Recommend which to use for which kind of task, what non-output factors still need checking (price, limits, data terms, integrations), and what would change the recommendation.
</task>

<constraints>
- Grade only what is in the outputs; never guess which product produced which label, and do not reveal or rely on brand knowledge.
- Do not state current prices, limits or features of named products as fact.
- Do not declare a winner from a single prompt or when differences are within noise; say so.
</constraints>

<output_format>
## Test set
Table: Prompt | What it tests | What a great answer includes.
## Grading rubric
Table: Criterion | Weight | What 1, 3 and 5 look like.
## Scores
Table: Prompt | Criterion | A | B | C | Evidence. Then totals.
## Recommendation
Short paragraph.
## Caveats
Bullets: sample size, run-to-run variation, things not tested.
</output_format>
