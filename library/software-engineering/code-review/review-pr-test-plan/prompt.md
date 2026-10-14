---
schema: 1
id: review-pr-test-plan
kind: prompt
title: Review a pull request's test plan
description: Checks the author's testing notes against the diff and lists untested paths, missing environments and data, and manual checks that should become automated tests.
category: code-review
version: 1.0.0
status: incubating
stage: [review, verify]
role: [software-engineer, qa-engineer, tech-lead]
requires: [none]
inputs: [diff, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [test-plan, pull-request, coverage-gaps, manual-testing]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-test-quality, write-test-plan, verify-pr-meets-acceptance-criteria]
args:
  - name: test_plan
    description: The "How was this tested" section of the pull request, or the author's testing notes.
    type: text
    required: true
  - name: diff
    description: The change, including any test files, with file paths.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Plan versus diff, Gaps, Automate these, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Tested locally" is the most common test plan and tells the reviewer nothing. A test plan is worth reviewing as its own artefact because it shows what the author believes the change does, and the gaps between that belief and the diff are where bugs hide. Typical gaps: only the happy path was exercised; the code has branches for errors, empty states, permissions and retries that nobody triggered; tests were run with an admin account, a fresh database, a fast network or one locale; the migration was run forward but never on production-sized data or rolled back; the feature was tested with the flag on and never with it off; a background job or webhook path was never invoked; mobile or older browser versions were skipped; and manual steps that will need repeating on every change were not turned into automated tests. This review does not judge the quality of the test code itself; it judges whether the testing covers the change.
</context>

<task>
<test_plan>
{{test_plan}}
</test_plan>

<diff>
{{diff}}
</diff>

1. Summarise what the diff changes as a list of behaviours and code paths: new branches, error handling, permission checks, migrations, flags, jobs, integrations and UI states.
2. Map each item from the test plan and each automated test in the diff to the behaviours it covers.
3. List behaviours with no coverage at all, ranked by risk (data, money, security and user-facing breakage first).
4. Check the conditions of testing: user roles, data volume and shape, locales and time zones, browsers or devices, network conditions, feature flag states, and the rollback path. Flag the ones the change makes relevant and the plan omits.
5. Identify manual steps in the plan that are repeatable and should become automated tests, and say at which level (unit, integration, end-to-end).
6. Ask the author specific questions where the plan is vague ("tested the edge cases" - which ones?).
</task>

<constraints>
- Every gap names the code path (`path:line`) and a concrete scenario to test.
- Do not demand exhaustive testing; focus on gaps proportional to the risk of the change.
- Do not review test code style or assertions in depth; point to a test quality review for that in one line if needed.
- At most 10 gaps.
</constraints>

<output_format>
## Verdict
One line: sufficient | sufficient-with-additions | insufficient.
## Plan versus diff
Table: behaviour or path, covered by (plan item or test), status (covered/partly/none).
## Gaps
Numbered: risk, `path:line`, scenario to test, suggested test level.
## Automate these
Bullets: manual step, proposed automated test.
## Questions for the author
Bullets.
</output_format>
