---
schema: 1
id: surface-hidden-assumptions
kind: prompt
title: Surface the hidden assumptions in a plan
description: Surfaces the unstated assumptions a plan, pitch or argument depends on, rates how risky each one is, and proposes the cheapest way to test the riskiest before committing.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, founder, manager]
requires: [none]
inputs: [text, document]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [assumptions, risk-testing, plan-review, cheap-tests]
pairs_with:
  prompts: [run-pre-mortem, check-decision-for-biases, extract-open-questions]
args:
  - name: text
    description: The plan, pitch, proposal, strategy or argument, in full. Bullet points work.
    type: text
    required: true
  - name: context
    description: Optional. Facts about the situation the text leaves out, for example budget, team size, market, deadline, who decides.
    type: text
output_contract:
  format: markdown
  sections: [What the text is trying to achieve, Hidden assumptions, Test the riskiest three, Assumptions that look safe]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Plans rarely fail on what they state; they fail on what they take for granted. "We'll launch in March and convert 5% of trial users" quietly assumes the build finishes on time, that trial users resemble buyers, and that nothing about pricing changes. Your job is to make those beliefs visible, judge which ones could sink the plan, and find the cheapest way to check the dangerous ones before money or reputation is committed. This is not a failure story (a pre-mortem) or a list of thinking biases; it is an inventory of what must be true.

<text>
{{text}}
</text>
{{#context}}
<situation>
{{context}}
</situation>
{{/context}}
</context>

<task>
1. If the text is too thin to analyse (a single slogan or goal with no plan), ask what the plan is and how it is meant to work. Stop there.
2. State in one or two sentences what the text is trying to achieve and the causal chain it relies on (do A, so B happens, which gives C).
3. Walk the chain and list the unstated assumptions: beliefs that must be true for each link to hold but that the text does not state or support. Look across these areas:
   - **People:** customers, users, staff or partners behaving as hoped (they want it, will pay, will adopt, will cooperate).
   - **Environment:** market, competitors, regulation, prices or seasons staying as they are.
   - **Resources:** time, money, skills and attention being available when needed.
   - **Causality:** the action actually producing the effect, rather than coinciding with it.
   - **Continuity:** the past or a pilot predicting the future or the full rollout.
   - **Definitions and values:** everyone meaning the same thing by success, quality or "done".
4. For each assumption: quote the line that depends on it; rate **how likely it is wrong** (low, medium, high) and **impact if wrong** (low, medium, high), each with a short reason; note any evidence for or against in the text or the situation.
5. Rank by likelihood x impact. For the top three, design the cheapest test: what to do (a conversation, a fake-door page, a small pilot, a data pull, a quote from a supplier), how long and how much it costs roughly, and what result would show the assumption is false. Prefer tests that take days, not months.
6. Before answering, check that every assumption is genuinely unstated (not already argued for in the text), specific to this plan, and tied to a quoted line.
</task>

<constraints>
- Only assumptions the plan actually depends on. Skip universal ones ("assumes the company still exists").
- Be specific: "assumes the 200 people on the waitlist will pay EUR 20 a month" beats "assumes demand".
- Label your own judgements as judgements. Do not invent facts about the market or the company.
- Do not rewrite the plan or recommend abandoning it; the reader decides what to do with the risks.
- Cap the list at about 12. If there are more, keep the riskiest and say how many low-risk ones were left out.
</constraints>

<output_format>
## What the text is trying to achieve
The goal and the causal chain, in one or two sentences.
## Hidden assumptions
Table: # | Assumption | Depends on (quoted line) | Likely wrong? | Impact if wrong | Evidence so far.
## Test the riskiest three
For each: the assumption; the test; time and rough cost; the result that would prove it false; what to do if it is false.
## Assumptions that look safe
Bullets, one line each, with why.
</output_format>
