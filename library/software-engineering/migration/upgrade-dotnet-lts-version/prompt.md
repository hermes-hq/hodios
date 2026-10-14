---
schema: 1
id: upgrade-dotnet-lts-version
kind: prompt
title: Upgrade a .NET app to the next LTS version
description: Upgrades a modern .NET app between LTS versions, covering target frameworks, SDK pinning, package alignment, documented breaking changes, analyzers and container images.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [backend-engineer, software-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [lts-upgrade, target-framework, breaking-changes, container-images, ef-core]
pairs_with:
  prompts: [upgrade-major-dependency, modernize-csharp-code, port-dotnet-framework-app]
  workflows: [runtime-upgrade-track]
  personas: [dotnet-engineer]
args:
  - name: project
    description: Current and target .NET versions, project types (ASP.NET Core, worker, console, Blazor, MAUI), EF Core and other key packages, and how it is deployed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Upgrade path, Package changes, Code and config changes, Container and hosting, Verification, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A .NET LTS upgrade looks like a one-line `TargetFramework` change, but most of the work sits around it. Every major release publishes a breaking-changes list grouped by area (ASP.NET Core, EF Core, runtime, SDK, containers), and many items are behaviour changes that compile cleanly. `global.json` may pin an old SDK so the build silently keeps using it. `Microsoft.Extensions.*`, `Microsoft.AspNetCore.*` and EF Core packages should move to the same major as the runtime; mixing majors causes binding errors at runtime. EF Core majors change query translation and provider behaviour, which only shows against a real database. Newer SDKs ship new analyzer warnings, which break builds that treat warnings as errors. Removed APIs bite late: since .NET 9 the runtime's `BinaryFormatter` implementation throws (only an unsupported compatibility package brings it back), which matters for old caching, session or remoting code. Official container images changed defaults across releases (since .NET 8, port 8080 instead of 80 and a built-in non-root `app` user that Dockerfiles can switch to, and the default base OS can change between majors; check the container breaking-changes notes for each version), so health checks, volume permissions and ingress ports break even when the app is fine.
</context>

<task>
Project: {{project}}

1. Read the solution: every `.csproj`, `Directory.Build.props`, `Directory.Packages.props`, `global.json`, Dockerfiles and CI files. List current target frameworks, SDK pin and package versions.
2. Read the official breaking-changes lists for every major between current and target (including any STS release skipped over) and note which items touch APIs, packages or settings the code actually uses. Mark anything you cannot confirm "to verify".
3. Update `global.json`, target frameworks and CI SDK versions. Align Microsoft packages to the target major and check every third-party package for a version that supports the target; list blockers before changing code.
4. Build, then fix errors and new warnings by cause. Do not suppress analyzer warnings wholesale; suppress narrowly with a reason only when the fix is out of scope.
5. Update container images and check port, user, file permissions and base OS packages the app relies on (globalization, fonts, native libraries). Update deployment config to match.
6. Run tests, then start the app and check what tests miss: EF Core queries against a real database, serialization output, authentication flows, health checks and startup logs for new warnings.
</task>

<constraints>
- Do not mix language feature adoption or refactors into the upgrade change.
- Do not claim a breaking change applies or a package is compatible without checking; say "to verify".
- Do not change deployment or production configuration beyond what the upgrade requires, and ask before touching shared CI templates.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Upgrade path
Current and target framework, SDK pin, and whether an STS hop is involved.
## Package changes
Table: package | from | to | breaking notes or "to verify".
## Code and config changes
Grouped by breaking change, with files touched.
## Container and hosting
Image tag, user, port, base OS and any deployment config changes, or "Not containerized".
## Verification
Build, tests, startup and runtime checks with results.
## Remaining risks
Bullets, or "None".
</output_format>
