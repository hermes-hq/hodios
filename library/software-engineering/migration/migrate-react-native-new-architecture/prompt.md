---
schema: 1
id: migrate-react-native-new-architecture
kind: prompt
title: Move a React Native app to the New Architecture
description: Moves a React Native app and its own native modules to the New Architecture, with library readiness checks, TurboModule and Fabric conversion via codegen specs, and behaviour testing.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [mobile-engineer]
stack: [react-native]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [new-architecture, turbomodules, fabric, jsi, bridgeless]
pairs_with:
  prompts: [upgrade-react-native-version, fix-react-native-native-module-error]
  personas: [react-native-engineer]
args:
  - name: project
    description: React Native version, whether the New Architecture is already enabled, libraries with native code, and your own native modules and components.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Readiness, Library status, Own native code, Behaviour checks, Rollout, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The New Architecture replaces the asynchronous bridge with JSI: native modules become TurboModules, native views render through Fabric, and newer versions run bridgeless. Recent releases enable it by default, and the newest ones no longer let you turn it off (check the release notes for the target version), so staying on the old architecture blocks future upgrades. An interop layer lets many legacy modules and components work unchanged, but not all; modules that touch the bridge directly, rely on `UIManager` commands, or use `findNodeHandle` and `setNativeProps`-style imperative APIs often break or behave differently. Your own modules need a typed JavaScript spec (`Native*.ts` or a component spec) that codegen turns into native interfaces, and the native classes must implement the generated protocol or abstract class. Fabric renders synchronously in some cases and supports concurrent React features, which can change layout timing and effects ordering. Library readiness is the gating item; community directories and library changelogs list support, but the only real proof is running the app with the flag on.
</context>

<task>
Project: {{project}}

1. Read the native folders, `package.json` and the repo's own native modules and components. Confirm the React Native version supports the interop layer you need; if not, upgrade first as a separate change.
2. Build the library table: for each native library, record whether it supports the New Architecture, works via interop, or needs a replacement. Stop and discuss if a critical library is blocked.
3. Turn the architecture on in a branch (Android Gradle property, iOS pod install setting) and build both platforms. Fix build errors by cause.
4. Convert own native modules to TurboModules: write the typed spec, run codegen, implement the generated interface on iOS and Android, and keep the JavaScript API the same. Convert native view components to Fabric the same way.
5. Replace imperative APIs that no longer work (`findNodeHandle`, direct `UIManager` calls) with refs and view commands defined in the component spec.
6. Test on devices: every screen that uses a native view or module, events from native to JavaScript, layout of lists and modals, threading of callbacks, and release builds. Plan the rollout so the previous build can be shipped again if needed.
</task>

<constraints>
- Do not mark a library as supported because it builds; it must also work at runtime on both platforms.
- Do not change the JavaScript API of your own modules during conversion unless the user asks.
- Do not claim a library's support status without checking; mark it "to verify".
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Readiness
Current version, architecture flags, bridgeless status and blockers.
## Library status
Table: library | supports new architecture | works via interop | action.
## Own native code
Each module or component, its codegen spec and conversion status.
## Behaviour checks
Rendering, imperative APIs, events and threading checks with results.
## Rollout
Flags, release plan and how to switch back.
## Remaining risks
Bullets, or "None".
</output_format>
