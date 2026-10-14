---
schema: 1
id: convert-objective-c-to-swift
kind: prompt
title: Convert Objective-C code to Swift incrementally
description: Converts Objective-C classes to Swift one at a time in a mixed app, preparing headers with nullability, keeping Objective-C callers working, and preserving runtime features like KVO and selectors.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [swift]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [objective-c, bridging-header, nullability, mixed-language, objc-interop]
pairs_with:
  prompts: [port-code-to-another-language, migrate-cocoapods-to-swift-packages]
  personas: [swift-ios-engineer]
args:
  - name: scope
    description: Which classes or folders to convert, whether Objective-C code will keep calling them, and runtime features in use (KVO, swizzling, storyboards, Core Data).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Interop map, Conversion order, Header preparation, Changes made, Verification, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mixed Objective-C and Swift targets talk through two generated layers: the bridging header exposes Objective-C to Swift, and the generated `-Swift.h` header exposes Swift to Objective-C. Only Objective-C compatible Swift is visible there: classes that inherit from `NSObject` with `@objc` members, `@objc` enums with integer raw values, and no Swift structs, generics or tuples. So a class still called from Objective-C keeps an Objective-C shaped API after conversion. Before converting, annotate the Objective-C headers that will remain with nullability (`NS_ASSUME_NONNULL_BEGIN`, `nullable`), lightweight generics and `NS_SWIFT_NAME`, or Swift sees implicitly unwrapped optionals and `[Any]`. Leaf classes convert first; a Swift class cannot be subclassed from Objective-C. Dynamic runtime features need explicit opt-in in Swift: KVO needs `@objc dynamic`, selectors need `@objc`, and swizzled methods need `dynamic`. Storyboards and nibs reference classes by name and module; a converted view controller needs the module set in Interface Builder or it fails at runtime with an unknown class.
</context>

<task>
Scope: {{scope}}

1. Read the classes in scope, their headers, the bridging header, and every caller in both languages, including storyboards, nibs, string-based selectors and Core Data model class names.
2. Build the interop map and choose an order that keeps the target compiling at each step, leaves first.
3. Annotate remaining Objective-C headers that the converted code depends on with nullability, generics and Swift names.
4. Convert one class at a time. Keep the Objective-C visible API for classes still called from Objective-C, and use Swift idioms (value types, enums with associated values) only behind that boundary or where no Objective-C caller exists.
5. Preserve runtime behaviour: `@objc dynamic` for observed properties, `@objc` for selectors, module settings in storyboards and Core Data models, and `NSCoding` keys.
6. Remove the Objective-C files, update the bridging header, build, run tests, and launch the flows that use storyboards, KVO or notifications.
</task>

<constraints>
- Do not change public selectors or archived keys that persisted data or other modules depend on.
- Do not convert Objective-C++ or C code without saying it needs a different plan.
- Do not mark every member `@objc` by default; expose only what Objective-C callers use.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Interop map
Which classes are called from Objective-C and Swift, and what must stay visible to Objective-C.
## Conversion order
Classes in order with reasons.
## Header preparation
Nullability, generics and naming annotations added to remaining Objective-C headers.
## Changes made
Per class, including runtime features preserved.
## Verification
Build, tests and runtime checks (storyboards, KVO, selectors) with results.
## Remaining risks
Bullets, or "None".
</output_format>
