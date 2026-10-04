---
schema: 1
id: verify-pr-meets-acceptance-criteria
kind: prompt
title: Verify a PR meets its acceptance criteria
description: Checks a diff against its ticket's acceptance criteria one by one, marking each met, partly met, not met or untestable from the diff, with evidence lines and missing tests. Use before approving a PR.
category: code-review
version: 1.0.0
status: incubating
stage: [review, verify]
role: [qa-engineer, software-engineer, product-manager]
stack: []
requires: [none]
inputs: [diff, ticket]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [acceptance-criteria, traceability, requirements, test-coverage]
pairs_with:
  prompts: [write-acceptance-criteria, review-pull-request]
args:
  - name: diff
    description: The PR diff, including tests.
    type: text
    required: true
  - name: acceptance_criteria
    description: The ticket's acceptance criteria as written (Given/When/Then, a checklist or prose), plus the ticket title.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Criteria, Missing tests, Scope notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reviewer, QA engineer or product owner wants to know whether this PR does what the ticket asked, not whether the code is elegant. Code review often approves good code that solves 80% of the ticket: the happy path is there but the validation rule, the permission check or the empty state is not. The opposite also happens: the PR adds behaviour nobody asked for. Each criterion needs evidence in specific lines and, ideally, a test that would fail without it.
</context>

<task>
<acceptance_criteria>
{{acceptance_criteria}}
</acceptance_criteria>

<diff>
{{diff}}
</diff>

1. Split the acceptance criteria into atomic, numbered checks. A criterion with "and" or several Then clauses becomes several checks. Keep the original wording and note when you split.
2. If a criterion is ambiguous (for example "fast", "user-friendly", "handles errors"), say what interpretation you checked against and list it under Scope notes as a question for the ticket owner.
3. For each check, decide:
   - **met:** the code implements it and a test covers it;
   - **met, untested:** the code implements it but no test would fail without it;
   - **partly met:** some cases handled (for example the happy path but not the boundary or error case);
   - **not met:** no code implements it, or the code contradicts it;
   - **can't tell from the diff:** depends on code, config, data or UI not shown (say exactly what to check, such as a feature flag value or a screen).
4. Cite the evidence for each: `path:line` for implementation and the test name. Trace the logic, do not match keywords: a function named `validateEmail` that only checks for "@" does not meet "rejects invalid email addresses".
5. For each check without a test, write the test case in one line: given, when, then, with concrete values including the boundary (for example "quantity 0, 1, 100, 101 when the limit is 100").
6. Note changes in the diff that no criterion asks for: scope creep, refactors, or behaviour changes that need their own ticket or a product decision.
</task>

<constraints>
- Judge only against the criteria given; this is not a general code review. Mention a serious defect outside the criteria in one line under Scope notes.
- Never mark a criterion met on the basis of a name, comment or commit message alone.
- Do not rewrite the acceptance criteria; raise ambiguities as questions.
- If either the diff or the criteria are missing, ask for the missing one and stop.
</constraints>

<output_format>
## Verdict
One line: all met | met with test gaps | not ready, then counts (met, met untested, partly met, not met, can't tell).
## Criteria
Table: # | Criterion | Status | Evidence (`path:line`, test name) | Gap.
## Missing tests
Numbered one-line test cases: Given … When … Then …, mapped to the criterion number.
## Scope notes
Bullets: ambiguous criteria with the question to ask, behaviour not asked for, anything to check outside the diff.
</output_format>
