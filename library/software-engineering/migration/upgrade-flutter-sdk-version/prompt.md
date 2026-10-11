---
schema: 1
id: upgrade-flutter-sdk-version
kind: prompt
title: Upgrade a Flutter app to a newer SDK version
description: Upgrades a Flutter app across SDK versions, fixing deprecated APIs with dart fix, plugin versions, Android Gradle and iOS build changes, and visual differences from new defaults.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [flutter]
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
tags: [flutter-upgrade, dart-fix, gradle-plugin, material-3, impeller]
pairs_with:
  prompts: [upgrade-major-dependency, fix-flutter-layout-error, speed-up-flutter-app]
  personas: [flutter-engineer]
args:
  - name: project
    description: Current and target Flutter versions, platforms built, key plugins, and whether golden tests or custom Android or iOS code exist.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Version path, Package changes, Code fixes, Platform build changes, Visual and behaviour checks, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Flutter upgrade breaks in three places. Dart code: deprecated APIs are removed after a deprecation period, and `dart fix --apply` handles many of them mechanically; Dart 3 requires sound null safety, so any package that is not null-safe is a hard blocker. Plugins: each has an SDK constraint and its own native code, and `flutter pub outdated` shows which need a major bump. Native builds: the Android side moved from imperatively applied Gradle plugins to the declarative `plugins` block, and newer versions need newer Gradle, Android Gradle Plugin, Kotlin and Java, plus raised `compileSdk` and `minSdk`; iOS needs a raised deployment target and pod updates, and newer versions add Swift Package Manager support. Then there are changes that compile fine: Material 3 became the default theme, changing colours, shapes and spacing, and the Impeller renderer became the default, which can change text, shaders and performance. Golden tests will fail for these reasons and must be reviewed, not blindly regenerated.
</context>

<task>
Project: {{project}}

1. Read `pubspec.yaml`, the lock file, `android/` and `ios/` build files and CI config. Record versions and whether the project pins Flutter per project.
2. Read the release notes and breaking-change pages for each version crossed. Note which affect APIs, widgets or settings this app uses.
3. Upgrade the SDK in a branch, update the SDK constraint, then run `flutter pub outdated` and upgrade plugins to versions that support the target. List blockers before code changes.
4. Run `dart fix --dry-run`, review, then apply. Fix remaining analyzer errors by hand.
5. Update Android build files (plugin block, Gradle wrapper, AGP, Kotlin, Java, SDK levels) and iOS (deployment target, pods). Build both platforms in debug and release.
6. Compare key screens with the previous version, decide on Material 3 and renderer differences explicitly, review golden test diffs one by one, and run integration tests on devices.
</task>

<constraints>
- Do not regenerate golden files without reviewing each diff and naming the cause.
- Do not opt out of new defaults (Material 3, renderer) silently; state the trade-off if you do.
- Do not claim a plugin supports the target without checking its changelog; mark it "to verify".
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Version path
Current and target Flutter and Dart versions and SDK constraint changes.
## Package changes
Table: package | from | to | breaking notes or blocker.
## Code fixes
Automated fixes applied and manual changes, grouped by cause.
## Platform build changes
Android Gradle, AGP, Kotlin and Java; iOS deployment target and dependency manager.
## Visual and behaviour checks
Screens and flows compared, golden test updates and why.
## Remaining risks
Bullets, or "None".
</output_format>
