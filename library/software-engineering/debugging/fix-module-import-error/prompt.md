---
schema: 1
id: fix-module-import-error
kind: prompt
title: Fix a module import error
description: Fixes "module not found", "cannot use import statement", circular import and wrong-version import errors in Python, Node.js and TypeScript by tracing how the runtime resolves the module.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: [python, typescript, nodejs]
requires: [none]
inputs: [stack-trace, config, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [imports, module-resolution, esm, commonjs, virtualenv]
pairs_with:
  prompts: [explain-stack-trace, resolve-dependency-conflict]
args:
  - name: error
    description: The full error message and stack trace, exactly as printed.
    type: text
    required: true
  - name: context
    description: How you run the code (command, IDE run button, test runner, Docker), the project layout around the failing import, and the relevant config such as package.json, tsconfig.json, pyproject.toml or setup.cfg.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the runtime tried, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes import errors by following the runtime's resolution rules, not by trying random path tweaks. The common causes:

Python:
- The package is installed in a different interpreter or virtual environment than the one running the code (`pip` and `python` pointing at different installs, the IDE using another interpreter). `python -m pip` and `python -c "import sys; print(sys.executable, sys.path)"` settle it.
- Running a file inside a package as a script (`python app/main.py`) so relative imports fail; `python -m app.main` from the project root fixes it.
- A local file shadowing a library (`random.py`, `email.py`, `requests.py` in the project).
- A circular import: "cannot import name X from partially initialized module".
- The project not installed in editable mode, or a `src/` layout without the package installed, so tests cannot import it.

Node.js and TypeScript:
- ES modules versus CommonJS: `"type": "module"` in package.json, `.mjs` and `.cjs` extensions, `require` of an ESM-only package (ERR_REQUIRE_ESM in older Node versions), `import` statements in a CommonJS file.
- ESM needs file extensions in relative imports; TypeScript with `moduleResolution: nodenext` expects `.js` in import paths even for `.ts` files.
- `paths` aliases in tsconfig.json that the compiler understands but the runtime, bundler or test runner does not.
- A package's `exports` field not exposing the subpath being imported.
- Case-sensitive file systems on Linux and CI breaking imports that work on macOS or Windows.
</context>

<task>
Fix this import error.

Error:
{{error}}

How it runs and project layout:
{{context}}

1. From the error, say exactly what the runtime tried to load and from where (the module name, the file doing the import, the resolution mode).
2. If the cause is ambiguous, give one or two commands that settle it (interpreter and path checks, `npm ls <pkg>`, `node -p "require.resolve('<pkg>')"`, listing the actual file names with their case) and say what each result would mean. If the answer cannot be determined without them, ask and stop.
3. Name the cause.
4. Give the smallest fix that matches how the project is meant to run: a corrected command, an interpreter selection, an editable install, a renamed shadowing file, a moved import that breaks a cycle, a package.json or tsconfig change, or a matching alias setting for the test runner or bundler.
5. Say how to check the fix works in every place the code runs (terminal, IDE, tests, CI, Docker), since a fix in one often does not carry to the others.
</task>

<constraints>
- Do not suggest editing `sys.path`, setting `PYTHONPATH` or `NODE_PATH` globally, or copying files around as the fix unless the project already does that on purpose; prefer installing the package properly or running it the intended way.
- Do not suggest downgrading or upgrading a package unless the error is actually about versions.
- Do not invent package names; if the error names one you do not recognise, say so.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What the runtime tried
One or two sentences.
## Cause
The cause, or the commands to settle it.
## Fix
The change as a command, diff or config snippet.
## Check
How to confirm in each place the code runs.
</output_format>
