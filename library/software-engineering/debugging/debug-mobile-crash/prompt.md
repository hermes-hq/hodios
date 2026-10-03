---
schema: 1
id: debug-mobile-crash
kind: prompt
title: Debug a mobile app crash
description: Debugs a mobile app crash from a symbolicated report, reading the crashed thread and frames to find the likely cause, a reproduction and a fix. Use when a crash shows up in the crash reporter.
category: debugging
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [mobile-engineer, software-engineer, qa-engineer]
stack: [ios, android, react-native, flutter]
requires: [repo-read]
inputs: [stack-trace, logs, file]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crash-report, symbolication, anr, exc-bad-access, main-thread]
pairs_with:
  personas: [mobile-engineer, debugger]
  prompts: [explain-stack-trace, find-root-cause, add-regression-test]
args:
  - name: crash_report
    description: The symbolicated crash report or stack trace, with exception type, crashed thread, device, OS and app version, and breadcrumbs or logs if available.
    type: text
    required: true
  - name: platform
    description: The app's platform or framework.
    type: enum
    enum: [ios, android, react-native, flutter]
    default: ios
  - name: context
    description: Crash rate and affected versions, OS or devices, recent releases, and the relevant source files if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Reading the report, Likely cause, Reproduction, Fix, Verification, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mobile crash reports carry more signal than they first appear to: the exception type and signal (EXC_BAD_ACCESS with SIGSEGV, EXC_BREAKPOINT from a Swift runtime trap such as a force unwrap or array index out of range, a watchdog termination code, an uncaught Java or Kotlin exception, a native SIGABRT, an ANR's main-thread state), the crashed thread versus the main thread, the first frame in the app's own code, and the device, OS and app version spread. Cross-platform frameworks add layers: a React Native or Flutter crash may surface as a native frame, a JavaScript or Dart error, or a bridge or platform-channel call. Unsymbolicated addresses are not readable; the fix then is symbolication, not guessing.
</context>

<task>
Debug this {{platform}} crash:
<crash_report>
{{crash_report}}
</crash_report>
{{#context}}
Context:
<context_info>
{{context}}
</context_info>
{{/context}}

1. Check the report is symbolicated. If the app's frames are raw addresses, stop analysing them and explain how to symbolicate for {{platform}} (dSYMs for iOS, the R8 or ProGuard mapping file and native debug symbols for Android, Hermes or JavaScript source maps for React Native, `--split-debug-info` symbols for Flutter).
2. Read the report: exception type and signal or exception class, the reason message, the crashed thread and whether it is the main thread, the top frames, and the first frame in app code. Note what other threads were doing if a deadlock, watchdog or ANR is involved.
3. Name the crash class and what typically causes it on {{platform}}: force unwrap or out-of-range access, use after free or a dangling delegate, UI work off the main thread, main-thread blocking (watchdog or ANR), out-of-memory, a fragment or activity lifecycle state error, a null from a platform API, a JavaScript exception thrown across the bridge, a Dart null-check or platform-channel error.
4. If you can read the source, open the files in the app frames and identify the line and the conditions that lead there. Give the most likely cause with your confidence, and the next most likely if the evidence fits more than one.
5. Propose a reproduction: device or OS, steps, and conditions (slow network, backgrounding during a request, rotation, low memory, a specific locale or account state). Use breadcrumbs and the version spread to narrow it.
6. Propose the fix at the cause (not a try or catch that hides it), plus a regression test or a debug assertion where feasible.
7. Say how to verify after release: crash-free rate for the affected version, the specific crash group, and a staged rollout.
</task>

<constraints>
- Base every claim on the frames and fields in the report or on code you read. Mark anything else as a hypothesis.
- Do not suggest catching and ignoring the exception as the fix. A guard is acceptable only when the invalid state is genuinely expected, and say why it is.
- If the crash is in a third-party SDK frame, say so, check whether app code calls into it incorrectly, and suggest checking the SDK's known issues and version.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Two sentences: what crashes, the likely cause and confidence.
## Reading the report
Bullets: exception, thread, key frames with the first app frame.
## Likely cause
Explanation, with the alternative if any.
## Reproduction
Numbered steps and conditions.
## Fix
Code diff or snippet with file path, and why it addresses the cause.
## Verification
Test to add and post-release checks.
## Missing information
What would raise confidence, or "None".
</output_format>
