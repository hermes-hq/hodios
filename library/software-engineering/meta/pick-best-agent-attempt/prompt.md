---
schema: 1
id: pick-best-agent-attempt
kind: prompt
title: Pick the best of several agent attempts
description: Compares several coding agent attempts at the same task against the requirements, test evidence, diff size and hidden shortcuts, then picks one to merge, combines parts or rejects them all.
category: meta
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [diff, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, best-of-n, code-comparison]
pairs_with:
  prompts: [review-ai-generated-code, benchmark-coding-agents-on-repo, review-agent-transcript]
args:
  - name: task
    description: The task all attempts were given, with its acceptance criteria.
    type: text
    required: true
  - name: attempts
    description: Each attempt's diff or branch summary, labelled, with its test or check output if available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Comparison, Shortcuts found, Combine or not, Feedback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Running several agents on the same task and keeping the best is a cheap way to raise quality, but only if the choice is made well. Judged at a glance, the attempt with the biggest diff and the most confident summary wins, which rewards over-engineering. What actually separates attempts: does it meet each acceptance criterion, is there real evidence the checks ran, did it weaken or delete tests, hardcode expected values or special-case the test input, did it stay in scope and follow the codebase's existing patterns. When the smaller correct attempt exists, it wins. When every attempt fails in the same place, the task description is the problem, not the agents. Combining parts from different attempts is tempting but often mixes incompatible assumptions.
</context>

<task>
Compare these attempts.
<task_text>
{{task}}
</task_text>
<attempts>
{{attempts}}
</attempts>

1. Turn the task into a checklist of acceptance criteria and constraints.
2. For each attempt, check every criterion (met, not met, unclear) with the line or output that shows it.
3. Look for shortcuts in each: tests deleted, skipped or loosened; assertions changed to match new output; hardcoded values or branches keyed to test data; errors swallowed; mocks replacing the code under test; unrelated files changed; new dependencies.
4. Check the evidence: did the attempt's own output show the checks running and passing, or only claim it?
5. Compare on correctness first, then scope and size, then fit with existing patterns, then readability.
6. Decide: pick one, combine (only if the parts are independent; say exactly which hunks and what to re-test), or reject all and say what the task description is missing if they share a failure.
7. Write short feedback for the instruction file or task template that would have prevented the failures seen.
</task>

<constraints>
- Prefer the smaller attempt when two are equally correct.
- Do not trust an attempt's summary of itself; judge from the diff and the outputs.
- If no test output was supplied, say the comparison is based on reading only and which checks to run before merging.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Chosen attempt, combination or none, and the deciding reason.
## Comparison
Table: criterion, then one column per attempt with met, not met or unclear.
## Shortcuts found
Per attempt, with file and line, or "None found".
## Combine or not
The hunks to take and the checks to rerun, or why not.
## Feedback
One to three lines for the instruction file or task template.
</output_format>
