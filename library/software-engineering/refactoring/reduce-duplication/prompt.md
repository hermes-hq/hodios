---
schema: 1
id: reduce-duplication
kind: prompt
title: Reduce code duplication
description: Finds duplicated logic, separates true duplication from code that only looks alike, and merges only true duplicates behind one well-named function. Use when one fix keeps landing in many places.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dry, duplication, abstraction]
args:
  - name: scope
    description: The directory, module or set of files to examine, or a description of the duplicated logic.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Duplicates, Changes, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Duplication hurts when the copies must change together and someone forgets one of them. Code that only looks alike but changes for different reasons is not duplication. Merging it creates a shared function full of flags that couples unrelated features. The wrong abstraction costs more than the copies did.
</context>

<task>
Reduce duplication in {{scope}}.
1. Find candidate duplicates: repeated blocks, near-identical functions, parallel switch statements, the same validation or formatting written several times.
2. For each group, decide whether it is:
   - **true duplication**: the copies represent the same rule and must change together. Look for evidence: commits that changed several copies at once, or a bug fixed in one copy and not the others;
   - **coincidental**: the copies look alike today but belong to different concepts that will change independently.
3. Merge only true duplication with at least three copies, or two copies that have already drifted and caused a bug. Give the shared code a name that states the rule it represents, and keep its parameters few. If it needs a boolean flag to serve its callers, it is the wrong abstraction.
4. Where copies have already drifted, decide which behaviour is correct. If you cannot tell, do not merge; report the difference as a question.
5. Run the tests after each merge.
</task>

<constraints>
- Leave coincidental duplication alone and say why.
- No behaviour changes. If merging would change one copy's behaviour, stop and report it.
- Prefer a plain function over a class hierarchy, generic or framework hook.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Duplicates
A table: # | Where (`path:line` for each copy) | True or coincidental | Evidence | Action.
## Changes
The diff for the merges you made.
## Verification
Test commands and results. List any drifted copies you left for a decision.
</output_format>
