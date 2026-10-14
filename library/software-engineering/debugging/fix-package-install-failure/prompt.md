---
schema: 1
id: fix-package-install-failure
kind: prompt
title: Fix a failing package install
description: Fixes npm, pip, Poetry or gem install failures caused by native builds, missing wheels, registry auth, proxies, certificates or platform mismatches.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, devops-engineer]
stack: [nodejs, python, ruby]
requires: [none]
inputs: [logs, config]
output: [explanation, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [npm, pip, node-gyp, native-extensions, proxies]
pairs_with:
  prompts: [resolve-dependency-conflict, fix-module-import-error]
args:
  - name: error
    description: "The install output from the first error, with the exact command (npm ci, pip install -r, poetry install, bundle install)."
    type: text
    required: true
  - name: context
    description: "OS and CPU architecture (for example macOS arm64, Windows, Alpine), language and package manager versions, and whether you are behind a corporate proxy or using a private registry."
    type: text
output_contract:
  format: markdown
  sections: [What failed, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has fixed many broken installs. Install failures are a different problem from version conflicts: the resolver found versions, but fetching or building one failed. Know which step failed:
- Native builds: npm packages using node-gyp need Python and a C++ toolchain (Xcode Command Line Tools, build-essential, Visual Studio Build Tools); pip falls back to building from source when no wheel matches the Python version, OS or CPU, and then needs a compiler and headers (`libpq-dev`, `libffi-dev`, OpenSSL). A brand-new Python release often has no wheels yet for popular packages; Alpine (musl) gets fewer wheels than glibc.
- Architecture: Apple Silicon versus x86_64 (a Rosetta terminal installs the wrong binaries), Docker images built on arm64 laptops and run on amd64 servers, prebuilt binaries (esbuild, sharp, Prisma engines) installed for one platform and copied to another via a committed `node_modules` or a cached layer.
- Registry and network: 401/403 from a private registry (`.npmrc` token, pip `--index-url`, Poetry sources), corporate proxies (`HTTPS_PROXY`), TLS interception causing `self-signed certificate in certificate chain` or `CERTIFICATE_VERIFY_FAILED`, which needs the corporate CA added (`NODE_EXTRA_CA_CERTS`, `PIP_CERT`, `REQUESTS_CA_BUNDLE`), not verification turned off.
- Permissions: `EACCES` on global npm installs or pip installing into the system Python ("externally-managed-environment", PEP 668), which is a sign to use a virtual environment or a version manager, not `sudo`.
- Lockfile and engine mismatches: `npm ci` refusing an out-of-sync lockfile, `engines` or `python_requires` rejecting the runtime version.
</context>

<task>
Install output:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Find the first real error and say which step failed for which package. Ignore the noise after it (npm prints "A complete log of this run" and cascading errors).
2. Name the cause. If it depends on facts not given (the architecture, the Python version, proxy settings), give the one or two commands that settle it (`node -p process.arch`, `python -c "import platform,sys; print(sys.version, platform.machine())"`, `npm config get registry`, `pip debug --verbose` for supported wheel tags) and what each result means.
3. Give the fix for this OS in order: install the build toolchain or headers, use a Python version that has wheels, run in a virtual environment, install for the right architecture, add the corporate CA through the documented variable, set registry credentials through environment variables, regenerate the lockfile only if it is genuinely out of sync.
4. If it fails in Docker or CI, give the change for that environment too (base image, build packages in a build stage, a platform flag, a cache key that includes the architecture).
5. Say how to confirm it worked.
</task>

<constraints>
- Never suggest disabling TLS verification (`strict-ssl=false`, `NODE_TLS_REJECT_UNAUTHORIZED=0`, `--trusted-host` for public indexes) or `sudo npm install -g`/`sudo pip install` as the fix.
- Never suggest `--break-system-packages` without explaining the risk; prefer a virtual environment.
- Never put registry tokens in committed files.
- Do not invent package versions with wheels for a platform; say how to check.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What failed
The package and the step that failed: download, authentication, building a native extension, or a post-install script.
## Cause
The cause in one paragraph, or the one command that settles it.
## Fix
The commands or config changes, in order, for this OS.
## Check
How to confirm the install works, including in CI or Docker if that is where it failed.
</output_format>
