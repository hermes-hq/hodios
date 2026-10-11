---
schema: 1
id: migrate-cocoapods-to-swift-packages
kind: prompt
title: Migrate iOS dependencies from CocoaPods to Swift packages
description: Moves an iOS app's dependencies from CocoaPods to Swift Package Manager pod by pod, covering binary frameworks, resources, post-install hooks, version pins, duplicate symbols and CI caching.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [mobile-engineer]
stack: [ios]
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [plan, table, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [swift-package-manager, cocoapods, xcframework, dependency-management, xcode]
pairs_with:
  prompts: [upgrade-major-dependency, migrate-views-to-declarative-ui]
  personas: [migration-engineer]
args:
  - name: podfile
    description: The Podfile and Podfile.lock (or a list of pods with versions), including any post_install hooks.
    type: text
    required: true
  - name: notes
    description: Anything else that matters, such as app extensions, a cross-platform framework on top, or internal pods.
    type: text
output_contract:
  format: markdown
  sections: [Pod inventory, Migration order, Changes made, Verification, Pods that stay for now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The CocoaPods maintainers have announced that the central specs repository is moving to read-only, which means no new pod versions there; check the current status, but the direction is clear. Swift Package Manager is built into Xcode, and most popular libraries ship packages, often under a different product name. The work is in the details: some vendors ship only an XCFramework, which becomes a binary target; resources move into package bundles accessed through `Bundle.module`, so code that loads images or nibs from the main bundle breaks; `post_install` hooks that set build settings (deployment target, bitcode, warnings) have no direct equivalent; Objective-C pods may need module imports changed; and pods and packages can coexist during the move, but linking the same library through both causes duplicate symbols or two copies at runtime. Apps built on a cross-platform framework depend on that framework's own CocoaPods or package support, so they follow its guidance first.
{{#notes}}
Notes: {{notes}}
{{/notes}}
</context>

<task>
Podfile and lock:
{{podfile}}

1. Inventory each pod: version from the lock, whether a Swift package exists (name and product if known, otherwise "to verify"), whether it is source or binary, resources it ships, subspecs used, and which targets (app, extensions, tests) use it.
2. Read the `post_install` hooks and say what each does and how it will be handled after the move (package settings, project build settings, or no longer needed).
3. Order the migration: leaf pods with clean packages first, binary SDKs next, pods with resources or subspecs after, and transitive dependencies together with the pods that pull them in so one library is never linked twice.
4. For each pod: remove it from the Podfile, run the install, add the package pinned to the same version or an exact range, link the right products to each target, update imports and resource loading, build all targets and run tests. One pod or one related group per commit.
5. When the Podfile is empty, remove the CocoaPods integration from the project and workspace, update CI (package resolution, caching of resolved packages, no pod install step) and commit `Package.resolved`.
6. Verify on a clean checkout: release build, app size compared with before, launch, and each feature that used a migrated resource or binary SDK.
</task>

<constraints>
- Do not claim a library ships a Swift package unless you know it; mark it "to verify" and say how to check.
- Never link the same library through both CocoaPods and a package at once.
- Keep versions identical during the move; upgrades are a separate change.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Pod inventory
Table: pod | version | package available | source or binary | resources | targets.
## Migration order
Numbered list with reasons.
## Changes made
Per pod or group: project changes, code changes, build result.
## Verification
Checks and results.
## Pods that stay for now
Pods without a package, with options (vendor the XCFramework, replace, wait).
</output_format>
