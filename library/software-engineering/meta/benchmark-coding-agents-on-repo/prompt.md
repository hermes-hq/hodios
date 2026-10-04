---
schema: 1
id: benchmark-coding-agents-on-repo
kind: prompt
title: Benchmark coding agents on a repo
description: Builds a small benchmark from closed issues and their fixing commits to compare coding agents or settings, with task selection, hidden-test grading, cost and time capture and result reading.
category: meta
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [tech-lead, engineering-manager, software-engineer]
stack: []
requires: [none]
inputs: [repo, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [agent-evaluation, benchmark-design, hidden-tests, cost-tracking, tool-selection]
pairs_with:
  prompts: [plan-coding-agent-rollout, review-agent-transcript, make-issue-agent-ready]
args:
  - name: repo_description
    description: The repository - languages, size, test suite and how long it takes, how issues and fixes are linked (issue numbers in commits, PR links), CI, and the kinds of work you want agents to do.
    type: text
    required: true
  - name: candidates
    description: What you want to compare, for example two agent tools, one tool with different models or settings, or agent versus agent-plus-review. Leave empty to design the harness first.
    type: string
output_contract:
  format: markdown
  sections: [Question, Task selection, Task format, Grading, Run protocol, Measures, Reading results, Pitfalls, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design an internal benchmark that answers "which coding agent setup works best on our code?" with evidence instead of demos. Public leaderboards rarely predict performance on a specific codebase. The reliable approach is to replay real past work: take closed issues whose fix is a known commit, reset the repo to just before the fix, give the agent the issue, and grade with tests the agent cannot see. Home-made benchmarks go wrong when tasks are cherry-picked to be easy, when the agent can see the fix in git history, when grading is "it looks right", and when one run per task is treated as a reliable number.

{{#candidates}}Candidates: {{candidates}}{{/candidates}}
</context>

<task>
<repo_description>
{{repo_description}}
</repo_description>

1. Question: restate what decision the benchmark informs (adopt a tool, choose a setting, decide which task types to hand off), and what difference would change the decision.
2. Task selection: mine closed issues linked to a merged fix from the last 6 to 18 months. Keep tasks whose fix commit includes or can be paired with a test that fails before and passes after. Stratify by type (bug fix, small feature, refactor, test addition) and size (lines changed, files touched); aim for 30 to 60 tasks, enough to see differences, and hold out a third as a fresh set for later re-runs. Exclude tasks needing secrets, network services or manual judgement only.
3. Task format: for each task, the base commit (parent of the fix), the issue text as the user would have written it (no hints from the fix), the setup command, and the hidden grading tests stored outside the agent's workspace. Strip future history: a fresh clone at the base commit with no access to later commits, branches or the issue's pull request.
4. Grading: primary score is hidden tests pass and the existing suite stays green. Secondary: a blind human review on a sample (scope, readability, would we merge it) with a short rubric. Record partial results (compiles, some tests pass).
5. Run protocol: identical containers, time and cost limits per task, the same instructions file for all candidates, no human help, at least three runs per task per candidate to measure variance, and logs of every transcript.
6. Measures: resolve rate with a confidence interval, regressions introduced, median wall time, tokens or cost per task and per resolved task, human review score, and how often the agent stopped to ask versus guessed.
7. Reading results: compare per stratum, not only overall; use paired comparisons on the same tasks; treat differences within the run-to-run spread as no difference; read a sample of failures by hand to find patterns worth fixing in the instructions or repo.
8. Pitfalls: contamination (public repos may be in training data; prefer recent or private tasks and say so), tests that check implementation detail rather than behaviour, flaky tests, and drift when tools update mid-study.
</task>

<constraints>
- Do not invent the repo's commands, issue counts or results; use placeholders and ask.
- Keep agents away from production credentials and network services during runs.
- Present any expected numbers only as illustrations, clearly labelled.
- The benchmark measures this repo and these tasks; say that results do not generalise beyond them.
</constraints>

<output_format>
## Question
Two to four lines.
## Task selection
Criteria and a stratification table: type | size | target count.
## Task format
A sample task record in a fenced block (YAML or JSON).
## Grading
Bullets.
## Run protocol
Numbered.
## Measures
Table: measure | how captured | why it matters.
## Reading results
Bullets.
## Pitfalls
Bullets.
## Open questions
Bullets, or "None".
</output_format>
