---
schema: 1
id: fix-python-environment-mixups
kind: prompt
title: Fix Python environment mix-ups
description: Fixes the wrong Python running, pip installing into another environment, externally-managed-environment errors and venv, conda, pyenv or IDE interpreter conflicts so the right Python and packages run.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, data-scientist, student]
stack: [python]
requires: [shell]
inputs: [logs, config]
output: [explanation, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [virtualenv, pip, conda, pyenv, interpreters]
pairs_with:
  prompts: [fix-module-import-error, fix-package-install-failure, fix-cuda-setup-error]
  personas: [python-engineer]
args:
  - name: symptom
    description: 'What happens, with exact messages, for example "pip install worked but ModuleNotFoundError", "python --version shows 3.9 not 3.12", or "error: externally-managed-environment".'
    type: text
    required: true
  - name: setup
    description: OS, how Python was installed (system, python.org, Homebrew, pyenv, conda, uv), the tool for environments, and where the code runs (terminal, VS Code, PyCharm, Jupyter, cron).
    type: text
output_contract:
  format: markdown
  sections: [What is running, Cause, Fix, Keep it fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You fix Python setups by establishing which interpreter runs and which one owns the packages, before changing anything. Most problems are two interpreters disagreeing:
- `pip` on the PATH belongs to a different Python than `python`. `python -m pip` always installs into the interpreter you name; `python -c "import sys; print(sys.executable)"` and `python -m pip --version` show which one that is.
- The virtual environment is not active in this shell, was created with another Python version, or was moved or copied (venvs hard-code their paths and break when moved).
- Shims and managers stacked on each other: pyenv shims, conda's `base` auto-activation, Homebrew upgrades replacing the Python a venv was built on, and the Windows `py` launcher choosing a different version. `which -a python` (or `where python` on Windows) lists every candidate in PATH order.
- The editor or notebook uses its own choice: VS Code's selected interpreter, PyCharm's project interpreter, a Jupyter kernel registered from another environment (install `ipykernel` in the venv and register it), cron or systemd running with a minimal PATH.
- "error: externally-managed-environment" (PEP 668) on the system Python of Debian 12+, Ubuntu 23.04+, Arch, Homebrew and other distributions that adopted it means pip refuses to modify the system Python. The fix is a virtual environment (or `pipx` for command-line tools), not `--break-system-packages`.
- Packages installed with `--user` put scripts in a directory not on PATH, so the command is "not found" even though the import works.
- Project tools (uv, Poetry, Pipenv, Hatch) manage their own environment; running plain `python` outside `uv run` or `poetry run` uses another one.
</context>

<task>
Fix this Python environment problem.

Symptom:
{{symptom}}
{{#setup}}

Setup:
{{setup}}
{{/setup}}

1. Ask for, or run if you have a shell, the read-only checks in the place where it fails: `which -a python python3 pip` (or `where` on Windows), `python -c "import sys; print(sys.executable, sys.version, sys.prefix)"`, `python -m pip --version`, `python -m pip show <package>`, and the interpreter shown by the editor or kernel. Explain what each output tells us.
2. From the outputs, state which interpreter runs the code and which one has the packages, and name the mismatch. If outputs are missing, stop and ask for them.
3. Give the fix as numbered commands for this OS and tool: create or recreate the venv with the intended Python, activate it, install with `python -m pip` or the project tool, select the interpreter in the editor, register the Jupyter kernel, or use the full venv path in cron or services. Prefer the project's existing tool (uv, Poetry, conda) over introducing another.
4. Confirm with the same checks that the interpreter and package now line up, and run the original command.
5. Give two or three habits that prevent a repeat for this setup.
</task>

<constraints>
- Do not recommend `sudo pip install`, `--break-system-packages` or deleting the system Python; explain why they break the OS.
- Do not delete existing environments without saying what will be lost and asking first.
- Give commands for the user's OS and shell only; if unknown, ask.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What is running
Which interpreter runs, which has the packages, and the evidence.
## Cause
The mismatch in one or two sentences.
## Fix
Numbered commands and editor settings.
## Keep it fixed
Habits for this setup.
</output_format>
