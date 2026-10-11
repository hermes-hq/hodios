---
schema: 1
id: set-up-docs-linting
kind: prompt
title: Set up docs linting in CI
description: Adds docs checks to CI with Vale, markdownlint and link checking, tuned to the project's own style and current pages so the checks catch real problems without a flood of false alarms.
category: docs
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [technical-writer, maintainer, devops-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [vale, markdownlint, link-checking, prose-linting, docs-ci]
pairs_with:
  prompts: [write-documentation-standards, fix-broken-docs-links, test-code-in-docs]
args:
  - name: notes
    description: The style guide or rules to enforce, product terms, and how strict the team wants checks to be at first.
    type: text
output_contract:
  format: markdown
  sections: [Tools and config, Baseline results, CI setup, Rules left off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Docs linters fail in one predictable way: they are switched on with a borrowed rule set, report two thousand problems, and are disabled within a month. Checks that last start small and match the team's actual style, are measured against the current pages before they block anything, and treat each source of noise differently. Prose linting with Vale works when the vocabulary file accepts the product's own terms and the rules come from the team's style guide; importing a large company style wholesale mostly produces noise. markdownlint should be configured to the conventions the docs already follow (line length is usually turned off). Internal links are deterministic and should block pull requests. External links are flaky (rate limits, bot blocking, temporary outages), so check them on a schedule with retries and an exclude list, not on every pull request.
</context>

<task>
Add docs linting to this repository.
{{#notes}}
Notes: {{notes}}
{{/notes}}

1. Find the docs sources, the generator (it may already check links at build time), any existing lint config, the style guide, and the CI system.
2. Run each tool on the current docs with a starting config and count findings per rule.
3. Tune: turn on rules that match the existing style and have few, real findings; add product names and terms to the Vale vocabulary; configure markdownlint to the current conventions; exclude generated files, vendored docs and changelogs. Fix trivial findings in the same change only if they are mechanical (trailing spaces, heading levels) and few.
4. Set up internal link checking on every pull request (the generator's strict mode or a link checker), and external link checking on a weekly schedule with retries, caching and an exclude list for localhost, example domains and sites that block bots.
5. In CI, run prose lint on changed files only, as warnings or review comments first, with a note on when to make it blocking. Add an optional pre-commit hook if the repo uses pre-commit.
6. Document how to run the checks locally and how to suppress a rule for one line with a reason.
</task>

<constraints>
- Every enabled rule must have been run against the current docs and its findings counted.
- Do not rewrite prose to satisfy the linter in this change, beyond mechanical fixes.
- Pin tool versions and Vale style package versions.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Tools and config
Files added and the rules turned on.
## Baseline results
Table: tool, rule, findings now, action (on, warn, off, fixed).
## CI setup
What runs on pull requests, what runs on a schedule, and what blocks a merge.
## Rules left off
Rules considered and why they are off, with the finding counts.
</output_format>
