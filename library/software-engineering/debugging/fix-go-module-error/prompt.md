---
schema: 1
id: fix-go-module-error
kind: prompt
title: Fix a Go module error
description: "Fixes Go module errors: checksum mismatches, private module access, missing go.sum entries, replace directives, version selection and vendoring."
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer, devops-engineer]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [go-modules, go-sum, goproxy, private-modules]
pairs_with:
  prompts: [resolve-dependency-conflict, triage-failing-ci]
  personas: [go-engineer]
args:
  - name: error
    description: "The full output of the failing go command (go build, go mod tidy, go get), as printed."
    type: text
    required: true
  - name: context
    description: "Where it fails (laptop, CI, Docker build), the Go version, and whether private repositories, a corporate proxy or GOPROXY/GOPRIVATE settings are involved."
    type: text
output_contract:
  format: markdown
  sections: [What the go command was doing, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Go engineer who knows how the module system resolves and verifies dependencies. The go command picks versions by minimal version selection from every go.mod in the graph, downloads them through GOPROXY (default proxy.golang.org, then direct), and checks each against go.sum and the checksum database (sum.golang.org). Errors map onto those steps:
- `missing go.sum entry` or `updates to go.mod needed`: go.mod and go.sum are out of date after an edit or a merge; `go mod tidy` fixes it.
- `checksum mismatch` / `SECURITY ERROR`: the tag was moved or force-pushed after being cached, or a go.sum was edited by hand. Never delete the check; find out which side changed.
- Private modules: `410 Gone` or `404` from the proxy, `terminal prompts disabled`, or checksum database lookups for a private path. Set `GOPRIVATE` (which implies GONOSUMDB and GONOPROXY) for the organisation's path and give git credentials (a `.netrc` or an `insteadOf` rule with a token, or SSH) where the build runs.
- Major versions: a v2+ module must have `/v2` in its module path and imports; `+incompatible` means a v2+ tag without a go.mod.
- `replace` directives: they only apply in the main module, so a library's replace is ignored by its users; a local path replace breaks CI and Docker builds where that path does not exist.
- Vendoring: with a `vendor/` directory, the build uses it by default and fails with "inconsistent vendoring" when go.mod changed without `go mod vendor`.
- The `go` and `toolchain` lines: a newer `go` directive than the installed toolchain triggers a toolchain download or fails when GOTOOLCHAIN=local.
- Workspaces: a `go.work` file silently overriding module versions locally but not in CI.
</context>

<task>
Error:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Read go.mod, go.sum (the lines for the module named), any go.work and vendor/ directory, and how the failing environment sets GOPROXY, GOPRIVATE, GOFLAGS and GOTOOLCHAIN (`go env`).
2. Say which step failed and for which module and version.
3. Name the cause. If it depends on something you cannot see (a moved tag, credentials in CI), give the command that settles it (`go list -m -versions <module>`, `go mod why -m <module>`, `go mod graph | grep`, `git ls-remote` on the tag) and what each answer means.
4. Fix it: `go mod tidy`, a correct `go get module@version`, the right `/vN` import path, GOPRIVATE plus credentials in the build environment, removing or scoping a local replace, re-vendoring, or aligning the toolchain line. Give Docker and CI specifics if that is where it fails.
5. Run `go mod tidy`, then `go build ./...` and `go test ./...`, and show the go.mod and go.sum diff.
</task>

<constraints>
- Never set `GOSUMDB=off`, a broad `GONOSUMDB` or `GOINSECURE`, or delete go.sum lines, to get past a checksum mismatch. Explain what changed instead.
- Never put tokens in go.mod, Dockerfiles or committed config; use build secrets or CI secret variables.
- Do not upgrade unrelated modules while fixing one.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the go command was doing
The module, version and step that failed (download, checksum verification, version resolution, build).
## Cause
The cause in one paragraph.
## Fix
The commands or go.mod changes, in order.
## Verification
The commands run afterwards (`go mod tidy`, `go build ./...`, `go test ./...`) and their results.
</output_format>
