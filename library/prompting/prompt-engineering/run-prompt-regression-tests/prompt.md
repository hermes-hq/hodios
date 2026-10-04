---
schema: 1
id: run-prompt-regression-tests
kind: prompt
title: Run prompt regression tests
description: "Runs a prompt test set against the current and candidate prompt versions with the project's command, grades outputs with the stated checks and reports regressions, wins and flaky cases side by side."
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [verify]
role: [ml-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [report, table]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [regression-check, prompt-evals, golden-set, ab-comparison, flaky-outputs]
pairs_with:
  prompts: [build-prompt-test-set, write-judge-prompt, diagnose-prompt-failures, improve-prompt]
  workflows: [prompt-iteration-track]
args:
  - name: test_set_path
    description: "Path to the test set in the project (YAML, JSON, JSONL or CSV), with an input and a pass criterion per case."
    type: string
    required: true
  - name: prompt_versions
    description: "The current (baseline) and candidate prompt versions, as file paths, git refs or ids the run command understands, for example 'baseline: prompts/summary.v3.md, candidate: prompts/summary.v4.md'."
    type: text
    required: true
  - name: run_command
    description: "The command that runs one prompt version over the test set and writes outputs, with how to pass the version, for example 'npm run eval -- --prompt <path> --out <dir>'."
    type: string
    required: true
  - name: runs_per_case
    description: "How many times to run each case per version, to separate real regressions from random variation."
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Setup, Run summary, Regressions, Wins, Flaky cases, Still failing, Verdict, Files written, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A prompt change that fixes one case often breaks others, and model outputs vary from run to run, so a single side-by-side run on a few inputs proves little. A regression run executes the same fixed test set against the baseline and the candidate with identical settings, repeats each case several times, grades every output with the checks written in the test set, and reports per case: regressions (baseline passed, candidate failed), wins, cases that fail in both, and flaky cases whose results vary between runs. The value of the report depends on not touching the test set, the graders or the prompts during the run.

Test set: {{test_set_path}}
Run command: {{run_command}}
Runs per case: {{runs_per_case}}

<prompt_versions>
{{prompt_versions}}
</prompt_versions>
</context>

<task>
1. Inspect the project: read the test set, the run command's script or config, any existing grader or judge setup, previous results folders, and both prompt versions. Confirm each version exists and that every case has an input and a pass criterion. If the test set, a version or the run command cannot be found, or cases lack pass criteria, report exactly what is missing and stop; do not write criteria yourself.
2. Check the environment: that required settings or keys are present (never print their values), and that both versions will run with the same model, temperature and other generation settings. Count the model calls the run needs (cases x versions x runs). If no budget was stated and the count is in the hundreds or more, or the command would call a paid service the user did not mention, report the count and stop for confirmation.
3. Smoke-test: run one case for each version and confirm outputs are written where expected.
4. Run the full set for both versions, {{runs_per_case}} runs per case, into a new timestamped results folder. Never overwrite earlier results.
5. Grade every output with the check stated in the test set: deterministic checks (exact, contains, regex, length, valid JSON or schema) in code; rubric checks with the project's configured judge if there is one. If there is no judge, grade rubric cases yourself, mark those grades as unconfirmed, and quote the evidence for each.
6. Compare per case: pass rate per version, then classify as regression, win, both pass, both fail, or flaky (results differ across runs within a version).
7. Verify before reporting: rerun each regression once more to rule out variation; read a sample of graded outputs, including some passes, to check the graders behave correctly; and sanity-check totals (for example a grader that passes everything or fails everything is suspect).
8. Write a results file (Markdown or the project's format) and the report.
</task>

<constraints>
- Do not edit the test set, graders, prompts or run settings during the run. If one looks wrong, say why in the report and ask before changing it.
- Report real results only, including failed or partial runs; never fill gaps with expected outcomes.
- Keep secrets and any personal data in outputs out of the report; refer to cases by id.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Setup
Versions compared, settings, test set size, runs per case, judge used.
## Run summary
Table: Version | Cases passed (all runs) | Pass rate | Regressions | Wins | Flaky.
## Regressions
One entry per case: id, what the baseline did, what the candidate did, the failed check, a short quote of the output.
## Wins
Same format.
## Flaky cases
Case id and pass counts per version.
## Still failing
Cases failing in both versions, one line each.
## Verdict
Adopt, adopt with fixes, or do not adopt, with the reason; never adopt a candidate that newly fails a safety or refusal case.
## Files written
One line per file.
## Verification
The checks run and their real results.
</output_format>
