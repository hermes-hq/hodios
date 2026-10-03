---
schema: 1
id: write-python-automation-script
kind: prompt
title: Write a Python automation script
description: Writes a Python script that automates a repetitive file, spreadsheet or web task, with a dry run by default, clear options, logging and setup steps a non-developer can follow. Use for chores.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [individual, software-engineer, data-analyst, operations-manager]
stack: [python]
requires: [none]
inputs: [text, file]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [automation, scripting, dry-run, excel-automation, file-management]
pairs_with:
  prompts: [write-shell-script, write-web-scraper, write-cli-tool]
  personas: [coding-mentor]
args:
  - name: task
    description: The chore in plain words, step by step as you do it now by hand, how often you do it, and anything the script must never touch or delete.
    type: text
    required: true
  - name: inputs
    description: What the script works on, with a realistic example, for example "a folder of 300 PDFs named like INV-2024-0012.pdf", "an Excel file with columns Name, Email, Amount", or "a website I log into by hand". Mention your operating system.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What it will do, Assumptions, Setup, Script, How to run it, Check the result, Changing it later]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write automation scripts for people who may never have run Python before, and for developers who want a tidy one. The scripts that help are the ones people trust: they show what they would do before doing it, never destroy anything by surprise, explain errors in plain words, and can be run again safely. Most chores are covered by the standard library (`pathlib`, `shutil`, `csv`, `argparse`, `logging`, `datetime`, `zipfile`, `smtplib`), plus a small number of well-known packages when needed: `openpyxl` for Excel files, `pandas` for heavy table work, `requests` for web APIs, `pypdf` for PDFs, `Pillow` for images.
</context>

<task>
Write a Python script for this task.

Task:
{{task}}

Inputs:
{{inputs}}

1. If anything that decides what gets changed, moved, sent or deleted is unclear, ask up to three short, plain questions and stop. Otherwise list your assumptions and continue.
2. Explain what the script will do in plain language, as numbered steps a non-programmer can check against how they do the task now.
3. Write one script file for Python 3.10 or later:
   - Configuration at the top (folders, column names, patterns) with comments, plus command-line options through `argparse` with `--help` text.
   - A dry run is the default: it prints exactly what would happen. Changes only happen with `--apply`.
   - It never deletes. Files that would be replaced or removed go to a dated backup or `_processed` folder instead.
   - It handles name collisions, missing files, unexpected rows and locked files with a clear message and keeps going where it safely can, then prints a summary (done, skipped, failed).
   - It writes a log file next to the script.
   - It runs the same way on Windows, macOS and Linux (`pathlib`, no hard-coded separators, explicit `encoding="utf-8"`).
   - Running it twice does not do the work twice.
4. Keep extra packages to the minimum, and say why each one is needed.
5. Give setup steps for the user's operating system: installing Python, creating a virtual environment, installing packages, and running the script, with the exact commands.
</task>

<constraints>
- No passwords or API keys in the script; read them from environment variables or prompt for them at run time.
- For web tasks, use an official API or export if the site offers one; do not automate logins or scrape sites against their terms.
- Write comments for a reader who is not a programmer, but do not comment every line.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What it will do
Numbered plain-language steps.
## Assumptions
Bullets.
## Setup
Commands for the user's operating system, in order.
## Script
One Python code block.
## How to run it
The dry-run command, what its output means, then the `--apply` command.
## Check the result
Three to five things to look at after the first real run.
## Changing it later
Where in the configuration to change common things.
</output_format>
