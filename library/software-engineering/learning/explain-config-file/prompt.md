---
schema: 1
id: explain-config-file
kind: prompt
title: Explain a config file
description: Explains a config file such as tsconfig, Vite, webpack, nginx, docker-compose or a CI YAML setting by setting, marking what differs from defaults, what is risky and what does nothing.
category: learning
version: 1.0.0
status: incubating
stage: [learn, maintain]
role: [software-engineer, devops-engineer, frontend-engineer]
stack: []
requires: [none]
inputs: [config, file]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [configuration, defaults, build-tooling, code-reading]
pairs_with:
  prompts: [annotate-config-file, explain-code, explain-project-dependencies, find-ignored-config-setting]
args:
  - name: config
    description: The config file contents, or its path if the assistant can read the repository. Remove secrets first.
    type: text
    required: true
  - name: tool
    description: The tool and version the file is for (TypeScript 5.4, nginx 1.25, Docker Compose v2, GitHub Actions), if the file name does not make it obvious.
    type: string
  - name: question
    description: A specific question, for example "why are my path aliases ignored at runtime?"
    type: text
output_contract:
  format: markdown
  sections: [What this file controls, Setting by setting, Settings that matter most, Risky or dead settings, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Config files accumulate settings copied from templates and old answers until nobody knows which ones matter. Understanding one means knowing the defaults, because a line that restates a default does nothing and a missing line can be the important one. It also means knowing where settings interact or get overridden: `extends` and base files, environment variables, CLI flags, a second config the tool reads first, or options that only apply in another mode (a tsconfig `paths` alias that the bundler or runtime does not see, Compose `deploy.placement` ignored outside Swarm, an nginx `location` shadowed by a more specific one). Deprecated and misspelled keys are often silently ignored.
</context>

<task>
Explain this config file{{#tool}} for {{tool}}{{/tool}}:

```
{{config}}
```
{{#question}}
Question: {{question}}
{{/question}}

1. Identify the tool and, if possible, the version the syntax implies. If the version matters and is not given, say what you assumed.
2. Say in two or three sentences what this file controls and when the tool reads it. Name anything it inherits from (`extends`, includes, base images, reusable workflows) and anything that can override it.
3. Walk through every setting in file order, grouped by purpose. For each: what it does, the default, whether this value differs from the default, and the practical effect in this project.
4. Pick the three to five settings that most shape behaviour and explain them in more depth, with a concrete consequence of changing each.
5. Flag risky settings (security, such as disabled TLS checks, open CORS, `privileged: true`, secrets in plain text, `pull_request_target` with checkout; correctness, such as `skipLibCheck` hiding real errors; performance) and dead settings (default-restating, deprecated, misspelled, overridden or not applying in this mode). Say how to confirm each, for example the tool's command that prints the effective config.
6. If a question was asked, answer it directly before the walkthrough.
</task>

<constraints>
- Do not edit the file. Suggest changes only in the risky or dead list, as suggestions.
- State defaults for the tool version you assumed; if you are not sure of a default, say so rather than guess.
- If the file contains what looks like a secret, say it should be removed and rotated, and do not repeat its value.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this file controls
Two or three sentences, plus inheritance and overrides.
## Setting by setting
A table: setting, value, default, what it does here.
## Settings that matter most
Three to five short paragraphs.
## Risky or dead settings
Bullets labelled risky or dead, each with how to confirm. "None found" if none.
## Questions
What would change the explanation, such as the tool version or how the file is loaded.
</output_format>
