---
schema: 1
id: find-root-cause
kind: prompt
title: Find the root cause of a bug
description: Reproduces a bug, tests ranked hypotheses with experiments, and fixes the root cause instead of the symptom. Use when something is broken and the reason is not obvious.
category: debugging
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [logs, stack-trace, repo]
output: [report, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [root-cause, hypothesis, reproduction]
pairs_with:
  personas: [debugger]
  prompts: [explain-stack-trace, add-regression-test]
args:
  - name: symptom
    description: What goes wrong, as observed. Include the error message, when it happens and what you expected instead.
    type: text
    required: true
  - name: evidence
    description: Logs, stack traces, reproduction steps, and anything already tried or ruled out.
    type: text
output_contract:
  format: markdown
  sections: [Reproduction, Hypotheses, Root cause, Fix, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A fix that targets the symptom usually moves the bug instead of removing it: a null check where the null should never arrive, a retry around a race, a catch that hides the error. The root cause is the earliest point where the program's actual state diverges from what the code assumes. Debugging is finding that point with experiments, not guessing at it.
</context>

<task>
Find and fix the root cause of: {{symptom}}
{{#evidence}}
Evidence so far:
{{evidence}}
{{/evidence}}
1. **Reproduce.** Find the shortest reliable way to trigger the symptom, ideally a single command or a failing test. Record how often it fails. If you cannot reproduce it, say what you tried and what information would let you, then stop and ask.
2. **Collect facts.** Read the code on the failing path. Separate what you observed (outputs, logs, values) from what you assume.
3. **Hypothesise.** List two to five candidate causes. For each, state what you would expect to see if it were true and if it were false.
4. **Experiment.** Run the cheapest experiment that best separates the hypotheses: add a log or assertion, inspect a value, change one input, bisect the code path, the input data or the commit history. Change one thing at a time and record each result.
5. **Confirm.** You have the root cause when you can predict the failure, for example "with input X it fails; with Y it passes", and the prediction holds.
6. **Fix at the cause**, as the smallest correct change. Remove the temporary logs and assertions you added.
7. **Verify.** Run the reproduction again and the surrounding tests. Add a test that fails without the fix when the project has tests.
</task>

<constraints>
- Do not change code to "see if it helps" without a hypothesis that predicts the result.
- Do not stop at the first plausible explanation. Confirm it with an experiment whose result you predicted.
- Never fix the symptom by swallowing errors, adding retries or sleeps, or special-casing the failing input. If a symptom-level mitigation is needed urgently, label it as such and still name the root cause.
- If the cause is outside the code (configuration, data, environment, a dependency), say so and stop at a recommendation.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Reproduction
The command or steps, and the failure rate observed.
## Hypotheses
A table: Hypothesis | Experiment | Result | Verdict (confirmed, ruled out, open).
## Root cause
One paragraph: where the state first goes wrong (`path:line`), why, and how that produces the symptom.
## Fix
The diff, then one sentence on why it removes the cause.
## Verification
The commands you ran after the fix and their results, including the new test.
</output_format>
