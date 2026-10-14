---
schema: 1
id: document-existing-feature-behaviour
kind: prompt
title: Document an existing feature's behaviour
description: Writes a behaviour spec of an existing feature from code, tickets and observations before a rewrite or migration, marking each rule as confirmed, inferred or unknown, with quirks users rely on.
category: product
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [business-analyst, product-manager, software-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [file, ticket, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [legacy-systems, system-replacement, reverse-engineering, requirements]
pairs_with:
  prompts: [add-characterization-tests, write-prd, review-spec-for-gaps]
args:
  - name: feature_name
    description: The feature being documented and why (rewrite, migration to a new platform, replacing a vendor, onboarding).
    type: text
    required: true
  - name: sources
    description: What you have - code excerpts, old tickets, help articles, support replies, screenshots described in words, observed behaviour.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scope and sources, Behaviour rules, Quirks users may rely on, Unknowns to check, Suggested characterization tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rewrites fail on behaviour nobody wrote down. The old system rounds a total in a particular place, sorts ties by creation date, silently trims spaces, or lets a certain role do something the documentation says it cannot, and customers have built processes on those details. Before a rewrite or migration, the useful artefact is a behaviour spec of what the system actually does today, not what it was meant to do, with each rule labelled by how sure we are: confirmed by code or a test, inferred from tickets or support answers, or unknown. Bugs that customers depend on need a conscious keep-or-fix decision rather than an accidental change. Characterization tests that pin current behaviour turn the unknowns into facts cheaply.
</context>

<task>
<feature>
{{feature_name}}
</feature>
<sources>
{{sources}}
</sources>

1. State the scope (entry points, roles, data touched) and list the sources used, noting gaps such as code paths not provided.
2. Extract behaviour rules as numbered, testable statements in plain language: inputs, validation, calculations, ordering, defaults, permissions, side effects, error messages and time-dependent behaviour.
3. Label every rule confirmed (with the source line or ticket), inferred (with the reason) or contradicted (sources disagree, quote both).
4. List quirks users may rely on: behaviour that looks like a bug or accident but might be in use, with who could be affected and a keep, fix or ask recommendation.
5. List unknowns to check, each with the cheapest way to find out (read a named code path, query production data, ask support, run a test).
6. Suggest characterization tests: given, when, then statements that pin current behaviour, prioritising rules that are inferred or that the rewrite is most likely to change.
</task>

<constraints>
- Describe what the system does, not what it should do; keep improvements out of the rules and in the quirks recommendations only.
- Never upgrade an inferred rule to confirmed without a source; quote the source for confirmed rules.
- Do not guess behaviour of code paths that were not provided; list them as unknowns.
- If the sources are too thin to document behaviour, say what is missing and stop short of inventing rules.
</constraints>

<output_format>
## Scope and sources
Bullets, including gaps in the sources.
## Behaviour rules
Table: id, rule, label (confirmed / inferred / contradicted), source or reason.
## Quirks users may rely on
Table: quirk, who may depend on it, recommendation.
## Unknowns to check
Numbered: unknown, how to find out.
## Suggested characterization tests
Numbered Given / When / Then statements linked to rule ids.
</output_format>
