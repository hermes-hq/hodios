---
schema: 1
id: hunt-for-web-shells
kind: prompt
title: Hunt for web shells
description: Plans and runs a hunt for web shells on web servers using deployment diffs, suspicious code patterns, access log anomalies and web server process trees, with safe handling of hits.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [text, logs]
output: [plan, checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [web-shell, threat-hunting, file-integrity, iis, process-tree]
pairs_with:
  prompts: [analyze-web-attack-logs, respond-to-critical-cve, write-yara-rule, write-threat-hunt-plan]
  personas: [soc-analyst]
args:
  - name: servers
    description: The web servers in scope - OS, web server (IIS, nginx, Apache, Tomcat), application language (PHP, ASP.NET, Java, Node), how code is deployed, and which logs and EDR you have.
    type: text
    required: true
  - name: trigger
    description: Why you are hunting - a CVE in an internet-facing product, an alert, a suspicious log line, or routine assurance.
    type: text
    required: true
  - name: evidence
    description: Optional file listings, log excerpts or EDR process data already collected.
    type: text
output_contract:
  format: markdown
  sections: [Hunt scope, File checks, Log checks, Process checks, Triage of hits, If you find one]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A web shell is a script dropped into a web-served directory that lets an attacker run commands through HTTP requests. Signature scanning alone misses most of them because they are small, obfuscated or one line long. Three independent angles work better together. Files: anything in the web root that differs from the deployed release (a `git status` against the deploy, package checksums, or a hash list), script files in upload or cache folders, and code using execution or decoding primitives (`eval`, `assert`, `system`, `passthru`, `shell_exec`, `base64_decode`, `gzinflate`, `preg_replace` with `/e`, `Runtime.getRuntime().exec`, `Process.Start`, `ProcessBuilder`). Logs: POST requests to files that are never linked from the site, a single client making most requests to one file, odd parameter names, small consistent response sizes. Processes: the web server or application pool identity (`www-data`, `apache`, `nginx`, `w3wp.exe`, the Tomcat java process) spawning `sh`, `bash`, `cmd.exe`, `powershell.exe`, `whoami` or `net.exe` is the strongest signal of all, because that almost never happens legitimately. Finding one shell means looking for more: attackers commonly plant several.
</context>

<task>
Plan a web shell hunt for:

<servers>
{{servers}}
</servers>

<trigger>
{{trigger}}
</trigger>
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Define the hunt scope: servers, web roots and virtual directories (including vendor product paths named in the trigger), time window from the earliest plausible exposure, and the hypothesis.
2. File checks: give read-only commands for the stated OS to compare the web root with the known-good release, list script files in upload, temp and cache folders, list files modified in the window, and search for execution and decoding primitives. Explain which hits are normal for common frameworks and which are not.
3. Log checks: give queries or command pipelines for the stated log format to find POSTs to rarely requested script files, files requested by only one or two clients, first-seen script paths in the window, and request patterns with command-like parameters.
4. Process checks: give the EDR or Sysmon query, or `ps` and audit log approach, for child processes of the web server identity, and outbound connections from it.
5. Triage of hits: for each kind of hit, the questions that confirm or clear it (is it in the release, who deployed it, does the same client hit it repeatedly, did the web process spawn a shell around the same time).
6. If you find one: preserve a copy and its hash before touching it, record timestamps, look for the request that created it, hunt for more shells and for credentials or data the web identity could reach, find and patch the entry point, decide clean versus rebuild, and treat secrets readable by the web process as exposed.
</task>

<constraints>
- Read-only hunting. Mark any removal or quarantine step as needing approval, after evidence is preserved.
- Do not write or reproduce working web shell code. Describe patterns at the level needed to detect them.
- Do not label a file a web shell on one pattern hit alone; many legitimate libraries use `eval` or `base64_decode`.
- Never invent CVE details for the trigger product; ask for the advisory if needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Hunt scope
Bullets: servers, paths, window, hypothesis.

## File checks
Fenced code blocks for the stated OS with comments, then notes on normal hits.

## Log checks
Queries or pipelines for the stated log format.

## Process checks
Queries for EDR, Sysmon or Linux.

## Triage of hits
Table: Hit type | Confirm by | Clears if.

## If you find one
Ordered checklist.
</output_format>
