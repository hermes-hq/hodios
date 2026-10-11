---
schema: 1
id: review-llm-prompt-change
kind: prompt
title: Review a production prompt change
description: Reviews a pull request that edits a production LLM prompt for behaviour regressions, broken output contracts, injection exposure, cost changes and missing eval evidence, with a merge verdict.
category: ai-ml
version: 1.0.0
status: incubating
stage: [review]
role: [ml-engineer, backend-engineer, tech-lead, software-engineer]
stack: [llm-apps]
requires: [none]
inputs: [diff, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pull-request, prompt-review, regression, output-contract]
pairs_with:
  prompts: [write-llm-eval-suite, run-prompt-regression-tests, detect-prompt-injection]
args:
  - name: prompt_diff
    description: The diff of the prompt change, including any code that renders the prompt or parses its output.
    type: text
    required: true
  - name: intent
    description: What the change is meant to fix or improve, and any eval results or examples attached to the PR.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Intent check, Findings, Evidence needed, Suggested edits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A prompt diff looks like a text edit, so code reviewers approve it in seconds, yet it changes behaviour for every request. The risky changes are easy to miss: renaming a field or heading the parser relies on; loosening "only answer from the sources" to fix one complaint and letting the model invent elsewhere; adding a strong instruction ("ALWAYS include a disclaimer") that overrides earlier rules; moving user content outside its delimiters; adding examples that the model then copies verbatim; and adding long text before the cacheable prefix, which breaks prompt caching and raises cost. A fix for one reported failure often regresses others, so a prompt PR needs eval evidence over the whole set, not one before-and-after example.
</context>

<task>
Review this prompt change.

Diff:
{{prompt_diff}}

Stated intent and evidence:
{{intent}}

1. Restate the intended behaviour change in one sentence and check the diff actually targets it. Flag edits that go beyond the intent.
2. Check the output contract: field names, headings, JSON keys, enums, delimiters and stop sequences that downstream code parses. Compare with the parsing code if it is in the diff, and say when it is not.
3. Check instruction conflicts: new rules that contradict or outrank existing ones, emphasis inflation (capitals, "always", "never") and rules that now apply more broadly than intended.
4. Check grounding and safety: any relaxation of "use only the provided context", refusal or escalation rules, or tool-use limits; user or retrieved text moved outside delimiters; new places untrusted input can inject instructions.
5. Check examples: whether new few-shot examples are diverse, whether the model is likely to copy their content, and whether they match the output contract.
6. Check cost and latency: added tokens per call, changes before the cached prefix, and longer expected outputs.
7. Judge the evidence: is there an eval run over the full set with before and after numbers, including the cases the change could break? If not, say exactly which cases must be run.
8. Give a verdict: approve, approve after the listed eval run, or request changes.
</task>

<constraints>
- Review the change, not the whole prompt; mention pre-existing problems in one line at the end.
- Do not claim a regression will happen; say what could regress and what test would show it.
- Quote the exact lines you comment on.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Approve, approve after eval, or request changes, with the main reason.
## Intent check
Does the diff do what the intent says, and nothing else?
## Findings
Table: severity | quoted line | issue | suggested fix.
## Evidence needed
The eval cases or metrics required before merge.
## Suggested edits
Revised lines, only where a finding needs them.
</output_format>
