---
schema: 1
id: port-dotnet-framework-app
kind: prompt
title: Port a .NET Framework app to modern .NET
description: Plans porting a .NET Framework 4.x solution to current .NET, sorting projects by blockers like System.Web, WCF and AppDomains, converting to SDK-style first and moving libraries bottom-up.
category: migration
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [backend-engineer, software-engineer, tech-lead]
stack: [dotnet]
requires: [repo-read]
inputs: [repo, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [dotnet-framework, legacy-modernization, aspnet-core, wcf, sdk-style-projects]
pairs_with:
  prompts: [plan-incremental-migration, inventory-deprecated-api-usage]
  workflows: [runtime-upgrade-track]
  personas: [migration-engineer]
args:
  - name: solution
    description: The solution's projects and their types (ASP.NET MVC, Web Forms, WCF service, Windows service, WinForms, WPF, class libraries), the framework version, deployment target, and key NuGet packages.
    type: text
    required: true
  - name: target
    description: The target .NET version and operating system, if already decided.
    type: string
    default: the current LTS release
output_contract:
  format: markdown
  sections: [Project map, Blockers, Approach, Phase plan, Behaviour differences to test, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Porting from .NET Framework is decided by a few technologies with no direct equivalent: ASP.NET Web Forms, `System.Web` and its `HttpContext.Current`, WCF server hosting (community CoreWCF covers part of it), AppDomains, .NET Remoting and Code Access Security. WinForms and WPF run on modern .NET but only on Windows. Everything else is mostly work, not blockers. Experienced teams first convert project files to the SDK style and `packages.config` to `PackageReference` while still targeting `net48`, then multi-target shared libraries (for example `net48` plus a modern target) so both old and new apps can use them, and move from the bottom of the dependency graph up. Web apps can move incrementally behind a reverse proxy that sends migrated routes to the new ASP.NET Core app, with adapters for shared session or auth. Behaviour changes are where bugs hide: `BinaryFormatter` is gone in recent versions, globalization uses ICU instead of NLS on Windows by default, configuration moves from `web.config` to the options pattern, and some cryptography and TLS defaults differ.

Target: {{target}}
</context>

<task>
Solution:
{{solution}}

1. Map the projects as a dependency graph and classify each: portable as is, portable with work, blocked (name the blocker), or retire.
2. For each blocker give the realistic options with trade-offs: for Web Forms, rewrite pages in a modern UI stack behind a proxy; for WCF services, CoreWCF, gRPC or HTTP APIs with a client compatibility plan; for AppDomains or Remoting, process isolation or plugin loading contexts.
3. Check the NuGet packages: which have modern targets, which need replacements, and which are unknown. Mark unknowns "to verify"; do not guess support.
4. Choose the approach and explain it: in-place conversion for libraries and services, side-by-side incremental migration for web apps, or a rewrite of a small part where porting costs more.
5. Write the phase plan: phase 0 SDK-style conversion and `PackageReference` on `net48`; then multi-targeted libraries bottom-up; then apps one at a time; each phase with what ships, how it is tested and how to roll back. Mention upgrade tooling as an aid for mechanical steps, not as the plan.
6. List behaviour differences to test explicitly for this solution (serialization, globalization and date or number formatting, configuration binding, authentication, file paths and case sensitivity if moving to Linux, TLS and crypto defaults).
</task>

<constraints>
- Base the plan only on the projects and packages given; ask for the dependency list if it is missing instead of inventing one.
- Do not claim a package or API is supported on the target without being sure; mark it to verify.
- Never recommend a big-bang rewrite of the whole solution without stating why incremental porting fails here.
{{> output/uncertainty}}
</constraints>

<output_format>
## Project map
Table: project | type | depends on | classification | blocker.
## Blockers
Per blocker: options, trade-off, recommendation.
## Approach
One paragraph.
## Phase plan
Numbered phases: scope, what ships, test, rollback.
## Behaviour differences to test
Checklist.
## Open questions
Bullets.
</output_format>
