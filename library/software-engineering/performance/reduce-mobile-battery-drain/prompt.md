---
schema: 1
id: reduce-mobile-battery-drain
kind: prompt
title: Reduce mobile battery drain
description: Finds what drains battery in a mobile app (wakelocks, location, polling, background work, radio wake-ups, hidden animation) from energy reports and code, and fixes it with platform APIs.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [mobile-engineer]
stack: [ios, android]
requires: [none]
inputs: [logs, file, text]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [battery-life, energy-profiling, wakelocks, background-work, location-updates]
pairs_with:
  prompts: [speed-up-app-cold-start]
  personas: [mobile-engineer, kotlin-android-engineer]
args:
  - name: evidence
    description: What you have - user complaints, Android vitals (excessive wakeups, stuck wake locks), Battery Historian or Energy Profiler output, Xcode Energy Organizer or MetricKit reports, and the code for location, background tasks, sync, push handling and timers.
    type: text
    required: true
  - name: platform
    description: Which platform the drain is on.
    type: enum
    enum: [ios, android, both]
    required: true
output_contract:
  format: markdown
  sections: [Evidence summary, Suspects, Fixes, Verify on device]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Users say the app ({{platform}}) drains their battery, or the store's vitals flag it. Energy goes to four places: CPU kept awake, radios (cellular is the most expensive: each wake-up keeps the radio in a high-power state for several seconds after the last byte), location hardware (GPS far more than network or significant-change location), and the screen and GPU (animations and high refresh rates). Most drain comes from small things repeated: a timer polling every 30 seconds, a wake lock that is not released on an error path, continuous high-accuracy location when "city-level" would do, background sync that ignores battery and network state, animations running on screens nobody sees, and analytics sending one event per request.

Both platforms punish this: Android Doze, App Standby Buckets and background execution limits; iOS background modes, Background App Refresh budgets and termination of apps that overrun their background time.
</context>

<task>
<evidence>
{{evidence}}
</evidence>

1. Summarise the evidence: which metric is high (wake-ups, wake-lock time, background CPU, network bytes or requests, location time, foreground energy), when (foreground, background, overnight) and on which app versions or devices.
2. List suspects from the evidence and code, each tied to an energy source: CPU (wake locks, tight loops, timers, background threads), radio (polling, chatty uploads, many small requests, no batching, retries without backoff), location (accuracy, update interval, never stopping updates, background location), screen and GPU (off-screen animations, 120 Hz where unneeded, video autoplay).
3. Fix each with the platform-appropriate mechanism:
   - Android: WorkManager with constraints (unmetered network, charging, battery not low) instead of AlarmManager loops or services; release wake locks in `finally` with a timeout; Fused Location Provider with balanced or low-power priority and longer intervals; FCM high-priority messages only for user-visible events; batch network calls.
   - iOS: BGTaskScheduler (app refresh and processing tasks) instead of keeping the app alive; `URLSession` background sessions with discretionary transfers; significant-location-change or region monitoring instead of continuous updates, `pausesLocationUpdatesAutomatically`, reduced accuracy where enough; silent push sparingly; invalidate timers and stop display links when views disappear.
   - Both: replace polling with push or server-sent change feeds where feasible; batch analytics; back off exponentially; pause work in low-power mode.
4. Show the code changes for the top suspects.
5. Give the verification plan: reproduce on a real device unplugged, a fixed scenario (for example one hour background with the screen off), measure with Battery Historian or Android Studio Energy Profiler, Xcode energy gauges, Instruments, or MetricKit reports, compare before and after, then watch vitals after release.

If there is no evidence of where the drain comes from and no relevant code, give the measurement steps first and ask for the results.
</task>

<constraints>
- Do not claim a fix reduces drain by a specific percentage without measurement; give expected direction and why.
- Respect the feature: if the product needs precise background location, say so and minimise cost within that need rather than removing it.
- Do not invent API names; mark uncertain ones [CHECK DOCS].
{{> output/uncertainty}}
</constraints>

<output_format>
## Evidence summary
Bullets: metric, when, where.
## Suspects
Table: suspect | energy source | evidence | confidence (high, medium, low).
## Fixes
For each suspect: the change, the platform API, and the code.
## Verify on device
Numbered steps with the scenario, tools and what to compare.
</output_format>
