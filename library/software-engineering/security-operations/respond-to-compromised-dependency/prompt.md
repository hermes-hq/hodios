---
schema: 1
id: respond-to-compromised-dependency
kind: prompt
title: Respond to a compromised dependency
description: Responds to news that a package you use was hijacked or backdoored, finding affected lockfiles, builds and machines, treating secrets as exposed where it ran, and pinning safe versions.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [security-engineer, software-engineer, devops-engineer]
requires: [repo-read]
inputs: [repo, text]
output: [report, checklist, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [software-supply-chain, malicious-package, lockfiles, install-scripts, secret-rotation]
pairs_with:
  prompts: [vet-dependency, investigate-ci-cd-compromise, respond-to-leaked-secret, respond-to-critical-cve]
args:
  - name: advisory
    description: The advisory or report - package name, ecosystem, malicious versions, publish and removal times, and what the malicious code does if known. Paste the text.
    type: text
    required: true
  - name: environment
    description: Where the package could be - repositories, CI systems, container images, developer machines, servers - and the package managers in use.
    type: text
    required: true
  - name: findings
    description: Optional search results already gathered from lockfiles, CI logs or SBOMs.
    type: text
output_contract:
  format: markdown
  sections: [Advisory facts, Exposure search, Affected list, Where it ran, Rotate, Clean and pin, Prevent a repeat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A hijacked package release is different from a vulnerable one: the code is hostile on purpose, and in ecosystems with install hooks (npm `preinstall` and `postinstall`, Python source distributions running `setup.py`, and similar) it runs the moment someone installs it, before any of your code imports it. That means the exposed places are not only production but every developer laptop and CI job that installed the version during the window, and the targets are usually the secrets present there: environment variables, cloud credential files, `.npmrc` and `.pypirc` tokens, SSH keys, browser data. Recent campaigns also used stolen publish tokens to republish the victims' own packages, so a team that maintains packages must check its own releases. Lockfiles are the fastest map of exposure, but ranges in manifests, cached layers in container images and lockfile-less installs (global tools, Dockerfiles running `npm install` or `pip install` without pins) also count. The response is decided by facts in the advisory, which must be quoted, not remembered.
</context>

<task>
Respond to this advisory:

<advisory>
{{advisory}}
</advisory>

<environment>
{{environment}}
</environment>
{{#findings}}

<findings>
{{findings}}
</findings>
{{/findings}}

1. Advisory facts: extract package, ecosystem, malicious versions, window, behaviour and indicators exactly as stated. List what is missing and stop to ask if the malicious versions are unknown.
2. Exposure search: if you have repository access, search the lockfiles and manifests yourself (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `poetry.lock`, `Pipfile.lock`, `requirements*.txt`, `go.sum`, `Gemfile.lock`, `Cargo.lock` and others for the ecosystem), including transitive entries, and report each hit with file and line. Give equivalent commands for other repositories, CI logs, container images or SBOMs, and developer machines.
3. Affected list: table of every place the malicious version is or was present, with whether it was installed during the window.
4. Where it ran: for each affected place, decide whether the malicious code executed (install hooks, import at runtime) and what it could reach. Look for the advisory's indicators in network and EDR logs.
5. Rotate: secrets on every machine and CI job where it ran, highest blast radius first, and a check of audit logs for their use. If you publish packages, check your own registry releases in the window for unexpected versions.
6. Clean and pin: move to the advisory's safe version, update lockfiles, clear package manager caches and rebuild container images from clean layers; for developer machines where it ran, decide between targeted cleanup per the advisory and reimaging.
7. Prevent a repeat: lockfiles enforced in CI (`npm ci` or equivalent), a minimum release age or cooldown for new versions, install scripts disabled by default where the ecosystem allows, scoped and short-lived publish tokens, and point to dependency vetting.
</task>

<constraints>
- Quote the advisory for versions and behaviour. Never guess malicious versions, indicators or safe versions.
- Read files and run searches only; editing lockfiles, clearing caches or rebuilding images are changes to confirm with the user first.
- Do not print secret values found during the search.
- Separate what you verified in the repository from what the user must check elsewhere.
{{> output/uncertainty}}
</constraints>

<output_format>
## Advisory facts
Bullets quoting the advisory, plus missing facts.

## Exposure search
What was searched, commands for the rest, results.

## Affected list
Table: Location | Version | Installed in window? | Ran? | Evidence.

## Where it ran
Bullets per location with reachable secrets.

## Rotate
Ordered list with audit-log checks.

## Clean and pin
Ordered list, changes marked "(confirm first)".

## Prevent a repeat
Short list.
</output_format>
