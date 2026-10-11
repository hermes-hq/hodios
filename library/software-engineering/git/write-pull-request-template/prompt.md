---
schema: 1
id: write-pull-request-template
kind: prompt
title: Write a pull request template
description: Writes a short pull request template for a repository, with only the prompts reviewers actually need, a checklist tied to real project risks, and variants for different change types if useful.
category: git
version: 1.0.0
status: incubating
stage: [build, review]
role: [tech-lead, maintainer, software-engineer]
stack: []
requires: [none]
inputs: [text, document]
output: [docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pull-request, pr-template, review-checklist, contributor-experience]
pairs_with:
  prompts: [write-pr-description, write-codeowners-file, configure-branch-protection]
args:
  - name: project_context
    description: What the project is, who opens pull requests (team members, outside contributors, bots), what reviewers keep asking for, and the risks that matter, such as database migrations, public API changes, feature flags or translations.
    type: text
    required: true
  - name: current_template
    description: The existing template, if any, and what people do with it (ignore it, delete it, tick every box).
    type: text
---
<context>
You write the pull request template for a repository. Long templates fail: authors delete them or tick every box without reading. A good template asks for the few things a reviewer cannot get from the diff (why the change exists, how it was tested, what could break, how to roll it back) and turns the project's real risks into short, specific checks ("migration is backward compatible with the previous release") instead of generic virtues ("code is clean"). Items that CI already enforces do not belong in it. Comments in the template can guide authors without cluttering the final description. Hosting services support a default template and sometimes several selectable ones, with different file locations.

<project_context>
{{project_context}}
</project_context>

{{#current_template}}
<current_template>
{{current_template}}
</current_template>
{{/current_template}}
</context>

<task>
1. List what reviewers need that the diff does not show, based on the context. Drop anything CI or branch protection already checks, and say what you dropped.
2. Write the template in Markdown: a few headed sections with short HTML comments explaining what to write, and a checklist of at most six project-specific items, each one a concrete, checkable statement.
3. If the context shows distinct change types with different risks (for example dependency updates, database changes, docs-only), propose whether separate templates are worth it, and write them if so.
4. If there is a current template, say what you removed or changed and why.
5. Give the file location to use and tell the user to confirm it for their hosting service.
6. Suggest how to keep it useful: review it when reviewers keep asking for the same missing thing, and remove items nobody acts on.
</task>

<constraints>
- Keep the default template short enough to fill in under two minutes.
- No generic checklist items such as "I have followed best practices" or "code is well documented"; every item must name a project risk.
- Do not invent the project's tools, CI checks or policies; use only what the context gives.
- Write for outside contributors too if they open pull requests: no internal jargon without explanation.
</constraints>

<output_format>
## What reviewers need
Bullets, plus what was left out because CI covers it.
## Template
The Markdown file in a code block.
## Other templates
Code blocks, or "Not needed" with the reason.
## Changes from the current template
Bullets, or "No current template".
## Where to put it
File path, to confirm.
## Keeping it useful
Two or three bullets.
</output_format>
