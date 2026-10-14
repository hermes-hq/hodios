---
schema: 1
id: find-ignored-config-setting
kind: prompt
title: Find why a setting is ignored
description: Finds why a configuration value or environment variable has no effect by tracing where the program loads settings, which source wins, and what value it actually sees at runtime.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, backend-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [config, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [environment-variables, configuration, precedence, dotenv, twelve-factor]
pairs_with:
  prompts: [extract-configuration-from-code, debug-production-only-bug]
args:
  - name: setting
    description: The setting you changed, where you changed it and what you expected, for example "set LOG_LEVEL=debug in .env but logs are still at info".
    type: text
    required: true
  - name: setup
    description: How the program is started (command, Docker, compose, Kubernetes, systemd, IDE) and the code or framework that loads configuration, plus the files that may set the value.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Every place this value can come from, What the program actually sees, Cause, Fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who settles "my setting is ignored" by printing the effective value inside the running process, then working back to the source that set it. Settings usually come from several layers with a precedence order the author did not know: built-in defaults, one or more config files (and which one is found depends on the working directory or a profile), `.env` files, real environment variables, command-line flags, a secrets manager or remote config, and framework profiles such as `application-prod.yml` or `NODE_ENV`-specific files.

Common causes:
- Many `.env` loaders do not override variables already set in the environment, so a stale exported variable wins.
- `.env` is read relative to the working directory, which differs under systemd, cron, Docker or an IDE.
- The value is read once at import or build time and cached: front-end bundlers inline `import.meta.env` or `process.env` at build time, so changing it at runtime does nothing until a rebuild; Docker `ARG` exists only during the build.
- The variable name is not the one the code reads: a missing prefix (`VITE_`, `NEXT_PUBLIC_`, `REACT_APP_`), a different case, a nested key delimiter such as `__`, or a typo that silently falls back to the default.
- The process was not restarted, or the change went to a different container, pod or replica; Kubernetes does not update environment variables from a changed ConfigMap in running pods.
- Type coercion: `"false"` is a truthy string, `"0"` may be truthy, and an empty string may count as unset.
</context>

<task>
Find why this setting has no effect.

Setting:
{{setting}}

How the program starts and loads config:
{{setup}}

1. List every source that can set this value in this setup, in the precedence order the framework or code applies, citing the code or documented behaviour you rely on. Mark anything assumed.
2. Give the way to see the effective value inside the running process: a startup log line with the resolved config (with secrets masked), a debug endpoint, `printenv` inside the container (`docker exec`, `kubectl exec`), `/proc/<pid>/environ`, or the framework's config dump command. Ask for the output if needed and stop.
3. Compare the effective value with the expected one and name the layer that wins or the step where the value is lost (wrong name, not loaded, overridden, read at build time, stale process, coercion).
4. Give the fix at that layer, and if the code made the mistake easy (silent fallback to a default, reading the variable in many places), propose a small change: validate required settings at startup and log where each value came from.
</task>

<constraints>
- Never print or ask the user to paste secret values; show how to mask them.
- Do not claim a framework's precedence order unless you are sure; if unsure, say how to confirm it in its documentation or with a quick experiment.
- Do not suggest hard-coding the value in code as the fix.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Every place this value can come from
Ordered list, highest precedence first, each marked known or assumed.
## What the program actually sees
How to read the effective value, and the value if known.
## Cause
The winning layer or the step where the value is lost.
## Fix
The change, and any startup validation to add.
</output_format>
