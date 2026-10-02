---
schema: 1
id: write-cli-tool
kind: prompt
title: Write a command-line tool
description: Designs and implements a small command-line tool with subcommands, help text, exit codes, config precedence and tests. Use when turning a manual workflow into a reusable command.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build]
role: [software-engineer, devops-engineer, sre]
requires: [file-write, shell]
inputs: [spec, text]
output: [code, tests, docs]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cli, developer-tooling, automation]
args:
  - name: purpose
    description: What the tool is for, who runs it, and the workflow it replaces.
    type: text
    required: true
  - name: language
    description: Implementation language. If the repo already has CLI code, its language and parser win.
    type: string
    default: python
  - name: commands
    description: Subcommands you already have in mind, with their inputs. Leave empty to have them designed from the purpose.
    type: text
output_contract:
  format: markdown
  sections: [Command surface, Files, Tests, Decisions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good CLI behaves the way experienced terminal users expect without reading its source. It prints help, keeps data on stdout and messages on stderr, returns exit codes that scripts can branch on, works in a pipe, asks before destroying anything, and takes configuration from flags, environment and files in a predictable order. Most quick tools get two of these right and surprise their users with the rest.
</context>

<task>
Build a command-line tool in {{language}} for this purpose:

{{purpose}}

Planned commands: {{commands}} (if empty, design the smallest command set that covers the purpose).

1. If the purpose is too vague to name the commands and their inputs, ask up to 3 questions and stop.
2. Design the command surface before writing code: commands as verbs (`tool sync`, `tool list`), arguments and flags per command, defaults, output, and exit codes. Use `-h/--help` and `--version` everywhere. Add `--json` for any command whose output another program might read, and `--dry-run` plus `--yes` for anything destructive.
3. Use the ecosystem's standard parser, or the one the repo already uses: argparse or Typer for Python, Cobra or the standard `flag` package for Go, clap for Rust, Commander or `util.parseArgs` for Node.
4. Configuration precedence, highest first: flags, then environment variables with a tool prefix (`TOOL_*`), then a project config file, then a user config file under the platform config directory (`$XDG_CONFIG_HOME` on Linux), then defaults. Document it in `--help` and in the README.
5. Behaviour rules:
   - Exit codes: 0 success, 1 failure, 2 usage error. Add specific codes only if callers need to tell failures apart, and document them.
   - Data to stdout and progress, warnings and errors to stderr. Errors say what failed and what to do next.
   - Detect a non-interactive terminal: no colours, spinners or prompts when piped. Respect `NO_COLOR`. Accept `-` for stdin where a file is expected.
   - On Ctrl-C, stop cleanly, leave no partial files, and exit 130.
6. Write tests: argument parsing per command, exit codes for success, usage error and runtime failure, `--json` output shape, and one end-to-end run in a temporary directory. Do not test against the real network or the user's home directory.
7. Add a README section with installation, a usage example per command, the config precedence and the exit codes. Run the tests and a `--help` smoke check.
</task>

<constraints>
- Keep it small: no plugin system, no global state, and no dependencies beyond the parser and what the purpose truly needs.
- Never print secrets, including in `--verbose` or debug output.
- Keep business logic in plain functions the CLI layer calls, so it can be tested without a subprocess.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Command surface
| Command | Arguments and flags | Output | Exit codes |
Then the config precedence in one line.

## Files
A tree, then each file in its own code block.

## Tests
One line per test: what it proves.

## Decisions
Choices you made that the purpose did not dictate, one line each.

## Verification
Commands run (tests, `--help`) and their actual results.
</output_format>
