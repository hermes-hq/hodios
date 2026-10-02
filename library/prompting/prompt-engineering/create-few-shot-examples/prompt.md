---
schema: 1
id: create-few-shot-examples
kind: prompt
title: Create few-shot examples
description: Builds a small set of diverse, representative few-shot examples for a task, including tricky and negative cases, balanced so the model learns the rule rather than copying surface patterns.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist, individual]
inputs: [text, dataset]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [few-shot, in-context-learning, edge-cases, label-balance]
pairs_with:
  personas: [prompt-engineer]
  prompts: [improve-prompt, diagnose-prompt-failures]
args:
  - name: task
    description: The task the examples will teach, the input it receives, the expected output, and if possible a few real inputs.
    type: text
    required: true
  - name: count
    description: How many examples to write.
    type: number
    default: 4
  - name: format
    description: Optional - the output format each example must show, such as a label, JSON with given fields, or a short reply.
    type: string
output_contract:
  format: markdown
  sections: [Coverage plan, Examples, Why each is here, Watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Few-shot examples are the strongest signal in a prompt: models copy what they see, including things the author did not intend, such as length, wording, label order or a habit of always answering. Good example sets are diverse, look like the real inputs, cover the hard boundary cases, show what to do when the answer is "none" or "not enough information", and use exactly the output format required.

<task_description>
{{task}}
</task_description>
Number of examples: {{count}}
{{#format}}
Required output format: {{format}}
{{/format}}
</context>

<task>
1. If the task, its input or its expected output is unclear, ask up to three questions and stop. Ask for real sample inputs if none are given and the domain is specialised; otherwise write realistic ones and say they are synthetic.
2. List the dimensions along which real inputs vary (length, tone, language quality, category, ambiguity, missing fields) and the decision boundaries where mistakes are likely.
3. Plan {{count}} examples so that together they cover the main categories, at least one tricky boundary case, and at least one negative case (none of the categories apply, or not enough information) when the task allows one. If {{count}} is too few to cover the essentials, say what is left uncovered and suggest a number.
4. Write the examples: realistic inputs, and outputs in exactly the required format. Vary length and phrasing so no surface feature predicts the answer. Balance labels and shuffle their order.
5. Explain why each example is in the set and what it teaches.
6. Note risks: patterns the model might over-copy, and how to check that the examples help (run the prompt with and without them on held-out inputs).
</task>

<constraints>
- Examples must be correct. For tricky cases, give the reasoning in the "why" section, not inside the example output, unless the format includes reasoning.
- Never reuse the user's test or evaluation inputs as examples; that hides real performance.
- No real personal data. Use invented names and details.
- Wrap each example in <example> tags with <input> and <output> inside, so it can be pasted into any prompt.
</constraints>

<output_format>
## Coverage plan
Table: Example | Category or case | Dimension it covers.
## Examples
One fenced code block containing all examples, ready to paste.
## Why each is here
Numbered, one or two sentences each.
## Watch for
Bullets: over-copying risks, gaps, and how to test.
</output_format>
