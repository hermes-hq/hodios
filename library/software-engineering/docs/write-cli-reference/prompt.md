---
schema: 1
id: write-cli-reference
kind: prompt
title: Write a CLI reference
description: Writes the help text, man page and web reference for a command-line tool from its argument parser, with synopsis, options grouped by task, exit codes, environment variables and real examples.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [maintainer, software-engineer, technical-writer]
stack: []
requires: [none]
inputs: [file, text]
output: [docs, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cli, man-page, help-text, exit-codes, command-line]
pairs_with:
  prompts: [document-configuration-options, document-error-codes, write-readme]
args:
  - name: parser_code_or_help
    description: The argument parser definition (argparse, click, cobra, clap, commander, yargs) or the current --help output, plus any notes on exit codes, environment variables and config files.
    type: text
    required: true
  - name: tool_name
    description: The command name users type, for example "dbsnap".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Help text, Man page, Web reference, Inconsistencies]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CLI is documented in three places that drift apart: the `--help` text read in the terminal, the man page read by people who want the full story offline, and the web reference found through search. Common failures: help text that is a wall of every flag in definition order, a synopsis that does not show which arguments are required, no exit codes (so scripts cannot react to failures), examples that use flags that no longer exist, and environment variables documented nowhere. The tool is `{{tool_name}}`.
</context>

<task>
<parser>
{{parser_code_or_help}}
</parser>

1. Extract the full command model: subcommands, positional arguments (required or optional, repeatable), options with short and long forms, value types, defaults, mutually exclusive groups, environment variables that set options, config files read, and exit codes. Note anything implied by the code but not visible to users.
2. Write the synopsis in conventional notation: `[optional]`, `<placeholder>`, `...` for repeatable, `a|b` for alternatives, one line per usage form.
3. Group options by task (input, output, connection, behaviour, global), not alphabetically, and put the five most used first if you can tell.
4. Write examples that show real tasks, from simplest to advanced, each with a one-line purpose and, where useful, its output. Include one example of use in a script that checks the exit code.
5. Help text: fit in about 80 columns and about one screen for the top level; one line per option; point to the man page or `help <subcommand>` for detail.
6. Man page: in roff (mdoc or man macros) with NAME, SYNOPSIS, DESCRIPTION, OPTIONS, ENVIRONMENT, FILES, EXIT STATUS, EXAMPLES, SEE ALSO.
7. Web reference in Markdown: one page or section per subcommand with anchors per option, so error messages and support can link to them.
8. Check consistency across the three: same option names, defaults and wording of descriptions. Recommend generating at least two of them from the parser definition (name the tool that fits the parser library) so they cannot drift.
</task>

<constraints>
- Every option, default and exit code must come from the parser or notes. If exit codes are not defined, say so and propose a convention (0 success, 1 general error, 2 usage error) marked as a proposal.
- Do not invent subcommands or flags in examples.
- Use the same name for each concept everywhere; if the parser uses two names for one thing, flag it.
- If the input is only partial help output, document what is visible and list what is missing.
</constraints>

<output_format>
## Help text
A plain-text code block exactly as `{{tool_name}} --help` should print it.
## Man page
A roff code block.
## Web reference
Markdown with a synopsis, an options table (option, short, value, default, env var, description) per command, exit codes table and examples.
## Inconsistencies
Bullets: mismatches found in the source (defaults, names, undocumented behaviour) and the generation recommendation.
</output_format>
