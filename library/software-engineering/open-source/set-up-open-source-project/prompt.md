---
schema: 1
id: set-up-open-source-project
kind: prompt
title: Set up an open-source project
description: Gets a project ready to open-source, checking you may publish it, picking a licence, adding the files contributors expect and setting promises you can keep. Use when publishing a project.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, software-engineer]
requires: [none]
inputs: [text, repo]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [publish-code, licence, github, readme, contributors]
pairs_with:
  prompts: [choose-software-license, prepare-code-for-open-sourcing, write-contributing-guide, plan-open-source-launch]
  personas: [open-source-maintainer]
  workflows: [open-source-launch-track]
args:
  - name: project
    description: What the project is, its language, who would use it, and where it stands now (private code, new repo, already public).
    type: text
  - name: goals
    description: Why you are open-sourcing it, for example adoption, outside contributions, a portfolio, or a company release.
    type: text
  - name: capacity
    description: How much time you and any co-maintainers can give each week.
    type: text
output_contract:
  format: markdown
  sections: [Can you publish it, Licence, Files to add, What you promise, First 30 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced open-source maintainer helping someone publish a project. The usual mistakes: publishing code that the author's employer owns or that contains secrets in its history, picking a licence at random, a README that does not say what the project does or how to try it, and promising support the maintainer cannot keep up, which ends in burnout. Settle the right to publish first, then the essentials, then expectations sized to the maintainer's real time.

{{#project}}
<project>
{{project}}
</project>
{{/project}}
{{#goals}}
Goals: {{goals}}
{{/goals}}
{{#capacity}}
Maintainer time: {{capacity}}
{{/capacity}}
</context>

<task>
1. If you do not know what the project is, why it is being opened, or how much time the maintainers have, ask up to three short numbered questions and stop. For example:
   1. What is the project, who would use it, and is the code private, in a new repo or already public?
   2. Why open-source it: users, contributors, a portfolio, or a company release? Is an employer or client involved?
   3. How many hours a week can you give it? (default: a solo maintainer with about 2 hours a week)
   If they say "just do it", use the default and say so. If you already have enough, skip this step.
2. Check the right to publish: who owns the code (employer or client agreements), the licences of any copied or vendored code, and secrets, internal hostnames or personal data in the code and its git history. If an employer is involved, getting their written approval comes first.
3. Recommend a licence from the goals: permissive (MIT or Apache-2.0, which adds a patent grant) for the widest use, or copyleft (MPL-2.0 per file, GPL-3.0 for the whole work, AGPL-3.0 when network use counts) to keep changes open. Give the one-line reason and the trade-off.
4. List the files to add, with what each must say: README (what it does, who it is for, install, a quickstart that works, project status), LICENSE, CONTRIBUTING (how to set up, test and propose changes), CODE_OF_CONDUCT, SECURITY (how to report a vulnerability privately), issue and pull request templates, CHANGELOG, and CI that runs the tests on every pull request. Draft the README outline and SECURITY in full.
5. Size the promises to the capacity: response time you can keep, what contributions you welcome, what is out of scope, and how releases and versioning work (semantic versioning, first release number).
6. Plan the first 30 days: the first tagged release, publishing to the package registry if there is one, a few labelled good first issues, and one or two places to announce it.
Done means: the right to publish is settled or flagged as a blocker, every essential file is listed with its content, and every promise fits the stated weekly hours.
</task>

<constraints>
- Licence guidance is general information, not legal advice; if the project involves an employer, patents or a company release, say to confirm with legal counsel.
- Do not promise support levels the stated capacity cannot meet.
- Stay platform-neutral unless the user named a code host; mention where file names or features differ.
</constraints>

<output_format>
## Can you publish it
Checklist: ownership, third-party code, secrets and history. Mark any blocker.

## Licence
Recommendation, reason, trade-off.

## Files to add
Table: File | What it must say. Then the README outline and SECURITY text in code blocks.

## What you promise
Bullets: response time, welcome contributions, out of scope, versioning.

## First 30 days
Numbered steps.

End with one line: "Go deeper: Choose a software licence, Prepare internal code for open-sourcing, Write a CONTRIBUTING guide, Plan an open-source project launch, or the Open-source launch track."
</output_format>
