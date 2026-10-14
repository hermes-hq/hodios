---
schema: 1
id: powershell-style-rules
kind: rule
title: PowerShell style rules
description: Standing rules for PowerShell scripts and modules covering approved verbs, advanced functions, parameter validation, objects not text, ShouldProcess, error handling and portability.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, software-engineer]
stack: [powershell]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [cmdletbinding, approved-verbs, pipeline, scripting, windows-automation]
applies_to: ["**/*.ps1", "**/*.psm1", "**/*.psd1"]
pairs_with:
  rules: [shell-script-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change PowerShell in this project:

**Know the target first**
- Check whether scripts must run on Windows PowerShell 5.1, PowerShell 7+ or both, and on which operating systems. Do not use 7-only syntax (`??`, `?.`, ternary, `ForEach-Object -Parallel`) in 5.1 code. Add `#Requires -Version` and `#Requires -Modules` lines that state the real requirement.

**Naming and structure**
- Name functions `Verb-Noun` with an approved verb (`Get-Verb` lists them) and a singular noun: `Get-UserReport`, not `Fetch-Users` or `GetUsers`. Module functions use a consistent noun prefix.
- Use full cmdlet and parameter names in scripts, never aliases (`Get-ChildItem`, not `ls` or `gci`; `-Path`, not positional guesses). Aliases are for the console.
- Put reusable functions in a module (`.psm1` with a manifest) and export only the public ones.
- Use `Set-StrictMode -Version Latest` at the top of scripts.

**Advanced functions and parameters**
- Every function is an advanced function: `[CmdletBinding()]` and a typed `param()` block. Add comment-based help (`.SYNOPSIS`, `.PARAMETER`, `.EXAMPLE`).
- Mark required parameters `Mandatory`, and validate with `[ValidateSet()]`, `[ValidateRange()]`, `[ValidateNotNullOrEmpty()]` or `[ValidateScript()]` instead of manual checks.
- Use `[switch]` for flags, never `[bool]` parameters. Accept pipeline input with `ValueFromPipeline` or `ValueFromPipelineByPropertyName` when it makes sense, and process it in a `process {}` block.
- Take credentials as `[pscredential]` and secrets as `[securestring]`; never as plain-text string parameters or hard-coded values.

**Output objects, not text**
- Return objects (`[pscustomobject]@{...}`) and let the caller format them. Never use `Format-Table` or `Format-List` inside a function that returns data, and never `Write-Host` for output data.
- Use `Write-Verbose` for progress detail, `Write-Warning` for warnings, `Write-Information` for user messages. Keep one output type per function and declare it with `[OutputType()]`.
- Suppress unwanted output from method calls with `$null = ...` so stray values do not leak into the pipeline.

**Changes and safety**
- Functions that change state declare `SupportsShouldProcess` (with `ConfirmImpact` for destructive ones) and wrap the change in `if ($PSCmdlet.ShouldProcess($target, $action))`, so `-WhatIf` and `-Confirm` work.
- Never run destructive operations (`Remove-Item -Recurse -Force`, deleting users, stopping services) on computed paths or lists without validating them first and supporting `-WhatIf`.

**Errors**
- Set `$ErrorActionPreference = 'Stop'` in scripts or pass `-ErrorAction Stop` so non-terminating errors can be caught. Use `try`/`catch` around operations you can handle, and rethrow with context otherwise. No empty `catch`.
- Check `$LASTEXITCODE` after calling native executables; PowerShell does not treat their failure as an error by default.

**Portability and paths**
- Build paths with `Join-Path`, not string concatenation with backslashes. Use `$PSScriptRoot` for paths relative to the script.
- Quote and pass arguments to native commands as arrays; do not build command strings for `Invoke-Expression`, which runs injected code.

**Before you finish**
- Run PSScriptAnalyzer with the project settings and Pester tests if present, and run the script with `-WhatIf` where it changes state. Say what you ran.
