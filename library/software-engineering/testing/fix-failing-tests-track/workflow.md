---
schema: 1
id: fix-failing-tests-track
kind: workflow
title: Fix a red test suite after an upgrade or merge
description: Takes a red test suite back to green in gated steps, clustering failures, proving each root cause and fixing code or outdated tests with evidence. Use after an upgrade or merge breaks many tests.
category: testing
version: 1.0.0
status: incubating
stage: [verify, plan, build]
role: [software-engineer, qa-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, diff]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [failing-tests, root-cause, test-triage, upgrade-fallout]
pairs_with:
  prompts: [fix-flaky-test, upgrade-major-dependency]
  personas: [debugger, test-engineer]
args:
  - name: test_command
    description: The exact command that runs the suite, for example "npm test", "pytest -q" or "./gradlew test".
    type: string
    required: true
  - name: recent_change
    description: What changed before the suite went red (an upgrade, a merged branch, a commit range), if known. Helps separate new breakage from failures that were already there.
    type: text
  - name: scope
    description: Paths or test names to limit the work to. Leave empty to work on the whole suite.
    type: text
  - name: max_changes
    description: The most files the whole run may change before it stops and reports. Keeps a sweep reviewable.
    type: number
    default: 20
steps:
  - {id: triage, file: steps/01-triage.md, stage: verify, gate: none, artifact: "fix-failing-tests/01-triage.md"}
  - {id: diagnose, file: steps/02-diagnose.md, stage: plan, gate: approve, artifact: "fix-failing-tests/02-diagnosis.md"}
  - {id: fix, file: steps/03-fix.md, stage: build, gate: none}
  - {id: verify, file: steps/04-verify.md, stage: verify, gate: none, artifact: "fix-failing-tests/04-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Gets the suite run by `{{test_command}}` back to green without cheating. A red suite after an upgrade or merge usually holds a handful of root causes behind dozens of failures, plus a few failures that were already there or are flaky. This track finds those causes, fixes the code where the code is wrong, updates a test only when the intended behaviour really changed (and says why), and reports whatever it could not fix.

Rules for every step:
- Work from real command output only. Never report a test as passing, a cause as proven or a count without having run the command that shows it.
- Fix behaviour, not tests. A test may change only when you can point to the intended behaviour change: an upgrade note, a changelog entry, a commit message, a spec or a decision the user approved.
- Stay inside {{scope}} when it is given, and stop and report before the run changes more than {{max_changes}} files in total.
- Write artifacts to the paths listed, outside version control unless the user wants them kept. Commit nothing unless the user asked for commits.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
