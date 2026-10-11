---
schema: 1
id: set-up-ios-string-catalogs
kind: prompt
title: Set up iOS String Catalogs
description: Sets up or migrates an iOS or macOS app to Xcode String Catalogs, with localizable SwiftUI and UIKit strings, plurals and device variations, comments, InfoPlist strings and export for translators.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [ios, swiftui]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [diff, code, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [xcstrings, apple-platforms, plural-variations]
pairs_with:
  prompts: [extract-ui-strings, write-translator-context-notes]
args:
  - name: project
    description: The Xcode project or Swift package to change, the minimum OS version, and what localization exists today (.strings, .stringsdict, none).
    type: text
    required: true
  - name: locales
    description: Languages to add, for example "de, ja, ar".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Current state, Changes, Catalog structure, Code patterns, Export and import, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
String Catalogs (`.xcstrings`) replace `.strings` and `.stringsdict` with one JSON file per table that Xcode fills from the code at build time. They only see strings passed through localizable APIs: SwiftUI `Text("Literal")` is localizable, but `Text(someString)` with a `String` variable is not; `String(localized:)` and `LocalizedStringResource` are; plain `"\(count) items"` is not. Strings in Swift packages need `bundle: .module`. Plurals and device-specific text are variations inside the catalog, not separate keys. `Info.plist` strings such as permission prompts go in an `InfoPlist` catalog, and App Store metadata is not in the app at all. Xcode marks strings it no longer finds as stale instead of deleting them, and exported `.xcloc` bundles carry comments and screenshots to translators.
</context>

<task>
Set up String Catalogs for:

{{project}}

Languages to add: {{locales}}.

1. Inspect the project: deployment targets and Xcode version, existing `.strings`/`.stringsdict` files, tables in use, Swift packages with resources, and the "Use Compiler to Extract Swift Strings" build setting.
2. Create or migrate catalogs: migrate existing `.strings` and `.stringsdict` with Xcode's migration rather than by hand, keeping table names; add an `InfoPlist.xcstrings` for usage descriptions and the display name; add the target languages to the project.
3. Fix code so strings are extracted: use `LocalizedStringKey` or `String(localized:comment:)` instead of `String` where text is user-facing; `Text(verbatim:)` for text that must not be localized; `bundle: .module` in packages; `LocalizedStringResource` for values passed across APIs (App Intents, notifications). Add a translator `comment:` to each string.
4. Interpolation and plurals: use interpolation in the localizable string (`"\(count) photos selected"`) and add plural variations in the catalog for every target language's categories; use device variations only where the copy truly differs by device.
5. Formatting: use `formatted()` and `FormatStyle` APIs for dates, numbers, measurements and lists instead of hard-coded formats.
6. Export and import: describe the Export Localizations flow (`.xcloc`) or the `xcodebuild -exportLocalizations` command for CI, and how translations come back.
7. Checks: build to refresh the catalog, review stale and new states, run with a pseudo-language (double-length and right-to-left launch arguments) and list what to look for.
</task>

<constraints>
- Do not hand-edit `.xcstrings` JSON for bulk changes when Xcode's extraction or migration can do it; say when a manual edit is unavoidable.
- Do not localize identifiers, analytics names or log text.
- If the deployment target is too old for an API you suggest, give the fallback for that version.
- Keep behaviour identical in the source language.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current state
What exists and what blocks extraction.

## Changes
The diff, grouped by file.

## Catalog structure
Tables, languages and an example entry with plural variations.

## Code patterns
Before and after for each pattern fixed.

## Export and import
Steps or commands.

## Checks
A checklist for the build and the pseudo-language run.
</output_format>
