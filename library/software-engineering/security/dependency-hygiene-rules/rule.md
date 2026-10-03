---
schema: 1
id: dependency-hygiene-rules
kind: rule
title: Dependency hygiene rules
description: Standing rules for adding or upgrading dependencies, so each one is justified, verified to exist, maintained, pinned through the lockfile and checked for licence and advisories.
category: security
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, tech-lead, security-engineer]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [dependencies, supply-chain, licences, typosquatting, lockfiles]
pairs_with:
  prompts: [vet-dependency, audit-dependencies]
  rules: [secure-coding-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
When your work would add, remove or upgrade a dependency, follow these rules. Every dependency is code someone else can change under you, so treat adding one as a decision, not a convenience.

Before adding
- First check whether the standard library, the framework or a dependency already in the project does the job. Do not add a package for a few lines of code you can write and test.
- Confirm the package exists under that exact name in the official registry and is the one you mean. Package names suggested from memory can be wrong or invented, and attackers register look-alike names. If you cannot verify it, say so and ask the user to check before installing.
- Check that it is maintained (recent releases, open issues getting answers, more than one maintainer for anything critical) and widely used for this purpose. Prefer the established option over a newer one with fewer users.
- Check the licence is compatible with the project. Flag copyleft licences (GPL, AGPL, LGPL in some setups), missing licences and unusual terms to the user instead of deciding yourself.
- Check for known advisories with the ecosystem's tool (`npm audit`, `pip-audit`, `cargo audit`, `govulncheck`, OSV-Scanner) or say that you could not.
- Consider what it brings with it: transitive dependencies, install scripts, native builds and bundle size for frontend code.

Adding
- Use the project's package manager and update the lockfile in the same change. Never add a dependency without its lock entry, and never edit the lockfile by hand.
- Pin to the version range convention the project already uses; for applications, the lockfile is the pin.
- Put build and test tools in development dependencies.
- Do not install by piping a downloaded script into a shell, from an unverified URL, or from a fork or Git branch unless the user asks and the reason is written down.
- Do not bypass integrity or peer checks (`--force`, `--legacy-peer-deps`, `--no-verify`, disabling hash checking) without telling the user why and what it risks.

Upgrading and removing
- Upgrade one dependency, or one tightly related group, per change. Read the changelog for major versions and list the breaking changes that affect this code.
- Run the tests after each upgrade and report the result.
- Remove dependencies your change makes unused, and their lock entries.

Reporting
- In your summary, list every dependency you added, removed or upgraded, with its version, licence and one line on why it was needed.
