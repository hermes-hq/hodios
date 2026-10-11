---
schema: 1
id: make-cli-accessible
kind: prompt
title: Make a CLI accessible
description: Reviews and fixes a command-line tool for screen-reader, low-vision and colour-blind users, covering colour-only output, spinners, box drawing, prompts, NO_COLOR and a plain output mode.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, review]
role: [software-engineer, maintainer]
requires: [none]
inputs: [file, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [command-line, terminal, no-color, spinners, screen-reader, interactive-prompts]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-cli-tool]
args:
  - name: cli_code
    description: The output and prompt code of the CLI (logging helpers, progress indicators, tables, interactive prompts), or a sample of its terminal output plus the libraries used.
    type: text
    required: true
  - name: language
    description: Optional. Language and CLI libraries, for example "Node with Ink and chalk" or "Python with Rich and Click".
    type: string
output_contract:
  format: markdown
  sections: [Findings, Changes, Plain mode, Test steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Blind developers use terminals with screen readers (NVDA or JAWS with Windows Terminal, VoiceOver with macOS Terminal, Orca or Speakup on Linux), and many developers are colour blind or use large fonts. Terminal screen readers read text as it changes, so CLIs that redraw a line many times a second (spinners, progress bars, live dashboards) produce a flood of speech or silence. Other common barriers: pass and fail shown only in red and green; box-drawing tables read as "box drawings light horizontal" for every character; ASCII art and emoji-heavy banners; interactive prompts with arrow-key menus that never announce the highlighted choice; errors printed to stdout among progress noise; and output that relies on column alignment. Good practice is well established: honour the `NO_COLOR` convention and a `--no-color` flag, detect a non-TTY and print plain lines, offer a `--plain` or `--no-progress` mode that prints one line per step, use words or symbols alongside colour (PASS, FAIL, warning), and give every interactive prompt a flag-based equivalent.
</context>

<task>
<cli_code>
{{cli_code}}
</cli_code>
{{#language}}
Language and libraries: {{language}}
{{/language}}

1. List barriers in the output and prompts: colour as the only signal, animated spinners and progress redraws, box drawing and decorative art, emoji used as status, alignment-dependent tables, arrow-key menus, prompts with no non-interactive equivalent, errors mixed into stdout, and long lines that wrap badly at large font sizes.
2. Rate each by who is affected (screen-reader, low-vision, colour-blind users, plus scripts and CI logs, which share the same fixes) and how badly.
3. Write the changes in the given language and libraries: a single output helper that checks `NO_COLOR`, `--no-color`, `TERM=dumb` and whether stdout is a TTY; text status words next to colour; spinners replaced by start and finish lines when not interactive or when plain mode is on; tables with a simple key: value or CSV alternative; and every prompt reachable with flags.
4. Define a `--plain` (or similarly named) mode precisely: what it prints, what it omits, and how users can set it once (environment variable or config file).
5. Give a test procedure with at least one terminal screen reader, a colour-blindness check (output with colour stripped) and a non-TTY run.
</task>

<constraints>
- Keep the default experience for sighted interactive users unless a change costs them nothing.
- Do not invent options of the CLI libraries; if unsure whether a library supports a setting, say so and show a fallback.
- Do not require users to self-identify as disabled to get accessible output; name the mode by what it does.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Findings
Table: # | Output or prompt | Barrier | Who is affected | Severity.

## Changes
Code per finding.

## Plain mode
What it prints, what it omits, how to turn it on.

## Test steps
Checklist.
</output_format>
