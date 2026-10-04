---
schema: 1
id: improve-prompt
kind: prompt
title: Improve a prompt
description: Diagnoses why a prompt gives weak or inconsistent results and rewrites it with clear context, task, constraints and output format while keeping its intent. Use on any prompt for any AI assistant.
category: prompt-engineering
version: 1.0.1
status: experimental
aliases: [ai-prompt-eng]
stage: [review]
requires: [none]
inputs: [text]
output: [prompt, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prompt-design, system-prompt]
args:
  - name: prompt
    description: The prompt to improve, including any system prompt and example inputs.
    type: text
    required: true
  - name: problem
    description: What goes wrong today (for example "ignores the word limit" or "invents sources"), and what a good output looks like.
    type: text
  - name: target
    description: Where the prompt runs, such as a chat assistant, a coding agent, an API call or an automation.
    type: string
    default: any modern AI assistant
output_contract:
  format: markdown
  sections: [Diagnosis, Improved prompt, What changed, Test it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id ai-prompt-eng."}
---
<context>
Most weak prompts fail for a few reasons that current guidance from the major model providers agrees on: the task is implicit, the context the model needs (audience, purpose, what good looks like) is missing, instructions conflict or are buried, the output format is undefined, inputs are not separated from instructions, and there are no examples where the format is subtle. Modern models follow instructions literally, so vague requests get generic answers. Shouting (ALL CAPS, "CRITICAL", "NEVER EVER") now tends to cause over-application rather than compliance. A better prompt is usually clearer and more specific, not longer.
</context>

<task>
Improve this prompt for {{target}}:
<prompt>
{{prompt}}
</prompt>
{{#problem}}
What goes wrong today: {{problem}}
{{/problem}}

1. Work out the prompt's intent: the task, the audience of the output and what a good result looks like. If the intent is ambiguous in a way that changes the rewrite, list the question and state the reading you chose.
2. Diagnose it against this checklist, citing the exact phrase for each problem:
   - task stated explicitly, as an action and a deliverable;
   - context: why, for whom, and what the model must know;
   - success criteria and a definition of done;
   - output format, length and structure;
   - constraints phrased as what to do, with the reason when it is not obvious;
   - conflicting, duplicated or buried instructions;
   - variable inputs separated from instructions (delimiters or tags) and placeholders kept;
   - examples, when the format or tone is hard to describe, varied enough not to be copied literally;
   - guardrails for facts: what to do when information is missing instead of guessing;
   - filler, vague role-play ("you are a world-class expert") and emphasis that does not change behaviour.
3. Rewrite the prompt: keep every requirement and placeholder the author had, fix each diagnosed problem, and order it as context, task, constraints, output format, then examples.
4. Propose two or three test inputs, including one edge case, that would show whether the new version beats the old one.
</task>

<constraints>
- Keep the author's intent, scope and placeholders exactly; do not add features, tools or requirements they did not ask for. Put suggestions for extra scope under What changed, labelled as optional.
- Make the prompt as short as it can be while still complete. Do not pad it with generic advice.
- Stay model-agnostic unless the target names a specific tool; then use that tool's conventions only where they matter.
- Do not claim the new prompt will perform better; say how to test it.
</constraints>

<output_format>
## Diagnosis
A table: problem | evidence (quoted phrase) | fix.
## Improved prompt
The full rewritten prompt in one fenced block, ready to paste.
## What changed
At most six bullets, most important first.
## Test it
Two or three test inputs and what a good output should do for each.
</output_format>
