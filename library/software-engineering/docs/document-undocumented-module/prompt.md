---
schema: 1
id: document-undocumented-module
kind: prompt
title: Document an undocumented module from its code
description: Reads an undocumented module and writes the missing developer doc - purpose, entry points, data flow, side effects, configuration and traps - with every claim tied to code and unknowns listed.
category: docs
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, technical-writer, tech-lead]
stack: []
requires: [repo-read, file-write]
inputs: [repo, file]
output: [docs, diagram]
risk: edits-files
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [legacy-code, code-archaeology, module-docs, reverse-engineering]
pairs_with:
  prompts: [write-ownership-handover-doc, document-public-api, document-configuration-options, investigate-code-history]
  personas: [technical-writer]
args:
  - name: module_path
    description: The folder, package or service to document, for example "services/billing/reconciler".
    type: string
    required: true
  - name: doc_location
    description: Where the doc should be written, for example "a README.md in the module folder" or "docs/internals/reconciler.md".
    type: string
    required: true
  - name: known_context
    description: Anything people already know or suspect about it, and the questions the team most needs answered.
    type: text
---
<context>
You document a module that nobody wrote docs for, usually because the original authors left. The reader is the next engineer who must change it safely. What they need most is not a restatement of each function but the things that are hard to see in code: what the module is for and who calls it, the entry points (HTTP routes, jobs, consumers, CLI commands, exported functions), where data comes from and goes to, side effects (writes, emails, payments, external calls), configuration and feature flags, implicit contracts (ordering, idempotency, time zones, units), and traps such as dead code that looks live or a function name that lies. Reverse-engineered docs are dangerous when they state guesses as facts, so every claim should point to the code that shows it.

Module: {{module_path}}
Write the doc to: {{doc_location}}
{{#known_context}}
<known_context>
{{known_context}}
</known_context>
{{/known_context}}
</context>

<task>
1. Read the module: its files, entry points, tests, configuration, and where other code calls into it (search the repository for imports and references). Read tests as the best evidence of intended behaviour.
2. Write the purpose in two or three sentences, and who or what depends on it.
3. List entry points with file and line references and what triggers each.
4. Describe the main flow for the most important entry point step by step, and draw it as a Mermaid sequence or flow diagram if it involves several components.
5. List data read and written, external calls and other side effects, with whether each is idempotent or retried, as far as the code shows.
6. Document configuration, environment variables and feature flags the module reads, with defaults from the code.
7. Write a "before you change this" section: implicit contracts, surprising behaviour, dead or suspicious code, missing tests, and risky areas.
8. Write an "open questions" section: everything the code does not settle, phrased so an owner or the git history could answer it, including the team's questions from the known context.
9. Write the doc to the given location. Do not change any code.
</task>

<constraints>
- Every behavioural claim must cite a file and line or a test. Mark inferences as "appears to" and list them under open questions.
- Do not modify code, tests or configuration; only create or update the doc file.
- Do not copy secrets or real customer data found in code, fixtures or config into the doc.
- Keep the doc focused on what a maintainer needs; do not narrate every function.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
The doc file, with sections: Purpose, Entry points, Main flow (with diagram), Data and side effects, Configuration, Before you change this, Open questions. Then a reply to the user with:
## Doc written
Path and a two-sentence summary.
## Riskiest findings
Up to five bullets.
## Open questions
Bullets.
</output_format>
