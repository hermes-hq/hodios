---
schema: 1
id: write-documentation-standards
kind: prompt
title: Write a docs style guide
description: Writes a short style guide for developer docs from existing pages, covering voice, terms, headings, code samples, admonitions, screenshots and versioning, plus lint rules to enforce it.
category: docs
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [technical-writer, maintainer, developer-advocate]
stack: []
requires: [none]
inputs: [document, text]
output: [docs, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [house-style, terminology, vale, prose-linting, docs-as-code]
pairs_with:
  prompts: [audit-documentation, docs-site-overhaul-track, code-comment-rules]
  personas: [technical-writer]
args:
  - name: existing_docs_sample
    description: Three to six representative pages of your current docs as source, ideally a mix of tutorial, how-to and reference, plus any rules the team already follows.
    type: text
    required: true
  - name: product
    description: The product or project name, what it is, and who reads its docs.
    type: string
    required: true
  - name: base_guide
    description: A public style guide to defer to for anything not covered, for example the Google developer documentation style guide or the Microsoft Writing Style Guide.
    type: string
    default: none chosen
output_contract:
  format: markdown
  sections: [Style guide, Lint configuration, Observed inconsistencies]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A docs style guide is only useful if contributors read it once and can follow it from memory, and if the mechanical parts are checked by a tool so reviewers do not have to. Most project style guides fail by being a 40-page copy of a public guide nobody reads, by covering grammar trivia while ignoring what really varies (product terms, code sample conventions, how to write a step), or by having no enforcement. This guide is for {{product}}.

Base style guide to defer to for anything not covered: {{base_guide}}. If none is chosen, recommend one public developer style guide in one line and let the team decide.
</context>

<task>
<docs_sample>
{{existing_docs_sample}}
</docs_sample>

1. Read the sample and list what actually varies: product and feature names spelled several ways, person and tense, heading styles, how steps are written, how code, UI labels, file names and placeholders are formatted, admonition use, and link text.
2. Decide each rule from what the best existing pages already do, so the guide codifies good practice instead of inventing a new voice. Where the sample is split evenly, pick the option that is clearer for international readers and say why.
3. Write the guide, at most about 1,200 words, with one short "Do / Don't" example per rule taken or adapted from the sample:
   - voice and tone: person, tense, contractions, how to address the reader, words to avoid ("simply", "just", "easy");
   - terminology: a table of preferred terms, variants to avoid and capitalisation, including product names;
   - structure: headings (case, verbs for task headings), page openings, prerequisites, numbered steps with one action each and the expected result;
   - code: language tags on fences, placeholders format (for example `<your-project-id>`), copyable commands without prompts, output shown separately, comments in samples, tested samples;
   - UI and formatting: bold for UI labels, code for literals, file paths, keys; link text that says where it goes;
   - admonitions: which types exist and when to use each, at most one per section;
   - images: when a screenshot earns its place, alt text, no text that must be read only from an image, keeping them current;
   - versioning: how to mark version-specific behaviour and deprecated features.
4. Write lint configuration for the mechanical rules: a Vale style (or markdownlint where it fits better) with substitution rules for the terminology table, existence rules for banned words, and heading capitalisation. Mark each rule's level (error, warning, suggestion) so the first run is not a wall of errors.
5. List the inconsistencies found in the sample with the page and the rule that resolves each, so the team can fix them.
</task>

<constraints>
- Keep the guide short; drop any rule the sample shows no need for, and point to the base guide instead.
- Rules must be specific enough to check: no "be clear" or "write concisely" without a test.
- Do not invent product terms; take them from the sample or the product description, and list doubtful ones as questions.
- Lint rules must be valid for the tool named; if unsure of a field, say "(check the Vale docs)".
</constraints>

<output_format>
## Style guide
The guide in Markdown with the headings from step 3 and a terminology table (preferred, avoid, notes).
## Lint configuration
File tree, then each config file in a code block with its path.
## Observed inconsistencies
Table: page, issue, rule.
</output_format>
