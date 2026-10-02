---
schema: 1
id: vet-dependency
kind: prompt
title: Vet a dependency before adding it
description: Checks a third-party package for supply-chain risk, maintenance health, license fit and real need before it is added or upgraded. Use when a PR adds a new dependency or bumps one.
category: security
version: 1.0.0
status: experimental
stage: [review]
role: [software-engineer, security-engineer, tech-lead]
stack: []
requires: [repo-read, web]
inputs: [text, diff]
output: [report]
risk: network
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [supply-chain, dependencies, licensing]
pairs_with:
  personas: [security-auditor]
  prompts: [review-pr-for-security]
args:
  - name: package
    description: Package name with its ecosystem and version, for example "npm:left-pad@1.3.0" or "pypi:requests==2.32.3". A diff of a manifest or lockfile also works.
    type: text
    required: true
  - name: purpose
    description: What the project needs the package for.
    type: text
  - name: license_policy
    description: Licenses the project accepts or rejects, for example "permissive only, no GPL or AGPL".
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Evidence, Risks, Alternatives]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every dependency runs with the project's privileges and brings its own dependencies along. Typosquats, hijacked maintainer accounts, malicious install scripts and abandoned packages with open vulnerabilities are common ways into a codebase. A short check before adding a package is far cheaper than removing it after an incident.
</context>

<task>
Vet {{package}}.
{{#purpose}}The project needs it for: {{purpose}}{{/purpose}}
{{#license_policy}}License policy: {{license_policy}}{{/license_policy}}

1. Identity: confirm the exact name against the registry and the source repository it links to. Flag names one edit away from a popular package, a registry entry with no source link, or a source repo that does not match the published package.
2. Install-time behaviour: check for install, preinstall or postinstall scripts, native builds, binary downloads, and any network or file system access at import time.
3. Maintenance: latest release date, release cadence, number of active maintainers, recent ownership or maintainer changes, open security advisories, and whether known vulnerabilities are fixed in the requested version.
4. Footprint: number of transitive dependencies it adds and anything risky among them. In a repo, compare against the lockfile to see what is new.
5. License: the package's license and any transitive license that conflicts with the policy.
6. Need: whether the project already has a dependency or standard library feature that does the job, and how much code the package saves.
Use your tools to look things up. For every fact, say where it came from (registry page, advisory database, repository). If you cannot reach a source, write "not checked" for that item instead of guessing.
</task>

<constraints>
- Never state download counts, dates, versions, advisories or maintainer facts from memory. Only report what you looked up in this session, with its source.
- Do not install, import or run the package to test it.
- Judge the specific version requested, not the package in general.
- A verdict of `reject` needs at least one concrete reason from the evidence.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: `adopt`, `adopt-with-conditions` (state them, for example "pin to 2.3.1"), or `reject`, plus the main reason.

## Evidence
| Check | Finding | Source |
One row each for identity, install scripts, maintenance, advisories, footprint, license and need. Use "not checked" where you could not verify.

## Risks
Bullets, most serious first. "None found" if empty.

## Alternatives
Up to three: a standard library feature, an existing dependency, or a better-maintained package, each with one line on the trade-off. "None needed" if the package is a good fit.
</output_format>
