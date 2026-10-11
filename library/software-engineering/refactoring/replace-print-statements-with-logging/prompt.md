---
schema: 1
id: replace-print-statements-with-logging
kind: prompt
title: Replace print statements with logging
description: Replaces print and console.log debugging in a script or service with a configured logger, sensible levels and context, while keeping the program's intended user-facing output intact.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer, data-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [logging, log-levels, debug-output, stdout-stderr]
pairs_with:
  prompts: [modernize-python-idioms, tidy-research-script]
  rules: [logging-rules]
args:
  - name: target
    description: The script, service or folder to convert, as paths or pasted code, its language, and how it runs (CLI tool, cron job, web service, notebook-turned-script).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests or a sample run, if any.
    type: string
output_contract:
  format: markdown
  sections: [Output inventory, Logging setup, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer turning ad hoc prints into real logging. Not every print is debugging: a CLI tool's results, a report written to stdout, or output another program parses through a pipe are the program's interface and must stay prints (on stdout, in the same format). Logs are diagnostic, go to stderr or a log handler, and can be silenced by level. Mixing them breaks pipelines: a script whose stdout is piped into `jq` fails as soon as a log line lands on stdout.

Good conversion: one logger per module (`logging.getLogger(__name__)` in Python, the project's logger elsewhere), configured once at the entry point, never in library modules. Levels by meaning: `debug` for detail useful only while investigating, `info` for milestones a person running it wants to see (started, processed 10,000 rows, finished), `warning` for something odd but handled, `error` with the exception (`logger.exception` in an except block keeps the traceback, which a printed message loses). Pass values as arguments rather than pre-formatting strings so disabled levels cost nothing, and use structured fields if the project logs JSON. Remove prints that only dumped whole objects during a past debugging session, after checking nobody relies on them. Never log secrets, tokens or full personal records that prints used to show on a developer's screen.
</context>

<task>
Convert the output in {{target}}.

1. List every print or console call and classify it: user-facing output (keep), progress or milestone (info), detail (debug), handled problem (warning), failure (error or exception), or leftover debug dump (remove). Note anything that prints secrets or personal data.
2. Set up logging once at the entry point following the project's existing logger if there is one: level from a flag or environment variable, format with time, level and module, output to stderr or the configured handler. Library modules only get a module logger.
3. Replace the calls, passing values as arguments, using exception logging in except blocks, and redacting or dropping sensitive values.
4. Run the tests or a sample run{{#test_command}} with `{{test_command}}`{{/test_command}} and show that stdout still contains exactly the user-facing output, and that logs appear at the default level as intended.
</task>

<constraints>
- User-facing stdout output stays byte-for-byte the same.
- Do not configure logging inside library modules or at import time.
- Do not log secrets, credentials or personal data.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Output inventory
Table: line, current call, classification, new form.
## Logging setup
Where and how logging is configured, default level and how to change it.
## Diff
The change.
## Check
Sample run or tests showing stdout and logs.
</output_format>
