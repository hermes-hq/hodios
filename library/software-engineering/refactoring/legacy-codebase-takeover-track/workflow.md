---
schema: 1
id: legacy-codebase-takeover-track
kind: workflow
title: Legacy codebase takeover track
description: Takes over an unfamiliar legacy codebase in gated steps, from building and running it to mapping risks, pinning behaviour with tests, a first small change and takeover notes.
category: refactoring
version: 1.0.0
status: incubating
stage: [discover, verify, build, maintain]
role: [software-engineer, tech-lead, consultant, maintainer]
requires: [repo-read, shell, file-write]
inputs: [repo, notes, text]
output: [report, tests, diff, docs]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [legacy-code, codebase-handover, characterization-tests, hotspots]
pairs_with:
  personas: [legacy-code-steward, refactoring-specialist]
  prompts: [map-repo-and-verify-setup, add-characterization-tests, explain-codebase, plan-large-refactor]
args:
  - name: codebase_description
    description: What the system does, who uses it, how you got it (new job, client handover, previous maintainer left), what you know about the stack, how it is deployed, and who you can still ask.
    type: text
    required: true
  - name: first_change_goal
    description: The first change you have been asked to make, for example a bug fix or a small feature. Optional; without it, step 4 picks a safe improvement.
    type: text
steps:
  - {id: run, file: steps/01-build-and-run.md, stage: discover, gate: approve, artifact: "takeover/01-build-and-run.md"}
  - {id: map, file: steps/02-map-and-risks.md, stage: discover, gate: approve, artifact: "takeover/02-map-and-risks.md"}
  - {id: pin, file: steps/03-pin-behaviour.md, stage: verify, gate: approve, artifact: "takeover/03-pin-behaviour.md"}
  - {id: change, file: steps/04-first-change.md, stage: build, gate: approve, artifact: "takeover/04-first-change.md"}
  - {id: notes, file: steps/05-takeover-notes.md, stage: maintain, gate: none, artifact: "takeover/05-takeover-notes.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes ownership of a codebase you did not write, in the order an experienced maintainer would: get it running, understand its shape and its dangers, pin down what it does today, make one small safe change end to end, and write down what you learned for the next person. Each step writes one artifact and stops for approval.

<codebase_description>
{{codebase_description}}
</codebase_description>

{{#first_change_goal}}<first_change_goal>
{{first_change_goal}}
</first_change_goal>{{/first_change_goal}}

Rules for every step:
- Read before claiming. Cite `path:line`, commands and their real output; separate what you verified from what you infer.
- If you cannot open the repository or run commands here, say so at the start, give the exact commands for the user to run, and wait for them to paste the output. Never report a build, test or run result you have not seen.
- Change nothing in production, shared environments or data. Run only local, read-only or sandboxed commands, and ask before anything that installs globally, migrates a database or calls external services.
- Do not fix what you find unless the step says so; record it. Keep refactoring and behaviour changes in separate commits.
- Never print or commit secrets you come across; note where they are and that they need rotation or moving.
- Ask for missing essentials (access, credentials for local services, who to ask) and mark gaps as [X].
- End each artifact with open questions.
