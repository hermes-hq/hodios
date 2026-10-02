---
schema: 1
id: write-agent-skill
kind: prompt
title: Write an agent skill
description: Writes a reusable agent skill (SKILL.md with frontmatter, steps, scripts and references) from a repeated task, with a trigger description models can match and a test plan. Use to package a workflow.
category: meta
version: 1.0.0
status: experimental
stage: [build]
role: [software-engineer, tech-lead, devops-engineer]
requires: [repo-read, file-write]
inputs: [text, notes, repo]
output: [docs, code, plan]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [agent-skills, skill-md, coding-agents, progressive-disclosure]
pairs_with:
  prompts: [write-agents-md, review-agent-transcript, write-subagent-brief]
args:
  - name: task
    description: The task you keep asking agents to do - what it achieves, the steps you take today, the tools and files involved, and what a good result looks like.
    type: text
    required: true
  - name: tools_available
    description: The agents and tools the skill must work with - which coding agents, shell access, CLIs, MCP servers, languages available for scripts, and permission limits.
    type: text
  - name: examples
    description: Two or three real instances of the task - the request as you phrased it and the result you wanted, or a transcript where it went well.
    type: text
output_contract:
  format: markdown
  sections: [Decision, Folder layout, SKILL.md, Supporting files, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A skill is a folder with a `SKILL.md` file: YAML frontmatter with a `name` and a `description`, then instructions, plus optional scripts and reference files. Agents that support the format see only the name and description of every installed skill and load the body when the description matches the request, then open supporting files only when the body points to them. So the description decides whether the skill is ever used, and the body must be short enough to load cheaply while the detail lives in files read on demand. Skills fail when the description is vague ("helps with deployments"), when the body repeats what the model already knows, when fragile steps that should be a script are left as prose, and when nobody tests whether the skill triggers on the requests it should and stays out of the ones it should not.
</context>

<task>
Turn this repeated task into a skill:
{{task}}
{{#tools_available}}

Tools and agents: {{tools_available}}
{{/tools_available}}
{{#examples}}

<examples>
{{examples}}
</examples>
{{/examples}}

1. Decide whether a skill is the right container. A one-line convention belongs in the project's instruction file; a one-off task belongs in a prompt; a multi-step procedure with its own knowledge, scripts or templates that recurs is a skill. If it is not a skill, say what it should be, give that instead, and stop.
2. Identify what the agent does not already know: the project-specific steps, commands, file locations, conventions, gotchas, and the definition of done. Leave out general knowledge the model has.
3. Write the frontmatter:
   - `name`: lowercase letters, numbers and hyphens, at most 64 characters, naming the activity (for example `release-mobile-app`).
   - `description`: at most 1,024 characters, third person, saying what the skill does and when to use it, with the words users actually type (taken from the examples), the file types or tools involved, and when not to use it if a nearby request could falsely match.
4. Write the body as numbered steps the agent follows, each with the exact command or file, the expected result, and what to do when it fails. Include a verification step that proves the task is done, and the points where the agent must ask for confirmation before acting (deploying, deleting, sending). Keep the body under about 500 lines; move long reference material into `references/` files and say in the body when to read each one.
5. Move steps that must be done exactly the same way every time (parsing, validation, generation from a template, multi-command sequences) into scripts under `scripts/`, in a language available in the environment, with clear usage output and non-zero exit codes on failure. Tell the agent to run them, not read them. Keep scripts free of secrets and of commands that download and execute remote code.
6. Add templates or examples under `assets/` or `references/` only if the output has a fixed shape.
7. Write the test plan: ten requests that should trigger the skill and five near-misses that should not, taken from or modelled on the examples; two or three end-to-end runs on real instances with the expected result; and a comparison against running the same tasks without the skill.

If the task description is too thin to write concrete steps (no commands, files or definition of done), ask for those details, ideally with one real example, and stop.
</task>

<constraints>
- Use only commands, paths and tools present in the input or the repository; mark anything you had to assume with TODO.
- Write instructions as direct, specific steps with the reason where it is not obvious. No filler such as "be thorough" and no shouting in capitals.
- Keep the skill portable across agents that support the format; isolate any agent-specific feature and say which agents need it.
- Respect the user's permission limits; never add steps that bypass confirmations or security checks.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Decision
One or two sentences: skill or not, and why.

## Folder layout
A tree of the skill folder.

## SKILL.md
The complete file in a `markdown` code block.

## Supporting files
Each script, reference or template in its own code block, with its path as a heading.

## Test plan
Table of trigger tests: request | should trigger (yes or no). Then the end-to-end runs and the with-and-without comparison.
</output_format>
