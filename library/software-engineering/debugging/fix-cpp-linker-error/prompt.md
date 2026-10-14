---
schema: 1
id: fix-cpp-linker-error
kind: prompt
title: Fix a C or C++ linker error
description: Fixes C and C++ undefined reference, unresolved external (LNK2019) and duplicate symbol errors from CMake, Make or MSBuild output.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, embedded-engineer, game-developer]
stack: [cpp, c]
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [linker, cmake, undefined-reference, build-errors]
pairs_with:
  prompts: [debug-native-crash, triage-failing-ci]
  personas: [cpp-engineer]
args:
  - name: error
    description: "The linker output from the first error, including the mangled or demangled symbol names and the object or library being linked."
    type: text
    required: true
  - name: context
    description: "The build system and files (CMakeLists.txt, Makefile, .vcxproj), compiler and platform, and whether this links a third-party library."
    type: text
output_contract:
  format: markdown
  sections: [Missing or duplicated symbol, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a C++ build engineer. A linker error means compilation succeeded, so the code was declared correctly enough; the definition is missing, unreachable or duplicated. Demangle the symbol first (`c++filt`, `undname` on Windows) since the signature usually reveals the cause. The usual reasons:
- The source file defining it is not compiled into this target, or the library is not linked: missing from `add_executable`/`add_library` sources, or missing `target_link_libraries`.
- Link order with static libraries on GNU ld: a library must come after the objects that use it.
- Signature mismatch between declaration and definition: a different `const`, parameter type, namespace, or a free function declared but defined as a member (or the reverse).
- C and C++ mixing: a C function called from C++ without `extern "C"`, so the C++ side looks for a mangled name.
- Templates defined in a `.cpp` file instead of the header, so no instantiation is emitted.
- Static class members declared but not defined (before C++17 `inline` variables), virtual functions declared but not defined ("undefined reference to vtable for X": the first non-inline virtual function is missing).
- ABI mismatches: `_GLIBCXX_USE_CXX11_ABI` differences, mixing MSVC runtime libraries (/MD versus /MT), Debug versus Release libraries, 32 versus 64 bit, a library built for another architecture.
- Duplicate symbols: a function or variable defined in a header without `inline`, or the same library linked twice in different forms.
- Windows DLLs: missing `__declspec(dllexport)`/`dllimport` or the import `.lib` not linked.
</context>

<task>
Linker error:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Demangle the first unresolved or duplicate symbol and read the declaration and the expected definition in the code.
2. Find where it is (or should be) defined: grep the sources, then check whether that file is part of the target. For a third-party library, check the library is found and linked, and list its exported symbols (`nm -C`, `objdump -T`, `dumpbin /exports`) to compare names.
3. Name the cause from the list above.
4. Fix it in the build files or source: add the source or the `target_link_libraries` entry (prefer imported targets from `find_package`), fix the signature, add `extern "C"`, move the template definition, add `inline`, align the ABI or runtime settings.
5. Do a clean build of the affected target and run its tests.
</task>

<constraints>
- Do not add `-Wl,--unresolved-symbols=ignore-all`, `/FORCE`, `-z muldefs` or similar flags that hide the error.
- Do not hard-code absolute library paths when the project uses `find_package`, pkg-config or a package manager.
- Ask for the build files if the error alone does not show how the target is defined.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Missing or duplicated symbol
The demangled symbol, who references it and where it should be defined.
## Cause
Why the linker cannot find it, or finds it twice.
## Fix
The diff to source or build files.
## Verification
The clean build you ran and its result.
</output_format>
