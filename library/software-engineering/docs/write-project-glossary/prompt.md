---
schema: 1
id: write-project-glossary
kind: prompt
title: Write a glossary for a project's docs
description: Builds a glossary of a project's domain and internal terms from its docs and code, with one meaning per term, the code name beside the user-facing name, conflicts flagged and terms to retire.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [technical-writer, software-engineer, tech-lead]
stack: []
requires: [none]
inputs: [document, text, repo]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [glossary, terminology, ubiquitous-language, domain-terms]
pairs_with:
  prompts: [write-documentation-standards, write-explanation-page, write-onboarding-guide, review-docs-for-localization]
  personas: [technical-writer]
args:
  - name: material
    description: Docs pages, README, UI text, API names, code identifiers or a list of terms that confuse people. The more real usage, the better the definitions.
    type: text
    required: true
  - name: audience
    description: Who uses the glossary, for example "new engineers", "API customers" or "support and engineering together".
    type: string
---
<context>
You write a project glossary. Confusion in technical projects rarely comes from obscure jargon; it comes from ordinary words used with project-specific meanings ("account", "workspace", "job", "tenant"), from two words for one thing (the UI says "project", the API says "app", the code says "space"), and from one word with two meanings in different teams. A useful glossary picks one preferred term per concept, records the synonyms and code names that map to it, defines terms by what they are and how they relate to each other, and flags conflicts for someone to decide rather than quietly picking a winner.

{{#audience}}Audience: {{audience}}{{/audience}}

<material>
{{material}}
</material>
</context>

<task>
1. Extract candidate terms: project-specific nouns, ordinary words used with a special meaning, acronyms, and names that differ between UI, API, docs and code.
2. Group terms that refer to the same concept. For each group, propose a preferred term (usually the user-facing one) and list the others as synonyms or code names.
3. Write each definition in one or two sentences: what it is, what it belongs to or contains, and how it differs from the closest neighbour term. Add a short usage example from the material where it helps.
4. Flag conflicts: the same term used for different things, or a concept with competing names where the material does not show which is preferred. Do not resolve them silently; list the decision needed.
5. Mark terms to retire (deprecated names still found in the material) and point to the preferred one.
6. Leave out general industry terms the audience already knows, unless the project uses them in a special way. Say which ones you left out.
7. Suggest where the glossary should live and how to keep it current (for example adding a term when a pull request introduces a new user-facing name).
</task>

<constraints>
- Define terms only from how the material uses them. Mark anything inferred with [verify]; do not invent relationships or limits.
- One preferred term per concept; never list two as equally preferred.
- Keep definitions plain and short; no circular definitions using the term itself.
{{> output/uncertainty}}
</constraints>

<output_format>
## Glossary
Alphabetical table: term | definition | also called (synonyms, code names) | see also.
## Conflicts to decide
Bullets: the conflict, where it appears, the options.
## Terms to retire
Table: old term | use instead | where it still appears.
## Left out
Bullets.
## Keeping it current
Two or three bullets.
</output_format>
