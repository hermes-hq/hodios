---
schema: 1
id: diagnose-failing-e2e-test
kind: prompt
title: Diagnose a failing E2E test
description: Diagnoses a consistently failing end-to-end test from its trace, screenshots, video and network log, decides whether the app or the test is wrong, and fixes the right one.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [qa-engineer, software-engineer, frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [logs, file, repo]
output: [report, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [e2e, trace-viewer, test-debugging, ci-failures]
pairs_with:
  prompts: [fix-flaky-test, triage-failing-ci, write-e2e-test]
  personas: [test-engineer]
args:
  - name: failure
    description: The failing test name and error output, plus what artifacts exist (trace file, screenshots, video, console and network logs, CI job link contents).
    type: text
    required: true
  - name: recent_changes
    description: What changed since it last passed - app commits, test changes, environment or data changes - if known.
    type: text
output_contract:
  format: markdown
  sections: [What the artifacts show, Verdict, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An E2E failure message like "locator not found" or "timeout 30000ms exceeded" names the symptom, not the cause. The cause is almost always visible in the artifacts: the screenshot at failure shows an error page, a cookie banner or a modal covering the button; the trace's action log and DOM snapshots show the element was renamed or rendered twice; the network log shows a 500, a 401 from an expired session, or a request that never fired; the console shows a JavaScript error. Reading these before touching code separates the four real verdicts: the app has a bug (the test did its job), the app changed intentionally and the test is outdated, the test is wrong or brittle, or the environment or data is broken. Raising the timeout fixes none of them.
</context>

<task>
Diagnose this failing end-to-end test:
{{failure}}
{{#recent_changes}}

Recent changes: {{recent_changes}}
{{/recent_changes}}

1. Read the test code and the page objects or helpers it uses.
2. Read the artifacts in order: the error and the failing step; the screenshot at failure; the trace's action log around the failing step (what was clicked, what the DOM looked like before and after); network requests near the failure (status codes, failed or missing requests, slow responses); console errors. If a trace or artifact is missing, say what to enable to capture it.
3. Write down what the user would have seen at the moment of failure, in one or two sentences.
4. Reproduce locally against the same environment or build if possible, in headed or UI mode, and confirm the observation.
5. Decide the verdict: app bug, intended app change, test defect, or environment or data problem. Cite the artifact evidence for it. Use the recent changes to confirm (a commit renaming the button, a deploy that broke an API).
6. Act on the verdict:
   - app bug: write up the defect with reproduction steps and evidence; fix the app only if asked;
   - intended change: update the test's locators or steps to the new behaviour, keeping what it verifies;
   - test defect: fix the locator, waiting or data setup at its cause;
   - environment or data: report what is broken and who owns it; do not change the test to work around it.
7. Run the test several times after a test change to confirm it passes consistently.
</task>

<constraints>
- Never fix by increasing timeouts, adding sleeps, adding retries or forcing clicks on covered elements.
- Do not weaken or delete assertions to get a pass.
- Do not label a failure as flaky without evidence that it passes and fails on the same build.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the artifacts show
Bullets per artifact, and what the user would have seen.

## Verdict
App bug, intended change, test defect, or environment or data, with the evidence.

## Fix
The diff, or the defect report, or the environment issue to raise.

## Verification
Runs after the fix, or what is needed to verify.
</output_format>
