---
schema: 1
id: build-prompt-from-examples
kind: prompt
title: Build a prompt from input and output examples
description: "Reverse-engineers a reusable prompt from input and output example pairs, naming the implicit rules, format and edge cases, then dry-runs the prompt against the examples, including held-out ones."
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, ml-engineer]
requires: [none]
inputs: [text]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reverse-engineering, implicit-rules, prompt-design, generalisation, holdout]
pairs_with:
  prompts: [create-few-shot-examples, build-prompt-test-set, improve-prompt, write-task-prompt]
  personas: [prompt-engineer]
args:
  - name: examples
    description: "Input and desired output pairs, as many as you have (three is the minimum, eight or more is better). Mark each pair clearly, for example 'Input 1' and 'Output 1'. Remove personal data first."
    type: text
    required: true
  - name: target_use
    description: "Where the prompt will run and who reads the output, for example 'a spreadsheet AI column turning supplier emails into order lines' or 'a support tool drafting replies agents edit'."
    type: string
    required: true
  - name: holdout
    description: "Hold back some pairs from the prompt's own examples and use them only to test whether the prompt generalises. Applies when there are five or more pairs."
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Inferred rules, Conflicts and gaps, The prompt, Dry run, Next tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People often know what they want only by example: "turn this into that". Pasting the examples into a prompt and writing "do the same" works on the cases that look like the examples and fails on the rest, because the real rules stay implicit: what gets kept, dropped, normalised or reordered, how long the output is, what happens with missing or odd input, and which differences between examples are deliberate. A good prompt states those rules explicitly, uses a few examples only to show what words cannot, and is checked against examples it has not seen.

Target use: {{target_use}}
Hold out examples for testing: {{holdout}}

<examples>
{{examples}}
</examples>
</context>

<task>
1. Parse the pairs. If there are fewer than three, or inputs and outputs cannot be told apart, say what you need and stop.
2. If holding out is on and there are at least five pairs, set aside about one in five, chosen to include the most unusual pair, and do not use them while inferring rules.
3. Infer the transformation from the remaining pairs and name every rule you can see:
   - content rules: what is extracted, kept, dropped, added or normalised (names, dates, numbers, casing, units);
   - format rules: structure, order, length range, punctuation, labels;
   - tone and register;
   - edge handling visible in the pairs: empty or missing fields, ambiguous input, input that should be refused or flagged.
   For each rule, cite the example numbers that show it and rate your confidence (high when several pairs agree, low when one pair suggests it).
4. List conflicts, where pairs imply different rules, and gaps, where likely real inputs are not covered. Do not average conflicting examples; state the reading you used and ask which is intended.
5. Write the prompt for the target use: context and purpose, the task, the rules as explicit instructions with brief reasons, what to do when information is missing or input is out of scope, the exact output format, and two or three of the most varied training pairs as examples, marked as illustrations of the rules rather than templates. Delimit the input with tags and use a clearly marked slot such as [INPUT] for it.
6. Dry-run the prompt: apply it, as written, to every pair, held-out pairs included, and compare the result with the desired output. Mark each Match, Partial or Mismatch with the reason. If a mismatch comes from a missing or wrong rule, fix the prompt once and say what changed.
</task>

<constraints>
- The dry run is your own simulation of following the prompt, not a measured model run. Say so, and recommend running it for real on the held-out pairs and new inputs.
- Do not invent rules the examples do not support; put guesses under gaps, labelled as assumptions.
- Keep the prompt free of model or vendor names and of features only one tool has.
- If the examples contain personal data, use placeholders in the prompt's examples.
- Keep the prompt as short as the rules allow.
</constraints>

<output_format>
## Inferred rules
Table: Rule | Evidence (example numbers) | Confidence.
## Conflicts and gaps
Bullets, each ending with the question to answer or the assumption made.
## The prompt
One fenced block, ready to paste.
## Dry run
Table: Example | Training or held out | Result (Match, Partial, Mismatch) | Why. Then one line on any fix made.
## Next tests
Three to five new inputs worth trying, each targeting a gap or a low-confidence rule.
</output_format>
