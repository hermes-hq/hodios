---
schema: 1
id: write-authorization-tests
kind: prompt
title: Write authorization tests for every role and endpoint
description: Builds a role-by-endpoint access matrix from the code and writes tests proving each role can reach and change only what it should, including other users' and other tenants' data.
category: security
version: 1.0.0
status: incubating
stage: [verify]
role: [backend-engineer, qa-engineer, security-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, spec, text]
output: [tests, table]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [authorization, access-control, broken-access-control, security-testing]
pairs_with:
  prompts: [implement-role-based-access, fix-idor-vulnerabilities, audit-tenant-isolation, review-api-security]
  personas: [security-auditor]
args:
  - name: scope
    description: The API, routes or module to cover.
    type: text
    required: true
  - name: access_rules
    description: The intended rules per role if they are written down (a spec, a permissions table, a policy file).
    type: text
  - name: stack
    description: Framework and test tools. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Access matrix, Tests added, Verification, Failures found, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authorization is the control most likely to be broken and least likely to be tested: suites check that admins can do admin things, rarely that a viewer cannot, and almost never that a user in tenant A cannot touch tenant B. A role-by-endpoint matrix makes the gaps visible: rows are routes or operations, columns are roles plus "anonymous", "same role in another tenant" and "owner versus non-owner", and each cell is allow or deny. Table-driven tests generated from that matrix keep coverage complete as routes are added; a test that enumerates registered routes and fails when one is missing from the matrix stops new endpoints from shipping untested. Denials should be checked for both the status code and the absence of side effects, because some handlers return 403 after already writing. When the intended rule is not written anywhere, the code is not the spec: a test that encodes current behaviour can lock in a bug, so unclear cells need a human decision.
</context>

<task>
Write authorization tests for {{scope}}.
{{#access_rules}}Intended rules: {{access_rules}}{{/access_rules}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the route definitions, middleware, policy or permission code, and the existing test helpers for creating users, roles and tenants.
2. Build the access matrix: every route or operation against anonymous, each role, owner and non-owner, and another tenant. Fill each cell from the intended rules where given; otherwise from the code, marking those cells "inferred".
3. Mark cells where the code and the intended rules disagree, or the rule is unclear, as open questions.
4. Write table-driven tests from the matrix through the real HTTP or resolver layer: for each cell, act as that principal and assert the expected status; for denied writes, also assert nothing changed in the database.
5. Add a coverage guard test that lists the registered routes and fails if any route is missing from the matrix, if the framework allows listing routes.
6. Run the tests. Do not change application code to make a failing authorization test pass; report failures as findings.
</task>

<constraints>
- Never weaken an assertion to match current behaviour when the intended rule says otherwise; report it.
- Keep fixtures synthetic; no real user data.
- Do not mark failing tests as skipped; list them under failures found.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Access matrix
Table: route or operation, then one column per principal, each cell allow or deny, with "(inferred)" where taken from code.
## Tests added
Files and test names, and how the table drives them.
## Verification
Commands run and their actual results.
## Failures found
Cells where the app does not match the intended rule, most severe first.
## Open questions
Cells needing a human decision.
</output_format>
