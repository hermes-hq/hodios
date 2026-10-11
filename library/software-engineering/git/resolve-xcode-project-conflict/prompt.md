---
schema: 1
id: resolve-xcode-project-conflict
kind: prompt
title: Resolve an Xcode project file conflict
description: Resolves merge conflicts in an Xcode project.pbxproj file without corrupting it, checks the project still opens and builds, and sets up practices that stop these conflicts from recurring.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, software-engineer]
stack: [git, ios]
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [xcode, pbxproj, merge-conflict, project-file]
pairs_with:
  prompts: [resolve-merge-conflict, reduce-recurring-merge-conflicts]
args:
  - name: context
    description: What each branch did to the project (added files, targets, packages, build settings), the operation in progress, and the Xcode version the team uses.
    type: text
output_contract:
  format: markdown
  sections: [Conflicts, Integrity check, Build, Stop it recurring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An Xcode project.pbxproj is a property list of objects keyed by 24-character ids, cross-referenced from several sections: PBXFileReference, PBXBuildFile, PBXGroup children, build phases, and target and configuration lists. Two branches that each add a file both edit the same lists, so conflicts are routine. Most are additive and safe to combine by keeping both sides' lines, but every id referenced anywhere must have exactly one definition, and every definition should be referenced; taking one side wholesale drops the other branch's files from the build while leaving them on disk. A broken file shows up as Xcode refusing to open the project. `plutil -lint` checks syntax, not references. Lasting fixes remove the cause: a generated project (XcodeGen, Tuist) with the pbxproj out of git, Xcode 16's buildable folders (folder-based groups that need no per-file entries), or Swift packages for modules; a `.gitattributes` `merge=union` line is a common tip but can duplicate or misorder entries and is risky.
</context>

<task>
Resolve the Xcode project conflict in this repository.{{#context}} Context: {{context}}{{/context}}

1. Run `git status` and list conflicted files. Check whether the project is generated (project.yml, Project.swift); if so, do not edit the pbxproj: resolve the spec file and regenerate with the tool.
2. For each conflict hunk in project.pbxproj, read base, ours and theirs and identify what the hunk contains (file references, build files, group children, build phase entries, build settings).
3. Combine additive hunks by keeping both sides' entries without duplicate ids. For build settings changed on both sides, take neither automatically; show the two values and ask.
4. Check integrity after resolving: every id used in a list has a definition, no id is defined twice, and every file on disk added by either branch is referenced where its branch had it. Run `plutil -lint` on the file.
5. Build every affected target and scheme from the command line (`xcodebuild -list`, then `xcodebuild build` for the main scheme with a simulator destination) and run the tests if they exist.
6. Stage the file and stop; let the user continue the merge or rebase.
7. Recommend one prevention step fitting the team: buildable folder groups, generating the project, moving code into Swift packages, or merging project changes promptly. Mention the risk of `merge=union` if they ask about it.
</task>

<constraints>
- Never resolve the pbxproj with `--ours` or `--theirs` wholesale.
- Do not reformat or reorder the file beyond the conflict hunks.
- Do not continue the merge, commit or push.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Conflicts
Table: hunk | what it contains | resolution.
## Integrity check
Missing or duplicate ids found and fixed, and the lint result.
## Build
Commands run and results.
## Stop it recurring
One recommended change and why.
</output_format>
