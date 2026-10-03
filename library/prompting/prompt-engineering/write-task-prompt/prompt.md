---
schema: 1
id: write-task-prompt
kind: prompt
title: Write a reusable task prompt
description: Writes a reusable prompt from a plain description of a task, with context, typed variables and defaults, constraints, an output format, an example and a rule to ask for missing inputs.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build]
requires: [none]
inputs: [text]
output: [prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prompt-design, prompt-templates, variables, reusable-prompts]
pairs_with:
  prompts: [improve-prompt, turn-chat-into-prompt, build-prompt-test-set, create-few-shot-examples]
  personas: [prompt-engineer]
args:
  - name: task_description
    description: What the prompt should do, in plain words - the input it gets, what it should produce, who uses the result, and anything that usually goes wrong when you ask an AI for this.
    type: text
    required: true
  - name: example_input_output
    description: "Optional: one real input and the output you would call good. This is the strongest signal of what you want."
    type: text
  - name: target_user
    description: "Optional: who will run the prompt, for example \"me, weekly\", \"our support team, non-technical\" or \"an automation, no human in the loop\"."
    type: string
    default: the person who described the task
output_contract:
  format: markdown
  sections: [Prompt, Variables, Design notes, Try it with]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reusable prompt is a small program: it is run many times, by people who did not write it, on inputs the author did not foresee. Current guidance from the major model providers converges on the same structure: give the context and purpose (who it is for and why), state the task as an explicit deliverable, separate variable inputs from instructions with clear delimiters, phrase constraints as what to do and why, define the output format exactly, add an example when the format or tone is hard to describe, and tell the model what to do when information is missing instead of letting it guess. A role line helps only when it carries real expertise or a stance; "You are a helpful assistant" adds nothing.
</context>

<task>
Write a reusable prompt for this task, to be run by {{target_user}}.

<task_description>
{{task_description}}
</task_description>
{{#example_input_output}}
<example_input_output>
{{example_input_output}}
</example_input_output>
{{/example_input_output}}

1. Restate the job in one sentence: input, deliverable, audience, and what "good" means. If the description leaves the deliverable or its audience unclear in a way that would change the prompt, ask up to three questions and stop.
2. Identify the variables: everything that changes between runs. For each, choose a name (snake_case), a type (string, text, enum, number or boolean), whether it is required, and a sensible default for optional ones. Keep the list short; fold rarely changed settings into the prompt.
3. Write the prompt in this order:
   - context: purpose, audience and the domain knowledge the model needs, including what usually goes wrong;
   - the task, with each variable as a placeholder (the variable name in double curly braces) inside its own delimiters or XML-style tag;
   - numbered steps only where order matters;
   - constraints, each phrased positively with its reason when not obvious;
   - a rule for missing or ambiguous input: ask, or proceed with stated assumptions, whichever suits the target user;
   - the exact output format (sections, length, structure);
   - one example if the format or tone is subtle, based on the example given or clearly marked as illustrative.
4. Add design notes explaining the non-obvious choices, and three test inputs, including an edge case and an input that should trigger the missing-information rule.
</task>

<constraints>
- Model-agnostic: plain Markdown and tags any assistant understands; no vendor-specific syntax or model names unless the description requires a specific tool.
- No filler roles, flattery or shouting (ALL CAPS, "CRITICAL", "NEVER EVER"); they cause over-application rather than compliance.
- Keep the prompt as short as complete allows, usually under 600 words.
- Do not add features, steps or outputs the task did not ask for; put optional ideas in the design notes.
- If the target user is an automation, make the output strictly parseable (for example a fixed JSON shape) and replace "ask" with a defined fallback value.
- If the task involves medical, legal, financial or mental-health advice, include a line in the prompt that states its limits and points to a qualified professional when stakes are high.
</constraints>

<output_format>
## Prompt
The complete prompt in one fenced block, ready to paste.
## Variables
A table: Name | Type | Required | Default | Description.
## Design notes
Three to six bullets.
## Try it with
Three test inputs and what a good output should do for each.
</output_format>
