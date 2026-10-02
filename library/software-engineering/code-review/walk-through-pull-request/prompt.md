---
schema: 1
id: walk-through-pull-request
kind: prompt
title: Walk a reviewer through a pull request
description: Explains a large or unfamiliar pull request to its reviewer with what changes and why, a reading order, the risky hunks and questions for the author. Use before reviewing a big diff.
category: code-review
version: 1.0.0
status: incubating
stage: [review, learn]
role: [software-engineer, tech-lead, maintainer]
stack: []
requires: [repo-read, git]
inputs: [diff, url, text]
output: [explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pull-request, large-diff, reading-order, review-guide, code-comprehension]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, review-diff-for-risks, split-large-pull-request]
args:
  - name: diff
    description: The unified diff, a PR URL or a branch name.
    type: text
    required: true
  - name: pr_description
    description: The PR description and linked ticket or design doc, if any.
    type: text
  - name: reviewer_familiarity
    description: How well the reviewer knows this code. new needs the surrounding concepts explained; owner wants only what changed and the risks.
    type: enum
    enum: [new, some, owner]
    default: some
output_contract:
  format: markdown
  sections: [In one paragraph, What changes, Reading order, Risky hunks, Questions for the author, Not covered]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Faced with a 2,000-line diff in alphabetical file order, reviewers skim, approve the parts they understand and miss the hunk that matters. The fix is not a second reviewer but a guide: what the change is trying to do, which files carry the idea and which are mechanical fallout, the order that makes the diff read like a story, and where a careful reviewer should slow down. This prompt prepares the reviewer; it does not do the review or pass a verdict.
</context>

<task>
Prepare a reviewer to review this change. The reviewer's familiarity with the code is: {{reviewer_familiarity}}.

<diff>
{{diff}}
</diff>

{{#pr_description}}
<pr_description>
{{pr_description}}
</pr_description>
{{/pr_description}}

1. If {{diff}} is a URL or branch name, fetch the diff and the PR description with the tools you have. If you cannot, ask for the diff once and stop.
2. Read the whole diff before writing anything. Where the repo is available, read the surrounding code of the main changed functions so your explanation is right about what the code did before.
3. Work out the intent: what problem the change solves and how, in terms of behaviour. If the PR description and the diff disagree, say so.
4. Group the changed files into: core logic (where the idea lives), interfaces and contracts (APIs, schemas, public types, config), data changes (migrations, backfills), tests, and mechanical changes (renames, moves, generated code, formatting, dependency bumps). Give approximate line counts per group so the reviewer knows where the real reading is.
5. Propose a reading order that builds understanding: usually contracts and data shapes first, then the core logic in call order, then the callers, then tests, with mechanical changes last or skipped. Give one line per stop saying what to look for there.
6. Point out the risky hunks with `path:line` references: behaviour changes hidden in refactors, changed defaults, concurrency, error handling, migrations and backwards compatibility, security-sensitive code, and anything with no test. Say why each deserves attention; do not claim a bug unless you can name the input that triggers it.
7. Write questions for the author that a reviewer would need answered to approve: missing context, unexplained decisions, rollout and rollback, test coverage gaps.
8. Adjust depth to familiarity: for new, explain the domain terms, the modules involved and how a request flows through them before the reading order; for some, explain only the parts of the system this change touches; for owner, skip background and focus on the diff and its risks.
</task>

<constraints>
- Do not approve, reject or give a verdict. The reviewer decides.
- Describe what the code does, not what the author probably meant, and mark any inference about intent as an inference.
- Every claim about a hunk cites `path:line` or a function name from the diff.
- If the diff is too large to read fully in one pass, say which parts you read closely and which you only skimmed.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## In one paragraph
What the change does, why, and how big it really is once mechanical changes are excluded.
## What changes
Table: group, files, approximate lines, what changes in behaviour.
## Reading order
Numbered stops: `path` (or function), what to look for.
## Risky hunks
Numbered: `path:line`, what is risky and why, what to check.
## Questions for the author
Numbered.
## Not covered
What you did not read closely or could not verify, or "Nothing".
</output_format>
