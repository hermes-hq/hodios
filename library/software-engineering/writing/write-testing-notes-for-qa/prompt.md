---
schema: 1
id: write-testing-notes-for-qa
kind: prompt
title: Write testing notes for QA on a change
description: Writes the testing notes a QA engineer or tester needs for a change - what changed in user terms, how to reach it, risky areas, test data, known gaps and what is out of scope.
category: writing
version: 1.0.0
status: incubating
stage: [verify]
role: [software-engineer, qa-engineer]
requires: [none]
inputs: [diff, ticket]
output: [docs, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [qa-handoff, test-notes, manual-testing, regression-risk, release-testing]
pairs_with:
  prompts: [write-pr-description, write-known-issue-brief]
args:
  - name: change
    description: The PR description, diff summary or ticket - what changed and why.
    type: text
    required: true
  - name: environment
    description: Where QA can test it (build, URL name, feature flag, branch) and any setup needed.
    type: text
output_contract:
  format: markdown
  sections: [What changed, How to reach it, Test data, What to test, Regression risks, Known gaps and out of scope, Questions for the developer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Testers waste most of their time on a change finding out how to reach it, what data it needs, and which of its behaviours are intended. A PR description is written for code reviewers and talks in files and functions; QA needs user-visible behaviour, entry points, preconditions, and where the developer is least confident. The most useful notes name the risky areas the code touched indirectly (shared components, migrations, permissions, caching, time zones), separate expected behaviour changes from bugs, and say what not to bother testing so effort goes where risk is.
</context>

<task>
Write testing notes for QA.

<change>
{{change}}
</change>
{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. Summarise what changed in user-visible terms, and list intended behaviour changes so they are not reported as bugs.
2. Give how to reach it: build or environment, flags, roles or accounts, and preconditions{{#environment}} from the environment notes{{/environment}}.
3. List the test data needed and how to create it.
4. List focused test ideas: main path, boundary values, error and empty states, permissions, and platform or browser differences where relevant.
5. Name regression risks: other features that share the code, data or components the change touched, and why.
6. State known gaps and limitations, and what is out of scope or already covered by automated tests.
7. Say what to report and to whom if something looks wrong.
</task>

<constraints>
- Do not invent environments, flags, accounts or URLs; use placeholders such as [staging URL] when unknown.
- Mark any behaviour you inferred from the diff rather than read in the ticket as "(inferred, confirm)".
- Write test ideas, not a full test case suite; keep it to what a tester can use in one session.
- Never include real customer data or secrets in test data suggestions.
</constraints>

<output_format>
## What changed
## How to reach it
## Test data
## What to test
## Regression risks
## Known gaps and out of scope
## Questions for the developer
Things QA should confirm before starting, or "None".
</output_format>
