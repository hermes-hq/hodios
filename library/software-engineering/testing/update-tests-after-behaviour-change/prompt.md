---
schema: 1
id: update-tests-after-behaviour-change
kind: prompt
title: Update tests after an intended behaviour change
description: Updates tests broken by an intended behaviour change without weakening them, separating outdated expectations from real regressions the change caused.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, qa-engineer]
requires: [repo-read, file-write, shell]
inputs: [diff, logs, repo, spec]
output: [tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [test-maintenance, regression, failing-tests, snapshots]
pairs_with:
  prompts: [fix-failing-tests-track, write-tests-for-diff, review-test-quality]
  personas: [test-engineer]
args:
  - name: intended_change
    description: What behaviour was changed on purpose, and why - the ticket, spec or a plain description of old versus new behaviour.
    type: text
    required: true
  - name: failures
    description: The failing test output, or the command that reproduces it.
    type: text
output_contract:
  format: markdown
  sections: [Triage, Updates, Regressions found, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a deliberate change breaks dozens of tests, the tempting fix is to update every assertion to whatever the code now returns, or to regenerate all snapshots. That silently converts real regressions into expected behaviour. Each failure is one of three things: an expectation the change legitimately made outdated, a regression the change caused in behaviour that was supposed to stay the same, or a brittle test coupled to details (exact strings, ordering, mock call counts) that should be made more robust while it is being touched. Only the first kind should simply be updated, and the new expected value should come from the specification of the new behaviour, not from the code's output.
</context>

<task>
Update the tests broken by this intended change:
{{intended_change}}
{{#failures}}

Failures:
{{failures}}
{{/failures}}

1. Read the change and the specification of the new behaviour. Write down precisely what should now differ and what must stay the same.
2. Run the failing tests (or the full suite) and collect every failure.
3. Triage each failure:
   - outdated expectation: the test asserts old behaviour the change intentionally replaced;
   - regression: the test asserts behaviour that should not have changed;
   - brittle: the test fails because of incidental detail, not behaviour.
   Give the reason for each classification.
4. For outdated expectations, update the assertion to the new behaviour as specified, deriving the expected value independently (by reasoning from the spec, not by copying the code's output). Keep the test's original intent; if the old test's purpose no longer exists, delete it and say so.
5. For snapshot failures, inspect each snapshot diff and accept only the parts the change explains. Never bulk-accept snapshots.
6. For regressions, do not touch the test. Report them with the evidence and stop for a decision, unless the user asked you to fix the production code too.
7. For brittle tests, make the smallest change that keeps the assertion meaningful (assert on the relevant field, sort before comparing) and note it.
8. Check for missing coverage of the new behaviour and add a test if nothing now pins it.
9. Run the full suite and report.
</task>

<constraints>
- Never weaken an assertion (remove it, make it looser, skip or mark the test expected-to-fail) to get green.
- Never bulk-update snapshots or golden files.
- Do not change production code unless asked; report regressions instead.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Triage
Table: test | classification | reason.

## Updates
Diff of test changes, grouped by classification.

## Regressions found
Each with the failing assertion, the behaviour that changed and why it should not have. "None" if none.

## Verification
Suite command and result, and any tests added for the new behaviour.
</output_format>
