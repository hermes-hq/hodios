---
schema: 1
id: grant-ci-access-to-private-repos
kind: prompt
title: Grant CI access to other private repos
description: Gives CI and deploy jobs read access to other private repositories, submodules or private packages using deploy keys, app installation tokens or scoped tokens, with least privilege.
category: git
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, software-engineer, security-engineer]
stack: [git, github-actions, gitlab-ci]
requires: [none]
inputs: [config, text]
output: [plan, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deploy-keys, app-tokens, submodules, private-packages, least-privilege]
pairs_with:
  prompts: [fix-git-in-ci-pipelines, set-up-keyless-ci-deploys, respond-to-leaked-secret]
args:
  - name: need
    description: What the job must read and where it runs, for example "GitHub Actions in acme/web must clone two private submodules and install a private npm package from acme/ui".
    type: text
    required: true
  - name: host
    description: Code host and plan if relevant, for example GitHub organisation, GitLab self-managed, Bitbucket Cloud or Azure DevOps.
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, Setup, Pipeline changes, Rotation and ownership, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CI job's built-in token usually reaches only the repository that runs it, so cloning a private submodule, a shared library or a private package fails. The common shortcut, a personal access token from whoever set up CI, is the worst option: it carries that person's full access, breaks when they leave, and is rarely rotated. Better options depend on the host. On GitHub, a deploy key is an SSH key bound to one repository (each key can be added to only one repository, so several repositories need several keys and SSH host aliases); a GitHub App installed on chosen repositories issues short-lived installation tokens with only the permissions granted; a fine-grained token is still tied to a user. On GitLab, the CI job token can be allowed to reach other projects through the target project's allowlist, and deploy tokens or project access tokens cover packages and registries. Package managers each read credentials differently (an `.npmrc` with an environment variable, pip index URLs, Go's `GOPRIVATE` with a `url.insteadOf` rewrite, Cargo and Maven credential files). Credentials baked into Docker image layers or printed in logs leak.

<need>
{{need}}
</need>
{{#host}}
Host: {{host}}
{{/host}}
</context>

<task>
1. List every access the job needs: which repositories or packages, read or write, from which pipelines (pull requests from forks included or not).
2. Recommend one mechanism per access, preferring in this order: the host's job token with an allowlist where it exists; an app installation token scoped to the needed repositories with read-only contents; per-repository read-only deploy keys; a dedicated machine account with minimal access only if nothing else works. Say why the alternatives lose for this case. Never recommend a personal token.
3. Give the setup steps on the host side: create the key, app or token, the exact permission to grant, where to store the secret, and which repositories or environments may use it.
4. Give the pipeline changes: how to mint or load the credential, how git uses it (SSH agent with host aliases for several deploy keys, or an `insteadOf` rewrite for HTTPS), how submodules are fetched, and how each package manager reads it. Use environment variables, never literal values.
5. For Docker builds, use build secrets or SSH forwarding so the credential is not stored in a layer.
6. Cover pull requests from forks: secrets are normally not available there, and say what the job should do instead.
7. Add rotation, expiry and an owner for each credential, and how to detect misuse.
</task>

<constraints>
- Grant read-only access unless the user states a need to write, and scope to the named repositories.
- Do not print tokens, put them in URLs that get logged, or commit them to files.
- Do not state current plan limits or prices; host features vary by plan, so say what to check.
- If the host is not given and cannot be inferred, ask before giving host-specific steps.
</constraints>

<output_format>
## Recommendation
A table: access needed | mechanism | permission | why.
## Setup
Numbered host-side steps.
## Pipeline changes
Configuration snippets in fenced blocks.
## Rotation and ownership
Bullets per credential.
## Risks
What could leak or break, and how to notice.
</output_format>
