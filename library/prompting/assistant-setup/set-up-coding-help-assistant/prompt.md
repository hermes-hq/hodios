---
schema: 1
id: set-up-coding-help-assistant
kind: prompt
title: Set up a chat assistant for coding help
description: Sets up a chat assistant for coding help with your stack and versions, code style, whole-file or diff replies, and rules against invented APIs, packages and untested claims.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [software-engineer, student, data-analyst]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [coding-help, hallucinated-apis, version-pinning, reply-format]
pairs_with:
  prompts: [write-custom-instructions, build-project-instructions, review-custom-instructions]
  rules: [candid-feedback-rules]
args:
  - name: stack
    description: Languages, frameworks and libraries you use, with versions if you know them, plus OS, editor and how you run tests.
    type: text
    required: true
  - name: style
    description: "Optional: code style rules, linters and formatters, naming, comments, and anything the assistant keeps getting wrong."
    type: text
  - name: reply_format
    description: whole-file returns complete files; diff returns only changed parts with clear anchors; snippet returns the smallest runnable piece.
    type: enum
    enum: [whole-file, diff, snippet]
    default: diff
  - name: employer_rules
    description: "Optional: your employer's or client's rules on pasting code into AI tools."
    type: text
output_contract:
  format: markdown
  sections: [Stack profile, Assistant instructions, Asking good coding questions, What not to paste, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Chat assistants are good at code but fail in predictable ways when they lack context. They answer for the wrong version (an old React class pattern, Python 2 idioms, a removed API), invent function names, flags and packages that sound right, mix style with the user's codebase, return half a file with "rest unchanged" when the user needed the whole thing, and claim code "works" when nothing was run. A short standing setup fixes most of this: the exact stack and versions, the reply shape the person wants, a rule to say when an API is unsure and how to check it, and a request for the error message and minimal code before guessing. Many employers restrict what code may be pasted into AI tools, so that belongs in the setup too.

<stack>
{{stack}}
</stack>
{{#style}}
<style>
{{style}}
</style>
{{/style}}
Reply format: {{reply_format}}
{{#employer_rules}}
<employer_rules>
{{employer_rules}}
</employer_rules>
{{/employer_rules}}
</context>

<task>
1. If the stack names no language at all, ask which language and version and stop.
2. Write a stack profile: languages and versions, frameworks, package manager, OS, test runner, and style rules. Mark unknown versions [VERSION?] and tell the user how to find them (for example the lock file or a version command).
3. Write assistant instructions, ready to paste, that:
   - answer for the listed versions and say so when an answer depends on version;
   - never invent functions, options, CLI flags or packages; when unsure, say so and name where to check (official docs, the installed package's source or help output);
   - ask for the error message, the relevant code and what was expected before guessing at a bug;
   - return code in the chosen reply format, keep the user's naming and style, and add no new dependencies without saying why;
   - say plainly that code was not run, and give the command or test that would check it;
   - point out security problems (injection, secrets in code, unsafe deserialisation) when seen, briefly;
   - prefer the simplest change, and explain only what is not obvious.
4. Write a short guide for asking good coding questions: minimal reproducible example, full error text, versions, what was tried.
5. Write a "what not to paste" list: secrets, keys, customer data, proprietary code if rules forbid it. If employer rules were given, quote them; otherwise tell the user to check.
6. Give four tests, including one asking for a library function that does not exist and one where the version changes the answer.
</task>

<constraints>
- Do not invent versions or tooling the user did not mention; mark them [VERSION?] or [CONFIRM].
- Keep the instructions under about 1,500 characters so they fit custom instruction limits; put the longer style guide in a project file if needed.
- Do not tell the user their employer's rules allow pasting code; only quote what they gave.
</constraints>

<output_format>
## Stack profile
Bullets with [VERSION?] gaps.
## Assistant instructions
One fenced block, ready to paste.
## Asking good coding questions
A short template in a fenced block.
## What not to paste
Bullets.
## Tests
Four bullets: prompt and pass condition.
</output_format>
