---
schema: 1
id: write-how-to-guide
kind: prompt
title: Write a how-to guide for one task
description: Writes a how-to guide for a reader who knows the basics, with a goal-named title, prerequisites, numbered steps with expected results, a verification step and links instead of tangents.
category: docs
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer, software-engineer, developer-advocate]
stack: []
requires: [none]
inputs: [text, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [how-to, diataxis, task-docs, procedures]
pairs_with:
  prompts: [write-code-tutorial, write-troubleshooting-guide, reorganize-docs-by-diataxis, write-explanation-page]
  personas: [technical-writer]
args:
  - name: task
    description: The single task the guide covers, phrased as a goal, for example "rotate the API signing key without downtime" or "deploy to a custom domain".
    type: string
    required: true
  - name: source_material
    description: What the guide should be built from - the real commands, config, UI steps, code, an engineer's notes or a support thread. The guide will only contain what this supports.
    type: text
    required: true
  - name: reader
    description: Who follows the guide and what they already know, for example "operators who installed the product and know Kubernetes".
    type: string
---
<context>
You write a how-to guide: directions for a competent reader who has a specific goal right now. It differs from a tutorial, which teaches a beginner by doing, and from reference and explanation pages. Common faults: titles named after features instead of goals; mixing in background theory; skipping prerequisites (permissions, versions, an existing resource); steps that bundle several actions; no expected result after a step, so readers cannot tell if it worked; ignoring the branch points real readers hit (different platform, existing configuration); and no way to check success or undo. Experienced writers link out for concepts and alternatives instead of covering them inline.

Task: {{task}}
{{#reader}}Reader: {{reader}}{{/reader}}

<source_material>
{{source_material}}
</source_material>
</context>

<task>
1. Check the task is one goal. If the input is really several tasks or a tutorial, say so and propose how to split it before writing.
2. Title the guide with the goal in the reader's words ("How to ..." or an imperative), and write one or two sentences on when to use it and when not to.
3. List prerequisites: access and permissions, versions, tools, existing resources, and anything destructive or with downtime the reader must plan for.
4. Write numbered steps, one action each. Give exact commands, code or UI paths from the source material, with placeholders in a consistent style that the reader replaces. After steps that change something, state the expected result or output.
5. Handle branch points with short, clearly labelled alternatives (by platform or starting state) rather than prose.
6. Add a verification section that proves the goal was reached, and a rollback or undo section if the task changes state.
7. End with next steps and links by description to the related concept, reference and troubleshooting pages instead of explaining them inline.
8. List anything in the source material that was unclear, contradictory or untested.
</task>

<constraints>
- Use only commands, flags, UI labels and values supported by the source material. Mark anything you had to infer with [verify].
- No background theory beyond one sentence per step; link to an explanation page instead.
- Warnings go before the step they apply to, not after.
- Do not include real secrets or personal data from the source; replace them with placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Guide
The full how-to guide in Markdown: title, when to use, prerequisites, steps, verify, roll back, next steps.
## Notes for the author
Bullets: unclear or untested points and [verify] items, or "None".
</output_format>
