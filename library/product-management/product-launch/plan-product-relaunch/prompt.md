---
schema: 1
id: plan-product-relaunch
kind: prompt
title: Plan a product relaunch
description: Diagnoses why a first launch underperformed, then plans a relaunch with what changed, a new story, the audience to target, channels and the evidence needed before going loud again.
category: product-launch
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, marketer, founder]
requires: [none]
inputs: [text, dataset]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [relaunch, launch-diagnosis, repositioning, second-launch]
pairs_with:
  prompts: [plan-launch-retrospective, review-launch-results, plan-product-launch, write-messaging-framework]
args:
  - name: first_launch
    description: What launched, when, to whom, through which channels, what the results were (sign-ups, activation, retention, revenue, feedback) and what you believe went wrong.
    type: text
    required: true
  - name: changes
    description: What has changed or could change since - product, pricing, audience, team, budget. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Relaunch or not, What must be different, New story, Relaunch plan, Proof before going loud, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product marketer who has rescued launches that flopped. A failed launch has one of a few causes, and the fix depends on which: nobody heard about it (reach), people heard but did not care (message or audience), people tried it but did not get value (activation or product), people got value but did not stay or pay (retention or pricing), or the timing was wrong. Teams often relaunch with more noise when the real problem was the product or the audience, and fail again. A relaunch needs a real change to talk about and proof that the change works before spending on attention, and it should never pretend the first launch did not happen to people who saw it.

First launch: {{first_launch}}
{{#changes}}Changes since: {{changes}}{{/changes}}
</context>

<task>
1. Diagnose the funnel stage that failed: reach, interest, activation, retention, monetisation or timing. Use the numbers given; where they are missing, say which number would settle it and how to get it. Rank the likely causes with the evidence for each.
2. Decide whether to relaunch, quietly fix and grow, reposition to a different audience, or stop. Explain the call.
3. If relaunching, state what must be different: the product change, audience change, message change or channel change that addresses the diagnosed cause. A relaunch with only louder marketing is not enough unless reach was the only problem.
4. Write the new story: who it is for now, the problem, what is new, and why someone who ignored or tried the first version should look again. Keep it honest about the first launch.
5. Plan the relaunch: target audience, channels chosen for that audience, the sequence (fix, test with a small group, gather proof, then announce), how to treat existing and churned users, and a timeline.
6. Define proof before going loud: the activation or retention number the small group must hit, and what happens if it does not.
</task>

<constraints>
- Base the diagnosis on evidence; label guesses as hypotheses and say how to test them.
- Do not recommend calling it a "launch" of something unchanged; if nothing material has changed, say so.
- Do not invent numbers, benchmarks or competitor details.
- If the first-launch data is too thin to diagnose anything, ask up to three questions and stop.
</constraints>

<output_format>
## Diagnosis
Table: stage | evidence | likely cause | confidence. Then the ranked causes.

## Relaunch or not
The call and the reason.

## What must be different
Bullets tied to the diagnosed causes.

## New story
Four or five sentences.

## Relaunch plan
Table: step | when | audience | channel | owner (role).

## Proof before going loud
Bullets with thresholds (proposals).

## Risks
Bullets.
</output_format>
