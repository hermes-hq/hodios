---
schema: 1
id: write-mobile-sdk-integration-guide
kind: prompt
title: Write a mobile SDK integration guide
description: Writes the install and setup guide for an iOS and Android SDK, with package manager steps, permissions and manifest entries, initialisation, privacy declarations and platform pitfalls.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [mobile-engineer, technical-writer, developer-advocate]
stack: [ios, android]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [mobile-sdk, sdk-installation, privacy-manifest, developer-experience]
pairs_with:
  prompts: [write-installation-guide, write-api-quickstart]
args:
  - name: sdk
    description: The SDK repo or its build files (Package.swift, podspec, build.gradle, AndroidManifest.xml), plus what the SDK does.
    type: text
    required: true
  - name: cross_platform
    description: Cross-platform wrappers to cover too, if any (for example React Native, Flutter).
    type: string
output_contract:
  format: markdown
  sections: [Guide written, Platform pitfalls covered, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mobile SDK installs fail on platform details, not on the SDK's API: the minimum iOS deployment target or Android `minSdk` is higher than the app's, a transitive dependency conflicts, a permission or `Info.plist` usage string is missing and the app is rejected at review, ProGuard or R8 strips classes the SDK loads by reflection, initialisation happens too late (after the first screen) or on the wrong thread, the Apple privacy manifest or Google Play Data safety form does not declare what the SDK collects. Swift Package Manager is now the default on iOS, CocoaPods is in maintenance, and Gradle with version catalogs is common on Android, so instructions must follow what the SDK actually publishes.
</context>

<task>
Write the integration guide for this SDK:

<sdk>
{{sdk}}
</sdk>
{{#cross_platform}}
Also cover: {{cross_platform}}.
{{/cross_platform}}

1. Read the build and packaging files for supported install methods, minimum OS and toolchain versions (Xcode, Swift, Android Gradle Plugin, Kotlin, `minSdk`, `compileSdk`), transitive dependencies, required permissions and manifest entries, bundled privacy manifest, and consumer ProGuard rules.
2. Write per platform:
   - Requirements table.
   - Install: exact steps for each supported package manager (Swift Package Manager URL and version rule, CocoaPods line, Gradle dependency with repository).
   - Configure: `Info.plist` keys or `AndroidManifest.xml` entries with what each is for, capabilities (push, background modes), R8 rules if not bundled.
   - Initialise: where to call it (app delegate or `Application.onCreate`), on which thread, with which keys, and the SwiftUI and Jetpack Compose variants if relevant.
   - Verify: a log line, debug screen or test call that proves the SDK works.
   - Privacy: data the SDK collects and what to declare in the App Store privacy details and Play Data safety form, based on the SDK's own privacy manifest or docs.
3. Add a troubleshooting section for the pitfalls that apply (version conflicts, missing usage strings, stripped classes, simulator versus device, Bitcode or architecture issues for older setups).
4. Build a sample app with the instructions if a toolchain is available and report the result.
</task>

<constraints>
- Every version, coordinate, key and permission must come from the SDK's files. Mark unknowns "to confirm".
- Do not tell developers to add permissions the SDK does not need; explain each one.
- Do not state what the SDK collects beyond what its code, privacy manifest or owners say; ask instead.
- Use placeholder API keys and tell developers not to ship secret keys in the app binary.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide. Then reply with:
## Guide written
Path, platforms and install methods covered, and whether a sample build was run.
## Platform pitfalls covered
The troubleshooting items included and why each applies.
## Questions for the owners
Facts to confirm, especially privacy declarations.
</output_format>
