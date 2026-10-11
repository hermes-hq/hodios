---
schema: 1
id: define-specialist-subagent
kind: prompt
title: Define a specialist subagent
description: Writes a reusable subagent definition with a routing description, a narrow tool list, a focused system prompt and a short return format, for a recurring role such as test runner or reviewer.
category: meta
version: 1.0.0
status: incubating
stage: [design, build]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [text]
output: [prompt, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, multi-agent, subagents, least-privilege]
pairs_with:
  prompts: [write-subagent-brief, write-agent-custom-command, audit-agent-permissions]
args:
  - name: role
    description: The recurring job the subagent should do, when it should be used, and examples of past sessions where it would have helped.
    type: text
    required: true
  - name: tools_available
    description: The tools the agent environment offers (read, search, edit, shell, web, MCP tools) and the definition file format if known.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Definition, Routing tests, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reusable subagent runs in its own context and hands back a summary. That isolation is the point: it can read a 5,000-line test log or search half the repository and return ten lines, keeping the main session clean. It also allows restriction: a reviewer with read-only tools cannot "fix" what it reviews. The common failures are a description so broad the main agent routes everything to it, a return format so verbose that the noise comes back anyway, tools wider than the job, and a role that needs the main conversation's context, which a fresh subagent does not have. A one-off delegation needs a brief, not a definition.
</context>

<task>
Define a subagent for this role:
<role>
{{role}}
</role>
{{#tools_available}}
Environment:
<tools_available>
{{tools_available}}
</tools_available>
{{/tools_available}}

1. Fit check: is this recurring, separable from the main conversation's context, and noisy or specialised enough to benefit from isolation? If not, say what fits better (a one-off brief, a command, an instruction-file line) and stop.
2. Name it with a short role noun.
3. Write the routing description: when to use it, with two or three concrete trigger situations, and when not to use it. The main agent decides from this text alone.
4. Choose the smallest tool set that does the job. Read-only roles get no edit or shell tools; a test runner gets the shell but no edit tools unless fixing is in scope.
5. Write the system prompt: the job, the steps it follows, what it must never do, how it handles missing information (report back, do not guess), and the evidence it must include.
6. Define a return format short enough to be worth it: verdict first, then findings with file and line, then the commands run and their results. Set a length cap.
7. Write the definition in the definition format named in the environment notes, if any; otherwise as a portable Markdown file with frontmatter for name, description and tools, and mark format-specific keys "check against the tool's documentation".
</task>

<constraints>
- Never grant tools the role does not need, and never let a subagent change its own or the main agent's configuration.
- The system prompt must not assume anything from the parent conversation; it starts empty.
- Do not invent tool names; use the ones given or generic names marked for mapping.
</constraints>

<output_format>
## Fit check
Verdict and reason.
## Definition
One fenced block with the full definition file and its path.
## Routing tests
Three requests that should route to it and two that should not.
## Notes
Tool choices explained in one line each, and what to watch in the first week.
</output_format>
