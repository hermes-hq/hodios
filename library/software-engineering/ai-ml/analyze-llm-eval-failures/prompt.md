---
schema: 1
id: analyze-llm-eval-failures
kind: prompt
title: Analyze LLM failures into a taxonomy
description: Reads a sample of failing LLM traces or eval outputs, codes each failure, groups them into a failure taxonomy with counts and picks the fixes worth making first.
category: ai-ml
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [ml-engineer, data-scientist, product-manager, software-engineer]
stack: [llm-apps]
requires: [none]
inputs: [logs, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [error-analysis, failure-taxonomy, open-coding, eval-results]
pairs_with:
  prompts: [write-llm-eval-suite, check-answer-faithfulness, diagnose-prompt-failures]
args:
  - name: failures
    description: The failing examples, each with input, any retrieved context or tool calls, the output, and why it was marked bad (grader result, user feedback or reviewer note). 30 to 100 examples works best.
    type: text
    required: true
  - name: feature
    description: What the feature is supposed to do and how its pipeline works (single prompt, RAG, agent with tools).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Coded examples, Failure taxonomy, Root causes, Fix plan, Eval additions, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams improving an LLM feature usually jump from one vivid bad example to a prompt tweak, then another, without knowing which failure is most common. Error analysis fixes that: read real failures one by one, write a short note on what went wrong in each (open coding), then group the notes into categories (axial coding) and count them. The counts usually show that two or three failure types cause most of the problems, and that some are not prompt problems at all: retrieval missing the document, a tool returning bad data, a grader that is wrong, or a product question with no right answer. The categories should come from the data, not from a generic list decided in advance.
</context>

<task>
Analyze these failures for this feature: {{feature}}

Failures:
{{failures}}

1. For each example, write one line: what went wrong, at which stage (input understanding, retrieval or context, tool use, reasoning, instruction following, format, safety or refusal, grader error), and the first point where the pipeline went off course. Mark examples where the "failure" label itself looks wrong.
2. Group the notes into 4 to 10 failure categories that come from the notes. Give each a short name, a one-sentence definition precise enough that another reviewer would code the same way, and example ids.
3. Count examples per category and give the share. Note categories that co-occur.
4. For the top categories, state the likely root cause and whether the fix belongs in the prompt, retrieval, tools, data, model choice, the grader, or the product spec.
5. Rank fixes by (share of failures addressed) and (effort), and say how to verify each: which category's examples should pass after the fix, and what could regress.
6. Turn each category into one or more eval checks (a code assertion where possible, an LLM-judge criterion where not) so it is measured from now on.
</task>

<constraints>
- Base every category and count on the given examples. Do not add categories that no example shows.
- This is error analysis across the pipeline, not a prompt rewrite: do not draft revised prompt text here; name the fix and where it belongs.
- If the sample is small or not random (for example only user complaints), say how that biases the counts.
- Do not propose a fix without saying which examples it should change.
{{> output/uncertainty}}
</constraints>

<output_format>
## Coded examples
Table: id | what went wrong | stage | first point of failure | label doubtful?
## Failure taxonomy
Table: category | definition | count | share | example ids.
## Root causes
One short paragraph per top category.
## Fix plan
Table: rank | fix | where it belongs | categories addressed | effort | how to verify.
## Eval additions
One check per category with its type.
## Caveats
Sample size, bias and labelling doubts.
</output_format>
