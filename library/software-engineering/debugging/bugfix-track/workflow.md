---
schema: 1
id: bugfix-track
kind: workflow
title: Bugfix track
description: Takes a bug from report to reproduction, root cause, regression test, minimal fix and a verified pull request, stopping for approval between steps. Use for any bug worth fixing properly.
category: debugging
version: 1.0.0
status: incubating
stage: [discover, verify, build, ship]
role: [software-engineer, backend-engineer, frontend-engineer, maintainer]
requires: [repo-read, file-write, shell, git]
inputs: [ticket, stack-trace, logs]
output: [report, tests, diff]
risk: external
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [root-cause, bug-report, reproduction, regression-test]
pairs_with:
  prompts: [reproduce-bug-report, find-root-cause, add-regression-test, write-pr-description]
  personas: [debugger]
args:
  - name: bug_report
    description: The bug as reported, verbatim if possible - what happened, what was expected, steps, error messages, screenshots described in words, and a link or id if there is one.
    type: text
    required: true
  - name: environment
    description: Where it happens - app version or commit, OS, browser or runtime, configuration, data or account involved, and whether it is production, staging or local.
    type: text
  - name: severity
    description: How bad the bug is for users. Critical and high get a mitigation check before the full fix.
    type: enum
    enum: [low, medium, high, critical]
    default: medium
steps:
  - {id: reproduce, file: steps/01-reproduce.md, stage: discover, gate: approve}
  - {id: root-cause, file: steps/02-root-cause.md, stage: discover, gate: approve}
  - {id: regression-test, file: steps/03-regression-test.md, stage: verify, gate: approve}
  - {id: fix, file: steps/04-fix.md, stage: build, gate: approve}
  - {id: pull-request, file: steps/05-pull-request.md, stage: ship, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Fixes this bug properly, one approved step at a time:

<bug_report>
{{bug_report}}
</bug_report>
{{#environment}}

<environment>
{{environment}}
</environment>
{{/environment}}

Severity: {{severity}}.

The order is fixed: reproduce it, find the root cause, write a test that fails because of the bug, make the smallest fix that turns the test green, then verify everything and prepare the pull request. Each step ends with a short report and stops for the developer's approval; later steps build on the approved findings instead of re-asking. Nothing is called fixed until a test that failed before the change passes after it and the rest of the suite still passes. If the severity is high or critical, the first step also says whether users need a mitigation now (rollback, feature flag, config change) while the proper fix is made, and leaves that decision to the developer.

Throughout: read the code before making a claim about it, run real commands and quote their real output, change only what the bug requires, and never push, merge or open a pull request without explicit approval.
