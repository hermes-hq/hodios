---
schema: 1
id: plan-agent-batch-migration
kind: prompt
title: Plan an agent-driven batch migration
description: Plans a large repetitive change across many files done by coding agents in batches, choosing codemod or agent per pattern, with a pilot recipe, per-batch checks, a ledger and stop rules.
category: meta
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead]
requires: [repo-read]
inputs: [text, repo]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [coding-agents, large-scale-changes, codemods, batching]
pairs_with:
  prompts: [plan-parallel-agent-worktrees, manage-agent-context-for-long-task, fix-lint-violations-repo-wide]
args:
  - name: change
    description: The repetitive change (API rename, library swap, framework upgrade pattern, logging format change) with one before and after example if you have it.
    type: text
    required: true
  - name: scale
    description: Roughly how many files or call sites, how they vary, and what checks exist (compiler, tests, lint).
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Split, Recipe, Batches, Stop rules, Hand-back list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents handed a 500-file mechanical change drift. Batch 1 and batch 9 transform the same pattern differently, hard cases get skipped silently, tests get edited until they pass, and the context fills up with diffs. The reliable approach is to split the work by pattern: a deterministic codemod or search-and-replace for the regular majority, agents only for the irregular remainder. A pilot on a handful of representative files produces a written recipe with before and after examples for each variant; every later batch follows the recipe instead of re-deriving it. A ledger of done, skipped and blocked files makes progress visible, and a stop rule halts the run when the error rate climbs instead of burning through the whole codebase.
</context>

<task>
Plan this change:
<change>
{{change}}
</change>
{{#scale}}
Scale and checks:
<scale>
{{scale}}
</scale>
{{/scale}}

1. Inventory: if you can read the repository, find the call sites with search and group them into variants (the plain case, each irregular shape, generated or vendored code to exclude). Otherwise give the search patterns the user should run and the variant groups to expect.
2. Split: decide per variant whether a codemod, a scripted replace or an agent handles it, and why. Mechanical and uniform goes to a codemod; varied or judgement-heavy goes to an agent.
3. Recipe: plan a pilot on five to ten files covering every variant. The output of the pilot is a recipe file with the rule for each variant, a before and after example, things never to change, and the check to run.
4. Batches: size each batch by what one session can verify (usually a module or 20 to 50 files), order them from least to most risky, and define per-batch verification (compile, affected tests, lint, a spot check of N diffs by a human) and a commit per batch.
5. Ledger: a file listing every target with status (todo, done, skipped with reason, blocked), updated after each batch.
6. Stop rules: halt and report when a batch's check fails twice, when more than a set share of files are skipped, or when the agent proposes changing tests or the recipe.
7. Hand-back: the cases that need a human and how they will be listed.
</task>

<constraints>
- Tests may be updated only where the recipe says the change requires it (for example a renamed import), never to make a failing behaviour pass.
- The recipe changes only by explicit human decision, then earlier batches are re-checked.
- Do not plan one giant pull request; plan reviewable units.
{{> output/uncertainty}}
</constraints>

<output_format>
## Inventory
Table: variant, example, approximate count, how found.
## Split
Table: variant, method, reason.
## Recipe
The recipe file template as a fenced Markdown block.
## Batches
Ordered list with size, verification and commit rule.
## Stop rules
Bullets with thresholds.
## Hand-back list
Format of the list of cases for humans.
</output_format>
