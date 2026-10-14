---
schema: 1
id: configure-ide-debugger
kind: prompt
title: Configure a working IDE debugger
description: Sets up a debugger configuration (VS Code launch.json, JetBrains run config, attach to Docker, Node or Python) so breakpoints actually hit.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [config, repo]
output: [config, explanation]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [launch-json, breakpoints, remote-debugging, source-maps]
pairs_with:
  prompts: [find-root-cause, debug-production-only-bug]
  personas: [debugger]
args:
  - name: goal
    description: "What you want to debug and how it normally runs: the start command, the language and framework, the IDE, and whether it runs locally, in Docker or Docker Compose, in WSL, or on a remote host."
    type: text
    required: true
  - name: problem
    description: "What happens now, if you already tried: breakpoints greyed out or \"unbound\", the debugger cannot connect, it stops in compiled code, or nothing happens."
    type: text
output_contract:
  format: markdown
  sections: [Setup chosen, Configuration, How to use it, If breakpoints still do not hit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who sets up debuggers for teams. Breakpoints that never hit almost always come from one of three gaps: the debugger is not attached to the process that runs the code, the source files it sees do not map to the code being run, or the runtime is not started with its debug protocol enabled. By stack:
- Node.js and TypeScript: start with `--inspect` (or `--inspect-brk`), bind to `0.0.0.0:9229` inside containers and publish the port; TypeScript needs source maps (`sourceMap` in tsconfig, or the runner's equivalent, such as tsx or ts-node) and `outFiles` matching the build output; watchers like nodemon need `restart: true` on attach.
- Browser code: source maps from the bundler, and the correct `webRoot`; the debugger must launch or attach to the browser, not to the dev server.
- Python: debugpy (`python -m debugpy --listen 0.0.0.0:5678 --wait-for-client`), `justMyCode` hiding library frames, Flask or Django reloaders spawning a child process (disable the reloader or use the framework's debug config), `pathMappings` between local and container paths.
- JVM: JDWP agent (`-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005`), Spring Boot devtools restarts, attach configs in IntelliJ or VS Code.
- Go: Delve (`dlv debug`, or `dlv --headless --listen=:2345` in a container), builds with optimisations disabled (`-gcflags=all="-N -l"`).
- .NET: the coreclr launch config, or `vsdbg` in containers.
- Containers and WSL: path mappings between the host workspace and the container path, and the debug port published only to localhost.
</context>

<task>
Set up a working debugger for this.

Goal and how it runs:
{{goal}}
{{#problem}}

What happens now:
{{problem}}
{{/problem}}

1. Read how the project starts (package.json scripts, Procfile, Dockerfile, docker-compose.yml, Makefile, existing `.vscode/launch.json` or `.idea` run configs) and reuse what exists.
2. Choose launch (the IDE starts the process) or attach (the process starts with a debug port and the IDE connects), and say why. Prefer launch for local processes and attach for containers, remote hosts and processes started by another tool.
3. Write the configuration: the launch.json or run config entry, plus the minimal change to start the runtime with debugging enabled (a separate `debug` script or compose override file, not a change to the production command).
4. Set source maps or path mappings so the IDE's files map to the running code.
5. Give the steps to start a session and a specific line to put a breakpoint on to prove it works.
6. List the checks if breakpoints still do not hit, most likely first for this setup.
</task>

<constraints>
- Keep debug ports bound to localhost or the private Docker network; never publish a debug port on a public interface or leave a debug agent in a production image or command. A debug port allows arbitrary code execution.
- Do not change the production start command or Dockerfile; add a separate debug script, target or override file.
- Match the IDE the user names; do not switch them to another editor.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Setup chosen
Launch or attach, and why for this setup.
## Configuration
The config files and any changes to start commands, Dockerfiles or compose files, as diffs.
## How to use it
The steps to start a session, and a breakpoint to test with.
## If breakpoints still do not hit
The checks for this setup, most likely first.
</output_format>
