---
schema: 1
id: modularize-c-codebase
kind: prompt
title: Modularize a C codebase with global state
description: Splits a large C codebase full of globals into modules with clear headers, static internals and opaque types, without changing behaviour or the build output's interface.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, embedded-engineer]
stack: [c]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [header-files, opaque-types, global-state, encapsulation]
pairs_with:
  prompts: [restructure-firmware-superloop, untangle-circular-dependencies]
args:
  - name: code
    description: The files to modularize, as paths or a description, with the compiler, C standard, build system, and any exported API or ABI that must stay stable.
    type: text
    required: true
  - name: build_and_test
    description: The commands that build and test the code.
    type: string
output_contract:
  format: markdown
  sections: [Current structure, Module plan, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
C has no modules, so modularity is a discipline of translation units and headers. A module is a `.c` file with a `.h` that declares only its public functions and types; everything else is `static`. Global variables shared through `extern` are the main source of coupling: each one becomes either `static` state inside the one module that owns it with accessor functions, or a field in a struct passed explicitly. An opaque type (`typedef struct parser parser;` in the header, the struct body in the `.c`) hides layout so callers cannot reach into fields, at the cost of heap or caller-provided storage, which matters on embedded targets without malloc.

Moving code in C has non-obvious effects: making a function `static` breaks any other file, test or linker script that used it; changing struct layout breaks binary compatibility for shared libraries; header include order and macros can change meaning; tentative definitions of globals in headers produce duplicate symbols with `-fno-common` (default since GCC 10). Moving a global behind an accessor changes nothing at runtime unless code took its address or relied on initialisation order. Use the linker map or `nm` to see which symbols are actually used across files before deciding what is public.
</context>

<task>
Modularize {{code}}.

1. Map the current structure: files, their globals, which files read or write each global, functions called across files, and headers that are included everywhere. Use the build and symbol tables where possible rather than guessing.
2. Propose modules by responsibility, each with its public header, the globals it will own, accessor functions or context structs replacing shared globals, and which types become opaque. Note memory implications of opaque types. List anything exported to other binaries that must keep its signature. Wait for approval.
3. Make sure tests or a reference run (same input, same output) exist before moving code; add a characterization run if there are no tests.
4. Move one module at a time: create the header, mark internals `static`, replace `extern` uses, fix includes. Build with warnings on (`-Wall -Wextra -Wmissing-prototypes`) and run the tests{{#build_and_test}} with `{{build_and_test}}`{{/build_and_test}} after each move.
5. Show the diff, the new module layout and a dependency list between modules.
</task>

<constraints>
- Behaviour, exported symbols and ABI of any public library interface stay the same unless the user approves a change.
- No new dynamic allocation on targets that forbid it; offer caller-provided storage instead.
- Do not reformat untouched code or change the build system beyond adding the new files.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current structure
Files, globals and cross-file users.
## Module plan
Table: module, public API, owned state, opaque types.
## Steps
Numbered steps, each with its build and test check.
## Diff
The change and new layout.
## Check
Build warnings and test results.
</output_format>
