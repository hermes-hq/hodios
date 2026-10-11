---
schema: 1
id: write-team-coding-standards
kind: prompt
title: Write a team coding standards document
description: Drafts a team's coding standards from its actual code, lint config and review comments, splitting what tools enforce from what needs judgement, with a reason and example for every rule.
category: conventions
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, software-engineer, engineering-manager, architect]
requires: [none]
inputs: [config, file, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-standards-doc, linting, review-comments, team-agreements, consistency]
pairs_with:
  prompts: [write-code-review-guidelines, write-agents-md]
args:
  - name: materials
    description: Representative code samples, the linter and formatter configs, recurring review comments, and any existing style notes. More real material gives a better document.
    type: text
    required: true
  - name: languages
    description: Languages and frameworks the standard covers.
    type: string
    required: true
  - name: pain_points
    description: The arguments or inconsistencies that made you want a standard, for example "naming of async functions", "where validation lives".
    type: text
output_contract:
  format: markdown
  sections: [Coding standards, Tooling changes, Inconsistencies found, Decisions needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding standards documents fail in two ways: they restate what the formatter already enforces (so nobody reads them), or they are a wish list copied from a public style guide that the codebase has never followed (so nobody believes them). A useful standard is short, describes what the team actually does or has agreed to do, moves everything mechanical into tools, and spends its words on judgement calls that reviewers keep raising: error handling, naming, boundaries, test shape. Every rule needs a one-line reason, or it will be argued again in every review, and a good and bad example, or it will be applied inconsistently.
</context>

<task>
Draft coding standards for {{languages}}.

<materials>
{{materials}}
</materials>
{{#pain_points}}
<pain_points>
{{pain_points}}
</pain_points>
{{/pain_points}}

1. Infer the conventions the code already follows consistently (naming, structure, error handling, test layout). Cite the sample that shows each one.
2. Find inconsistencies, where the code does the same thing in two or more ways, and list them with examples. Do not pick a winner silently; propose one with a reason and put it under Decisions needed.
3. Sort every candidate rule into: enforced by a tool (formatter, linter rule, type checker setting, CI check) or needs human judgement. For tool-enforceable rules, name the existing setting or the setting to add, and keep them out of the prose standard.
4. Write the judgement rules: each as one imperative sentence, a one-line reason, a short good example and bad example in the project's language, and its strength (must or prefer).
5. {{#pain_points}}Address each pain point explicitly with a proposed rule.{{/pain_points}} Keep the document to rules that would change a review outcome; drop generic advice ("write clean code").
6. Add a short section on how the standard changes: who can propose a change and how it is decided.
</task>

<constraints>
- Base inferred conventions only on the materials. If the samples are too few to infer a convention, say so rather than importing an external style guide.
- Do not invent lint rule names; if unsure of an exact rule name, describe the check and mark it `[confirm rule name]`.
- Keep the standard readable in ten minutes: about 15 to 30 judgement rules.
</constraints>

<output_format>
## Coding standards
Grouped sections (for example Naming, Structure, Errors, Tests). Each rule: statement, Why, Good, Bad, Strength.

## Tooling changes
| Rule | Tool | Setting | Already on? |

## Inconsistencies found
| Pattern | Variants seen (with examples) | Proposed choice |

## Decisions needed
Numbered questions for the team.
</output_format>
