---
schema: 1
id: fix-container-exits-on-start
kind: prompt
title: Fix a Docker container that exits on start
description: Finds why a Docker or Compose container exits immediately or keeps restarting by reading the exit code, logs, entrypoint and command, environment, file permissions and architecture.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, backend-engineer, devops-engineer]
stack: [docker]
requires: [none]
inputs: [logs, config, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [entrypoint, exit-codes, restart-loop, oom-kill, cpu-architecture]
pairs_with:
  prompts: [fix-docker-build-failure, diagnose-crashlooping-pod]
args:
  - name: symptom
    description: What you see, for example "Exited (1) right after start", "Restarting (137)", "exec format error", "no such file or directory" for a file that exists, plus the output of docker logs or docker compose logs for the container.
    type: text
    required: true
  - name: setup
    description: The Dockerfile (especially ENTRYPOINT, CMD, USER and the final stage), the run command or compose service, the host and image architecture if known, and what changed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the exit says, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes containers that will not stay up by reading the exit code and the last log lines first. What they usually mean:
- Exit 0 straight away: the main process finished. The command runs something that daemonises or returns (a service started with `&`, `service nginx start`, a shell script that ends), or the image's default command is a shell with no TTY.
- Exit 1 or another app code: the app failed; the log says why. Common reasons are a missing environment variable or secret, a config file not mounted, a database not ready yet, or a port already in use.
- 126: the file is not executable (missing `chmod +x`, or a `noexec` mount). 127: command not found, wrong `PATH`, or a missing interpreter.
- "no such file or directory" for a script that exists: Windows CRLF line endings in the shebang line, or a shebang pointing at `/bin/bash` in an Alpine image that only has `sh`.
- "exec format error": the image was built for another CPU architecture (arm64 on an Apple Silicon laptop versus amd64 servers), or a script has no shebang.
- 137: killed by SIGKILL, usually out of memory (check `OOMKilled` in `docker inspect`) or a stop timeout. 139: segmentation fault, often a native library built for another libc (glibc versus musl on Alpine).
- 143: stopped by SIGTERM, normal on shutdown.
- Shell form `CMD npm start` runs under `/bin/sh -c`, so signals do not reach the app; `ENTRYPOINT` and `CMD` combine in ways that surprise people (CMD becomes arguments to ENTRYPOINT).
- Permission errors after adding `USER` to the Dockerfile: files copied as root, a volume owned by another uid.
</context>

<task>
Find why this container exits.

Symptom and logs:
{{symptom}}

Dockerfile and run config:
{{setup}}

1. If you can read the repository, open the Dockerfile, any entrypoint script, the compose file and the app's required configuration before answering.
2. Say what the exit code and last log lines mean.
3. If they are missing or unclear, give the commands to get them: `docker ps -a` for the exit code, `docker logs <container>`, `docker inspect <container>` for `State.OOMKilled` and `State.ExitCode`, `docker image inspect` for the architecture, and running the image with a shell entrypoint override to look inside. Ask for the output and stop.
4. Name the cause.
5. Give the fix as a Dockerfile, script or compose diff: run the app in the foreground with exec form, add the executable bit at build time, normalise line endings, use `sh` or install `bash`, build for the target platform (`--platform` or buildx), provide the missing variable or file, add a healthcheck-based wait, raise the memory limit only after checking real usage, or fix ownership for the runtime user.
6. Give the check: the container stays up, its health check passes, and `docker stop` ends it cleanly with exit 0 or 143.
</task>

<constraints>
- Do not suggest `tail -f /dev/null` or `sleep infinity` as the command to "keep it running"; that hides the failure.
- Do not suggest running as root or `--privileged` to fix permission errors.
- Do not put secrets into the Dockerfile or image layers when fixing a missing variable.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What the exit says
Exit code and log meaning.
## Cause
The cause, or the commands to run.
## Fix
Diff.
## Check
How to confirm it stays up and stops cleanly.
</output_format>
