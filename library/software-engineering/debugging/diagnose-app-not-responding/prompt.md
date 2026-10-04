---
schema: 1
id: diagnose-app-not-responding
kind: prompt
title: Diagnose a mobile app freeze
description: Diagnoses Android ANRs and iOS hangs or watchdog terminations from traces, finding main-thread blocking I/O, locks, binder calls or heavy layout, and fixes each with the right threading tool.
category: debugging
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [mobile-engineer]
stack: [ios, android]
requires: [none]
inputs: [stack-trace, logs, file]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [anr, app-hangs, watchdog, main-thread, deadlock, responsiveness]
pairs_with:
  personas: [mobile-engineer, debugger]
  prompts: [debug-mobile-crash, debug-race-condition]
args:
  - name: trace_or_report
    description: The ANR trace (traces.txt, Play Console ANR cluster, Perfetto), or the iOS hang report, MetricKit hang diagnostic, or crash report with exception code 0x8badf00d. Include all threads, app version, device and OS, and what the user was doing.
    type: text
    required: true
  - name: platform
    description: The platform of the report.
    type: enum
    enum: [ios, android]
    required: true
output_contract:
  format: markdown
  sections: [What the main thread was doing, Root cause, Fix, Verify, Prevent]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's {{platform}} app freezes. On Android an ANR is raised when the main thread does not handle an input event within about 5 seconds, or a BroadcastReceiver or service does not finish in time; on iOS, hangs of 250 ms or more are reported by Xcode Organizer and MetricKit, and the watchdog kills an app that blocks the main thread too long during launch, resume or suspend (termination code 0x8badf00d). The main thread's stack shows what it was doing at capture time, but the cause can be another thread: the main thread is often `BLOCKED` or `WAITING` on a lock held by a background thread, waiting on a binder call to a slow system service, or doing synchronous disk or network I/O (SharedPreferences `commit()`, database queries, `Data(contentsOf:)` on a URL, `DispatchQueue.main.sync` from a background thread, semaphores waiting on async work). Heavy layout, huge images decoded on the main thread, and large JSON parsing are the other usual causes. A sampled trace is one moment; repeated identical stacks across reports are the strong signal.
</context>

<task>
<trace>
{{trace_or_report}}
</trace>

1. Find the main thread (`"main"` on Android, Thread 0 or the main queue on iOS) and read its state and top frames in app code. Note the ANR type on Android (input dispatching, broadcast, service, content provider) or the hang duration and phase on iOS.
2. If the main thread is blocked or waiting, follow the lock: find the thread that holds it ("waiting to lock <0x...> held by thread N") and read what that thread is doing; check for lock-order deadlocks.
3. If the trace lacks other threads, symbols or the app's frames, say what is missing and how to get a better one (Play Console full trace, `adb bugreport`, Perfetto with the main thread track, StrictMode for disk and network on the main thread; Xcode Organizer hangs, Instruments Time Profiler and Hangs instrument, MetricKit `MXHangDiagnostic`), then give a ranked hypothesis list and stop.
4. Name the root cause with the evidence, and whether the frame shown is the cause or a victim.
5. Fix it with the right tool for {{platform}}: Kotlin coroutines with `Dispatchers.IO`, WorkManager for deferrable work, `apply()` instead of `commit()` or DataStore, Room off the main thread, moving binder-heavy calls off main; Swift concurrency (`Task`, actors, `nonisolated` work), `DispatchQueue.global`, background `URLSession`, async image decoding; and remove `main.sync`, semaphores waiting on the main thread, and locks shared with the main thread where possible.
6. Explain how to verify: reproduce with StrictMode or the Main Thread Checker on, trace the scenario, compare ANR or hang rates in the next release.
</task>

<constraints>
- Distinguish a freeze from a crash; if the report is a crash with a different exception, say so and suggest the crash debugging path.
- Never fix by increasing timeouts, catching the watchdog, or moving UI updates off the main thread.
- Do not invent frames or symbols not in the input.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## What the main thread was doing
State, top app frames and the blocking resource, in bullets.
## Root cause
The cause, the evidence and the thread holding any lock.
## Fix
Diff or code, with why it removes the block.
## Verify
Numbered steps.
## Prevent
Bullets: StrictMode or checker settings, CI or monitoring thresholds (for example ANR rate under Play's bad behaviour threshold), code rules.
</output_format>
