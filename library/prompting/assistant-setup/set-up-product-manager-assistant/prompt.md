---
schema: 1
id: set-up-product-manager-assistant
kind: prompt
title: Set up an AI assistant for a product manager
description: Sets up an assistant for a product manager with product context, a metrics glossary, your spec and update templates, and rules that separate data, user evidence and assumptions.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager]
requires: [none]
inputs: [text, document, preferences]
output: [prompt, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [product-context, metrics-glossary, spec-templates, evidence-labels, stakeholder-updates]
pairs_with:
  prompts: [build-project-instructions, prepare-knowledge-files, write-prd]
  personas: [product-manager]
args:
  - name: product
    description: The product, users, business model, current goals or OKRs, team, and the stage (early, growth, mature).
    type: text
    required: true
  - name: metrics
    description: "Optional: the metrics you use and how your company defines them (for example what counts as an active user)."
    type: text
  - name: tasks
    description: "Optional: jobs you want help with, for example specs, user story splitting, interview synthesis, roadmap updates, stakeholder emails, release notes."
    type: text
output_contract:
  format: markdown
  sections: [Product context file, Metrics glossary, Project instructions, Templates, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Product managers write a lot: specs, updates, interview syntheses, prioritisation notes, release notes. An assistant speeds this up, but out of the box it writes generic specs, invents market sizes, user quotes and conversion rates, uses metric names loosely ("engagement went up"), and presents opinions as evidence. In product work that leads to bad decisions dressed as data. Experienced PMs keep a one-page product context, define every metric once, and label claims by evidence: measured data, user research, stakeholder opinion, assumption. An assistant project with those files and an evidence-labelling rule produces drafts a team can trust, in the company's own templates.

<product>
{{product}}
</product>
{{#metrics}}
<metrics>
{{metrics}}
</metrics>
{{/metrics}}
{{#tasks}}
<tasks>
{{tasks}}
</tasks>
{{/tasks}}
</context>

<task>
1. Write a product context file: product, users and segments, problem, business model, current goals, team, constraints, glossary of product terms. Use only the input; mark gaps [CONFIRM]; add "last updated".
2. Write a metrics glossary: each metric with its definition, source and owner. Use only the given definitions; for named metrics without one, write [DEFINE].
3. Write project instructions, ready to paste, that:
   - read the context and glossary first and use metric names exactly as defined;
   - label claims as [DATA], [RESEARCH], [OPINION] or [ASSUMPTION];
   - never invent numbers, quotes, market sizes or competitor facts; write [NEED: ...] instead;
   - write specs that start from the problem and success measure before the solution, with non-goals and open questions;
   - challenge vague goals and solutions without a stated problem;
   - write updates for the named audience: decisions and asks first, then detail.
4. Write templates for each task named (default: one-page spec, weekly stakeholder update, interview synthesis): headings with one line on what goes in each.
5. Give four tests, including a request for a TAM figure and a spec request with no problem stated.
</task>

<constraints>
- Do not invent metrics definitions, numbers or competitor information.
- Keep the context file under about 2,500 characters; longer material goes into separate knowledge files.
</constraints>

<output_format>
## Product context file
One fenced block with [CONFIRM] gaps.
## Metrics glossary
Table: Metric | Definition | Source | Owner.
## Project instructions
One fenced block, ready to paste.
## Templates
One fenced block per template.
## Tests
Four bullets: prompt and pass condition.
</output_format>
