---
schema: 1
id: triage-failing-ci
kind: prompt
title: Triage a failing CI build
description: Finds the first real error in a failing CI log, classifies the failure as caused by the change, flaky, environment drift or already broken, and names the next action. Use when a pipeline turns red.
category: debugging
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [software-engineer, devops-engineer]
stack: []
requires: [repo-read, git]
inputs: [logs, diff, url]
output: [report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [continuous-integration, build-failure, flaky-tests]
pairs_with:
  personas: [debugger]
  prompts: [fix-flaky-test, find-root-cause]
args:
  - name: ci_log
    description: The failing job's log, or a link to the CI run if you can fetch it.
    type: text
    required: true
  - name: change
    description: The diff, PR or commit range that triggered the run, if known.
    type: text
output_contract:
  format: markdown
  sections: [Classification, First real error, Evidence, Next action]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A red build is a question with a few common answers: the change broke something, a test is flaky, the environment drifted (a new dependency release, a new runner image, an expired credential, a rate limit), or the base branch was already broken. The answer decides who acts and how. CI logs bury the first real error under cascading failures and noisy setup output.
</context>

<task>
Triage this CI failure:
{{ci_log}}
{{#change}}
Triggering change:
{{change}}
{{/change}}
1. Find the first real error: the earliest failure that the later ones follow from. Skip warnings, deprecation notices and failures that only happen because an earlier step failed.
2. Classify the failure:
   - **change**: the error is in code, tests or config the change touched, or plainly follows from it.
   - **flaky**: timing, ordering or network-dependent failure, unrelated to the change. Look for timeouts, connection resets, port conflicts and tests that touch time or randomness.
   - **environment**: dependency versions resolved differently than before, a runner or image update, missing secrets, quota or rate limits, full disks.
   - **pre-existing**: the same failure is on the base branch. Check the base branch's recent runs or history if you can.
3. Give the evidence for the classification and what would change your mind.
4. Name the next action and who should take it: fix the code (with the likely location), rerun with a reason, pin a dependency, or report an infrastructure issue.
</task>

<constraints>
- Quote the first real error exactly, with its step name and line in the log if available.
- Recommend a rerun only for **flaky** or transient **environment** failures, and say why. Never recommend rerunning a deterministic failure.
- Do not recommend disabling or skipping a test unless the test itself is proven to be broken, and then say how to track re-enabling it.
- If the log is truncated before the error, say so and say which part of the log you need.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Classification
`change`, `flaky`, `environment` or `pre-existing`, with confidence (high, medium, low).
## First real error
The quoted error, its job and step.
## Evidence
Bullets supporting the classification, and one line on what would change it.
## Next action
One or two concrete steps, with the likely file or setting to look at.
</output_format>
