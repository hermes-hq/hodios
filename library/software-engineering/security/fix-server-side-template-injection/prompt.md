---
schema: 1
id: fix-server-side-template-injection
kind: prompt
title: Fix server-side template injection
description: Finds where user input is compiled as a template in Jinja, Twig, Freemarker, Velocity, Handlebars, ERB or similar engines, fixes it by passing data as variables or sandboxing, and adds tests.
category: security
version: 1.0.0
status: incubating
stage: [build, review]
role: [backend-engineer, security-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ssti, template-engines, remote-code-execution, injection, owasp]
pairs_with:
  prompts: [fix-xss-vulnerabilities, fix-command-injection, write-exploit-regression-test, review-pr-for-security]
  personas: [security-auditor]
args:
  - name: scope
    description: The repository or the code to check, and any lead (a scanner finding, a feature that lets users customise emails, invoices or notifications).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Changes, Tests, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Server-side template injection happens when user input becomes part of the template source rather than data passed into it. The difference is one line: `render_template_string("Hello " + name)` compiles the name as Jinja, while a fixed template string that references a `name` variable, rendered with `name=name`, does not. Because most template engines can reach the host language's objects, SSTI usually means remote code execution, not just XSS: Jinja via object attributes, Freemarker via `?new()` and `freemarker.template.utility.Execute`, Velocity and Thymeleaf expressions via reflection, Twig via filters and callbacks, ERB directly. The risky features are the ones products ask for: user-editable email or invoice templates, "custom message" fields, white-label pages, and report builders. Escaping or blocklisting characters does not fix it; the engines have too many syntax paths. Real fixes, in order: never compile user input (pass it as a variable); if users truly must write templates, use a logic-less engine (Mustache or Liquid with strict settings) or the engine's sandbox (`jinja2.sandbox.SandboxedEnvironment`, Twig's sandbox extension with an allowlist policy, Freemarker's `TemplateClassResolver.ALLOWS_NOTHING_RESOLVER` and restricted object wrapper) plus limits on render time and output size, accepting that sandboxes have had escapes. Client-side template injection (Angular expressions in server-rendered HTML) is a related XSS issue.
</context>

<task>
Find and fix server-side template injection in {{scope}}.

1. Identify the template engines in use from dependencies and imports.
2. Search for template compilation from strings: `render_template_string`, `Template(`, `Environment().from_string`, `createTemplate`, `new Template(` with a string reader, `Velocity.evaluate`, `Handlebars.compile`, `ERB.new`, `twig->createTemplate`, and template names built from request input (which can load arbitrary templates).
3. Trace each call site back to its inputs and mark which ones carry user-controlled text, including stored values like a saved email template or a profile field.
4. Fix each real finding with the strongest option that keeps the feature: pass input as variables to a fixed template; otherwise move user-authored templates to a logic-less engine or a configured sandbox with an allowlist, render time and size limits, and no access to application objects beyond a small data dict.
5. Write a regression test per fixed site that sends a harmless engine-specific arithmetic probe (`7*7` wrapped in that engine's expression delimiters) and asserts it is rendered literally rather than as 49, plus a test that legitimate templates still render.
6. Run the tests and report results.
</task>

<constraints>
- Do not rely on escaping or blocklisting template syntax as the fix.
- Do not write or run payloads that execute commands, read files or reach the network; use arithmetic probes only.
- Treat stored values (saved templates, profile fields) as user input.
- Mark sandbox-based fixes as reduced risk, not eliminated, and say why.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: location, engine, input source, exploitable (yes, no, unclear), fix.
## Changes
One line per file: `path`, what changed.
## Tests
The regression tests and their real results.
## Residual risk
What remains, such as sandboxed user templates, and the follow-up to remove it.
</output_format>
