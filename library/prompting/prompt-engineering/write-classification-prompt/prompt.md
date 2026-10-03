---
schema: 1
id: write-classification-prompt
kind: prompt
title: Write a classification prompt
description: Writes a classification prompt with sharp label definitions, include and exclude rules, boundary cases, balanced examples and an abstain option, plus a plan to measure accuracy on labelled data.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [ml-engineer, data-analyst, software-engineer, support-agent]
requires: [none]
inputs: [text, dataset]
output: [prompt, table, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [text-classification, labeling, taxonomy-design, confusion-matrix]
pairs_with:
  prompts: [create-few-shot-examples, write-batch-processing-prompt, build-prompt-test-set]
  personas: [prompt-engineer]
args:
  - name: labels
    description: The labels you want, with what each means to you and what the result is used for (routing, reporting, filtering). Say if an item can have more than one label.
    type: text
    required: true
  - name: examples
    description: "Optional: real items with the label you would give them, especially ones people disagree about. Remove personal data first."
    type: text
output_contract:
  format: markdown
  sections: [Label definitions, Prompt, Boundary cases, Measuring it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most classification errors come from the label set, not the model: labels that overlap, a catch-all that swallows everything, no rule for items that fit two labels, and no way to say "I can't tell". A good classification prompt defines each label by what it includes and excludes, settles the common collisions with explicit tie-break rules, gives an abstain label for genuinely unclear items, and shows a few balanced examples drawn from the hard boundaries rather than the easy middle.

<labels>
{{labels}}
</labels>
{{#examples}}
<examples>
{{examples}}
</examples>
{{/examples}}
</context>

<task>
1. Check the label set. Flag overlaps, gaps (common items no label covers), labels nobody could apply consistently, and a missing "other" or abstain label. If the purpose or single versus multi-label is unclear and changes the design, ask up to three questions and stop; otherwise default to single-label and say so.
2. Write label definitions: for each label, one-sentence meaning, "includes" and "excludes" bullets, and a typical example.
3. Write tie-break rules for the collisions you found, as an ordered priority or explicit "if both X and Y, choose X because…" rules tied to what the label is used for.
4. Define the abstain option: when to use it (not enough information, outside the domain, two labels equally valid after tie-breaks) and that it is preferred to a guess.
5. Write the prompt: purpose, label definitions, tie-breaks, abstain rule, the item in delimiters, and an exact output format: the label from the fixed list, then a one-sentence reason quoting the decisive words. Put the reason after the label only if the consumer parses the first line; otherwise reason first. Add four to eight short examples covering every label and the main boundaries, balanced so no label dominates.
6. List boundary cases with the expected label.
7. Give a measuring plan: a labelled set of at least 50 items with the real label mix, accuracy per label, a confusion matrix to find which pairs get mixed up, abstain rate, and which definitions to revise first.
</task>

<constraints>
- Labels in the output must be exact strings from the list; say so in the prompt.
- Do not invent the user's business rules. When a tie-break needs a policy decision, propose one and mark it for confirmation.
- Use the user's examples to calibrate, but do not copy them all into the prompt; pick the most informative.
- Keep the prompt model-agnostic and under about 600 words excluding examples.
</constraints>

<output_format>
## Label definitions
Table: Label | Meaning | Includes | Excludes. Then the tie-break rules and the abstain rule. Flag issues found in step 1 at the top.
## Prompt
The full prompt in a fenced block with [ITEM] marking where each item goes.
## Boundary cases
Table: Item | Expected label | Rule that decides it.
## Measuring it
Short numbered plan.
</output_format>
