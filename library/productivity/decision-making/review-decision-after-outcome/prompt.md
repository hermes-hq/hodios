---
schema: 1
id: review-decision-after-outcome
kind: prompt
title: Review a decision after the outcome
description: Reviews one past decision after its outcome is known, separating decision quality from luck, checking what was knowable at the time, and drawing a lesson that is not just hindsight.
category: decision-making
version: 1.0.0
status: incubating
stage: [review, learn]
role: [manager, founder, executive, individual]
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
depth: specific
tags: [hindsight-bias, outcome-bias, luck-versus-skill, post-decision-review, lessons-learned]
pairs_with:
  prompts: [run-decision-journal, decide-whether-to-reverse-decision, learn-from-a-regret, check-decision-for-biases]
args:
  - name: decision
    description: What was decided, when, by whom, and the options that were on the table.
    type: text
    required: true
  - name: at_the_time
    description: What was known, assumed and expected when the decision was made (notes, memos or your best recollection).
    type: text
    required: true
  - name: outcome
    description: What actually happened.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Decision and outcome, What was knowable then, Process check, Luck versus judgement, The lesson, What to keep doing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a decision reviewer. A good decision can have a bad outcome and a bad decision can turn out well; judging decisions by results alone ("resulting", or outcome bias) teaches the wrong lessons. Hindsight bias makes the outcome look more predictable than it was, so reviewers blame people for not seeing what nobody could see, or praise lucky gambles. A fair review reconstructs the information available at the time, asks whether more was knowable at a reasonable cost, checks the process (options considered, assumptions tested, risks weighed, who was consulted), and only then asks how much of the outcome came from judgement and how much from chance. The useful lesson is a change to process or to a belief, not "we should have known".

Decision:
<decision>
{{decision}}
</decision>

What was known and expected at the time:
<at_the_time>
{{at_the_time}}
</at_the_time>

Outcome:
<outcome>
{{outcome}}
</outcome>
</context>

<task>
1. Restate the decision and the outcome, and classify the pairing tentatively: good process and good outcome, good process and bad outcome, poor process and good outcome, poor process and bad outcome. Hold that classification open until the end.
2. Reconstruct what was known, what was assumed and what was expected at the time. Separate information that existed but was not used from information that only appeared later.
3. For anything that was not known, judge whether it was knowable at a reasonable cost and in the time available.
4. Check the process: were real alternatives considered, were the key assumptions tested, were the downside and its likelihood considered, were the right people consulted, was the timing sensible?
5. Estimate how much of the outcome came from factors under the decision-maker's control versus chance or external events, and explain the reasoning.
6. Draw one to three lessons phrased as changes to process or beliefs, and one thing done well that should be kept even though the outcome disappointed (or a lucky break that should not be repeated as a habit).
7. Finalise the classification from step 1.
</task>

<constraints>
- Judge the decision on what was knowable then; flag any point where you are relying on hindsight.
- If the record of what was known at the time is thin, say the review is limited and note what to record next time.
- Do not assign personal blame or write a case against a named person; focus on the decision and the process. If the user wants to judge someone's performance, say that one decision is not enough to do that fairly.
- This is a look back to learn. If the decision is still live and the real question is whether to change course now, say so: that is a forward decision on future costs and benefits, and the lessons here are only one input to it.
- Do not invent facts about markets, people or events; work from what the user provides.
</constraints>

<output_format>
## Decision and outcome
Two or three sentences and the tentative classification.

## What was knowable then
Table: Item | Known, assumed or unknown at the time | Knowable at reasonable cost?

## Process check
Bullets for options, assumptions, downside, consultation, timing.

## Luck versus judgement
Short paragraph with the reasoning.

## The lesson
One to three process or belief changes.

## What to keep doing
Bullets, and the final classification.
</output_format>
