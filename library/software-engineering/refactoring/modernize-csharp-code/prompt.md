---
schema: 1
id: modernize-csharp-code
kind: prompt
title: Modernise dated C# code
description: Rewrites dated C# to records, pattern matching, nullable reference types, file-scoped namespaces, using declarations and collection expressions, without behaviour change.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer]
stack: [csharp]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [csharp-records, nullable-reference-types, pattern-matching, roslyn-analyzers]
pairs_with:
  prompts: [port-dotnet-framework-app, introduce-value-objects]
  personas: [dotnet-engineer]
  rules: [csharp-style-rules]
args:
  - name: target
    description: The project or files to modernise, as paths or pasted code, the target framework and LangVersion, and whether it is a library others consume.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not "dotnet test".
    type: string
output_contract:
  format: markdown
  sections: [Version and tools, Transformations, Nullable rollout, Diff, Skipped, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a .NET engineer. The language version (from the target framework or `LangVersion`) decides what is allowed: records and init-only setters (C# 9), file-scoped namespaces and global usings (10), raw string literals and required members (11), primary constructors and collection expressions (12). `dotnet format` with IDE analyzers (`IDE0161` file-scoped namespaces, `IDE0063` using declarations, `IDE0066` switch expressions, `IDE0090` target-typed new) does the mechanical part; run it, then review.

Where modernisation changes behaviour:
- **Class to record:** records have value equality, so code that used reference equality, dictionaries keyed by the object, or EF Core entities (which rely on reference identity and change tracking) behave differently. Records fit DTOs and value objects, not entities. `with` copies are shallow.
- **`using` block to using declaration:** disposal moves to the end of the enclosing scope, which can hold a file lock, transaction or connection longer than before.
- **Primary constructors on classes:** parameters are captured mutable state, not readonly fields; code that relied on `readonly` loses that guarantee.
- **Nullable reference types:** turning on `<Nullable>enable</Nullable>` changes no runtime behaviour but produces many warnings; the honest fix is annotating real nullability, not sprinkling the null-forgiving operator (!). Roll it out per project or per file with `#nullable enable`, starting with leaf code. For a library, nullability annotations are part of the public API contract.
- **`is null` versus `== null`:** they differ when a type overloads `==`, which is rare but real (Unity objects).
</context>

<task>
Modernise {{target}}.

1. Confirm the target framework and language version, whether it is a published library, and list the allowed features.
2. Make sure tests cover the code you will change; add equality and serialisation tests for classes that may become records.
3. Run `dotnet format` with the relevant analyzers for safe transformations, file-scoped namespaces and using declarations, reviewing every using declaration whose disposal point moves. Then do manual changes: records for DTOs and value types, pattern matching, switch expressions, raw strings for embedded JSON or SQL.
4. If nullable reference types are in scope, plan the rollout (per file or project, leaf code first) and annotate real nullability; list each place where a possible null bug was found.
5. Build with warnings visible and run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}. Report results, skipped items and bugs noticed.
</task>

<constraints>
- No behaviour change, including equality semantics, disposal timing and serialisation.
- Do not use features above the project's language version; do not change a library's public API shape.
- No null-forgiving operator (!) to silence warnings unless the value is proven non-null, with a comment saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Version and tools
Framework, language version, analyzers and format settings used.
## Transformations
Table: transformation, files, automated or manual, cases kept old.
## Nullable rollout
Scope, order, and null bugs found.
## Diff
The change.
## Skipped
What was not changed and why.
## Check
Build warnings and test results.
</output_format>
