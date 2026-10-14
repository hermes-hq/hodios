---
schema: 1
id: write-design-system-ai-instructions
kind: prompt
title: Write design system instructions for AI coding agents
description: Writes an instructions file that teaches AI coding agents to build UI with your design system, covering which components and tokens to use, import paths, forbidden patterns and checks.
category: design-systems
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, tech-lead, designer]
requires: [repo-read]
inputs: [repo, config]
output: [docs, config]
risk: read-only
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [agent-instructions, ai-coding-agents, component-usage, design-tokens, codegen-quality]
pairs_with:
  prompts: [write-scoped-agent-rules, build-project-instructions, write-token-usage-guide]
  personas: [design-systems-lead, frontend-engineer]
args:
  - name: repo_path
    description: Path to the repository that contains or consumes the design system.
    type: string
    required: true
  - name: target_format
    description: Optional. Where the instructions will live, e.g. "AGENTS.md section", "a path-scoped rules file for UI folders". Defaults to a Markdown section that can be pasted into the agent instructions file.
    type: string
  - name: context
    description: Optional. Mistakes agents make in your codebase today, docs locations, and anything the instructions must forbid.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Instructions file, Component map, Token rules, Forbidden patterns, Verification steps, Maintenance, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AI coding agents default to what they saw most in training: raw HTML elements, hex colours, utility classes and popular public component libraries, not your design system. Left alone they rebuild existing components, hard-code colours, restyle system components with overrides and invent props that do not exist. Instructions that fix this are short and concrete: a compact map from need to component to import path, the rule to use semantic tokens and how to find them, an explicit list of forbidden patterns, where to look for details (docs and story files in the repository) instead of pasting whole docs, and the commands that check the result. Long instruction files get diluted and go stale, so every fact in them must come from the repository and be easy to regenerate.
</context>

<task>
Write design system instructions for AI coding agents working in {{repo_path}}. Read the repository; do not change files.
{{#target_format}}
Target format: {{target_format}}.
{{/target_format}}
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **Find the system.** Locate the component package or folder, its exports, the token source and how tokens are consumed (CSS custom properties, a theme object, utility classes), theming setup, docs or story files, and lint rules or scripts related to styling. If no design system or shared components exist, stop and report what you found.
2. **Component map.** A compact table of the most used components: need (for example "confirm a destructive action"), component, import path, and the one or two props that matter. Prefer the components most used in the app code; link to their docs or story files for the rest.
3. **Token rules.** How to reference tokens in this codebase, with one correct example, which token groups exist, and the rule to use semantic tokens rather than primitives or raw values.
4. **Forbidden patterns.** Concrete things agents must not do here, drawn from the codebase and the context: raw colour, spacing or font values; recreating a component that exists; overriding system component styles; importing from a library the project does not use; inventing props (check the component's types first).
5. **Verification steps.** The exact commands that exist in the repository to type-check, lint and test UI code, and how to view the component in the workshop or app.
6. **Instructions file.** Assemble the above into the file text for the target format, under about 120 lines, written as direct instructions to an agent.
7. **Maintenance.** Which parts should be regenerated when components change, and who owns the file.
</task>

<constraints>
- Read only. Do not create or modify files; output the instructions text.
- Every component name, import path, token and command must come from the repository; never invent one.
- Keep the instructions file short; point to docs in the repository for detail rather than copying them.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. The instructions file as one fenced block ready to paste. Component map as a table. End with Open questions.
</output_format>
