---
schema: 1
id: improve-naming
kind: prompt
title: Improve naming in code
description: Proposes clearer names for variables, functions, types and modules, explains each rename and applies them without changing behaviour. Use when code reads poorly because of its names.
category: refactoring
version: 1.0.1
status: incubating
aliases: [refactor-naming]
stage: [maintain, review]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo, text]
output: [diff, table]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [identifier-naming, readability, rename, ubiquitous-language, clean-code]
pairs_with:
  personas: [code-reviewer]
  prompts: [simplify-function, extract-module, reduce-duplication]
args:
  - name: code
    description: The code to improve, pasted, or file paths in the repo.
    type: text
    required: true
  - name: domain_glossary
    description: The business terms the team uses and what they mean, for example "a Booking is confirmed; a Reservation is only held".
    type: text
  - name: conventions
    description: 'Naming conventions to follow, for example "PEP 8", "Go: short receiver names, no Get prefix", or a link to the style guide. Leave empty to follow the language''s and the codebase''s conventions.'
    type: string
output_contract:
  format: markdown
  sections: [Rename table, Not renamed, Changes, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id refactor-naming."}
---
<context>
Names are most of what a reader has to understand code. Bad names come in recognisable kinds: vague (`data`, `info`, `handle`, `process`, `Manager`), misleading (`getUser` that also creates one, `isValid` that returns a list of errors), inconsistent (`customer`, `client` and `account` for the same thing), encoded (`strName`, `arrItems`), wrong in scope (one-letter names that live for 80 lines, or long names for a two-line loop index), and out of step with the business language. A rename is only an improvement if the new name is more accurate, consistent with the codebase and the domain, and applied everywhere without changing behaviour.
</context>

<task>
Improve the names in:

<code>
{{code}}
</code>

{{#domain_glossary}}
Domain glossary:
{{domain_glossary}}
{{/domain_glossary}}
{{#conventions}}
Conventions: {{conventions}}
{{/conventions}}

1. Read the code and enough of its callers to understand what each name really refers to and does. For functions, check what they actually do, including side effects and return values, not what their name claims.
2. Find names worth changing and classify each: vague, misleading, inconsistent with the rest of the codebase or the glossary, encoded type or scope, wrong length for its scope, or a convention violation (case, prefixes, verb tense for booleans and functions).
3. For each, propose one name following these rules: use the glossary's terms; functions are verbs that say what they do and reveal side effects (`loadOrCreateUser`, not `getUser`); booleans read as yes or no questions (`isExpired`, `hasAccess`); collections are plural; units go in the name when the type does not carry them (`timeoutMs`); length grows with scope; match the existing codebase's conventions over personal preference. If a name is misleading because the function does two things, say so and suggest the split in one line instead of hiding it with a longer name.
4. Separate safe renames from risky ones. Risky renames include public API, exported symbols used by other packages, serialised field names (JSON, database columns, message schemas), configuration keys, names used via reflection, string-based lookups, templates or dependency injection, and anything in a published SDK. Do not apply risky renames; list them with the migration they would need.
5. Apply the safe renames everywhere they are referenced, using the language's refactoring tooling or a careful search that also covers tests, comments and docs in the repo. If the code was pasted rather than in a repo, return the rewritten code.
6. Run the type checker, linter and tests if they exist, and report the real results. Behaviour must not change.
</task>

<constraints>
- Change names only. No logic changes, no reformatting, no reordering, no new abstractions.
- Do not rename for taste: every rename has a reason from step 2. If the existing name is fine, leave it.
- Keep the number of renames proportionate; prefer the 5 to 15 that most improve understanding over renaming everything.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Rename table
Table: old name, new name, kind (variable, function, type, module), problem, why the new name is better. Applied renames only.
## Not renamed
Table: name, proposed name, why it was not applied (public API, serialised, reflection) and the migration it would need. Or "None".
## Changes
For pasted code, the full rewritten code in one fenced block. For a repo, one line per file changed.
## Verification
The checks run and their real results, or which checks could not be run.
</output_format>
