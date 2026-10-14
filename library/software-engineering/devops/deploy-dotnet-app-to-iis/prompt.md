---
schema: 1
id: deploy-dotnet-app-to-iis
kind: prompt
title: Deploy an ASP.NET Core app to IIS
description: Deploys an ASP.NET Core app to Windows Server IIS with the Hosting Bundle, app pool settings, web.config, environment config, TLS binding, logging and a scripted zero-surprise release.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [backend-engineer, devops-engineer, software-engineer]
stack: [dotnet, powershell]
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [config, script, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [iis, windows-server, aspnet-core, app-pool, release-script]
pairs_with:
  prompts: [deploy-to-vps, set-up-domain-and-https, write-github-actions-workflow]
args:
  - name: app
    description: The app (project path, .NET version, framework-dependent or self-contained), what it needs at runtime (database, file paths, background work), and the site's host names.
    type: text
    required: true
  - name: server
    description: Windows Server version, whether IIS is already installed, how deploys reach the server (Web Deploy, file share, CI agent, manual copy), and whether there is more than one server behind a load balancer.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Server setup, Site and app pool, Configuration, Release script, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ASP.NET Core does not run inside IIS the way .NET Framework did: IIS hosts it through the ASP.NET Core Module, installed by the .NET Hosting Bundle, which must include the runtime for the app's major .NET version (unless the app is published self-contained) and must be installed after IIS (or repaired afterwards), followed by an IIS restart. The app pool should use "No Managed Code"; in-process hosting is faster but allows one app per pool. Typical failures: HTTP 500.30 or 500.31 because the runtime or hosting bundle is missing, file locks during deploy because the app is still running (fixed by an `app_offline.htm` file, which the module watches, or by stopping the pool), `web.config` overwritten on every publish so hand edits vanish, the pool identity lacking write access to the folders the app writes, secrets in `appsettings.json` on disk, and idle timeouts that shut down apps with background work. Environment is selected with `ASPNETCORE_ENVIRONMENT`, set in `web.config` environment variables or on the pool, not by editing appsettings per server.
</context>

<task>
Deploy this app to IIS:
{{app}}
Server: {{server}}

1. If the repository is available, read the project file (target framework, hosting model, self-contained or not), `Program.cs` for hosted services and forwarded headers, `appsettings*.json`, and any existing publish profile or pipeline.
2. Server setup: IIS roles and features needed, the Hosting Bundle version matching the app's .NET major version, an `iisreset` after install, and URL Rewrite only if redirects are needed. Write it as idempotent PowerShell.
3. Site and app pool: a dedicated pool with No Managed Code, `ApplicationPoolIdentity`, start mode and idle timeout matching whether the app runs background work (AlwaysRunning plus preload, idle timeout 0, when it does), recycling settings, and folder permissions for the pool identity on the paths the app writes, and nothing more.
4. Bindings and TLS: host-name bindings, an HTTPS binding with a certificate from the machine store, SNI where several sites share an IP, HTTP to HTTPS redirect, and forwarded headers configured in the app if a load balancer terminates TLS.
5. Configuration: `web.config` with `aspNetCore` settings (hosting model, stdout logging off in production), `ASPNETCORE_ENVIRONMENT`, and secrets from environment variables set on the app pool in `applicationHost.config` or from a secret store, never in files in the site folder. Show how to keep `web.config` transforms in the publish so they are not lost.
6. Release script: build with `dotnet publish -c Release`, copy to a new versioned folder or use `app_offline.htm`, switch the site's physical path or replace files, warm up with a request, health check, and keep the previous folder for rollback. If several servers sit behind a load balancer, drain one at a time.
7. Logging: application logs to a durable sink or the event log, and where to look for 500.3x startup errors.
</task>

<constraints>
- Do not run anything on the server; write scripts and steps for the user.
- No credentials, connection strings or certificates in scripts or config files; use placeholders and a secure source.
- Only use IIS and PowerShell cmdlets that exist (WebAdministration or IISAdministration modules); mark any you are unsure of.
- Grant the pool identity only the folder permissions the app needs; never add it to Administrators.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Server setup
PowerShell in a fenced block.
## Site and app pool
PowerShell in a fenced block, with a table of the key settings and why.
## Configuration
`web.config` and where each setting and secret comes from.
## Release script
PowerShell in a fenced block, with rollback.
## Verify
Checks after a release, and a short table of common 500.3x errors and their fixes.
</output_format>
