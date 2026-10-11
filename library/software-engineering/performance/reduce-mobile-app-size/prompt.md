---
schema: 1
id: reduce-mobile-app-size
kind: prompt
title: Reduce iOS or Android app size
description: Shrinks an iOS or Android app's download and install size from the store size reports by trimming assets, libraries, architectures, resources and dead code, with before and after numbers.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [ios, android]
requires: [repo-read, file-write, shell]
inputs: [repo, text, logs]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [app-size, app-thinning, app-bundle, r8, asset-optimization]
pairs_with:
  prompts: [speed-up-app-cold-start, reduce-bundle-size, structure-mobile-app-modules]
  personas: [mobile-engineer, kotlin-android-engineer, swift-ios-engineer]
args:
  - name: app
    description: Platform(s), current download and install sizes and where they came from (App Store Connect, Play Console, a local build), framework (native, Flutter, React Native), and any size limit or goal.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Size breakdown, Biggest contributors, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The size users see is not the size of the file you build. On iOS, the App Store thins the app per device, so the real number comes from App Store Connect's size report or an Xcode export with an app thinning report, not from the universal .ipa. On Android, an App Bundle (.aab) lets Play deliver per-ABI, per-density and per-language splits; a universal APK overstates download size, and the Play Console shows the real download and install sizes. Install size also matters, because users delete large apps when storage is low. The big contributors are almost always the same: uncompressed or duplicate images and video, fonts with full glyph sets, bundled ML models, unused localisations from third-party SDKs, native libraries for architectures you do not need, debug symbols shipped in the binary, and large SDKs pulled in for one feature. On Android, R8 code shrinking and resource shrinking (`minifyEnabled`, `shrinkResources`) remove unused code and resources but need keep rules for reflection. On iOS, asset catalogs enable slicing and on-demand resources; strip symbols in release while keeping dSYMs for crash reports.
</context>

<task>
Reduce the app size for: {{app}}

1. Get the real numbers: the store's download and install sizes per device class, or build the release artefact and produce the thinning report (iOS) or analyse the .aab or APK with the APK Analyzer or `bundletool` (Android). Record the baseline.
2. Break the size down by category: executable code, native libraries per ABI, assets (images, video, audio, fonts, models), resources and localisations, third-party SDKs. List the 10 largest single items.
3. For each big item, choose a fix: recompress or convert images (WebP or HEIC, vector where simple), move rare large assets to on-demand download, subset fonts, drop unused architectures and languages, enable or tune R8 and resource shrinking, strip symbols, replace or remove an SDK used for one small feature.
4. Apply the changes in small steps, rebuilding and re-measuring after each so the saving per change is known.
5. Run the app's tests and smoke-test the screens that use changed assets or shrunk code (reflection, serialisation and deep links often break under R8).
</task>

<constraints>
- Quote store-reported or analyser-measured sizes only; never estimate savings as if they were measured.
- Do not remove an SDK, language or asset the product still uses; list such candidates as questions.
- Keep crash symbolication working: dSYMs and mapping files must still be uploaded.
- Add keep rules instead of turning R8 off when shrinking breaks something.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Size breakdown
Baseline download and install size, and size by category.
## Biggest contributors
Table: item, size, fix, expected saving.
## Changes
One line per file or setting: what changed.
## Results
Measured sizes after each change and in total, plus what was tested.
</output_format>
