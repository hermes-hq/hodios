---
schema: 1
id: fix-cross-platform-path-bug
kind: prompt
title: Fix a bug that only happens on one operating system
description: Fixes code that works on one of Windows, macOS or Linux and breaks on another, from path separators, case sensitivity, line endings, shell differences, file locking and default encodings.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, maintainer, devops-engineer]
stack: []
requires: [none]
inputs: [stack-trace, file, logs, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [portability, windows, file-paths, case-sensitivity, line-endings]
pairs_with:
  prompts: [fix-line-ending-churn, fix-text-encoding-bug]
args:
  - name: symptom
    description: What breaks, on which OS, and where it works, for example "tests pass on macOS, fail in Linux CI with file not found", "script fails on Windows with 'is not recognized as an internal or external command'". Include the error output.
    type: text
    required: true
  - name: code
    description: The code that builds paths, spawns processes, reads or writes files, or the npm scripts, Makefile or shell commands involved, and the language and runtime.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The platform difference, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who maintains software used on all three major operating systems. The differences that cause most "works on my machine" bugs:
- Paths: separators built by string concatenation (`dir + "/" + name`), parsing paths by splitting on `/`, drive letters and UNC paths on Windows, `~` not expanded outside a shell, comparing paths without normalising, and `file://` URLs built by hand. Path libraries (`pathlib`, `path.join`, `filepath.Join`, `Path.Combine`) and URL helpers (`fileURLToPath`, `pathToFileURL`) solve most.
- Case sensitivity: Linux file systems are case-sensitive; macOS and Windows usually are not. An import or file reference with the wrong case works locally and fails in Linux CI or containers. Renaming only the case in git needs `git mv`.
- Line endings: CRLF breaks shell scripts and shebangs on Linux, makes string comparisons and snapshot tests fail, and changes hashes.
- Shells: npm scripts and Makefiles run in `cmd.exe` or PowerShell on Windows, so `rm -rf`, `export VAR=x`, single quotes, `&&` in older PowerShell, and globbing behave differently. Spawning `npm` or other `.cmd` shims on Windows needs the shell or the `.cmd` name.
- File handling: Windows locks open files, so deleting or renaming a file still open fails; reserved names (`CON`, `NUL`, `aux`), forbidden characters (`:`, `?`, `*`), and path length limits; trailing dots and spaces.
- Defaults: default text encoding on Windows (not always UTF-8 in older runtimes), temp directory location, home directory variables (`HOME` versus `USERPROFILE`), executable permission bits not existing on Windows, and line-ending defaults of `print` or `writeFile`.
- Time and sorting: directory listing order differs between file systems; never rely on it.
</context>

<task>
Fix this platform-specific bug.

Symptom:
{{symptom}}

Code:
{{code}}

1. If you can read the repository, search for the patterns that cause portability bugs in the code path involved (string-built paths, hard-coded separators, shell commands in scripts, file names with different case than on disk, `open` without encoding) before answering.
2. Name the platform difference behind the symptom and point to the line that depends on it.
3. If the cause is not certain, give a check that settles it (print the resolved path, list the real file names with case, show the bytes of the line ending, run the command in the target shell), ask for the result, then stop.
4. Give a portable fix as a diff using the language's own path, process and file APIs, cross-platform script tools already in the project or a small script in the project's language instead of shell commands, explicit encodings and newline settings, and correct file name case. Fix every occurrence of the same pattern in the code shown, not only the failing line.
5. Give a check: run the test or script on the failing OS, and suggest adding that OS to the CI matrix if it is missing.
</task>

<constraints>
- Do not branch on the operating system (`if windows`) when a portable API exists; use OS checks only for real differences.
- Do not add new dependencies for something the standard library handles.
- Do not rename files or change git line-ending settings without listing what changes.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## The platform difference
What differs and the line that depends on it.
## Cause
The cause, or the check to run.
## Fix
Diff covering every occurrence of the pattern.
## Check
How to verify on the failing OS, and CI coverage.
</output_format>
