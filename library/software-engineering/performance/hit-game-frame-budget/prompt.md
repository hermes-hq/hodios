---
schema: 1
id: hit-game-frame-budget
kind: prompt
title: Hit a game frame budget
description: Diagnoses frame drops against a 16.6 or 33.3 ms budget from profiler captures, separating CPU from GPU bound, and ranks fixes by milliseconds saved per effort. Use before shipping on weak hardware.
category: performance
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [game-developer]
stack: []
requires: [none]
inputs: [logs, text]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [frame-time, draw-calls, gpu-profiling, gc-spikes, frame-pacing, consoles]
pairs_with:
  prompts: [test-game-mechanics-deterministically, read-flame-graph]
  personas: [game-developer, performance-engineer]
args:
  - name: profiler_data
    description: Profiler output or a summary of it (Unity Profiler, Unreal Insights or stat unit, Godot profiler, RenderDoc, PIX, Xcode or Android GPU tools) - frame times, main and render thread markers, GPU timings, draw call and triangle counts, GC allocations - and the scene or moment where frames drop.
    type: text
    required: true
  - name: target_platform
    description: The device or class and the target frame rate, for example "Nintendo Switch handheld at 30 fps", "mid-range Android 2021 at 60 fps" or "Steam Deck at 60".
    type: string
    required: true
  - name: engine
    description: The engine and render pipeline, for example "Unity 2022 URP", "Unreal 5.3 with Lumen off", "Godot 4 Forward+".
    type: string
    default: "infer from the profiler output and say what you assumed"
output_contract:
  format: markdown
  sections: [Budget and verdict, Bound by, Hotspots, Ranked fixes, Measure again]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's game misses its frame rate on {{target_platform}}. Engine: {{engine}}. The budget is 1000 ms divided by the target frame rate: 33.33 ms at 30 fps, 16.67 ms at 60, 11.11 ms at 90 (common for VR) and 8.33 ms at 120, and a healthy target leaves 10-20% headroom for spikes and thermal throttling on mobile and handhelds. Average fps hides the real problem: players feel the worst frames, so look at frame-time percentiles (p95, p99) and spikes, not the mean.

The expert's first question is what bounds the frame: the main (game) thread, the render thread, or the GPU. Optimising the GPU when the main thread is at 24 ms does nothing. Typical culprits: per-frame allocations causing garbage collection spikes, too many draw calls or state changes, overdraw from particles and transparent UI, shadows and post-processing at console settings on mobile, physics with too many active bodies or a too-small fixed step, expensive scripts in update loops, synchronous loading or shader compilation hitches, and vsync or frame pacing issues that look like drops.
</context>

<task>
<profiler_data>
{{profiler_data}}
</profiler_data>

1. State the budget, the measured frame times (average, p95, worst) and the gap in milliseconds. If the target frame rate is not stated, ask for it; until then give the verdict against both 30 and 60 fps, labelled provisional. If the capture has only an average, say that p95 and worst frames are missing and how to record them.
2. Decide what bounds the frame using the evidence: compare main-thread, render-thread and GPU times; note "wait for GPU" or "present" markers; check whether lowering resolution changes frame time (GPU or fill-rate bound) or not (CPU bound). If the capture cannot tell, say which capture or test would.
3. Break down the bounding side into hotspots with their milliseconds: scripts and gameplay systems, physics, animation, UI layout and rebuilds, garbage collection, culling, draw call submission, and on the GPU: shadows, post-processing, overdraw, shader cost, vertex count, texture bandwidth.
4. Separate steady cost (every frame) from spikes (GC, loading, shader compilation, spawning): they need different fixes (pooling, prewarming, async loading, shader variant collections or pipeline caches).
5. Propose fixes, each with expected milliseconds saved as a range and effort: batching (static, dynamic, GPU instancing, SRP batcher or equivalent), LODs and culling distances, atlasing, reducing transparent layers, shadow cascades and resolution, dynamic resolution, update frequency reduction (time-slicing AI, staggering raycasts), object pooling, removing per-frame allocations, moving work off the main thread with the engine's job system.
6. Rank by milliseconds saved per unit of effort and stop when the cumulative estimate clears the budget with headroom.
7. Give the re-measurement plan: same scene, same camera path or replay, on the target device (not the editor), with thermals settled, recording p95 and p99 frame time.
</task>

<constraints>
- Profile on the target device; editor numbers only as a hint and labelled as such.
- Savings are estimates until measured; give ranges and say what they depend on.
- Do not invent profiler numbers or engine settings not shown; ask for the missing capture (for example a GPU capture) when it decides the diagnosis.
- Do not suggest cutting visual quality that designers own without naming the trade-off.
</constraints>

<output_format>
## Budget and verdict
Budget, measured average, p95 and worst frame time, gap, and one sentence on the main problem.
## Bound by
Main thread, render thread or GPU, with the evidence.
## Hotspots
Table: system | ms per frame | steady or spike | evidence.
## Ranked fixes
Table: fix | ms saved (range) | effort | risk or trade-off. Then the cumulative estimate against the budget.
## Measure again
The repeatable capture procedure and what to record.
</output_format>
